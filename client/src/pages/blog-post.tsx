import { useEffect } from "react";
import { Link, useParams } from "wouter";
import Navigation from "@/components/Navigation";
import DonationBanner from "@/components/DonationBanner";
import Footer from "@/components/Footer";
import BlogCardImage from "@/components/BlogCardImage";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@shared/schema";

/** Simple markdown-like content renderer (headers, paragraphs, line breaks) */
function renderContent(content: string): string {
  const blocks = content.split(/\n\n+/);
  const html = blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^###\s/.test(trimmed)) {
        return `<h3 class="text-lg font-semibold mt-6 mb-2">${escapeHtml(trimmed.slice(4))}</h3>`;
      }
      if (/^##\s/.test(trimmed)) {
        return `<h2 class="text-xl font-semibold mt-6 mb-2">${escapeHtml(trimmed.slice(3))}</h2>`;
      }
      if (/^#\s/.test(trimmed)) {
        return `<h1 class="text-2xl font-bold mt-6 mb-2">${escapeHtml(trimmed.slice(2))}</h1>`;
      }
      const withBreaks = escapeHtml(trimmed).replace(/\n/g, "<br />");
      return `<p class="mb-4 leading-relaxed">${withBreaks}</p>`;
    })
    .join("");
  return html;
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`, { credentials: "include" });
      if (!res.ok) throw new Error("Post not found");
      return res.json();
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (post?.title) document.title = `${post.title} | JMLAstro`;
    return () => {
      document.title = "JMLAstro";
    };
  }, [post?.title]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-20 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center py-12">
            <p className="text-muted-foreground">Invalid blog post URL.</p>
            <Link href="/blog">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <DonationBanner />
        <main className="pt-20 pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-48 md:h-64 bg-muted rounded-t-xl" />
              <div className="p-6 space-y-4">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-20 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center py-12">
            <p className="text-muted-foreground">This blog post could not be found.</p>
            <Link href="/blog">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const contentHtml = renderContent(post.content ?? "");

  return (
    <div className="min-h-screen">
      <Navigation />
      <DonationBanner />
      <main className="pt-20 pb-16 cosmic-bg">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 -ml-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <div className="rounded-xl overflow-hidden border border-border bg-card shadow-lg">
            <div className="aspect-video w-full max-h-[360px] bg-muted">
              <BlogCardImage post={post} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    post.category === "Planetary Transits"
                      ? "bg-primary/20 text-primary"
                      : post.category === "Love & Relationships"
                        ? "bg-accent/20 text-accent"
                        : post.category === "Career & Finance"
                          ? "bg-gold-400/20 text-gold-400"
                          : "bg-mystic-500/20 text-mystic-500"
                  }`}
                >
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: "long" }) : ""}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  JMLAstro Team
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{post.title}</h1>
              {post.excerpt && <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>}
              <div
                className="max-w-none text-foreground/90 blog-content [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
