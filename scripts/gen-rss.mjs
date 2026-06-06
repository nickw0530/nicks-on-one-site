// Build-time script: generate feed.xml (RSS 2.0) from blog post JSON files.
// Reads client/src/data/posts/*.json and writes dist/public/feed.xml.
// Run after vite build so the output directory already exists.
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const POSTS_DIR = path.resolve("client/src/data/posts");
const OUT_DIR = path.resolve("dist/public");
const OUT_FILE = path.join(OUT_DIR, "feed.xml");

const SITE_URL = "https://nicksonone.com";
const FEED_TITLE = "Nick's On One";
const FEED_DESCRIPTION =
  "It's about all the things that may be going on at the moment in the Nix on one world: thoughts, relationships, opinions, lifestyle, etc.";

  function escapeXml(str) {
    return String(str || "")
        .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                        .replace(/'/g, "&apos;");
                        }

                        function toRfc822(dateStr) {
                          // dateStr is "YYYY-MM-DD"
                            const d = new Date(dateStr + "T12:00:00Z");
                              return d.toUTCString();
                              }

                              async function main() {
                                let files = [];
                                  try {
                                      files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".json"));
                                        } catch (e) {
                                            console.warn("[gen-rss] posts dir not found:", POSTS_DIR);
                                              }

                                                const posts = [];
                                                  for (const file of files) {
                                                      try {
                                                            const raw = await readFile(path.join(POSTS_DIR, file), "utf8");
                                                                  const data = JSON.parse(raw);
                                                                        if (!data.slug || !data.title || !data.date) continue;
                                                                              posts.push(data);
                                                                                  } catch (e) {
                                                                                        console.warn("[gen-rss] skip", file, e.message);
                                                                                            }
                                                                                              }

                                                                                                // Sort newest first
                                                                                                  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

                                                                                                    const buildDate = new Date().toUTCString();
                                                                                                      const lastBuildDate = posts.length > 0 ? toRfc822(posts[0].date) : buildDate;
                                                                                                      
                                                                                                        const items = posts
                                                                                                            .map((post) => {
                                                                                                                  const link = `${SITE_URL}/blog/${post.slug}`;
                                                                                                                        const description = escapeXml(post.excerpt || post.title);
                                                                                                                              return `    <item>
                                                                                                                                    <title>${escapeXml(post.title)}</title>
                                                                                                                                          <link>${link}</link>
                                                                                                                                                <guid isPermaLink="true">${link}</guid>
                                                                                                                                                      <pubDate>${toRfc822(post.date)}</pubDate>
                                                                                                                                                            <description>${description}</description>
                                                                                                                                                                </item>`;
                                                                                                                                                                    })
                                                                                                                                                                        .join("\n");
                                                                                                                                                                        
                                                                                                                                                                          const xml = `<?xml version="1.0" encoding="UTF-8"?>
                                                                                                                                                                          <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
                                                                                                                                                                            <channel>
                                                                                                                                                                                <title>${escapeXml(FEED_TITLE)}</title>
                                                                                                                                                                                    <link>${SITE_URL}</link>
                                                                                                                                                                                        <description>${escapeXml(FEED_DESCRIPTION)}</description>
                                                                                                                                                                                            <language>en-us</language>
                                                                                                                                                                                                <lastBuildDate>${lastBuildDate}</lastBuildDate>
                                                                                                                                                                                                    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
                                                                                                                                                                                                    ${items}
                                                                                                                                                                                                      </channel>
                                                                                                                                                                                                      </rss>`;
                                                                                                                                                                                                      
                                                                                                                                                                                                        if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });
                                                                                                                                                                                                          await writeFile(OUT_FILE, xml, "utf8");
                                                                                                                                                                                                            console.log(`[gen-rss] wrote ${posts.length} posts to ${OUT_FILE}`);
                                                                                                                                                                                                            }
                                                                                                                                                                                                            
                                                                                                                                                                                                            main();
