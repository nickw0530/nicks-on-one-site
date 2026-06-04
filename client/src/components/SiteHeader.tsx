h/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Header: thin top rule, kicker meta strip, logo lockup left, nav right.
 * Mobile: full-bleed black overlay with numbered menu (table-of-contents feel).
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ASSETS, NAV, SITE } from "@/lib/site";
import { Menu, X } from "lucide-react";

export default function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-rule">
      {/* Meta strip — masthead */}
      <div className="hidden md:block border-b border-rule/70">
        <div className="container flex items-center justify-between py-1.5 text-[11px]">
          <span className="kicker-ink">Vol. 1 — {SITE.shorthand}</span>
          <span className="kicker-ink">{todayLabel}</span>
          <span className="kicker-ink flex items-center gap-2">
            <span className="pulse-dot" /> On One — Live thoughts, posted slowly
          </span>
        </div>
      </div>

      <div className="container flex items-center justify-between py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
                    <img
                                  src={ASSETS.logo}
                                  alt="Nick's On One logo"
                                  className="h-10 w-10 md:h-11 md:w-11 object-contain"
                                />
          <span className="font-display font-black tracking-tight text-[1.3rem] md:text-[1.55rem] leading-none">
            Nick's <span className="text-[color:var(--noo-accent)]">On</span> One
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
          {NAV.slice(0, 4).map((item) => {
            const active = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-[12.5px] uppercase tracking-[0.18em] link-underline link-underline-accent ${
                  active ? "text-[color:var(--noo-accent)]" : "text-ink hover:text-[color:var(--noo-accent)]"
                } transition-colors duration-200`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/subscribe"
            className="font-mono text-[12.5px] uppercase tracking-[0.18em] bg-ink text-paper px-4 py-2 hover:bg-[color:var(--noo-accent)] transition-colors duration-200 active:scale-[0.97]"
            style={{ transitionDuration: "180ms" }}
          >
            Subscribe →
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0E0E0E] text-paper md:hidden transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="container flex items-center justify-between py-4 border-b border-white/15">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                        <img src={ASSETS.logo} alt="Nick's On One" className="h-9 w-9 invert" />
            <span className="font-display font-black tracking-tight text-xl">
              Nick's On One
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-2 -mr-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav aria-label="Mobile" className="container py-8">
          <p className="kicker mb-6">Contents</p>
          <ul className="space-y-1">
            {NAV.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 py-4 border-b border-white/12 group"
                >
                  <span className="font-mono text-xs text-white/50 tabular-nums w-7">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display font-bold text-3xl group-hover:text-[color:var(--noo-accent)] transition-colors duration-200">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <p className="kicker mb-3 text-white/60" style={{ color: "rgba(255,255,255,0.6)" }}>
              Part of the network
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/80">
              <a href={SITE.parentUrl} className="link-underline w-fit">Mosaic Minds Media ↗</a>
              <a href={SITE.podcastUrl} className="link-underline w-fit">Mosaic Minds Podcast ↗</a>
            </div>
          </div>
        </nav>
      </div>

      {/* Subtle accent rule that thickens on scroll */}
      <div
        className={`absolute left-0 right-0 bottom-0 h-px bg-[color:var(--noo-accent)] origin-left transition-transform duration-300 ${
          scrolled ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </header>
  );
}
