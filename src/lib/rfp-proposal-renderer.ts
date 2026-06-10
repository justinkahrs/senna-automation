import {
  getRfpPricingProfile,
  resolveDefaultPricingProfileKey,
  type RfpPricingProfile,
  type RfpPricingProfileLineItem,
  type RfpSupportProfileTier,
} from "./rfp-pricing-profiles";

export type RfpSchemaVersion = "rfp-proposal-v1" | "rfp-proposal-v2";
export type RfpRenderMode = "preview" | "final";
export type RfpPreviewVariant = "balanced" | "dense" | "sparse";
export type RfpComplianceStatus =
  | "covered"
  | "partially_covered"
  | "missing"
  | "not_applicable";

export interface RfpRequestedResponseItem {
  requirement?: string;
  notes?: string;
  required?: boolean;
}

export interface RfpBrief {
  opportunityName?: string;
  issuerName?: string;
  issuerContext?: string;
  rawSummary?: string;
  businessGoals?: string[];
  deliverablesRequested?: string[];
  currentStateSignals?: string[];
  systemsMentioned?: string[];
  likelyStakeholders?: string[];
  methodologySignals?: string[];
  opportunityAreas?: string[];
  timelineSignals?: string[];
  pricingSignals?: string[];
  evaluationCriteria?: string[];
  constraints?: string[];
  requestedResponseItems?: Array<string | RfpRequestedResponseItem>;
  requiredAccessItems?: string[];
  technologyItemsRequested?: string[];
  technologyConstraints?: string[];
  teamRequirements?: string[];
  pricingRequired?: boolean;
  supportPricingRequired?: boolean;
  buyerTerminology?: string[];
  knownFacts?: string[];
  unansweredQuestions?: string[];
}

export interface RfpMethodologyPhase {
  name?: string;
  title?: string;
  description?: string;
}

export interface RfpOpportunityArea {
  name?: string;
  rationale?: string;
}

export interface RfpAssessmentArea {
  name?: string;
  currentState?: string;
  automationPotential?: string;
  note?: string;
}

export interface RfpComplianceItem {
  requirement?: string;
  responseSection?: string;
  status?: RfpComplianceStatus;
  evidence?: string;
}

export interface RfpPriorityArea {
  name?: string;
  rationale?: string;
  priority?: string;
}

export interface RfpExperienceExample {
  title?: string;
  summary?: string;
  artifactOrOutcome?: string;
}

export interface RfpTeamRole {
  title?: string;
  responsibility?: string;
  staffingModelNote?: string;
}

export interface RfpTechnologyLayer {
  layer?: string;
  purpose?: string;
  validationNeeded?: string;
}

export interface RfpScopePhase {
  name?: string;
  objective?: string;
  deliverables?: string[];
  timing?: string;
}

export interface RfpPricingLineItem {
  label?: string;
  value?: string;
  assumptions?: string[];
  included?: boolean;
  optional?: boolean;
}

export interface RfpSupportTier {
  name?: string;
  value?: string;
  includedServices?: string[];
  availability?: string;
}

export interface RfpInformationNeededItem {
  label?: string;
  type?: string;
  reason?: string;
}

export interface RfpReadinessIssue {
  type?: string;
  message?: string;
}

export interface RfpProposalReadiness {
  readyForFinal?: boolean;
  blockingIssues?: RfpReadinessIssue[];
  warnings?: RfpReadinessIssue[];
}

export interface RfpProposalReview {
  overallAssessment?: string;
  winLikelihood?: string;
  strengthsToPreserve?: string[];
  weaknessesToFix?: string[];
  mustEmphasize?: string[];
  mustAvoid?: string[];
  executiveSummaryDirective?: string;
  companyOverviewDirective?: string;
  methodologyDirective?: string;
  opportunityAreasDirective?: string;
  scopeDirective?: string;
  redraftDirectives?: string;
  readyForFinal?: boolean;
  blockingIssues?: RfpReadinessIssue[];
  warnings?: RfpReadinessIssue[];
}

export interface RfpCommercialInputs {
  pricingLineItems?: RfpPricingLineItem[];
  supportTiers?: RfpSupportTier[];
  hourlySupport?: RfpPricingLineItem;
}

export interface RfpProposal {
  coverTitle?: string;
  coverSubtitle?: string;
  coverEyebrow?: string;
  executiveSummaryHeading?: string;
  executiveSummaryParagraphs?: string[];
  companyOverviewHeading?: string;
  companyOverviewParagraphs?: string[];
  methodologyHeading?: string;
  methodologyIntro?: string;
  methodologyPhases?: RfpMethodologyPhase[];
  currentStateSummary?: string;
  futureStateSummary?: string;
  opportunityHeading?: string;
  opportunityIntro?: string;
  opportunityAreas?: RfpOpportunityArea[];
  scopeHeading?: string;
  scopeParagraph?: string;
  timelineBullets?: string[];
  pricingBullets?: string[];
  supportSummary?: string;
  supportBullets?: string[];
  assessmentAreas?: RfpAssessmentArea[];
  footerLine?: string;
  complianceItems?: RfpComplianceItem[];
  understandingPriorities?: RfpPriorityArea[];
  relevantExperienceExamples?: RfpExperienceExample[];
  teamRoles?: RfpTeamRole[];
  technologyLayers?: RfpTechnologyLayer[];
  scopePhases?: RfpScopePhase[];
  pricingLineItems?: RfpPricingLineItem[];
  supportTiers?: RfpSupportTier[];
  hourlySupport?: RfpPricingLineItem;
  informationNeeded?: RfpInformationNeededItem[];
  questionsToConfirm?: string[];
}

export interface RfpRenderInput {
  schemaVersion?: RfpSchemaVersion;
  renderMode?: RfpRenderMode;
  opportunityType?: string;
  pricingProfileKey?: string;
  commercialInputs?: RfpCommercialInputs;
  staffingNotes?: string[];
  technologyContextOverrides?: string[];
  opportunityTitle?: string;
  issuerName?: string;
  downloadBaseName?: string;
  hintAreas?: string[];
  notes?: string;
  responseTone?: string;
  rfpText?: string;
  fileName?: string;
  fileMime?: string;
  fileExtension?: string;
  proposalText?: string;
  hasExistingProposal?: boolean;
  review?: RfpProposalReview;
  proposal?: RfpProposal;
  rfpBrief?: RfpBrief;
  renderDate?: string;
}

export interface RfpProposalNormalized {
  schemaVersion: "rfp-proposal-v2";
  renderMode: RfpRenderMode;
  issuerName: string;
  opportunityTitle: string;
  downloadBaseName: string;
  coverTitle: string;
  coverSubtitle: string;
  coverEyebrow: string;
  footerLine: string;
  companyOverview: string[];
  executiveSummary: string[];
  approachSummary: string;
  supportSummary: string;
  scopeSummary: string;
  pricingSummary: string;
  commercialSourceLabel: string;
  pricingProfileKey: string | null;
  complianceItems: Array<Required<RfpComplianceItem>>;
  understandingPriorities: Array<Required<RfpPriorityArea>>;
  relevantExperienceExamples: Array<Required<RfpExperienceExample>>;
  teamRoles: Array<Required<RfpTeamRole>>;
  technologyLayers: Array<Required<RfpTechnologyLayer>>;
  scopePhases: Array<{
    name: string;
    objective: string;
    deliverables: string[];
    timing: string;
  }>;
  pricingLineItems: Array<Required<RfpPricingLineItem>>;
  supportTiers: Array<{
    name: string;
    value: string;
    includedServices: string[];
    availability: string;
  }>;
  hourlySupport: Required<RfpPricingLineItem> | null;
  informationNeeded: Array<Required<RfpInformationNeededItem>>;
  questionsToConfirm: string[];
  previewWarnings: string[];
  readiness: Required<RfpProposalReadiness>;
}

export interface RfpRenderResult {
  proposalHtml: string;
  proposalText: string;
  downloadFileName: string;
  status: "success";
  schemaVersion: "rfp-proposal-v2";
  renderMode: RfpRenderMode;
  normalized: RfpProposalNormalized;
  previewWarnings: string[];
  readiness: Required<RfpProposalReadiness>;
}

const LOGO_URL = "https://www.senna-automation.com/images/master-logo.png";
const FAVICON_URL = "https://www.senna-automation.com/images/favicon.svg";

const BANNED_PHRASE_RULES = [
  { type: "banned_phrase", regex: /\bpricing to be confirmed\b/i, replacement: "resolved pricing" },
  { type: "banned_phrase", regex: /\bTBD\b/i, replacement: "resolved value" },
  { type: "banned_phrase", regex: /\bpending\b/i, replacement: "confirmed status" },
  { type: "banned_phrase", regex: /\bavailable upon request\b/i, replacement: "resolved commercial detail" },
  {
    type: "banned_label",
    regex: /\bDiscovery-Led Proposal\b/i,
    replacement: "Workflow Automation Proposal",
  },
  { type: "banned_label", regex: /\bOpen Questions\b/i, replacement: "Information and Access Needed" },
];

const DEFAULT_PRIORITY_AREAS: Array<Required<RfpPriorityArea>> = [
  {
    name: "CRM Synchronization",
    rationale:
      "Reduces duplicate entry and keeps member, participant, and status data aligned across the operating workflow.",
    priority: "High",
  },
  {
    name: "Membership Entitlement Validation",
    rationale:
      "Confirms program eligibility before placement or communication steps move forward.",
    priority: "High",
  },
  {
    name: "Additional Seat Invoicing Triggers",
    rationale:
      "Creates a cleaner finance handoff when participation exceeds included seat entitlements.",
    priority: "Medium",
  },
  {
    name: "Lifecycle Communications",
    rationale:
      "Improves consistency across application, review, confirmation, and follow-up stages.",
    priority: "Medium",
  },
  {
    name: "Placement and Competitor Conflict Review",
    rationale:
      "Preserves staff judgment while surfacing conflict risks before placements are finalized.",
    priority: "Medium",
  },
];

