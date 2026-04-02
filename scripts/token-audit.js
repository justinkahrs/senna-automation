#!/usr/bin/env node
/**
 * token-audit.js — Scans CSS files for hardcoded visual values
 * that should reference design tokens from tokens.css.
 *
 * Usage:  node scripts/token-audit.js [--fix-suggestions]
 * Exit:   0 = clean, 1 = violations found
 *
 * Classifies violations as:
 *   ERROR   — hardcoded colors, spacing, box-shadows, font-sizes
 *   WARNING — raw durations, uncommon values, z-index
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ─── Configuration ──────────────────────────────────────────────

const SRC_DIR = path.resolve(__dirname, "..", "src");
const TOKENS_FILE = "tokens.css";

// Files/patterns to skip (these define tokens, not consume them)
const SKIP_FILES = [TOKENS_FILE, "tokens.ts", "colors.ts"];

// ─── Token suggestion maps ─────────────────────────────────────

const COLOR_MAP = {
  "#1C1917":  "--color-text-primary",
  "#1c1917":  "--color-text-primary",
  "#292524":  "--color-bg-dark",
  "#57534E":  "--color-text-secondary",
  "#57534e":  "--color-text-secondary",
  "#A8A29E":  "--color-text-muted",
  "#a8a29e":  "--color-text-muted",
  "#2D6B5E":  "--color-accent",
  "#2d6b5e":  "--color-accent",
  "#3D8B78":  "--color-accent-light",
  "#3d8b78":  "--color-accent-light",
  "#1E5244":  "--color-accent-dark",
  "#1e5244":  "--color-accent-dark",
  "#F7F6F4":  "--color-bg-base",
  "#f7f6f4":  "--color-bg-base",
  "#FFFFFF":  "--color-bg-paper",
  "#ffffff":  "--color-bg-paper",
  "#FFF":     "--color-bg-paper",
  "#fff":     "--color-bg-paper",
  "#F0EFEC":  "--color-bg-subtle",
  "#f0efec":  "--color-bg-subtle",
  "#E7E5E4":  "--color-border-soft",
  "#e7e5e4":  "--color-border-soft",
  "#D6D3D1":  "--color-border-medium",
  "#d6d3d1":  "--color-border-medium",
  "#F2F6F5":  "--color-bg-chat",
  "#f2f6f5":  "--color-bg-chat",
  "#111827":  "--color-text-primary",
  "#4b5563":  "--color-text-secondary",
  "#f9fafb":  "--color-bg-subtle",
  "#383838":  "--color-bg-inverse",
  "#f2f2f2":  "--color-bg-subtle",
  "#ccc":     "--color-border-medium",
  "#1a1a1a":  "--color-bg-inverse",
  "#EEEEEE":  "--color-bg-subtle",
  "#eeeeee":  "--color-bg-subtle",
};

const RGBA_MAP = {
  "rgba(255,255,255,0.7)":   "--color-text-on-dark",
  "rgba(255,255,255, 0.7)":  "--color-text-on-dark",
  "rgba(255,255,255,0.70)":  "--color-text-on-dark",
  "rgba(255, 255, 255, 0.7)": "--color-text-on-dark",
  "rgba(255,255,255,0.55)":  "--color-text-on-dark-secondary",
  "rgba(255, 255, 255, 0.55)": "--color-text-on-dark-secondary",
  "rgba(255,255,255,0.5)":   "--color-text-on-dark-subtle",
  "rgba(255, 255, 255, 0.5)": "--color-text-on-dark-subtle",
  "rgba(255,255,255,0.4)":   "--color-text-on-dark-muted",
  "rgba(255, 255, 255, 0.4)": "--color-text-on-dark-muted",
  "rgba(255,255,255,0.45)":  "--color-text-on-dark-muted",
  "rgba(255,255,255,0.6)":   "--color-text-on-dark-body",
  "rgba(255, 255, 255, 0.6)": "--color-text-on-dark-body",
  "rgba(255,255,255,0.78)":  "--color-text-on-dark-prominent",
  "rgba(255, 255, 255, 0.78)": "--color-text-on-dark-prominent",
  "rgba(255,255,255,0.84)":  "--color-text-on-dark-strong",
  "rgba(255, 255, 255, 0.84)": "--color-text-on-dark-strong",
  "rgba(255,255,255,0.03)":  "--color-bg-on-dark-subtle",
  "rgba(255, 255, 255, 0.03)": "--color-bg-on-dark-subtle",
  "rgba(255,255,255,0.06)":  "--color-bg-on-dark-raised / --color-border-on-dark",
  "rgba(255, 255, 255, 0.06)": "--color-bg-on-dark-raised / --color-border-on-dark",
  "rgba(255,255,255,0.08)":  "--color-bg-on-dark-hover",
  "rgba(255, 255, 255, 0.08)": "--color-bg-on-dark-hover",
  "rgba(255,255,255,0.1)":   "--color-bg-on-dark-border",
  "rgba(255, 255, 255, 0.1)": "--color-bg-on-dark-border",
  "rgba(255,255,255,0.10)":  "--color-bg-on-dark-border",
  "rgba(255,255,255,0.16)":  "--color-bg-on-dark-16",
  "rgba(255, 255, 255, 0.16)": "--color-bg-on-dark-16",
  "rgba(255,255,255,0.22)":  "--color-bg-on-dark-22",
  "rgba(255, 255, 255, 0.22)": "--color-bg-on-dark-22",
  "rgba(45,107,94,0.06)":    "--color-bg-hover",
  "rgba(45, 107, 94, 0.06)": "--color-bg-hover",
  "rgba(45,107,94,0.07)":    "--color-bg-accent-hover",
  "rgba(45, 107, 94, 0.07)": "--color-bg-accent-hover",
  "rgba(45,107,94,0.08)":    "--color-bg-accent-faint",
  "rgba(45, 107, 94, 0.08)": "--color-bg-accent-faint",
  "rgba(45,107,94,0.04)":    "--color-bg-accent-subtle",
  "rgba(45, 107, 94, 0.04)": "--color-bg-accent-subtle",
  "rgba(45,107,94,0.10)":    "--color-bg-selected",
  "rgba(45, 107, 94, 0.10)": "--color-bg-selected",
  "rgba(45,107,94,0.12)":    "--color-focus-ring",
  "rgba(45, 107, 94, 0.12)": "--color-focus-ring",
  "rgba(45,107,94,0.22)":    "--shadow-btn-accent (use token)",
  "rgba(28,25,23,0.04)":     "--color-bg-neutral-hover",
  "rgba(28, 25, 23, 0.04)":  "--color-bg-neutral-hover",
  "rgba(28,25,23,0.03)":     "--color-bg-neutral-subtle",
  "rgba(28, 25, 23, 0.03)":  "--color-bg-neutral-subtle",
  "rgba(28,25,23,0.05)":     "--color-bg-neutral-hover (approx)",
  "rgba(28, 25, 23, 0.05)":  "--color-bg-neutral-hover (approx)",
  "rgba(28,25,23,0.07)":     "--shadow-appbar (use token)",
  "rgba(28, 25, 23, 0.07)":  "--shadow-appbar (use token)",
  "rgba(28,25,23,0.08)":     "--color-border-neutral-light",
  "rgba(28, 25, 23, 0.08)":  "--color-border-neutral-light",
  "rgba(0,0,0,0.05)":        "--color-border-neutral",
  "rgba(0, 0, 0, 0.05)":     "--color-border-neutral",
  "rgba(0,0,0,0.08)":        "--shadow-portfolio (use token)",
  "rgba(0, 0, 0, 0.08)":     "--shadow-portfolio (use token)",
};

const SPACING_MAP = {
  "2px":  "--space-0-5",
  "4px":  "--space-1",
  "6px":  "--space-1-5",
  "8px":  "--space-2",
  "12px": "--space-3",
  "16px": "--space-4",
  "20px": "--space-5",
  "24px": "--space-6",
  "32px": "--space-8",
  "40px": "--space-10",
  "48px": "--space-12",
  "64px": "--space-16",
  "80px": "--space-20",
  "96px": "--space-24",
};

const RADIUS_MAP = {
  "3px":    "--radius-xs",
  "4px":    "--radius-sm",
  "6px":    "--radius-md",
  "10px":   "--radius-base",
  "12px":   "--radius-lg",
  "14px":   "--radius-xl",
  "16px":   "--radius-2xl",
  "20px":   "--radius-3xl",
  "50px":   "--radius-pill",
  "128px":  "--radius-pill",
  "999px":  "--radius-pill",
  "9999px": "--radius-pill",
};

const FONT_SIZE_MAP = {
  "0.75rem":   "--type-caption",
  "0.8125rem": "--type-button (small variant)",
  "0.875rem":  "--type-body-sm",
  "0.9375rem": "--type-button",
  "0.95rem":   "--type-body (approx)",
  "1.0rem":    "--type-body",
  "1rem":      "--type-body",
  "1.05rem":   "--type-body (approx)",
  "1.0625rem": "--type-h6 (approx)",
  "1.1rem":    "--type-h5 (approx)",
  "1.125rem":  "--type-h5",
  "1.2rem":    "--type-h5 (approx)",
  "1.25rem":   "--type-h4 (approx)",
  "1.75rem":   "--type-pull",
  "3rem":      "--type-h2 (approx)",
};

const WEIGHT_MAP = {
  "400": "--weight-regular",
  "500": "--weight-medium",
  "600": "--weight-semibold",
  "700": "--weight-bold",
  "800": "--weight-extrabold",
};

const Z_INDEX_MAP = {
  "0":    "--z-base",
  "1":    "--z-raised",
  "2":    "--z-above",
  "100":  "--z-dropdown",
  "200":  "--z-sticky",
  "1000": "--z-overlay",
  "2000": "--z-modal",
  "9999": "--z-toast",
};

// ─── Patterns ───────────────────────────────────────────────────

const PATTERNS = [
  {
    name: "Hex color",
    regex: /(?:color|background(?:-color)?|border(?:-color)?|outline(?:-color)?|fill|stroke|box-shadow|text-shadow|border-(?:top|right|bottom|left)(?:-color)?)\s*:\s*[^;]*?(#[0-9a-fA-F]{3,8})\b/g,
    severity: "ERROR",
    suggest: (match) => COLOR_MAP[match] || COLOR_MAP[match.toLowerCase()] || `Check tokens.css for equivalent`,
  },
  {
    name: "rgba/rgb color",
    regex: /(?:color|background(?:-color)?|border(?:-color)?|box-shadow|bgcolor)\s*:\s*[^;]*?(rgba?\([^)]+\))/g,
    severity: "ERROR",
    suggest: (match) => {
      const normalized = match.replace(/\s+/g, "");
      return RGBA_MAP[normalized] || RGBA_MAP[match] || `Check tokens.css for equivalent`;
    },
  },
  {
    name: "Hardcoded spacing",
    regex: /(?:padding|margin|gap|top|right|bottom|left|inset)\s*:\s*[^;]*?(\d+px)/g,
    severity: "ERROR",
    suggest: (match) => SPACING_MAP[match] || `Nearest token in --space-* scale`,
    filter: (match, line) => {
      // Skip 0px, 1px (hairline), and values inside box-shadow / border
      if (match === "0px" || match === "1px") return false;
      if (/box-shadow|border-width|border:\s/.test(line)) return false;
      return true;
    }
  },
  {
    name: "Hardcoded border-radius",
    regex: /border-radius\s*:\s*[^;]*?(\d+px)/g,
    severity: "ERROR",
    suggest: (match) => RADIUS_MAP[match] || `Nearest token in --radius-* scale`,
  },
  {
    name: "Hardcoded font-size",
    regex: /font-size\s*:\s*([0-9.]+(?:rem|px|em))/g,
    severity: "ERROR",
    suggest: (match) => FONT_SIZE_MAP[match] || `Check --type-* scale`,
  },
  {
    name: "Hardcoded font-weight",
    regex: /font-weight\s*:\s*(\d{3})\b/g,
    severity: "ERROR",
    suggest: (match) => WEIGHT_MAP[match] || `Check --weight-* tokens`,
  },
  {
    name: "Hardcoded z-index",
    regex: /z-index\s*:\s*(\d+)/g,
    severity: "WARNING",
    suggest: (match) => Z_INDEX_MAP[match] || `Check --z-* scale`,
  },
  {
    name: "Hardcoded transition duration",
    regex: /transition[^;]*?(\d+ms)/g,
    severity: "WARNING",
    suggest: () => `Use --dur-fast/--dur-base/--dur-moderate/--dur-slow`,
    filter: (match, line) => {
      // Skip if already using var()
      if (/var\(--dur-/.test(line)) return false;
      return true;
    }
  },
  {
    name: "Hardcoded box-shadow",
    regex: /box-shadow\s*:\s*"?(0\s+\d+px[^;,"]*)"?/g,
    severity: "ERROR",
    suggest: () => `Use --shadow-* token`,
  },
];

// ─── Scanner ────────────────────────────────────────────────────

function findCSSFiles(dir, exts = [".css", ".module.css"]) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next") {
      results = results.concat(findCSSFiles(fullPath, exts));
    } else if (entry.isFile() && exts.some(ext => entry.name.endsWith(ext))) {
      if (!SKIP_FILES.some(skip => entry.name === skip)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const violations = [];

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    // Skip comments
    if (trimmed.startsWith("/*") || trimmed.startsWith("*") || trimmed.startsWith("//")) return;
    // Skip lines that already use var()
    // (We still check — a line might have both a var() and a raw value)

    for (const pattern of PATTERNS) {
      let match;
      // Reset regex lastIndex since we're reusing
      pattern.regex.lastIndex = 0;
      while ((match = pattern.regex.exec(line)) !== null) {
        const value = match[1];
        // Skip if already inside a var()
        const beforeMatch = line.substring(0, match.index + match[0].indexOf(value));
        if (/var\([^)]*$/.test(beforeMatch)) continue;

        // Apply filter if exists
        if (pattern.filter && !pattern.filter(value, line)) continue;

        violations.push({
          file: path.relative(SRC_DIR, filePath),
          line: lineNum,
          severity: pattern.severity,
          category: pattern.name,
          value: value,
          suggestion: pattern.suggest(value),
          context: trimmed.substring(0, 100),
        });
      }
    }
  });

  return violations;
}

// ─── Main ───────────────────────────────────────────────────────

function main() {
  const files = findCSSFiles(SRC_DIR);
  let allViolations = [];

  console.log(`\n🔍 Scanning ${files.length} CSS file(s)...\n`);

  for (const file of files) {
    const violations = auditFile(file);
    allViolations = allViolations.concat(violations);
  }

  if (allViolations.length === 0) {
    console.log("✅ No violations found. All CSS files use design tokens.\n");
    process.exit(0);
  }

  // Group by severity
  const errors = allViolations.filter(v => v.severity === "ERROR");
  const warnings = allViolations.filter(v => v.severity === "WARNING");

  // Print violations
  const printViolation = (v) => {
    const icon = v.severity === "ERROR" ? "❌" : "⚠️ ";
    console.log(`  ${icon} ${v.file}:${v.line}`);
    console.log(`     ${v.category}: ${v.value}`);
    console.log(`     → Suggestion: var(${v.suggestion})`);
    console.log(`     Context: ${v.context}`);
    console.log();
  };

  if (errors.length > 0) {
    console.log(`\n❌ ERRORS (${errors.length}):\n`);
    errors.forEach(printViolation);
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${warnings.length}):\n`);
    warnings.forEach(printViolation);
  }

  // Summary
  console.log("─".repeat(60));
  console.log(`  Total: ${allViolations.length} violations`);
  console.log(`  Errors: ${errors.length} | Warnings: ${warnings.length}`);
  console.log("─".repeat(60));
  console.log();

  // Exit with error if any errors found
  if (errors.length > 0) {
    process.exit(1);
  }

  process.exit(0);
}

main();
