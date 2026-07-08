import type { APIRoute } from "astro";
import sitemap from "@/app/sitemap";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = () => {
  const items = sitemap();
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...items.map((item) => {
      const lines = [`<url><loc>${escapeXml(item.url)}</loc>`];
      if (item.lastModified) {
        lines.push(`<lastmod>${new Date(item.lastModified).toISOString()}</lastmod>`);
      }
      if (item.changeFrequency) {
        lines.push(`<changefreq>${item.changeFrequency}</changefreq>`);
      }
      if (typeof item.priority === "number") {
        lines.push(`<priority>${item.priority.toFixed(1)}</priority>`);
      }
      lines.push("</url>");
      return lines.join("");
    }),
    "</urlset>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