const DEFAULT_EXPERIENCE_EXAMPLES: Array<Required<RfpExperienceExample>> = [
  {
    title: "Intake-to-System Workflow",
    summary:
      "Designed structured intake flows that moved submitted data into operating systems with fewer manual touchpoints.",
    artifactOrOutcome:
      "Included mapping logic, exception handling, and repeatable handoff steps for staff review.",
  },
  {
    title: "Lifecycle Communication Triggers",
    summary:
      "Built message-routing workflows for review, approval, follow-up, and escalation stages.",
    artifactOrOutcome:
      "Included template control, status-driven triggers, and clearer ownership of communication steps.",
  },
  {
    title: "Operational Visibility and Reporting",
    summary:
      "Created reporting and dashboard layers for teams managing queued work, exceptions, and status reporting.",
    artifactOrOutcome:
      "Improved visibility into unresolved handoffs, process bottlenecks, and completion status.",
  },
];

const DEFAULT_TEAM_ROLES: Array<Required<RfpTeamRole>> = [
  {
    title: "Accountable Delivery Lead",
    responsibility:
      "Owns project delivery, stakeholder alignment, scope decisions, and final recommendations.",
    staffingModelNote:
      "This is the primary senior-led role and remains the single accountable point of delivery.",
  },
  {
    title: "Workflow Automation Architect",
    responsibility:
      "Designs workflow logic, exception handling, system handoffs, and the automation approach for the first release.",
    staffingModelNote:
      "This role may be covered by the same senior lead when the scope stays contained.",
  },
  {
    title: "Specialist Support",
    responsibility:
      "Provides deeper CRM, finance, integration, or custom software support only if the confirmed implementation requires it.",
    staffingModelNote:
      "Added only when discovery confirms a need for specialized technical depth.",
  },
];

const DEFAULT_TECHNOLOGY_LAYERS: Array<Required<RfpTechnologyLayer>> = [
  {
    layer: "External Application or Intake Form",
    purpose: "Captures participant submissions and required intake data.",
    validationNeeded:
      "Confirm current form tooling, required fields, and how application records are accessed.",
  },
  {
    layer: "CRM System of Record",
    purpose:
      "Holds the authoritative member, participant, entitlement, and participation data needed for downstream decisions.",
    validationNeeded:
      "Confirm the current CRM, API or import options, ownership rules, and data quality constraints.",
  },
  {
    layer: "Workflow Automation Layer",
    purpose:
      "Routes submissions, validates statuses, triggers review steps, and coordinates exception handling.",
    validationNeeded:
      "Confirm where workflow orchestration should live and what security or audit requirements apply.",
  },
  {
    layer: "Communication Platform",
    purpose:
      "Sends lifecycle messages and staff notifications tied to participant status and approval steps.",
    validationNeeded:
      "Confirm current email or messaging tools, template ownership, and sending constraints.",
  },
  {
    layer: "Finance or Invoicing System",
    purpose:
      "Receives additional seat or billing-support triggers once eligibility, approval, and entitlement rules are met.",
    validationNeeded:
      "Confirm billing ownership, handoff format, and whether direct integration or queued follow-up is preferred.",
  },
  {
    layer: "Reporting Dashboard",
    purpose:
      "Shows participant status, unresolved exceptions, finance triggers, and operational visibility for staff and leadership.",
    validationNeeded:
      "Confirm which metrics matter, who owns the reports, and how frequently updates are needed.",
  },
];

const DEFAULT_SCOPE_PHASES = [
  {
    name: "Phase 1: Workflow Validation and Requirements",
    objective:
      "Confirm the current operating model, decision points, system handoffs, and exception paths before implementation choices are finalized.",
    deliverables: [
      "Current-state workflow map",
      "Requirements summary",
      "Decision log and risk register",
    ],
    timing: "Phase 1",
  },
  {
    name: "Phase 2: Future-State Design and Technology Recommendation",
    objective:
      "Define the future-state workflow, data ownership model, platform architecture, and phased implementation priorities.",
    deliverables: [
      "Future-state workflow design",
      "Vendor-neutral technology architecture",
      "Implementation roadmap",
    ],
    timing: "Phase 2",
  },
  {
    name: "Phase 3: Initial Implementation Release",
    objective:
      "Build the first practical release around the highest-value workflow and integration priorities confirmed in discovery.",
    deliverables: [
      "Configured workflow automation",
      "Core system integration work",
      "Launch support plan",
    ],
    timing: "Phase 3",
  },
  {
    name: "Phase 4: Optimization and Support",
    objective:
      "Extend or refine the workflow after launch with reporting, finance handoffs, and operational improvement feedback.",
    deliverables: [
      "Post-launch support",
      "Refinement backlog",
      "Optimization recommendations",
    ],
    timing: "Phase 4",
  },
];

const DEFAULT_INFORMATION_NEEDED: Array<Required<RfpInformationNeededItem>> = [
  {
    label: "CRM administrator access or working session",
    type: "Access",
    reason:
      "Needed to validate the current source of truth, field ownership, and integration constraints.",
  },
  {
    label: "Current external application details",
    type: "Information",
    reason:
      "Needed to confirm how applications are captured, what data is required, and what downstream systems consume it.",
  },
  {
    label: "Sample application and participant records",
    type: "Information",
    reason:
      "Needed to understand data quality, status handling, and how participant records are used operationally.",
  },
  {
    label: "Membership entitlement rules",
    type: "Information",
    reason:
      "Needed to confirm eligibility logic, seat entitlement rules, and approval paths before automation is configured.",
  },
  {
    label: "Current reports, spreadsheets, and finance handoff examples",
    type: "Information",
    reason:
      "Needed to validate reporting expectations, additional seat billing triggers, and manual handoff steps.",
  },
];

const DEFAULT_QUESTIONS = [
  "Which system should be treated as the source of truth for membership, participant, and entitlement status?",
  "How are competitor conflicts defined today, and which exceptions require staff judgment?",
  "Which reporting outputs matter most to program leadership, operations, and finance?",
];

const css = [
  ":root{--ink:#181925;--muted:#5a6075;--soft:#f8f5f7;--line:#e7dde5;--accent:#8f006b;--highlight:#f7ec59;--warning:#8a5b00;}",
  "*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;}",
  "html,body{margin:0;padding:0;background:#fff;color:var(--ink);font-family:Helvetica,Arial,sans-serif;}",
  "h1,h2,h3,h4,p,ul,table{margin:0;}",
  "p{line-height:1.46;}",
  "table{border-collapse:collapse;width:100%;}",
  ".page{width:8.5in;height:11in;padding:0.52in 0.58in 0.72in;background:#fff;position:relative;page-break-after:always;overflow:hidden;}",
  ".page:last-child{page-break-after:auto;}",
  ".page-shell{height:100%;padding-bottom:0.42in;}",
  ".page-header{display:flex;justify-content:space-between;align-items:center;padding-bottom:0.12in;border-bottom:1px solid var(--line);margin-bottom:0.2in;}",
  ".page-logo{width:1.72in;max-width:42%;}",
  ".page-badge{font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent);}",
  ".section-title{font-size:24px;line-height:1.04;letter-spacing:-0.03em;margin-bottom:0.12in;}",
  ".section-intro{font-size:14px;color:var(--muted);margin-bottom:0.14in;line-height:1.38;}",
  ".body-copy p{font-size:12.8px;margin-bottom:0.09in;}",
  ".grid-2{display:grid;grid-template-columns:1fr 1fr;gap:0.14in;align-items:start;}",
  ".grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0.12in;align-items:start;}",
  ".stack{display:flex;flex-direction:column;gap:0.12in;}",
  ".card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:0.14in 0.16in;break-inside:avoid;page-break-inside:avoid;}",
  ".soft-card{background:var(--soft);border:1px solid var(--line);border-radius:18px;padding:0.14in 0.16in;break-inside:avoid;page-break-inside:avoid;}",
  ".card h4,.soft-card h4{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent);margin-bottom:0.08in;}",
  ".card p,.soft-card p{font-size:12px;line-height:1.36;color:#3f4458;}",
  ".bullet-list{padding-left:18px;margin-top:0.05in;}",
  ".bullet-list li{font-size:12px;line-height:1.32;margin-bottom:0.05in;}",
  ".meta-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0.12in;margin-top:0.2in;}",
  ".meta-card{padding:0.14in;border-radius:18px;background:#fff;border:1px solid var(--line);}",
  ".meta-label{font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent);margin-bottom:0.04in;}",
  ".meta-value{font-size:12.5px;line-height:1.34;color:#25293a;}",
  ".cover{background:#fff;}",
  ".cover::after{content:\"\";position:absolute;left:0;right:0;bottom:0;height:0.26in;background:linear-gradient(90deg,#f7ec59 0%,#b95aa0 100%);}",
  ".cover-shell{display:flex;flex-direction:column;justify-content:space-between;height:100%;padding-bottom:0.42in;}",
  ".cover-top{display:flex;justify-content:space-between;align-items:flex-start;gap:0.18in;}",
  ".cover-logo{width:2.3in;max-width:52%;}",
  ".cover-mark{padding:8px 12px;border-radius:999px;border:1px solid var(--line);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent);}",
  ".cover-body{max-width:6.2in;}",
  ".eyebrow{display:inline-flex;align-items:center;padding:6px 10px;border-radius:999px;background:rgba(247,236,89,0.44);font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#4b3b00;margin-bottom:0.16in;}",
  ".cover h1{font-size:31px;line-height:1.02;letter-spacing:-0.04em;max-width:6.1in;}",
  ".cover-subtitle{margin-top:0.12in;font-size:14px;line-height:1.4;color:#4f556b;max-width:5.8in;}",
  ".cover-footer{display:flex;justify-content:flex-end;color:#5a6075;font-size:11px;margin-top:0.2in;}",
  ".status-chip{display:inline-flex;align-items:center;justify-content:center;padding:4px 8px;border-radius:999px;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;font-weight:bold;white-space:nowrap;}",
  ".status-chip.covered{background:rgba(0,122,77,0.12);color:#005e3b;}",
  ".status-chip.partially_covered{background:rgba(138,91,0,0.14);color:var(--warning);}",
  ".status-chip.missing{background:rgba(153,0,0,0.12);color:#8a1010;}",
  ".status-chip.not_applicable{background:rgba(24,25,37,0.12);color:var(--ink);}",
  ".compliance-table th,.compliance-table td{padding:10px 8px;border-bottom:1px solid var(--line);vertical-align:top;text-align:left;}",
  ".compliance-table th{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);}",
  ".compliance-table td{font-size:11.25px;line-height:1.3;color:#384055;}",
  ".priority-card p{font-size:11.5px;line-height:1.3;}",
  ".priority-head{display:flex;justify-content:space-between;gap:8px;align-items:flex-start;margin-bottom:0.05in;}",
  ".priority-head h4{font-size:13px;line-height:1.2;letter-spacing:0;margin-bottom:0;}",
  ".team-table td,.team-table th,.tech-table td,.tech-table th,.pricing-table td,.pricing-table th,.support-table td,.support-table th{padding:10px 8px;border-bottom:1px solid var(--line);vertical-align:top;text-align:left;}",
  ".team-table th,.tech-table th,.pricing-table th,.support-table th{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);}",
  ".team-table td,.tech-table td,.pricing-table td,.support-table td{font-size:11.4px;line-height:1.3;color:#384055;}",
  ".phase-card h4{font-size:13px;line-height:1.22;letter-spacing:0;margin-bottom:0.04in;}",
  ".phase-meta{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin-bottom:0.05in;}",
  ".checklist{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.08in;}",
  ".checklist li{display:grid;grid-template-columns:16px 1fr;gap:10px;align-items:start;font-size:11.7px;line-height:1.32;color:#384055;}",
  ".checklist li::before{content:\"\";width:10px;height:10px;border-radius:999px;margin-top:4px;background:var(--accent);display:block;}",
  ".note-band{padding:0.12in 0.16in;border:1px solid var(--line);border-radius:16px;background:var(--soft);font-size:11.5px;line-height:1.34;color:#42475c;}",
  ".muted{color:#727890;}",
  ".footer-line{position:absolute;left:0.58in;right:0.58in;bottom:0.28in;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#707792;border-top:1px solid #eee6ef;padding-top:10px;}",
].join("");

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

