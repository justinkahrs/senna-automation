import type { HTMLAttributes } from "astro/types";
import {
  BING_SITE_VERIFICATION,
  GOOGLE_SITE_VERIFICATION,
  SITE_NAME,
  SITE_URL,
} from "@/utils/site";

type TitleValue =
  | string
  | {
      absolute?: string;
      default?: string;
      template?: string;
    };

type SocialMetadata = {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
  siteName?: string;
  locale?: string;
  images?: Array<
    | string
    | {
        url: string;
        width?: number;
        height?: number;
        alt?: string;
      }
  >;
};

export interface RouteMetadata {
  title?: TitleValue;
  description?: string;
  keywords?: string[];
  alternates?: {
    canonical?: string;
  };
  robots?:
    | {
        index?: boolean;
        follow?: boolean;
      }
    | string;
  openGraph?: SocialMetadata;
  twitter?: SocialMetadata & {
    card?: string;
  };
}

export const defaultMetadata: RouteMetadata = {
  title:
    "Senna Automation | AI Workflow Automation & Custom Software Development Grand Rapids, MI",
  description:
    "Transform your business with AI workflow automation, custom software development, and modern web solutions. Expert AI automation consulting serving Grand Rapids, Michigan and beyond. Get chatbot development, process automation, and enterprise AI solutions that drive real ROI.",
  keywords: [
    "Grand Rapids web development",
    "Grand Rapids web design",
    "Michigan web development",
    "AI workflow automation",
    "artificial intelligence automation",
    "business automation software",
    "workflow automation consulting",
    "custom software development",
    "custom applications",
    "bespoke software solutions",
    "web development Grand Rapids MI",
    "AI tools for business",
    "automation consulting",
    "software development Michigan",
    "chatbot development",
    "business AI integration",
    "custom web app development AI",
    "enterprise AI solutions",
    "B2B AI consulting",
    "digital transformation AI",
    "modern web development",
    "responsive web design",
    "high-performance websites",
    "SEO-optimized websites",
    "process automation consulting",
    "AI automation Grand Rapids",
    "Michigan AI solutions",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title:
      "Senna Automation | AI Workflow Automation & Custom Software Development",
    description:
      "Transform your business with AI workflow automation, custom software development, and modern web solutions. Expert AI automation consulting serving Grand Rapids, Michigan.",
    siteName: SITE_NAME,
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Senna Automation | AI Workflow Automation & Custom Software Development",
    description:
      "Transform your business with AI workflow automation, custom software development, and modern web solutions. Expert AI automation consulting serving Grand Rapids, Michigan.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

function resolveTitle(title: TitleValue | undefined) {
  if (!title) return String(defaultMetadata.title);
  if (typeof title === "string") return title;
  if (title.absolute) return title.absolute;
  if (title.default) return title.default;
  return String(defaultMetadata.title);
}

function normalizeSocialImages(images: SocialMetadata["images"] | undefined) {
  return (images || []).map((image) =>
    typeof image === "string" ? { url: image } : image,
  );
}

export function getResolvedMetadata(metadata?: RouteMetadata) {
  const merged = {
    ...defaultMetadata,
    ...metadata,
    alternates: {
      ...defaultMetadata.alternates,
      ...metadata?.alternates,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      ...metadata?.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...metadata?.twitter,
    },
  };

  const robotsContent =
    typeof merged.robots === "string"
      ? merged.robots
      : [
          merged.robots?.index === false ? "noindex" : "index",
          merged.robots?.follow === false ? "nofollow" : "follow",
        ].join(", ");

  const openGraphImages = normalizeSocialImages(merged.openGraph?.images);
  const twitterImages = normalizeSocialImages(merged.twitter?.images);

  return {
    title: resolveTitle(merged.title),
    description: merged.description || "",
    keywords: merged.keywords || [],
    canonical: merged.alternates?.canonical || SITE_URL,
    robotsContent,
    openGraph: {
      ...merged.openGraph,
      images: openGraphImages.length
        ? openGraphImages
        : [{ url: `${SITE_URL}/opengraph-image` }],
    },
    twitter: {
      ...merged.twitter,
      images: twitterImages.length
        ? twitterImages
        : [{ url: `${SITE_URL}/opengraph-image` }],
    },
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
      bing: BING_SITE_VERIFICATION,
    },
  };
}

export function toMetaAttributes(
  name: string,
  content: string | undefined,
): HTMLAttributes<"meta"> | null {
  if (!content) return null;
  return { name, content };
}
