import { getCollection } from "astro:content";
import type { BlogPost, BlogPostPreview } from "@/types/blog";

function sortPosts<T extends { date: string }>(posts: T[]) {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function mapPreview(entry: Awaited<ReturnType<typeof getCollection>>[number]) {
  return {
    slug: entry.id,
    ...entry.data,
  } satisfies BlogPostPreview;
}

export async function getAllBlogPostsFromContent(): Promise<BlogPostPreview[]> {
  const entries = await getCollection("blog");
  return sortPosts(entries.map(mapPreview));
}

export async function getBlogPostBySlugFromContent(
  slug: string,
): Promise<BlogPost | null> {
  const entries = await getCollection("blog");
  const entry = entries.find((item) => item.id === slug);

  if (!entry) return null;

  return {
    slug: entry.id,
    ...entry.data,
    content: entry.body,
  } satisfies BlogPost;
}

export async function getLatestPostByCategoryFromContent(category: string) {
  const posts = await getAllBlogPostsFromContent();
  return posts.find((post) => post.category === category) || null;
}
