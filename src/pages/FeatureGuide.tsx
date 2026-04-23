import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, BookOpen, Terminal, Sparkles, FileText, ChevronRight, 
  PlayCircle, ShieldCheck, Play, HelpCircle, List, LayoutGrid, Menu, X 
} from 'lucide-react';
import { useDynamicData } from '../context/DynamicDataContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import TerminalSimulator, { TerminalHandle } from '../components/TerminalSimulator';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

export default function FeatureGuide() {
  const { id } = useParams<{ id: string }>();
  const { features } = useDynamicData();
  const navigate = useNavigate();
  const terminalRef = useRef<TerminalHandle>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const feature = features.find(f => f.id === id);

  if (!feature) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Feature not found</h2>
        <Button onClick={() => navigate('/learn')}>Back to Learn</Button>
      </div>
    );
  }

  const handleRunStep = (command: string) => {
    if (terminalRef.current) {
      terminalRef.current.runCommand(command);
      const terminalElement = document.getElementById('terminal-sandbox');
      if (terminalElement) {
        terminalElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-sm">
          <BookOpen size={18} className="text-[#D97706]" />
          Docs
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <div className="max-w-[1400px] mx-auto flex gap-12 px-6">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-0 z-40 lg:relative lg:inset-auto lg:block w-72 h-screen overflow-y-auto pt-10 pb-20 border-r border-[#E5E5E5] transition-transform duration-300 lg:translate-x-0 bg-white lg:bg-transparent",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="space-y-8 pr-6">
            <Link to="/learn" className="flex items-center gap-2 text-[#475569] hover:text-[#0F172A] transition-colors mb-8 font-medium group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Overview
            </Link>

            {difficulties.map(diff => (
              <div key={diff} className="space-y-3">
                <h4 className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.2em] px-3">{diff} Features</h4>
                <div className="space-y-1 border-l-2 border-slate-100 ml-3 pl-3">
                  {features.filter(f => f.difficulty === diff).map(f => (
                    <Link
                      key={f.id}
                      to={`/feature/${f.id}`}
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        "block px-3 py-2 rounded-xl text-sm font-medium transition-all relative",
                        f.id === id 
                          ? "bg-[#FEF3C7] text-[#D97706] shadow-sm transform translate-x-1" 
                          : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                      )}
                    >
                      {f.id === id && (
                        <motion.div 
                          layoutId="active-pill"
                          className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-1 h-4 bg-[#D97706] rounded-full"
                        />
                      )}
                      {f.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-10 min-w-0 max-w-3xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-[#475569] mb-8 bg-[#F8FAFC] w-fit px-3 py-1.5 rounded-full border border-[#E2E8F0]">
            <Link to="/learn">Learn</Link>
            <ChevronRight size={10} />
            <span className="text-[#86868B]">{feature.category}</span>
            <ChevronRight size={10} />
            <span className="text-[#0F172A] font-bold">{feature.title}</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Hero Section */}
            <section className="space-y-6">
              <Badge className="bg-[#FEF3C7] text-[#D97706] border-none rounded-full px-4 py-1 font-bold text-xs">
                {feature.category}
              </Badge>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-[#0F172A] leading-[0.9]">
                {feature.title}
              </h1>
              <p className="text-xl text-[#475569] leading-relaxed max-w-2xl font-medium">
                {feature.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                  <LayoutGrid size={16} className="text-[#D97706]" />
                  <span className="text-sm font-bold text-[#0F172A]">{feature.difficulty} Level</span>
                </div>
                {feature.command && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] rounded-2xl text-white">
                    <Terminal size={14} className="text-[#D97706]" />
                    <code className="text-sm font-mono">{feature.command}</code>
                  </div>
                )}
              </div>
            </section>

            {/* Sub-commands / Categories (Compact List like nagdy.me) */}
            {feature.subCommands && (
              <section className="space-y-6">
                <h2 className="text-2xl font-black text-[#0F172A] flex items-center gap-3">
                  <List size={24} className="text-[#D97706]" />
                  Command Reference
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {feature.subCommands.map((sub, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#D97706] transition-colors group">
                      <code className="text-[#D97706] font-mono font-bold">{sub.command}</code>
                      <span className="text-sm text-[#475569] ml-4 text-right flex-1">{sub.description}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technical Guide */}
            <section className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-black text-[#0F172A] flex items-center gap-3 mb-6">
                <BookOpen size={24} className="text-[#D97706]" />
                Technical Overview
              </h2>
              {feature.guideMarkdown ? (
                <div className="markdown-body">
                  <ReactMarkdown>{feature.guideMarkdown}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-[#475569] text-lg leading-relaxed">
                  {feature.details}
                </p>
              )}
            </section>

            {/* Tutorial Section (Nagdy Style: ▶ Guided Tutorial) */}
            {feature.tutorialSteps && (
              <section className="space-y-8 bg-[#F8FAFC] p-8 rounded-[32px] border border-[#E2E8F0]">
                <h3 className="text-2xl font-black text-[#0F172A] flex items-center gap-2">
                  <span className="text-[#D97706]">▶</span> Guided Tutorial
                </h3>
                <div className="space-y-8">
                  {feature.tutorialSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold shrink-0 shadow-lg border-2 border-white">
                        {idx + 1}
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-lg text-[#0F172A] leading-none">{step.step}</h4>
                          {step.command && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleRunStep(step.command!)}
                              className="h-8 rounded-full border-[#D97706] text-[#D97706] hover:bg-[#D97706] hover:text-white transition-all font-bold px-4"
                            >
                              <Play size={10} className="mr-2" />
                              RUN
                            </Button>
                          )}
                        </div>
                        <p className="text-[#475569] leading-relaxed">
                          {step.description}
                        </p>
                        {step.command && (
                          <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] font-mono text-xs text-[#D97706] w-fit shadow-sm italic">
                            {step.command}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Terminal Section (Nagdy Style: >_ Try It Yourself) */}
            <section id="terminal-sandbox" className="space-y-6 pt-6">
              <h3 className="text-2xl font-black text-[#0F172A] flex items-center gap-2">
                <span className="text-[#D97706]">{">_"}</span> Try It Yourself
              </h3>
              <TerminalSimulator ref={terminalRef} initialCommand={feature.command} height="400px" />
            </section>

            {/* Checkpoints (Nagdy Style: ? Check Your Understanding) */}
            {feature.checkPoints && (
              <section className="space-y-6 bg-[#FEF3C7] p-8 rounded-[32px] border border-[#FDE68A]">
                <h3 className="text-2xl font-black text-[#B45309] flex items-center gap-2">
                  <span className="bg-[#B45309] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">?</span> 
                  Check Your Understanding
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {feature.checkPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#92400E] font-medium leading-relaxed">
                      <ShieldCheck size={18} className="shrink-0 mt-0.5 text-[#D97706]" />
                      {point}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Footer / Meta */}
            <footer className="pt-12 border-t border-[#E5E5E5] flex flex-col sm:flex-row justify-between items-start gap-8">
              <div className="space-y-2">
                <h4 className="font-bold text-[#0F172A]">Expert Strategy</h4>
                <p className="text-sm text-[#475569] italic max-w-sm">"{feature.proTip}"</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="rounded-full shadow-sm">
                  Official Registry
                </Button>
                <Button className="rounded-full bg-[#0F172A] text-white shadow-lg">
                  Share Guide
                </Button>
              </div>
            </footer>
          </motion.div>
        </main>

        {/* Right Rail Table of Contents (Hidden on mobile/tablet) */}
        <aside className="hidden xl:block w-64 pt-20">
          <div className="sticky top-24 space-y-6">
            <h4 className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.2em] px-3">On this page</h4>
            <nav className="space-y-3 font-medium text-xs text-[#475569]">
              <a href="#" className="block hover:text-[#D97706] border-l-2 border-[#E5E5E5] pl-4">Technical Overview</a>
              {feature.subCommands && <a href="#" className="block hover:text-[#D97706] border-l-2 border-[#E5E5E5] pl-4">Command Reference</a>}
              {feature.tutorialSteps && <a href="#" className="block hover:text-[#D97706] border-l-2 border-[#E5E5E5] pl-4">Guided Tutorial</a>}
              <a href="#terminal-sandbox" className="block hover:text-[#D97706] border-l-2 border-[#E5E5E5] pl-4">Try It Yourself</a>
              {feature.checkPoints && <a href="#" className="block hover:text-[#D97706] border-l-2 border-[#E5E5E5] pl-4">Knowledge Check</a>}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
