import { getAllBlogPosts } from "@/utils/blog";
import { localSeoRoutes } from "@/components/localSeo/localSeoPages";
import { SITE_URL } from "@/utils/site";

type SitemapEntry = {
  url: string;
  lastModified?: Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

export default function sitemap(): SitemapEntry[] {
  const blogPosts = getAllBlogPosts();
  const latestPostLastModified = blogPosts[0]?.date
    ? new Date(blogPosts[0].date)
    : undefined;

  const staticRoutes: SitemapEntry[] = [
    {
      url: SITE_URL,
      ...(latestPostLastModified
        ? { lastModified: latestPostLastModified }
        : {}),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...localSeoRoutes.map((route) => ({
      url: route.url,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/solutions`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pricing`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/search`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/blog`,
      ...(latestPostLastModified
        ? { lastModified: latestPostLastModified }
        : {}),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogRoutes: SitemapEntry[] = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
