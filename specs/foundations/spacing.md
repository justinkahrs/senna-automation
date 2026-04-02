# Spacing

## Overview
Senna Automation uses a 4px-based spacing scale. Most spacing increments are
multiples of 4 or 8, creating a consistent visual rhythm.

## Scale

| Token | Value | Common use |
|-------|-------|------------|
| `--space-0` | 0px | Reset |
| `--space-0-5` | 2px | Hairline gaps, scrollbar width |
| `--space-1` | 4px | Tight padding, icon gaps |
| `--space-1-5` | 6px | Small chip/tooltip padding |
| `--space-2` | 8px | Inter-element gaps, small padding |
| `--space-3` | 12px | Icon-button padding, medium gaps |
| `--space-4` | 16px | Standard gap, CTA horizontal gaps |
| `--space-5` | 20px | Card padding, container mobile padding |
| `--space-6` | 24px | Section sub-gaps, card content padding |
| `--space-8` | 32px | Section gaps, container tablet padding |
| `--space-10` | 40px | Medium section spacing |
| `--space-12` | 48px | CTA button height, large element spacing |
| `--space-16` | 64px | Section vertical spacing |
| `--space-20` | 80px | Container desktop padding, page padding |
| `--space-24` | 96px | Large section vertical spacing |

## MUI Theme Spacing
MUI's `theme.spacing()` uses an 8px base unit:
- `theme.spacing(1)` = 8px = `--space-2`
- `theme.spacing(2)` = 16px = `--space-4`
- `theme.spacing(3)` = 24px = `--space-6`
- `theme.spacing(4)` = 32px = `--space-8`

For MUI `sx` props, use the numeric shorthand (`p: 2`, `m: 3`) which maps
to `theme.spacing()`. For raw CSS, use `var(--space-*)`.

## Rules
1. **Never use raw px values** for padding, margin, or gap in CSS files.
2. In MUI `sx` props, prefer the numeric spacing shorthand (e.g., `p: 2.5`).
3. For CSS properties that MUI doesn't handle (e.g., `height`, `width`, `top`),
   use `var(--space-*)` tokens.
4. Max-width values (e.g., `480px`, `1400px`) are layout constraints, not
   spacing, and are acceptable as raw values.
