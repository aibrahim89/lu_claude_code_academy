import { Rocket, Info, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import TerminalSimulator from '../components/TerminalSimulator';

export default function Playground() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-[#D97706] bg-amber-50 w-fit px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
          <Rocket size={12} />
          BETA SANDBOX
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A]">Interactive Playground</h1>
        <p className="text-[#475569] text-xl max-w-2xl leading-relaxed">
          The safest way to master Claude Code. Experiment with agentic commands in an isolated virtual filesystem.
        </p>
      </header>

      <TerminalSimulator height="500px" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        <Card className="bg-white border-[#E2E8F0] rounded-[24px]">
          <CardContent className="p-8 space-y-4">
            <h3 className="text-xl font-bold">Terminal Reference</h3>
            <div className="space-y-2">
              {[
                { cmd: 'claude', desc: 'Main CLI entry point' },
                { cmd: '/edit', desc: 'Start a file editing session' },
                { cmd: '/commit', desc: 'Stage and commit changes' },
                { cmd: 'ls', desc: 'List playground files' }
              ].map((s, i) => (
                <div 
                  key={i}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors text-left"
                >
                  <code className="text-[#D97706] font-mono font-bold">{s.cmd}</code>
                  <span className="text-sm text-[#475569]">{s.desc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#E2E8F0] rounded-[24px]">
          <CardContent className="p-8 space-y-4">
            <h3 className="text-xl font-bold">Terminal Tips</h3>
            <ul className="space-y-4 text-sm text-[#475569] leading-relaxed">
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0 text-[10px]">1</div>
                <span>Use <code className="bg-[#F1F5F9] px-1 rounded">clear</code> to wipe the terminal session history.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0 text-[10px]">2</div>
                <span>Most commands in Claude Code start with a <code className="bg-[#F1F5F9] px-1 rounded">/</code> prefix.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0 text-[10px]">3</div>
                <span>The real CLI supports tab-completion for files and branches!</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
