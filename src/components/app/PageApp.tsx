"use client";

import Home from "@/app/page";
import About from "@/app/about/page";
import ServicesPage from "@/app/services/page";
import Contact from "@/app/contact/page";
import PricingPage from "@/app/pricing/page";
import SolutionsClient from "@/app/solutions/SolutionsClient";
import Privacy from "@/app/privacy/page";
import Terms from "@/app/terms/page";
import Confirmation from "@/app/confirmation/page";
import BlogPage from "@/app/blog/page";
import AiConsultingGrandRapidsPage from "@/app/(local-seo)/ai-consulting-grand-rapids/page";
import AiAutomationGrandRapidsPage from "@/app/(local-seo)/ai-automation-grand-rapids/page";
import WorkflowAutomationConsultantGrandRapidsPage from "@/app/(local-seo)/workflow-automation-consultant-grand-rapids/page";
import BlogPostPageContent from "@/components/blog/BlogPostPageContent";
import LoginPageContent from "@/components/portal/LoginPageContent";
import PortalPageContent from "@/components/portal/PortalPageContent";
import RfpPreviewPageContent from "@/components/portal/RfpPreviewPageContent";
import SiteFrame from "@/components/app/SiteFrame";

const pageMap = {
  home: Home,
  about: About,
  services: ServicesPage,
  contact: Contact,
  pricing: PricingPage,
  solutions: SolutionsClient,
  privacy: Privacy,
  terms: Terms,
  confirmation: Confirmation,
  blog: BlogPage,
  "blog-post": BlogPostPageContent,
  "local-seo-ai-consulting": AiConsultingGrandRapidsPage,
  "local-seo-ai-automation": AiAutomationGrandRapidsPage,
  "local-seo-workflow": WorkflowAutomationConsultantGrandRapidsPage,
  login: LoginPageContent,
  portal: PortalPageContent,
  "portal-rfp-preview": RfpPreviewPageContent,
} as const;

export type PageAppId = keyof typeof pageMap;

export default function PageApp({
  pageId,
  pathname,
  ...pageProps
}: {
  pageId: PageAppId;
  pathname: string;
} & Record<string, unknown>) {
  const Page = pageMap[pageId];

  return (
    <SiteFrame pathname={pathname}>
      <Page {...pageProps} />
    </SiteFrame>
  );
}
