import type { Metadata } from "next";
import Script from "next/script";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ClientProviders } from "./ClientProviders";
import { AppBar } from "@/components/layout/AppBar";
import { Footer } from "@/components/layout/Footer";
import ChatWidget from "@/components/ChatWidget";
import PrivacyNoticeBanner from "@/components/PrivacyNoticeBanner";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import {
  ATOM_FEED_URL,
  BING_SITE_VERIFICATION,
  FAVICON_URL,
  GOOGLE_SITE_VERIFICATION,
  JSON_FEED_URL,
  LOGO_URL,
  RSS_FEED_URL,
  SITE_NAME,
  SITE_URL,
  WEBSUB_HUB_URL,
} from "@/utils/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Senna Automation | AI Workflow Automation & Custom Software Development Grand Rapids, MI",
    template: "%s | Senna Automation",
  },
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
  authors: [{ name: "Senna Automation", url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  verification:
    GOOGLE_SITE_VERIFICATION || BING_SITE_VERIFICATION
      ? {
          google: GOOGLE_SITE_VERIFICATION,
          other: BING_SITE_VERIFICATION
            ? {
                "msvalidate.01": BING_SITE_VERIFICATION,
              }
            : undefined,
        }
      : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title:
      "Senna Automation | AI Workflow Automation & Custom Software Development",
    description:
      "Transform your business with AI workflow automation, custom software development, and modern web solutions. Expert AI automation consulting serving Grand Rapids, Michigan.",
    siteName: "Senna Automation",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Senna Automation | AI Workflow Automation & Custom Software Development",
    description:
      "Transform your business with AI workflow automation, custom software development, and modern web solutions. Expert AI automation consulting serving Grand Rapids, Michigan.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/images/favicon.svg",
  },
};

// JSON-LD Structured Data for Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  description:
    "AI workflow automation and custom software development company serving Grand Rapids, Michigan and businesses worldwide. Specializing in business AI integration, chatbot development, process automation consulting, and enterprise AI solutions.",
  url: SITE_URL,
  logo: LOGO_URL,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-616-287-3360",
    contactType: "sales",
    areaServed: ["US", "MI", "Grand Rapids"],
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Grand Rapids",
    addressRegion: "MI",
    addressCountry: "US",
  },
  sameAs: [
    "https://linkedin.com/company/senna-automation",
    "https://instagram.com/sennaautomation",
  ],
  founder: {
    "@type": "Person",
    name: "Justin Kahrs",
    url: "https://www.justinkahrs.com",
  },
  knowsAbout: [
    "AI workflow automation",
    "business automation consulting",
    "custom software development",
    "web development",
    "chatbot development",
    "process automation",
    "digital transformation",
    "enterprise AI solutions",
  ],
};

// JSON-LD Structured Data for Local Business
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  description:
    "AI workflow automation and custom software development company in Grand Rapids, Michigan. We help businesses automate workflows, integrate AI solutions, and build custom applications.",
  url: SITE_URL,
  telephone: "+1-616-287-3360",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Grand Rapids",
    addressRegion: "MI",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "42.9634",
    longitude: "-85.6681",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "42.9634",
      longitude: "-85.6681",
    },
    geoRadius: "100",
  },
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-17:00",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-US",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/alo5gqx.css" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_NAME} Blog RSS`}
          href={RSS_FEED_URL}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`${SITE_NAME} Blog Atom`}
          href={ATOM_FEED_URL}
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title={`${SITE_NAME} Blog JSON Feed`}
          href={JSON_FEED_URL}
        />
        <link rel="hub" href={WEBSUB_HUB_URL} />
        <link rel="icon" href={FAVICON_URL} />
        {/* JSON-LD Structured Data */}
        <Script
          id="organization-structured-data"
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Script
          id="local-business-structured-data"
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <Script
          id="website-structured-data"
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        {/* Analytics and Tracking Scripts */}
        {process.env.NODE_ENV === "production" && (
          <Script
            src="https://umami.senna-automation.com/script.js"
            data-website-id="7f9f7986-0963-49f6-b357-35a5ccabe2f1"
            defer
            strategy="afterInteractive"
          />
        )}
      </head>
      <body suppressHydrationWarning>
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <ClientProviders>
            <AppBar />
            <main
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                zIndex: 10,
              }}
            >
              {children}
            </main>
            <Footer />
            <PrivacyNoticeBanner />
            <ChatWidget />
            <AnalyticsProvider />
          </ClientProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
