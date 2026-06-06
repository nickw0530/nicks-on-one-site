/**
 * Netlify Scheduled Function: rss-to-buttondown
  *
   * Runs daily (cron: "0 9 * * *" — 9 AM UTC).
    * Fetches https://nicksonone.com/feed.xml, finds posts published in the
     * last 25 hours, and creates a draft email in Buttondown via the API
      * for each new post not yet emailed.
       *
        * Required environment variable (set in Netlify dashboard):
         *   BUTTONDOWN_API_KEY  — your Buttondown API key
          *
           * How to set it:
            *   Netlify Dashboard → Site → Environment Variables → Add variable
             *   Key: BUTTONDOWN_API_KEY
              *   Value: ed3ccb88-18aa-4b21-8cc2-8d61eef20d84
               */

               import type { Config } from "@netlify/functions";

               export const config: Config = {
                 schedule: "0 9 * * *", // Run daily at 9 AM UTC
                 };

                 const SITE_URL = "https://nicksonone.com";
                 const RSS_URL = `${SITE_URL}/feed.xml`;
                 const BD_API = "https://api.buttondown.email/v1";

                 interface RssItem {
                   title: string;
                     link: string;
                       pubDate: string;
                         description: string;
                           guid: string;
                           }

                           function parseXml(xml: string): RssItem[] {
                             const items: RssItem[] = [];
                               const itemRegex = /<item>([\s\S]*?)<\/item>/g;
                                 let match;
                                   while ((match = itemRegex.exec(xml)) !== null) {
                                       const block = match[1];
                                           const get = (tag: string) => {
                                                 const m = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([^<]*)<\\/${tag}>`));
                                                       return m ? (m[1] ?? m[2] ?? "").trim() : "";
                                                           };
                                                               items.push({
                                                                     title: get("title"),
                                                                           link: get("link"),
                                                                                 pubDate: get("pubDate"),
                                                                                       description: get("description"),
                                                                                             guid: get("guid") || get("link"),
                                                                                                 });
                                                                                                   }
                                                                                                     return items;
                                                                                                     }
                                                                                                     
                                                                                                     function isRecent(pubDateStr: string, withinHours = 25): boolean {
                                                                                                       try {
                                                                                                           const pub = new Date(pubDateStr).getTime();
                                                                                                               const cutoff = Date.now() - withinHours * 60 * 60 * 1000;
                                                                                                                   return pub >= cutoff;
                                                                                                                     } catch {
                                                                                                                         return false;
                                                                                                                           }
                                                                                                                           }
                                                                                                                           
                                                                                                                           async function getExistingEmailSubjects(apiKey: string): Promise<Set<string>> {
                                                                                                                             const subjects = new Set<string>();
                                                                                                                               try {
                                                                                                                                   const res = await fetch(`${BD_API}/emails?page_size=100`, {
                                                                                                                                         headers: { Authorization: `Token ${apiKey}` },
                                                                                                                                             });
                                                                                                                                                 if (!res.ok) return subjects;
                                                                                                                                                     const data = await res.json() as { results?: { subject: string }[] };
                                                                                                                                                         for (const email of data.results ?? []) {
                                                                                                                                                               if (email.subject) subjects.add(email.subject.trim());
                                                                                                                                                                   }
                                                                                                                                                                     } catch {
                                                                                                                                                                         // ignore
                                                                                                                                                                           }
                                                                                                                                                                             return subjects;
                                                                                                                                                                             }
                                                                                                                                                                             
                                                                                                                                                                             async function createDraftEmail(
                                                                                                                                                                               apiKey: string,
                                                                                                                                                                                 item: RssItem
                                                                                                                                                                                 ): Promise<void> {
                                                                                                                                                                                   const body = `
                                                                                                                                                                                   <p>${item.description}</p>
                                                                                                                                                                                   <p><a href="${item.link}">Read the full post →</a></p>
                                                                                                                                                                                   `.trim();
                                                                                                                                                                                   
                                                                                                                                                                                     const res = await fetch(`${BD_API}/emails`, {
                                                                                                                                                                                         method: "POST",
                                                                                                                                                                                             headers: {
                                                                                                                                                                                                   Authorization: `Token ${apiKey}`,
                                                                                                                                                                                                         "Content-Type": "application/json",
                                                                                                                                                                                                             },
                                                                                                                                                                                                                 body: JSON.stringify({
                                                                                                                                                                                                                       subject: item.title,
                                                                                                                                                                                                                             body,
                                                                                                                                                                                                                                   status: "draft",
                                                                                                                                                                                                                                       }),
                                                                                                                                                                                                                                         });
                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                           if (!res.ok) {
                                                                                                                                                                                                                                               const text = await res.text().catch(() => "");
                                                                                                                                                                                                                                                   throw new Error(`Buttondown API error ${res.status}: ${text}`);
                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                     export default async function handler(): Promise<void> {
                                                                                                                                                                                                                                                       const apiKey = process.env.BUTTONDOWN_API_KEY;
                                                                                                                                                                                                                                                         if (!apiKey) {
                                                                                                                                                                                                                                                             console.error("[rss-to-buttondown] BUTTONDOWN_API_KEY env var not set.");
                                                                                                                                                                                                                                                                 return;
                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                                     // 1. Fetch RSS feed
                                                                                                                                                                                                                                                                       const feedRes = await fetch(RSS_URL);
                                                                                                                                                                                                                                                                         if (!feedRes.ok) {
                                                                                                                                                                                                                                                                             console.error(`[rss-to-buttondown] Failed to fetch RSS feed: ${feedRes.status}`);
                                                                                                                                                                                                                                                                                 return;
                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                     const xml = await feedRes.text();
                                                                                                                                                                                                                                                                                       const items = parseXml(xml);
                                                                                                                                                                                                                                                                                         console.log(`[rss-to-buttondown] Parsed ${items.length} items from feed.`);
                                                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                                           // 2. Filter to recent items only
                                                                                                                                                                                                                                                                                             const recentItems = items.filter((item) => isRecent(item.pubDate));
                                                                                                                                                                                                                                                                                               console.log(`[rss-to-buttondown] ${recentItems.length} item(s) published in last 25 hours.`);
                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                 if (recentItems.length === 0) return;
                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                   // 3. Get existing email subjects to avoid duplicates
                                                                                                                                                                                                                                                                                                     const existing = await getExistingEmailSubjects(apiKey);
                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                       // 4. Create draft emails for new posts
                                                                                                                                                                                                                                                                                                         for (const item of recentItems) {
                                                                                                                                                                                                                                                                                                             if (existing.has(item.title.trim())) {
                                                                                                                                                                                                                                                                                                                   console.log(`[rss-to-buttondown] Skipping "${item.title}" — already drafted.`);
                                                                                                                                                                                                                                                                                                                         continue;
                                                                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                                                                                 try {
                                                                                                                                                                                                                                                                                                                                       await createDraftEmail(apiKey, item);
                                                                                                                                                                                                                                                                                                                                             console.log(`[rss-to-buttondown] Created draft for "${item.title}".`);
                                                                                                                                                                                                                                                                                                                                                 } catch (err) {
                                                                                                                                                                                                                                                                                                                                                       console.error(`[rss-to-buttondown] Error creating draft for "${item.title}":`, err);
                                                                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                                                                                                             }
