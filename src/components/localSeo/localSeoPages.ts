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
  areaServed?: Array<{
    type: "City" | "AdministrativeArea";
    name: string;
  }>;
  heroProofPoints?: string[];
  trustTitle?: string;
  trustBody?: string;
  trustProofPoints?: string[];
  relatedExamplesIntro?: string;
  industriesTitle?: string;
  industriesBody?: string;
  coverageTitle?: string;
  coverageBody?: string;
  clusterDescription?: string;
  finalCtaTitle?: string;
  finalCtaSubtitle?: string;
  finalCtaButtonText?: string;
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

const lowerMichiganMarkets = [
  "Grand Rapids",
  "Kalamazoo",
  "Lansing",
  "Ann Arbor",
  "Detroit",
  "Holland",
  "Muskegon",
  "Battle Creek",
  "Jackson",
];

const chicagolandMarkets = [
  "Chicago",
  "Naperville",
  "Schaumburg",
  "Oak Brook",
  "Elgin",
  "Aurora",
  "Joliet",
  "Evanston",
  "Arlington Heights",
];

export const localSeoPages = {
  aiConsultingGrandRapids: {
    slug: "ai-consulting-grand-rapids",
    serviceName: "AI Consulting in Grand Rapids",
    serviceType: "AI consulting",
    title: "AI Consulting Grand Rapids | Senna Automation",
    description:
      "AI consulting in Grand Rapids for manufacturers, service businesses, distributors, and office teams. Senna Automation helps West Michigan companies scope, design, and launch practical AI workflows starting at $500.",
    eyebrow: "Grand Rapids AI Consulting",
    h1: "AI consulting for Grand Rapids businesses that need practical results",
    lead:
      "Senna Automation helps Grand Rapids and West Michigan companies turn AI ideas into usable workflows, internal tools, and connected systems that reduce manual work, improve response time, and create clearer day-to-day operations.",
    introTitle: "AI consulting that leads to a working operational rollout",
    introBody:
      "Businesses searching for AI consulting in Grand Rapids are usually not looking for a generic innovation presentation. They need help deciding where AI fits, which workflow should come first, how existing tools should connect, and what can be launched without creating more complexity. Senna Automation focuses on workflow-first AI consulting that maps the operational bottleneck, identifies the right AI and automation tasks, and turns the recommendation into a practical first system your team can actually use.",
    assessmentTitle: "Free assessment and a focused first AI consulting scope",
    assessmentBody:
      "The first conversation is built around one business process that is already creating delay, re-entry, or missed follow-up. We look at the inputs, decision points, people involved, and systems already in place, then recommend the smallest useful AI project that can prove value quickly. Focused engagements start at $500, and larger consulting and build work is scoped around workflow complexity, integrations, and business rules.",
    primaryKeyword: "ai consulting grand rapids",
    secondaryKeywords: [
      "AI consultant Grand Rapids",
      "artificial intelligence consulting Grand Rapids",
      "AI consulting services Grand Rapids",
      "AI consultant West Michigan",
      "custom AI solutions Grand Rapids",
      "AI workflow consulting Michigan",
      "Grand Rapids AI strategy consulting",
    ],
    supportingPostSlugs: [
      "how-grand-rapids-businesses-choose-their-first-ai-automation-workflow",
      "where-west-michigan-teams-start-with-ai-automation-in-the-back-office",
      "how-west-michigan-manufacturers-start-with-ai-automation-without-a-full-system-replacement",
    ],
    useCases: [
      {
        title: "AI opportunity assessment and roadmap",
        description:
          "Identify which workflow is worth automating first, where AI is actually useful, what data is needed, and how to avoid spending on a broad rollout before the business case is clear.",
      },
      {
        title: "AI workflow design for operations",
        description:
          "Design practical workflows for intake, routing, approvals, document handling, follow-up, and reporting so repeated work moves faster across the systems your team already uses.",
      },
      {
        title: "Internal AI assistants and knowledge support",
        description:
          "Give office, service, sales, or operations teams a controlled way to find answers, summarize information, draft responses, and work from approved business context.",
      },
      {
        title: "Document extraction and process automation",
        description:
          "Use AI where messy inputs like emails, PDFs, forms, and attachments need to become structured records that can move into CRM, ERP, or internal workflows.",
      },
      {
        title: "Custom AI systems with implementation support",
        description:
          "Move beyond consulting alone by turning the recommended workflow into a working build with the right integrations, handoffs, notifications, and guardrails.",
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        description:
          "RFQ intake, quote prep support, purchasing coordination, maintenance workflows, production handoffs, quality follow-up, and internal reporting across office and plant teams.",
      },
      {
        name: "Trades and field service",
        description:
          "Lead response, service request triage, scheduling prep, estimate follow-up, technician coordination, and customer communication workflows.",
      },
      {
        name: "Distribution",
        description:
          "Order intake, PO processing, stock questions, customer request routing, sales support, and back-office coordination between teams.",
      },
      {
        name: "Professional and admin-heavy service teams",
        description:
          "Client intake, document review, approval routing, meeting follow-up, recurring admin work, and internal knowledge support.",
      },
    ],
    process: [
      {
        title: "Assess the workflow and business constraint",
        description:
          "We start with the process that is already creating admin drag, delays, repeated checks, or missed handoffs so the consulting effort stays tied to a measurable operational problem.",
      },
      {
        title: "Define the right AI tasks and system design",
        description:
          "We determine what should be captured, extracted, classified, summarized, routed, approved, or escalated and which existing tools should stay in place.",
      },
      {
        title: "Launch a focused first system",
        description:
          "Instead of stopping at strategy, we can help implement the first workflow, connect the integrations, test exceptions, and prepare the next phase once the initial release is producing value.",
      },
    ],
    faqs: [
      {
        question: "What does an AI consultant do for a Grand Rapids business?",
        answer:
          "An AI consultant helps a business decide where AI can improve operations, which workflow should come first, what data and tools are involved, and how to turn the idea into a practical system instead of an abstract plan.",
      },
      {
        question: "What kinds of AI consulting projects are common in Grand Rapids?",
        answer:
          "Common projects include lead intake and follow-up, document extraction, quote or order support, approval routing, scheduling coordination, internal assistants, and recurring reporting where teams are losing time to manual handoffs.",
      },
      {
        question: "Do we need to replace our CRM, ERP, or other software first?",
        answer:
          "Usually no. Most AI consulting engagements start by improving one workflow around the systems you already use so you can reduce friction without forcing a full software replacement.",
      },
      {
        question: "Do you only provide strategy, or do you also build the solution?",
        answer:
          "Senna Automation can do both. We help scope the right AI opportunity first, then support implementation so the recommendation becomes a working workflow, assistant, or custom system.",
      },
      {
        question: "How much does AI consulting cost?",
        answer:
          "Focused AI consulting and small workflow engagements start at $500. Larger scopes depend on the number of workflows, integrations, AI tasks, business rules, and implementation support required.",
      },
      {
        question: "Do you serve businesses outside Grand Rapids?",
        answer:
          "Yes. Senna Automation works with businesses across West Michigan, including Grand Rapids, Kentwood, Wyoming, Grandville, Walker, Holland, Rockford, Ada, and Byron Center.",
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
      "AI automation in Grand Rapids for manufacturers, service companies, distributors, and office teams. Senna Automation designs practical AI workflows, AI assistants, and business process automations for West Michigan companies starting at $500.",
    eyebrow: "Grand Rapids AI Automation",
    h1: "AI automation for Grand Rapids businesses that need real operational gains",
    lead:
      "Senna Automation helps Grand Rapids and West Michigan businesses build AI automation systems that reduce admin drag, speed up response time, improve routing, and connect the tools their teams already use every day.",
    introTitle: "Practical AI automation for Grand Rapids operations, service teams, and back offices",
    introBody:
      "Companies searching for AI automation in Grand Rapids usually want more than a chatbot demo or a generic AI strategy deck. They need a practical way to automate repetitive work across email, forms, spreadsheets, PDFs, CRM records, ERP data, scheduling tools, and internal approvals. Senna Automation builds workflow-first AI automation for Grand Rapids businesses so repeated work gets captured, interpreted, routed, and completed with fewer handoffs and less manual follow-up. The goal is not to replace everything at once. It is to launch one useful automation that improves daily operations and creates a stronger base for future AI adoption.",
    assessmentTitle: "Free assessment and a focused first AI automation rollout",
    assessmentBody:
      "We start with one business process that is already slowing the team down. That might be intake, quoting support, scheduling coordination, document handling, order processing, approval routing, or internal reporting. We map the trigger, the inputs, the rules, the exceptions, and the systems involved, then recommend the smallest useful AI automation project for your Grand Rapids business. Focused projects start at $500, and larger implementations are scoped around workflow complexity, integrations, exception handling, and operating requirements.",
    primaryKeyword: "ai automation grand rapids",
    secondaryKeywords: [
      "AI workflow automation Grand Rapids",
      "AI automation company Grand Rapids",
      "AI automation services Grand Rapids",
      "business automation Grand Rapids",
      "Grand Rapids AI agents",
      "custom AI solutions Grand Rapids",
      "West Michigan AI automation",
      "Grand Rapids business automation services",
      "AI process automation Grand Rapids",
    ],
    supportingPostSlugs: [
      "how-grand-rapids-businesses-choose-their-first-ai-automation-workflow",
      "where-west-michigan-teams-start-with-ai-automation-in-the-back-office",
      "how-west-michigan-manufacturers-start-with-ai-automation-without-a-full-system-replacement",
    ],
    useCases: [
      {
        title: "AI lead capture, qualification, and follow-up",
        description:
          "Capture inquiries from forms, email, phone notes, and referrals, summarize the request, assign ownership, and trigger immediate next-step follow-up so sales opportunities do not stall in a shared inbox.",
      },
      {
        title: "AI document extraction and operations intake",
        description:
          "Extract key details from PDFs, purchase orders, invoices, service requests, quote packages, and attachments so information becomes structured data that can move into CRM, ERP, or internal workflow tools.",
      },
      {
        title: "AI-powered approval routing and exception handling",
        description:
          "Route requests based on job type, urgency, customer, dollar amount, or missing data, then escalate exceptions automatically when work falls outside the rules or waits too long for review.",
      },
      {
        title: "Scheduling, dispatch, and service coordination automation",
        description:
          "Help service teams standardize intake, confirm readiness, alert dispatch, notify technicians, and keep customer communication moving without relying on scattered texts, spreadsheets, and manual calendar updates.",
      },
      {
        title: "Internal AI assistants for teams and managers",
        description:
          "Give staff faster access to approved business knowledge, summaries, status updates, and next-step guidance using company-specific context from the systems they already work in.",
      },
      {
        title: "Reporting summaries and workflow visibility",
        description:
          "Generate recurring summaries of pending work, blocked items, turnaround time, and operational bottlenecks so managers can see what needs attention without chasing updates across departments.",
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        description:
          "RFQ intake, quote preparation support, purchasing coordination, maintenance readiness, production handoffs, quality follow-up, and reporting workflows across office and plant teams.",
      },
      {
        name: "Trades and field service",
        description:
          "Lead response, missed-call follow-up, service request triage, estimate routing, scheduling prep, technician coordination, and customer reminder workflows.",
      },
      {
        name: "Distribution and logistics",
        description:
          "Order intake, PO processing, shipment communication, stock question routing, sales support, and back-office coordination between customer service, purchasing, and operations.",
      },
      {
        name: "Professional and admin-heavy service teams",
        description:
          "Client intake, document review, internal approvals, meeting follow-up, recurring reporting, and knowledge support for firms with high administrative workload.",
      },
    ],
    process: [
      {
        title: "Find the workflow where AI automation will matter first",
        description:
          "We start with the specific process already causing delays, duplicate entry, missed follow-up, or status confusion so the automation project stays tied to a real operating problem.",
      },
      {
        title: "Design the workflow logic, AI tasks, and system connections",
        description:
          "We define what should be captured, extracted, summarized, classified, routed, approved, or escalated and how the workflow should connect with the software your team already uses.",
      },
      {
        title: "Launch a dependable first automation and improve from real usage",
        description:
          "We implement the workflow, test exceptions, validate outputs, and refine the release around actual team behavior so the system becomes reliable before expanding to the next use case.",
      },
    ],
    faqs: [
      {
        question: "What does AI automation mean for a Grand Rapids business?",
        answer:
          "AI automation combines workflow rules, software integrations, and AI-assisted tasks so repeated work moves with less manual effort. For a Grand Rapids business, that can mean faster intake, document extraction, approval routing, follow-up, reporting, and internal knowledge support without replacing every current system.",
      },
      {
        question: "What are the best first AI automation projects for local companies?",
        answer:
          "The best first projects are usually the workflows that create visible friction every day, such as lead response, service request intake, quote support, document processing, order entry, approvals, scheduling coordination, or recurring status reporting. A focused workflow usually produces results faster than a broad transformation plan.",
      },
      {
        question: "Can Senna Automation build AI agents or assistants for Grand Rapids teams?",
        answer:
          "Yes. We can build practical AI assistants and agent-style workflows for internal teams when the use case is clear, the business context is defined, and the system needs to help staff answer questions, summarize records, route work, or guide the next step in an operational process.",
      },
      {
        question: "Do we need to replace our CRM, ERP, or scheduling software first?",
        answer:
          "Usually no. Most AI automation projects work best as a layer around the software you already use so information can move more cleanly between inboxes, forms, spreadsheets, CRM records, ERP workflows, calendars, and internal dashboards.",
      },
      {
        question: "How much does AI automation cost?",
        answer:
          "Focused AI automation projects start at $500. Total cost depends on the workflow scope, the number of integrations, the amount of exception handling required, and whether the system includes document extraction, assistant features, reporting, or custom logic.",
      },
      {
        question: "What types of businesses do you help with AI automation in Grand Rapids?",
        answer:
          "Senna Automation works with manufacturers, field service companies, trades, distributors, and office-heavy teams that need better workflow speed, cleaner handoffs, and less repetitive manual work across daily operations.",
      },
      {
        question: "Do you serve businesses outside Grand Rapids?",
        answer:
          "Yes. Senna Automation supports businesses in Grand Rapids and across nearby West Michigan communities including Kentwood, Wyoming, Grandville, Walker, Holland, Rockford, Ada, and Byron Center.",
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
  customAiSolutionsGrandRapids: {
    slug: "custom-ai-solutions-grand-rapids",
    serviceName: "Custom AI Solutions in Grand Rapids",
    serviceType: "Custom AI solutions",
    title: "Custom AI Solutions Grand Rapids | Senna Automation",
    description:
      "Custom AI solutions in Grand Rapids for manufacturers, service businesses, distributors, and office teams. Senna Automation builds practical AI workflows, assistants, and integrations starting at $500.",
    eyebrow: "Grand Rapids Custom AI Solutions",
    h1: "Custom AI solutions for Grand Rapids businesses",
    lead:
      "Senna Automation helps Grand Rapids and West Michigan businesses design and build custom AI solutions that fit real workflows, reduce manual work, and improve speed across intake, operations, follow-up, and reporting.",
    introTitle: "Custom AI solutions built around the way your business already works",
    introBody:
      "Businesses searching for custom AI solutions in Grand Rapids usually do not need a generic chatbot or a broad transformation pitch. They need a system built around a specific bottleneck, such as lead response, document handling, quoting support, service coordination, approvals, or internal knowledge access. Senna Automation designs custom AI solutions that connect with the tools your team already uses so the first release creates operational value instead of another disconnected experiment.",
    assessmentTitle: "Free assessment and a focused first build",
    assessmentBody:
      "We start with one workflow that is costing time, slowing response, or creating repeated admin work today. That first assessment turns the problem into a practical build recommendation with clear scope, likely integrations, and a realistic starting point. Small projects start at $500, and larger custom AI systems are scoped around the complexity of the workflow, business rules, and connected tools.",
    primaryKeyword: "custom ai solutions grand rapids",
    secondaryKeywords: [
      "custom AI services Grand Rapids",
      "custom AI development Grand Rapids",
      "AI solutions company Grand Rapids",
      "AI workflow solutions West Michigan",
      "custom business AI Grand Rapids",
      "Grand Rapids AI integration services",
      "West Michigan custom AI automation",
    ],
    supportingPostSlugs: [
      "how-grand-rapids-businesses-choose-their-first-ai-automation-workflow",
      "where-west-michigan-teams-start-with-ai-automation-in-the-back-office",
      "lead-qualification",
    ],
    useCases: [
      {
        title: "Custom AI intake and routing systems",
        description:
          "Capture requests from forms, email, calls, and uploaded files, extract the right details, and route work automatically based on customer, urgency, job type, or internal rules.",
      },
      {
        title: "Document processing and data extraction",
        description:
          "Turn PDFs, invoices, purchase orders, service records, quotes, and attachments into structured data that can move into your CRM, ERP, or internal workflows without repetitive re-entry.",
      },
      {
        title: "Internal AI assistants for teams",
        description:
          "Give staff faster access to approved business knowledge, summaries, next-step guidance, and recurring answers without making them dig through shared drives, inboxes, or scattered documents.",
      },
      {
        title: "Custom workflow automation with AI steps",
        description:
          "Combine AI tasks with approvals, notifications, exception handling, and system handoffs so the process works reliably from intake through completion.",
      },
      {
        title: "Sales and operations support tools",
        description:
          "Build AI systems that help qualify leads, summarize conversations, prepare quotes, flag stalled work, and improve visibility for managers without replacing core software.",
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        description:
          "RFQ intake, quote prep, maintenance coordination, document handling, purchasing support, production communication, and internal status reporting.",
      },
      {
        name: "Trades and field service",
        description:
          "Service request triage, estimate follow-up, scheduling prep, technician coordination, customer communication, and recurring admin handoffs.",
      },
      {
        name: "Distribution",
        description:
          "Order intake, PO processing, customer request routing, stock communication, account support, and back-office workflow coordination.",
      },
      {
        name: "Professional and admin-heavy service businesses",
        description:
          "Client intake, document review, approval routing, recurring follow-up, internal knowledge support, and operational reporting.",
      },
    ],
    process: [
      {
        title: "Identify the workflow worth customizing",
        description:
          "We map where the work starts, what information is needed, which people and systems are involved, and where delays, re-entry, or missed handoffs are hurting the business today.",
      },
      {
        title: "Design the AI tasks, rules, and integrations",
        description:
          "We define what the system should capture, extract, classify, summarize, route, approve, or escalate so the solution matches your actual operating process instead of forcing a generic template.",
      },
      {
        title: "Launch a dependable first version",
        description:
          "We build the workflow, connect the right tools, test edge cases, and make sure the first release is usable and measurable before expanding the system further.",
      },
    ],
    faqs: [
      {
        question: "What counts as a custom AI solution for a Grand Rapids business?",
        answer:
          "A custom AI solution is a system designed around your specific workflow, data, and operating rules. That can include AI-assisted intake, document extraction, internal assistants, approval routing, follow-up automation, reporting support, or connected workflows across the tools you already use.",
      },
      {
        question: "How is a custom AI solution different from a standard automation?",
        answer:
          "Standard automation works well when the process is fully rules-based. A custom AI solution is useful when the workflow also needs interpretation, summarization, classification, extraction from messy inputs, or guided decision support alongside normal automation logic.",
      },
      {
        question: "What types of businesses hire Senna Automation for custom AI solutions?",
        answer:
          "We work with manufacturers, distributors, trades, service businesses, and office-heavy teams across Grand Rapids and West Michigan that need practical systems to reduce admin drag and improve workflow speed.",
      },
      {
        question: "Do we need to replace our current CRM, ERP, or scheduling platform?",
        answer:
          "Usually no. Most custom AI solutions work best as a layer around your existing systems so information can move more cleanly between inboxes, forms, spreadsheets, CRMs, ERPs, scheduling tools, and internal dashboards.",
      },
      {
        question: "How much do custom AI solutions cost?",
        answer:
          "Small focused projects start at $500. Total cost depends on the workflow scope, the number of integrations, the level of custom logic required, and whether the system includes assistants, extraction, reporting, or more advanced workflow orchestration.",
      },
      {
        question: "Do you serve businesses outside Grand Rapids?",
        answer:
          "Yes. Senna Automation is based in Grand Rapids and supports businesses across West Michigan, including Kentwood, Wyoming, Grandville, Walker, Holland, Rockford, Ada, and Byron Center.",
      },
    ],
    nearbyCities,
  },
  workflowAutomationLowerMichigan: {
    slug: "workflow-automation-lower-michigan",
    serviceName: "Workflow Automation for Lower Michigan Businesses",
    serviceType: "Business workflow automation",
    title: "Workflow Automation Lower Michigan | Senna Automation",
    description:
      "Workflow automation for Lower Michigan manufacturers, field service companies, distributors, and operations teams. Map one costly handoff and build the practical next step.",
    eyebrow: "Lower Michigan Workflow Automation",
    h1: "Workflow automation for Lower Michigan businesses with costly handoffs",
    lead:
      "Senna Automation helps Lower Michigan operators reduce re-entry, stalled approvals, missed follow-up, and exception chaos by improving one measurable workflow at a time around the systems they already use.",
    introTitle: "Start with the handoff that creates the clearest operating cost",
    introBody:
      "A manufacturer in Grand Rapids, a service team in Lansing, and a distributor near Detroit may use different software, but the expensive pattern is often the same: information arrives in one place, someone interprets it manually, and the next owner learns about an exception too late. We map the trigger, required inputs, rules, system actions, exceptions, owner, and source of truth before recommending a build. That keeps the first project tied to throughput, labor, rework, or response time instead of a broad technology promise.",
    assessmentTitle: "A 30-minute review built around one real workflow",
    assessmentBody:
      "Bring one recurring handoff such as RFQ intake, service scheduling, purchase-order processing, quality follow-up, or approval routing. We will map how it works today, identify the constraints and exception paths, estimate the operational impact using disclosed assumptions, and recommend the smallest practical next step.",
    primaryKeyword: "workflow automation lower michigan",
    secondaryKeywords: [
      "business process automation Michigan",
      "workflow automation consultant Michigan",
      "manufacturing automation Lower Michigan",
      "service business automation Michigan",
      "operations automation Michigan",
      "AI workflow automation Michigan",
      "process automation consultant Lower Michigan",
    ],
    supportingPostSlugs: [
      "automating-inventory-sync-between-purchasing-production-and-the-stock-room",
      "automating-shop-floor-quality-handoffs-before-scrap-and-rework-spread",
      "automating-service-call-scheduling-before-the-day-falls-apart",
    ],
    useCases: [
      {
        title: "RFQ and quote handoffs",
        description:
          "Capture requests from email, forms, PDFs, and portals; check for missing requirements; route the right work to estimating; and keep follow-up visible without pretending every quote follows the happy path.",
      },
      {
        title: "Scheduling and dispatch exceptions",
        description:
          "Connect intake, calendars, technician or crew constraints, customer updates, and escalation rules so reschedules and incomplete requests reach an owner before the day unravels.",
      },
      {
        title: "Purchasing and inventory coordination",
        description:
          "Reconcile demand, available stock, open purchase orders, and job priorities, then route shortages or ambiguous matches to the buyer or planner who can resolve them.",
      },
      {
        title: "Quality, maintenance, and approval routing",
        description:
          "Create dependable handoffs for holds, corrective action, maintenance readiness, document review, and approvals while preserving the judgment and sign-off the process requires.",
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        description:
          "RFQs, quoting, purchasing, production handoffs, inventory, quality, maintenance, and reporting workflows across office and plant teams.",
      },
      {
        name: "Trades and field service",
        description:
          "Lead intake, service triage, estimating, scheduling, dispatch exceptions, technician coordination, and customer communication.",
      },
      {
        name: "Distribution and logistics",
        description:
          "Order intake, stock questions, purchase-order processing, exception routing, account follow-up, and status visibility across teams.",
      },
      {
        name: "Professional and admin-heavy services",
        description:
          "Client intake, document collection, approvals, recurring follow-up, work assignment, and operational reporting where manual coordination limits capacity.",
      },
    ],
    process: [
      {
        title: "Map the current operating reality",
        description:
          "We identify the trigger, inputs, decisions, systems, owners, exception paths, and actual source of truth, including the workarounds the written procedure usually misses.",
      },
      {
        title: "Model the value and constraints",
        description:
          "We estimate time, volume, loaded labor, rework, implementation cost, and maintenance under low, base, and high assumptions so the business case is inspectable.",
      },
      {
        title: "Build the smallest dependable release",
        description:
          "We connect the existing tools, automate the repeatable steps, route exceptions to a named owner, and measure the result before expanding the scope.",
      },
    ],
    faqs: [
      {
        question: "What kinds of Lower Michigan businesses are a good fit for workflow automation?",
        answer:
          "The strongest fit is a growing manufacturer, service company, distributor, or office-heavy team with repeated handoffs, enough transaction volume to matter, and a clear owner for exceptions. The software stack can be modern or highly mixed; the workflow economics matter more.",
      },
      {
        question: "Do we need to replace our ERP, CRM, field-service platform, or spreadsheets?",
        answer:
          "Usually no. A first project often works as a control layer around the tools already in use, with a clear source of truth and explicit rules for what the automation may change.",
      },
      {
        question: "How do you estimate ROI before a workflow is built?",
        answer:
          "We disclose the assumptions: monthly volume, minutes saved, loaded labor rate, current error or rework cost, expected reduction, implementation cost, and maintenance. A low, base, and high view makes uncertainty visible instead of hiding it in one confident number.",
      },
      {
        question: "Can automation handle exceptions without removing staff judgment?",
        answer:
          "Yes. A dependable design automates the routine path and sends incomplete, risky, or out-of-policy work to the right owner with the context needed to decide. Human judgment remains part of the operating model.",
      },
      {
        question: "Can Senna work with teams outside Grand Rapids?",
        answer:
          "Yes. Senna is based in Grand Rapids and works with businesses across Lower Michigan through remote discovery, shared workflow mapping, and implementation support, with on-site work scoped when it materially helps the project.",
      },
      {
        question: "What happens in a Workflow Bottleneck Review?",
        answer:
          "In 30 minutes, we map one costly handoff, estimate its likely impact, identify constraints and exception paths, and decide on the next practical step. It is a focused working session, not a generic AI presentation.",
      },
    ],
    nearbyCities: lowerMichiganMarkets,
    areaServed: [
      { type: "AdministrativeArea", name: "Lower Michigan" },
      ...lowerMichiganMarkets.map((name) => ({ type: "City" as const, name })),
    ],
    heroProofPoints: [
      "Grand Rapids based",
      "Lower Michigan coverage",
      "Workflow and ROI first",
    ],
    trustTitle: "Michigan-based delivery with an operational point of view",
    trustBody:
      "Senna Automation is based in Grand Rapids and works with Lower Michigan teams that want the person scoping the workflow to stay close to implementation, edge cases, and measurable business value.",
    trustProofPoints: [
      "Michigan-based automation partner",
      "30-minute Workflow Bottleneck Review",
      "Exceptions and ownership designed up front",
    ],
    relatedExamplesIntro:
      "These workflow guides show how the approach applies to recognizable manufacturing and service constraints without presenting illustrative examples as client results.",
    industriesTitle: "Built for Lower Michigan operating teams",
    industriesBody:
      "The strongest opportunities usually sit where customer requests, documents, schedules, inventory, approvals, and system records cross team boundaries.",
    coverageTitle: "Serving businesses across Lower Michigan",
    coverageBody:
      "Projects can begin remotely across the region, with on-site discovery scoped when seeing the handoff in context will improve the design.",
    clusterDescription:
      "Explore related consulting, AI, and process-automation services, including focused Grand Rapids pages for businesses comparing local implementation options.",
    finalCtaTitle: "Which handoff is costing your Lower Michigan team the most?",
    finalCtaSubtitle:
      "Bring one real workflow. In 30 minutes, we will map its rules and exceptions, estimate the impact, and identify the next practical step.",
  },
  workflowAutomationChicagoland: {
    slug: "workflow-automation-chicagoland",
    serviceName: "Workflow Automation for Chicagoland Businesses",
    serviceType: "Business workflow automation",
    title: "Workflow Automation Chicagoland | Senna Automation",
    description:
      "Workflow automation for Chicagoland service companies, manufacturers, distributors, and operations teams. Improve intake, scheduling, quoting, approvals, and exceptions.",
    eyebrow: "Chicagoland Workflow Automation",
    h1: "Workflow automation for Chicagoland teams outgrowing manual coordination",
    lead:
      "Senna Automation helps Chicagoland businesses turn high-volume intake, scheduling, quoting, approvals, and follow-up into dependable workflows with clear rules, owned exceptions, and measurable economics.",
    introTitle: "Reduce coordination load without forcing another system replacement",
    introBody:
      "Dense service territories, multi-location operations, busy customer channels, and mixed software stacks create a particular kind of friction: the business has the data, but people still spend the day moving it between inboxes, portals, calendars, spreadsheets, CRMs, and operating systems. We design an automation layer around the workflow itself, including capacity constraints, service-area rules, incomplete requests, approval limits, and the moments where a person must decide.",
    assessmentTitle: "Pressure-test one workflow before expanding the scope",
    assessmentBody:
      "A Workflow Bottleneck Review focuses on one process with visible cost or customer impact. We map how work enters, what information is required, which rules can be automated, where exceptions occur, who owns them, and what a realistic first release should measure.",
    primaryKeyword: "workflow automation chicagoland",
    secondaryKeywords: [
      "business process automation Chicago",
      "workflow automation consultant Chicago",
      "service business automation Chicagoland",
      "manufacturing workflow automation Chicago",
      "operations automation Chicago suburbs",
      "AI automation consultant Chicagoland",
      "process automation company Chicago",
    ],
    supportingPostSlugs: [
      "automating-service-call-scheduling-before-the-day-falls-apart",
      "quote-automation",
      "practical-ai-governance-for-automation",
    ],
    useCases: [
      {
        title: "High-volume service intake",
        description:
          "Normalize requests from phone, web, email, and referral channels; identify missing details; apply service-area and urgency rules; and route the next action before demand turns into an inbox backlog.",
      },
      {
        title: "Scheduling and capacity exceptions",
        description:
          "Coordinate availability, travel zones, skills, parts, customer preferences, and reschedules while escalating the cases that cannot be safely assigned by a rule.",
      },
      {
        title: "Quote and approval coordination",
        description:
          "Assemble inputs, flag gaps, route review by value or risk, keep customer follow-up moving, and preserve the estimator or manager's authority over the final commitment.",
      },
      {
        title: "Multi-location operating visibility",
        description:
          "Create consistent status, exception, and ownership signals across branches or departments without asking every team to abandon the systems that already run its work.",
      },
    ],
    industries: [
      {
        name: "Home and commercial services",
        description:
          "Lead response, request triage, estimates, scheduling, dispatch, reschedules, technician follow-up, and customer updates across a large service territory.",
      },
      {
        name: "Manufacturing and fabrication",
        description:
          "RFQ intake, estimating support, purchasing, production handoffs, quality exceptions, maintenance readiness, and customer status workflows.",
      },
      {
        name: "Distribution and multi-location operations",
        description:
          "Order and PO processing, stock questions, transfers, approvals, exception routing, account coordination, and consistent operating visibility between locations.",
      },
      {
        name: "Professional services",
        description:
          "Client intake, document collection, work assignment, review and approval, deadline follow-up, and reporting where staff capacity is constrained by coordination.",
      },
    ],
    process: [
      {
        title: "Choose a workflow with real operating pressure",
        description:
          "We start where volume, delay, rework, or missed follow-up is already visible and identify the source systems and people that control the outcome.",
      },
      {
        title: "Design the rules and exception model",
        description:
          "We separate repeatable decisions from judgment calls, define the evidence each step needs, and give every exception a named owner and response path.",
      },
      {
        title: "Launch, measure, and expand deliberately",
        description:
          "The first release is narrow enough to test safely and useful enough to measure. Expansion follows observed throughput, labor, rework, and customer-response outcomes.",
      },
    ],
    faqs: [
      {
        question: "Can a Michigan-based automation firm support a Chicagoland business?",
        answer:
          "Yes. Workflow discovery, system review, implementation, and testing can be handled collaboratively with your operating team, and on-site work can be scoped when a physical process or multi-location rollout makes it valuable. Senna is transparent that its home base is Grand Rapids.",
      },
      {
        question: "Which Chicagoland workflows are usually worth reviewing first?",
        answer:
          "Strong first candidates include high-volume service intake, scheduling exceptions, quote preparation, approval routing, document collection, order processing, and follow-up where delays or re-entry affect revenue and capacity.",
      },
      {
        question: "Will automation work with our existing scheduling, CRM, ERP, or line-of-business software?",
        answer:
          "Often yes. We first identify the authoritative record for each decision and the integration options available. The automation can then coordinate the handoff while leaving core systems in place.",
      },
      {
        question: "How do you prevent edge cases from creating bad automated decisions?",
        answer:
          "We define validation rules, confidence or policy boundaries, exception queues, ownership, and audit context before launch. The system stops and asks for the right human decision when the evidence is incomplete or the request falls outside the rules.",
      },
      {
        question: "How is the business case calculated?",
        answer:
          "We use disclosed low, base, and high assumptions for monthly volume, time saved, loaded labor, error or rework reduction, implementation cost, and maintenance. The goal is a decision model you can challenge, not a guaranteed savings claim.",
      },
      {
        question: "What happens after the 30-minute review?",
        answer:
          "You receive a practical recommendation for the next step: clarify the process first, run a focused technical discovery, build a narrow workflow, or leave the process alone because the economics or constraints do not support automation yet.",
      },
    ],
    nearbyCities: chicagolandMarkets,
    areaServed: [
      { type: "AdministrativeArea", name: "Chicago metropolitan area" },
      ...chicagolandMarkets.map((name) => ({ type: "City" as const, name })),
    ],
    heroProofPoints: [
      "Chicagoland service coverage",
      "Remote-first discovery",
      "Rules and exceptions mapped up front",
    ],
    trustTitle: "A regional partner that stays close to the workflow",
    trustBody:
      "Senna Automation is based in Grand Rapids and serves Chicagoland teams through collaborative discovery and implementation. The same person who helps frame the operating problem stays involved in the rules, exceptions, and rollout decisions.",
    trustProofPoints: [
      "Midwest-based delivery",
      "30-minute Workflow Bottleneck Review",
      "No performance guarantees or invented case studies",
    ],
    relatedExamplesIntro:
      "These guides unpack scheduling, quoting, and governance problems with concrete workflow mechanics and clearly labeled illustrative economics.",
    industriesTitle: "Built for Chicagoland operating complexity",
    industriesBody:
      "The best fit is a team where volume, territory, locations, approvals, or customer expectations have made manual coordination too expensive to ignore.",
    coverageTitle: "Serving Chicago and the surrounding business corridor",
    coverageBody:
      "Discovery and implementation are remote-first across Chicagoland, with on-site work considered when it materially improves process understanding or rollout quality.",
    clusterDescription:
      "Explore Senna's related workflow, AI, and process-automation capabilities. Regional content remains separate from industry workflow guides so useful articles do not become city-keyword pages.",
    finalCtaTitle: "Bring us one Chicagoland workflow that is straining capacity",
    finalCtaSubtitle:
      "In 30 minutes, we will map the handoff, surface its exception paths, estimate the impact, and decide whether automation is a practical next step.",
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
