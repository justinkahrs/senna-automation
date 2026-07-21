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
    title: "Business Process Automation West Michigan | Grand Rapids | Senna Automation",
    description:
      "Business process automation for Grand Rapids and West Michigan manufacturers, service companies, distributors, and office teams. Senna Automation builds practical workflow systems for intake, approvals, routing, reporting, and system handoffs starting at $500.",
    eyebrow: "West Michigan Business Process Automation",
    h1: "Business process automation for Grand Rapids and West Michigan businesses",
    lead:
      "Senna Automation helps Grand Rapids and West Michigan businesses reduce manual admin, improve internal handoffs, and build practical process automation around the tools their teams already use every day.",
    introTitle: "Business process automation that fits real West Michigan operations",
    introBody:
      "Companies searching for business process automation in West Michigan are usually trying to fix repeated operational drag, not buy another oversized system. The problem is often the same across manufacturers, distributors, field service businesses, and office teams: work starts in email, forms, spreadsheets, PDFs, CRM records, ERP screens, and shared documents, then slows down when people have to re-enter information, chase approvals, and manually move status updates between departments. Senna Automation designs business process automation for Grand Rapids and West Michigan companies so those workflows move more reliably with clearer rules, better routing, and fewer preventable delays.",
    assessmentTitle: "Free assessment and a focused first automation scope",
    assessmentBody:
      "The first step is a free assessment built around one workflow that is already costing time or creating avoidable mistakes. That could be quote intake, purchasing approvals, scheduling coordination, service dispatch prep, order processing, customer follow-up, or recurring internal reporting. We map the trigger, the required information, the handoffs, the exceptions, and the systems involved, then recommend the smallest useful automation that can improve operations quickly. Focused projects start at $500, and larger implementations are scoped around workflow complexity, integrations, exception handling, and business rules.",
    primaryKeyword: "business process automation west michigan",
    secondaryKeywords: [
      "business process automation Grand Rapids",
      "West Michigan business process automation",
      "process automation West Michigan",
      "business automation Grand Rapids",
      "workflow automation West Michigan",
      "operations automation Grand Rapids",
      "business process consultant West Michigan",
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
          "Capture requests from email, forms, PDFs, shared inboxes, and phone notes, then turn them into structured records so teams stop re-entering the same information across systems.",
      },
      {
        title: "Approval routing and exception handling",
        description:
          "Move purchasing, scheduling, service, and operations requests through clear approval paths, escalate missing information, and alert the right owner when work stalls.",
      },
      {
        title: "Internal handoff automation between teams",
        description:
          "Connect sales, operations, purchasing, service, and admin workflows so the next person receives the right context without relying on hallway follow-up or spreadsheet chasing.",
      },
      {
        title: "Status tracking and recurring reporting",
        description:
          "Give managers visibility into pending work, blocked items, turnaround time, and bottlenecks without forcing manual updates at the end of the day or week.",
      },
      {
        title: "Document-driven workflow automation",
        description:
          "Use structured workflows around quotes, purchase orders, service requests, and customer documents so important details move into CRM, ERP, or internal task systems faster.",
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        description:
          "Quote intake, purchasing approvals, inventory coordination, quality follow-up, production handoffs, maintenance prep, and reporting workflows across office and plant teams.",
      },
      {
        name: "Distribution and logistics",
        description:
          "Order processing, stock checks, vendor communication, customer request routing, shipment updates, and exception handling across back-office operations.",
      },
      {
        name: "Trades and field service",
        description:
          "Service request intake, scheduling prep, estimate approvals, technician coordination, dispatch handoffs, and customer communication workflows.",
      },
      {
        name: "Professional and admin-heavy service teams",
        description:
          "Client onboarding, document collection, internal approvals, recurring follow-up, reporting, and back-office coordination where too much work still lives in inboxes and spreadsheets.",
      },
    ],
    process: [
      {
        title: "Map the workflow that is creating drag today",
        description:
          "We identify where the process starts, what information is needed, who touches it, which rules apply, and where delays, re-entry, or missed handoffs are affecting day-to-day operations.",
      },
      {
        title: "Design the first useful automation boundary",
        description:
          "We define a practical first release with the right triggers, approvals, notifications, exception paths, and integrations so the workflow improves a real operating problem without becoming too broad.",
      },
      {
        title: "Launch, test, and improve from real usage",
        description:
          "We implement the workflow, validate edge cases, train the team, and refine the automation once actual users expose the exceptions and reporting needs that matter most.",
      },
    ],
    faqs: [
      {
        question: "What is business process automation for a West Michigan business?",
        answer:
          "Business process automation uses software, integrations, and workflow logic to move repeated work through the business with less manual entry, fewer missed handoffs, and better visibility into what happens next. For West Michigan businesses, that often means improving intake, approvals, routing, reporting, and coordination across the systems already in place.",
      },
      {
        question: "What kinds of processes are usually automated first?",
        answer:
          "Strong first projects usually include intake, approvals, quote handoffs, scheduling prep, service coordination, document processing, purchasing workflows, customer follow-up, and internal status reporting. The best first choice is usually the workflow that creates friction every day and has clear ownership.",
      },
      {
        question: "Do we need to replace our current software to automate business processes?",
        answer:
          "Usually no. Many business process automation projects work best as a layer around the tools you already use, such as spreadsheets, email, CRM, ERP, calendars, forms, and shared documents. The goal is often to improve the handoffs between those systems before considering a larger replacement.",
      },
      {
        question: "How much does business process automation cost?",
        answer:
          "Focused automation work starts at $500. Total cost depends on the workflow scope, the number of systems involved, the complexity of the business rules, and how much custom logic, reporting, or exception handling the process requires.",
      },
      {
        question: "What types of West Michigan businesses do you help?",
        answer:
          "Senna Automation works with manufacturers, distributors, trades, field service teams, and office-heavy businesses across Grand Rapids and West Michigan that need cleaner workflows, faster response times, and less repetitive manual admin.",
      },
      {
        question: "Do you only work with Grand Rapids companies?",
        answer:
          "No. Senna Automation supports businesses in Grand Rapids and across West Michigan, including Kentwood, Wyoming, Grandville, Walker, Holland, Rockford, Ada, and Byron Center.",
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
} satisfies Record<string, LocalSeoPageConfig>;

export const localSeoPageList = Object.values(localSeoPages);

export function getLocalSeoPageBySlug(slug: string) {
  return localSeoPageList.find((page) => page.slug === slug);
}

export const localSeoRoutes = localSeoPageList.map((page) => ({
  url: `${SITE_URL}/${page.slug}`,
  slug: page.slug,
}));
