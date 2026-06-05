import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/blog");

export interface ProjectMetadata {
  client: string;
  company: string;
  companyUrl: string;
  year: string;
  role: string;
  tools: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  metadata: ProjectMetadata;
  content: string;
}

export type BlogPostPreview = Omit<BlogPost, "content">;

const DEFAULT_RECENT_BLOG_WINDOW_DAYS = 90;
const DEFAULT_RECENT_BLOG_LIMIT = 12;

export function getAllBlogPosts(): BlogPostPreview[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const filenames = fs.readdirSync(contentDirectory);

  return filenames
    .filter((fn) => fn.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(contentDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

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
        metadata: data.metadata,
      } as Omit<BlogPost, "content">;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

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
