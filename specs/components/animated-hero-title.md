# AnimatedHeroTitle

## Metadata
- **Name:** AnimatedHeroTitle
- **Category:** Typography / Animation
- **Status:** Stable
- **File:** `src/components/AnimatedHeroTitle.tsx`

## Overview
A Framer Motion wrapper for hero section headlines. Applies a staggered fade-in-up
animation to child elements.

**When to use:** Hero section primary headings.
**When not to use:** Body text, non-hero headings.

## Anatomy
1. **Motion container** — wraps children with animation variants
2. **Children** — typically `<Typography variant="h1">` elements

## Tokens Used
| Token | Property |
|-------|----------|
| `--ease-enter` equiv | Framer easing: `[0.16, 1, 0.3, 1]` |
| `--dur-slow` equiv | Framer duration (~0.6–0.8s) |

## Props / API
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | ReactNode | ✅ | Heading content to animate |

## States
| State | Visual |
|-------|--------|
| **Before viewport** | Hidden (opacity 0, translated down) |
| **In viewport** | Fades up into position |

## Code Example
```tsx
<AnimatedHeroTitle>
  <Typography variant="h1">
    Build <OrganicHighlight>smarter</OrganicHighlight> workflows
  </Typography>
</AnimatedHeroTitle>
```

## Cross-References
- [OrganicHighlight](./organic-highlight.md) — often nested within
