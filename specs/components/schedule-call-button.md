# ScheduleCallButton

## Metadata
- **Name:** ScheduleCallButton
- **Category:** Interactive / CTA
- **Status:** Stable
- **File:** `src/components/ScheduleCallButton.tsx`

## Overview
A specialized button that opens a Calendly scheduling dialog. Supports normal
and inverse (light-on-dark) variants.

**When to use:** Any CTA that should open the Calendly scheduler.
**When not to use:** Generic actions (use standard MUI `<Button>`).

## Anatomy
1. **Trigger button** — pill-shaped, accent or inverse styled
2. **Modal dialog** — full-screen overlay with embedded Calendly iframe
3. **Close button** — top-right IconButton

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-accent` | Default button background |
| `--color-text-inverse` | Default button text |
| `--color-bg-paper` | Inverse button background |
| `--color-text-primary` | Inverse button text |
| `--radius-pill` | border-radius: 50px (pill) |
| `--shadow-schedule` | Dialog box-shadow |
| `--type-h5` | Button font size (large) |

## Props / API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | "Schedule a Free Consultation" | Button label |
| `size` | "small" \| "medium" \| "large" | "medium" | MUI button size |
| `inverse` | boolean | false | Light-on-dark color scheme |
| `showIcon` | boolean | true | Show calendar icon |
| `sx` | SxProps | — | Additional MUI sx overrides |

## States
| State | Visual |
|-------|--------|
| **Default** | Accent pill button |
| **Hover** | Slight brightness increase |
| **Dialog open** | Full-screen Calendly embed |

## Code Example
```tsx
<ScheduleCallButton
  text="Schedule a Call"
  size="large"
  inverse
  showIcon={false}
/>
```

## Cross-References
- [Button](./button.md) — base button styling
- [Dialog](./dialog.md) — dialog overlay pattern
- [ConsultationCTA](./consultation-cta.md) — primary consumer
