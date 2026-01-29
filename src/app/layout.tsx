import type { Metadata } from "next";
import Script from "next/script";
import { ClientProviders } from "./ClientProviders";
import { AppBar } from "@/components/layout/AppBar";
import { Footer } from "@/components/layout/Footer";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const SITE_URL = "https://sennaautomation.com";

export const metadata: Metadata = {
  title: {
    default: "Senna Automation | AI Workflow Automation & Custom Software Development Grand Rapids, MI",
    template: "%s | Senna Automation"
  },
  description: "Transform your business with AI workflow automation, custom software development, and modern web solutions. Expert AI automation consulting serving Grand Rapids, Michigan and beyond. Get chatbot development, process automation, and enterprise AI solutions that drive real ROI.",
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
    "Michigan AI solutions"
  ],
  authors: [{ name: "Senna Automation", url: SITE_URL }],
  creator: "Senna Automation",
  publisher: "Senna Automation",
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
    title: "Senna Automation | AI Workflow Automation & Custom Software Development",
    description: "Transform your business with AI workflow automation, custom software development, and modern web solutions. Expert AI automation consulting serving Grand Rapids, Michigan.",
    siteName: "Senna Automation",
    images: [
      {
        url: `${SITE_URL}/senna-automation-new.png`,
        width: 1200,
        height: 630,
        alt: "Senna Automation - AI Workflow Automation & Custom Software Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senna Automation | AI Workflow Automation & Custom Software Development",
    description: "Transform your business with AI workflow automation, custom software development, and modern web solutions. Expert AI automation consulting serving Grand Rapids, Michigan.",
    images: [`${SITE_URL}/senna-automation-new.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// JSON-LD Structured Data for Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Senna Automation",
  description: "AI workflow automation and custom software development company serving Grand Rapids, Michigan and businesses worldwide. Specializing in business AI integration, chatbot development, process automation consulting, and enterprise AI solutions.",
  url: SITE_URL,
  logo: `${SITE_URL}/senna-automation-full-logo.svg`,
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
  sameAs: [],
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
    "enterprise AI solutions"
  ],
};

// JSON-LD Structured Data for Local Business
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Senna Automation",
  description: "AI workflow automation and custom software development company in Grand Rapids, Michigan. We help businesses automate workflows, integrate AI solutions, and build custom applications.",
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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
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
        {/* Analytics and Tracking Scripts */}
        <Script
          id="vtag-ai-js"
          src="https://r2.leadsy.ai/tag.js"
          async
          data-pid="5eWHMMjnfGOlrKfh"
          data-version="062024"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.usefathom.com/script.js"
          data-site="ZENVGNJZ"
          defer
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.usefathom.com/script.js"
          data-site="ZENVGNJZ"
          defer
          strategy="afterInteractive"
        />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16832579878"
          async
        />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Google Analytics
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XWW3M708ZP');
    `,
          }}
        />
      </head>
      <body>
        <ClientProviders>
          <AppBar />
          <main
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </ClientProviders>
      </body>
    </html>
  );
}
