// Netlify Edge Function: inject per-post Open Graph / Twitter meta tags
// so social media share previews show the correct blog cover image + title.
// Runs on /blog/* routes (configured in netlify.toml).
import type { Context } from "https://edge.netlify.com";

const SITE = "https://nicksonone.com";
const DEFAULT_IMAGE = SITE + "/Site-Logo.png";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absolutize(url: string): string {
  if (!url) return DEFAULT_IMAGE;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return SITE + (url.startsWith("/") ? url : "/" + url);
}

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/blog\/([^\/?#]+)\/?$/);

  const response = await context.next();
  if (!match) return response;

  const slug = decodeURIComponent(match[1]);
  let html = await response.text();

  let title = "Nick\u0027s On One | Personal Blog & Real Thoughts";
  let description =
    "Real thoughts. Sharp edges. No pretending. A personal blog by Nick Williams.";
  let image = DEFAULT_IMAGE;

  try {
    const manifestRes = await fetch(SITE + "/og-data.json");
    if (manifestRes.ok) {
      const manifest = await manifestRes.json();
      const post = manifest[slug];
      if (post) {
        title = post.title + " | Nick\u0027s On One";
        description = post.excerpt || description;
        image = absolutize(post.image);
      }
    }
  } catch (_e) {
    // On any error, keep the default site-level tags.
  }

  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const img = escapeHtml(image);

  html = html
    .replace(/<title>[^<]*<\/title>/i, "<title>" + t + "</title>")
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/i,
      '<meta property="og:title" content="' + t + '" />'
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/i,
      '<meta property="og:description" content="' + d + '" />'
    )
    .replace(
      /<meta property="og:image" content="[^"]*" \/>/i,
      '<meta property="og:image" content="' + img + '" />'
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/i,
      '<meta property="og:url" content="' + SITE + url.pathname + '" />'
    )
    .replace(
      /<meta property="og:type" content="[^"]*" \/>/i,
      '<meta property="og:type" content="article" />'
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*" \/>/i,
      '<meta name="twitter:image" content="' + img + '" />'
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/i,
      '<meta name="twitter:title" content="' + t + '" />'
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/i,
      '<meta name="twitter:description" content="' + d + '" />'
    );

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
}
