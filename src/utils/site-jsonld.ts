import { LOGO_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/utils/site";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
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
    "https://www.facebook.com/senna.automation",
    "https://www.bbb.org/us/mi/grand-rapids/profile/artificial-intelligence/senna-automation-0372-90070205",
    "https://web.grandrapids.org/AI-(Artificial-Intelligence)/Senna-Automation-11264",
  ],
  founder: {
    "@type": "Person",
    name: "Justin Kahrs",
    url: "https://www.justinkahrs.com",
  },
  knowsAbout: [
    "AI consulting",
    "workflow systems",
    "business operations consulting",
    "process design",
    "business process design",
    "custom software development",
    "custom AI solutions",
    "web development",
    "lead follow-up systems",
    "document processing",
    "internal AI assistants",
    "West Michigan operations consulting",
    "digital transformation",
    "enterprise AI solutions"
  ],
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
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
    "https://www.facebook.com/senna.automation",
    "https://www.bbb.org/us/mi/grand-rapids/profile/artificial-intelligence/senna-automation-0372-90070205",
    "https://web.grandrapids.org/AI-(Artificial-Intelligence)/Senna-Automation-11264",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  inLanguage: "en-US",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