const collapseWhitespace = (value: unknown) =>
  String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();

const cleanText = (value: unknown) => {
  const text = collapseWhitespace(value);
  return /^msg_[a-z0-9]+$/i.test(text) ? "" : text;
};

const fullText = (value: unknown) =>
  cleanText(value).replace(/\s*(?:\.{3,}|…+)\s*$/g, "").trim();

const uniqueStrings = (value: unknown) => {
  const seen = new Set<string>();
  const results: string[] = [];
  if (!Array.isArray(value)) return results;
  for (const entry of value) {
    const text = fullText(entry);
    if (!text) continue;
    const key = text.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    results.push(text);
  }
  return results;
};

const limited = <T>(items: T[], max: number) => items.slice(0, Math.max(0, max));

const esc = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const joinHtml = (parts: Array<string | null | undefined>) =>
  parts.filter(Boolean).join("");

const slugify = (value: unknown) =>
  String(value || "senna-rfp-response")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70) || "senna-rfp-response";

function normalizeStringList(value: unknown, fallback: string[] = []) {
  const list = uniqueStrings(value);
  return list.length ? list : fallback;
}

function normalizeParagraphs(value: unknown, fallback: string[], max = 6) {
  return limited(normalizeStringList(value, fallback), max);
}

function normalizeRequestedItems(
  value: unknown,
): Array<{ requirement: string; notes: string; required: boolean }> {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const results: Array<{ requirement: string; notes: string; required: boolean }> = [];

  for (const entry of value) {
    const requirement = isObject(entry)
      ? fullText(entry.requirement)
      : fullText(entry);
    const notes = isObject(entry) ? fullText(entry.notes) : "";
    const required = isObject(entry)
      ? entry.required !== false
      : true;
    if (!requirement) continue;
    const key = requirement.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    results.push({ requirement, notes, required });
  }

  return results;
}

function normalizePriorityAreas(value: unknown) {
  const records = Array.isArray(value) ? value : [];
  const areas = records
    .map((entry) => {
      if (isObject(entry)) {
        return {
          name: fullText(entry.name),
          rationale: fullText(entry.rationale),
          priority: fullText(entry.priority) || "Medium",
        };
      }
      return null;
    })
    .filter(
      (
        entry,
      ): entry is {
        name: string;
        rationale: string;
        priority: string;
      } => Boolean(entry?.name && entry.rationale),
    );

  return limited(areas.length ? areas : DEFAULT_PRIORITY_AREAS, 5);
}

function normalizeExperienceExamples(value: unknown) {
  const records = Array.isArray(value) ? value : [];
  const examples = records
    .map((entry) => {
      if (!isObject(entry)) return null;
      return {
        title: fullText(entry.title),
        summary: fullText(entry.summary),
        artifactOrOutcome: fullText(entry.artifactOrOutcome),
      };
    })
    .filter(
      (
        entry,
      ): entry is Required<RfpExperienceExample> =>
        Boolean(entry?.title && entry.summary && entry.artifactOrOutcome),
    );

  return limited(
    examples.length ? examples : DEFAULT_EXPERIENCE_EXAMPLES,
    4,
  );
}

function normalizeTeamRoles(value: unknown, staffingNotes: string[]) {
  const records = Array.isArray(value) ? value : [];
  const roles = records
    .map((entry) => {
      if (!isObject(entry)) return null;
      return {
        title: fullText(entry.title),
        responsibility: fullText(entry.responsibility),
        staffingModelNote: fullText(entry.staffingModelNote),
      };
    })
    .filter(
      (
        entry,
      ): entry is Required<RfpTeamRole> =>
        Boolean(entry?.title && entry.responsibility && entry.staffingModelNote),
    );

  const fallback = DEFAULT_TEAM_ROLES.map((role, index) => ({
    ...role,
    staffingModelNote:
      staffingNotes[index] || staffingNotes[0] || role.staffingModelNote,
  }));

  return limited(roles.length ? roles : fallback, 5);
}

function normalizeTechnologyLayers(value: unknown, overrides: string[]) {
  const records = Array.isArray(value) ? value : [];
  const layers = records
    .map((entry) => {
      if (!isObject(entry)) return null;
      return {
        layer: fullText(entry.layer),
        purpose: fullText(entry.purpose),
        validationNeeded: fullText(entry.validationNeeded),
      };
    })
    .filter(
      (
        entry,
      ): entry is Required<RfpTechnologyLayer> =>
        Boolean(entry?.layer && entry.purpose && entry.validationNeeded),
    );

  const base = layers.length ? layers : DEFAULT_TECHNOLOGY_LAYERS;
  const merged = base.map((layer, index) => ({
    ...layer,
    validationNeeded:
      overrides[index] || layer.validationNeeded,
  }));

  return limited(merged, 6);
}

function normalizeScopePhases(value: unknown) {
  const records = Array.isArray(value) ? value : [];
  const phases = records
    .map((entry) => {
      if (!isObject(entry)) return null;
      const deliverables = normalizeStringList(entry.deliverables);
      return {
        name: fullText(entry.name),
        objective: fullText(entry.objective),
        deliverables,
        timing: fullText(entry.timing) || "Phase",
      };
    })
    .filter(
      (
        entry,
      ): entry is {
        name: string;
        objective: string;
        deliverables: string[];
        timing: string;
      } => Boolean(entry?.name && entry.objective),
    );

  return limited(phases.length ? phases : DEFAULT_SCOPE_PHASES, 5);
}

function normalizeInformationNeeded(value: unknown) {
  const records = Array.isArray(value) ? value : [];
  const items = records
    .map((entry) => {
      if (typeof entry === "string") {
        const label = fullText(entry);
        return label
          ? {
              label,
              type: "Information",
              reason:
                "Needed to confirm the current operating model, access path, and implementation constraints.",
            }
          : null;
      }
      if (!isObject(entry)) return null;
      return {
        label: fullText(entry.label),
        type: fullText(entry.type) || "Information",
        reason: fullText(entry.reason),
      };
    })
    .filter(
      (
        entry,
      ): entry is Required<RfpInformationNeededItem> =>
        Boolean(entry?.label && entry.reason),
    );

  return limited(items.length ? items : DEFAULT_INFORMATION_NEEDED, 6);
}

function normalizeQuestions(value: unknown) {
  return limited(normalizeStringList(value, DEFAULT_QUESTIONS), 5);
}

function normalizePricingLineItems(value: unknown) {
  const records = Array.isArray(value) ? value : [];
  return records
    .map((entry) => {
      if (!isObject(entry)) return null;
      return {
        label: fullText(entry.label),
        value: fullText(entry.value),
        assumptions: normalizeStringList(entry.assumptions),
        included: Boolean(entry.included),
        optional: Boolean(entry.optional),
      };
    })
    .filter(
      (
        entry,
      ): entry is Required<RfpPricingLineItem> =>
        Boolean(entry?.label && entry.value),
    );
}

function normalizeSupportTiers(value: unknown) {
  const records = Array.isArray(value) ? value : [];
  return records
    .map((entry) => {
      if (!isObject(entry)) return null;
      return {
        name: fullText(entry.name),
        value: fullText(entry.value),
        includedServices: normalizeStringList(entry.includedServices),
        availability: fullText(entry.availability) || "Business-hours response",
      };
    })
    .filter(
      (
        entry,
      ): entry is {
        name: string;
        value: string;
        includedServices: string[];
        availability: string;
      } => Boolean(entry?.name && entry.value),
    );
}

function normalizeHourlySupport(value: unknown) {
  if (!isObject(value)) return null;
  const hourly = {
    label: fullText(value.label),
    value: fullText(value.value),
    assumptions: normalizeStringList(value.assumptions),
    included: Boolean(value.included),
    optional: Boolean(value.optional),
  };
  return hourly.label && hourly.value ? hourly : null;
}

