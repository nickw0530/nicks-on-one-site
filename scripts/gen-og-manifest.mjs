// Build-time script: generate a slug -> OG metadata manifest for social share previews.
// Reads all blog post JSON files and writes dist/public/og-data.json,
// which the Netlify Edge Function reads to inject per-post meta tags.
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const POSTS_DIR = path.resolve("client/src/data/posts");
const OUT_DIR = path.resolve("dist/public");
const OUT_FILE = path.join(OUT_DIR, "og-data.json");

async function main() {
  const manifest = {};
  let files = [];
  try {
    files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".json"));
  } catch (e) {
    console.warn("[og-manifest] posts dir not found:", POSTS_DIR);
  }

  for (const file of files) {
    try {
      const raw = await readFile(path.join(POSTS_DIR, file), "utf8");
      const data = JSON.parse(raw);
      if (!data.slug || !data.title) continue;
      manifest[data.slug] = {
        title: data.title,
        excerpt: data.excerpt || "",
        image: data.coverImage || "",
      };
    } catch (e) {
      console.warn("[og-manifest] skip", file, e.message);
    }
  }

  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(manifest));
  console.log("[og-manifest] wrote " + Object.keys(manifest).length + " posts to " + OUT_FILE);
}

main();
