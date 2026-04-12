import { Feed } from "feed";
import { getAllBlogPosts } from "@/utils/blog";

export const SITE_URL = "https://www.senna-automation.com";

export function generateFeed() {
  const posts = getAllBlogPosts();

  const feed = new Feed({
    title: "Senna Automation Blog",
    description: "Insights on automation, AI workflows, and operational systems",
    id: SITE_URL + "/",
    link: SITE_URL + "/",
    language: "en",
    image: `${SITE_URL}/logo.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Senna Automation`,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${SITE_URL}/rss.xml`,
      atom: `${SITE_URL}/atom.xml`,
      json: `${SITE_URL}/feed.json`,
    },
    author: {
      name: "Senna Automation",
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
      image: post.image ? (post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`) : undefined,
    });
  });

  return feed;
}
