import { localSeoPages } from "@/components/localSeo/localSeoPages";
import { getAllBlogPosts } from "@/utils/blog";
import { SITE_URL } from "@/utils/site";

export type SearchDocumentType = "Page" | "Location Page" | "Blog Post";

export type SearchResult = {
  title: string;
  url: string;
  description: string;
  type: SearchDocumentType;
  score: number;
};

type SearchDocument = {
  title: string;
  url: string;
  description: string;
  type: SearchDocumentType;
  content: string;
};

const marketingPages: SearchDocument[] = [
  {
    title: "Home",
    url: `${SITE_URL}/`,
    description:
      "Overview of Senna Automation and its AI workflow, operations, and custom software services.",
    type: "Page",
    content:
      "AI workflow systems for lead follow-up, routing, scheduling, internal operations, business process improvement, and custom software in Grand Rapids and beyond.",
  },
  {
    title: "About",
    url: `${SITE_URL}/about`,
    description:
      "Background on Senna Automation, its consulting approach, and software experience.",
    type: "Page",
    content:
      "Grand Rapids consulting agency helping businesses remove repetitive work, improve handoffs, and run smoother systems.",
  },
  {
    title: "Services",
    url: `${SITE_URL}/services`,
    description:
      "Workflow systems, lead generation, sales follow-up, assistants, and internal tools.",
    type: "Page",
    content:
      "Workflow design, lead capture, CRM routing, sales follow-up, internal assistants, dashboards, and business operations support.",
  },
  {
    title: "Solutions",
    url: `${SITE_URL}/solutions`,
    description:
      "Common operational bottlenecks solved with workflow design, data routing, and AI-enabled systems.",
    type: "Page",
    content:
      "Administrative work, qualified leads, structured data, custom logic, notifications, approvals, and internal workflows.",
  },
  {
    title: "Pricing",
    url: `${SITE_URL}/pricing`,
    description:
      "Starting prices, implementation timelines, and project planning for custom workflow systems.",
    type: "Page",
    content:
      "Pricing starts at 500 dollars, typical implementation in four to six weeks, fixed-scope planning, and assessments.",
  },
  {
    title: "Contact",
    url: `${SITE_URL}/contact`,
    description:
      "Request a free assessment or contact Senna Automation directly.",
    type: "Page",
    content:
      "Free assessment, contact form, schedule a call, Grand Rapids consulting, discuss workflow bottlenecks and operations.",
  },
  {
    title: "Blog",
    url: `${SITE_URL}/blog`,
    description:
      "Practical articles and case studies on workflow systems, operations handoffs, and business AI.",
    type: "Page",
    content:
      "Automation case studies, practical guides, lead qualification, quoting, inventory coordination, and service scheduling.",
  },
];

function createLocationDocuments(): SearchDocument[] {
  return Object.values(localSeoPages).map((page) => ({
    title: page.serviceName,
    url: `${SITE_URL}/${page.slug}`,
    description: page.description,
    type: "Location Page",
    content: [
      page.serviceType,
      page.lead,
      page.introBody,
      page.assessmentBody,
      page.primaryKeyword,
      ...page.secondaryKeywords,
      ...page.useCases.map((useCase) => `${useCase.title} ${useCase.description}`),
      ...page.industries.map((industry) => `${industry.name} ${industry.description}`),
      ...page.process.map((step) => `${step.title} ${step.description}`),
      ...page.faqs.map((faq) => `${faq.question} ${faq.answer}`),
    ].join(" "),
  }));
}

function createBlogDocuments(): SearchDocument[] {
  return getAllBlogPosts().map((post) => ({
    title: post.title,
    url: `${SITE_URL}/blog/${post.slug}`,
    description: post.excerpt,
    type: "Blog Post",
    content: [
      post.title,
      post.subtitle ?? "",
      post.heroTitle ?? "",
      post.heroSubtitle ?? "",
      post.category,
      post.excerpt,
      post.metadata.client,
      post.metadata.company,
      post.metadata.role,
      post.metadata.tools,
    ].join(" "),
  }));
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}\s/-]+/gu, " ");
}

function countOccurrences(haystack: string, needle: string) {
  if (!needle) return 0;

  let count = 0;
  let index = haystack.indexOf(needle);

  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }

  return count;
}

function scoreDocument(document: SearchDocument, query: string, terms: string[]) {
  const title = normalize(document.title);
  const description = normalize(document.description);
  const content = normalize(document.content);
  const url = normalize(document.url);
  const exactQuery = normalize(query).trim();

  let score = 0;

  if (exactQuery) {
    if (title.includes(exactQuery)) score += 18;
    if (description.includes(exactQuery)) score += 12;
    if (content.includes(exactQuery)) score += 7;
  }

  for (const term of terms) {
    score += countOccurrences(title, term) * 10;
    score += countOccurrences(description, term) * 5;
    score += countOccurrences(content, term) * 2;
    score += countOccurrences(url, term);
  }

  return score;
}

export function getSearchIndex() {
  return [
    ...marketingPages,
    ...createLocationDocuments(),
    ...createBlogDocuments(),
  ];
}

export function searchSiteContent(query: string) {
  const normalizedQuery = normalize(query).trim();
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  const documents = getSearchIndex();

  if (!terms.length) {
    return documents.slice(0, 8).map((document) => ({
      title: document.title,
      url: document.url,
      description: document.description,
      type: document.type,
      score: 0,
    }));
  }

  return documents
    .map((document) => ({
      title: document.title,
      url: document.url,
      description: document.description,
      type: document.type,
      score: scoreDocument(document, query, terms),
    }))
    .filter((document) => document.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 20);
}
