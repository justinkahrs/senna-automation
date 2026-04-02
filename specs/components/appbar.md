# AppBar

## Metadata
- **Name:** AppBar
- **Category:** Layout / Navigation
- **Status:** Stable
- **File:** `src/components/layout/AppBar.tsx`

## Overview
The top navigation bar. Fixed to the viewport top, with a transparent-to-solid
transition on scroll. Contains logo, nav links, a CTA button, and a mobile
hamburger menu.

**When to use:** Present on every page via the root layout.
**When not to use:** N/A — singleton layout component.

## Anatomy
1. **Container** — MUI `AppBar` + `Toolbar`, max-width constrained
2. **Logo** — `<Logo>` component, left-aligned
3. **Desktop nav links** — horizontal row of `<Button>` links (hidden on mobile)
4. **CTA button** — "Get Started" contained button (hidden on mobile)
5. **Mobile menu icon** — hamburger `<IconButton>` (hidden on desktop)
6. **Mobile drawer** — `<Drawer>` with full nav + CTA

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-bg-paper` | Background (via MUI palette) |
| `--color-text-primary` | Text color |
| `--color-border-soft` | Bottom border (hairline) |
| `--shadow-appbar` | `boxShadow` when scrolled |
| `--color-bg-accent-hover` | Active nav link background |
| `--color-bg-neutral-hover` | Hover nav link background |
| `--color-text-inverse` | Mobile CTA text |
| `--color-bg-dark` | Mobile CTA background |
| `--shadow-btn-dark` | Mobile CTA hover shadow |
| `--shadow-md` | Mobile drawer shadow |
| `--radius-pill` | Button border-radius |
| `--type-button` | Nav link font size |
| `--dur-base` / `--ease-smooth` | Transition timing |

## Props / API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| _(none)_ | — | — | No external props; reads scroll state internally |

## States
| State | Description |
|-------|-------------|
| **Default** | Transparent background, no shadow |
| **Scrolled** | White background, bottom shadow, blur backdrop |
| **Nav link hover** | Subtle neutral background |
| **Nav link active** | Accent-tinted background |
| **Mobile open** | Drawer slides in from right |

## Code Example
```tsx
// Used in layout.tsx — no props needed
<AppBar />
```

## Cross-References
- [Logo](./logo.md) — nested component
- [Footer](./footer.md) — complementary layout component
- [Button](./button.md) — CTA button styling
