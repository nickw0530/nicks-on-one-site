/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * 404 page. Editorial tone, not robotic.
 */

import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <PageLayout
      title="Not Found | Nick's On One"
      description="The page you were looking for doesn't exist."
    >
      <section>
        <div className="container py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="kicker">Error · 404</span>
            <h1 className="mt-4 font-display font-black tracking-[-0.02em] leading-[0.95] text-[clamp(3rem,9vw,7rem)]">
              That page <span className="italic font-light">isn't</span>{" "}
              <span className="text-[color:var(--noo-accent)]">on one.</span>
            </h1>
            <p className="mt-7 text-lg text-ink/70 max-w-xl">
              The link probably moved, or maybe it was never there to begin
              with. Either way, here are some pages that definitely exist.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-7 py-4 font-mono uppercase text-[12.5px] tracking-[0.18em] hover:bg-[color:var(--noo-accent)] active:scale-[0.97] transition-colors"
                style={{ transitionDuration: "180ms" }}
              >
                Back home <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 border border-ink text-ink px-7 py-4 font-mono uppercase text-[12.5px] tracking-[0.18em] hover:bg-ink hover:text-paper active:scale-[0.97] transition-colors"
                style={{ transitionDuration: "180ms" }}
              >
                Read the blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
