import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/utils/site";

export type HomeFaqEntry = {
  question: string;
  paragraphs: string[];
  bulletPoints?: string[];
};

export const homeFaqEntries: HomeFaqEntry[] = [
  {
    question: "How is this different from other workflow tools?",
    paragraphs: [
      "There are already powerful platforms out there, but most are built for large teams and require time to learn and maintain.",
      "Senna Automation designs and ships around your business, so you get a working process instead of another tool your team has to manage.",
    ],
  },
  {
    question: "Do I need to be technical to use this?",
    paragraphs: [
      "No.",
      "Everything is set up to match how your business already works, so your team interacts with simple inputs like emails, forms, or messages while the workflow runs quietly in the background.",
    ],
  },
  {
    question: "What kinds of work can the system handle?",
    paragraphs: [
      "Anything that follows a pattern and needs consistent handoff.",
      "Most businesses are already doing this work manually before it gets translated into a repeatable system.",
    ],
    bulletPoints: [
      "Incoming leads getting organized and qualified",
      "Follow-ups happening without reminders",
      "Scheduling handled without back-and-forth",
      "Invoices or documents created from conversations",
      "Tasks moving between people without manual coordination",
    ],
  },
  {
    question: "How do I get started?",
    paragraphs: [
      "We start by looking at where work is getting stuck or repeated.",
      "From there, we build one system that takes that off your plate, then expand into other areas once the first workflow is running cleanly.",
    ],
  },
];

export function formatAiFaqAnswer(entry: HomeFaqEntry) {
  const segments = [...entry.paragraphs];

  if (entry.bulletPoints?.length) {
    segments.push(`That usually includes: ${entry.bulletPoints.join("; ")}.`);
  }

  return segments.join(" ");
}

export const aiServiceProfile = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  service_area: [
    "Grand Rapids, Michigan",
    "West Michigan",
    "United States",
  ],
  capabilities: [
    {
      name: "Workflow design",
      description:
        "Move repetitive internal handoffs, approvals, routing, and back-office tasks across the tools your team already uses.",
      url: `${SITE_URL}/services`,
    },
    {
      name: "Lead capture and qualification",
      description:
        "Capture inquiries, summarize context, score fit, and route leads automatically so no opportunity waits on manual follow-up.",
      url: `${SITE_URL}/services`,
    },
    {
      name: "Sales follow-up systems",
      description:
        "Trigger reminders, email and SMS sequences, and CRM updates that keep pipelines moving without manual chasing.",
      url: `${SITE_URL}/services`,
    },
    {
      name: "Custom AI assistants and internal tools",
      description:
        "Build lightweight assistants, dashboards, and workflow tools that help teams answer questions and complete repeatable work faster.",
      url: `${SITE_URL}/services`,
    },
  ],
  contact: {
    url: `${SITE_URL}/contact`,
    telephone: "+1-616-287-3360",
  },
};
