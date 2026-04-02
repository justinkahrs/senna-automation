# PricingToggle

## Metadata
- **Name:** PricingToggleSection
- **Category:** Marketing / Pricing
- **Status:** Stable
- **File:** `src/components/home/PricingToggleSection.tsx`

## Overview
A dark-background pricing section with a toggle between monthly and annual plans.
Features glassmorphism card effects and radial gradient overlays.

**When to use:** Home page pricing overview section.
**When not to use:** Full pricing page (use dedicated pricing page components).

## Anatomy
1. **Section container** — dark surface (warm-black) with radial gradient overlays
2. **Toggle switch** — glassmorphic pill toggle (monthly / annual)
3. **Pricing cards** — semi-transparent cards with features list
4. **CTA button** — per-card action button

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-bg-inverse` | Section background |
| `--color-bg-on-dark-hover` | Card/toggle background (0.08) |
| `--color-bg-on-dark-16` | Toggle border |
| `--color-bg-on-dark-22` | Active toggle border |
| `--color-text-on-dark-prominent` | Toggle label text |
| `--color-text-on-dark-strong` | Active toggle label |
| `--radius-pill` | Toggle border-radius |
| `--shadow-none` | Cards use flat style |

## States
| State | Visual |
|-------|--------|
| **Monthly active** | Monthly toggle highlighted |
| **Annual active** | Annual toggle highlighted, savings badge visible |
| **Card hover** | Subtle light effect |

## Code Example
```tsx
<PricingToggleSection />
```

## Cross-References
- [Button](./button.md) — card CTA buttons
- [Card](./card.md) — pricing card pattern
