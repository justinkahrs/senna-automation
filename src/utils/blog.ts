import fs from "fs";
import path from "path";
import { load } from "js-yaml";
import type { BlogPost, BlogPostPreview } from "@/types/blog";

const contentDirectory = path.join(process.cwd(), "src/content/blog");

type BlogFrontMatter = Partial<Omit<BlogPost, "slug" | "content">>;

const DEFAULT_RECENT_BLOG_WINDOW_DAYS = 90;
const DEFAULT_RECENT_BLOG_LIMIT = 12;
const FRONT_MATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseBlogMarkdown(fileContents: string): {
  data: BlogFrontMatter;
  content: string;
} {
  const match = fileContents.match(FRONT_MATTER_PATTERN);

  if (!match) {
    return { data: {}, content: fileContents };
  }

  const parsed = load(match[1]) as unknown;
  const data =
    parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as BlogFrontMatter)
      : {};

  return {
    data,
    content: fileContents.slice(match[0].length),
  };
}

export function getAllBlogPosts(): BlogPostPreview[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const filenames = fs.readdirSync(contentDirectory);

  return filenames
    .filter((fn) => fn.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(contentDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = parseBlogMarkdown(fileContents);

      return {
        slug,
        title: data.title,
        subtitle: data.subtitle,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        date: data.date,
        category: data.category,
        excerpt: data.excerpt,
        image: data.image,
        contentId: data.contentId,
        contentType: data.contentType,
        icp: data.icp,
        cohorts: data.cohorts,
        buyerStage: data.buyerStage,
        problem: data.problem,
        workflow: data.workflow,
        offer: data.offer,
        researchPacketId: data.researchPacketId,
        researchCheckedAt: data.researchCheckedAt,
        qaScore: data.qaScore,
        qaReportHash: data.qaReportHash,
        promptVersion: data.promptVersion,
        researchHash: data.researchHash,
        opportunityFingerprint: data.opportunityFingerprint,
        topicFingerprint: data.topicFingerprint,
        metadata: data.metadata,
      } as Omit<BlogPost, "content">;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = parseBlogMarkdown(fileContents);

  return {
    slug,
    title: data.title,
    subtitle: data.subtitle,
    heroTitle: data.heroTitle,
    heroSubtitle: data.heroSubtitle,
    date: data.date,
    category: data.category,
    excerpt: data.excerpt,
    image: data.image,
    contentId: data.contentId,
    contentType: data.contentType,
    icp: data.icp,
    cohorts: data.cohorts,
    buyerStage: data.buyerStage,
    problem: data.problem,
    workflow: data.workflow,
    offer: data.offer,
    researchPacketId: data.researchPacketId,
    researchCheckedAt: data.researchCheckedAt,
    qaScore: data.qaScore,
    qaReportHash: data.qaReportHash,
    promptVersion: data.promptVersion,
    researchHash: data.researchHash,
    opportunityFingerprint: data.opportunityFingerprint,
    topicFingerprint: data.topicFingerprint,
    metadata: data.metadata,
    content,
  } as BlogPost;
}

export function getRecentBlogPosts(
  windowDays = DEFAULT_RECENT_BLOG_WINDOW_DAYS,
  limit = DEFAULT_RECENT_BLOG_LIMIT,
): BlogPostPreview[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - windowDays);

  return getAllBlogPosts()
    .filter((post) => {
      const postDate = new Date(post.date);
      return !Number.isNaN(postDate.getTime()) && postDate >= cutoff;
    })
    .slice(0, limit);
}

export function formatRecentBlogPostsForPrompt(posts: BlogPostPreview[]): string {
  if (!posts.length) {
    return "[]";
  }

  return JSON.stringify(posts, null, 2);
}

export function getLatestPostByCategory(category: string): BlogPostPreview | null {
  const allPosts = getAllBlogPosts();
  return allPosts.find((post) => post.category === category) || null;
}