function normalizeComplianceHints(value: unknown) {
  const records = Array.isArray(value) ? value : [];
  const map = new Map<string, Required<RfpComplianceItem>>();
  for (const entry of records) {
    if (!isObject(entry)) continue;
    const requirement = fullText(entry.requirement);
    if (!requirement) continue;
    map.set(requirement.toLowerCase(), {
      requirement,
      responseSection: fullText(entry.responseSection),
      status: (fullText(entry.status) as RfpComplianceStatus) || "covered",
      evidence: fullText(entry.evidence),
    });
  }
  return map;
}

function mapProfileLineItems(profileItems: RfpPricingProfileLineItem[]) {
  return profileItems.map((item) => ({
    label: item.label,
    value: item.value,
    assumptions: item.assumptions,
    included: Boolean(item.included),
    optional: Boolean(item.optional),
  }));
}

function mapProfileSupportTiers(profileTiers: RfpSupportProfileTier[]) {
  return profileTiers.map((tier) => ({
    name: tier.name,
    value: tier.value,
    includedServices: tier.includedServices,
    availability: tier.availability,
  }));
}

function mapProfileHourlySupport(item: RfpPricingProfileLineItem) {
  return {
    label: item.label,
    value: item.value,
    assumptions: item.assumptions,
    included: Boolean(item.included),
    optional: Boolean(item.optional),
  };
}

function mergePricingLineItems(
  exact: Required<RfpPricingLineItem>[],
  fallback: Required<RfpPricingLineItem>[],
) {
  if (!exact.length) return fallback;
  const seen = new Set<string>();
  const merged: Required<RfpPricingLineItem>[] = [];

  for (const item of exact) {
    const key = item.label.toLowerCase();
    seen.add(key);
    merged.push(item);
  }

  for (const item of fallback) {
    const key = item.label.toLowerCase();
    if (seen.has(key)) continue;
    merged.push(item);
  }

  return merged;
}

function mergeSupportTiers(
  exact: Array<{
    name: string;
    value: string;
    includedServices: string[];
    availability: string;
  }>,
  fallback: Array<{
    name: string;
    value: string;
    includedServices: string[];
    availability: string;
  }>,
) {
  if (!exact.length) return fallback;
  const seen = new Set<string>();
  const merged = [...exact];
  for (const tier of exact) seen.add(tier.name.toLowerCase());
  for (const tier of fallback) {
    if (seen.has(tier.name.toLowerCase())) continue;
    merged.push(tier);
  }
  return merged;
}

function resolveCommercialSource(
  input: RfpRenderInput,
  proposal: RfpProposal,
): {
  pricingProfile: RfpPricingProfile | null;
  pricingProfileKey: string | null;
  commercialSourceLabel: string;
  pricingLineItems: Required<RfpPricingLineItem>[];
  supportTiers: Array<{
    name: string;
    value: string;
    includedServices: string[];
    availability: string;
  }>;
  hourlySupport: Required<RfpPricingLineItem> | null;
} {
  const exactPricingLineItems = normalizePricingLineItems(
    input.commercialInputs?.pricingLineItems,
  );
  const exactSupportTiers = normalizeSupportTiers(
    input.commercialInputs?.supportTiers,
  );
  const exactHourlySupport = normalizeHourlySupport(
    input.commercialInputs?.hourlySupport,
  );

  const selectedProfileKey = getRfpPricingProfile(input.pricingProfileKey)
    ? input.pricingProfileKey || null
    : null;
  const defaultProfileKey = resolveDefaultPricingProfileKey(input.opportunityType);
  const resolvedProfileKey =
    selectedProfileKey ||
    defaultProfileKey ||
    null;
  const profile = getRfpPricingProfile(resolvedProfileKey);

  const fallbackPricingLineItems = profile
    ? mapProfileLineItems(profile.pricingLineItems)
    : [];
  const fallbackSupportTiers = profile
    ? mapProfileSupportTiers(profile.supportTiers)
    : [];
  const fallbackHourlySupport = profile
    ? mapProfileHourlySupport(profile.hourlySupport)
    : normalizeHourlySupport(proposal.hourlySupport);

  const pricingLineItems = mergePricingLineItems(
    exactPricingLineItems,
    fallbackPricingLineItems,
  );
  const supportTiers = mergeSupportTiers(
    exactSupportTiers,
    fallbackSupportTiers,
  );
  const hourlySupport = exactHourlySupport || fallbackHourlySupport || null;

  const commercialSourceLabel = exactPricingLineItems.length ||
    exactSupportTiers.length ||
    exactHourlySupport
    ? "User-supplied exact pricing"
    : selectedProfileKey && profile
      ? `Budgetary ranges from profile: ${profile.label}`
      : defaultProfileKey && profile
        ? `Budgetary ranges from default ${profile.label} profile`
        : "Commercial inputs not yet resolved";

  return {
    pricingProfile: profile,
    pricingProfileKey: resolvedProfileKey,
    commercialSourceLabel,
    pricingLineItems,
    supportTiers,
    hourlySupport,
  };
}

function containsCommercialValue(value: string) {
  return /\$\s*\d/.test(value) || /\bincluded\b/i.test(value) || /\bnot included\b/i.test(value);
}

function hasBuyerTerm(terms: string[], value: string) {
  return terms.some((term) => term.toLowerCase() === value.toLowerCase());
}

function inferPricingRequired(brief: RfpBrief, requestedItems: Array<{ requirement: string }>) {
  if (typeof brief.pricingRequired === "boolean") return brief.pricingRequired;
  return requestedItems.some((item) => /pricing|cost|budget/i.test(item.requirement));
}

function inferSupportPricingRequired(
  brief: RfpBrief,
  requestedItems: Array<{ requirement: string }>,
) {
  if (typeof brief.supportPricingRequired === "boolean") {
    return brief.supportPricingRequired;
  }
  return requestedItems.some((item) =>
    /ongoing support|support pricing|monthly support|hourly support/i.test(
      item.requirement,
    ),
  );
}

function inferTechnologyRequested(
  brief: RfpBrief,
  requestedItems: Array<{ requirement: string }>,
) {
  return (
    normalizeStringList(brief.technologyItemsRequested).length > 0 ||
    requestedItems.some((item) =>
      /technology|technologies|platform|platforms|architecture/i.test(
        item.requirement,
      ),
    )
  );
}

function inferTeamRequested(
  brief: RfpBrief,
  requestedItems: Array<{ requirement: string }>,
) {
  return (
    normalizeStringList(brief.teamRequirements).length > 0 ||
    requestedItems.some((item) =>
      /team|staffing|roles|experience/i.test(item.requirement),
    )
  );
}

function getSectionForRequirement(requirement: string) {
  const key = requirement.toLowerCase();
  if (/pricing|assumption|optional/i.test(key)) {
    return "Pricing, Assumptions, and Optional Add-Ons";
  }
  if (/support/i.test(key)) {
    return "Ongoing Support and Information Needed";
  }
  if (/technolog|platform|architecture|system/i.test(key)) {
    return "Proposed Approach and Technology Architecture";
  }
  if (/team|role|experience|company|similar/i.test(key)) {
    return "Company Overview, Relevant Experience, and Team Roles";
  }
  if (/timing|timeline|scope|phasing/i.test(key)) {
    return "Scope of Work and Phased Timeline";
  }
  if (/access|resource|information needed/i.test(key)) {
    return "Ongoing Support and Information Needed";
  }
  return "Compliance Matrix and Understanding of Need";
}

function evaluateComplianceItem(
  requirement: string,
  hint: Required<RfpComplianceItem> | undefined,
  normalized: Omit<RfpProposalNormalized, "complianceItems" | "previewWarnings" | "readiness">,
  flags: {
    pricingRequired: boolean;
    supportPricingRequired: boolean;
    technologyRequested: boolean;
    teamRequested: boolean;
  },
): Required<RfpComplianceItem> {
  const key = requirement.toLowerCase();
  const responseSection = hint?.responseSection || getSectionForRequirement(requirement);
  let status: RfpComplianceStatus = "covered";
  let evidence = "";

  if (/support/i.test(key)) {
    const hasSupport = normalized.supportTiers.length > 0 && Boolean(normalized.hourlySupport);
    status = hasSupport ? "covered" : "missing";
    evidence = hasSupport
      ? "Support tiers and hourly support are rendered with resolved values."
      : "Support tiers or hourly support are unresolved.";
  } else if (/pricing/i.test(key)) {
    status = normalized.pricingLineItems.length ? "covered" : "missing";
    evidence = normalized.pricingLineItems.length
      ? `${normalized.pricingLineItems.length} structured pricing line items rendered with assumptions.`
      : "No pricing line items are resolved.";
  } else if (/technolog|platform|architecture/i.test(key)) {
    status = normalized.technologyLayers.length >= 4 ? "covered" : "missing";
    evidence = normalized.technologyLayers.length
      ? `${normalized.technologyLayers.length} vendor-neutral technology layers are included.`
      : "Technology architecture is missing.";
  } else if (/team|role|staffing/i.test(key)) {
    status = normalized.teamRoles.length >= 2 ? "covered" : "missing";
    evidence = normalized.teamRoles.length
      ? `${normalized.teamRoles.length} role-based staffing entries are included.`
      : "Project team roles are missing.";
  } else if (/experience|similar/i.test(key)) {
    status = normalized.relevantExperienceExamples.length
      ? "covered"
      : "partially_covered";
    evidence = normalized.relevantExperienceExamples.length
      ? `${normalized.relevantExperienceExamples.length} anonymized relevant experience examples are included.`
      : "Company overview is present but experience examples are limited.";
  } else if (/scope|timing|timeline|phase/i.test(key)) {
    status = normalized.scopePhases.length ? "covered" : "missing";
    evidence = normalized.scopePhases.length
      ? `${normalized.scopePhases.length} phased scope entries are included.`
      : "Phased scope and timeline content is missing.";
  } else if (/access|resource|information needed/i.test(key)) {
    status = normalized.informationNeeded.length ? "covered" : "missing";
    evidence = normalized.informationNeeded.length
      ? `${normalized.informationNeeded.length} information and access checklist items are included.`
      : "Information and access checklist is missing.";
  } else if (/approach|improvement|manual process|understanding/i.test(key)) {
    status = normalized.understandingPriorities.length ? "covered" : "partially_covered";
    evidence = normalized.understandingPriorities.length
      ? `${normalized.understandingPriorities.length} priority workflow areas are included with business rationale.`
      : "Executive summary is present, but priority workflow areas are limited.";
  } else {
    status = normalized.executiveSummary.length ? "covered" : "partially_covered";
    evidence = normalized.executiveSummary.length
      ? "Core narrative sections are present."
      : "Core narrative sections are limited.";
  }

  if (flags.pricingRequired && /pricing/i.test(key) && !normalized.pricingLineItems.length) {
    status = "missing";
  }
  if (
    flags.supportPricingRequired &&
    /support/i.test(key) &&
    (!normalized.supportTiers.length || !normalized.hourlySupport)
  ) {
    status = "missing";
  }
  if (flags.technologyRequested && /technolog|platform/i.test(key) && normalized.technologyLayers.length < 4) {
    status = "missing";
  }
  if (flags.teamRequested && /team|role/i.test(key) && normalized.teamRoles.length < 2) {
    status = "missing";
  }

  return {
    requirement,
    responseSection,
    status: hint?.status === "not_applicable" ? "not_applicable" : status,
    evidence: hint?.evidence || evidence,
  };
}

