/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Blog archive page. H1: "Nick's On One Blog". Stacked editorial list with category filter.
 * Posts deep-link to existing nicksonone.com URLs (per brief, do not redesign unrelated functionality).
 */

import { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { ALL_CATEGORIES, POSTS } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

export default function Blog() {
  const [activeCat, setActiveCat] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeCat === "All") return POSTS;
    return POSTS.filter((p) => p.categories.includes(activeCat));
  }, [activeCat]);

  return (
    <PageLayout
      title="Blog | Nick's On One"
      description="Read the latest posts from Nick's On One, featuring honest personal essays, humor, real-life perspective, and unfiltered commentary."
      keywords="Nick's On One blog, personal essays, honest writing, real-life commentary, humor, self-improvement, relationships, karma, Nick Williams"
    >
      {/* Page masthead */}
      <section className="border-b border-ink/15">
        <div className="container py-14 md:py-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="kicker">The Archive</span>
            <span className="rule-thin flex-1" />
            <span className="kicker-ink">{POSTS.length} posts</span>
          </div>
          <h1 className="font-display font-black tracking-[-0.02em] leading-[0.95] text-[clamp(2.5rem,7vw,5.25rem)]">
            Nick's <span className="text-[color:var(--noo-accent)]">On One</span>{" "}
            Blog.
          </h1>
          <p className="mt-6 text-lg text-ink/70 max-w-2xl leading-relaxed">
            Personal essays, honest commentary, and the occasional rant. No
            algorithm. No pretending. Just writing that earns its place.
          </p>
        </div>
      </section>

      {/* Filter row */}
      <section className="border-b border-ink/10 sticky top-[57px] md:top-[88px] z-30 bg-paper/85 backdrop-blur-md">
        <div className="container py-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 md:gap-2 min-w-max">
            <span className="kicker-ink mr-2 shrink-0 hidden md:inline">
              Categories
            </span>
            {(["All", ...ALL_CATEGORIES] as const).map((cat) => {
              const active = activeCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`font-mono text-[11.5px] uppercase tracking-[0.14em] px-3 py-1.5 transition-colors duration-200 active:scale-[0.97] ${
                    active
                      ? "bg-ink text-paper"
                      : "border border-ink/25 text-ink/75 hover:border-ink hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Posts list */}
      <section>
        <div className="container py-12 md:py-16">
          {filtered.length === 0 ? (
            <div className="border-2 border-dashed border-ink/25 p-14 text-center">
              <p className="font-display font-bold text-2xl">
                No posts in this category yet.
              </p>
              <p className="text-ink/60 mt-2">
                Posts are being added soon. Subscribe to get the next one.
              </p>
            </div>
          ) : (
            <ul className="divide-y-2 divide-ink/15 border-t-2 border-b-2 border-ink/15">
              {filtered.map((post, i) => (
                <li key={post.slug} className="reveal">
                  <a
                    href={post.externalUrl}
                    className="grid grid-cols-12 gap-4 md:gap-6 py-7 md:py-10 group items-baseline"
                  >
                    <span className="col-span-2 md:col-span-1 font-mono text-xs text-ink/45 tabular-nums pt-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="col-span-10 md:col-span-3">
                      <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/55">
                        {post.dateLabel}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {post.categories.slice(0, 2).map((c) => (
                          <span
                            key={c}
                            className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--noo-accent)]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-7 md:col-start-6">
                      <h2 className="font-display font-bold text-2xl md:text-[2rem] leading-[1.05] tracking-[-0.01em] group-hover:text-[color:var(--noo-accent)] transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-ink/70 leading-relaxed text-[15px] md:max-w-xl">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/65 group-hover:text-[color:var(--noo-accent)] transition-colors">
                        Read More <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div className="hidden md:flex col-span-1 justify-end items-start pt-2">
                      <ArrowUpRight className="w-5 h-5 text-ink/40 group-hover:text-[color:var(--noo-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
