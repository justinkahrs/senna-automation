import { generateFeed } from "@/utils/feed";

export const dynamic = "force-static";

export async function GET() {
  const feed = generateFeed();

  return new Response(feed.json1(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
