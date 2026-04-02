# ConsultationCTA

## Metadata
- **Name:** ConsultationCTA
- **Category:** Marketing / Call-to-Action
- **Status:** Stable
- **File:** `src/components/blog/ConsultationCTA.tsx`

## Overview
A full-width dark banner with a call-to-action to schedule a consultation call.
Used at the bottom of blog posts and landing sections.

**When to use:** End of blog posts, bottom of landing pages.
**When not to use:** Inline within tight content areas.

## Anatomy
1. **Container** — dark surface with large padding and rounded corners
2. **Texture overlay** — subtle dot pattern at 5% opacity
3. **Heading** — h2 "Want to see this in your business?"
4. **Subtitle** — description in on-dark text
5. **ScheduleCallButton** — Calendly-integrated CTA
6. **Calendly attribution** — "via Calendly" with logo
7. **Disclaimer** — "No commitment. No prep needed."

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-bg-inverse` | Background (via MUI "secondary.main") |
| `--color-bg-paper` | Text color (via MUI "background.paper") |
| `--shadow-cta` | box-shadow |
| `--color-text-on-dark` | Subtitle text |
| `--color-text-on-dark-secondary` | Calendly attribution |
| `--color-text-on-dark-muted` | Disclaimer text |
| `--radius-xl` | border-radius via MUI sx `borderRadius: 4` |

## States
| State | Visual |
|-------|--------|
| **Default** | Dark surface with CTA prominently centered |

## Code Example
```tsx
<ConsultationCTA />
```

## Cross-References
- [ScheduleCallButton](./schedule-call-button.md) — embedded CTA
- [Footer](./footer.md) — similar dark-surface pattern
