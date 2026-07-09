import { SITE_URL } from "@/utils/site";

export type LocalSeoIndustry = {
  name: string;
  description: string;
};

export type LocalSeoUseCase = {
  title: string;
  description: string;
};

export type LocalSeoStep = {
  title: string;
  description: string;
};

export type LocalSeoFaq = {
  question: string;
  answer: string;
};

export type LocalSeoPageConfig = {
  slug: string;
  serviceName: string;
  serviceType: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  introTitle: string;
  introBody: string;
  assessmentTitle: string;
  assessmentBody: string;
  useCases: LocalSeoUseCase[];
  industries: LocalSeoIndustry[];
  process: LocalSeoStep[];
  faqs: LocalSeoFaq[];
  nearbyCities: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  supportingPostSlugs: string[];
};

const nearbyCities = [
  "Kentwood",
  "Wyoming",
  "Grandville",
  "Walker",
  "Holland",
  "Rockford",
  "Ada",
  "Byron Center",
];

export const localSeoPages = {
  aiConsultingGrandRapids: {
    slug: "ai-consulting-grand-rapids",
    serviceName: "AI Consulting in Grand Rapids",
    serviceType: "AI consulting",
    title: "AI Consulting Grand Rapids | Senna Automation",
    description:
      "Grand Rapids AI consulting for practical workflow automation, AI assistants, and custom software systems. Start with a free assessment and pricing from $500.",
    eyebrow: "Grand Rapids AI Consulting",
    h1: "AI consulting for Grand Rapids businesses",
    lead:
      "Senna Automation helps West Michigan teams turn unclear AI ideas into working systems that remove manual work, speed up follow-up, and make operations easier to run.",
    introTitle: "Practical AI guidance that turns into shipped systems",
    introBody:
      "A useful AI engagement should not end with a slide deck. We identify the repeated work, data handoffs, decision points, and customer touchpoints where AI can help, then build the first focused system so your team can see what changes in daily operations.",
    assessmentTitle: "Free assessment, fixed starting point",
    assessmentBody:
      "The first call maps one high-friction workflow and turns it into a clear recommendation. Small engagements start at $500, and larger builds are quoted after scope is defined.",
    primaryKeyword: "ai consulting grand rapids",
    secondaryKeywords: [
      "AI consultant Grand Rapids",
      "AI consultant West Michigan",
      "custom AI solutions Grand Rapids",
      "AI workflow consulting Michigan",
    ],
    supportingPostSlugs: [
      "how-west-michigan-manufacturers-start-with-ai-automation-without-a-full-system-replacement",
      "where-west-michigan-teams-start-with-ai-automation-in-the-back-office",
      "automating-inventory-sync-between-purchasing-production-and-the-stock-room",
    ],
    useCases: [
      {
        title: "AI opportunity audits",
        description:
          "Find the workflows where AI can save time quickly without forcing a large platform migration.",
      },
      {
        title: "Internal AI assistants",
        description:
          "Give teams a controlled way to answer questions, summarize information, and create first drafts from approved business context.",
      },
      {
        title: "Custom AI workflows",
        description:
          "Connect forms, email, CRM records, documents, and internal tools so inputs become useful outputs automatically.",
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        description:
          "Quoting, inventory updates, supplier follow-up, production handoffs, and exception alerts.",
      },
      {
        name: "Trades and field service",
        description:
          "Lead intake, dispatch prep, appointment reminders, estimate follow-up, and customer communication.",
      },
      {
        name: "Distributors",
        description:
          "Order intake, customer request routing, stock questions, price lookup support, and sales follow-up.",
      },
      {
        name: "Professional services",
        description:
          "Client intake, document preparation, meeting follow-up, task routing, and internal knowledge support.",
      },
    ],
    process: [
      {
        title: "Find the operational bottleneck",
        description:
          "We start with the work your team repeats, delays, or has to check manually.",
      },
      {
        title: "Design the first useful system",
        description:
          "The recommendation focuses on one workflow, the systems involved, and the smallest build that can prove value.",
      },
      {
        title: "Build, test, and hand off",
        description:
          "We implement the workflow, test edge cases, document the process, and make sure your team knows how to use it.",
      },
    ],
    faqs: [
      {
        question: "What does an AI consultant do for a Grand Rapids business?",
        answer:
          "An AI consultant identifies where AI can improve daily operations, designs the right workflow, and helps build systems that connect with the tools the business already uses.",
      },
      {
        question: "Do we need clean data before starting?",
        answer:
          "No. Many useful first projects start with messy emails, PDFs, spreadsheets, or CRM notes. The first step is deciding which information needs to become structured.",
      },
      {
        question: "How much does AI consulting start at?",
        answer:
          "Senna Automation pricing starts at $500 for small, focused automation work. Larger AI systems are scoped after a free assessment.",
      },
      {
        question: "Do you work outside Grand Rapids?",
        answer:
          "Yes. Senna Automation is based in Grand Rapids and serves businesses across West Michigan, including Kentwood, Wyoming, Grandville, Walker, Holland, Rockford, Ada, and Byron Center.",
      },
    ],
    nearbyCities,
  },
  aiAutomationGrandRapids: {
    slug: "ai-automation-grand-rapids",
    serviceName: "AI Automation in Grand Rapids",
    serviceType: "AI automation",
    title: "AI Automation Grand Rapids | Senna Automation",
    description:
      "Grand Rapids AI automation for lead follow-up, intake, documents, approvals, routing, and reporting. Free assessment available with projects starting at $500.",
    eyebrow: "Grand Rapids AI Automation",
    h1: "AI automation for Grand Rapids businesses",
    lead:
      "Senna Automation builds practical AI automation systems for West Michigan teams that need faster response times, cleaner handoffs, and less manual admin across the tools they already use.",
    introTitle: "Business automation that fits the way your team already works",
    introBody:
      "Most local teams do not need a flashy AI demo or a full software replacement. They need repeated work to move reliably from inboxes, forms, PDFs, spreadsheets, CRMs, and ERPs into the next step without waiting on manual copy and paste. We design AI automation around those everyday bottlenecks so your first rollout is useful in real operations.",
    assessmentTitle: "Free assessment and a practical starting scope",
    assessmentBody:
      "The first step is a free assessment focused on one high-friction workflow. Small automation projects start at $500, and larger builds are scoped from the systems, handoffs, approvals, and exceptions your team actually manages today.",
    primaryKeyword: "ai automation grand rapids",
    secondaryKeywords: [
      "AI workflow automation Grand Rapids",
      "business automation Grand Rapids",
      "automation consultant West Michigan",
      "AI automation Michigan",
      "Grand Rapids business automation services",
      "AI automation company Grand Rapids",
    ],
    supportingPostSlugs: [
      "where-west-michigan-teams-start-with-ai-automation-in-the-back-office",
      "automating-service-call-scheduling-before-the-day-falls-apart",
      "automating-lockout-tagout-readiness-before-maintenance-delays-and-safety-gaps-spread",
    ],
    useCases: [
      {
        title: "Lead response and follow-up automation",
        description:
          "Capture inquiries, summarize context, assign the right owner, and trigger follow-up before leads sit untouched in a shared inbox.",
      },
      {
        title: "Document, form, and email processing",
        description:
          "Extract key fields from PDFs, email threads, intake forms, and attachments, then send that data into the correct system automatically.",
      },
      {
        title: "Approvals, routing, and exception handling",
        description:
          "Move requests through clear approval paths, escalate missing information, and notify the right team when work stalls or changes status.",
      },
      {
        title: "Reporting and internal AI assistants",
        description:
          "Generate summaries, surface next actions, and give teams faster answers from approved business context without replacing core software.",
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        description:
          "Quote intake, production handoffs, purchasing follow-up, maintenance coordination, and operational exception alerts.",
      },
      {
        name: "Trades and contractors",
        description:
          "Missed-call follow-up, estimate routing, scheduling prep, technician updates, and customer communication.",
      },
      {
        name: "Distribution and logistics",
        description:
          "Order intake, shipment updates, stock checks, customer request routing, and sales support workflows.",
      },
      {
        name: "Professional and admin-heavy service teams",
        description:
          "Client intake, document review, approvals, recurring status updates, and back-office task coordination.",
      },
    ],
    process: [
      {
        title: "Map where work actually starts",
        description:
          "We identify the real inputs behind the workflow, including inboxes, forms, spreadsheets, CRM records, phone notes, PDFs, and shared documents.",
      },
      {
        title: "Define the business rules and edge cases",
        description:
          "We turn manual decisions into routing, extraction, scoring, approval, reminder, and escalation logic that matches how your team already operates.",
      },
      {
        title: "Launch the first automation with the right integrations",
        description:
          "We connect the workflow to the systems you already use, test exceptions, and make sure the output is dependable before expanding scope.",
      },
    ],
    faqs: [
      {
        question: "What kinds of AI automation projects do Grand Rapids businesses usually start with?",
        answer:
          "Common first projects include lead follow-up, quote or service-request intake, document extraction, approval routing, customer reminders, reporting summaries, and internal status alerts.",
      },
      {
        question: "Do we need to replace our CRM, ERP, or scheduling software?",
        answer:
          "Usually no. Most first projects connect the software you already use so information moves between systems without manual re-entry.",
      },
      {
        question: "How much does AI automation cost?",
        answer:
          "Focused automation work starts at $500. Larger builds depend on the systems involved, the complexity of the rules, and whether AI extraction or assistants are part of the workflow.",
      },
      {
        question: "Is AI automation only useful for manufacturers?",
        answer:
          "No. Senna Automation works across manufacturing, trades, distribution, field service, and office-heavy service teams where repeated admin work and handoffs slow down response time.",
      },
      {
        question: "Do you serve businesses outside Grand Rapids?",
        answer:
          "Yes. Senna Automation supports West Michigan businesses in Grand Rapids and nearby communities including Kentwood, Wyoming, Grandville, Walker, Holland, Rockford, Ada, and Byron Center.",
      },
    ],
    nearbyCities,
  },
  workflowAutomationConsultantGrandRapids: {
    slug: "workflow-automation-consultant-grand-rapids",
    serviceName: "Workflow Automation Consultant in Grand Rapids",
    serviceType: "Workflow automation consulting",
    title: "Workflow Automation Consultant Grand Rapids | Senna Automation",
    description:
      "Grand Rapids workflow automation consultant for SMB operations, lead follow-up, intake, quoting, routing, and internal handoffs. Free assessment available.",
    eyebrow: "Workflow Automation Consultant",
    h1: "Workflow automation consultant for Grand Rapids operations",
    lead:
      "Senna Automation helps small and mid-sized West Michigan businesses remove repeated handoffs, manual checks, and slow follow-up from the workflows that run the company.",
    introTitle: "Process improvement that ships as working automation",
    introBody:
      "Good workflow automation starts with the real path work takes through the business. We document the trigger, the information needed, the decision rules, the handoff, and the output, then build a system that keeps the process moving.",
    assessmentTitle: "A clear first workflow before a larger rollout",
    assessmentBody:
      "The free assessment identifies one workflow worth automating first. Pricing starts at $500 for focused work, and larger systems are scoped once the process and integrations are clear.",
    primaryKeyword: "workflow automation consultant grand rapids",
    secondaryKeywords: [
      "business process automation Grand Rapids",
      "workflow automation consulting Michigan",
      "process automation consultant Grand Rapids",
      "operations automation West Michigan",
    ],
    supportingPostSlugs: [
      "automating-service-call-scheduling-before-the-day-falls-apart",
      "automating-shop-floor-quality-handoffs-before-scrap-and-rework-spread",
      "automating-lockout-tagout-readiness-before-maintenance-delays-and-safety-gaps-spread",
    ],
    useCases: [
      {
        title: "Intake and routing",
        description:
          "Turn requests from forms, email, calls, and PDFs into structured work that reaches the right person.",
      },
      {
        title: "Follow-up and reminders",
        description:
          "Trigger customer messages, internal reminders, and next-step tasks when a workflow stalls or reaches a milestone.",
      },
      {
        title: "Reporting and visibility",
        description:
          "Summarize what happened, what is waiting, and what needs attention without forcing manual status updates.",
      },
    ],
    industries: [
      {
        name: "Manufacturing and job shops",
        description:
          "RFQ intake, quoting handoffs, material checks, approval routing, and order-status updates.",
      },
      {
        name: "Trades and field operations",
        description:
          "Lead intake, scheduling prep, dispatch notes, technician updates, and invoice-support workflows.",
      },
      {
        name: "Distribution teams",
        description:
          "Customer requests, inventory checks, sales routing, fulfillment updates, and vendor follow-up.",
      },
      {
        name: "Professional service firms",
        description:
          "Client onboarding, document preparation, task creation, meeting follow-up, and approval processes.",
      },
    ],
    process: [
      {
        title: "Document the current workflow",
        description:
          "We map the actual path work takes today, including the manual checks and exceptions that slow it down.",
      },
      {
        title: "Choose the first automation boundary",
        description:
          "We keep the first release focused enough to launch quickly and broad enough to make a visible difference.",
      },
      {
        title: "Improve after launch",
        description:
          "Once the workflow is running, we refine it with real usage, exception data, and team feedback.",
      },
    ],
    faqs: [
      {
        question: "When should we hire a workflow automation consultant?",
        answer:
          "It is usually time when the same handoffs, follow-ups, approvals, or data entry steps keep slowing work down or causing missed opportunities.",
      },
      {
        question: "Can you automate a workflow that uses spreadsheets?",
        answer:
          "Yes. Many first projects connect spreadsheets with email, forms, CRM records, task tools, or databases before a larger system is needed.",
      },
      {
        question: "Do you only work with AI tools?",
        answer:
          "No. AI is useful when the workflow needs interpretation, summarization, or extraction. Some workflows are better solved with standard automation and integrations.",
      },
      {
        question: "What areas do you serve?",
        answer:
          "Senna Automation is based in Grand Rapids and works across West Michigan, including Kentwood, Wyoming, Grandville, Walker, Holland, Rockford, Ada, and Byron Center.",
      },
    ],
    nearbyCities,
  },
  businessProcessAutomationGrandRapids: {
    slug: "business-process-automation-grand-rapids",
    serviceName: "Business Process Automation in Grand Rapids",
    serviceType: "Business process automation",
    title: "Business Process Automation Grand Rapids | Senna Automation",
    description:
      "Grand Rapids business process automation for approvals, intake, quoting, scheduling, reporting, and back-office workflows. Free assessment available with projects starting at $500.",
    eyebrow: "Grand Rapids Business Process Automation",
    h1: "Business process automation for Grand Rapids companies",
    lead:
      "Senna Automation helps Grand Rapids and West Michigan businesses reduce manual handoffs, improve response time, and keep day-to-day operations moving with practical automation systems.",
    introTitle: "Automate the workflows that slow your team down every week",
    introBody:
      "Business process automation works best when it starts with the repeated tasks your team already handles across email, forms, spreadsheets, ERP records, CRM updates, scheduling tools, and internal approvals. We design focused systems that remove duplicate entry, route work faster, and make bottlenecks visible without forcing a full software replacement first.",
    assessmentTitle: "Free assessment with a practical first scope",
    assessmentBody:
      "The first step is a free assessment centered on one high-friction process. Small automation projects start at $500, and larger business process automation builds are scoped around your current systems, decision rules, approvals, and reporting needs.",
    primaryKeyword: "business process automation grand rapids",
    secondaryKeywords: [
      "business process automation services Grand Rapids",
      "process automation Grand Rapids",
      "workflow automation Grand Rapids",
      "operations automation West Michigan",
      "business automation consultant Grand Rapids",
      "back-office automation Grand Rapids",
    ],
    supportingPostSlugs: [
      "where-west-michigan-teams-start-with-ai-automation-in-the-back-office",
      "automating-inventory-sync-between-purchasing-production-and-the-stock-room",
      "automating-service-call-scheduling-before-the-day-falls-apart",
    ],
    useCases: [
      {
        title: "Intake, approvals, and internal routing",
        description:
          "Move requests from inboxes, forms, and shared documents into one dependable workflow with approval logic, ownership rules, and escalation steps.",
      },
      {
        title: "Quoting, order, and service coordination",
        description:
          "Reduce delays between sales, operations, purchasing, dispatch, and customer communication by automating the handoffs that usually stall work.",
      },
      {
        title: "Reporting, alerts, and exception handling",
        description:
          "Surface what is waiting, blocked, overdue, or missing so managers can act sooner instead of discovering issues after the fact.",
      },
      {
        title: "Document and data handoff automation",
        description:
          "Extract information from PDFs, emails, spreadsheets, and line-of-business systems so staff spend less time re-entering the same details.",
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        description:
          "RFQ intake, inventory coordination, production handoffs, maintenance workflows, quality escalations, and purchasing approvals.",
      },
      {
        name: "Distribution",
        description:
          "Order processing, stock checks, customer request routing, vendor follow-up, document handling, and fulfillment visibility.",
      },
      {
        name: "Trades and field service",
        description:
          "Service request intake, scheduling prep, technician coordination, estimate approvals, and day-of exception handling.",
      },
      {
        name: "Office-heavy service teams",
        description:
          "Client intake, onboarding steps, document review, approvals, recurring reporting, and back-office task coordination.",
      },
    ],
    process: [
      {
        title: "Map the current process and friction points",
        description:
          "We identify where work begins, what information is required, where approvals happen, and which manual checks or delays keep the process from moving cleanly.",
      },
      {
        title: "Design the first automation around business rules",
        description:
          "We turn your operating logic into a focused workflow with the right triggers, routing, reminders, integrations, and exception paths.",
      },
      {
        title: "Launch, refine, and expand from a working system",
        description:
          "We implement the first process, test real-world edge cases, train your team, and improve the workflow once live usage shows where to extend it next.",
      },
    ],
    faqs: [
      {
        question: "What is business process automation for a Grand Rapids company?",
        answer:
          "Business process automation is the use of software, integrations, and workflow logic to move recurring work through the business with less manual entry, fewer delays, and clearer ownership. That can include intake, approvals, routing, reminders, reporting, and system-to-system updates.",
      },
      {
        question: "What kinds of processes are good first automation projects?",
        answer:
          "Good first projects usually involve repeated handoffs, predictable rules, and too much manual follow-up. Common examples include quote intake, service scheduling prep, purchasing approvals, document processing, customer request routing, and internal status reporting.",
      },
      {
        question: "Do we need to replace our current software first?",
        answer:
          "Usually no. Many business process automation projects work by connecting the tools you already use, such as spreadsheets, CRM platforms, ERP systems, forms, inboxes, and scheduling tools, so information moves more reliably between them.",
      },
      {
        question: "How much does business process automation cost?",
        answer:
          "Focused automation work starts at $500. Larger projects depend on the number of systems involved, the complexity of the workflow rules, and whether custom integrations or AI-assisted steps are included.",
      },
      {
        question: "Do you only work with businesses in Grand Rapids?",
        answer:
          "No. Senna Automation is based in Grand Rapids and supports companies across West Michigan, including Kentwood, Wyoming, Grandville, Walker, Holland, Rockford, Ada, and Byron Center.",
      },
    ],
    nearbyCities,
  },
} satisfies Record<string, LocalSeoPageConfig>;

export const localSeoPageList = Object.values(localSeoPages);

export function getLocalSeoPageBySlug(slug: string) {
  return localSeoPageList.find((page) => page.slug === slug);
}

export const localSeoRoutes = localSeoPageList.map((page) => ({
  url: `${SITE_URL}/${page.slug}`,
  slug: page.slug,
}));
