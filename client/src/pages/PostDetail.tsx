h/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Blog post detail page. Route: /blog/:slug
 */

import { useState } from "react";
import { useParams, Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import { POSTS } from "@/lib/site";
import { ArrowLeft, ArrowUpRight, Calendar, Tag, Share2, Link2, Check } from "lucide-react";

/** Simple markdown-to-HTML converter for blog post body content */
function parseMarkdown(md: string): string {87
                                            
  let html = md
    // Escape any existing HTML to prevent XSS
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Headings
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold and italic
          .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Images (before links so ![alt](url) is parsed first)
                      .replace(/!\[([^\]]*)]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full rounded-sm my-6 shadow-sm" />')
    // Links
          .replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2" class="text-accent underline underline-offset-2 hover:opacity-80" target="_blank" rel="noopener noreferrer">$1</a>')
    // Horizontal rule
    .replace(/^---$/gm, "<hr class=\"border-ink/15 my-8\" />")
    // Blockquotes
    .replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-accent pl-6 my-6 text-ink/70 italic">$1</blockquote>')
    // Unordered list items
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    // Wrap consecutive li elements in ul
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul class="list-disc list-outside ml-6 my-4 space-y-1">${match}</ul>`)
    // Ordered list items
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Paragraphs — wrap lines that aren't already block elements
    .split("\n\n")
    .map((para) => {
      const trimmed = para.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h") || trimmed.startsWith("<ul") || trimmed.startsWith("<ol") || trimmed.startsWith("<blockquote") || trimmed.startsWith("<hr") || trimmed.startsWith("<img")) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
  return html;
}

/** Extract a YouTube video ID from common URL formats and return an embed URL */
function getYouTubeEmbed(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return "https://www.youtube.com/embed/" + m[1];
  }
  return null;
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <PageLayout title="Not Found | Nick's On One" description="">
        <section className="container py-24 text-center">
          <span className="kicker">Error 404</span>
          <h1 className="mt-4 font-display font-black text-5xl md:text-7xl leading-none tracking-tight">
            That post isn't <span className="text-accent">here.</span>
          </h1>
          <p className="mt-6 text-ink/60 text-lg max-w-md mx-auto">
            The post you're looking for may have moved or doesn't exist yet.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/">
              <button className="btn-primary">Back to Home</button>
            </Link>
            <Link href="/">
              <button className="btn-outline">Back Home</button>
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const embedUrl = post.youtubeUrl ? getYouTubeEmbed(post.youtubeUrl) : null;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://nicksonone.com" + post.externalUrl;
  const shareText = post.title;
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) { /* clipboard unavailable */ }
  };

  return (
    <PageLayout
      title={post.title + " | Nick's On One"}
      description={post.excerpt}
      keywords={post.categories.join(", ")}
    >
      <article>
        <header className="border-b border-ink/15">
          <div className="container py-12 md:py-20">
            <Link href="/">
              <button className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/55 hover:text-ink transition-colors mb-8">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </button>
            </Link>

            <div className="max-w-3xl">
              {/* Cover image */}
              {post.coverImage && (
                <div className="mb-8 rounded-sm overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              )}

              {/* YouTube video embed */}
              {embedUrl && (
                <div className="mb-8 rounded-sm overflow-hidden aspect-video bg-ink">
                  <iframe
                    className="w-full h-full"
                    src={embedUrl}
                    title={post.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-5">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {cat}
                  </span>
                ))}
              </div>

              <h1 className="font-display font-black text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.02em]">
                {post.title}
              </h1>

              <div className="mt-6 flex items-center gap-4 text-ink/55">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.dateLabel}
                </span>
                <span className="text-ink/25">|</span>
                <span className="font-mono text-xs uppercase tracking-widest">
                  Nick Williams
                </span>
              </div>

              <p className="mt-8 text-xl md:text-2xl text-ink/80 leading-relaxed font-light border-l-4 border-accent pl-6">
                {post.excerpt}
              </p>
            </div>
          </div>
        </header>

        <div className="container py-12 md:py-16">
          <div className="max-w-3xl">
            {post.body ? (
              <div
                className="prose-post text-ink/85 leading-loose text-lg"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(post.body) }}
              />
            ) : (
              <div className="border-2 border-dashed border-ink/20 rounded-sm p-12 text-center">
                <p className="font-display font-bold text-2xl text-ink/70">
                  Full article coming soon.
                </p>
                <p className="mt-2 text-ink/50 text-sm max-w-md mx-auto">
                  This post is being migrated to the new site. You can add the full content by going to <strong>nicksonone.com/admin</strong> and editing this post there.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a href="https://nicksonone.com/admin" target="_blank" rel="noopener noreferrer">
                    <button className="btn-primary inline-flex items-center gap-2">
                      Add Content in CMS <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </a>
                  <Link href="/subscribe">
                    <button className="btn-outline">Subscribe for Updates</button>
                  </Link>
                </div>
              </div>
            )}

            {/* Share this post */}
            <div className="mt-14 pt-8 border-t border-ink/15">
              <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/55 flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5" />
                Share this post
              </span>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="inline-flex items-center gap-2 px-4 py-2 border border-ink/20 rounded-sm font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink/70 hover:bg-ink hover:text-paper transition-colors">
                  X / Twitter
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="inline-flex items-center gap-2 px-4 py-2 border border-ink/20 rounded-sm font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink/70 hover:bg-ink hover:text-paper transition-colors">
                  Facebook
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="inline-flex items-center gap-2 px-4 py-2 border border-ink/20 rounded-sm font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink/70 hover:bg-ink hover:text-paper transition-colors">
                  LinkedIn
                </a>
                <button onClick={handleCopy} aria-label="Copy link" className="inline-flex items-center gap-2 px-4 py-2 border border-ink/20 rounded-sm font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink/70 hover:bg-ink hover:text-paper transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy Link"}
                </button>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-ink/15 flex flex-wrap items-center justify-between gap-4">
              <Link href="/">
                <button className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/55 hover:text-ink transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  All Posts
                </button>
              </Link>
              <Link href="/subscribe">
                <button className="btn-primary">
                  Subscribe for More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
