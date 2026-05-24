#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const siteConfig = require("../site.config.json");

const siteUrl = siteConfig.siteUrl.replace(/\/$/, "");
const siteHost = new URL(siteUrl).host;
const indexNowKey = siteConfig.indexNowKey;
const keyLocation = `${siteUrl}/${indexNowKey}.txt`;
const endpoint = "https://api.indexnow.org/indexnow";

function getAllSiteUrls() {
  const urls = [
    siteUrl,
    `${siteUrl}/about`,
    `${siteUrl}/services`,
    `${siteUrl}/solutions`,
    `${siteUrl}/pricing`,
    `${siteUrl}/contact`,
    `${siteUrl}/blog`,
  ];

  const blogDir = path.join(process.cwd(), "src/content/blog");
  if (fs.existsSync(blogDir)) {
    fs.readdirSync(blogDir)
      .filter((filename) => filename.endsWith(".md"))
      .sort()
      .forEach((filename) => {
        urls.push(`${siteUrl}/blog/${filename.replace(/\.md$/, "")}`);
      });
  }

  return urls;
}

function normalizeInputUrl(input) {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input;
  }

  const pathPart = input.startsWith("/") ? input : `/${input}`;
  return `${siteUrl}${pathPart}`;
}

function parseArgs(argv) {
  const dryRun = argv.includes("--dry-run");
  const submitAll = argv.includes("--all");
  const positional = argv.filter((arg) => !arg.startsWith("--"));

  if (submitAll) {
    return { dryRun, urls: getAllSiteUrls() };
  }

  return { dryRun, urls: positional.map(normalizeInputUrl) };
}

async function main() {
  const { dryRun, urls } = parseArgs(process.argv.slice(2));
  const uniqueUrls = [...new Set(urls)];

  if (!uniqueUrls.length) {
    console.error(
      "Usage: npm run indexnow:submit -- --all [--dry-run] OR npm run indexnow:submit -- /path/to/page",
    );
    process.exit(1);
  }

  const invalidUrl = uniqueUrls.find((url) => new URL(url).host !== siteHost);
  if (invalidUrl) {
    throw new Error(`IndexNow URL does not belong to ${siteHost}: ${invalidUrl}`);
  }

  const payload = {
    host: siteHost,
    key: indexNowKey,
    keyLocation,
    urlList: uniqueUrls,
  };

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`IndexNow submission failed: ${response.status} ${body}`);
  }

  console.log(`Submitted ${uniqueUrls.length} URL(s) to IndexNow.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