function addIssue(
  target: RfpReadinessIssue[],
  type: string,
  message: string,
) {
  if (target.some((issue) => issue.type === type && issue.message === message)) return;
  target.push({ type, message });
}

function createReadiness(
  normalized: Omit<RfpProposalNormalized, "previewWarnings" | "readiness">,
  input: RfpRenderInput,
  flags: {
    pricingRequired: boolean;
    supportPricingRequired: boolean;
    technologyRequested: boolean;
    teamRequested: boolean;
    buyerTerminology: string[];
  },
) {
  const blockingIssues: RfpReadinessIssue[] = [];
  const finalBlockingIssues: RfpReadinessIssue[] = [];
  const warnings: RfpReadinessIssue[] = [];

  const routeIssue = (type: string, message: string, blockingInFinal = true) => {
    if (blockingInFinal) {
      addIssue(finalBlockingIssues, type, message);
    }
    if (normalized.renderMode === "final" && blockingInFinal) {
      addIssue(blockingIssues, type, message);
      return;
    }
    addIssue(warnings, type, message);
  };

  if (flags.pricingRequired && !normalized.pricingLineItems.length) {
    routeIssue(
      "missing_pricing",
      "Pricing is required by the RFP but no exact pricing or budgetary pricing profile is attached.",
    );
  }

  if (
    flags.supportPricingRequired &&
    (!normalized.supportTiers.length || !normalized.hourlySupport)
  ) {
    routeIssue(
      "missing_support_pricing",
      "Support pricing is required by the RFP but support tier values or hourly support are missing.",
    );
  }

  for (const item of normalized.pricingLineItems) {
    if (!containsCommercialValue(item.value)) {
      routeIssue(
        "invalid_pricing_line",
        `Pricing line "${item.label}" does not contain a number, range, or explicit included status.`,
      );
    }
  }

  for (const tier of normalized.supportTiers) {
    if (!containsCommercialValue(tier.value)) {
      routeIssue(
        "invalid_support_line",
        `Support tier "${tier.name}" does not contain a number, range, or explicit availability status.`,
      );
    }
  }

  if (normalized.hourlySupport && !containsCommercialValue(normalized.hourlySupport.value)) {
    routeIssue(
      "invalid_support_line",
      "Hourly support does not contain a number, range, or explicit included status.",
    );
  }

  for (const item of normalized.complianceItems) {
    if (item.status === "missing") {
      routeIssue(
        "missing_compliance_item",
        `Buyer-requested item "${item.requirement}" is not fully covered.`,
      );
    } else if (item.status === "partially_covered") {
      addIssue(
        warnings,
        "partial_compliance_item",
        `Buyer-requested item "${item.requirement}" is only partially covered.`,
      );
    }
  }

  if (flags.technologyRequested && normalized.technologyLayers.length < 4) {
    routeIssue(
      "missing_technology_section",
      "Technologies or platforms were requested, but fewer than four technology layers are defined.",
    );
  }

  if (flags.teamRequested && normalized.teamRoles.length < 2) {
    routeIssue(
      "missing_team_roles",
      "Project team roles were requested, but fewer than two team roles are defined.",
    );
  }

  const normalizedText = JSON.stringify(normalized);
  for (const rule of BANNED_PHRASE_RULES) {
    if (rule.regex.test(normalizedText)) {
      routeIssue(
        rule.type,
        `Proposal still contains banned client-facing language. Replace it with ${rule.replacement}.`,
      );
    }
  }

  if (!hasBuyerTerm(flags.buyerTerminology, "MVP") && /\bMVP\b/.test(normalizedText)) {
    routeIssue(
      "mvp_without_buyer_term",
      'The proposal uses "MVP" even though the buyer terminology does not.',
    );
  }

  const reviewBlocking = Array.isArray(input.review?.blockingIssues)
    ? input.review?.blockingIssues || []
    : [];
  const reviewWarnings = Array.isArray(input.review?.warnings)
    ? input.review?.warnings || []
    : [];

  for (const issue of reviewBlocking) {
    const message = fullText(issue.message);
    if (!message) continue;
    routeIssue(fullText(issue.type) || "review_blocker", message, true);
  }

  for (const issue of reviewWarnings) {
    const message = fullText(issue.message);
    if (!message) continue;
    addIssue(warnings, fullText(issue.type) || "review_warning", message);
  }

  const previewWarnings = Array.from(
    new Set(
      [...blockingIssues, ...warnings]
        .map((issue) => fullText(issue.message))
        .filter(Boolean),
    ),
  );

  return {
    previewWarnings,
    readiness: {
      readyForFinal: finalBlockingIssues.length === 0,
      blockingIssues,
      warnings,
    },
  };
}

function normalizeV1PriorityAreas(
  proposal: RfpProposal,
  brief: RfpBrief,
): Array<Required<RfpPriorityArea>> {
  if (Array.isArray(proposal.understandingPriorities)) {
    return normalizePriorityAreas(proposal.understandingPriorities);
  }

  const v1Areas = Array.isArray(proposal.opportunityAreas)
    ? proposal.opportunityAreas
        .map((entry) => {
          if (!isObject(entry)) return null;
          return {
            name: fullText(entry.name),
            rationale: fullText(entry.rationale),
            priority: "Medium",
          };
        })
        .filter(
          (
            entry,
          ): entry is Required<RfpPriorityArea> =>
            Boolean(entry?.name && entry.rationale),
        )
    : [];

  if (v1Areas.length) return limited(v1Areas, 5);

  const hintedAreas = normalizeStringList(brief.opportunityAreas);
  if (!hintedAreas.length) return DEFAULT_PRIORITY_AREAS;

  return limited(
    hintedAreas.map((name, index) => ({
      name,
      rationale:
        DEFAULT_PRIORITY_AREAS[index]?.rationale ||
        "This area should be validated during discovery and prioritized for practical operational improvement.",
      priority: index < 2 ? "High" : "Medium",
    })),
    5,
  );
}

function normalizeV1ScopePhases(
  proposal: RfpProposal,
): Array<{
  name: string;
  objective: string;
  deliverables: string[];
  timing: string;
}> {
  if (Array.isArray(proposal.scopePhases)) {
    return normalizeScopePhases(proposal.scopePhases);
  }

  const methodologyCards = Array.isArray(proposal.methodologyPhases)
    ? proposal.methodologyPhases
        .map((entry, index) => {
          const item = isObject(entry) ? entry : {};
          const name = fullText(item.name || item.title) || `Phase ${index + 1}`;
          const objective = fullText(item.description);
          return objective
            ? {
                name,
                objective,
                deliverables: [],
                timing: `Phase ${index + 1}`,
              }
            : null;
        })
        .filter(
          (
            entry,
          ): entry is {
            name: string;
            objective: string;
            deliverables: string[];
            timing: string;
          } => Boolean(entry),
        )
    : [];

  return methodologyCards.length ? limited(methodologyCards, 5) : DEFAULT_SCOPE_PHASES;
}

function normalizeCoverEyebrow(
  value: string,
  buyerTerms: string[],
) {
  const text = fullText(value) || "Workflow Automation Proposal";
  if (/discovery-led proposal/i.test(text)) return "Workflow Automation Proposal";
  if (/\bmvp\b/i.test(text) && !hasBuyerTerm(buyerTerms, "MVP")) {
    return "Workflow Automation Proposal";
  }
  return text;
}

