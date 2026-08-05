import fs from "node:fs";
import path from "node:path";

import { parseBlogFile } from "./validate-blog-content.mjs";

const projectRoot = process.cwd();
const outputRoot = [
  path.join(projectRoot, ".vercel", "output", "static"),
  path.join(projectRoot, "dist", "client"),
].find((candidate) => fs.existsSync(candidate));

if (!outputRoot) {
  throw new Error("No built static output found. Run `npm run build` first.");
}

const requiredOutputs = [
  "rss.xml",
  "atom.xml",
  "feed.json",
  "sitemap.xml",
  "robots.txt",
  "llms-full.txt",
  "opengraph-image.png",
];

for (const relativePath of requiredOutputs) {
  const target = path.join(outputRoot, relativePath);
  if (!fs.existsSync(target) || fs.statSync(target).size === 0) {
    throw new Error(`Missing or empty built content output: ${relativePath}`);
  }
}

const outputText = Object.fromEntries(
  ["rss.xml", "atom.xml", "feed.json", "sitemap.xml", "llms-full.txt"].map((relativePath) => [
    relativePath,
    fs.readFileSync(path.join(outputRoot, relativePath), "utf8"),
  ]),
);

const requiredMarketingPaths = [
  "/workflow-bottleneck-review",
  "/workflow-automation-lower-michigan",
  "/workflow-automation-chicagoland",
];

for (const outputName of ["sitemap.xml", "llms-full.txt"]) {
  for (const requiredPath of requiredMarketingPaths) {
    if (!outputText[outputName].includes(requiredPath)) {
      throw new Error(`${outputName} omits required marketing path ${requiredPath}.`);
    }
  }
}

const blogDirectory = path.join(projectRoot, "src", "content", "blog");
const articles = fs
  .readdirSync(blogDirectory)
  .filter((filename) => filename.endsWith(".md"))
  .map((filename) => ({
    slug: path.basename(filename, ".md"),
    article: parseBlogFile(
      fs.readFileSync(path.join(blogDirectory, filename), "utf8"),
      filename,
    ),
  }));

for (const { slug, article } of articles) {
  const publicPath = `/blog/${slug}`;
  for (const [outputName, contents] of Object.entries(outputText)) {
    if (!contents.includes(publicPath)) {
      throw new Error(`${outputName} does not contain ${publicPath}.`);
    }
  }

  const ogImage = path.join(outputRoot, "blog", slug, "opengraph-image.png");
  if (!fs.existsSync(ogImage) || fs.statSync(ogImage).size === 0) {
    throw new Error(`${article.filename}: missing built Open Graph image.`);
  }
}

console.log(
  `Verified feeds, sitemap, robots, and Open Graph output for ${articles.length} blog article(s).`,
);
