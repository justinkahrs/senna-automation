# Typography

## Overview
Senna Automation uses a dual-typeface system:
- **Cormorant Garamond** (serif) — display and section headings (h1–h4)
- **Inter** (sans-serif) — UI headings, body, buttons, labels

The type scale uses a ~1.265 ratio (augmented fourth, slightly compressed)
with a 16px base.

## Font Families

| Token | Family | Use |
|-------|--------|-----|
| `--font-serif` / `--ds-font-serif` | Cormorant Garamond | h1–h4, pull quotes |
| `--font-sans` / `--ds-font-sans` | Inter | h5–h6, body, UI, buttons |

## Type Scale

| Token | Size | Family | Weight | Line Height | Letter Spacing | Use |
|-------|------|--------|--------|-------------|----------------|-----|
| `--type-h1` | 4.209rem (67.3px) | Serif | 600 | 1.10 | -0.030em | Page titles |
| `--type-h2` | 3.157rem (50.5px) | Serif | 600 | 1.13 | -0.025em | Section heads |
| `--type-h3` | 2.369rem (37.9px) | Serif | 500 | 1.18 | -0.020em | Sub-sections |
| `--type-h4` | 1.777rem (28.4px) | Serif | 500 | 1.25 | -0.015em | Card titles |
| `--type-h5` | 1.125rem (18px) | Sans | 600 | 1.35 | -0.015em | UI headings |
| `--type-h6` | 0.9375rem (15px) | Sans | 600 | 1.40 | -0.010em | Small headings |
| `--type-body-lg` | 1.125rem (18px) | Sans | 400 | 1.60 | -0.010em | Subtitles, callouts |
| `--type-body` | 1.0rem (16px) | Sans | 400 | 1.65 | -0.008em | Standard body |
| `--type-body-sm` | 0.875rem (14px) | Sans | 400 | 1.60 | 0.000em | Small body, list items |
| `--type-caption` | 0.75rem (12px) | Sans | 400 | 1.50 | +0.010em | Labels, meta |
| `--type-eyebrow` | 0.875rem (14px) | Sans | 700 | 1.50 | +0.080em | Eyebrow (uppercase) |
| `--type-button` | 0.9375rem (15px) | Sans | 500 | 1.00 | -0.010em | Button labels |
| `--type-pull` | 1.75rem (28px) | Serif | 400i | 1.45 | -0.010em | Pull quotes |

## Font Weights

| Token | Value | Use |
|-------|-------|-----|
| `--weight-regular` | 400 | Body text |
| `--weight-medium` | 500 | Buttons, subtitles, UI labels |
| `--weight-semibold` | 600 | Headings (h1–h4), card headers |
| `--weight-bold` | 700 | Eyebrow, strong emphasis, overline |
| `--weight-extrabold` | 800 | Hero numeric stats, strong callouts |

## Line Heights

| Token | Value | Use |
|-------|-------|-----|
| `--leading-none` | 1.0 | Buttons |
| `--leading-tight` | 1.1 | h1 |
| `--leading-snug` | 1.25 | h4 |
| `--leading-normal` | 1.5 | Captions, eyebrow |
| `--leading-relaxed` | 1.65 | Body text |
| `--leading-loose` | 1.8 | Generous body (about page) |

## Responsive Behavior
Heading sizes use `clamp()` in the MUI theme for fluid scaling:
- `h1`: `clamp(2.75rem, 5.5vw, 4.209rem)`
- `h2`: `clamp(2.25rem, 4.5vw, 3.157rem)`
- `h3`: `clamp(1.875rem, 3.5vw, 2.369rem)`
- `h4`: `clamp(1.5rem, 2.5vw, 1.777rem)`

## Rules
1. **Never use raw font-size, font-weight, or line-height values** in component code.
2. Prefer MUI `variant` prop (e.g., `variant="h2"`, `variant="body1"`) over manual sizing.
3. When a custom size is needed, use `var(--type-*)` and `var(--weight-*)` tokens.
4. Font family is set by the MUI theme; avoid setting `fontFamily` directly.
