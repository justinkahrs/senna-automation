export interface AdLandingPageConfig {
  slug: string;
  organicSlug: string;
  variant: string;
  eyebrow: string;
  h1: string;
  lead: string;
  formPrompt: string;
  assessmentFocus: string[];
  proofPoints: string[];
  followUp: string;
}

export const adLandingPages: AdLandingPageConfig[] = [
  {
    slug: "ai-automation-grand-rapids",
    organicSlug: "ai-automation-grand-rapids",
    variant: "ai-automation-control",
    eyebrow: "AI Automation · Grand Rapids",
    h1: "Find the first AI automation worth building",
    lead:
      "Map one repetitive workflow, identify the manual handoffs, and leave with a practical first project for your West Michigan team.",
    formPrompt:
      "Tell us which intake, document, scheduling, approval, or reporting process is taking too much time.",
    assessmentFocus: [
      "Lead intake and follow-up",
      "Document extraction and routing",
      "Scheduling, approvals, and status updates",
    ],
    proofPoints: [
      "Grand Rapids based",
      "Projects start at $500",
      "Built around your existing systems",
    ],
    followUp:
      "We will respond with the next useful question, not a generic sales sequence.",
  },
  {
    slug: "workflow-automation-consultant-grand-rapids",
    organicSlug: "workflow-automation-consultant-grand-rapids",
    variant: "workflow-consultant-control",
    eyebrow: "Workflow Automation Consultant · Grand Rapids",
    h1: "Turn a slow handoff into a working automation",
    lead:
      "Senna maps the trigger, information, rules, exceptions, and owner behind one operational workflow—then scopes the smallest dependable release.",
    formPrompt:
      "Describe the handoff, follow-up, data entry, or approval step that keeps stalling.",
    assessmentFocus: [
      "Process mapping and bottleneck review",
      "Integration and exception planning",
      "A focused implementation scope",
    ],
    proofPoints: [
      "Free workflow assessment",
      "Projects start at $500",
      "West Michigan service area",
    ],
    followUp:
      "Your reply will be tied to the workflow you describe and the systems you already use.",
  },
  {
    slug: "ai-consulting-grand-rapids",
    organicSlug: "ai-consulting-grand-rapids",
    variant: "ai-consulting-control",
    eyebrow: "AI Consulting · Grand Rapids",
    h1: "Choose an AI project your team can actually operate",
    lead:
      "Get a grounded assessment of where AI can reduce repeated work, where standard automation is safer, and what a useful first release should include.",
    formPrompt:
      "Tell us what your team is trying to improve and where the current process breaks down.",
    assessmentFocus: [
      "AI opportunity and risk review",
      "Workflow and data readiness",
      "A measurable first implementation",
    ],
    proofPoints: [
      "Practical, workflow-first advice",
      "Projects start at $500",
      "Local Grand Rapids support",
    ],
    followUp:
      "We will separate real implementation opportunities from ideas that are not ready yet.",
  },
];

export function getAdLandingPage(slug: string) {
  return adLandingPages.find((page) => page.slug === slug) || null;
}

