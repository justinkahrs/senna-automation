export const revalidate = 3600;

export async function GET() {
  const url = "https://blog.senna-automation.com/rss.xml";
  const res = await fetch(url, { next: { revalidate } });

  if (!res.ok) {
    return new Response("Failed to fetch RSS", { status: 502 });
  }

  const xml = await res.text();
  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=60",
    },
  });
}
