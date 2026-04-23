import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Feature, features as staticFeatures } from '../data/features';
import { BlogPost, blogPosts as staticBlogPosts } from '../data/blog';
import { fetchLatestClaudeFeatures, fetchLatestClaudeNews } from '../services/geminiService';
import { toast } from 'sonner';

interface DynamicDataContextType {
  features: Feature[];
  blogPosts: BlogPost[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const DynamicDataContext = createContext<DynamicDataContextType | undefined>(undefined);

export function DynamicDataProvider({ children }: { children: ReactNode }) {
  const [features, setFeatures] = useState<Feature[]>(staticFeatures);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(staticBlogPosts);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [newFeatures, newNews] = await Promise.all([
        fetchLatestClaudeFeatures(),
        fetchLatestClaudeNews()
      ]);

      if (newFeatures.length > 0) {
        // Merge with unique features (by ID)
        setFeatures(prev => {
          const combined = [...prev, ...newFeatures];
          return Array.from(new Map(combined.map(f => [f.id, f])).values());
        });
      }

      if (newNews.length > 0) {
        // Merge with unique posts
        setBlogPosts(prev => {
          const combined = [...newNews, ...prev]; // Newest first
          return Array.from(new Map(combined.map(p => [p.id, p])).values());
        });
      }
      
      if (newFeatures.length > 0 || newNews.length > 0) {
        toast.success("Successfully fetched latest Claude updates!");
      }
    } catch (error) {
      console.error("Failed to refresh data:", error);
      toast.error("Failed to update Claude data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    refreshData();
  }, []);

  return (
    <DynamicDataContext.Provider value={{ features, blogPosts, isLoading, refreshData }}>
      {children}
    </DynamicDataContext.Provider>
  );
}

export function useDynamicData() {
  const context = useContext(DynamicDataContext);
  if (context === undefined) {
    throw new Error('useDynamicData must be used within a DynamicDataProvider');
  }
  return context;
}
