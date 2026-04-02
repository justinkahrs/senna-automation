# MermaidDiagram

## Metadata
- **Name:** MermaidDiagram
- **Category:** Content / Visualization
- **Status:** Stable
- **File:** `src/components/blog/MermaidDiagram.tsx`

## Overview
Renders Mermaid.js diagrams within blog posts. Uses the Senna design system
colors for diagram theming and includes a watermark logo.

**When to use:** Flowcharts, sequence diagrams, and process visualizations in blog posts.
**When not to use:** Static images or simple lists.

## Anatomy
1. **Container** — rounded box with accent-tinted background and border
2. **SVG diagram** — Mermaid-rendered flowchart/diagram
3. **Watermark** — Senna logo, bottom-right, low opacity

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-bg-accent-subtle` | Container background (rgba 0.04) |
| `--color-bg-accent-faint` | Error state background (rgba 0.06) |
| `--color-border-soft` | Container border (via "divider") |
| `--color-bg-base` | Mermaid primaryColor |
| `--color-text-primary` | Mermaid text color |
| `--color-border-medium` | Mermaid border color |
| `--color-accent` | Mermaid line color |
| `--color-bg-paper` | Mermaid secondary color |
| `--color-bg-subtle` | Mermaid tertiary color |
| `--radius-lg` | Container border-radius |

## Props / API
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `chart` | string | ✅ | Mermaid chart definition string |
| `sx` | SxProps | ❌ | Additional MUI sx overrides |

## States
| State | Visual |
|-------|--------|
| **Loading** | Empty container (mermaid loading) |
| **Rendered** | SVG diagram displayed |
| **Error** | "Diagram unavailable" message on faint accent background |

## Code Example
```tsx
<MermaidDiagram chart={`
graph LR
  A[Input] --> B[Process]
  B --> C[Output]
`} />
```

## Cross-References
- [Card](./card.md) — similar container pattern
