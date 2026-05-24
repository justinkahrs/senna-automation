import { Feed } from "feed";
import { getAllBlogPosts } from "@/utils/blog";
import {
  ATOM_FEED_URL,
  FAVICON_URL,
  JSON_FEED_URL,
  LOGO_URL,
  RSS_FEED_URL,
  SITE_NAME,
  SITE_URL,
  WEBSUB_HUB_URL,
} from "@/utils/site";

export function generateFeed() {
  const posts = getAllBlogPosts();
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : undefined;

  const feed = new Feed({
    title: `${SITE_NAME} Blog`,
    description: "Insights on automation, AI workflows, and operational systems",
    id: SITE_URL + "/",
    link: SITE_URL + "/",
    language: "en",
    image: LOGO_URL,
    favicon: FAVICON_URL,
    copyright: `All rights reserved ${new Date().getFullYear()}, Senna Automation`,
    generator: "Feed for Node.js",
    updated: latestPostDate,
    feedLinks: {
      rss: RSS_FEED_URL,
      atom: ATOM_FEED_URL,
      json: JSON_FEED_URL,
    },
    hub: WEBSUB_HUB_URL,
    author: {
      name: SITE_NAME,
      link: SITE_URL,
    },
  });

  posts.forEach((post) => {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.excerpt,
      date: new Date(post.date),
      image: post.image
        ? post.image.startsWith("http")
          ? post.image
          : `${SITE_URL}${post.image}`
        : undefined,
    });
  });

  return feed;
}
