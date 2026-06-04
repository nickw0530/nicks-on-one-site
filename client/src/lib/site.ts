/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Site-wide constants. Real blog posts only — pulled from existing nicksonone.com.
 * Per brief: no fabricated content, no fake feeds.
 * CMS posts loaded dynamically from client/src/data/posts/*.json
 */

export const SITE = {
  name: "Nick's On One",
  shorthand: "NicksOn1",
  tagline: "Real thoughts. Sharp edges. No pretending.",
  description:
    "Nick's On One is a personal blog about real life, culture, humor, frustration, perspective shifts, and the quiet moments in between.",
  parent: "Mosaic Minds Media",
  parentUrl: "https://mosaicmindsmedia.com",
  podcastUrl: "https://mosaicmindspodcast.com",
  email: "mosaicminds37@gmail.com",
} as const;

export const ASSETS = {
    logo: "/Site-Logo.png",
  headshot: "/nick-headshot.jpg",
  mosaicLogo: "/MMM%20Logo.png",
    podcastLogo: "/Podcast%20Logo.png",
} as const;

export const NAV = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Podcast", href: "/podcast" },
  { label: "Subscribe", href: "/subscribe" },
] as const;

// ── Existing posts (static) ──────────────────────────────────────────────────

export interface Post {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  categories: string[];
  excerpt: string;
  externalUrl: string;
  coverImage?: string;
  body?: string;
}

const STATIC_POSTS: Post[] = [
  {
    slug: "it-was-never-just-clay",
    title: "It Was Never Just Clay",
    date: "2026-02-14",
    dateLabel: "February 14, 2026",
    categories: ["Goals/Self-Improvement", "Karma", "Personal Reflection"],
    excerpt:
      "There's a story about a Buddha statue in Thailand. For years it just sat there looking ordinary — a little weathered, nothing special. Then one day, during a move, someone accidentally chipped the surface and discovered the whole thing was solid gold underneath.",
    externalUrl: "/blog/it-was-never-just-clay",
  },
  {
    slug: "politics-the-quiet-corruption",
    title: "Politics: The Quiet Corruption",
    date: "2026-01-22",
    dateLabel: "January 22, 2026",
    categories: ["Karma", "Kindness", "Personal Reflection"],
    excerpt:
      "Politics rarely looks like temptation. It doesn't announce itself with neon signs or obvious moral failures. Most of the time, it just looks like compromise.",
    externalUrl: "/blog/politics-the-quiet-corruption",
  },
  {
    slug: "dinner-and-a-show-schooling-applebees-management",
    title: "Dinner and a Show: Schooling Applebee's Management",
    date: "2025-01-11",
    dateLabel: "January 11, 2025",
    categories: ["Karma", "Personal Reflection", "Rants"],
    excerpt:
      "Last night, a girlfriend and I decided to grab a couple of drinks and a bite to eat at Applebee's. What was supposed to be a simple outing turned into an unexpected lesson in customer service.",
    externalUrl: "/blog/dinner-and-a-show-schooling-applebees-management",
  },
  {
    slug: "breaking-up-with-bad-habits",
    title: "Breaking Up With Bad Habits: Improving Yourself Post-Relationship",
    date: "2024-05-17",
    dateLabel: "May 17, 2024",
    categories: ["Goals/Self-Improvement", "Personal Reflection", "Relationships"],
    excerpt:
      "Breakups are tough, but they can also be an opportunity for a fresh start. Instead of wallowing in the sadness of a past relationship, why not channel that energy into becoming the best version of yourself?",
    externalUrl: "/blog/breaking-up-with-bad-habits",
  },
  {
    slug: "embrace-the-zen",
    title: "Embrace the Zen: A Guide to Mindfulness in Everyday Life",
    date: "2024-03-04",
    dateLabel: "March 4, 2024",
    categories: ["Goals/Self-Improvement", "Karma", "Kindness", "Personal Reflection"],
    excerpt:
      "In today's world, where life moves at the speed of light and our to-do lists seem to stretch to infinity, finding peace can feel like searching for a needle in a haystack.",
    externalUrl: "/blog/embrace-the-zen",
  },
  {
    slug: "self-love-a-relationship-cannot-survive-without-it",
    title: "Self-Love: A Relationship Cannot Survive Without It",
    date: "2024-01-27",
    dateLabel: "January 27, 2024",
    categories: ["Family", "Goals/Self-Improvement", "Karma", "Kindness", "Relationships"],
    excerpt:
      "Of the Ten Commandments in the Bible, I believe that they must go in order of importance, and self-love is at the foundation of all of them.",
    externalUrl: "/blog/self-love-a-relationship-cannot-survive-without-it",
  },
  {
    slug: "procrastination",
    title: "Procrastination: Battling The Art of Not Getting Stuff Done",
    date: "2024-01-25",
    dateLabel: "January 25, 2024",
    categories: ["Goals/Self-Improvement", "Personal Reflection"],
    excerpt:
      "We've all been there — the looming deadline, the unfinished project, the task we keep pushing to tomorrow. Procrastination is an art form that many of us have mastered.",
    externalUrl: "/blog/procrastination",
  },
  {
    slug: "breaking-the-mold",
    title: "Breaking the Mold: Why Trade School Might Be Your Golden Ticket",
    date: "2024-01-22",
    dateLabel: "January 22, 2024",
    categories: ["Goals/Self-Improvement"],
    excerpt:
      "In a world where the traditional four-year college path is often seen as the gold standard, it's time to shine a light on an often-overlooked avenue: trade schools.",
    externalUrl: "/blog/breaking-the-mold",
  },
  {
    slug: "embracing-relationship-quirks",
    title: "Embracing Relationship Quirks with a Dash of Wit",
    date: "2024-01-20",
    dateLabel: "January 20, 2024",
    categories: ["Relationships"],
    excerpt:
      "Relationships can be beautifully complex — like a puzzle where you're not quite sure all the pieces came from the same box, but somehow it works.",
    externalUrl: "/blog/embracing-relationship-quirks",
  },
];

// ── CMS posts (dynamic) ──────────────────────────────────────────────────────
// CMS posts are stored as JSON in client/src/data/posts/*.json
// They are loaded via Vite's import.meta.glob at build time.

const jsonModules = import.meta.glob('../data/posts/*.json', { eager: true });

function makeDateLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const CMS_POSTS: Post[] = Object.values(jsonModules)
  .map((mod: any) => {
    const data = mod.default || mod;
    if (!data.slug || !data.title) return null;
    return {
      slug: data.slug,
      title: data.title,
      date: data.date || '',
      dateLabel: data.dateLabel || makeDateLabel(data.date || ''),
      categories: Array.isArray(data.categories) ? data.categories : [],
      excerpt: data.excerpt || '',
      externalUrl: data.externalUrl || '/blog/' + data.slug,
      coverImage: data.coverImage || undefined,
      body: data.body || undefined,
    } as Post;
  })
  .filter((p): p is Post => p !== null)
  .sort((a, b) => b.date.localeCompare(a.date));

// Merged: CMS posts first (newest), then static posts that aren't in CMS
const cmsSlugSet = new Set(CMS_POSTS.map(p => p.slug));
export const POSTS: Post[] = [
  ...CMS_POSTS,
  ...STATIC_POSTS.filter(p => !cmsSlugSet.has(p.slug)),
].sort((a, b) => b.date.localeCompare(a.date));


export const ALL_CATEGORIES: string[] = Array.from(
    new Set(POSTS.flatMap((p) => p.categories))
  ).sort();
