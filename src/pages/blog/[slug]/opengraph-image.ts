import type { APIRoute } from "astro";
import image from "@/app/blog/[slug]/opengraph-image";
import { getAllBlogPostsFromContent } from "@/utils/astro-blog";

export async function getStaticPaths() {
  const posts = await getAllBlogPostsFromContent();
  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
}

export const GET: APIRoute = ({ params }) =>
  image({
    params: Promise.resolve({
      slug: params.slug || "",
    }),
  });
