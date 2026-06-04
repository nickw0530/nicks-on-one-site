/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Footer: black band — publisher's colophon. Mosaic Minds Media gets a subtle, dignified mention.
 */

import { Link } from "wouter";
import { ASSETS, NAV, SITE } from "@/lib/site";
import { Instagram, Youtube, Music2 } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="mt-24 bg-[#0E0E0E] text-paper">
      <div className="container py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              {ASSETS.logo && (
                        <img
                                              src={ASSETS.logo}
                                              alt="Nick's On One logo"
                                              className="h-11 w-11 invert"
                                            />
                      )}
              <span className="font-display font-black text-2xl tracking-tight">
                Nick's <span className="text-[color:var(--noo-accent)]">On</span> One
              </span>
            </div>
            <p className="text-paper/70 max-w-md text-[15px] leading-relaxed">
              {SITE.tagline} A personal blog for honest writing, real-life
              perspective, and the occasional rant worth opening.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/mosaic.minds.podcast"
                aria-label="Instagram"
                className="text-paper/60 hover:text-[color:var(--noo-accent)] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@mosaic.minds.podcast"
                aria-label="YouTube"
                className="text-paper/60 hover:text-[color:var(--noo-accent)] transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@mosaic.minds.podcast"
                aria-label="TikTok"
                className="text-paper/60 hover:text-[color:var(--noo-accent)] transition-colors"
              >
                <Music2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="kicker mb-4">Read</p>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper/85 hover:text-[color:var(--noo-accent)] transition-colors text-[15px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Network */}
          <div className="md:col-span-4">
            <p className="kicker mb-4">Network</p>
            <a
              href={SITE.parentUrl}
              className="flex items-center gap-3 group mb-4"
            >
                  <img src={ASSETS.mosaicLogo} alt="Mosaic Minds Media" className="w-11 h-11 rounded-full object-cover ring-1 ring-white/10" />
              <div>
                <p className="font-display font-semibold text-[15px] group-hover:text-[color:var(--noo-accent)] transition-colors">
                  Mosaic Minds Media ↗
                </p>
                <p className="text-paper/55 text-xs">Parent media studio</p>
              </div>
            </a>
            <a
              href={SITE.podcastUrl}
              className="flex items-center gap-3 group"
            >
<img src={ASSETS.podcastLogo} alt="Mosaic Minds Podcast" className="w-11 h-11 rounded-full object-cover ring-1 ring-white/10" />
              <div>
                <p className="font-display font-semibold text-[15px] group-hover:text-[color:var(--noo-accent)] transition-colors">
                  Mosaic Minds Podcast ↗
                </p>
                <p className="text-paper/55 text-xs">Long-form conversations</p>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-paper/55 text-xs font-mono uppercase tracking-[0.16em]">
            Nick's On One is part of the Mosaic Minds Media network.
          </p>
          <p className="text-paper/45 text-xs font-mono">
            © {new Date().getFullYear()} Nick's On One — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
