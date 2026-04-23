import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Info, Loader2, Sparkles, FileText, ExternalLink } from 'lucide-react';
import { Feature } from '../data/features';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useDynamicData } from '../context/DynamicDataContext';
import { toast } from 'sonner';

export default function Learn() {
  const { features, isLoading } = useDynamicData();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [difficulty, setDifficulty] = useState<string>('All');
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const categories = ['All', ...Array.from(new Set(features.map(f => f.category)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredFeatures = features
    .filter(f => {
      const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase()) || 
                            f.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || f.category === category;
      const matchesDifficulty = difficulty === 'All' || f.difficulty === difficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    })
    .sort((a, b) => {
      const order = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
      return order[a.difficulty] - order[b.difficulty];
    });

  return (
    <div className="space-y-12">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-[10px] font-black uppercase tracking-widest border border-[#FDE68A]">
          <Sparkles size={12} />
          Master the CLI
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-[#0F172A] leading-tight">
          Academy <span className="text-slate-300">/</span> Curriculum
        </h1>
        <p className="text-[#475569] text-xl max-w-2xl font-medium leading-relaxed">
          The comprehensive roadmap from first command to autonomous agent engineering. 
          Sorted by technical progression.
        </p>
      </header>

      <div className="space-y-6 sticky top-20 z-40 bg-white/80 backdrop-blur-xl py-6 border-b border-[#E5E5E5] -mx-6 px-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={20} />
          <Input 
            placeholder="Search features (e.g. 'bash', '/edit', 'refactor')..." 
            className="pl-12 h-14 rounded-2xl border-[#E5E5E5] bg-white text-lg shadow-sm focus:ring-[#D97706] focus:border-[#D97706] transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#86868B] ml-1">Difficulty Level</label>
            <Tabs value={difficulty} onValueChange={setDifficulty} className="w-fit">
              <TabsList className="bg-[#F1F5F9] rounded-xl p-1 border border-[#E2E8F0]">
                {difficulties.map(diff => (
                  <TabsTrigger 
                    key={diff} 
                    value={diff}
                    className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:text-[#D97706] data-[state=active]:shadow-sm transition-all text-xs font-bold"
                  >
                    {diff}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#86868B] ml-1">Functional Category</label>
            <Tabs value={category} onValueChange={setCategory} className="w-fit">
              <TabsList className="bg-[#F1F5F9] rounded-xl p-1 border border-[#E2E8F0]">
                {categories.map(cat => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat}
                    className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:text-[#D97706] data-[state=active]:shadow-sm transition-all text-xs font-bold"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFeatures.map((feature) => (
          <Card 
            key={feature.id} 
            className="group cursor-pointer hover:border-[#D97757] hover:shadow-md transition-all duration-300"
            onClick={() => setSelectedFeature(feature)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-[#FEF3C7] text-[#D97706] font-medium border-none rounded-full px-3 text-[10px]">
                  {feature.category}
                </Badge>
                <Badge variant="outline" className={cn(
                  "text-[10px] rounded-full px-3",
                  feature.difficulty === 'Beginner' ? "text-green-600 border-green-200 bg-green-50" :
                  feature.difficulty === 'Intermediate' ? "text-blue-600 border-blue-200 bg-blue-50" :
                  "text-purple-600 border-purple-200 bg-purple-50"
                )}>
                  {feature.difficulty}
                </Badge>
              </div>
              <Info size={16} className="text-[#475569] group-hover:text-[#D97706] transition-colors" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl mb-2 group-hover:text-[#D97706] transition-colors">{feature.title}</CardTitle>
              <p className="text-sm text-[#475569] line-clamp-2 leading-relaxed">
                {feature.description}
              </p>
              {feature.command && (
                <code className="mt-4 block p-2 bg-[#F8FAFC] rounded-lg text-xs font-mono text-[#D97706] border border-[#E2E8F0]">
                  {feature.command}
                </code>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFeatures.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#E5E5E5]">
          <p className="text-[#86868B]">No features found matching your criteria.</p>
        </div>
      )}

      {/* Feature Detail Dialog */}
      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="sm:max-w-xl rounded-[24px]">
          <DialogHeader className="space-y-4">
            <div className="flex gap-3 items-center">
              <Badge variant="secondary" className="bg-[#FEF3C7] text-[#D97706] border-none rounded-full px-3">
                {selectedFeature?.category}
              </Badge>
              <Badge variant="outline" className={cn(
                "rounded-full px-3",
                selectedFeature?.difficulty === 'Beginner' ? "text-green-600 border-green-200 bg-green-50" :
                selectedFeature?.difficulty === 'Intermediate' ? "text-blue-600 border-blue-200 bg-blue-50" :
                "text-purple-600 border-purple-200 bg-purple-50"
              )}>
                {selectedFeature?.difficulty}
              </Badge>
            </div>
            <DialogTitle className="text-3xl font-bold text-[#0F172A]">{selectedFeature?.title}</DialogTitle>
            <DialogDescription className="text-lg text-[#475569] font-medium leading-tight">
              {selectedFeature?.description}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-6 -mr-6">
            <div className="space-y-8 pt-4 pb-8">
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-[#475569] uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                  Deep Dive
                </h4>
                <p className="text-[#475569] leading-relaxed text-sm">
                  {selectedFeature?.details}
                </p>
              </div>

              {selectedFeature?.useCases && selectedFeature.useCases.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-[#475569] uppercase tracking-[0.2em]">Key Scenarios</h4>
                  <ul className="space-y-2">
                    {selectedFeature.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#475569]">
                        <span className="text-[#D97706] font-bold mt-0.5">•</span>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedFeature?.command && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-[#475569] uppercase tracking-[0.2em]">Terminal Usage</h4>
                  <div className="p-4 bg-[#0F172A] rounded-xl font-mono text-xs text-[#D97706] flex items-center justify-between border border-slate-800 shadow-inner">
                    <code>{selectedFeature.command}</code>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(selectedFeature.command!);
                        // Optional: trigger a toast here if sonner is set up globally
                      }}
                      className="text-[10px] bg-slate-800 text-white px-2 py-1 rounded hover:bg-slate-700 transition-colors uppercase font-bold tracking-wider"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}

              {selectedFeature?.proTip && (
                <div className="p-5 bg-[#FEF3C7] rounded-24px space-y-2 border border-[#FDE68A]">
                  <div className="flex items-center gap-2 text-[#D97706] font-black text-[10px] uppercase tracking-wider">
                    <Sparkles size={14} />
                    Expert Tip
                  </div>
                  <p className="text-sm text-[#92400E] leading-relaxed italic font-medium">
                    "{selectedFeature.proTip}"
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-[#E5E5E5]">
                <Link to={`/feature/${selectedFeature?.id}`} className="w-full">
                  <Button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl py-6 font-bold flex items-center gap-3">
                    <ExternalLink size={18} />
                    Open Full Technical Guide
                  </Button>
                </Link>
                <p className="text-[10px] text-center text-[#86868B] mt-3">
                  Includes advanced flags, piping examples, and industry best practices.
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
