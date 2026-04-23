import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Terminal, Settings, FileText, BookOpen, ArrowRight, Shield, Zap, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useDynamicData } from '../context/DynamicDataContext';

export default function Home() {
  const { blogPosts, isLoading } = useDynamicData();

  return (
    <div className="space-y-16 pb-20">
      {/* Main Grid Container */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-center min-h-[600px]">
        {/* Left: Hero Content */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-bold uppercase tracking-wider">
              171+ Features Included
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.05]">
              The Definitive Guide to Claude Code.
            </h1>
            <p className="text-lg text-[#475569] max-w-xl leading-relaxed">
              Master the CLI power of Claude. From advanced piping to custom config profiles, we break down every hidden functionality discovered in the latest builds.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/assessment">
              <Button size="lg" className="rounded-lg px-8 bg-[#0F172A] hover:bg-black text-white font-semibold">
                Take Assessment
              </Button>
            </Link>
          </div>

          <div className="p-6 border border-dashed border-[#E2E8F0] rounded-xl space-y-4 max-w-md">
            <p className="text-sm font-bold text-[#0F172A]">Your Understanding Progress</p>
            <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#D97706] w-[65%]" />
            </div>
            <p className="text-[11px] text-[#475569]">Complete 12 more lessons to reach Expert level.</p>
          </div>
        </div>

        {/* Right: Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-3 gap-4 h-[600px]">
          <div className="sm:row-span-2 bg-linear-to-br from-[#1e293b] to-[#0f172a] rounded-[24px] p-8 flex flex-col justify-between text-white shadow-xl shadow-slate-200/50">
            <div>
              <div className="text-6xl font-black text-[#D97706]">171</div>
              <h3 className="text-2xl font-bold mt-2">Capabilities Indexed</h3>
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              A comprehensive library of commands, flags, and shortcuts documented by the community.
            </p>
          </div>
          
          <Link to="/config" className="group">
            <Card className="h-full border-[#E2E8F0] rounded-[24px] p-6 flex flex-col justify-between hover:border-[#D97706] transition-all group-hover:shadow-md">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#F8FAFC] rounded-lg flex items-center justify-center text-xl">🛠️</div>
                <h3 className="font-bold">Config Builder</h3>
              </div>
              <p className="text-xs text-[#475569]">Generate your .clauderc visually and export instantly.</p>
            </Card>
          </Link>

          <Link to="/playground" className="group">
            <Card className="h-full border-[#E2E8F0] rounded-[24px] p-6 flex flex-col justify-between hover:border-[#D97706] transition-all group-hover:shadow-md">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#F8FAFC] rounded-lg flex items-center justify-center text-xl">🎮</div>
                <h3 className="font-bold">Playground</h3>
              </div>
              <p className="text-xs text-[#475569]">Interactive CLI sandbox to test commands safely.</p>
            </Card>
          </Link>

          <Link to="/cheat-sheet" className="group">
            <Card className="h-full border-[#E2E8F0] rounded-[24px] p-6 flex flex-col justify-between hover:border-[#D97706] transition-all group-hover:shadow-md">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#F8FAFC] rounded-lg flex items-center justify-center text-xl">📄</div>
                <h3 className="font-bold">Cheat Sheet</h3>
              </div>
              <p className="text-xs text-[#475569]">One-page reference for everyday productivity.</p>
            </Card>
          </Link>

          <Link to="/learn" className="group">
            <Card className="h-full border-[#E2E8F0] rounded-[24px] p-6 flex flex-col justify-between hover:border-[#D97706] transition-all group-hover:shadow-md">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#F8FAFC] rounded-lg flex items-center justify-center text-xl">🎓</div>
                <h3 className="font-bold">Learn Path</h3>
              </div>
              <p className="text-xs text-[#475569]">Structured courses from beginner to core-dev.</p>
            </Card>
          </Link>
        </div>
      </section>

      {/* Blog Strip */}
      <section className="bg-slate-100 rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-12 border border-[#E2E8F0] overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
            <Loader2 className="animate-spin text-[#D97706]" size={24} />
          </div>
        )}
        <div className="font-black text-xs text-[#475569] uppercase tracking-[0.2em] whitespace-nowrap">Latest News</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
          {blogPosts.slice(0, 3).map((item, i) => (
            <Link key={i} to="/blog" className="space-y-1 group">
              <div className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider">{item.tag}</div>
              <h4 className="font-bold text-sm text-[#0F172A] group-hover:underline line-clamp-1">{item.title}</h4>
            </Link>
          ))}
          {blogPosts.length === 0 && !isLoading && (
            <p className="text-sm text-[#475569]">No recent updates found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