export function normalizeRfpProposalInput(
  input: RfpRenderInput,
): RfpProposalNormalized {
  const schemaVersion =
    input.schemaVersion === "rfp-proposal-v2" ? "rfp-proposal-v2" : "rfp-proposal-v1";
  const renderMode = input.renderMode === "final" ? "final" : "preview";
  const proposal = input.proposal || {};
  const brief = input.rfpBrief || {};
  const buyerTerminology = normalizeStringList(brief.buyerTerminology);
  const issuerName = fullText(
    input.issuerName || brief.issuerName || "Prospective client",
  );
  const opportunityTitle = fullText(
    input.opportunityTitle ||
      proposal.coverTitle ||
      brief.opportunityName ||
      "Workflow Automation Proposal",
  );
  const coverTitle = fullText(proposal.coverTitle || opportunityTitle) || opportunityTitle;
  const coverSubtitle = fullText(
    proposal.coverSubtitle ||
      `Prepared for ${issuerName} with a delivery-first workflow automation response`,
  );
  const coverEyebrow = normalizeCoverEyebrow(
    fullText(proposal.coverEyebrow || "Workflow Automation Proposal"),
    buyerTerminology,
  );
  const footerLine = fullText(
    proposal.footerLine || `Submitted by Senna Automation to ${issuerName}`,
  );
  const executiveSummary = normalizeParagraphs(
    proposal.executiveSummaryParagraphs,
    [
      `${issuerName} appears to be managing a growing program whose operational workflow now depends on more coordination, exception handling, and system handoffs than a manual process can comfortably absorb.`,
      "Senna Automation proposes a delivery-first engagement that validates the current operating model, prioritizes high-value workflow improvements, and moves into implementation with practical guardrails instead of generic transformation language.",
      "The goal is to reduce administrative drag, improve data consistency, create cleaner finance and communication handoffs, and preserve staff judgment where business rules or exceptions still require human review.",
      "This proposal is structured to satisfy the buyer's requested response items directly, including technology architecture, team roles, phased scope, pricing, support, and the information needed to start well.",
    ],
    6,
  );
  const companyOverview = normalizeParagraphs(
    proposal.companyOverviewParagraphs,
    [
      "Senna Automation helps organizations improve operations through workflow automation, custom software, and practical systems integration grounded in how teams actually work.",
      "The delivery approach is senior-led, direct, and implementation-minded. Discovery is used to remove execution risk, not to delay the solution.",
      "For operational programs like this one, the focus is on structured intake, system synchronization, exception handling, reporting visibility, and rollout paths that staff can realistically operate.",
    ],
    5,
  );
  const staffingNotes = normalizeStringList(input.staffingNotes);
  const technologyOverrides = normalizeStringList(input.technologyContextOverrides);
  const relevantExperienceExamples = normalizeExperienceExamples(
    proposal.relevantExperienceExamples,
  );
  const teamRoles = normalizeTeamRoles(proposal.teamRoles, staffingNotes);
  const technologyLayers = normalizeTechnologyLayers(
    proposal.technologyLayers,
    technologyOverrides,
  );
  const understandingPriorities =
    schemaVersion === "rfp-proposal-v2"
      ? normalizePriorityAreas(proposal.understandingPriorities)
      : normalizeV1PriorityAreas(proposal, brief);
  const scopePhases =
    schemaVersion === "rfp-proposal-v2"
      ? normalizeScopePhases(proposal.scopePhases)
      : normalizeV1ScopePhases(proposal);
  const informationNeeded = normalizeInformationNeeded(
    proposal.informationNeeded || brief.requiredAccessItems,
  );
  const questionsToConfirm = normalizeQuestions(
    proposal.questionsToConfirm || brief.unansweredQuestions,
  );
  const commercial = resolveCommercialSource(input, proposal);
  const pricingSummary =
    commercial.pricingLineItems.length || commercial.supportTiers.length
      ? `${commercial.commercialSourceLabel}. Final scope should still be confirmed against the selected phase order, access assumptions, and validated workflow boundaries.`
      : "Commercial inputs have not yet been resolved. Preview mode can continue, but final output requires exact pricing or a budgetary profile.";
  const approachSummary = fullText(
    proposal.methodologyIntro ||
      proposal.scopeParagraph ||
      "The engagement is structured as a phased workflow automation proposal: validate the current operating model, recommend the right architecture, implement the first release, and then support optimization with clear decision checkpoints.",
  );
  const supportSummary = fullText(
    proposal.supportSummary ||
      "Ongoing support should align to the operating model after launch: issue triage, monitored refinements, and advisory optimization when workflow priorities or business rules change.",
  );
  const scopeSummary = fullText(
    proposal.scopeParagraph ||
      "The recommended scope begins with workflow validation and future-state design, then moves into an initial implementation release built around the highest-value operating constraints confirmed in discovery.",
  );
  const requestedResponseItems = normalizeRequestedItems(brief.requestedResponseItems);
  const pricingRequired = inferPricingRequired(brief, requestedResponseItems);
  const supportPricingRequired = inferSupportPricingRequired(brief, requestedResponseItems);
  const technologyRequested = inferTechnologyRequested(brief, requestedResponseItems);
  const teamRequested = inferTeamRequested(brief, requestedResponseItems);
  const complianceHints = normalizeComplianceHints(proposal.complianceItems);

  const baseNormalized = {
    schemaVersion: "rfp-proposal-v2" as const,
    renderMode,
    issuerName,
    opportunityTitle,
    downloadBaseName: fullText(input.downloadBaseName || opportunityTitle),
    coverTitle,
    coverSubtitle,
    coverEyebrow,
    footerLine,
    companyOverview,
    executiveSummary,
    approachSummary,
    supportSummary,
    scopeSummary,
    pricingSummary,
    commercialSourceLabel: commercial.commercialSourceLabel,
    pricingProfileKey: commercial.pricingProfileKey,
    complianceItems: [] as Array<Required<RfpComplianceItem>>,
    understandingPriorities,
    relevantExperienceExamples,
    teamRoles,
    technologyLayers,
    scopePhases,
    pricingLineItems: commercial.pricingLineItems,
    supportTiers: commercial.supportTiers,
    hourlySupport: commercial.hourlySupport,
    informationNeeded,
    questionsToConfirm,
  };

  const complianceItems = requestedResponseItems.map((item) =>
    evaluateComplianceItem(
      item.requirement,
      complianceHints.get(item.requirement.toLowerCase()),
      baseNormalized,
      {
        pricingRequired,
        supportPricingRequired,
        technologyRequested,
        teamRequested,
      },
    ),
  );

  const { previewWarnings, readiness } = createReadiness(baseNormalized, input, {
    pricingRequired,
    supportPricingRequired,
    technologyRequested,
    teamRequested,
    buyerTerminology,
  });

  return {
    ...baseNormalized,
    complianceItems,
    previewWarnings,
    readiness,
  };
}

function pageHeader(label: string) {
  return joinHtml([
    '<div class="page-header">',
    `<img class="page-logo" src="${LOGO_URL}" alt="Senna Automation">`,
    `<div class="page-badge">${esc(label)}</div>`,
    "</div>",
  ]);
}

function footer(pageNumber: string, footerLine: string) {
  return joinHtml([
    '<div class="footer-line">',
    `<span>${esc(footerLine)}</span>`,
    `<span>${esc(pageNumber)}</span>`,
    "</div>",
  ]);
}

function paragraphBlock(items: string[]) {
  return items.map((entry) => `<p>${esc(entry)}</p>`).join("");
}

