import type { Context } from "@netlify/functions";

interface VideoItem {
  id: string;
  title: string;
  published: string;
}

const cache = new Map<string, { data: VideoItem[]; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function looksLikeShortTitle(title: string): boolean {
  if (/#shorts?\b/i.test(title)) return true;
  const hashtags = title.match(/#[A-Za-z0-9_]+/g);
  return !!hashtags && hashtags.length >= 2;
}

async function isShortVideo(id: string): Promise<boolean> {
  try {
    const res = await fetch("https://www.youtube.com/shorts/" + id, { method: "HEAD", redirect: "manual" });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function fetchFeed(channelId: string): Promise<VideoItem[]> {
  const cached = cache.get(channelId);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
  const url = "https://www.youtube.com/feeds/videos.xml?channel_id=" + channelId;
  const res = await fetch(url);
  if (!res.ok) throw new Error("feed fetch failed: " + res.status);
  const xml = await res.text();
  const entries = xml.split("<entry>").slice(1);
  const candidates: VideoItem[] = [];
  for (const entry of entries) {
    const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
    const pubMatch = entry.match(/<published>([^<]+)<\/published>/);
    if (!idMatch) continue;
    candidates.push({ id: idMatch[1], title: titleMatch ? titleMatch[1] : "Latest Video", published: pubMatch ? pubMatch[1] : "" });
  }
  const items: VideoItem[] = [];
  for (const c of candidates) {
    if (looksLikeShortTitle(c.title)) continue;
    if (await isShortVideo(c.id)) continue;
    items.push(c);
  }
  cache.set(channelId, { data: items, ts: Date.now() });
  return items;
}

export default async (req: Request, _context: Context) => {
  const params = new URL(req.url).searchParams;
  const channelId = params.get("channelId");
  if (!channelId) {
    return new Response(JSON.stringify({ error: "channelId required" }), { status: 400, headers: { "content-type": "application/json" } });
  }
  try {
    const items = await fetchFeed(channelId);
    return new Response(JSON.stringify({ videos: items }), { headers: { "content-type": "application/json", "cache-control": "public, max-age=300" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500, headers: { "content-type": "application/json" } });
  }
};
