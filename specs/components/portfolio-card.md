# PortfolioCard

## Metadata
- **Name:** PortfolioCard
- **Category:** Content / Display
- **Status:** Stable
- **File:** `src/components/PortfolioCard.tsx`
- **CSS Module:** `src/components/PortfolioCard.module.css`

## Overview
A card component for displaying portfolio project previews. Features an image
preview area with gradient overlay and a content section with title and description.

**When to use:** Portfolio/work showcase sections.
**When not to use:** Blog posts (use blog card pattern), products (use ProductCard).

## Anatomy
1. **Card wrapper** — rounded container with shadow and border
2. **Preview container** — image area with subtle background
3. **Overlay gradient** — bottom gradient for visual depth
4. **Image** — project screenshot, full-width
5. **Content** — title + description text

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-bg-paper` | Card background |
| `--color-bg-subtle` | Preview container background |
| `--color-border-neutral` | Card border, overlay gradient |
| `--shadow-portfolio` | Default shadow |
| `--shadow-portfolio-hover` | Hover shadow |
| `--radius-3xl` | border-radius: 20px |
| `--space-6` | Content padding: 24px |
| `--space-2` | Title margin-bottom: 8px |
| `--type-h5` | Title font size |
| `--type-body` | Description font size |
| `--weight-bold` | Title font weight |
| `--color-text-primary` | Title color |
| `--color-text-secondary` | Description color |
| `--leading-relaxed` | Description line height |
| `--dur-moderate` / `--ease-smooth` | Hover transition |
| `--z-above` | Overlay z-index |

## Props / API
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | ✅ | Project name |
| `description` | string | ✅ | Short project description |
| `imageUrl` | string | ✅ | Preview image path |
| `href` | string | ✅ | Link destination |
| `aspectRatio` | number | ❌ | Image aspect ratio (default 16/10) |

## States
| State | Visual |
|-------|--------|
| **Default** | Subtle shadow, neutral border |
| **Hover** | Enhanced shadow, Framer Motion scale effect |

## Code Example
```tsx
<PortfolioCard
  title="Project Name"
  description="Brief project description here."
  imageUrl="/portfolio/project.png"
  href="https://example.com"
/>
```

## Cross-References
- [Card](./card.md) — generic MUI card component
