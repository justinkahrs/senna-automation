import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { JSDOM } from "jsdom";
import { load } from "js-yaml";

const GENERATED_REQUIRED_FIELDS = [
  "contentId",
  "contentType",
  "icp",
  "buyerStage",
  "problem",
  "workflow",
  "offer",
  "researchPacketId",
  "researchCheckedAt",
  "qaReportHash",
  "promptVersion",
  "researchHash",
  "opportunityFingerprint",
  "topicFingerprint",
];

const SHA256_PATTERN = /^[a-f0-9]{64}$/i;
const ROI_MODEL_PATTERN =
  /<!--\s*senna-roi-model-v1:([\s\S]*?)-->/i;
const SAFE_MERMAID_START = /^\s*(?:flowchart|graph)\s+(?:TB|TD|BT|RL|LR)\b/i;
const UNSAFE_MERMAID_PATTERN =
  /%%\{|\bclick\b|<\/?[a-z][^>]*>|javascript\s*:|\bon[a-z]+\s*=/i;

const STOP_WORDS = new Set(
  "a an and are as at be been but by can do for from had has have how i if in into is it its may more most not of on one or our should so than that the their them then there these they this to up us was we were what when where which who will with would you your".split(
    " ",
  ),
);

const META_SEO_PATTERNS = [
  /commercial intent/i,
  /local visibility/i,
  /local[- ]pack competition/i,
  /search results behind this topic/i,
  /rank(?:ing)? for (?:this|the) keyword/i,
  /keyword opportunity/i,
];

const FRONT_MATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const LEGACY_CONTENT_CUTOFF = new Date("2026-07-27T23:59:59Z");

let mermaidValidatorPromise;

function installValidationDom() {
  if (globalThis.window?.document) return;
  const dom = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "https://www.senna-automation.com/",
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: dom.window.navigator,
  });
  globalThis.Node = dom.window.Node;
  globalThis.Element = dom.window.Element;
  globalThis.HTMLElement = dom.window.HTMLElement;
  globalThis.SVGElement = dom.window.SVGElement;
}

async function getMermaidValidator() {
  if (!mermaidValidatorPromise) {
    installValidationDom();
    mermaidValidatorPromise = import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        suppressErrorRendering: true,
        flowchart: { htmlLabels: false },
      });
      return mermaid;
    });
  }
  return mermaidValidatorPromise;
}

export function parseBlogFile(fileContents, filename = "article.md") {
  const match = fileContents.match(FRONT_MATTER_PATTERN);
  if (!match) {
    return { filename, data: {}, body: fileContents };
  }

  return {
    filename,
    data: load(match[1]) || {},
    body: fileContents.slice(match[0].length),
  };
}