function bulletList(items: string[]) {
  return items.length
    ? `<ul class="bullet-list">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
    : '<p class="muted">Not specified.</p>';
}

function buildPage(pageNumber: number, label: string, bodyHtml: string, footerLine: string) {
  return joinHtml([
    '<section class="page">',
    '<div class="page-shell">',
    pageHeader(`Page ${pageNumber} - ${label}`),
    bodyHtml,
    "</div>",
    footer(String(pageNumber), footerLine),
    "</section>",
  ]);
}

function renderComplianceTable(items: Array<Required<RfpComplianceItem>>) {
  if (!items.length) {
    return '<p class="muted">No explicit requested-response checklist was extracted from the source materials.</p>';
  }

  return joinHtml([
    '<table class="compliance-table">',
    "<thead><tr><th>Requirement</th><th>Where Addressed</th><th>Status</th></tr></thead>",
    "<tbody>",
    items
      .map(
        (item) =>
          `<tr><td><strong>${esc(item.requirement)}</strong><br><span class="muted">${esc(item.evidence)}</span></td><td>${esc(item.responseSection)}</td><td><span class="status-chip ${esc(item.status)}">${esc(item.status.replace(/_/g, " "))}</span></td></tr>`,
      )
      .join(""),
    "</tbody>",
    "</table>",
  ]);
}

function renderPriorityCards(items: Array<Required<RfpPriorityArea>>) {
  return `<div class="stack">${items
    .map(
      (item) =>
        `<div class="card priority-card"><div class="priority-head"><h4>${esc(item.name)}</h4><span class="status-chip ${esc(item.priority.toLowerCase()) === "high" ? "covered" : "partially_covered"}">${esc(item.priority)}</span></div><p>${esc(item.rationale)}</p></div>`,
    )
    .join("")}</div>`;
}

function renderExperienceCards(items: Array<Required<RfpExperienceExample>>) {
  return `<div class="stack">${items
    .map(
      (item) =>
        `<div class="card"><h4>${esc(item.title)}</h4><p>${esc(item.summary)}</p><p class="muted" style="margin-top:8px;">${esc(item.artifactOrOutcome)}</p></div>`,
    )
    .join("")}</div>`;
}

function renderTeamTable(items: Array<Required<RfpTeamRole>>) {
  return joinHtml([
    '<table class="team-table">',
    "<thead><tr><th>Role</th><th>Responsibility</th><th>Staffing Note</th></tr></thead>",
    "<tbody>",
    items
      .map(
        (item) =>
          `<tr><td><strong>${esc(item.title)}</strong></td><td>${esc(item.responsibility)}</td><td>${esc(item.staffingModelNote)}</td></tr>`,
      )
      .join(""),
    "</tbody>",
    "</table>",
  ]);
}

function renderTechnologyTable(items: Array<Required<RfpTechnologyLayer>>) {
  return joinHtml([
    '<table class="tech-table">',
    "<thead><tr><th>Layer</th><th>Purpose</th><th>Validation Needed</th></tr></thead>",
    "<tbody>",
    items
      .map(
        (item) =>
          `<tr><td><strong>${esc(item.layer)}</strong></td><td>${esc(item.purpose)}</td><td>${esc(item.validationNeeded)}</td></tr>`,
      )
      .join(""),
    "</tbody>",
    "</table>",
  ]);
}

function renderScopePhaseCards(items: RfpProposalNormalized["scopePhases"]) {
  return `<div class="grid-2">${items
    .map(
      (phase) =>
        `<div class="soft-card phase-card"><div class="phase-meta">${esc(phase.timing)}</div><h4>${esc(phase.name)}</h4><p>${esc(phase.objective)}</p>${bulletList(phase.deliverables)}</div>`,
    )
    .join("")}</div>`;
}

function renderPricingTable(items: Array<Required<RfpPricingLineItem>>) {
  return joinHtml([
    '<table class="pricing-table">',
    "<thead><tr><th>Line Item</th><th>Value</th><th>Assumptions</th></tr></thead>",
    "<tbody>",
    items
      .map(
        (item) =>
          `<tr><td><strong>${esc(item.label)}</strong>${item.optional ? '<br><span class="muted">Optional add-on</span>' : ""}</td><td>${esc(item.value)}</td><td>${item.assumptions.length ? item.assumptions.map((entry) => esc(entry)).join("<br>") : '<span class="muted">No additional assumptions stated.</span>'}</td></tr>`,
      )
      .join(""),
    "</tbody>",
    "</table>",
  ]);
}

function renderSupportTable(
  tiers: RfpProposalNormalized["supportTiers"],
  hourlySupport: RfpProposalNormalized["hourlySupport"],
) {
  return joinHtml([
    '<table class="support-table">',
    "<thead><tr><th>Support Tier</th><th>Value</th><th>Included Services</th></tr></thead>",
    "<tbody>",
    tiers
      .map(
        (tier) =>
          `<tr><td><strong>${esc(tier.name)}</strong><br><span class="muted">${esc(tier.availability)}</span></td><td>${esc(tier.value)}</td><td>${tier.includedServices.map((entry) => esc(entry)).join("<br>")}</td></tr>`,
      )
      .join(""),
    hourlySupport
      ? `<tr><td><strong>${esc(hourlySupport.label)}</strong></td><td>${esc(hourlySupport.value)}</td><td>${hourlySupport.assumptions.map((entry) => esc(entry)).join("<br>")}</td></tr>`
      : "",
    "</tbody>",
    "</table>",
  ]);
}

function renderInfoChecklist(items: Array<Required<RfpInformationNeededItem>>) {
  return `<ul class="checklist">${items
    .map(
      (item) =>
        `<li><div><strong>${esc(item.label)}</strong><br><span class="muted">${esc(item.type)}</span> ${esc(item.reason)}</div></li>`,
    )
    .join("")}</ul>`;
}

function buildProposalHtml(normalized: RfpProposalNormalized) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(
    normalized.renderMode === "final" ? new Date() : new Date(),
  );

  const pages: string[] = [];

  const coverPage = joinHtml([
    '<section class="page cover">',
    '<div class="cover-shell">',
    '<div class="cover-top">',
    `<img class="cover-logo" src="${LOGO_URL}" alt="Senna Automation">`,
    '<div class="cover-mark">Proposal response</div>',
    "</div>",
    '<div class="cover-body">',
    `<div class="eyebrow">${esc(normalized.coverEyebrow)}</div>`,
    `<h1>${esc(normalized.coverTitle)}</h1>`,
    `<p class="cover-subtitle">${esc(normalized.coverSubtitle)}</p>`,
    '<div class="meta-grid">',
    `<div class="meta-card"><div class="meta-label">Prepared for</div><div class="meta-value">${esc(normalized.issuerName)}</div></div>`,
    `<div class="meta-card"><div class="meta-label">Opportunity</div><div class="meta-value">${esc(normalized.opportunityTitle)}</div></div>`,
    '<div class="meta-card"><div class="meta-label">Focus</div><div class="meta-value">Workflow automation, phased delivery, and commercial completeness</div></div>',
    "</div>",
    "</div>",
    `<div class="cover-footer">${esc(formattedDate)}</div>`,
    "</div>",
    "</section>",
  ]);

  pages.push(
    buildPage(
      2,
      "Executive Summary",
      joinHtml([
        '<div class="body-copy">',
        '<h2 class="section-title">Executive Summary</h2>',
        paragraphBlock(normalized.executiveSummary),
        "</div>",
        `<div class="note-band" style="margin-top:0.14in;"><strong>Objective:</strong> ${esc(normalized.scopeSummary)}</div>`,
      ]),
      normalized.footerLine,
    ),
  );

  pages.push(
    buildPage(
      3,
      "Compliance Matrix and Understanding of Need",
      joinHtml([
        '<div class="grid-2">',
        `<div class="stack"><h2 class="section-title">Compliance Matrix</h2><p class="section-intro">This page maps the buyer’s requested response items to the sections that address them.</p>${renderComplianceTable(normalized.complianceItems)}</div>`,
        `<div class="stack"><h2 class="section-title">Priority Workflow Areas</h2><p class="section-intro">These are the highest-value areas to validate and improve first.</p>${renderPriorityCards(normalized.understandingPriorities)}</div>`,
        "</div>",
      ]),
      normalized.footerLine,
    ),
  );

  pages.push(
    buildPage(
      4,
      "Company Overview, Relevant Experience, and Team Roles",
      joinHtml([
        '<div class="grid-2">',
        `<div class="stack"><div class="body-copy"><h2 class="section-title">Company Overview</h2>${paragraphBlock(normalized.companyOverview)}</div>${renderExperienceCards(normalized.relevantExperienceExamples)}</div>`,
        `<div class="stack"><div class="body-copy"><h2 class="section-title">Project Team and Roles</h2><p class="section-intro">The default staffing model is senior-led and role-based. It does not imply a larger named team than exists.</p></div>${renderTeamTable(normalized.teamRoles)}</div>`,
        "</div>",
      ]),
      normalized.footerLine,
    ),
  );

  pages.push(
    buildPage(
      5,
      "Proposed Approach and Technology Architecture",
      joinHtml([
        `<h2 class="section-title">Proposed Approach</h2>`,
        `<p class="section-intro">${esc(normalized.approachSummary)}</p>`,
        `<div class="note-band" style="margin-bottom:0.14in;">${esc("Final platform recommendations should be confirmed after validating current systems, API access, data quality, staffing ownership, and reporting needs.")}</div>`,
        renderTechnologyTable(normalized.technologyLayers),
      ]),
      normalized.footerLine,
    ),
  );

  pages.push(
    buildPage(
      6,
      "Scope of Work and Phased Timeline",
      joinHtml([
        `<h2 class="section-title">Scope of Work and Phased Timeline</h2>`,
        `<p class="section-intro">${esc(normalized.scopeSummary)}</p>`,
        renderScopePhaseCards(normalized.scopePhases),
      ]),
      normalized.footerLine,
    ),
  );

  pages.push(
    buildPage(
      7,
      "Pricing, Assumptions, and Optional Add-Ons",
      joinHtml([
        `<h2 class="section-title">Pricing, Assumptions, and Optional Add-Ons</h2>`,
        `<p class="section-intro">${esc(normalized.pricingSummary)}</p>`,
        renderPricingTable(normalized.pricingLineItems),
      ]),
      normalized.footerLine,
    ),
  );

  pages.push(
    buildPage(
      8,
      "Ongoing Support and Information Needed",
      joinHtml([
        '<div class="grid-2">',
        `<div class="stack"><h2 class="section-title">Ongoing Support</h2><p class="section-intro">${esc(normalized.supportSummary)}</p>${renderSupportTable(normalized.supportTiers, normalized.hourlySupport)}</div>`,
        `<div class="stack"><h2 class="section-title">Information and Access Needed</h2><p class="section-intro">This checklist answers the buyer’s request for the information, access, and resources needed to start well.</p>${renderInfoChecklist(normalized.informationNeeded)}<div class="soft-card"><h4>Questions To Confirm</h4>${bulletList(normalized.questionsToConfirm)}</div></div>`,
        "</div>",
      ]),
      normalized.footerLine,
    ),
  );

  return joinHtml([
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${esc(normalized.coverTitle)}</title>`,
    `<link rel="icon" href="${FAVICON_URL}">`,
    `<style>${css}</style>`,
    "</head>",
    "<body>",
    coverPage,
    ...pages,
    "</body>",
    "</html>",
  ]);
}

function buildProposalText(normalized: RfpProposalNormalized) {
  return [
    normalized.coverTitle,
    normalized.coverSubtitle,
    normalized.coverEyebrow,
    "",
    "Executive Summary",
    ...normalized.executiveSummary,
    "",
    "Compliance Matrix",
    ...normalized.complianceItems.map(
      (item) =>
        `- ${item.requirement} | ${item.responseSection} | ${item.status} | ${item.evidence}`,
    ),
    "",
    "Priority Workflow Areas",
    ...normalized.understandingPriorities.map(
      (item) => `- ${item.name} (${item.priority}): ${item.rationale}`,
    ),
    "",
    "Company Overview",
    ...normalized.companyOverview,
    "",
    "Relevant Experience",
    ...normalized.relevantExperienceExamples.map(
      (item) =>
        `- ${item.title}: ${item.summary} Outcome: ${item.artifactOrOutcome}`,
    ),
    "",
    "Project Team and Roles",
    ...normalized.teamRoles.map(
      (item) =>
        `- ${item.title}: ${item.responsibility} Staffing note: ${item.staffingModelNote}`,
    ),
    "",
    "Technology Architecture",
    ...normalized.technologyLayers.map(
      (item) =>
        `- ${item.layer}: ${item.purpose} Validation: ${item.validationNeeded}`,
    ),
    "",
    "Scope of Work and Phased Timeline",
    normalized.scopeSummary,
    ...normalized.scopePhases.map(
      (phase) =>
        `- ${phase.timing} ${phase.name}: ${phase.objective} Deliverables: ${phase.deliverables.join(", ")}`,
    ),
    "",
    "Pricing, Assumptions, and Optional Add-Ons",
    normalized.pricingSummary,
    ...normalized.pricingLineItems.map(
      (item) =>
        `- ${item.label}: ${item.value} Assumptions: ${item.assumptions.join("; ")}`,
    ),
    "",
    "Ongoing Support",
    normalized.supportSummary,
    ...normalized.supportTiers.map(
      (tier) =>
        `- ${tier.name}: ${tier.value} Services: ${tier.includedServices.join(", ")}`,
    ),
    normalized.hourlySupport
      ? `- ${normalized.hourlySupport.label}: ${normalized.hourlySupport.value}`
      : "",
    "",
    "Information and Access Needed",
    ...normalized.informationNeeded.map(
      (item) => `- ${item.label} (${item.type}): ${item.reason}`,
    ),
    "",
    "Questions To Confirm",
    ...normalized.questionsToConfirm.map((item) => `- ${item}`),
  ]
    .filter(Boolean)
    .join("\n");
}

