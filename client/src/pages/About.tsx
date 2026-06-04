/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * About page. Personal, direct, slightly irreverent voice. Headshot + bio + Mosaic mention + CTA.
 */

import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import { ASSETS, SITE } from "@/lib/site";
import { ArrowRight, Quote } from "lucide-react";

export default function About() {
  return (
    <PageLayout
      title="About | Nick's On One"
      description="Learn more about Nick's On One, a personal blog connected to the Mosaic Minds Media network."
      keywords="about Nick's On One, Nick Williams, personal blog, Mosaic Minds Media, writer bio, independent media"
    >
      {/* Header */}
      <section className="border-b border-ink/15">
        <div className="container py-14 md:py-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="kicker">About</span>
            <span className="rule-thin flex-1" />
            <span className="kicker-ink">One voice — one perspective</span>
          </div>
          <h1 className="font-display font-black tracking-[-0.02em] leading-[0.95] text-[clamp(2.5rem,7vw,5.25rem)]">
            About <span className="italic font-light">Nick's</span> On One.
          </h1>
        </div>
      </section>

      {/* Headshot + lede */}
      <section>
        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-start">
            {/* Headshot column */}
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden bg-ink">
                  <img
                    src={ASSETS.headshot}
                    alt="Portrait of Nick Williams, writer of Nick's On One"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div
                  className="absolute -left-3 -top-3 w-1 h-24 bg-[color:var(--noo-accent)]"
                  style={{ transform: "skewX(-22deg)" }}
                  aria-hidden="true"
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="kicker-ink">The writer</span>
                  <span className="font-display font-semibold text-[15px]">
                    Nick Williams
                  </span>
                </div>
              </div>
            </div>

            {/* Lede column */}
            <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
              <Quote
                className="w-12 h-12 text-[color:var(--noo-accent)] mb-4"
                aria-hidden="true"
              />
              <h2 className="font-display font-bold text-[clamp(1.6rem,3vw,2.25rem)] leading-[1.2] tracking-[-0.01em]">
                Nick's On One is where personal perspective, humor, frustration,
                and real-life observation meet. It is not polished for everyone,
                and that is the point.
              </h2>
              <div className="mt-8 space-y-5 text-ink/80 text-[16.5px] leading-[1.75]">
                <p className="dropcap">
                  Nick's On One is a place for real thoughts about real life.
                  The stuff people actually deal with but don't always say out
                  loud. Some of it's funny, some of it hits deeper, but it's all
                  honest. If it makes you laugh, think, or feel a little too
                  seen, it did its job.
                </p>
                <p>
                  There's no editorial calendar. There's no algorithm. There's
                  no guest list. Just one person writing things down — about
                  family, relationships, self-improvement, kindness, karma, and
                  the occasional Applebee's manager who probably deserved it.
                </p>
                <p className="text-ink/65 italic">
                  And if the mail isn't for you, then don't read it. This space
                  is just me putting real thoughts somewhere they can breathe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mosaic Minds connection */}
      <section className="bg-[#0E0E0E] text-paper">
        <div className="container py-16 md:py-20">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
            <div className="col-span-12 md:col-span-7">
              <span className="kicker">Connected to</span>
              <h2 className="mt-4 font-display font-bold text-[clamp(1.6rem,3.5vw,2.5rem)] leading-tight tracking-[-0.01em]">
                Part of the Mosaic Minds Media network — a small studio building
                podcasts, writing, and video for curious minds.
              </h2>
              <p className="mt-5 text-paper/70 text-[16px] leading-relaxed max-w-2xl">
                Nick co-hosts the Mosaic Minds Podcast and contributes essays
                here under the Nick's On One banner. Different formats, same
                voice — long-form thinking that doesn't fit neatly into a feed.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-center gap-4 justify-start md:justify-end">
              <img
                src={ASSETS.mosaicLogo}
                alt="Mosaic Minds Media"
                className="w-20 h-20 rounded-full object-cover ring-1 ring-white/10"
              />
              <div>
                <a
                  href={SITE.parentUrl}
                  className="font-display font-bold text-xl link-underline link-underline-accent"
                >
                  Mosaic Minds Media ↗
                </a>
                <p className="text-paper/50 text-sm mt-1 font-mono uppercase tracking-[0.14em]">
                  Parent studio
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container py-16 md:py-20">
          <div className="border-y-2 border-ink py-12 md:py-16 text-center">
            <span className="kicker">What's next</span>
            <h2 className="mt-3 font-display font-black tracking-[-0.015em] text-[clamp(1.85rem,4vw,3rem)]">
              Read something honest.
            </h2>
            <p className="mt-4 text-ink/70 max-w-xl mx-auto">
              Browse the archive or get the next post delivered the day it goes
              live.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-7 py-4 font-mono uppercase text-[12.5px] tracking-[0.18em] hover:bg-[color:var(--noo-accent)] active:scale-[0.97] transition-colors"
                style={{ transitionDuration: "180ms" }}
              >
                Read the blog <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 border border-ink text-ink px-7 py-4 font-mono uppercase text-[12.5px] tracking-[0.18em] hover:bg-ink hover:text-paper active:scale-[0.97] transition-colors"
                style={{ transitionDuration: "180ms" }}
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
