/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Page layout wrapper: per-page <title>, <meta description>, and a global reveal IntersectionObserver.
 * Keeps SEO metadata tight without adding heavy libs (react-helmet etc.).
 */

import { type ReactNode, useEffect } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

interface PageLayoutProps {
  title: string;
  description: string;
  keywords?: string;
  children: ReactNode;
}

export default function PageLayout({ title, description, keywords, children }: PageLayoutProps) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    // Keywords meta tag
    if (keywords) {
      let kw = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
      if (!kw) {
        kw = document.createElement("meta");
        kw.name = "keywords";
        document.head.appendChild(kw);
      }
      kw.content = keywords;
    }

    // OG title/description
    const setOg = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setOg("og:title", title);
    setOg("og:description", description);
  }, [title, description, keywords]);

  // Section reveal observer
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            setTimeout(() => el.classList.add("reveal-in"), i * 60);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [children]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
