import type {
  RfpBrief,
  RfpProposalReview,
  RfpReadinessIssue,
  RfpRenderInput,
} from "@/lib/rfp-proposal-renderer";

export type RfpPromptStageId =
  | "textBrief"
  | "fileBrief"
  | "proposal"
  | "review"
  | "secondPass";

export interface RfpPromptStageView {
  id: RfpPromptStageId;
  label: string;
  description: string;
  instructions?: string;
  prompt: string;
}

export interface RfpPromptPack {
  textBriefInstructions: string;
  textBriefPrompt: string;
  fileBriefInstructions: string;
  fileBriefPrompt: string;
  proposalInstructions: string;
  proposalPrompt: string;
  reviewInstructions: string;
  reviewPrompt: string;
  secondPassNotes: string;
}

interface RfpSecondPassInput {
  notes?: string;
  review?: RfpProposalReview;
}

const TEXT_BRIEF_INSTRUCTIONS =
  "You extract buyer requirements and known facts from RFP material. Return JSON only.";

const FILE_BRIEF_INSTRUCTIONS =
  "You extract buyer requirements and known facts from uploaded RFP files. Return JSON only.";

const PROPOSAL_INSTRUCTIONS =
  "You draft structured Senna proposal content for an RFP response. Return JSON only. Do not invent pricing or placeholder commercial language.";

const REVIEW_INSTRUCTIONS =
  "You evaluate a draft RFP response for compliance, credibility, and readiness. Return JSON only.";

const DEFAULT_HINT_AREAS = [
  "CRM synchronization",
  "Membership entitlement validation",
  "Additional seat invoicing triggers",
  "Lifecycle communications",
  "Placement and competitor conflict review",
];

const collapseWhitespace = (value: unknown) =>
  String(value ?? "").replace(/\s+/g, " ").trim();

