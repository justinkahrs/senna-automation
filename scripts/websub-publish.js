#!/usr/bin/env node

const siteConfig = require("../site.config.json");

const siteUrl = siteConfig.siteUrl.replace(/\/$/, "");
const hubUrl = siteConfig.webSubHubUrl;
const feedUrls = [`${siteUrl}/rss.xml`, `${siteUrl}/atom.xml`];

async function publish(feedUrl) {
  const body = new URLSearchParams({
    "hub.mode": "publish",
    "hub.url": feedUrl,
  });

  const response = await fetch(hubUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`WebSub publish failed for ${feedUrl}: ${response.status} ${text}`);
  }
}

async function main() {
  for (const feedUrl of feedUrls) {
    await publish(feedUrl);
    console.log(`Published WebSub update for ${feedUrl}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
