/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Home page — magazine front. Hero → Lead story frame → About → Recent → Network → Subscribe.
 * The Lead Story uses a black frame so the latest post is unmistakably the primary CTA.
 */

import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import SubscribeForm from "@/components/SubscribeForm";
import { ASSETS, POSTS, SITE } from "@/lib/site";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
// ─── YouTube Latest Video Section ───────────────────────────────────────────
function YouTubeSection() {
    const [videoId, setVideoId] = useState<string | null>(null);
    const [videoTitle, setVideoTitle] = useState<string>("");
    const CHANNEL_ID = "UCYBJLlAgN1SfIYe3zRE1CyQ";

    useEffect(() => {
          const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
          fetch(feedUrl)
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
            })
            .catch(() => {});
    }, []);

    if (!videoId) return null;

    return (
          <section className="py-16 border-t border-[#E8E0D5]">
                <div className="container">
                        <div className="max-w-3xl mx-auto">
                                  <span className="kicker">Watch</span>span>
                                  <h2 className="mt-3 font-display text-3xl font-black tracking-[-0.02em] leading-[1.1]">
                                              Latest from the Channel
                                  </h2>h2>
                                  <p className="mt-3 text-lg text-foreground/70 max-w-xl">
                                              Prefer to watch? The latest video is right here — or click through to YouTube.
                                  </p>p>
                                  <div className="mt-6 aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                                              <iframe
                                                              width="100%"
                                                              height="100%"
                                                              src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                                                              title={videoTitle}
                                                              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                              allowFullScreen
                                                              className="w-full h-full"
                                                            />
                                  </div>div>
                                  <p className="mt-3 text-sm text-foreground/50 font-mono uppercase tracking-[0.08em]">
                                    {videoTitle}
                                  </p>p>
                        </div>div>
                </div>div>
          </section>section>
        );
}

