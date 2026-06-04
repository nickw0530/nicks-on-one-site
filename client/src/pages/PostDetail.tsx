/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Blog post detail page. Route: /blog/:slug
 */

import { useParams, Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import { POSTS } from "@/lib/site";
import { ArrowLeft, ArrowUpRight, Calendar, Tag } from "lucide-react";

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
            <Link href="/blog">
              <button className="btn-primary">Back to Blog</button>
            </Link>
            <Link href="/">
              <button className="btn-outline">Back Home</button>
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={post.title + " | Nick's On One"}
      description={post.excerpt}
      keywords={post.categories.join(", ")}
    >
      {/* Post header */}
      <article>
        <header className="border-b border-ink/15">
          <div className="container py-12 md:py-20">
            <Link href="/blog">
              <button className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/55 hover:text-ink transition-colors mb-8">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Blog
              </button>
            </Link>

            <div className="max-w-3xl">
              {/* Categories */}
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

              {/* Title */}
              <h1 className="font-display font-black text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.02em]">
                {post.title}
              </h1>

              {/* Meta */}
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

              {/* Excerpt/lead */}
              <p className="mt-8 text-xl md:text-2xl text-ink/80 leading-relaxed font-light border-l-4 border-accent pl-6">
                {post.excerpt}
              </p>
            </div>
          </div>
        </header>

        {/* Post body — shown when body content exists, otherwise link to full post */}
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl">
            {post.body ? (
              <div
                className="prose prose-lg max-w-none font-serif leading-loose text-ink/85"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            ) : (
              <div className="border-2 border-dashed border-ink/20 rounded-sm p-12 text-center">
                <Quote className="w-8 h-8 mx-auto text-ink/25 mb-4" />
                <p className="font-display font-bold text-xl text-ink/70">
                  Full article content coming soon.
                </p>
                <p className="mt-2 text-ink/50 text-sm">
                  This post is being migrated. Check back soon, or subscribe to get updates.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a href="https://www.youtube.com/@nicks_on_one" target="_blank" rel="noopener noreferrer">
                    <button className="btn-primary inline-flex items-center gap-2">
                      Watch on YouTube <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </a>
                  <Link href="/subscribe">
                    <button className="btn-outline">Subscribe for Updates</button>
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation footer */}
            <div className="mt-16 pt-8 border-t border-ink/15 flex flex-wrap items-center justify-between gap-4">
              <Link href="/blog">
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