function markdownToWords(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[^a-zA-Z0-9'-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function lexicalVector(markdown) {
  const frequencies = new Map();
  for (const word of markdownToWords(markdown)) {
    const token = word.toLowerCase();
    if (token.length < 3 || STOP_WORDS.has(token)) continue;
    frequencies.set(token, (frequencies.get(token) || 0) + 1);
  }
  return frequencies;
}

export function cosineSimilarity(leftMarkdown, rightMarkdown) {
  const left = lexicalVector(leftMarkdown);
  const right = lexicalVector(rightMarkdown);
  let dotProduct = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (const frequency of left.values()) leftMagnitude += frequency ** 2;
  for (const frequency of right.values()) rightMagnitude += frequency ** 2;
  for (const [token, frequency] of left.entries()) {
    dotProduct += frequency * (right.get(token) || 0);
  }

  if (!leftMagnitude || !rightMagnitude) return 0;
  return dotProduct / Math.sqrt(leftMagnitude * rightMagnitude);
}

function uniqueExternalLinks(body) {
  const links = body.match(/https?:\/\/[^\s)>"']+/g) || [];
  return [...new Set(links.map((link) => link.replace(/[.,;:]+$/, "")))];
}

function parseNumber(value) {
  const cleaned = String(value ?? "")
    .replace(/[$,%]/g, "")
    .replace(/,/g, "")
    .trim();
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : NaN;
}

function nearlyEqual(actual, expected) {
  return (
    Number.isFinite(actual) &&
    Math.abs(actual - expected) <= Math.max(0.05, Math.abs(expected) * 0.01)
  );
}

export function parseRoiModel(body) {
  const match = body.match(ROI_MODEL_PATTERN);
  if (!match) return null;
  try {
    return JSON.parse(match[1].trim());
  } catch {
    return null;
  }
}

function validateRoiModel(filename, body) {
  const errors = [];
  const model = parseRoiModel(body);
  const scenarios = Array.isArray(model?.scenarios) ? model.scenarios : [];
  if (scenarios.length !== 3) {
    return [`${filename}: missing a valid senna-roi-model-v1 contract.`];
  }

  const expectedNames = new Set(["low", "base", "high"]);
  for (const scenario of scenarios) {
    const name = normalized(scenario?.name);
    if (!expectedNames.delete(name)) {
      errors.push(`${filename}: ROI model has an invalid or duplicate scenario name.`);
      continue;
    }

    const transactions = parseNumber(scenario.transactions_per_month);
    const minutes = parseNumber(scenario.minutes_saved_per_transaction);
    const laborRate = parseNumber(scenario.loaded_labor_rate);
    const baselineRework = parseNumber(
      scenario.baseline_monthly_error_rework_cost,
    );
    const reductionRate = parseNumber(scenario.error_rework_reduction_rate);
    const errorSavings = parseNumber(scenario.monthly_error_savings);
    const implementation = parseNumber(scenario.implementation_cost);
    const maintenance = parseNumber(scenario.monthly_maintenance);
    const monthlyBenefit = parseNumber(scenario.monthly_benefit);
    const annualBenefit = parseNumber(scenario.annual_benefit);
    const firstYearNet = parseNumber(scenario.first_year_net);
    const payback = parseNumber(scenario.payback_months);

    const inputs = [
      transactions,
      minutes,
      laborRate,
      baselineRework,
      reductionRate,
      implementation,
      maintenance,
    ];
    if (
      inputs.some((value) => !Number.isFinite(value) || value < 0) ||
      transactions <= 0 ||
      minutes <= 0 ||
      laborRate <= 0 ||
      reductionRate > 1
    ) {
      errors.push(`${filename}: ${name} ROI assumptions are invalid.`);
      continue;
    }

    const calculatedErrorSavings = baselineRework * reductionRate;
    const calculatedMonthlyBenefit =
      (transactions * minutes * laborRate) / 60 + calculatedErrorSavings;
    const calculatedAnnualBenefit = calculatedMonthlyBenefit * 12;
    const calculatedFirstYearNet =
      (calculatedMonthlyBenefit - maintenance) * 12 - implementation;
    const calculatedPayback =
      calculatedMonthlyBenefit > maintenance
        ? implementation / (calculatedMonthlyBenefit - maintenance)
        : 999;
    const checks = [
      ["monthly error/rework savings", errorSavings, calculatedErrorSavings],
      ["monthly benefit", monthlyBenefit, calculatedMonthlyBenefit],
      ["annual benefit", annualBenefit, calculatedAnnualBenefit],
      ["first-year net", firstYearNet, calculatedFirstYearNet],
      ["payback", payback, calculatedPayback],
    ];
    for (const [label, actual, expected] of checks) {
      if (!nearlyEqual(actual, expected)) {
        errors.push(`${filename}: ${name} ROI ${label} is mathematically incorrect.`);
      }
    }

    const scenarioRow = body
      .split(/\r?\n/)
      .find((line) => new RegExp(`^\\|\\s*${name}\\s*\\|`, "i").test(line));
    if (!scenarioRow) {
      errors.push(`${filename}: ROI table is missing the ${name} row.`);
      continue;
    }
    const visibleNumbers = scenarioRow
      .split("|")
      .flatMap((cell) => cell.match(/-?\$?[\d,]+(?:\.\d+)?%?/g) || [])
      .map(parseNumber)
      .filter(Number.isFinite);
    const visibleExpectations = [
      transactions,
      minutes,
      laborRate,
      baselineRework,
      reductionRate * 100,
      errorSavings,
      implementation,
      maintenance,
      monthlyBenefit,
      annualBenefit,
      firstYearNet,
      payback,
    ];
    if (
      visibleExpectations.some(
        (expected) => !visibleNumbers.some((actual) => nearlyEqual(actual, expected)),
      )
    ) {
      errors.push(
        `${filename}: ${name} ROI row does not disclose every validated assumption and result.`,
      );
    }
  }

  return errors;
}

function validateSourceUrls(filename, body) {
  const errors = [];
  const links = uniqueExternalLinks(body);
  for (const link of links) {
    try {
      const url = new URL(link);
      const hostname = url.hostname.toLowerCase();
      if (
        url.protocol !== "https:" ||
        hostname === "localhost" ||
        hostname.endsWith(".example") ||
        hostname.startsWith("example.") ||
        /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname) ||
        /\/example(?:[-_/]|$)/i.test(url.pathname) ||
        /(^|\.)google\.[a-z.]+$/.test(hostname) && url.pathname.startsWith("/search")
      ) {
        errors.push(`${filename}: invalid evidence URL ${link}.`);
      }
    } catch {
      errors.push(`${filename}: invalid evidence URL ${link}.`);
    }
  }
  return errors;
}

function validateTraceabilityAndPrivacy(filename, body) {
  const errors = [];
  const proseWithoutUrls = body.replace(/https?:\/\/[^\s)>"']+/g, "");
  const identifyingPatterns = [
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
    /\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/,
    /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i,
    /\b(?:auto-qualified|score[- ]?75|ICP scor(?:e|ing)|qualified prospect|CRM evidence excerpt)\b/i,
    /\b(?:our|a) (?:client|customer) (?:achieved|saved|reduced|increased|reported)\b/i,
  ];
  for (const pattern of identifyingPatterns) {
    if (pattern.test(proseWithoutUrls)) {
      errors.push(`${filename}: contains identifying or internal research language (${pattern}).`);
    }
  }

  const paragraphs = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(ROI_MODEL_PATTERN, "")
    .split(/\n\s*\n/);
  for (const paragraph of paragraphs) {
    const statistic = /\b\d+(?:\.\d+)?\s*%|\b\$[\d,.]+\b/.test(paragraph);
    const exempt = /illustrative|hypothetical|assum(?:e|ption)|example|ROI model/i.test(
      paragraph,
    ) || paragraph.trim().startsWith("|");
    if (statistic && !exempt && !/https:\/\/|\]\(https:\/\//.test(paragraph)) {
      errors.push(`${filename}: numerical claim lacks an inline source or illustrative label.`);
      break;
    }
  }
  if (
    /\b(?:guarantee[sd]?|will)\b[^.!?\n]{0,80}\b(?:save|reduce|increase|return)\b[^.!?\n]{0,40}\d+(?:\.\d+)?\s*%/i.test(
      body,
    )
  ) {
    errors.push(`${filename}: contains a performance guarantee.`);
  }
  return errors;
}

function normalized(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function topicFingerprint(article) {
  const { data } = article;
  return [
    data.icp,
    (data.cohorts || []).map(normalized).sort().join(","),
    data.buyerStage,
    data.problem,
    data.workflow,
  ]
    .map(normalized)
    .join("|");
}

export function validateGeneratedArticle(article, corpus = []) {
  const errors = [];
  const { data, body, filename } = article;

  if (!data.contentId) return errors;

  for (const field of GENERATED_REQUIRED_FIELDS) {
    if (typeof data[field] !== "string" || !data[field].trim()) {
      errors.push(`${filename}: missing required generated-content field "${field}".`);
    }
  }

  for (const field of [
    "qaReportHash",
    "researchHash",
    "opportunityFingerprint",
    "topicFingerprint",
  ]) {
    if (!SHA256_PATTERN.test(data[field] || "")) {
      errors.push(`${filename}: "${field}" must be a SHA-256 digest.`);
    }
  }

  if (!Number.isFinite(data.qaScore) || data.qaScore < 85 || data.qaScore > 100) {
    errors.push(`${filename}: "qaScore" must be between 85 and 100.`);
  }

  if (!Array.isArray(data.cohorts) || data.cohorts.length === 0) {
    errors.push(`${filename}: "cohorts" must contain at least one cohort.`);
  }

  for (const field of ["date", "researchCheckedAt"]) {
    if (Number.isNaN(new Date(data[field]).getTime())) {
      errors.push(`${filename}: "${field}" must be a valid date.`);
    }
  }

  const publishedAt = new Date(data.date);
  const researchCheckedAt = new Date(data.researchCheckedAt);
  if (
    !Number.isNaN(publishedAt.getTime()) &&
    !Number.isNaN(researchCheckedAt.getTime())
  ) {
    const evidenceAgeDays =
      (publishedAt.getTime() - researchCheckedAt.getTime()) /
      (24 * 60 * 60 * 1000);
    if (evidenceAgeDays < -1 || evidenceAgeDays > 90) {
      errors.push(
        `${filename}: research must be checked no more than 90 days before publication.`,
      );
    }
  }

  if (data.offer !== "workflow-bottleneck-review") {
    errors.push(
      `${filename}: generated articles must use the workflow-bottleneck-review offer.`,
    );
  }

  const wordCount = markdownToWords(body).length;
  if (wordCount < 1000 || wordCount > 1500) {
    errors.push(`${filename}: body has ${wordCount} words; expected 1000–1500.`);
  }

  const mermaidBlocks = Array.from(
    body.matchAll(/```mermaid\s*\n([\s\S]*?)```/gi),
  );
  if (mermaidBlocks.length !== 1) {
    errors.push(`${filename}: expected exactly one Mermaid workflow diagram.`);
  } else if (
    !SAFE_MERMAID_START.test(mermaidBlocks[0][1]) ||
    UNSAFE_MERMAID_PATTERN.test(mermaidBlocks[0][1])
  ) {
    errors.push(`${filename}: Mermaid diagram uses unsafe or unsupported syntax.`);
  }

  const hasRoiScenarios = ["low", "base", "high"].every((scenario) =>
    new RegExp(`^\\|[^\\n]*${scenario}[^\\n]*\\|`, "im").test(body),
  );
  if (!hasRoiScenarios) {
    errors.push(`${filename}: ROI table must include low, base, and high rows.`);
  }

  errors.push(...validateRoiModel(filename, body));

  if (!/\billustrative\b/i.test(body)) {
    errors.push(`${filename}: ROI example must be labeled illustrative.`);
  }

  const roiInputs = [
    ["transaction volume", /(?:transaction|request|job|quote|registration) volume/i],
    ["minutes saved", /minutes? saved/i],
    ["loaded labor rate", /loaded labor rate/i],
    ["error or rework reduction", /(?:error|rework) reduction/i],
    ["implementation cost", /implementation cost/i],
    ["maintenance", /maintenance/i],
  ];
  for (const [label, pattern] of roiInputs) {
    if (!pattern.test(body)) errors.push(`${filename}: ROI model omits ${label}.`);
  }

  const operationalTerms = [
    ["trigger", /\btrigger\b/i],
    ["inputs", /\binputs?\b/i],
    ["rules", /\brules?\b/i],
    ["exceptions", /\bexceptions?\b/i],
    ["owner", /\bowner(?:ship)?\b/i],
    ["source of truth", /source of truth/i],
  ];
  for (const [label, pattern] of operationalTerms) {
    if (!pattern.test(body)) {
      errors.push(`${filename}: workflow explanation omits ${label}.`);
    }
  }

  const sourceCount = uniqueExternalLinks(body).length;
  if (sourceCount < 3 || sourceCount > 6) {
    errors.push(`${filename}: found ${sourceCount} external sources; expected 3–6.`);
  }
  errors.push(...validateSourceUrls(filename, body));
  errors.push(...validateTraceabilityAndPrivacy(filename, body));

  for (const pattern of META_SEO_PATTERNS) {
    if (pattern.test(body)) {
      errors.push(`${filename}: contains buyer-facing meta-SEO language (${pattern}).`);
    }
  }

  if (/\bcase stud(?:y|ies)\b/i.test(body)) {
    errors.push(`${filename}: labels illustrative material as a case study.`);
  }

  for (const other of corpus) {
    if (other.filename === filename) continue;
    const similarity = cosineSimilarity(body, other.body);
    if (similarity > 0.55) {
      errors.push(
        `${filename}: lexical similarity ${similarity.toFixed(3)} exceeds 0.55 against ${other.filename}.`,
      );
    }
  }

  return errors;
}

export function validateGeneratedPortfolio(articles) {
  const errors = [];
  const generated = articles.filter((article) => article.data.contentId);
  const contentIds = new Map();
  const fingerprints = new Map();

  for (const article of generated) {
    const contentId = normalized(article.data.contentId);
    const fingerprint = topicFingerprint(article);
    if (contentIds.has(contentId)) {
      errors.push(
        `${article.filename}: duplicate contentId also used by ${contentIds.get(contentId)}.`,
      );
    }
    contentIds.set(contentId, article.filename);

    if (fingerprint && fingerprints.has(fingerprint)) {
      errors.push(
        `${article.filename}: repeated topic fingerprint also used by ${fingerprints.get(fingerprint)}.`,
      );
    }
    fingerprints.set(fingerprint, article.filename);
  }

  const byDate = [...generated]
    .map((article) => ({ article, date: new Date(article.data.date) }))
    .filter(({ date }) => !Number.isNaN(date.getTime()))
    .sort((left, right) => left.date.getTime() - right.date.getTime());
  const monthlyCounts = new Map();

  for (let index = 0; index < byDate.length; index += 1) {
    const current = byDate[index];
    const month = current.article.data.date.slice(0, 7);
    monthlyCounts.set(month, (monthlyCounts.get(month) || 0) + 1);
    if (monthlyCounts.get(month) > 2) {
      errors.push(`${current.article.filename}: more than two generated posts in ${month}.`);
    }

    if (index > 0) {
      const prior = byDate[index - 1];
      const days =
        (current.date.getTime() - prior.date.getTime()) / (24 * 60 * 60 * 1000);
      if (days < 14) {
        errors.push(
          `${current.article.filename}: published ${days.toFixed(1)} days after ${prior.article.filename}; minimum is 14 days.`,
        );
      }

      const priorCohorts = new Set(
        (prior.article.data.cohorts || []).map(normalized),
      );
      const repeatedCohort = (current.article.data.cohorts || []).find((cohort) =>
        priorCohorts.has(normalized(cohort)),
      );
      if (repeatedCohort) {
        errors.push(
          `${current.article.filename}: cohort "${repeatedCohort}" also appears in the immediately prior generated article.`,
        );
      }
    }
  }

  return errors;
}

export function validateDirectory(contentDirectory) {
  const articles = fs
    .readdirSync(contentDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) =>
      parseBlogFile(
        fs.readFileSync(path.join(contentDirectory, filename), "utf8"),
        filename,
      ),
    );
  const generated = articles.filter((article) => article.data.contentId);
  const baseSha = process.env.CONTENT_BASE_SHA?.trim();
  let addedBlogFiles = new Set();
  if (baseSha) {
    const output = execFileSync(
      "git",
      [
        "diff",
        "--diff-filter=A",
        "--name-only",
        baseSha,
        "HEAD",
        "--",
        "src/content/blog/*.md",
      ],
      { cwd: process.cwd(), encoding: "utf8" },
    );
    addedBlogFiles = new Set(
      output
        .split(/\r?\n/)
        .filter(Boolean)
        .map((filename) => path.basename(filename)),
    );
  }
  const unclassifiedNewContentErrors = articles.flatMap((article) => {
    if (article.data.contentId) return [];
    if (addedBlogFiles.has(article.filename)) {
      return [
        `${article.filename}: newly added blog files require generated-content metadata.`,
      ];
    }
    const publishedAt = new Date(article.data.date);
    if (!Number.isNaN(publishedAt.getTime()) && publishedAt <= LEGACY_CONTENT_CUTOFF) {
      return [];
    }
    return [
      `${article.filename}: content after the legacy cutoff requires generated-content metadata.`,
    ];
  });
  const errors = [
    ...generated.flatMap((article) =>
      validateGeneratedArticle(article, articles),
    ),
    ...validateGeneratedPortfolio(articles),
    ...unclassifiedNewContentErrors,
  ];
  return { articles, generated, errors };
}

export async function validateMermaidSyntax(articles) {
  const errors = [];
  const mermaid = await getMermaidValidator();
  for (const article of articles.filter((entry) => entry.data.contentId)) {
    const blocks = Array.from(
      article.body.matchAll(/```mermaid\s*\n([\s\S]*?)```/gi),
    );
    if (blocks.length !== 1) continue;
    try {
      await mermaid.parse(blocks[0][1], { suppressErrors: false });
    } catch {
      errors.push(`${article.filename}: Mermaid workflow does not compile.`);
    }
  }
  return errors;
}

export async function validateExternalSources(articles) {
  const errors = [];
  const links = [
    ...new Set(
      articles
        .filter((article) => article.data.contentId)
        .flatMap((article) => uniqueExternalLinks(article.body)),
    ),
  ];
  for (const link of links) {
    let response;
    try {
      response = await fetch(link, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(12_000),
        headers: { "User-Agent": "Senna-Content-Validator/1.0" },
      });
      if (response.status === 405) {
        response = await fetch(link, {
          method: "GET",
          redirect: "follow",
          signal: AbortSignal.timeout(12_000),
          headers: {
            "User-Agent": "Senna-Content-Validator/1.0",
            Range: "bytes=0-1023",
          },
        });
      }
    } catch {
      errors.push(`Evidence source is unreachable: ${link}`);
      continue;
    }
    if (
      !(response.status >= 200 && response.status < 400) &&
      response.status !== 401 &&
      response.status !== 403
    ) {
      errors.push(`Evidence source returned HTTP ${response.status}: ${link}`);
    }
  }
  return errors;
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const contentDirectory = path.join(process.cwd(), "src/content/blog");
  const result = validateDirectory(contentDirectory);
  result.errors.push(...(await validateMermaidSyntax(result.articles)));
  if (process.env.VALIDATE_CONTENT_LINKS === "true") {
    result.errors.push(...(await validateExternalSources(result.articles)));
  }
  if (result.errors.length) {
    console.error(result.errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(
      `Validated ${result.generated.length} generated article(s); ${result.articles.length - result.generated.length} legacy article(s) remain backward-compatible.`,
    );
  }
}
