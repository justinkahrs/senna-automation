import type { Metadata } from "next";
import LocalSeoPage from "@/components/localSeo/LocalSeoPage";
import { localSeoPages } from "@/components/localSeo/localSeoPages";
import { SITE_URL } from "@/utils/site";

const page = localSeoPages.aiAutomationGrandRapids;

export const metadata: Metadata = {
  title: {
    absolute: page.title,
  },
  description: page.description,
  alternates: {
    canonical: `${SITE_URL}/${page.slug}`,
  },
  openGraph: {
    title: page.title,
    description: page.description,
    url: `${SITE_URL}/${page.slug}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
  },
};

export default function AiAutomationGrandRapidsPage() {
  return <LocalSeoPage page={page} />;
}