export function renderRfpProposal(input: RfpRenderInput): RfpRenderResult {
  const normalized = normalizeRfpProposalInput(input);
  const proposalHtml = buildProposalHtml(normalized);
  const proposalText = buildProposalText(normalized);

  return {
    proposalHtml,
    proposalText,
    downloadFileName: `${slugify(
      input.downloadBaseName || normalized.downloadBaseName,
    )}.pdf`,
    status: "success",
    schemaVersion: normalized.schemaVersion,
    renderMode: normalized.renderMode,
    normalized,
    previewWarnings: normalized.previewWarnings,
    readiness: normalized.readiness,
  };
}

const basePreviewPayload: RfpRenderInput = {
  schemaVersion: "rfp-proposal-v2",
  renderMode: "preview",
  opportunityType: "workflow-automation-small",
  pricingProfileKey: "workflow-automation-small",
  opportunityTitle: "CEO & Management Roundtable Program Process Automation",
  issuerName: "Grand Rapids Chamber",
  downloadBaseName: "grand-rapids-chamber-roundtable-program-automation-proposal",
  notes:
    "Keep the response delivery-oriented, buyer-compliant, and vendor-neutral on tools until system constraints are validated.",
  responseTone: "professional",
  rfpText:
    "The Grand Rapids Chamber is seeking support to redesign and improve workflows for its CEO & Management Roundtable program, including participant intake, membership validation, placement decisions, communications, CRM synchronization, reporting, additional seat invoicing triggers, and operational consistency as the program grows.",
  proposalText:
    "The Roundtable program has reached a scale where the buyer needs a proposal that addresses compliance, technology architecture, team roles, commercial structure, and access requirements directly.",
  hasExistingProposal: true,
  hintAreas: DEFAULT_PRIORITY_AREAS.map((item) => item.name),
  staffingNotes: [
    "One accountable senior lead remains responsible for delivery, decision coordination, and final recommendations.",
    "The same senior lead may cover design and implementation architecture for contained scopes.",
    "Specialist support is added only if confirmed implementation requires deeper CRM, finance, integration, or custom software work.",
  ],
  technologyContextOverrides: [
    "Confirm the current application form, required fields, and how the Chamber accesses intake records today.",
    "Confirm the current CRM, member data ownership model, and whether entitlement records already exist.",
    "Confirm whether the Chamber prefers a dedicated workflow layer or CRM-native automation for first release orchestration.",
    "Confirm current communication templates, sender ownership, and approval needs.",
    "Confirm how additional seat billing is handled and whether finance prefers direct triggers or review queues.",
    "Confirm which exception and reporting metrics leadership wants to monitor after launch.",
  ],
  rfpBrief: {
    opportunityName: "CEO & Management Roundtable Program Process Automation",
    issuerName: "Grand Rapids Chamber",
    issuerContext:
      "Regional chamber of commerce managing a large roundtable program with membership, placement, communication, finance, and reporting handoffs.",
    rawSummary:
      "The Chamber needs a buyer-ready proposal for redesigning and improving manual roundtable program workflows. The current operating model includes intake, membership entitlement validation, participant placement, competitor conflict review, communications, CRM synchronization, additional seat invoicing support, and reporting visibility.",
    businessGoals: [
      "Reduce administrative burden",
      "Improve workflow consistency and visibility",
      "Create a phased path toward practical automation",
    ],
    deliverablesRequested: [
      "Approach to manual process improvement",
      "Suggested technologies or platforms",
      "Project team roles and experience",
      "Scope pricing and support pricing",
      "Timing and required access",
    ],
    currentStateSignals: [
      "Manual coordination across application, member validation, placement, communications, and billing steps",
      "CRM synchronization gaps",
      "Reporting and handoff inconsistency",
    ],
    systemsMentioned: ["CRM", "External application", "Finance workflow", "Reporting tools"],
    likelyStakeholders: [
      "Program administration",
      "Membership team",
      "Finance",
      "Communications",
      "Technical or CRM owner",
    ],
    methodologySignals: [
      "Discovery",
      "Process mapping",
      "Implementation planning",
      "Phased rollout",
    ],
    opportunityAreas: DEFAULT_PRIORITY_AREAS.map((item) => item.name),
    timelineSignals: ["Phased delivery", "Implementation after validation"],
    pricingSignals: [
      "Pricing for the scope with assumptions",
      "Ongoing support pricing",
    ],
    evaluationCriteria: [
      "Buyer alignment",
      "Operational practicality",
      "Commercial completeness",
    ],
    constraints: [
      "Do not invent systems that have not been confirmed.",
      "Preserve staff judgment where business-rule exceptions still matter.",
    ],
    requestedResponseItems: [
      "Company overview and similar experience",
      "Approach to manual process improvement",
      "Suggested technologies or platforms",
      "Project team roles and experience",
      "Scope of work",
      "Pricing and assumptions",
      "Ongoing support and pricing",
      "Timing and phasing",
      "Information and access needed",
    ],
    requiredAccessItems: DEFAULT_INFORMATION_NEEDED.map((item) => item.label),
    technologyItemsRequested: [
      "Suggested technologies or platforms",
      "Technology architecture recommendation",
    ],
    technologyConstraints: [
      "Final platform recommendations depend on the current CRM, external application, finance tools, and API access.",
    ],
    teamRequirements: ["Project team roles and experience"],
    pricingRequired: true,
    supportPricingRequired: true,
    buyerTerminology: ["Roundtable", "CEO & Management", "Process Automation"],
    knownFacts: [
      "The program serves more than 500 participants across 38 groups.",
      "Membership entitlement matters for participation rights.",
    ],
    unansweredQuestions: DEFAULT_QUESTIONS,
  },
  proposal: {
    coverTitle: "CEO & Management Roundtable Program Process Automation",
    coverSubtitle:
      "Proposal to redesign and implement scalable workflows for intake, validation, CRM synchronization, communications, and finance handoffs",
    coverEyebrow: "Workflow Automation Proposal",
    executiveSummaryParagraphs: [
      "The Chamber’s CEO & Management Roundtable program has reached a scale where manual coordination across intake, member validation, placement, communications, reporting, and billing support creates unnecessary operating friction.",
      "Senna Automation proposes a phased workflow automation engagement that starts with rapid workflow validation, confirms the right architecture, and then moves into an initial implementation release focused on the highest-value operational constraints.",
      "The objective is not to replace staff judgment with generic tooling. The objective is to reduce duplicate entry, create cleaner system handoffs, standardize repeatable steps, and give staff better control over exceptions, finance triggers, and reporting visibility.",
      "This proposal is structured to answer the Chamber’s requested items directly, including technologies, staffing, pricing, support, timing, and the information needed to start the project with fewer surprises.",
    ],
    companyOverviewParagraphs: [
      "Senna Automation helps organizations improve operations through workflow automation, custom software, and practical systems integration.",
      "The delivery approach is grounded in how teams actually work: structured intake, source-of-truth alignment, exception handling, communication triggers, and reporting visibility that support real operating constraints.",
      "For this engagement, the recommended model is senior-led, phased, and implementation-minded from the start.",
    ],
    understandingPriorities: DEFAULT_PRIORITY_AREAS,
    relevantExperienceExamples: DEFAULT_EXPERIENCE_EXAMPLES,
    teamRoles: DEFAULT_TEAM_ROLES,
    technologyLayers: DEFAULT_TECHNOLOGY_LAYERS,
    scopePhases: DEFAULT_SCOPE_PHASES,
    informationNeeded: DEFAULT_INFORMATION_NEEDED,
    questionsToConfirm: DEFAULT_QUESTIONS,
  },
  review: {
    overallAssessment:
      "The response is moving in the right direction when compliance, pricing, technology architecture, and team roles are all handled explicitly.",
    winLikelihood: "medium-high",
    warnings: [
      {
        type: "weak_evidence",
        message:
          "Relevant experience should stay concrete and anonymized rather than drifting back into generic capability language.",
      },
    ],
  },
};

function cloneInput<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function createRfpPreviewInput(
  variant: RfpPreviewVariant = "balanced",
): RfpRenderInput {
  const payload = cloneInput(basePreviewPayload);

  if (variant === "dense") {
    payload.proposal = {
      ...payload.proposal,
      executiveSummaryParagraphs: [
        ...(payload.proposal?.executiveSummaryParagraphs || []),
        "The first implementation priority should be a cleaner intake-to-CRM flow with defined entitlement checks, staff exception review, communication triggers, and clearer handoffs into reporting and finance support.",
      ],
      understandingPriorities: [
        ...DEFAULT_PRIORITY_AREAS,
      ],
      questionsToConfirm: [
        ...DEFAULT_QUESTIONS,
        "Which current reports or spreadsheets are still mission-critical for staff during the transition to a future-state workflow?",
      ],
    };
  }

  if (variant === "sparse") {
    payload.proposal = {
      ...payload.proposal,
      executiveSummaryParagraphs: [
        "The Roundtable program appears to be at a scale where workflow structure matters more than ad hoc coordination.",
        "Senna Automation proposes a phased response that validates the operating model, confirms the right architecture, and then moves into an initial implementation release.",
        "The goal is to reduce duplicate effort, tighten system handoffs, and preserve staff control over exceptions.",
      ],
      companyOverviewParagraphs: [
        "Senna Automation helps organizations improve operations through workflow automation and practical systems integration.",
        "The delivery model is senior-led, phased, and designed to fit operational realities.",
      ],
    };
  }

  return payload;
}
