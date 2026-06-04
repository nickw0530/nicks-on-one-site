/**
 * NICK'S ON ONE - Newsstand Editorial design system
 * Home page
 */

import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import SubscribeForm from "@/components/SubscribeForm";
import { ASSETS, POSTS, SITE } from "@/lib/site";
import { ArrowRight, ArrowUpRight, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

function YouTubeSection() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const CHANNEL_ID = "UCYBJLlAgN1SfIYe3zRE1CyQ";
  const CHANNEL_URL = "https://www.youtube.com/@nicks_on_one";

  useEffect(() => {
    const url = "https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=" + CHANNEL_ID;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const latest = data.items[0];
          const id = latest.link.split("v=")[1]?.split("&")[0];
          if (id) {
            setVideoId(id);
            setVideoTitle(latest.title || "Latest Video");
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section className="py-16 border-t border-[#E8E0D5]">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Youtube className="w-5 h-5 text-[color:var(--noo-accent)]" />
            <span className="kicker">Watch</span>
          </div>
          <h2 className="mt-1 font-display text-3xl font-black tracking-tight leading-tight">
            Latest from the Channel
          </h2>

          {videoId ? (
            <>
              <p className="mt-3 text-lg text-foreground/70 max-w-xl">
                Prefer to watch? The latest video is right here — or click through to YouTube.
              </p>
              <div className="mt-6 aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={"https://www.youtube.com/embed/" + videoId + "?autoplay=0"}
                  title={videoTitle}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="mt-3 text-sm text-foreground/50 font-mono uppercase tracking-widest">
                {videoTitle}
              </p>
            </>
          ) : (
            <div className="mt-6 border-2 border-dashed border-ink/15 rounded-sm p-10 text-center">
              <p className="text-lg text-foreground/60 max-w-md mx-auto">
                New videos coming soon. Subscribe to the channel so you don't miss them.
              </p>
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 btn-primary"
              >
                Visit the YouTube Channel <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [latest, ...rest] = POSTS;
  const recent = rest.slice(0, 5);

  return (
    <PageLayout
      title="Nick's On One | Personal Blog & Real Thoughts"
      description="Nick's On One is a personal blog for honest thoughts, humor, real-life essays."
      keywords="Nick's On One, NicksOn1, personal blog, honest writing"
    >
      <section className="relative overflow-hidden">
        <div className="container pt-12 md:pt-20 pb-16 md:pb-28">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <span className="kicker">Issue No. 01</span>
            <span className="rule-thin flex-1" />
            <span className="kicker-ink">Personal - Honest - On One</span>
          </div>
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-7">
              <h1 className="font-display text-[clamp(3rem,9vw,7rem)] font-black leading-[0.9] tracking-[-0.03em]">
                Real thoughts.
                <br />
                Sharp <span className="italic font-light">edges.</span>
                <br />
                <span className="text-accent">No pretending.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-foreground/70 max-w-lg leading-relaxed">
                {SITE.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/blog">
                  <button className="btn-primary">Read the Latest Post <ArrowRight className="inline w-4 h-4 ml-1" /></button>
                </Link>
                <Link href="/subscribe">
                  <button className="btn-outline">Subscribe</button>
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="author-frame">
                <img src={ASSETS.headshot} alt="Portrait of Nick Williams, writer of Nick's On One" className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-xs font-mono uppercase tracking-[0.14em] text-foreground/40">Written by</p>
              <p className="text-xl font-display font-black">Nick Williams</p>
            </div>
          </div>
        </div>
      </section>

      {latest && (
        <section className="border-t border-[#E8E0D5]">
          <div className="container py-12 md:py-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="dot-live" />
              <span className="kicker">The Lead Story - Newest Post</span>
            </div>
            <div className="grid grid-cols-12 gap-8 items-start">
              <div className="col-span-12 md:col-span-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {latest.categories.slice(0, 3).map((c) => (
                    <span key={c} className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--noo-accent)]">{c}</span>
                  ))}
                </div>
                <a href={latest.externalUrl} className="group">
                  <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] group-hover:text-[color:var(--noo-accent)] transition-colors">
                    {latest.title}
                  </h2>
                </a>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-ink/50">{latest.dateLabel}</p>
                <p className="mt-6 text-lg text-ink/70 leading-relaxed max-w-2xl">{latest.excerpt}</p>
                <a href={latest.externalUrl} className="mt-6 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/65 hover:text-[color:var(--noo-accent)] transition-colors">
                  Read More <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-[#E8E0D5]">
        <div className="container py-12 md:py-16">
          <blockquote className="max-w-3xl">
            <p className="font-display font-bold text-2xl md:text-3xl leading-tight text-ink/85">
              "This is a space for real thoughts, honest takes, and the kind of writing that doesn't pretend everything is fine."
            </p>
            <footer className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-ink/50">
              — Nick Williams, Founder
            </footer>
          </blockquote>
          <div className="mt-8">
            <Link href="/about">
              <button className="btn-outline">About Nick</button>
            </Link>
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="border-t border-[#E8E0D5]">
          <div className="container py-12 md:py-16">
            <div className="flex items-center justify-between mb-10">
              <span className="kicker">Recent Issues</span>
              <Link href="/blog">
                <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/55 hover:text-ink transition-colors flex items-center gap-1">
                  All Posts <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {recent.map((post) => (
                <a key={post.slug} href={post.externalUrl} className="group flex flex-col">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.categories.slice(0, 2).map((c) => (
                      <span key={c} className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--noo-accent)]">{c}</span>
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-lg leading-snug tracking-[-0.01em] group-hover:text-[color:var(--noo-accent)] transition-colors">{post.title}</h3>
                  <p className="mt-2 text-sm text-ink/60 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">{post.dateLabel}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <YouTubeSection />

      <section className="border-t border-[#E8E0D5] bg-ink text-paper">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50 mb-2">Part of the Network</p>
              <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 mb-4">
                <span className="font-display font-black text-xl group-hover:text-[color:var(--noo-accent)] transition-colors">{SITE.parent}</span>
                <ArrowUpRight className="w-4 h-4 text-paper/40 group-hover:text-[color:var(--noo-accent)]" />
              </a>
              <p className="text-sm text-paper/60">The parent brand - creative strategy &amp; media.</p>
              <a href={SITE.podcastUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 mt-6 mb-2">
                <span className="font-display font-black text-xl group-hover:text-[color:var(--noo-accent)] transition-colors">Mosaic Minds Podcast</span>
                <ArrowUpRight className="w-4 h-4 text-paper/40 group-hover:text-[color:var(--noo-accent)]" />
              </a>
              <p className="text-sm text-paper/60">Long-form conversations. No filter.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-paper/10">
        <div className="container py-16 md:py-20">
          <div className="max-w-xl mx-auto text-center">
            <span className="kicker-paper">Subscribe</span>
            <h2 className="mt-4 font-display font-black text-3xl md:text-4xl text-paper">
              Get the next one before everyone else.
            </h2>
            <p className="mt-4 text-paper/60 leading-relaxed">
              New posts, honest takes, and occasional thoughts worth opening.
            </p>
            <div className="mt-8">
              <SubscribeForm variant="dark" />
            </div>
            <p className="mt-4 text-paper/35 font-mono text-[11px] uppercase tracking-[0.14em]">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