const uniqueStrings = (value: unknown) => {
  const seen = new Set<string>();
  return Array.isArray(value)
    ? value
        .map((entry) => collapseWhitespace(entry))
        .filter(Boolean)
        .filter((entry) => {
          const key = entry.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
    : [];
};

const stableStringify = (value: unknown) => JSON.stringify(value ?? {}, null, 2);

const getNormalizedContext = (input: RfpRenderInput) => ({
  schemaVersion: input.schemaVersion || "rfp-proposal-v1",
  renderMode: input.renderMode || "preview",
  opportunityType: collapseWhitespace(input.opportunityType),
  pricingProfileKey: collapseWhitespace(input.pricingProfileKey),
  opportunityTitle: collapseWhitespace(input.opportunityTitle) || "RFP response draft",
  issuerName: collapseWhitespace(input.issuerName) || "Prospective client",
  notes: collapseWhitespace(input.notes),
  responseTone: collapseWhitespace(input.responseTone) || "professional",
  rfpText: String(input.rfpText || "").trim(),
  fileName: collapseWhitespace(input.fileName),
  fileMime: collapseWhitespace(input.fileMime),
  fileExtension: collapseWhitespace(input.fileExtension),
  hintAreas: uniqueStrings(input.hintAreas).length
    ? uniqueStrings(input.hintAreas)
    : DEFAULT_HINT_AREAS,
  proposalText: String(input.proposalText || "").trim(),
  hasExistingProposal: Boolean(input.hasExistingProposal),
});

const getStructuredBrief = (brief: RfpBrief | undefined) => ({
  opportunityName: collapseWhitespace(brief?.opportunityName),
  issuerName: collapseWhitespace(brief?.issuerName),
  issuerContext: collapseWhitespace(brief?.issuerContext),
  rawSummary: collapseWhitespace(brief?.rawSummary),
  businessGoals: uniqueStrings(brief?.businessGoals),
  deliverablesRequested: uniqueStrings(brief?.deliverablesRequested),
  currentStateSignals: uniqueStrings(brief?.currentStateSignals),
  systemsMentioned: uniqueStrings(brief?.systemsMentioned),
  likelyStakeholders: uniqueStrings(brief?.likelyStakeholders),
  methodologySignals: uniqueStrings(brief?.methodologySignals),
  opportunityAreas: uniqueStrings(brief?.opportunityAreas),
  timelineSignals: uniqueStrings(brief?.timelineSignals),
  pricingSignals: uniqueStrings(brief?.pricingSignals),
  evaluationCriteria: uniqueStrings(brief?.evaluationCriteria),
  constraints: uniqueStrings(brief?.constraints),
  requestedResponseItems: Array.isArray(brief?.requestedResponseItems)
    ? brief?.requestedResponseItems
    : [],
  requiredAccessItems: uniqueStrings(brief?.requiredAccessItems),
  technologyItemsRequested: uniqueStrings(brief?.technologyItemsRequested),
  technologyConstraints: uniqueStrings(brief?.technologyConstraints),
  teamRequirements: uniqueStrings(brief?.teamRequirements),
  pricingRequired: Boolean(brief?.pricingRequired),
  supportPricingRequired: Boolean(brief?.supportPricingRequired),
  buyerTerminology: uniqueStrings(brief?.buyerTerminology),
  knownFacts: uniqueStrings(brief?.knownFacts),
  unansweredQuestions: uniqueStrings(brief?.unansweredQuestions),
});

function getExtractionSchemaNotes() {
  return [
    "Return JSON with these keys:",
    '- "opportunityName": string',
    '- "issuerName": string',
    '- "issuerContext": string',
    '- "rawSummary": string',
    '- "businessGoals": string[]',
    '- "deliverablesRequested": string[]',
    '- "currentStateSignals": string[]',
    '- "systemsMentioned": string[]',
    '- "likelyStakeholders": string[]',
    '- "methodologySignals": string[]',
    '- "opportunityAreas": string[]',
    '- "timelineSignals": string[]',
    '- "pricingSignals": string[]',
    '- "evaluationCriteria": string[]',
    '- "constraints": string[]',
    '- "requestedResponseItems": [{ "requirement": string, "notes": string, "required": boolean }]',
    '- "requiredAccessItems": string[]',
    '- "technologyItemsRequested": string[]',
    '- "technologyConstraints": string[]',
    '- "teamRequirements": string[]',
    '- "pricingRequired": boolean',
    '- "supportPricingRequired": boolean',
    '- "buyerTerminology": string[]',
    '- "knownFacts": string[]',
    '- "unansweredQuestions": string[]',
  ].join("\n");
}

export function buildTextBriefPrompt(input: RfpRenderInput) {
  const context = getNormalizedContext(input);

  return [
    "Review the following RFP source material and extract buyer requirements and known facts only.",
    "",
    "Return only valid JSON that matches the requested schema.",
    "",
    "Extraction rules:",
    "- Do not propose a Senna response strategy in this stage.",
    "- Do not invent names, budgets, dates, systems, platforms, staffing, or outcomes.",
    "- If the RFP asks for suggested technologies or platforms, record that request under technologyItemsRequested rather than inventing a recommendation.",
    "- If the RFP asks for team roles or experience, record the request under teamRequirements rather than inventing team details.",
    "- If the RFP asks for pricing or support pricing, mark the boolean flags and capture the requirement text directly.",
    "- Keep rawSummary to 120-180 words.",
    "- Capture buyer terminology exactly when it changes how the response should read.",
    "",
    getExtractionSchemaNotes(),
    "",
    "Context:",
    `Opportunity title: ${context.opportunityTitle}`,
    `Issuer name: ${context.issuerName}`,
    `Additional notes: ${context.notes || "None provided."}`,
    "",
    "RFP source text:",
    context.rfpText,
  ].join("\n");
}

export function buildFileBriefPrompt(input: RfpRenderInput) {
  const context = getNormalizedContext(input);

  return [
    "Review the attached RFP file and extract buyer requirements and known facts only.",
    "",
    "Return only valid JSON that matches the requested schema.",
    "",
    "Extraction rules:",
    "- Do not invent technologies, staffing, pricing, support tiers, or implementation commitments.",
    "- If the RFP asks for suggested technologies or platforms, capture the request without choosing tools.",
    "- If the RFP asks for pricing, support pricing, team roles, or access needs, capture those items explicitly.",
    "- Treat requested response items as buyer compliance requirements, not proposal sections.",
    "- Keep rawSummary to 120-180 words.",
    "",
    getExtractionSchemaNotes(),
    "",
    "Context:",
    `Opportunity title: ${context.opportunityTitle}`,
    `Issuer name: ${context.issuerName}`,
    `Uploaded file name: ${context.fileName || "unknown file"}`,
    `Uploaded file type: ${context.fileMime || context.fileExtension || "unknown"}`,
    `Additional notes: ${context.notes || "None provided."}`,
    "",
    "Give extra attention to workflow pain points, response-item checklists, commercial requirements, access requirements, and any buyer terminology that changes how the response should be framed.",
  ].join("\n");
}

export function buildProposalPrompt(input: RfpRenderInput) {
  const context = getNormalizedContext(input);
  const brief = getStructuredBrief(input.rfpBrief);

  return [
    "Write structured proposal content for Senna Automation.",
    "",
    "Senna Automation context:",
    "- Senna Automation provides AI workflow automation, custom software, and operations consulting.",
    "- The response must feel implementation-minded and buyer-compliant, not like a strategy memo.",
    "- Discovery may appear as Phase 1, but the cover and section structure must signal delivery.",
    "- The application, not the model, owns final pricing values and pricing-profile numbers.",
    "",
    "Return JSON only with a top-level proposal object.",
    "",
    "Required section structure inside the proposal content:",
    "1. Cover",
    "2. Executive Summary",
    "3. Compliance Matrix and Understanding of Need",
    "4. Company Overview, Relevant Experience, and Team Roles",
    "5. Proposed Approach and Technology Architecture",
    "6. Scope of Work and Phased Timeline",
    "7. Pricing, Assumptions, and Optional Add-Ons",
    "8. Ongoing Support and Information Needed",
    "",
    "Required proposal fields:",
    '- "coverTitle": string',
    '- "coverSubtitle": string',
    '- "coverEyebrow": string',
    '- "executiveSummaryParagraphs": string[]',
    '- "companyOverviewParagraphs": string[]',
    '- "complianceItems": [{ "requirement": string, "responseSection": string, "status": "covered" | "partially_covered" | "missing" | "not_applicable", "evidence": string }]',
    '- "understandingPriorities": [{ "name": string, "rationale": string, "priority": string }]',
    '- "relevantExperienceExamples": [{ "title": string, "summary": string, "artifactOrOutcome": string }]',
    '- "teamRoles": [{ "title": string, "responsibility": string, "staffingModelNote": string }]',
    '- "technologyLayers": [{ "layer": string, "purpose": string, "validationNeeded": string }]',
    '- "scopePhases": [{ "name": string, "objective": string, "deliverables": string[], "timing": string }]',
    '- "informationNeeded": [{ "label": string, "type": string, "reason": string }]',
    '- "questionsToConfirm": string[]',
    "",
    "Client-facing non-negotiables:",
    '- Never output "pricing to be confirmed", "TBD", "pending", or "available upon request".',
    '- Never use "Discovery-Led Proposal". Use "Workflow Automation Proposal" or equivalent delivery language.',
    '- Never use "Open Questions" as a section label. Use "Information and Access Needed".',
    '- Never use "MVP Implementation" unless the buyer terminology explicitly uses "MVP". Prefer "Initial Implementation Release".',
    "- Do not invent exact pricing values or support values. The application injects those commercially-owned numbers.",
    "- If named client references are unavailable, use anonymized relevant-experience examples instead of unsupported claims.",
    "- Do not mention layout, rendering, PDF mechanics, page counts, or internal workflow steps.",
    "",
    "Length and cap rules:",
    "- understandingPriorities: maximum 5 items.",
    "- technologyLayers: maximum 6 items.",
    "- teamRoles: maximum 5 items.",
    "- scopePhases: maximum 5 items.",
    "- questionsToConfirm: maximum 5 items.",
    "",
    "Content rules:",
    "- Executive summary should read like a strong buyer-facing business case, not a generic transformation pitch.",
    "- Compliance items must follow the buyer's requested-item order when present.",
    "- Technology layers must stay vendor-neutral unless the brief clearly names or constrains the tools.",
    "- Team roles must stay role-based and safe. Do not imply a larger named team than exists.",
    "- Pricing section language may describe assumptions and optional add-ons, but do not fabricate numeric prices.",
    "- Information needed should answer the buyer's resource and access request directly with a checklist-style orientation.",
    "",
    "Normalized intake context:",
    stableStringify({
      schemaVersion: context.schemaVersion,
      renderMode: context.renderMode,
      opportunityType: context.opportunityType,
      pricingProfileKey: context.pricingProfileKey,
      opportunityTitle: context.opportunityTitle,
      issuerName: context.issuerName,
      notes: context.notes,
      responseTone: context.responseTone,
      hintAreas: context.hintAreas,
    }),
    "",
    "Structured RFP brief:",
    stableStringify(brief),
    "",
    "Return JSON only.",
  ].join("\n");
}

export function buildReviewPrompt(input: RfpRenderInput) {
  const context = getNormalizedContext(input);
  const brief = getStructuredBrief(input.rfpBrief);

  return [
    "Review the draft RFP response as an experienced proposal evaluator.",
    "",
    "Return JSON only.",
    "",
    "Your evaluation priorities, in order:",
    "1. Compliance with requested buyer response items",
    "2. Commercial completeness",
    "3. Credibility of technology architecture and team roles",
    "4. Strength of executive summary and buyer alignment",
    "5. Specificity of experience evidence",
    "",
    "Rules:",
    "- Do not invent capabilities, pricing, staffing, technology facts, or client references.",
    "- If pricing or support pricing is missing, call that out explicitly as a blocking issue.",
    "- If team roles or technology architecture are missing when requested, call that out explicitly as a blocking issue.",
    "- Flag weak evidence when the company overview sounds generic or unsupported.",
    "- Return structured readiness output, not prose only.",
    "",
    "Required JSON fields:",
    '- "overallAssessment": string',
    '- "winLikelihood": string',
    '- "strengthsToPreserve": string[]',
    '- "weaknessesToFix": string[]',
    '- "mustEmphasize": string[]',
    '- "mustAvoid": string[]',
    '- "executiveSummaryDirective": string',
    '- "companyOverviewDirective": string',
    '- "methodologyDirective": string',
    '- "opportunityAreasDirective": string',
    '- "scopeDirective": string',
    '- "redraftDirectives": string',
    '- "readyForFinal": boolean',
    '- "blockingIssues": [{ "type": string, "message": string }]',
    '- "warnings": [{ "type": string, "message": string }]',
    "",
    `Proposal source: ${context.hasExistingProposal ? "Existing piped proposal output" : "Fresh first-pass draft generated in this workflow"}`,
    `Opportunity title: ${context.opportunityTitle || "Unknown opportunity"}`,
    `Issuer name: ${context.issuerName || "Unknown issuer"}`,
    `Original internal notes: ${context.notes || "None provided."}`,
    "",
    "Structured RFP brief:",
    stableStringify(brief),
    "",
    "Extracted proposal text for backup context:",
    context.proposalText || "No extracted proposal text available.",
  ].join("\n");
}

function pushIssueSection(
  lines: string[],
  label: string,
  issues: RfpReadinessIssue[] | undefined,
) {
  const cleaned = Array.isArray(issues)
    ? issues
        .map((issue) => ({
          type: collapseWhitespace(issue.type),
          message: collapseWhitespace(issue.message),
        }))
        .filter((issue) => issue.message)
    : [];

  if (!cleaned.length) return;
  lines.push(`${label}:`);
  for (const issue of cleaned) {
    lines.push(`- ${issue.type || "issue"}: ${issue.message}`);
  }
  lines.push("");
}

export function buildSecondPassNotes(input: RfpSecondPassInput) {
  const review = input.review || {};
  const originalNotes = String(input.notes || "").trim();
  const lines: string[] = [];
  const pushSection = (label: string, values: unknown) => {
    const cleaned = (Array.isArray(values) ? values : [values])
      .map((entry) => collapseWhitespace(entry))
      .filter(Boolean);
    if (!cleaned.length) return;
    lines.push(`${label}:`);
    for (const entry of cleaned) lines.push(`- ${entry}`);
    lines.push("");
  };

  if (originalNotes) {
    lines.push("Original internal notes:");
    lines.push(originalNotes);
    lines.push("");
  }

  lines.push("Second-pass proposal optimization guidance:");
  lines.push(
    "Strengthen the response while staying truthful to the RFP and preserving compliance-first structure.",
  );
  lines.push("");
  pushSection("Strengths to preserve", review.strengthsToPreserve);
  pushSection("Weaknesses to fix", review.weaknessesToFix);
  pushSection("Must emphasize", review.mustEmphasize);
  pushSection("Must avoid", review.mustAvoid);
  pushSection("Executive summary direction", review.executiveSummaryDirective);
  pushSection("Company overview direction", review.companyOverviewDirective);
  pushSection("Methodology direction", review.methodologyDirective);
  pushSection("Priority areas direction", review.opportunityAreasDirective);
  pushSection("Scope and pricing direction", review.scopeDirective);
  pushSection("Overall review", review.overallAssessment);
  pushSection("Additional redraft directives", review.redraftDirectives);
  pushIssueSection(lines, "Blocking issues", review.blockingIssues);
  pushIssueSection(lines, "Warnings", review.warnings);
  lines.push(
    `Ready for final: ${review.readyForFinal === true ? "yes" : "no"}`,
  );
  lines.push(
    `Win likelihood target: ${collapseWhitespace(review.winLikelihood) || "unknown"}`,
  );

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function buildRfpPromptPack(input: RfpRenderInput): RfpPromptPack {
  return {
    textBriefInstructions: TEXT_BRIEF_INSTRUCTIONS,
    textBriefPrompt: buildTextBriefPrompt(input),
    fileBriefInstructions: FILE_BRIEF_INSTRUCTIONS,
    fileBriefPrompt: buildFileBriefPrompt(input),
    proposalInstructions: PROPOSAL_INSTRUCTIONS,
    proposalPrompt: buildProposalPrompt(input),
    reviewInstructions: REVIEW_INSTRUCTIONS,
    reviewPrompt: buildReviewPrompt(input),
    secondPassNotes: buildSecondPassNotes({
      notes: input.notes,
      review: input.review,
    }),
  };
}

export function buildIntakePromptResponse(input: RfpRenderInput) {
  return {
    ...input,
    textBriefInstructions: TEXT_BRIEF_INSTRUCTIONS,
    fileBriefInstructions: FILE_BRIEF_INSTRUCTIONS,
    textBriefPrompt: buildTextBriefPrompt(input),
    fileBriefPrompt: buildFileBriefPrompt(input),
  };
}

export function buildProposalPromptResponse(input: RfpRenderInput) {
  return {
    ...input,
    proposalInstructions: PROPOSAL_INSTRUCTIONS,
    proposalPrompt: buildProposalPrompt(input),
  };
}

export function buildReviewPromptResponse(input: RfpRenderInput) {
  return {
    ...input,
    reviewInstructions: REVIEW_INSTRUCTIONS,
    reviewPrompt: buildReviewPrompt(input),
  };
}

export function buildSecondPassResponse(input: RfpSecondPassInput) {
  const review = input.review || {};

  return {
    notes: buildSecondPassNotes(input),
    validationSummary: collapseWhitespace(review.overallAssessment),
    winLikelihood: collapseWhitespace(review.winLikelihood),
    readiness: {
      readyForFinal: review.readyForFinal === true,
      blockingIssues: Array.isArray(review.blockingIssues)
        ? review.blockingIssues
        : [],
      warnings: Array.isArray(review.warnings) ? review.warnings : [],
    },
  };
}

export function getRfpPromptStageViews(
  input: RfpRenderInput,
): RfpPromptStageView[] {
  const pack = buildRfpPromptPack(input);

  return [
    {
      id: "textBrief",
      label: "Brief From Text",
      description: "Prompt used when pasted RFP text is provided.",
      instructions: pack.textBriefInstructions,
      prompt: pack.textBriefPrompt,
    },
    {
      id: "fileBrief",
      label: "Brief From File",
      description: "Prompt used when an uploaded RFP file is analyzed.",
      instructions: pack.fileBriefInstructions,
      prompt: pack.fileBriefPrompt,
    },
    {
      id: "proposal",
      label: "Proposal Draft",
      description: "Main drafting prompt for the v2 compliance-first response JSON.",
      instructions: pack.proposalInstructions,
      prompt: pack.proposalPrompt,
    },
    {
      id: "review",
      label: "Proposal Review",
      description: "Prompt used by the validator/improver pass against the proposal output.",
      instructions: pack.reviewInstructions,
      prompt: pack.reviewPrompt,
    },
    {
      id: "secondPass",
      label: "Second-Pass Notes",
      description: "Internal guidance synthesized from the review and fed back into the redraft.",
      prompt:
        pack.secondPassNotes ||
        "No second-pass review guidance is present in the current JSON payload.",
    },
  ];
}
