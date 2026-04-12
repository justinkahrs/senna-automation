import { generateFeed } from "@/utils/feed";

export const dynamic = "force-static";

export async function GET() {
  const feed = generateFeed();
  const rss = feed.rss2();
  
  // Inject XSL stylesheet reference
  const rssWithStylesheet = rss.replace(
    '<?xml version="1.0" encoding="utf-8"?>',
    '<?xml version="1.0" encoding="utf-8"?><?xml-stylesheet href="/rss.xsl" type="text/xsl"?>'
  );

  return new Response(rssWithStylesheet, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
}
