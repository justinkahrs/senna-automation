# Accordion

## Metadata
- **Name:** Accordion
- **Category:** Interactive / Disclosure
- **Status:** Stable
- **File:** MUI `<Accordion>` with theme overrides in `src/components/theme/theme.ts`

## Overview
An expandable/collapsible content container used for FAQ sections and
progressively disclosed content.

**When to use:** FAQs, secondary details the user may not need immediately.
**When not to use:** Critical content that should always be visible.

## Anatomy
1. **AccordionSummary** — clickable header row with expand icon
2. **AccordionDetails** — body content revealed on expand
3. **Expand icon** — rotates on expand, changes color to accent

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-border-soft` | Default border |
| `--color-border-medium` | Expanded border |
| `--color-bg-paper` | Default background |
| `--color-bg-subtle` | Expanded background |
| `--color-text-muted` | Expand icon default |
| `--color-accent` | Expand icon expanded state |
| `--radius-lg` | border-radius: 12px |
| `--dur-fast` | Transition duration |

## States
| State | Visual |
|-------|--------|
| **Collapsed** | White background, soft border, muted icon |
| **Expanded** | Subtle background, medium border, accent icon |

## Code Example
```tsx
<Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography variant="h6">Question here</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography variant="body2">Answer here.</Typography>
  </AccordionDetails>
</Accordion>
```

## Cross-References
- [Card](./card.md) — similar container concept
