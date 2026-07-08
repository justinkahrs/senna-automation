"use client";

import Home from "@/site/pages/home";
import About from "@/site/pages/about";
import ServicesPage from "@/site/pages/services";
import Contact from "@/site/pages/contact";
import PricingPage from "@/site/pages/pricing";
import SolutionsClient from "@/site/pages/solutions";
import Privacy from "@/site/pages/privacy";
import Terms from "@/site/pages/terms";
import Confirmation from "@/site/pages/confirmation";
import BlogPage from "@/site/pages/blog/index";
import AiConsultingGrandRapidsPage from "@/site/pages/local-seo/ai-consulting-grand-rapids";
import AiAutomationGrandRapidsPage from "@/site/pages/local-seo/ai-automation-grand-rapids";
import WorkflowAutomationConsultantGrandRapidsPage from "@/site/pages/local-seo/workflow-automation-consultant-grand-rapids";
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