</section>
export default function Home() {
  const [latest, ...rest] = POSTS;
  const recent = rest.slice(0, 5);

  return (
    <PageLayout
      title="Nick's On One | Personal Blog & Real Thoughts"
      description="Nick's On One is a personal blog for honest thoughts, humor, real-life perspective, and independent media from the Mosaic Minds Media network."
      keywords="Nick's On One, NicksOn1, personal blog, honest writing, real-life essays, humor, perspective, Mosaic Minds Media, Mosaic Minds Podcast, Nick Williams, independent media"
    >
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative overflow-hidden">
        <div className="container pt-12 md:pt-20 pb-16 md:pb-28">
          {/* Top kicker row */}
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <span className="kicker">Issue No. 01</span>
            <span className="rule-thin flex-1" />
            <span className="kicker-ink">Personal · Honest · On One</span>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            {/* Headline column */}
            <div className="col-span-12 lg:col-span-8">
              <h1 className="font-display font-black tracking-[-0.02em] leading-[0.95] text-[clamp(2.5rem,8vw,6rem)]">
                <span className="block hero-mask">Real thoughts.</span>
                <span
                  className="block hero-mask"
                  style={{ animationDelay: "240ms" }}
                >
                  Sharp <span className="italic font-light">edges.</span>
                </span>
                <span
                  className="block hero-mask text-[color:var(--noo-accent)]"
                  style={{ animationDelay: "420ms" }}
                >
                  No pretending.
                </span>
              </h1>

              <p className="mt-7 md:mt-9 text-lg md:text-xl text-ink/75 max-w-2xl leading-relaxed">
                {SITE.description}
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={`#latest-post`}
                  className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-7 py-4 font-mono uppercase text-[12.5px] tracking-[0.18em] hover:bg-[color:var(--noo-accent)] active:scale-[0.97] transition-colors"
                  style={{ transitionDuration: "180ms" }}
                >
                  Read the Latest Post
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 border border-ink text-ink px-7 py-4 font-mono uppercase text-[12.5px] tracking-[0.18em] hover:bg-ink hover:text-paper active:scale-[0.97] transition-colors"
                  style={{ transitionDuration: "180ms" }}
                >
                  Subscribe
                </Link>
              </div>
            </div>

            {/* Headshot — duotone-ish crop bleeding right */}
            <div className="col-span-12 lg:col-span-4 lg:pl-4">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden bg-ink">
                  <img
                    src={ASSETS.headshot}
                    alt="Portrait of Nick Williams, writer of Nick's On One"
                    className="w-full h-full object-cover object-top mix-blend-luminosity opacity-95 contrast-110"
                    loading="eager"
                  />
                </div>
                {/* Accent slash overlay */}
                <div
                  className="absolute -left-3 -top-3 w-1 h-24 bg-[color:var(--noo-accent)]"
                  style={{ transform: "skewX(-22deg)" }}
                  aria-hidden="true"
                />
                <div className="mt-3 flex items-center justify-between">
                  <span className="kicker-ink">Written by</span>
                  <span className="font-display font-semibold text-[15px]">
                    Nick Williams
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom hairline */}
        <div className="container">
          <div className="rule-ink" />
        </div>
      </section>

      {/* ─────────────── LEAD STORY ─────────────── */}
      <section id="latest-post" className="bg-paper">
        <div className="container py-16 md:py-24">
          <div className="flex items-center gap-3 mb-8 reveal">
            <span className="pulse-dot" />
            <span className="kicker">The Lead Story · Newest Post</span>
          </div>

          {latest ? (
            <article className="reveal grid grid-cols-12 gap-6 md:gap-10 border-t-2 border-b-2 border-ink py-10 md:py-14">
              <div className="col-span-12 md:col-span-3">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60 mb-3">
                  {latest.dateLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {latest.categories.map((c) => (
                    <span
                      key={c}
                      className="font-mono text-[10.5px] uppercase tracking-[0.14em] border border-ink/30 px-2 py-0.5"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-display font-black tracking-[-0.015em] leading-[1.02] text-[clamp(2rem,5.4vw,4.25rem)]">
                  <a
                    href={latest.externalUrl}
                    className="link-underline link-underline-accent"
                  >
                    {latest.title}
                  </a>
                </h2>
                <p className="mt-6 text-lg text-ink/80 leading-relaxed max-w-3xl">
                  {latest.excerpt}
                </p>
                <a
                  href={latest.externalUrl}
                  className="mt-8 inline-flex items-center gap-2 font-mono uppercase text-[12.5px] tracking-[0.18em] text-ink group"
                >
                  <span className="link-underline link-underline-accent">
                    Read the full essay
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ) : (
            <div className="border-2 border-dashed border-ink/30 p-10 text-center">
              <p className="font-display font-bold text-2xl">
                Latest post coming soon.
              </p>
              <p className="text-ink/60 mt-2">
                Subscribe below to be the first to read it.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────── ABOUT BAND ─────────────── */}
      <section className="bg-[#0E0E0E] text-paper">
        <div className="container py-20 md:py-28">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-4">
              <span className="kicker">About — Nick's On One</span>
              <h2 className="mt-5 font-display font-black tracking-[-0.015em] leading-[1.02] text-[clamp(2rem,4.6vw,3.5rem)]">
                The mail isn't for everyone.{" "}
                <span className="italic font-light text-paper/70">
                  And that's fine.
                </span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <Quote
                className="w-10 h-10 text-[color:var(--noo-accent)] mb-4"
                aria-hidden="true"
              />
              <p className="dropcap text-[18px] md:text-[19px] leading-[1.7] text-paper/90 reveal">
                Nick's On One is a place for real thoughts about real life. The
                stuff people actually deal with but don't always say out loud.
                Some of it's funny, some of it hits deeper, but it's all honest.
                If it makes you laugh, think, or feel a little too seen, it did
                its job.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href="/about"
                  className="font-mono uppercase text-[12.5px] tracking-[0.18em] link-underline link-underline-accent"
                >
                  More about Nick →
                </Link>
                <Link
                  href="/blog"
                  className="font-mono uppercase text-[12.5px] tracking-[0.18em] link-underline link-underline-accent"
                >
                  Browse the archive →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── RECENT POSTS ─────────────── */}
      <section className="bg-paper">
        <div className="container py-20 md:py-28">
          <div className="flex items-end justify-between mb-10 md:mb-14 gap-4">
            <div>
              <span className="kicker">From the archive</span>
              <h2 className="mt-3 font-display font-black tracking-[-0.015em] text-[clamp(1.85rem,4vw,3rem)]">
                Recent dispatches
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 font-mono uppercase text-[12.5px] tracking-[0.18em] link-underline link-underline-accent shrink-0"
            >
              All posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ul className="divide-y-2 divide-ink/15 border-t-2 border-b-2 border-ink/15">
            {recent.map((post, i) => (
              <li key={post.slug} className="reveal">
                <a
                  href={post.externalUrl}
                  className="grid grid-cols-12 gap-4 md:gap-6 py-7 md:py-9 group items-baseline"
                >
                  <span className="col-span-2 md:col-span-1 font-mono text-xs text-ink/45 tabular-nums pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 md:col-span-3">
                    <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/55">
                      {post.dateLabel}
                    </p>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--noo-accent)]">
                      {post.categories[0]}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-7 md:col-start-6">
                    <h3 className="font-display font-bold text-2xl md:text-[1.85rem] leading-[1.1] tracking-[-0.01em] group-hover:text-[color:var(--noo-accent)] transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="mt-2.5 text-ink/70 leading-relaxed text-[15px] md:max-w-xl">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="hidden md:flex col-span-1 justify-end items-start pt-2">
                    <ArrowUpRight className="w-5 h-5 text-ink/40 group-hover:text-[color:var(--noo-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono uppercase text-[12.5px] tracking-[0.18em] link-underline link-underline-accent"
            >
              All posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── MOSAIC NETWORK ─────────────── */}
      <section className="border-t border-rule">
        <div className="container py-16 md:py-20">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-4">
              <span className="kicker-ink">From the network</span>
              <h2 className="mt-3 font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-[-0.01em]">
                From the Mosaic Minds Media Network.
              </h2>
              <p className="mt-4 text-ink/70 text-[15.5px] leading-relaxed max-w-md">
                Nick's On One is part of the larger Mosaic Minds Media
                ecosystem, connecting personal essays, podcast conversations,
                and independent media projects.
              </p>
            </div>

            <div className="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Media card */}
              <a
                href={SITE.parentUrl}
                className="group border border-ink/15 p-6 hover:border-ink transition-colors"
                style={{ transitionDuration: "180ms" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={ASSETS.mosaicLogo}
                    alt="Mosaic Minds Media"
                    className="w-11 h-11 rounded-full object-cover ring-1 ring-ink/10"
                  />
                  <span className="kicker-ink">Studio</span>
                </div>
                <h3 className="font-display font-bold text-xl tracking-[-0.01em] group-hover:text-[color:var(--noo-accent)] transition-colors">
                  Mosaic Minds Media
                </h3>
                <p className="text-ink/65 text-[14.5px] mt-2 leading-relaxed">
                  A creative studio and podcast network for thoughtful
                  conversations and original writing.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono uppercase text-[11.5px] tracking-[0.18em]">
                  Visit Mosaic Minds Media{" "}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>

              {/* Podcast card */}
              <a
                href={SITE.podcastUrl}
                className="group border border-ink/15 p-6 hover:border-ink transition-colors"
                style={{ transitionDuration: "180ms" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center font-display font-bold text-sm">
                    MM
                  </div>
                  <span className="kicker-ink">Podcast</span>
                </div>
                <h3 className="font-display font-bold text-xl tracking-[-0.01em] group-hover:text-[color:var(--noo-accent)] transition-colors">
                  Mosaic Minds Podcast
                </h3>
                <p className="text-ink/65 text-[14.5px] mt-2 leading-relaxed">
                  Long-form conversations with creators, thinkers, and everyday
                  people whose stories deserve a wider stage.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono uppercase text-[11.5px] tracking-[0.18em]">
                  Listen to Mosaic Minds Podcast{" "}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── YOUTUBE ─────────────── */}
              <YouTubeSection />

      {/* ─────────────── SUBSCRIBE ─────────────── */}
      <section className="bg-[#0E0E0E] text-paper">
        <div className="container py-20 md:py-24">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-7">
              <span className="kicker">Subscribe</span>
              <h2 className="mt-4 font-display font-black tracking-[-0.015em] leading-[1] text-[clamp(2.25rem,5.4vw,4rem)]">
                Get the next one{" "}
                <span className="italic font-light text-paper/75">
                  before everyone else.
                </span>
              </h2>
              <p className="mt-5 text-lg text-paper/70 max-w-xl">
                New posts, honest takes, and occasional thoughts worth opening.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <SubscribeForm variant="dark" size="lg" />
              <p className="mt-3 text-xs text-paper/40 font-mono uppercase tracking-[0.14em]">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
