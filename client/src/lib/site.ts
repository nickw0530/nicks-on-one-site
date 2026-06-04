/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Site-wide constants. Real blog posts only — pulled from existing nicksonone.com.
 * Per brief: no fabricated content, no fake feeds.
 */

export const SITE = {
  name: "Nick's On One",
  shorthand: "NicksOn1",
  tagline: "Real thoughts. Sharp edges. No pretending.",
  description:
    "Nick's On One is a personal blog about real life, culture, humor, frustration, perspective, and the things people deal with but do not always say out loud.",
  parent: "Mosaic Minds Media",
  parentUrl: "https://mosaicmindsmedia.com",
  podcastUrl: "https://mosaicmindspodcast.com",
  email: "mosaicminds37@gmail.com",
} as const;

export const ASSETS = {
  logo: "/manus-storage/nicks-on-one-logo_1f7945d4.png",
  headshot: "/manus-storage/nick-headshot_12ebcffb.png",
  mosaicLogo: "/manus-storage/mosaic-minds-media-logo_2b33466d.png",
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Podcast", href: "/podcast" },
  { label: "Subscribe", href: "/subscribe" },
] as const;

/** Real posts archived from nicksonone.com — preserved verbatim per the brief. */
export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  categories: string[];
  excerpt: string;
  externalUrl: string;
};

export const POSTS: Post[] = [
  {
    slug: "it-was-never-just-clay",
    title: "It Was Never Just Clay",
    date: "2026-04-02",
    dateLabel: "April 2, 2026",
    categories: ["Goals/Self-Improvement", "Karma", "Personal Reflection"],
    excerpt:
      "There's a story about a Buddha statue in Thailand. For years it just sat there looking basic, covered in clay, nothing special. People walked past it like it didn't matter. At one point they even moved it because nobody saw what was underneath.",
    externalUrl: "https://nicksonone.com/f/it-was-never-just-clay",
  },
  {
    slug: "politics-the-quiet-corruption",
    title: "Politics: The Quiet Corruption",
    date: "2026-01-22",
    dateLabel: "January 22, 2026",
    categories: ["Karma", "Kindness", "Personal Reflection"],
    excerpt:
      "Politics rarely looks like temptation. It doesn't announce itself with neon sin signs or moral collapse. It shows up dressed as concern, conviction, and \"doing the right thing.\"",
    externalUrl: "https://nicksonone.com/f/politics-the-quiet-corruption",
  },
  {
    slug: "dinner-and-a-show-schooling-applebees-management",
    title: "Dinner and a Show: Schooling Applebee's Management",
    date: "2025-01-11",
    dateLabel: "January 11, 2025",
    categories: ["Karma", "Personal Reflection", "Rants"],
    excerpt:
      "Last night, a girlfriend and I decided to grab a couple of drinks and a bite to eat at Applebee's. Not my usual pick, but it's what she wanted. The place wasn't even busy — it was 9:30 PM, and most of the tables were empty.",
    externalUrl:
      "https://nicksonone.com/f/dinner-and-a-show-schooling-applebees-management",
  },
  {
    slug: "breaking-up-with-bad-habits",
    title: "Breaking Up With Bad Habits: Improving Yourself Post-Relationship",
    date: "2024-05-17",
    dateLabel: "May 17, 2024",
    categories: ["Goals/Self-Improvement", "Personal Reflection", "Relationships"],
    excerpt:
      "Breaking up is never easy. Whether it's saying goodbye to a significant other or bidding farewell to those pesky habits that hold us back, separation can be a challenging journey.",
    externalUrl:
      "https://nicksonone.com/f/breaking-up-with-bad-habits-improving-yourself-post-relationship",
  },
  {
    slug: "why-nice-guys-are-liars",
    title: "Why \"Nice Guys\" Are Liars",
    date: "2024-03-25",
    dateLabel: "March 25, 2024",
    categories: ["Kindness", "Personal Reflection", "Relationships"],
    excerpt:
      "Ah, the age-old conundrum of the \"Nice Guy\" — seemingly chivalrous, attentive, and kind, yet often criticized for hidden motives lurking beneath the surface.",
    externalUrl: "https://nicksonone.com/f/why-nice-guys-are-liars",
  },
  {
    slug: "embrace-the-zen",
    title: "Embrace the Zen: A Guide to Mindfulness in Everyday Life",
    date: "2024-03-04",
    dateLabel: "March 4, 2024",
    categories: ["Goals/Self-Improvement", "Karma", "Kindness", "Personal Reflection"],
    excerpt:
      "In today's world, where life moves at the speed of light and our to-do lists seem to never end, finding moments of peace and clarity can feel like chasing unicorns — elusive and downright mythical.",
    externalUrl:
      "https://nicksonone.com/f/embrace-the-zen-a-guide-to-mindfulness-in-everyday-life",
  },
  {
    slug: "self-love-a-relationship-cannot-survive-without-it",
    title: "Self-Love: A Relationship Cannot Survive Without It",
    date: "2024-01-27",
    dateLabel: "January 27, 2024",
    categories: ["Family", "Goals/Self-Improvement", "Karma", "Kindness", "Relationships"],
    excerpt:
      "Of the Ten Commandments in the Bible, I believe that they must go in order of importance. If that's true, then the second most important commandment is \"Thou shalt love thy neighbor as thyself.\"",
    externalUrl:
      "https://nicksonone.com/f/self-love-a-relationship-cannot-survive-without-it",
  },
  {
    slug: "procrastination",
    title: "Procrastination: Battling The Art of Not Getting Stuff Done",
    date: "2024-01-25",
    dateLabel: "January 25, 2024",
    categories: ["Goals/Self-Improvement", "Personal Reflection"],
    excerpt:
      "Before we can conquer procrastination, we must understand its roots. It's not just about laziness; there's a method to this madness.",
    externalUrl:
      "https://nicksonone.com/f/procrastination-battling-the-art-of-not-getting-stuff-done",
  },
  {
    slug: "breaking-the-mold-trade-school",
    title: "Breaking the Mold: Why Trade School Might Be Your Golden Ticket",
    date: "2024-01-24",
    dateLabel: "January 24, 2024",
    categories: ["Goals/Self-Improvement"],
    excerpt:
      "So, you've reached that pivotal moment in life where you're supposed to decide your future, and everyone's chanting the mantra of a traditional college education. Let's hit the brakes on that bandwagon.",
    externalUrl:
      "https://nicksonone.com/f/breaking-the-mold-why-trade-school-might-be-your-golden-ticket",
  },
  {
    slug: "embracing-relationship-quirks",
    title: "Embracing Relationship Quirks with a Dash of Wit",
    date: "2024-01-19",
    dateLabel: "January 19, 2024",
    categories: ["Goals/Self-Improvement", "Personal Reflection", "Relationships"],
    excerpt:
      "Hey savvy readers, Nick here — ready to spill the beans on life, love, and the thrilling rollercoaster of dating in your 40s. Buckle up because we're about to dive into the post-breakup musings.",
    externalUrl:
      "https://nicksonone.com/f/embracing-relationship-quirks-with-a-dash-of-wit",
  },
];

export const ALL_CATEGORIES = Array.from(
  new Set(POSTS.flatMap((p) => p.categories)),
).sort();
