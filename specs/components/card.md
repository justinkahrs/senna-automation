# Card

## Metadata
- **Name:** Card
- **Category:** Container / Content
- **Status:** Stable
- **File:** MUI `<Card>` with theme overrides in `src/components/theme/theme.ts`

## Overview
A surface container for grouping related content. Provides elevation, rounded
corners, and hover-lift interaction.

**When to use:** Product features, pricing tiers, blog previews, team bios.
**When not to use:** Full-width content sections (use `<Box>` or `<Container>`).

## Anatomy
1. **CardMedia** — optional image/media header (200px height)
2. **CardHeader** — optional title + subtitle area (20px padding)
3. **CardContent** — main body content (20px padding)
4. **CardActions** — optional action buttons at bottom

## Tokens Used
| Token | Property |
|-------|----------|
| `--shadow-card` | Default box-shadow (alias for `--shadow-xs`) |
| `--shadow-card-hover` | Hover box-shadow |
| `--color-border-soft` | Default border |
| `--color-border-medium` | Hover border |
| `--radius-xl` | border-radius: 14px |
| `--dur-moderate` / `--ease-smooth` | Hover transition |

## States
| State | Visual |
|-------|--------|
| **Default** | Subtle shadow, soft border |
| **Hover** | Lifts 3px, enhanced shadow, border darkens |

## Code Example
```tsx
<Card>
  <CardContent>
    <Typography variant="h5">Card Title</Typography>
    <Typography variant="body2">Card content goes here.</Typography>
  </CardContent>
</Card>
```

## Cross-References
- [PortfolioCard](./portfolio-card.md) — custom card variant for portfolio
- [ProductCard](./product-card.md) — if applicable
