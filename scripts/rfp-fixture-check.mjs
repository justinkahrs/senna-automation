import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const moduleCache = new Map();

function resolveTsSpecifier(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.mjs`];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(`Unable to resolve ${specifier} from ${fromFile}`);
}

function loadTsModule(filePath) {
  const absolutePath = path.resolve(filePath);
  if (moduleCache.has(absolutePath)) {
    return moduleCache.get(absolutePath).exports;
  }

  const source = fs.readFileSync(absolutePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: absolutePath,
  });

  const module = { exports: {} };
  moduleCache.set(absolutePath, module);

  const localRequire = (specifier) => {
    if (specifier.startsWith(".")) {
      return loadTsModule(resolveTsSpecifier(absolutePath, specifier));
    }
    return require(specifier);
  };

  const evaluator = new Function(
    "require",
    "module",
    "exports",
    "__filename",
    "__dirname",
    transpiled.outputText,
  );

  evaluator(
    localRequire,
    module,
    module.exports,
    absolutePath,
    path.dirname(absolutePath),
  );

  return module.exports;
}

const { createRfpPreviewInput, renderRfpProposal } = loadTsModule(
  path.resolve("src/lib/rfp-proposal-renderer.ts"),
);

function containsMoney(value) {
  return /\$\s*\d/.test(value) || /\bIncluded\b/i.test(value);
}

function assertNoBannedLanguage(text) {
  const banned = [
    /pricing to be confirmed/i,
    /\bTBD\b/i,
    /\bpending\b/i,
    /available upon request/i,
    /Discovery-Led Proposal/i,
  ];
  for (const pattern of banned) {
    assert.equal(
      pattern.test(text),
      false,
      `Found banned language matching ${pattern}`,
    );
  }
}

function runV2FixtureAssertions() {
  const input = createRfpPreviewInput("balanced");
  input.renderMode = "final";
  const rendered = renderRfpProposal(input);

  assert.equal(rendered.normalized.schemaVersion, "rfp-proposal-v2");
  assert.equal(rendered.readiness.readyForFinal, true);
  assertNoBannedLanguage(rendered.proposalText);
  assert.ok(rendered.proposalHtml.includes("Compliance Matrix"));
  assert.equal(rendered.proposalHtml.includes(".grid-2{"), false);
  assert.ok(rendered.normalized.complianceItems.length > 0);
  assert.equal(
    rendered.normalized.complianceItems.length,
    rendered.normalized.complianceItems.filter((item) => item.requirement).length,
  );
  assert.ok(rendered.normalized.pricingLineItems.length > 0);
  assert.ok(rendered.normalized.supportTiers.length > 0);
  assert.ok(rendered.normalized.supportTiers.length <= 3);
  assert.ok(rendered.normalized.hourlySupport);
  assert.ok(
    rendered.normalized.pricingLineItems.every((item) =>
      containsMoney(item.value),
    ),
  );
  assert.ok(
    rendered.normalized.supportTiers.every((tier) => containsMoney(tier.value)),
  );
  assert.ok(containsMoney(rendered.normalized.hourlySupport.value));
  assert.ok(rendered.normalized.understandingPriorities.length <= 5);
  assert.ok(rendered.normalized.technologyLayers.length >= 4);
  assert.ok(rendered.normalized.teamRoles.length >= 2);
  assert.notEqual(
    rendered.normalized.coverEyebrow.toLowerCase(),
    "discovery-led proposal",
  );
  assert.equal(/\bMVP\b/.test(rendered.proposalText), false);
}

function runPreviewWarningAssertions() {
  const input = createRfpPreviewInput("balanced");
  input.renderMode = "preview";
  input.pricingProfileKey = "";
  input.opportunityType = "";
  input.commercialInputs = {};
  const rendered = renderRfpProposal(input);

  assert.equal(rendered.readiness.readyForFinal, false);
  assert.equal(rendered.readiness.blockingIssues.length, 0);
  assert.ok(rendered.readiness.warnings.length > 0);
  assert.ok(rendered.previewWarnings.length > 0);
}

function runLegacyV1Assertions() {
  const input = {
    renderMode: "final",
    opportunityType: "workflow-automation-small",
    pricingProfileKey: "workflow-automation-small",
    opportunityTitle: "Legacy Workflow Proposal",
    issuerName: "Legacy Client",
    downloadBaseName: "legacy-workflow-proposal",
    rfpBrief: {
      issuerName: "Legacy Client",
      opportunityName: "Legacy Workflow Proposal",
      requestedResponseItems: [
        { requirement: "Pricing and assumptions", required: true },
        { requirement: "Suggested technologies or platforms", required: true },
        { requirement: "Project team roles and experience", required: true },
      ],
      technologyItemsRequested: ["Suggested technologies or platforms"],
      teamRequirements: ["Project team roles and experience"],
      pricingRequired: true,
      supportPricingRequired: true,
      buyerTerminology: ["Workflow Automation"],
      unansweredQuestions: [
        "Which system is the current source of truth?",
      ],
    },
    proposal: {
      coverTitle: "Legacy Workflow Proposal",
      executiveSummaryParagraphs: [
        "Legacy v1 input still needs to normalize into the new renderer path.",
        "The proposal should remain commercially complete in final mode when a pricing profile is available.",
      ],
      companyOverviewParagraphs: [
        "Legacy company overview copy remains valid after normalization.",
      ],
      methodologyPhases: [
        {
          name: "Discovery and Validation",
          description:
            "Confirm the current process and document the future-state requirements.",
        },
        {
          name: "Implementation Planning",
          description:
            "Sequence the first implementation release and confirm dependencies.",
        },
      ],
      opportunityAreas: [
        {
          name: "CRM Synchronization",
          rationale: "Reduce duplicate entry and improve operational consistency.",
        },
        {
          name: "Communications",
          rationale: "Standardize participant and staff notifications.",
        },
      ],
    },
  };

  const rendered = renderRfpProposal(input);
  assert.equal(rendered.normalized.schemaVersion, "rfp-proposal-v2");
  assert.equal(rendered.readiness.readyForFinal, true);
  assert.ok(rendered.normalized.complianceItems.length >= 3);
  assert.ok(rendered.normalized.pricingLineItems.length > 0);
  assert.ok(rendered.normalized.technologyLayers.length >= 4);
}

runV2FixtureAssertions();
runPreviewWarningAssertions();
runLegacyV1Assertions();

console.log("RFP fixture assertions passed.");
