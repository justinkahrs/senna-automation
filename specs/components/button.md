# Button

## Metadata
- **Name:** Button
- **Category:** Interactive / Action
- **Status:** Stable
- **File:** MUI `<Button>` with theme overrides in `src/components/theme/theme.ts`

## Overview
The primary interactive element for actions and navigation. Styled via MUI theme
component overrides — no custom component file exists; the MUI `<Button>` is
used directly with variant/size props.

**When to use:** CTAs, form submissions, navigation actions.
**When not to use:** Inline links within body text (use `<a>` or `<Link>`).

## Anatomy
1. **Label** — text content
2. **Icon** (optional) — leading or trailing icon
3. **Container** — pill-shaped surface with padding and shadow

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-accent` | `contained` variant background (via MUI primary) |
| `--color-text-inverse` | `contained` variant text |
| `--shadow-btn-accent` | `contained` hover shadow |
| `--radius-pill` | border-radius: 9999px |
| `--type-button` | font-size: 0.9375rem |
| `--weight-medium` | font-weight: 500 |
| `--dur-base` / `--ease-smooth` | transition timing |

## Props / API
Standard MUI `<Button>` props:
| Prop | Values | Notes |
|------|--------|-------|
| `variant` | `contained`, `outlined`, `text` | Use `contained` for primary CTA |
| `size` | `small`, `medium`, `large` | Adjusts padding and font size |
| `color` | `primary`, `secondary` | Maps to design system palette |

## States
| State | Visual |
|-------|--------|
| **Default** | Accent background, no shadow |
| **Hover** | Accent-glow shadow beneath |
| **Active** | `scale(0.975)` press effect |
| **Focus** | Accent focus ring |
| **Disabled** | Reduced opacity, no hover effects |

## Code Example
```tsx
<Button variant="contained" size="large">
  Get Started
</Button>
```

## Cross-References
- [AppBar](./appbar.md) — contains CTA button
- [ScheduleCallButton](./schedule-call-button.md) — Calendly-integrated variant
- [RequestFormButton](./request-form-button.md) — form submission variant
