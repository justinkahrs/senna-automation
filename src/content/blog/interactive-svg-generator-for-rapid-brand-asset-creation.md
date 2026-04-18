---
title: "Interactive SVG generator for rapid brand asset creation"
date: "2026-04-18"
category: "productivity"
subtitle: "A practical walkthrough building an SVG generator and manipulator app to create brand assets fast"
heroTitle: "Tools and patterns for programmatic logos, icons, and variations"
heroSubtitle: "From parameterized shapes to export-ready SVG sprites"
excerpt: "How to build an interactive SVG generator that lets designers and small teams produce consistent brand assets with programmatic rules, live previews, and export pipelines."
image: "/blog/black-android-smartphone-90XUrnKwLkc.jpg"
metadata:
  client: "Senna Automation\nInternal demo"
  company: "Senna Automation"
  companyUrl: "https://senna.io"
  year: "2026"
  role: "Developer / Consultant"
  tools: "React, TypeScript, SVGO, Puppeteer, Node.js"
---

# Interactive SVG generator for rapid brand asset creation

This post documents a working implementation of an interactive SVG generator and manipulator app I built to help small teams create consistent brand assets: logos, icons, and quick layout variations. This is written as an operational blueprint with concrete code-level decisions, constraints, and trade-offs so an engineering or product team can reimplement it.

## Why a programmatic SVG generator reduces design friction for small teams

Designers for small companies spend disproportionate time producing the same assets in a handful of variants: color, size, simplified icon, badge, and reversed for dark backgrounds. The generator moves repetitive work from manual tools into rules and parameters. That reduces human error, speeds iteration, and makes brand changes auditable.

Constraints we accepted for this project: keep all assets SVG-first (no rasterized primary assets), keep export sizes predictable, and support both single-file SVG and sprite sheets. Tradeoffs: some complex artistic logos were excluded because programmatic rendering would lose nuance.

## Defining the canonical input: parameterized shape models

The app treats artifacts as parameterized shape models. Each model is a compact JSON document with a small grammar describing shape primitives, transforms, and style tokens. Example model snippet:

```json
{
  "name": "mark-geom-1",
  "primitives": [
    { "type": "circle", "cx": 50, "cy": 50, "r": 38, "id": "bg" },
    { "type": "path", "d": "M20,60 L80,60", "strokeWidth": 6, "id": "bar" }
  ],
  "tokens": {
    "fill": "--brand-500",
    "stroke": "--accent-300"
  }
}
```

Why JSON? It is human-readable, easy to diff, and fits into existing CMS and git-based pipelines.

## The rendering pipeline: model -> DOM SVG -> optimized output

We used a three-step rendering flow:
1. Parse the model and expand primitives into a virtual DOM representation
2. Render to a client-side SVG element for live preview (React + inline SVG)
3. Serialize the SVG and run an optimization pass (SVGO) for export

Key detail: rendering must preserve viewBox and units so exported SVGs are resolution-independent. That means bounding box calculation happens in the generator, not in the browser alone. We compute a canonical viewBox based on primitive bounds and explicitly set width/height only when producing raster fallbacks.

## Live parameter editing with constraint validation

The editor UI exposes model parameters with typed inputs: numeric (with min/max), color tokens (mapped to a palette), enum choices, and boolean flags. Each parameter includes a validation rule used in two places: client-side immediate feedback and server-side validation before committing a new model into the canonical store.

Example validation rule:

```json
{"param":"r","type":"number","min":4,"max":200}
```

Edge case: user sets radius to zero or negative. Validation prevents it and the UI shows a clear tooltip with the allowed range.

## Consistent color tokens and theme substitution

A small-team brand often needs solid control over token substitution. We separate geometry from color tokens so a single model can render different colorways. Tokens are CSS custom properties in exported SVGs so downstream consumers can override at usage time.

At export the pipeline can optionally inline colors (useful for platforms that do not accept CSS inlined custom properties) by resolving tokens against the canonical palette and replacing vars with hex codes before running SVGO.

## Export modes: single assets, sprites, and PDF sheets

We supported three export modes:
- Single SVG file per model
- Combined SVG sprite with <symbol> entries for web use
- PDF sheet for print or handoff (rendered by Puppeteer to ensure accurate vector output)

