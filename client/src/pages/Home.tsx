/**
 * NICK'S ON ONE - Newsstand Editorial design system
 * Home page
 */

import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import SubscribeForm from "@/components/SubscribeForm";
import { ASSETS, POSTS, SITE } from "@/lib/site";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";

function YouTubeSection() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const CHANNEL_ID = "UCYBJLlAgN1SfIYe3zRE1CyQ";

  useEffect(() => {
    const url = "https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=" + CHANNEL_ID;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const latest = data.items[0];
          const id = latest.link.split("v=")[1]?.split("&")[0];
          if (id) { setVideoId(id); setVideoTitle(latest.title || "Latest Video"); }
        }
      })
      .catch(() => {});
  }, []);

  if (!videoId) return null;

  return (
    <section className="py-16 border-t border-[#E8E0D5]">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <span className="kicker">Watch</span>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight leading-tight">
            Latest from the Channel
          </h2>
          <p className="mt-3 text-lg text-foreground/70 max-w-xl">
            Prefer to watch? The latest video is right here - or click through to YouTube.
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
            <Link href={"/blog/" + latest.slug}>
              <div className="lead-frame group cursor-pointer">
                <div className="p-8 md:p-12 flex flex-col justify-between min-h-[320px]">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {latest.categories.map((c) => (
                        <span key={c} className="tag-white">{c}</span>
                      ))}
                    </div>
                    <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black leading-[1.05] tracking-[-0.025em] text-paper">
                      {latest.title}
                    </h2>
                  </div>
                  <div className="mt-8 flex items-end justify-between">
                    <div>
                      <p className="text-paper/60 text-sm font-mono uppercase tracking-[0.1em]">{latest.dateLabel}</p>
                      <p className="mt-2 text-paper/80 text-base max-w-lg leading-relaxed">{latest.excerpt}</p>
                    </div>
                    <ArrowUpRight className="w-8 h-8 text-paper/60 group-hover:text-paper transition-colors flex-shrink-0 ml-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="border-t border-[#E8E0D5] bg-[#F7F3EE]">
        <div className="container py-14 md:py-20">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-2">
              <Quote className="w-10 h-10 text-accent opacity-60" />
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="font-display text-2xl md:text-3xl font-black leading-[1.2] tracking-[-0.02em]">
                "This is a space for real thoughts, honest takes, and the kind of writing that doesn't pretend everything is fine."
              </p>
              <p className="mt-4 text-foreground/60 text-sm font-mono uppercase tracking-[0.1em]">- Nick Williams, Founder</p>
            </div>
            <div className="col-span-12 md:col-span-3 flex justify-end">
              <Link href="/about">
                <button className="btn-outline">About Nick <ArrowRight className="inline w-4 h-4 ml-1" /></button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="border-t border-[#E8E0D5]">
          <div className="container py-14 md:py-20">
            <div className="flex items-center justify-between mb-10">
              <span className="kicker">Recent Issues</span>
              <Link href="/blog">
                <button className="btn-ghost text-sm">All Posts <ArrowRight className="inline w-3 h-3 ml-1" /></button>
              </Link>
            </div>
            <div className="grid grid-cols-12 gap-6">
              {recent.map((post, i) => (
                <Link key={post.slug} href={"/blog/" + post.slug} className={i === 0 ? "col-span-12 md:col-span-6" : "col-span-12 sm:col-span-6 md:col-span-3"}>
                  <div className="post-card group h-full">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.categories.slice(0, 2).map((c) => (
                        <span key={c} className="tag">{c}</span>
                      ))}
                    </div>
                    <h3 className={"font-display font-black leading-[1.1] tracking-[-0.02em] group-hover:text-accent transition-colors " + (i === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl")}>
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/60 line-clamp-2">{post.excerpt}</p>
                    <p className="mt-4 text-xs font-mono uppercase tracking-[0.1em] text-foreground/40">{post.dateLabel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-[#E8E0D5] bg-[#1A1A1A] text-paper">
        <div className="container py-14 md:py-20">
          <span className="kicker text-paper/50">Part of the Network</span>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="network-card group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-xl font-black">{SITE.parent}</p>
                  <p className="mt-1 text-sm text-paper/60">The parent brand - creative strategy & media.</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-paper/40 group-hover:text-paper transition-colors flex-shrink-0" />
              </div>
            </a>
            <a href={SITE.podcastUrl} target="_blank" rel="noopener noreferrer" className="network-card group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-xl font-black">Mosaic Minds Podcast</p>
                  <p className="mt-1 text-sm text-paper/60">Long-form conversations. No filter.</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-paper/40 group-hover:text-paper transition-colors flex-shrink-0" />
              </div>
            </a>
          </div>
        </div>
      </section>

      <YouTubeSection />

      <section className="bg-[#0E0E0E] text-paper">
        <div className="container py-20 md:py-24">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-7">
              <span className="kicker">Subscribe</span>
              <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.015em] leading-[1]">
                Get the next one <span className="italic font-light">before everyone else.</span>
              </h2>
              <p className="mt-5 text-lg text-paper/70 max-w-xl">New posts, honest takes, and occasional thoughts worth opening.</p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <SubscribeForm variant="dark" size="lg" />
              <p className="mt-3 text-xs text-paper/40 font-mono uppercase tracking-[0.14em]">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
