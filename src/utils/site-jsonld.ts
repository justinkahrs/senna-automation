import { LOGO_URL, SITE_NAME, SITE_URL } from "@/utils/site";

export const organizationJsonLd = {
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
    "https://www.bbb.org/us/mi/grand-rapids/profile/artificial-intelligence/senna-automation-0372-90070205",
    "https://web.grandrapids.org/AI-(Artificial-Intelligence)/Senna-Automation-11264",
  ],
  founder: {
    "@type": "Person",
    name: "Justin Kahrs",
    url: "https://www.justinkahrs.com",
  },
  knowsAbout: [
    "AI workflow automation",
    "AI consulting",
    "AI automation",
    "business automation consulting",
    "workflow automation consulting",
    "business process automation",
    "custom software development",
    "custom AI solutions",
    "web development",
    "chatbot development",
    "lead follow-up automation",
    "document processing automation",
    "internal AI assistants",
    "process automation",
    "West Michigan business automation",
    "digital transformation",
    "enterprise AI solutions",
  ],
};

export const localBusinessJsonLd = {
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
  sameAs: [
    "https://linkedin.com/company/senna-automation",
    "https://instagram.com/sennaautomation",
    "https://www.bbb.org/us/mi/grand-rapids/profile/artificial-intelligence/senna-automation-0372-90070205",
    "https://web.grandrapids.org/AI-(Artificial-Intelligence)/Senna-Automation-11264",
  ],
};

export const websiteJsonLd = {
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
