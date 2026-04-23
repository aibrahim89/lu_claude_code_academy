import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check, Loader2, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { GoogleGenAI } from "@google/genai";

interface Log {
  type: 'cmd' | 'resp' | 'err' | 'info' | 'thought';
  text: string;
}

interface TerminalSimulatorProps {
  initialCommand?: string;
  className?: string;
  height?: string;
}

export interface TerminalHandle {
  runCommand: (cmd: string) => void;
  clear: () => void;
}

const TerminalSimulator = forwardRef<TerminalHandle, TerminalSimulatorProps>(({ initialCommand, className, height = "400px" }, ref) => {
  const [input, setInput] = useState(initialCommand || '');
  const [logs, setLogs] = useState<Log[]>([
    { type: 'info', text: 'Claude Code Session v0.1.0-alpha' },
    { type: 'info', text: 'Virtual Filesystem Initialized: /home/user/project' },
  ]);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  useEffect(() => {
    if (scrollRef.current) {
      const scrollArea = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  }, [logs]);

  const executeCommand = async (cmdText: string) => {
    if (!cmdText.trim()) return;
    const cmd = cmdText.trim();
    
    // Add command to logs
    setLogs(prev => [...prev, { type: 'cmd', text: `> ${cmdText}` }]);
    
    if (cmd.toLowerCase() === 'clear') {
      setLogs([]);
      return;
    }

    setIsLoading(true);

    try {
      const systemPrompt = `
        You are simulating "Claude Code", a high-performance CLI agent from Anthropic.
        Your goal is to respond to commands exactly as Claude Code would.
        
        CONTEXT:
        - Current Directory: /home/user/project
        - Project Type: React + Vite + Typescript
        - Files present: package.json, src/App.tsx, src/main.tsx, tailwind.config.js, index.html
        
        RULES:
        - For slash commands like /edit or /bug, show a "thought process" first (starting with [claude]), then a result.
        - For /help, show a professional CLI help menu.
        - For bash commands like 'ls' or 'cat', show realistic output for the virtual filesystem.
        - If the command is unknown, simulate what a smart AI agent would do (e.g., checking files or asking for clarification).
        - Keep responses concise but information-dense.
        - Use colors or terminal-like formatting (using prefix markers like [claude] or success icons).
        - Do NOT break character. You ARE the Claude CLI.
        - Be helpful but focused on the terminal interface.
        
        COMMAND: ${cmd}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: systemPrompt,
      });

      const aiText = response.text || "No output from agent.";
      
      // Parse multi-line output into logs
      const lines = aiText.split('\n');
      lines.forEach((line, index) => {
        if (line.trim().startsWith('[claude]')) {
           setLogs(prev => [...prev, { type: 'thought', text: line }]);
        } else if (line.trim()) {
           setLogs(prev => [...prev, { type: 'resp', text: line }]);
        }
      });

    } catch (error) {
      console.error("Terminal AI Error:", error);
      setLogs(prev => [...prev, { type: 'err', text: `[SYSTEM ERROR] Failed to connect to Claude Core. Please verify network.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    runCommand: (cmd: string) => { executeCommand(cmd); },
    clear: () => setLogs([])
  }));

  const handleRun = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    executeCommand(input);
    setInput('');
  };

  const copyOutput = () => {
    const text = logs.map(l => l.text).join('\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className={cn("bg-[#0F172A] border-none shadow-2xl rounded-[32px] overflow-hidden border border-white/5", className)}>
      <CardContent className="p-0">
        <div className="bg-[#1e293b]/50 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner" />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-[#94a3b8] ml-4 bg-[#0F172A]/80 px-3 py-1 rounded-full border border-white/10 tracking-widest uppercase">
              <Cpu size={12} className={cn("text-[#D97706]", isLoading && "animate-pulse")} />
              <span>Claude Core Protocol v1.4</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 text-[#94a3b8] hover:text-white hover:bg-white/10 rounded-full px-3 text-[10px] font-bold" onClick={() => setLogs([])}>
              <RotateCcw size={14} className="mr-2" />
              Reset
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-[#94a3b8] hover:text-white hover:bg-white/10 rounded-full px-3 text-[10px] font-bold" onClick={copyOutput}>
              {isCopied ? <Check size={14} className="mr-2" /> : <Copy size={14} className="mr-2" />}
              Copy
            </Button>
          </div>
        </div>

        <ScrollArea ref={scrollRef} style={{ height }} className="font-mono text-[14px] leading-relaxed p-6 scroll-smooth">
          <div className="space-y-4">
            {logs.map((log, i) => (
              <pre key={i} className={cn(
                "whitespace-pre-wrap break-all transition-all duration-300", 
                log.type === 'cmd' ? "text-[#D97706] font-bold" : 
                log.type === 'thought' ? "text-slate-500 italic opacity-80" :
                log.type === 'info' ? "text-blue-400 font-bold" :
                log.type === 'err' ? "text-red-400" :
                "text-[#CBD5E1]"
              )}>
                {log.text}
              </pre>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-[#D97706] animate-pulse">
                <span className="font-bold">{">"}</span>
                <Loader2 size={14} className="animate-spin" />
                <span className="text-xs font-mono uppercase tracking-tighter">Claude is thinking...</span>
              </div>
            )}
            {logs.length === 0 && !isLoading && <p className="text-[#94a3b8] italic opacity-50">System ready.</p>}
          </div>
        </ScrollArea>

        <form onSubmit={handleRun} className="bg-[#1e293b]/50 backdrop-blur-md p-6 flex items-center gap-4 border-t border-white/10">
          <div className="flex-1 relative group">
            <span className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 font-mono font-bold transition-colors duration-300",
              isLoading ? "text-slate-600" : "text-[#D97706] group-focus-within:text-[#F59E0B]"
            )}>{">"}</span>
            <input 
              type="text" 
              value={input} 
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)} 
              className="w-full bg-transparent border-none outline-none text-[#CBD5E1] font-mono pl-6 h-10 placeholder-[#64748b] disabled:opacity-50" 
              placeholder={isLoading ? "Please wait..." : "Ask Claude to edit, test, or commit..."} 
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-[#D97706] hover:bg-black text-white rounded-2xl px-6 h-10 text-xs font-black shadow-lg shadow-amber-900/20 transition-all active:scale-95 disabled:grayscale"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} className="mr-2" />}
            {isLoading ? 'THINKING...' : 'EXECUTE'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
});

TerminalSimulator.displayName = 'TerminalSimulator';

export default TerminalSimulator;
