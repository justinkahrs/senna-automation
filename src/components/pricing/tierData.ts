export type SharedPricingTier = {
  id: "starter" | "growth";
  anchorId: string;
  toggleLabel: string;
  eyebrow: string;
  name: string;
  description: string;
  includes: string[];
  outcomes: string[];
  homepageHeadline: string;
  homepageDescription: string;
  homepageNote: string;
  ctaLabel: string;
  ctaHref: string;
};

export const starterTier: SharedPricingTier = {
  id: "starter",
  anchorId: "starter-automation",
  toggleLabel: "Starter Automation",
  eyebrow: "Starter Automation",
  name: "Starter Automation",
  description:
    "Perfect for small businesses looking to automate a single, high-impact workflow.",
  includes: [
    "1 core workflow automated",
    "Basic integrations (CRM, email, forms)",
  ],
  outcomes: ["Save hours each week", "Reduce repetitive tasks"],
  homepageHeadline: "Start with one workflow that immediately lightens the load.",
  homepageDescription:
    "A focused build for teams that want to automate one high-impact process first. It is the clearest way to remove repetitive work, tighten response times, and prove value quickly.",
  homepageNote:
    "Best for businesses that want to start practical, keep scope tight, and build confidence before expanding.",
  ctaLabel: "See Pricing",
  ctaHref: "/pricing#starter-automation",
};

export const growthTier: SharedPricingTier = {
  id: "growth",
  anchorId: "growth-systems",
  toggleLabel: "Growth Systems",
  eyebrow: "Growth Systems",
  name: "Growth Systems",
  description:
    "For companies ready to scale lead generation and automate customer follow-up.",
  includes: [
    "Multi-step automated workflows",
    "Lead capture + automated follow-up",
    "Full CRM integration",
  ],
  outcomes: [
    "Capture and convert more leads",
    "Significantly reduce manual work",
  ],
  homepageHeadline: "Build a growth system that keeps leads moving without gaps.",
  homepageDescription:
    "A stronger operating layer for teams ready to connect more systems, automate follow-up, and keep opportunities advancing without manual chasing.",
  homepageNote:
    "Best for businesses that need more than one isolated fix and want a system that supports revenue growth.",
  ctaLabel: "See Pricing",
  ctaHref: "/pricing#growth-systems",
};

export const sharedPricingTiers = [starterTier, growthTier];
