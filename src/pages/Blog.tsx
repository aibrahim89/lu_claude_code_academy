import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, Tag, ArrowRight, Newspaper, Bookmark, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../data/blog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDynamicData } from '../context/DynamicDataContext';

export default function Blog() {
  const { blogPosts, isLoading } = useDynamicData();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="space-y-12">
      <header className="space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold">Blog & News</h1>
        <p className="text-[#6E6E73] text-lg">
          Stay updated with the latest announcements, tutorials, and tips from the Claude Code community.
        </p>
      </header>

      {!selectedPost ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className="group h-full border-[#E2E8F0] rounded-[24px] overflow-hidden hover:border-[#D97706] transition-all cursor-pointer shadow-sm"
                onClick={() => setSelectedPost(post)}
              >
                <div className="aspect-[16/9] bg-[#F1F5F9] border-b border-[#E2E8F0] flex items-center justify-center p-12 overflow-hidden">
                  <div className="p-8 bg-white rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <Newspaper size={48} className="text-[#D97706]" />
                  </div>
                </div>
                <CardHeader className="p-8 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-[#FEF3C7] text-[#D97706] font-bold tracking-tight rounded-full px-4 border-none py-1">
                      {post.tag}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-[#475569] font-medium uppercase tracking-widest">
                       <Calendar size={12} />
                       {post.date}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-[#D97706] transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-[#475569] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="p-8 pt-0 flex justify-between items-center text-sm font-semibold text-[#D97706]">
                  <span className="flex items-center group-hover:translate-x-1 transition-transform">
                    Read Story
                    <ArrowRight className="ml-2" size={16} />
                  </span>
                  <div className="flex items-center gap-1 text-[#475569]">
                    <User size={14} />
                    {post.author}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto space-y-12"
        >
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPost(null)}
            className="rounded-full text-[#475569] hover:text-[#D97706] hover:bg-[#FEF3C7]"
          >
            ← Back to Feed
          </Button>

          <header className="space-y-6">
            <div className="flex items-center gap-4">
              <Badge className="bg-[#D97706] text-white border-none rounded-full px-4">{selectedPost.tag}</Badge>
              <div className="text-sm font-semibold text-[#475569] uppercase tracking-[0.2em]">{selectedPost.date}</div>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight leading-[1.1]">{selectedPost.title}</h1>
            <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#D97706]">
                <User size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">{selectedPost.author}</span>
                <span className="text-xs text-[#86868B]">Official Contributor</span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-[#1D1D1F] leading-relaxed">
            <ReactMarkdown>
              {selectedPost.content}
            </ReactMarkdown>
            <p className="mt-8">
              This is where the full article would go. Claude Code Academy blog features technical deep-dives into CLI architecture, productivity habits for AI-assisted coding, and case studies from top engineering teams.
            </p>
            <h2>Mastering the CLI</h2>
            <p>
              When you use Claude Code, you're not just getting a chatbot; you're getting a peer programmer that lives in your terminal...
            </p>
          </div>

          <footer className="pt-12 border-t border-[#F2F2F2] flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex gap-4">
              <Button size="icon" variant="outline" className="rounded-full"><Bookmark size={20} /></Button>
              <Button variant="outline" className="rounded-full px-8">Share Article</Button>
            </div>
            <Link to="/assessment" className="text-sm font-bold text-[#D97757] hover:underline">
              Test your knowledge of these features →
            </Link>
          </footer>
        </motion.div>
      )}

      {/* Newsletter Section */}
      {!selectedPost && (
        <section className="bg-[#FAECE8] p-12 rounded-[48px] text-center space-y-6">
          <h2 className="text-3xl font-bold italic font-serif">Stay in the loop.</h2>
          <p className="text-[#6E6E73] max-w-md mx-auto">
            Get the latest Claude Code features and tutorials delivered to your inbox every two weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 px-6 py-4 rounded-full border-none bg-white shadow-sm focus:ring-2 focus:ring-[#D97757] outline-none"
            />
            <Button className="bg-[#D97757] hover:bg-[#C1664C] text-white rounded-full px-8 py-4 h-auto font-bold">
              Subscribe
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}

// Simple link shim since we didn't export Link in the code above
import { Link } from 'react-router-dom';
