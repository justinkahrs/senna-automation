export type BlogPostMetadata = {
  title: string;
  category: string;
  excerpt: string;
  image: string;
  subtitle?: string;
  heroTitle?: string;
  heroSubtitle?: string;
};

export const blogPostsMetadata: Record<string, BlogPostMetadata> = {
  "automating-inventory-sync-between-purchasing-production-and-the-stock-room": {
    title: "Real-Time Inventory Sync Across Teams",
    category: "Automation Systems",
    subtitle:
      "A practical pattern for small manufacturers that need fewer stock surprises without replacing every system at once.",
    heroTitle: "Real-Time Inventory Sync Across Teams",
    heroSubtitle:
      "Reduce stockouts, duplicate ordering, and manual reconciliation with a lightweight operations workflow.",
    excerpt:
      "Small manufacturers often do not need a full ERP overhaul to improve inventory control. They need purchasing, production, and stock updates to stay in sync.",
    image:
      "/blog/automating-inventory-sync-between-purchasing-production-and-the-stock-room.jpg",
  },
  "lead-qualification": {
    title: "Automating Lead Qualification for Complex B2B Sales",
    category: "Lead Management",
    subtitle:
      "How we turned fragmented district research into an AI-powered lead intelligence pipeline.",
    heroTitle: "End-to-End Lead Intelligence",
    heroSubtitle:
      "Transforming messy public data into prioritized, sales-ready opportunities automatically.",
    excerpt:
      "See how we built an AI system that researches school districts, scores purchasing signals, and surfaces the best opportunities automatically so sales teams can spend less time digging and more time closing.",
    image: "/blog/lead-qualification/hero.jpg",
  },
  "quote-automation": {
    title: "Automating Unstructured Quoting with AI",
    category: "Automation Workflow",
    subtitle:
      "How we turned manual quote drafting from unstructured emails into a fully automated AI pipeline.",
    heroTitle: "End-to-End Quote Automation",
    heroSubtitle:
      "Transforming messy inbox requests into polished PDF quotes instantly.",
    excerpt:
      "Discover how we used n8n and Azure OpenAI to automatically read customer emails, extract structured product data (even from PDFs!), query internal databases, and generate final quote PDFs without human intervention.",
    image: "/blog/quote-automation/hero.jpg",
  },
  "rcs-tech-demo": {
    title: "Conversational Guest Experience Demo via Messaging",
    category: "Conversational Interfaces",
    subtitle:
      "How we built a simulated RCS-style experience to guide users through a full guest journey without an app.",
    heroTitle: "Messaging-First Product Experience",
    heroSubtitle:
      "Replacing traditional apps with guided, interactive conversations.",
    excerpt:
      "Explore how a browser-based messaging experience can simulate a full guest journey using rich UI, payments, and automation without requiring a native app.",
    image: "/blog/rcs-tech-demo/hero.png",
  },
};
