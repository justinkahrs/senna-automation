import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

function humanize(segment) {
  if (!segment) return "";

  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function groupPages(pages, maxPerSection) {
  const sections = new Map();

  for (const { pathname } of pages) {
    const clean = pathname.replace(/^\/+|\/+$/g, "");
    if (clean.startsWith("404") || clean.startsWith("500")) continue;

    const segments = clean.split("/").filter(Boolean);
    const section = segments.length > 1 ? humanize(segments[0]) : "Pages";
    const title = humanize(segments[segments.length - 1] || "Home") || "Home";

    if (!sections.has(section)) sections.set(section, []);

    const entries = sections.get(section);
    if (entries.length < maxPerSection) {
      entries.push({ title, pathname: clean });
    }
  }

  return [...sections.entries()].sort(([a], [b]) =>
    a === "Pages" ? -1 : b === "Pages" ? 1 : a.localeCompare(b),
  );
}

function buildLlmsTxt({ siteName, description, siteUrl, pages, maxPerSection }) {
  const lines = [`# ${siteName}`, ""];

  if (description) {
    lines.push(`> ${description}`, "");
  }

  for (const [section, entries] of groupPages(pages, maxPerSection)) {
    lines.push(`## ${section}`, "");

    for (const { title, pathname } of entries) {
      const url = pathname ? `${siteUrl}/${pathname}/` : `${siteUrl}/`;
      lines.push(`- [${title}](${url})`);
    }

    lines.push("");
  }

  lines.push(
    "Generated at build time by astro-geoready. Audit this site: https://geoready.dev",
  );

  return `${lines.join("\n")}\n`;
}

function buildAiTxt({ siteName, siteUrl }) {
  return [
    `# ai.txt - AI crawler guidance for ${siteName}`,
    "# Spec: https://site.spawning.ai/spawning-ai-txt",
    "",
    "User-Agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    `LLMs: ${siteUrl}/llms.txt`,
    "",
  ].join("\n");
}

function buildSummaryJson({ siteName, description, siteUrl, pages }) {
  return (
    JSON.stringify(
      {
        name: siteName,
        description: description || undefined,
        url: siteUrl,
        pages_count: pages.length,
        llms_txt: `${siteUrl}/llms.txt`,
        generated_by: "astro-geoready",
        generated_at: new Date().toISOString(),
      },
      null,
      2,
    ) + "\n"
  );
}

export default function geoReady(options = {}) {
  const {
    siteName,
    description = "",
    llmsTxt = true,
    aiDiscovery = true,
    overwrite = false,
    maxPerSection = 20,
  } = options;

  let siteUrl = "";

  async function emit(dirPath, relative, content, logger) {
    const target = path.join(dirPath, relative);

    if (!overwrite && existsSync(target)) {
      logger.info(
        `${relative} already exists - skipped (set overwrite: true to regenerate)`,
      );
      return;
    }

    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content, "utf-8");
    logger.info(`generated ${relative}`);
  }

  return {
    name: "astro-geoready",
    hooks: {
      "astro:config:done": ({ config }) => {
        siteUrl = (config.site || "").replace(/\/+$/, "");
      },
      "astro:build:done": async ({ pages, dir, logger }) => {
        if (!siteUrl) {
          logger.warn(
            "`site` is not set in astro.config - skipping (absolute URLs are required)",
          );
          return;
        }

        const dirPath = fileURLToPath(dir);
        const name = siteName || new URL(siteUrl).hostname;
        const context = {
          siteName: name,
          description,
          siteUrl,
          pages,
          maxPerSection,
        };

        if (llmsTxt) {
          await emit(dirPath, "llms.txt", buildLlmsTxt(context), logger);
        }

        if (aiDiscovery) {
          await emit(
            dirPath,
            path.join(".well-known", "ai.txt"),
            buildAiTxt(context),
            logger,
          );
          await emit(
            dirPath,
            path.join("ai", "summary.json"),
            buildSummaryJson(context),
            logger,
          );
        }
      },
    },
  };
}
