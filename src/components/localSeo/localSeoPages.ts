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
      "AI automation in Grand Rapids for manufacturers, service companies, distributors, and office teams. Senna Automation builds practical AI workflows starting at $500.",
    eyebrow: "Grand Rapids AI Automation",
    h1: "AI automation for Grand Rapids businesses that need practical results",
    lead:
      "Senna Automation helps Grand Rapids and West Michigan businesses automate repetitive work with AI-assisted workflows, system integrations, approvals, routing, document handling, and internal follow-up that reduce admin drag without forcing a full software replacement.",
    introTitle: "AI automation built around real business bottlenecks",
    introBody:
      "Most businesses searching for AI automation in Grand Rapids are not looking for a novelty demo. They need repeated work to move faster and more reliably across inboxes, forms, spreadsheets, PDFs, CRMs, ERPs, scheduling tools, and shared documents. Senna Automation designs practical AI automation systems around those day-to-day bottlenecks so your team can reduce copy and paste, speed up response times, and improve visibility without replacing everything at once.",
    assessmentTitle: "Free assessment and a focused first AI automation project",
    assessmentBody:
      "We start by mapping one workflow that creates unnecessary delay, re-entry, or follow-up today. That might be lead intake, quote prep, service scheduling, document processing, approvals, or internal status reporting. Small projects start at $500, and larger builds are scoped around the systems, rules, exceptions, and integrations your team already manages.",
    primaryKeyword: "ai automation grand rapids",
    secondaryKeywords: [
      "AI workflow automation Grand Rapids",
      "business automation Grand Rapids",
      "AI automation company Grand Rapids",
      "custom AI solutions Grand Rapids",
      "AI automation services Grand Rapids",
      "West Michigan AI automation",
      "Grand Rapids business automation services",
    ],
    supportingPostSlugs: [
      "where-west-michigan-teams-start-with-ai-automation-in-the-back-office",
      "how-west-michigan-manufacturers-start-with-ai-automation-without-a-full-system-replacement",
      "automating-service-call-scheduling-before-the-day-falls-apart",
    ],
    useCases: [
      {
        title: "AI lead intake and follow-up automation",
        description:
          "Capture website, phone, email, and referral inquiries, summarize context, assign the right owner, and trigger next-step follow-up before leads go cold.",
      },
      {
        title: "Document extraction and back-office processing",
        description:
          "Pull key data from forms, PDFs, invoices, purchase orders, service requests, and email attachments, then route it into the correct business system automatically.",
      },
      {
        title: "Approval workflows and exception routing",
        description:
          "Move requests through approval steps, flag missing information, escalate stalled work, and notify the right person when a job falls outside the rules.",
      },
      {
        title: "Scheduling, dispatch, and status automation",
        description:
          "Support service teams with cleaner intake, readiness checks, reminders, technician coordination, and internal updates that reduce day-of confusion.",
      },
      {
        title: "Internal AI assistants and reporting summaries",
        description:
          "Give teams faster answers, recurring summaries, next-step recommendations, and operational visibility using approved business context from the systems you already use.",
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        description:
          "Quote intake, purchasing handoffs, maintenance coordination, quality follow-up, production communication, and exception alerts across office and plant workflows.",
      },
      {
        name: "Trades and field service",
        description:
          "Missed-call follow-up, service request triage, estimate routing, scheduling prep, customer reminders, and technician coordination.",
      },
      {
        name: "Distribution and logistics",
        description:
          "Order intake, PO processing, shipment communication, stock questions, customer request routing, and sales support workflows.",
      },
      {
        name: "Professional and admin-heavy service teams",
        description:
          "Client intake, document review, approval routing, recurring follow-up, meeting summaries, and back-office coordination.",
      },
    ],
    process: [
      {
        title: "Map the workflow, inputs, and delays",
        description:
          "We identify where the work begins, what information is needed, which systems are involved, and where manual checks, missed handoffs, or status confusion keep slowing the process down.",
      },
      {
        title: "Design the automation rules and AI tasks",
        description:
          "We define what should be captured, extracted, scored, routed, approved, summarized, or escalated so the workflow matches how your business actually operates.",
      },
      {
        title: "Launch with the right integrations and guardrails",
        description:
          "We connect the workflow to your existing tools, test edge cases, verify outputs, and make sure the first release is dependable before expanding automation further.",
      },
    ],
    faqs: [
      {
        question: "What does AI automation mean for a Grand Rapids business?",
        answer:
          "AI automation combines workflow logic, integrations, and AI-assisted tasks so repeated work moves with less manual effort. That can include extracting data from documents, routing requests, drafting summaries, triggering follow-up, and helping teams get answers faster from approved business information.",
      },
      {
        question: "What are common first AI automation projects?",
        answer:
          "Many Grand Rapids businesses start with lead response, service request intake, quote or order processing, document extraction, approval routing, scheduling coordination, or recurring status reporting because those workflows create visible delays and repeated admin work.",
      },
      {
        question: "Do we need to replace our CRM, ERP, or scheduling software?",
        answer:
          "Usually no. Most first AI automation projects are built around the software you already use so information moves between systems with fewer manual handoffs.",
      },
      {
        question: "How much does AI automation cost?",
        answer:
          "Focused AI automation work starts at $500. The total scope depends on the systems involved, the number of rules and exceptions, and whether the workflow includes AI extraction, summaries, assistants, or custom integrations.",
      },
      {
        question: "Do you only help manufacturers with AI automation?",
        answer:
          "No. Senna Automation works with manufacturers, trades, field service teams, distributors, and office-heavy businesses across West Michigan that need faster handoffs and less manual admin.",
      },
      {
        question: "Do you serve businesses outside Grand Rapids?",
        answer:
          "Yes. Senna Automation supports businesses in Grand Rapids and nearby West Michigan communities including Kentwood, Wyoming, Grandville, Walker, Holland, Rockford, Ada, and Byron Center.",
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
