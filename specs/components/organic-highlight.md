# OrganicHighlight

## Metadata
- **Name:** OrganicHighlight
- **Category:** Typography / Decoration
- **Status:** Stable
- **File:** `src/components/OrganicHighlight.tsx`

## Overview
An inline `<span>` wrapper that draws a hand-painted-style highlight behind
text using layered linear gradients. Animates in on scroll via Framer Motion.

**When to use:** Hero headings, key phrases that need visual emphasis.
**When not to use:** Body text, multiple highlights in a single paragraph.

## Anatomy
1. **Span** — inline element with dual gradient backgrounds
2. **Background layers** — two angled gradients at different opacities
   for a natural, imperfect marker highlight effect

## Tokens Used
The highlight uses a gold tone (`rgba(212, 176, 92, …)`) which is a decorative
accent independent of the main palette. It does not map to a standard token but
is a deliberate creative choice.

| Token | Property |
|-------|----------|
| _(decorative gold)_ | Background gradients |
| `--ease-enter` equiv | Framer Motion easing: `[0.22, 1, 0.36, 1]` |
| `--dur-slow` equiv | Framer Motion duration: `0.8s` |

## Props / API
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | ReactNode | ✅ | Text to highlight |

## States
| State | Visual |
|-------|--------|
| **Before viewport** | No highlight visible (backgroundSize: 0%) |
| **In viewport** | Highlight paints in from left |
| **Reduced motion** | Highlight shown immediately, no animation |

## Code Example
```tsx
<Typography variant="h1">
  We build <OrganicHighlight>intelligent automation</OrganicHighlight>
</Typography>
```

## Cross-References
- [AnimatedHeroTitle](./animated-hero-title.md) — often used together
