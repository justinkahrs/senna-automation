import { NextResponse } from "next/server";
import {
  formatRecentBlogPostsForPrompt,
  getRecentBlogPosts,
} from "@/utils/blog";

export const dynamic = "force-static";

const RECENT_BLOG_WINDOW_DAYS = 90;
const RECENT_BLOG_LIMIT = 12;

export async function GET() {
  const posts = getRecentBlogPosts(RECENT_BLOG_WINDOW_DAYS, RECENT_BLOG_LIMIT);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    windowDays: RECENT_BLOG_WINDOW_DAYS,
    limit: RECENT_BLOG_LIMIT,
    count: posts.length,
    posts,
    promptBlock: formatRecentBlogPostsForPrompt(posts),
  });
}
