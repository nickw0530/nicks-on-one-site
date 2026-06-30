import type { Context } from "@netlify/functions";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({ ignoreAttributes: false });

// Simple in-memory cache (per function instance)
const cache = new Map<string, { data: VideoItem[]; ts: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

interface VideoItem {
  id: string;
    title: string;
      link: string;
        thumbnail: string;
          published: string;
            channelTitle: string;
            }

            async function fetchFeed(channelId: string): Promise<VideoItem[]> {
              const cached = cache.get(channelId);

                  if (cached && Date.now() - cached.ts < CACHE_TTL) {
                      return cached.data;
                        }

                          const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
                            const res = await fetch(url);

                                if (!res.ok) {
                                    throw new Error(`RSS fetch failed: ${res.status}`);
                                      }

                                        const xml = await res.text();
                                          const parsed = parser.parse(xml);
                                            const entries: any[] = parsed.feed?.entry ?? [];

                                              const videos: VideoItem[] = entries.slice(0, 6).map((e: any) => {
                                                  const videoId = (e["yt:videoId"] as string) ?? "";
                                                      return {
                                                            id: videoId,
                                                                  title: e.title ?? "",
                                                                        link: e.link?.["@_href"] ?? `https://www.youtube.com/watch?v=${videoId}`,
                                                                              thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                                                                                    published: e.published ?? "",
                                                                                          channelTitle: parsed.feed?.["yt:channelId"] ?? "",
                                                                                              };
                                                                                                });

                                                                                                  cache.set(channelId, { data: videos, ts: Date.now() });
                                                                                                    return videos;
                                                                                                    }
                                                                                                    
                                                                                                    export default async function handler(req: Request, context: Context) {
                                                                                                      const url = new URL(req.url);
                                                                                                        const channelId = url.searchParams.get("channelId");
                                                                                                        
                                                                                                          if (!channelId) {
                                                                                                              return new Response(
                                                                                                                    JSON.stringify({ error: "channelId required" }),
                                                                                                                          { status: 400, headers: { "Content-Type": "application/json" } }
                                                                                                                              );
                                                                                                                                }
                                                                                                                                
                                                                                                                                  try {
                                                                                                                                      const videos = await fetchFeed(channelId);
                                                                                                                                          return new Response(JSON.stringify(videos), {
                                                                                                                                                status: 200,
                                                                                                                                                      headers: { "Content-Type": "application/json" },
                                                                                                                                                          });
                                                                                                                                                            } catch (error) {
                                                                                                                                                                return new Response(
                                                                                                                                                                      JSON.stringify({ error: String(error) }),
                                                                                                                                                                            { status: 500, headers: { "Content-Type": "application/json" } }
                                                                                                                                                                                );
                                                                                                                                                                                  }
                                                                                                                                                                                  }
