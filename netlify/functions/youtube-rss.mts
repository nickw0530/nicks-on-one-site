import type { Context } from "@netlify/functions";

interface VideoItem {
id: string;
title: string;
published: string;
}

const cache = new Map<string, { data: VideoItem[]; ts: number }>();
const CACHE_TTL = 15 * 60 * 1000;

async function fetchFeed(channelId: string): Promise<VideoItem[]> {
const cached = cache.get(channelId);
if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
const url = "https://www.youtube.com/feeds/videos.xml?channel_id=" + channelId;
const res = await fetch(url);
if (!res.ok) throw new Error("feed fetch failed: " + res.status);
const xml = await res.text();
const entries = xml.split("<entry>").slice(1);
const items: VideoItem[] = [];
for (const entry of entries) {
const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
const pubMatch = entry.match(/<published>([^<]+)<\/published>/);
if (!idMatch) continue;
const ttl = titleMatch ? titleMatch[1] : "";
if (/#shorts/i.test(ttl)) continue;
items.push({
id: idMatch[1],
title: titleMatch ? titleMatch[1] : "Latest Video",
published: pubMatch ? pubMatch[1] : "",
});
}
cache.set(channelId, { data: items, ts: Date.now() });
return items;
}

export default async (req: Request, _context: Context) => {
const params = new URL(req.url).searchParams;
const channelId = params.get("channelId");
if (!channelId) {
return new Response(JSON.stringify({ error: "channelId required" }), {
status: 400,
headers: { "content-type": "application/json" },
});
}
try {
const items = await fetchFeed(channelId);
return new Response(JSON.stringify({ videos: items }), {
headers: {
"content-type": "application/json",
"cache-control": "public, max-age=900",
},
});
} catch (e: any) {
return new Response(JSON.stringify({ error: String(e?.message || e) }), {
status: 500,
headers: { "content-type": "application/json" },
});
}
};
