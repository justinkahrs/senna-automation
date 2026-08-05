import assert from "node:assert/strict";
import test from "node:test";

import {
  cosineSimilarity,
  parseBlogFile,
  validateGeneratedArticle,
  validateGeneratedPortfolio,
  validateMermaidSyntax,
} from "../scripts/validate-blog-content.mjs";

function generatedArticle(overrides = {}) {
  const filler = Array.from({ length: 70 }, () =>
    "The operations team reviews each queued request, resolves unusual exceptions, and records the final decision in the shared system.",
  ).join(" ");
  const roiModel = {
    version: "senna-roi-model-v1",
    scenarios: [
      {
        name: "low",
        transactions_per_month: 100,
        minutes_saved_per_transaction: 5,
        loaded_labor_rate: 30,
        baseline_monthly_error_rework_cost: 500,
        error_rework_reduction_rate: 0.1,
        monthly_labor_savings: 250,
        monthly_error_savings: 50,
        implementation_cost: 3000,
        monthly_maintenance: 50,
        monthly_benefit: 300,
        annual_benefit: 3600,
        first_year_net: 0,
        payback_months: 12,
      },
      {
        name: "base",
        transactions_per_month: 200,
        minutes_saved_per_transaction: 7.5,
        loaded_labor_rate: 35,
        baseline_monthly_error_rework_cost: 1000,
        error_rework_reduction_rate: 0.15,
        monthly_labor_savings: 875,
        monthly_error_savings: 150,
        implementation_cost: 6000,
        monthly_maintenance: 100,
        monthly_benefit: 1025,
        annual_benefit: 12300,
        first_year_net: 5100,
        payback_months: 6.4864864865,
      },
      {
        name: "high",
        transactions_per_month: 300,
        minutes_saved_per_transaction: 10,
        loaded_labor_rate: 40,
        baseline_monthly_error_rework_cost: 1500,
        error_rework_reduction_rate: 0.2,
        monthly_labor_savings: 2000,
        monthly_error_savings: 300,
        implementation_cost: 9000,
        monthly_maintenance: 150,
        monthly_benefit: 2300,
        annual_benefit: 27600,
        first_year_net: 16800,
        payback_months: 4.1860465116,
      },
    ],
  };
  const body = overrides.body || `
## Workflow

For CNC machine shops and contract manufacturers, the RFQ trigger receives drawing and quantity inputs from the estimator. Business rules route normal work while exceptions return to a named owner and the CRM remains the source of truth.

\`\`\`mermaid
flowchart LR
  A["Customer RFQ arrives with drawings"] --> B["Capture material, quantity, and due date"]
  B --> C{"Drawing or tolerance exception?"}
  C --> D["Create estimator task with a due time"]
  C --> E["Route drawing exception to engineering"]
  D --> F["Write quote status to the CRM"]
  E --> F
\`\`\`

## Illustrative ROI model

This illustrative model discloses transaction volume, minutes saved, loaded labor rate, baseline error or rework cost, error or rework reduction, implementation cost, and monthly maintenance.

[[ROI_SENSITIVITY]]

Sources: [SBA](https://www.sba.gov/), [NIST](https://www.nist.gov/), and [BLS](https://www.bls.gov/).

${filler}
`;

  return {
    filename: overrides.filename || "generated.md",
    data: {
      title: "A focused workflow guide",
      excerpt: "CNC machine shops can route drawing exceptions without losing quote ownership.",
      image: "https://images.pexels.com/photos/123456/pexels-photo-123456.jpeg",
      imageAlt: "Estimator reviewing a CNC part drawing",
      imageCredit: "Example Photographer on Pexels",
      imageSource: "https://www.pexels.com/photo/example-cnc-workflow-123456/",
      date: overrides.date || "2026-08-05",
      contentId: overrides.contentId || "cnt_test_001",
      contentType: "workflow-guide",
      icp: "manufacturing",
      cohorts: ["cnc"],
      buyerStage: "problem-aware",
      problem: overrides.problem || "slow rfq intake",
      workflow: "rfq intake and exception routing",
      offer: "workflow-bottleneck-review",
      researchPacketId: "research_test_001",
      researchCheckedAt: "2026-08-02",
      qaScore: 92,
      qaReportHash: "a".repeat(64),
      promptVersion: "senna-article-v1",
      researchHash: "b".repeat(64),
      opportunityFingerprint: "c".repeat(64),
      topicFingerprint: "d".repeat(64),
      roiModel,
      ...overrides.data,
    },
    body,
  };
}

test("generated article contract accepts a complete workflow guide", () => {
  const article = generatedArticle();
  assert.deepEqual(validateGeneratedArticle(article, []), []);
});

test("Mermaid validation compiles generated flowcharts in Node", async () => {
  assert.deepEqual(await validateMermaidSyntax([generatedArticle()]), []);
  const invalid = generatedArticle({
    filename: "invalid-mermaid.md",
    body: generatedArticle().body.replace(
      'A["Customer RFQ arrives with drawings"]',
      'A["Customer RFQ arrives with drawings"',
    ),
  });
  assert.deepEqual(await validateMermaidSyntax([invalid]), [
    "invalid-mermaid.md: Mermaid workflow does not compile.",
  ]);
});

