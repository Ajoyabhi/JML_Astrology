import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Newspaper } from "lucide-react";
import { BlogPostSkeleton } from "@/components/SkeletonLoader";
import { useLanguage } from "@/contexts/LanguageContext";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    queryFn: async () => {
      const response = await fetch('/api/blog', { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    },
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Astrology Insights
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the depths of cosmic wisdom through our expert articles and guides
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <BlogPostSkeleton key={i} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
                  data-testid={`article-${post.id}`}
                >
                  <img
                    src={post.featuredImageUrl || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    data-testid={`img-post-${post.id}`}
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        post.category === 'Planetary Transits' ? 'bg-primary/20 text-primary' :
                        post.category === 'Love & Relationships' ? 'bg-accent/20 text-accent' :
                        post.category === 'Career & Finance' ? 'bg-gold-400/20 text-gold-400' :
                        'bg-mystic-500/20 text-mystic-500'
                      }`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground" data-testid={`text-post-date-${post.id}`}>
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2" data-testid={`text-post-title-${post.id}`}>
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`text-post-excerpt-${post.id}`}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50"
                          alt="Author"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-muted-foreground" data-testid={`text-post-author-${post.id}`}>
                          AstroMystic Team
                        </span>
                      </div>
                      <button className="text-primary hover:text-primary/80 transition-colors duration-200" data-testid={`button-read-post-${post.id}`}>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Newspaper className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
              <p className="text-muted-foreground mb-4">No blog posts available</p>
              <p className="text-sm text-muted-foreground">
                Check back later for cosmic insights and astrological wisdom.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
