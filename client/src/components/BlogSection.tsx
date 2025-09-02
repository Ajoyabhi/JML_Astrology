import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogSection() {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  // Show only first 3 posts for the landing page section
  const featuredPosts = posts.slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Astrology Insights
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the depths of cosmic wisdom through our expert articles and guides
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <article key={i} className="glass-card rounded-xl overflow-hidden">
                <div className="animate-pulse">
                  <div className="w-full h-48 bg-muted"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-20 h-4 bg-muted rounded"></div>
                      <div className="w-16 h-3 bg-muted rounded"></div>
                    </div>
                    <div className="h-6 bg-muted rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
                data-testid={`featured-article-${post.id}`}
              >
                <img
                  src={post.featuredImageUrl || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  data-testid={`img-featured-post-${post.id}`}
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      post.category === 'Planetary Transits' ? 'bg-primary/20 text-primary' :
                      post.category === 'Love & Relationships' ? 'bg-accent/20 text-accent' :
                      post.category === 'Career & Finance' ? 'bg-gold-400/20 text-gold-400' :
                      'bg-mystic-500/20 text-mystic-500'
                    }`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground" data-testid={`text-featured-post-date-${post.id}`}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2" data-testid={`text-featured-post-title-${post.id}`}>
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`text-featured-post-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50"
                        alt="Author"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-muted-foreground" data-testid={`text-featured-post-author-${post.id}`}>
                        {post.authorName || 'AstroMystic Team'}
                      </span>
                    </div>
                    <button 
                      className="text-primary hover:text-primary/80 transition-colors duration-200"
                      data-testid={`button-read-featured-post-${post.id}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mock posts when no real posts are available */}
            <article className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer" data-testid="mock-featured-article-1">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                alt="Understanding Mercury Retrograde Effects"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                    Planetary Transits
                  </span>
                  <span className="text-xs text-muted-foreground">Dec 15, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                  Understanding Mercury Retrograde: How It Affects Your Daily Life
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  Discover the truth behind Mercury retrograde and learn practical tips to navigate these cosmic periods with ease...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50"
                      alt="Author Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-muted-foreground">AstroMystic Team</span>
                  </div>
                  <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>

            <article className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer" data-testid="mock-featured-article-2">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                alt="Zodiac Signs Compatibility Guide"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
                    Love & Relationships
                  </span>
                  <span className="text-xs text-muted-foreground">Dec 12, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                  The Complete Guide to Zodiac Sign Compatibility in Love
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  Explore which zodiac signs are most compatible in romantic relationships and understand the cosmic dynamics of love...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50"
                      alt="Author Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-muted-foreground">AstroMystic Team</span>
                  </div>
                  <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>

            <article className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer" data-testid="mock-featured-article-3">
              <img
                src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                alt="Career Success Through Astrology"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-gold-400/20 text-gold-400 text-xs font-medium rounded-full">
                    Career & Finance
                  </span>
                  <span className="text-xs text-muted-foreground">Dec 10, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                  Using Astrology to Find Your Perfect Career Path
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  Learn how your birth chart can reveal your natural talents and guide you toward a fulfilling career aligned with your cosmic blueprint...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50"
                      alt="Author Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-muted-foreground">AstroMystic Team</span>
                  </div>
                  <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            className="px-8 py-3 bg-gradient-to-r from-accent to-mystic-600 text-foreground rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            onClick={() => window.location.href = "/blog"}
            data-testid="button-read-more-articles"
          >
            Read More Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
