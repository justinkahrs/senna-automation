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
      "AI automation in Grand Rapids for intake, lead response, document processing, approvals, routing, reporting, and AI assistants. Free assessment available. Projects start at $500.",
    eyebrow: "Grand Rapids AI Automation",
    h1: "AI automation for Grand Rapids and West Michigan businesses",
    lead:
      "Senna Automation helps Grand Rapids businesses use AI automation to reduce manual admin, speed up response time, and keep work moving across email, forms, spreadsheets, CRMs, ERPs, and shared documents.",
    introTitle: "Practical AI automation for real operational bottlenecks",
    introBody:
      "Most companies searching for AI automation in Grand Rapids do not need a generic chatbot or a full system replacement. They need one dependable workflow that captures information once, routes it correctly, flags exceptions early, and gives managers better visibility into work in motion. Senna Automation builds those systems around the tools your team already uses so the first rollout solves a real business problem instead of creating another disconnected app.",
    assessmentTitle: "Free assessment and a clear first automation scope",
    assessmentBody:
      "We start by mapping one high-friction workflow, such as lead follow-up, quote intake, service scheduling prep, document processing, approvals, or internal status reporting. Small AI automation projects start at $500, and larger builds are scoped around the systems, rules, edge cases, and integrations your team already manages today.",
    primaryKeyword: "ai automation grand rapids",
    secondaryKeywords: [
      "AI workflow automation Grand Rapids",
      "business automation Grand Rapids",
      "automation consultant West Michigan",
      "AI automation Michigan",
      "Grand Rapids business automation services",
      "AI automation company Grand Rapids",
      "custom AI automation Grand Rapids",
      "AI agents Grand Rapids",
    ],
    supportingPostSlugs: [
      "where-west-michigan-teams-start-with-ai-automation-in-the-back-office",
      "how-west-michigan-manufacturers-start-with-ai-automation-without-a-full-system-replacement",
      "automating-service-call-scheduling-before-the-day-falls-apart",
    ],
    useCases: [
      {
        title: "Lead intake, qualification, and follow-up",
        description:
          "Capture inquiries from forms, inboxes, and call notes, summarize the request, assign ownership, and trigger the next follow-up before opportunities go cold.",
      },
      {
        title: "Quote, service-request, and job intake automation",
        description:
          "Standardize requests from email, PDFs, spreadsheets, and uploads so the right team gets complete information without repeated copy and paste.",
      },
      {
        title: "Document extraction and data entry reduction",
        description:
          "Pull key fields from PDFs, attachments, customer forms, and internal files, then push the structured data into CRM, ERP, or reporting workflows.",
      },
      {
        title: "Approvals, routing, and exception management",
        description:
          "Move work through approval paths, send reminders when information is missing, and escalate stalled requests before delays spread downstream.",
      },
      {
        title: "Internal AI assistants and reporting support",
        description:
          "Give staff faster answers, summaries, and next-step guidance from approved business context while preserving human review where needed.",
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        description:
          "RFQ intake, production handoffs, purchasing support, maintenance coordination, quality follow-up, and reporting workflows.",
      },
      {
        name: "Trades and field service",
        description:
          "Missed-call follow-up, estimate routing, scheduling prep, technician coordination, customer reminders, and dispatch support.",
      },
      {
        name: "Distribution and logistics",
        description:
          "Order capture, shipment communication, stock checks, customer request routing, document handling, and sales support workflows.",
      },
      {
        name: "Professional and admin-heavy service teams",
        description:
          "Client intake, document review, recurring approvals, status updates, inbox triage, and back-office coordination.",
      },
    ],
    process: [
      {
        title: "Find the workflow where work gets stuck",
        description:
          "We identify where requests actually begin, what information is required, who touches the process, and where delays, duplicate entry, or manual checking keep showing up.",
      },
      {
        title: "Design the rules, integrations, and AI boundaries",
        description:
          "We define what should be automated, where AI should interpret or summarize information, what needs human review, and how the workflow should connect to your current systems.",
      },
      {
        title: "Launch the first useful automation and refine it",
        description:
          "We implement the workflow, test edge cases, train the team, and improve the rollout using real exceptions and usage data instead of assumptions.",
      },
    ],
    faqs: [
      {
        question: "What kinds of AI automation projects do Grand Rapids businesses usually start with?",
        answer:
          "Common first projects include lead follow-up, quote intake, service-request routing, document extraction, approval workflows, scheduling prep, internal alerts, and status reporting.",
      },
      {
        question: "Do we need to replace our CRM, ERP, or scheduling software?",
        answer:
          "Usually no. Most AI automation projects work best as a layer around the systems you already use so information moves with less manual re-entry and fewer missed handoffs.",
      },
      {
        question: "What is the difference between AI automation and standard workflow automation?",
        answer:
          "Workflow automation handles structured rules like routing, reminders, and approvals. AI automation adds capabilities such as summarizing requests, extracting fields from documents, classifying inbound work, and assisting teams with decision support inside that workflow.",
      },
      {
        question: "How much does AI automation cost for a Grand Rapids business?",
        answer:
          "Focused automation work starts at $500. Final pricing depends on the number of systems involved, the complexity of the workflow, the amount of AI processing required, and how much custom integration is needed.",
      },
      {
        question: "How quickly can an AI automation project launch?",
        answer:
          "Simple, focused workflows can usually start much faster than a full software replacement because the scope is centered on one process, one owner, and the tools your team already has in place.",
      },
      {
        question: "Is AI automation only useful for manufacturers?",
        answer:
          "No. It is also valuable for contractors, distributors, field service teams, and office-heavy businesses that deal with repeated intake, approvals, scheduling, document handling, and customer follow-up.",
      },
      {
        question: "Do you serve businesses outside Grand Rapids?",
        answer:
          "Yes. Senna Automation supports businesses in Grand Rapids and across West Michigan, including Kentwood, Wyoming, Grandville, Walker, Holland, Rockford, Ada, and Byron Center.",
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
      "Business process automation in Grand Rapids for intake, approvals, routing, reporting, and system handoffs. Senna Automation helps West Michigan teams reduce manual work with practical automation starting at $500.",
    eyebrow: "Grand Rapids Business Process Automation",
    h1: "Business process automation for Grand Rapids businesses",
    lead:
      "Senna Automation helps Grand Rapids and West Michigan teams reduce manual admin, speed up internal handoffs, and improve day-to-day operations with practical business process automation built around the systems they already use.",
    introTitle: "Automate the workflows that keep slowing the business down",
    introBody:
      "Most companies do not need a full software replacement to improve operations. They need repeated work to move more reliably from inboxes, forms, spreadsheets, PDFs, CRMs, ERPs, and shared documents into the next step. Senna Automation designs business process automation around those real operational bottlenecks so teams can reduce re-entry, missed follow-up, approval delays, and status confusion without overcomplicating the rollout.",
    assessmentTitle: "Free assessment and a practical first automation scope",
    assessmentBody:
      "The first step is a free assessment focused on one process that creates drag today. Small projects start at $500, and larger automation systems are scoped around your current tools, decision rules, handoffs, and reporting needs.",
    primaryKeyword: "business process automation grand rapids",
    secondaryKeywords: [
      "business process automation Grand Rapids",
      "process automation Grand Rapids",
      "business automation Grand Rapids",
      "workflow automation Grand Rapids",
      "operations automation West Michigan",
      "business process consultant Grand Rapids",
    ],
    supportingPostSlugs: [
      "where-west-michigan-teams-start-with-ai-automation-in-the-back-office",
      "automating-inventory-sync-between-purchasing-production-and-the-stock-room",
      "automating-service-call-scheduling-before-the-day-falls-apart",
    ],
    useCases: [
      {
        title: "Intake and data capture automation",
        description:
          "Capture requests from email, forms, phone notes, PDFs, and shared inboxes, then turn them into structured records without repeated copy and paste.",
      },
      {
        title: "Approval routing and exception handling",
        description:
          "Move requests through clear approval paths, escalate missing information, and notify the right team when work stalls or falls outside the rules.",
      },
      {
        title: "Internal handoff automation",
        description:
          "Connect sales, operations, purchasing, service, and admin workflows so the next owner gets the right information at the right time.",
      },
      {
        title: "Status tracking and reporting",
        description:
          "Give managers visibility into pending work, blocked items, turnaround time, and bottlenecks without relying on manual spreadsheet updates.",
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        description:
          "Quote intake, purchasing approvals, inventory coordination, quality follow-up, maintenance prep, and production handoffs.",
      },
      {
        name: "Distribution and logistics",
        description:
          "Order processing, stock checks, vendor communication, shipment updates, and exception routing across office teams.",
      },
      {
        name: "Trades and field service",
        description:
          "Service request intake, scheduling prep, estimate approvals, technician coordination, and customer communication workflows.",
      },
      {
        name: "Professional and admin-heavy service businesses",
        description:
          "Client onboarding, document collection, internal approvals, recurring follow-up, and back-office coordination.",
      },
    ],
    process: [
      {
        title: "Map the process that breaks down today",
        description:
          "We identify where the workflow starts, what information is required, who touches it, and where delays or manual checks keep appearing.",
      },
      {
        title: "Design the first useful automation boundary",
        description:
          "We define a focused rollout with the right rules, approvals, notifications, and integrations so the system solves a real bottleneck quickly.",
      },
      {
        title: "Launch, test, and improve with real usage",
        description:
          "We implement the workflow, test exceptions, train the team, and refine the process once actual users and edge cases expose what needs adjustment.",
      },
    ],
    faqs: [
      {
        question: "What is business process automation for a Grand Rapids company?",
        answer:
          "Business process automation uses software, integrations, and workflow logic to move repeated work through the business with less manual entry, fewer missed handoffs, and clearer visibility into what happens next.",
      },
      {
        question: "What kinds of processes are usually automated first?",
        answer:
          "Common first projects include intake, approvals, routing, scheduling prep, quote handoffs, document processing, follow-up reminders, and internal status reporting.",
      },
      {
        question: "Do we need to replace our current software to automate processes?",
        answer:
          "Usually no. Many projects work best as a layer around the tools you already use, such as spreadsheets, email, CRM, ERP, forms, calendars, and shared documents.",
      },
      {
        question: "How much does business process automation cost?",
        answer:
          "Focused automation work starts at $500. Larger projects depend on the number of systems involved, the complexity of the business rules, and the amount of custom workflow design required.",
      },
      {
        question: "Do you only automate processes for manufacturers?",
        answer:
          "No. Senna Automation supports manufacturers, distributors, trades, field service teams, and office-heavy businesses that need better workflow control and less manual admin.",
      },
      {
        question: "Do you serve businesses outside Grand Rapids?",
        answer:
          "Yes. Senna Automation works with businesses across West Michigan, including Kentwood, Wyoming, Grandville, Walker, Holland, Rockford, Ada, and Byron Center.",
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
