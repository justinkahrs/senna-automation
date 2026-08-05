import type { APIRoute } from "astro";
import { localSeoPages } from "@/components/localSeo/localSeoPages";
import { getAllBlogPostsFromContent } from "@/utils/astro-blog";
import {
  ATOM_FEED_URL,
  JSON_FEED_URL,
  RSS_FEED_URL,
  SITE_NAME,
  SITE_URL,
} from "@/utils/site";

export const prerender = true;

type LinkEntry = {
  title: string;
  url: string;
  description?: string;
};

function renderSection(title: string, entries: LinkEntry[]) {
  return [
    `## ${title}`,
    "",
    ...entries.map((entry) =>
      entry.description
        ? `- [${entry.title}](${entry.url}): ${entry.description}`
        : `- [${entry.title}](${entry.url})`,
    ),
    "",
  ].join("\n");
}

export const GET: APIRoute = async () => {
  const blogPosts = await getAllBlogPostsFromContent();

  const sections = [
    renderSection("Core Pages", [
      {
        title: "Home",
        url: SITE_URL,
        description:
          "Overview of Senna Automation and its AI workflow automation consulting.",
      },
      {
        title: "About",
        url: `${SITE_URL}/about`,
        description: "Company background, founder, and operating approach.",
      },
      {
        title: "Services",
        url: `${SITE_URL}/services`,
        description: "Service areas and common automation outcomes.",
      },
      {
        title: "Solutions",
        url: `${SITE_URL}/solutions`,
        description: "Common business bottlenecks and automation patterns.",
      },
      {
        title: "Pricing",
        url: `${SITE_URL}/pricing`,
        description: "Engagement model and starting price points.",
      },
      {
        title: "Contact",
        url: `${SITE_URL}/contact`,
        description: "Contact page and automation assessment request.",
      },
      {
        title: "Workflow Bottleneck Review",
        url: `${SITE_URL}/workflow-bottleneck-review`,
        description:
          "A focused 30-minute session to map one costly handoff, estimate its impact, and identify the next practical step.",
      },
      {
        title: "Search",
        url: `${SITE_URL}/search`,
        description: "Public search across pages, location content, and blog posts.",
      },
      {
        title: "Blog",
        url: `${SITE_URL}/blog`,
        description: "Workflow guides and practical automation articles.",
      },
    ]),
    renderSection(
      "Local Search Pages",
      Object.values(localSeoPages).map((page) => ({
        title: page.serviceName,
        url: `${SITE_URL}/${page.slug}`,
        description: page.description,
      })),
    ),
    renderSection(
      "Blog Posts",
      blogPosts.map((post) => ({
        title: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
        description: post.excerpt,
      })),
    ),
    renderSection("Feeds", [
      {
        title: "RSS feed",
        url: RSS_FEED_URL,
        description: "RSS 2.0 feed for blog content.",
      },
      {
        title: "Atom feed",
        url: ATOM_FEED_URL,
        description: "Atom feed for blog content.",
      },
      {
        title: "JSON Feed",
        url: JSON_FEED_URL,
        description: "Machine-readable JSON feed for blog content.",
      },
    ]),
    renderSection("Optional", [
      {
        title: "Sitemap",
        url: `${SITE_URL}/sitemap.xml`,
        description: "Canonical XML sitemap for all public pages.",
      },
      {
        title: "Privacy Policy",
        url: `${SITE_URL}/privacy`,
        description: "Privacy and data handling details.",
      },
      {
        title: "Terms",
        url: `${SITE_URL}/terms`,
        description: "Website terms and usage conditions.",
      },
    ]),
  ];

  const body = [
    `# ${SITE_NAME} Full Index`,
    "",
    "> Complete public page inventory for AI systems, including marketing pages, location pages, published blog posts, and feeds.",
    "",
    `Use [${SITE_URL}/llms.txt](${SITE_URL}/llms.txt) for the curated orientation file and this document for the broader public index.`,
    "",
    ...sections,
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