test("similarity detector rejects repeated framing above the threshold", () => {
  const first = generatedArticle();
  const second = generatedArticle({
    filename: "near-duplicate.md",
    contentId: "cnt_test_002",
    problem: "late rfq routing",
  });
  assert.ok(cosineSimilarity(first.body, second.body) > 0.99);
  assert.ok(
    validateGeneratedArticle(second, [first]).some((error) =>
      error.includes("lexical similarity"),
    ),
  );
});

test("deterministic hard failures reject bad ROI, unsafe diagrams, and invalid evidence", () => {
  const valid = generatedArticle();
  const invalid = generatedArticle({
    filename: "invalid.md",
    contentId: "cnt_test_bad",
    body: valid.body
      .replace("flowchart LR", "flowchart LR\n  click A javascript:alert(1)")
      .replace("https://www.sba.gov/", "https://www.sba.gov/example-fake")
      .concat("\nA qualified prospect reported a 97% guaranteed reduction.\n"),
    data: {
      roiModel: {
        ...valid.data.roiModel,
        scenarios: valid.data.roiModel.scenarios.map((scenario) =>
          scenario.name === "low" ? { ...scenario, monthly_benefit: 99999 } : scenario,
        ),
      },
    },
  });
  const errors = validateGeneratedArticle(invalid, []);
  assert.ok(errors.some((error) => error.includes("mathematically incorrect")));
  assert.ok(errors.some((error) => error.includes("unsafe")));
  assert.ok(errors.some((error) => error.includes("invalid evidence URL")));
  assert.ok(errors.some((error) => error.includes("internal research language")));
  assert.ok(errors.some((error) => error.includes("numerical claim")));
});

test("portfolio contract rejects duplicate topics and short cadence", () => {
  const first = generatedArticle();
  const second = generatedArticle({
    filename: "second.md",
    contentId: "cnt_test_002",
    date: "2026-08-12",
  });
  const errors = validateGeneratedPortfolio([first, second]);
  assert.ok(errors.some((error) => error.includes("repeated topic fingerprint")));
  assert.ok(errors.some((error) => error.includes("minimum is 14 days")));
  assert.ok(errors.some((error) => error.includes("immediately prior")));
});

test("legacy frontmatter remains valid without generated fields", () => {
  const article = parseBlogFile("---\ntitle: Legacy\n---\nLegacy body", "legacy.md");
  assert.deepEqual(validateGeneratedArticle(article, []), []);
});

test("cadence is enforced across month boundaries", () => {
  const first = generatedArticle({ date: "2026-01-21" });
  const validNext = generatedArticle({
    filename: "february-valid.md",
    contentId: "cnt_feb_valid",
    date: "2026-02-04",
    problem: "service scheduling",
    data: { cohorts: ["field_service"] },
  });
  assert.equal(
    validateGeneratedPortfolio([first, validNext]).some((error) =>
      error.includes("minimum is 14 days"),
    ),
    false,
  );

  const tooSoon = generatedArticle({
    filename: "february-too-soon.md",
    contentId: "cnt_feb_soon",
    date: "2026-02-03",
    problem: "service scheduling",
    data: { cohorts: ["field_service"] },
  });
  assert.ok(
    validateGeneratedPortfolio([first, tooSoon]).some((error) =>
      error.includes("minimum is 14 days"),
    ),
  );
});

test("presentation QA rejects exposed machine metadata and fallback imagery", () => {
  const article = generatedArticle({
    filename: "presentation-defects.md",
    body: `${generatedArticle().body}\n<!-- senna-roi-model-v1:{"scenarios":[]} -->`,
    data: { image: "/og/default.png" },
  });
  const errors = validateGeneratedArticle(article, []);
  assert.ok(errors.some((error) => error.includes("machine metadata")));
  assert.ok(errors.some((error) => error.includes("non-fallback hero image")));
});

test("presentation QA rejects generic diagrams and mobile-hostile tables", () => {
  const article = generatedArticle({
    filename: "generic-presentation.md",
    body: generatedArticle().body
      .replace('A["Customer RFQ arrives with drawings"]', 'A["Operational trigger"]')
      .concat("\n| A | B | C | D | E | F | G | H |\n|---|---|---|---|---|---|---|---|\n"),
  });
  const errors = validateGeneratedArticle(article, []);
  assert.ok(errors.some((error) => error.includes("generic placeholder labels")));
  assert.ok(errors.some((error) => error.includes("seven columns")));
});

test("children's-activity content must explain the audience and family context up front", () => {
  const article = generatedArticle({
    filename: "missing-cohort-context.md",
    data: {
      icp: "high_volume_services",
      cohorts: ["childrens_activities"],
      title: "A better customer handoff",
      excerpt: "A practical workflow for a busy service operation.",
    },
  });
  assert.ok(
    validateGeneratedArticle(article, []).some((error) =>
      error.includes("family-account context"),
    ),
  );
});
