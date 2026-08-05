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
  /** Stable marketing-system identifier. Legacy articles intentionally omit it. */
  contentId?: string;
  contentType?: string;
  icp?: string;
  cohorts?: string[];
  buyerStage?: string;
  problem?: string;
  workflow?: string;
  /** Stable offer identifier, such as `workflow-bottleneck-review`. */
  offer?: string;
  researchPacketId?: string;
  researchCheckedAt?: string;
  qaScore?: number;
  qaReportHash?: string;
  promptVersion?: string;
  researchHash?: string;
  opportunityFingerprint?: string;
  topicFingerprint?: string;
  metadata: ProjectMetadata;
}

export interface BlogPost extends BlogPostBase {
  content: string;
}

export type BlogPostPreview = BlogPostBase;
