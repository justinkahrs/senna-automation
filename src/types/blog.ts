export interface ProjectMetadata {
  client: string;
  company: string;
  companyUrl: string;
  year: string;
  role: string;
  tools: string;
}

export interface RoiScenario {
  name: "low" | "base" | "high";
  transactions_per_month: number;
  minutes_saved_per_transaction: number;
  loaded_labor_rate: number;
  baseline_monthly_error_rework_cost: number;
  error_rework_reduction_rate: number;
  implementation_cost: number;
  monthly_maintenance: number;
  monthly_labor_savings: number;
  monthly_error_savings: number;
  monthly_benefit: number;
  annual_benefit: number;
  first_year_net: number;
  payback_months: number;
}

export interface RoiModel {
  version: "senna-roi-model-v1";
  scenarios: RoiScenario[];
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
  imageAlt?: string;
  imageCredit?: string;
  imageSource?: string;
  roiModel?: RoiModel;
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
