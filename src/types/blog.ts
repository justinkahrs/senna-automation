export interface ProjectMetadata {
  client: string;
  company: string;
  companyUrl: string;
  year: string;
  role: string;
  tools: string;
}

export interface BlogPostBase {
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
}

export interface BlogPost extends BlogPostBase {
  content: string;
}

export type BlogPostPreview = BlogPostBase;
