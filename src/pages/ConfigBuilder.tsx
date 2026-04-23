import { useState, useMemo } from 'react';
import { Copy, Check, Info, FileJson, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ConfigOptions {
  agentic: boolean;
  autoCommit: boolean;
  maxFiles: number;
  theme: 'dark' | 'light' | 'system';
  preferredShell: string;
  allowBash: boolean;
  model: 'claude-3-7-sonnet' | 'claude-3-5-sonnet';
}

export default function ConfigBuilder() {
  const [options, setOptions] = useState<ConfigOptions>({
    agentic: true,
    autoCommit: false,
    maxFiles: 5,
    theme: 'system',
    preferredShell: 'zsh',
    allowBash: true,
    model: 'claude-3-7-sonnet'
  });

  const [isCopied, setIsCopied] = useState(false);

  const configJson = useMemo(() => {
    const config = {
      default_model: options.model,
      behavior: {
        agentic_mode: options.agentic,
        auto_commit: options.autoCommit,
        bash_access: options.allowBash
      },
      limits: {
        max_files_in_context: options.maxFiles
      },
      display: {
        theme: options.theme,
        shell: options.preferredShell
      }
    };
    return JSON.stringify(config, null, 2);
  }, [options]);

  const copyConfig = () => {
    navigator.clipboard.writeText(configJson);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const reset = () => {
    setOptions({
      agentic: true,
      autoCommit: false,
      maxFiles: 5,
      theme: 'system',
      preferredShell: 'zsh',
      allowBash: true,
      model: 'claude-3-7-sonnet'
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Config Builder</h1>
        <p className="text-[#6E6E73] text-lg">
          Generate your <code className="bg-[#FAECE8] text-[#D97757] px-1 rounded">.claudecode.json</code> file with a visual interface.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="space-y-6">
          <Card className="bg-white border-[#E5E5E5] rounded-[32px] overflow-hidden shadow-sm">
            <CardHeader className="bg-[#F9F9F9] border-b border-[#F2F2F2] px-8 py-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Global Settings</CardTitle>
                <Button variant="ghost" size="sm" onClick={reset} className="text-[#86868B] hover:text-[#D97757]">
                  <RotateCcw size={14} className="mr-2" />
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Model Select */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">Primary Model</Label>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest text-[#86868B]">Recommended</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['claude-3-7-sonnet', 'claude-3-5-sonnet'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setOptions({ ...options, model: m as any })}
                      className={cn(
                        "p-4 rounded-2xl border transition-all text-sm font-medium",
                        options.model === m ? "border-[#D97757] bg-[#FAECE8] text-[#D97757]" : "border-[#E5E5E5] hover:border-[#D97757]"
                      )}
                    >
                      {m.split('-').slice(2).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Behavior Toggles */}
              <div className="space-y-6">
                <Label className="text-base font-semibold">Behavior & Execution</Label>
                <div className="space-y-4">
                  {[
                    { id: 'agentic', label: 'Enable Agentic Mode', desc: 'Allow Claude to chain multiple tools autonomously.' },
                    { id: 'allowBash', label: 'Allow Bash Execution', desc: 'Securely run terminal commands directly.' },
                    { id: 'autoCommit', label: 'Auto-Commit Changes', desc: 'Generate and apply commit messages automatically.' }
                  ].map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#D97706] transition-all cursor-pointer group"
                      onClick={() => setOptions({ ...options, [item.id]: !(options as any)[item.id] })}
                    >
                      <div className="space-y-1">
                        <div className="font-medium group-hover:text-[#D97706] transition-colors">{item.label}</div>
                        <div className="text-xs text-[#475569]">{item.desc}</div>
                      </div>
                      <div className={cn(
                        "w-12 h-6 rounded-full relative transition-colors duration-300",
                        (options as any)[item.id] ? "bg-[#D97706]" : "bg-[#E2E8F0]"
                      )}>
                        <div className={cn(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
                          (options as any)[item.id] ? "left-7" : "left-1"
                        )} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Mock */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">Max Context Files</Label>
                  <span className="text-sm font-bold text-[#D97706]">{options.maxFiles} files</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={options.maxFiles}
                  onChange={(e) => setOptions({ ...options, maxFiles: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#D97706]"
                />
                <div className="flex justify-between text-[10px] text-[#475569] font-bold uppercase tracking-widest">
                  <span>Minimal</span>
                  <span>Extensive</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-24 space-y-6">
          <Card className="bg-[#0F172A] border-none shadow-xl rounded-[24px] overflow-hidden">
            <CardHeader className="bg-[#1e293b] border-b border-[#334155] px-8 py-5 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#D97706]/20 text-[#D97706] rounded-lg">
                  <FileJson size={18} />
                </div>
                <CardTitle className="text-white text-base font-mono">.claudecode.json</CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyConfig}
                className="text-[#94a3b8] hover:text-white"
              >
                {isCopied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                {isCopied ? 'Copied!' : 'Copy'}
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <pre className="p-8 font-mono text-sm leading-relaxed text-[#D97706]">
                  {configJson}
                </pre>
              </ScrollArea>
              <div className="p-8 bg-[#1e293b] border-t border-[#334155]">
                <div className="flex items-start gap-4 text-xs text-[#94a3b8] leading-relaxed">
                  <Info size={16} className="shrink-0 text-[#D97706]" />
                  <p>
                    Place this file in your project root or home directory. Claude Code will automatically detect it and apply these settings to every session.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white p-8 rounded-[24px] border border-[#E2E8F0] space-y-4 shadow-sm text-[#0F172A]">
            <h4 className="font-bold flex items-center gap-2">
              <Sparkles size={18} className="text-[#D97706]" />
              Pro Tip
            </h4>
            <p className="text-sm text-[#475569] leading-relaxed italic">
              "Enabling Agentic mode allows Claude to explore your project structure autonomously. Use this with a higher 'Max Context Files' limit for best results on large codebases."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