Tradeoff: PDFs produced via headless browser maintain vector paths but can introduce small layout differences. We tested with Apple Preview and Acrobat as part of QA.

## Productionizing: storage, versioning, and canonicalization

We store model JSON and final SVG artifacts in an S3 bucket with the following keys:
- models/{name}/v{semver}.json
- assets/{name}/v{semver}.svg

Each commit to the canonical model store triggers CI that runs a deterministic render and checks for regressions using a pixel-diff over rasterized fallbacks plus a structural diff of the SVG DOM (element counts, id changes). If differences exceed thresholds, the pipeline fails and a ticket is created.

Why structural diff? It catches accidental reordering of elements that still rasterize the same but may break symbol references or CSS targeting downstream.

## Programmatic variants for batch generation

We added a batch generator that takes a matrix of variables and emits a set of assets. Example matrix: colors [brand, dark, inverted] x sizes [16,24,48,96] x simplified [true,false]. The generator runs in parallel and writes the outputs with predictable filenames.

Performance note: generating 3,000 small SVGs completed in 45 seconds on a 4vCPU CI runner because SVGO is CPU-bound. We rate-limited concurrent workers to reduce memory spikes.

## Handling external inputs and messy SVGs

People import legacy SVGs from design tools. Many of those contain unnecessary groups, inline styles, and editor metadata. We implemented an import pipeline to canonicalize incoming SVGs:
1. Strip editor metadata and unnecessary defs
2. Flatten transforms where safe
3. Map fills/strokes to tokens where possible (using a nearest-color match to the palette)

Edge case: complex masks and filters. Those are preserved but flagged as non-portable; we create a simplified fallback path and attach a warning to the model.

## Accessibility and markup considerations

Exported SVGs include ARIA labels and title elements when the user supplies accessible text. The generator can export a <desc> containing the tokenized brand name and usage context for CMS ingestion. This makes the assets more usable in headless CMS and automated website builds.

## Example code snippet: serializing and optimizing an SVG

```ts
import { optimize } from 'svgo'

function serializeAndOptimize(svgEl: SVGSVGElement, inlineColors = false, palette = {}) {
  const serializer = new XMLSerializer()
  let raw = serializer.serializeToString(svgEl)
  if (inlineColors) raw = resolveTokens(raw, palette)
  const result = optimize(raw, { multipass: true })
  return result.data
}
```

Practical note: SVGO can remove IDs that are referenced by CSS. We run a regex to collect ids referenced in style attributes and mark them as safe in the SVGO config.

## Testing and regression checks

We used a three-tier test approach:
- Unit: model parsing and validation rules
- Integration: rendering pipeline on headless Node with jsdom and pixel diffs via Puppeteer screenshots
- E2E: generate a sprite, embed in a test page, and run Lighthouse checks for size and accessibility

Regression thresholds are conservative: 0.5 percent pixel-diff for approved visual-only changes and structural equality required for cases that affect downstream referencing.

## A note on licensing and OSS components

We relied on permissive tools: SVGO, Puppeteer, and a small number of MIT-licensed helpers for color math. We audited dependencies for known issues and pinned versions in CI to avoid surprises.

## Results and operational impact for the internal demo

For our internal demo team the generator replaced a small pool of manual designer tasks. Outcome summary:
- Asset turnaround time dropped from days to hours for new campaign variants
- Asset consistency improved because tokens enforced brand rules
- Handing assets to developers required fewer adjustments when integrating into component libraries

This was not a silver bullet. The team still uses designers for primary logos and complex illustrations. The generator is for systemized variants where programmatic rules make sense.

## Where teams trip up when adopting this system

- Trying to make every logo programmable. Some marks are intentionally handcrafted and should stay that way.
- Overcomplicating the model grammar. The sweet spot is compact primitives and explicit transforms.
- Not codifying tokens early. Without a token system, exported assets diverge quickly.

## Next steps and extensions

- Add a plugin model for post-processors, e.g., generating optimized PNG fallbacks for email templates
- Integrate with Figma via plugin to import models directly from designers
- Add a small rules engine for automatic 'contrast-safe' color substitutions based on WCAG checks


## Sources and further reading

- SVGO (GitHub) — tool used for SVG optimization and configuration guidance.
- Puppeteer (GitHub) — used for headless rendering and PDF generation.
- "Design Tokens" (W3C) — explanation and best practices for tokens and variable-driven design
