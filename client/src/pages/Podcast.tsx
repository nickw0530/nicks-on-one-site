/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Podcast / Mosaic Minds page. Per brief: keep simple — short intro + outbound links to
 * Mosaic Minds Podcast and Mosaic Minds Media. NO fake embed.
 */

import PageLayout from "@/components/PageLayout";
import { ASSETS, SITE } from "@/lib/site";
import { ArrowUpRight, Headphones, Youtube } from "lucide-react";

export default function Podcast() {
  return (
    <PageLayout
      title="Podcast & Mosaic Minds | Nick's On One"
      description="Explore Mosaic Minds Podcast and Mosaic Minds Media, connected projects within the same independent media ecosystem as Nick's On One."
      keywords="Mosaic Minds Podcast, Mosaic Minds Media, Nick's On One, independent podcast, video podcast, Nick Williams, Jason Yocum"
    >
      {/* Header */}
      <section className="border-b border-ink/15">
        <div className="container py-14 md:py-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="kicker">Sister projects</span>
            <span className="rule-thin flex-1" />
            <span className="kicker-ink">Same voice — different format</span>
          </div>
          <h1 className="font-display font-black tracking-[-0.02em] leading-[0.95] text-[clamp(2.5rem,7vw,5.25rem)]">
            Podcast{" "}
            <span className="text-[color:var(--noo-accent)]">&amp;</span>{" "}
            Mosaic Minds.
          </h1>
          <p className="mt-6 text-lg text-ink/70 max-w-2xl leading-relaxed">
            If the writing here resonates, the conversations and projects
            happening across the Mosaic Minds Media network probably will too.
          </p>
        </div>
      </section>

      {/* Two big project cards */}
      <section>
        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Podcast */}
            <a
              href={SITE.podcastUrl}
              className="group bg-[#0E0E0E] text-paper p-8 md:p-12 transition-colors hover:bg-[#161514] flex flex-col justify-between min-h-[420px]"
              style={{ transitionDuration: "200ms" }}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-paper/10 flex items-center justify-center ring-1 ring-white/15">
                    <Headphones className="w-5 h-5 text-[color:var(--noo-accent)]" />
                  </div>
                  <span className="kicker">Podcast</span>
                </div>
                <h2 className="font-display font-black text-[clamp(2rem,3.5vw,2.75rem)] tracking-[-0.015em] leading-[1.05]">
                  Mosaic Minds Podcast
                </h2>
                <p className="mt-5 text-paper/75 text-[16px] leading-relaxed">
                  Long-form conversations with creators, thinkers, and everyday
                  people whose stories deserve a wider stage. Available in
                  video and audio.
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-3">
                <span className="font-mono uppercase text-[11.5px] tracking-[0.18em] inline-flex items-center gap-2 group-hover:text-[color:var(--noo-accent)] transition-colors">
                  Listen / Watch <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="rule-thin opacity-30" />
                <div className="flex items-center gap-3 text-paper/60 text-xs font-mono uppercase tracking-[0.14em]">
                  <Youtube className="w-4 h-4" /> YouTube · Apple Podcasts ·
                  Spotify
                </div>
              </div>
            </a>

            {/* Media */}
            <a
              href={SITE.parentUrl}
              className="group border-2 border-ink p-8 md:p-12 transition-colors hover:bg-ink hover:text-paper flex flex-col justify-between min-h-[420px]"
              style={{ transitionDuration: "200ms" }}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={ASSETS.mosaicLogo}
                    alt="Mosaic Minds Media"
                    className="w-12 h-12 rounded-full object-cover ring-1 ring-ink/15"
                  />
                  <span className="kicker">Studio</span>
                </div>
                <h2 className="font-display font-black text-[clamp(2rem,3.5vw,2.75rem)] tracking-[-0.015em] leading-[1.05]">
                  Mosaic Minds Media
                </h2>
                <p className="mt-5 text-ink/75 group-hover:text-paper/75 text-[16px] leading-relaxed transition-colors">
                  A creative studio and podcast network bringing together
                  thoughtful conversations, original writing, and polished
                  video production under one umbrella.
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-3">
                <span className="font-mono uppercase text-[11.5px] tracking-[0.18em] inline-flex items-center gap-2 group-hover:text-[color:var(--noo-accent)] transition-colors">
                  Visit the studio <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="h-px bg-ink/20 group-hover:bg-paper/20 transition-colors" />
                <div className="flex items-center gap-3 text-ink/60 group-hover:text-paper/60 text-xs font-mono uppercase tracking-[0.14em] transition-colors">
                  Video production · Podcast network · Editorial
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* About the connection */}
      <section className="border-t border-ink/15 bg-paper">
        <div className="container py-16 md:py-20">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-4">
              <span className="kicker-ink">How it fits</span>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <p className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.4] text-ink">
                Nick's On One is the written voice. Mosaic Minds Podcast is the
                spoken one. Mosaic Minds Media is the studio that holds them
                both — and a few other projects taking shape behind the
                curtain.
              </p>
              <p className="mt-6 text-ink/70 text-[16px] leading-relaxed max-w-2xl">
                Same people, same standard. Independent. Slower than a feed.
                Built for the kind of stories that need more than a caption.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
