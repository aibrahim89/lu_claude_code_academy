import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Terminal, Settings, FileText, CheckCircle, Newspaper, Code2, Menu, X, Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { useDynamicData } from '../context/DynamicDataContext';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: 'Learn', path: '/learn', icon: BookOpen },
  { name: 'Playground', path: '/playground', icon: Terminal },
  { name: 'Config Builder', path: '/config', icon: Settings },
  { name: 'Cheat Sheet', path: '/cheat-sheet', icon: FileText },
  { name: 'Assessment', path: '/assessment', icon: CheckCircle },
  { name: 'Blog', path: '/blog', icon: Newspaper },
];

export default function Layout({ children }: LayoutProps) {
  const { isLoading, refreshData } = useDynamicData();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1D1D1F] font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-1 px-2 bg-[#F1F5F9] rounded-lg text-ink font-extrabold group-hover:scale-105 transition-transform flex items-center gap-1.5">
                <Code2 size={20} className="text-[#D97706]" />
                CLAUDE <span className="text-[#D97706]">CODE</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#0F172A]",
                    location.pathname === item.path ? "text-[#0F172A] font-bold" : "text-[#475569]"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-[#E2E8F0]">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => refreshData()} 
                  disabled={isLoading}
                  className="rounded-full border-[#E2E8F0] hover:bg-[#F8FAFC] gap-2 text-xs h-8"
                >
                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} className="text-[#D97706]" />}
                  {isLoading ? "Syncing..." : "Smart Sync"}
                </Button>
                <div className="flex items-center gap-3 ml-2">
                  <div className="text-right hidden lg:block">
                    <p className="text-xs font-bold leading-tight">Level 4</p>
                    <p className="text-[10px] text-[#475569]">Advanced User</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#CBD5E1]" />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#6E6E73] hover:text-[#1D1D1F]"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-[#E5E5E5] overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      location.pathname === item.path ? "bg-[#F2F2F2] text-[#D97757]" : "text-[#6E6E73]"
                    )}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t border-[#E5E5E5] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-1">
              <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
                <div className="p-1 bg-[#D97757] rounded-md text-white">
                  <Code2 size={16} />
                </div>
                <span className="font-semibold">Claude Code Academy</span>
              </div>
              <p className="text-sm text-[#6E6E73]">Master the CLI for AI-first development.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[#6E6E73]">
                <li><Link to="/learn" className="hover:text-[#D97757]">Documentation</Link></li>
                <li><Link to="/cheat-sheet" className="hover:text-[#D97757]">Cheat Sheet</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-[#6E6E73]">
                <li><a href="https://github.com" className="hover:text-[#D97757]">GitHub</a></li>
                <li><a href="https://discord.com" className="hover:text-[#D97757]">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Anthropic</h4>
              <ul className="space-y-2 text-sm text-[#6E6E73]">
                <li><a href="https://anthropic.com" className="hover:text-[#D97757]">Main Website</a></li>
                <li><a href="https://claude.ai" className="hover:text-[#D97757]">Claude.ai</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#F2F2F2] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#86868B]">
            <p>© 2025 Claude Code Academy. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#1D1D1F]">Privacy Policy</a>
              <a href="#" className="hover:text-[#1D1D1F]">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
