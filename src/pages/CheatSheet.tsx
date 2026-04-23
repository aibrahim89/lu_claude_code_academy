import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal, Lightbulb, FileCode, GitBranch, Settings, Info } from 'lucide-react';

const sections = [
  {
    title: 'Basic Usage',
    icon: Terminal,
    items: [
      { cmd: 'claude', desc: 'Start an interactive session' },
      { cmd: 'claude "task"', desc: 'Run a specific task and exit' },
      { cmd: 'claude /help', desc: 'Show available commands' },
      { cmd: 'claude /update', desc: 'Update to latest version' }
    ]
  },
  {
    title: 'File Operations',
    icon: FileCode,
    items: [
      { cmd: '/edit <file>', desc: 'Request changes to a file' },
      { cmd: '/create <file>', desc: 'Create a new file with content' },
      { cmd: '/ls', desc: 'List files in current directory' },
      { cmd: '/view <file>', desc: 'Read file content' }
    ]
  },
  {
    title: 'Git & Version Control',
    icon: GitBranch,
    items: [
      { cmd: '/commit', desc: 'Generate and apply commit message' },
      { cmd: '/branch', desc: 'Create or switch branches' },
      { cmd: '/pr', desc: 'Create a pull request' },
      { cmd: '/status', desc: 'Check git status' }
    ]
  },
  {
    title: 'Configuration',
    icon: Settings,
    items: [
      { cmd: '/config list', desc: 'Show current configuration' },
      { cmd: '/config set <key>', desc: 'Change a configuration value' },
      { cmd: '/login', desc: 'Authenticate your account' },
      { cmd: '/logout', desc: 'Sign out of your account' }
    ]
  }
];

export default function CheatSheet() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto py-8">
      <header className="space-y-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">Cheat Sheet</h1>
        <p className="text-[#6E6E73] text-xl max-w-2xl mx-auto">
          One-page reference guide for all essential Claude Code commands and shortcuts.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <Card key={idx} className="bg-white border-[#E2E8F0] rounded-[24px] shadow-sm overflow-hidden group">
            <CardHeader className="bg-[#0F172A] text-white p-6">
              <div className="flex items-center gap-3">
                <section.icon size={20} className="text-[#D97706]" />
                <CardTitle className="text-lg uppercase tracking-widest font-bold">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#E2E8F0]">
                {section.items.map((item, i) => (
                  <div key={i} className="p-6 hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col gap-2">
                      <code className="text-[#D97706] font-mono text-base font-bold group-hover:underline cursor-pointer" 
                            onClick={() => navigator.clipboard.writeText(item.cmd)}>
                        {item.cmd}
                      </code>
                      <p className="text-sm text-[#475569] leading-relaxed italic border-l-2 border-[#FEF3C7] pl-3">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-[#1D1D1F] p-10 rounded-[40px] text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D97757]/10 blur-[100px] rounded-full group-hover:bg-[#D97757]/20 transition-all duration-700" />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="text-[#D97757]" />
            <h3 className="text-2xl font-bold">Pro Tips</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[#86868B] text-sm leading-relaxed">
            <div className="space-y-2">
              <p><span className="text-white font-semibold">Multiple Files:</span> You can mention multiple files in a single task like <code className="text-[#D97757]">/edit App.tsx, index.css fix styling</code>.</p>
              <p><span className="text-white font-semibold">Context Control:</span> Use <code className="text-[#D97757]">-f</code> to manually force-include a file in context even if Claude doesn't think it's needed.</p>
            </div>
            <div className="space-y-2">
              <p><span className="text-white font-semibold">Verbosity:</span> Add <code className="text-[#D97757]">--verbose</code> to any command to see the full reasoning process of the underlying agent.</p>
              <p><span className="text-white font-semibold">Shell Piping:</span> Claude Code works with standard pipes: <code className="text-[#D97757]">cat log.txt | claude "explain this error"</code>.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#86868B] uppercase tracking-[0.2em] bg-[#F2F2F2] px-4 py-2 rounded-full">
          <Info size={12} />
          Last Updated: March 2025 • v1.0.0
        </div>
      </div>
    </div>
  );
}
