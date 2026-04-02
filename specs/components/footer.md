# Footer

## Metadata
- **Name:** Footer
- **Category:** Layout / Navigation
- **Status:** Stable
- **File:** `src/components/layout/Footer.tsx`

## Overview
The site-wide footer with dark background. Contains the company tagline,
navigation links, social icons, BBB badge, and copyright notice.

**When to use:** Present on every page via root layout.
**When not to use:** N/A — singleton layout component.

## Anatomy
1. **Container** — full-width dark surface (warm-black)
2. **Tagline** — company description
3. **Nav columns** — grouped links (Company, Resources)
4. **Social icons** — LinkedIn icon with hover effect
5. **BBB badge** — accreditation image and link
6. **Bottom bar** — copyright + divider line

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-bg-inverse` | Background (via MUI "secondary.main") |
| `--color-text-on-dark-body` | Link text, descriptions (rgba 0.6) |
| `--color-text-on-dark-muted` | Copyright text (rgba 0.4) |
| `--color-text-inverse` | Link hover color |
| `--color-border-on-dark` | Bottom bar border (rgba 0.06) |
| `--radius-sm` | BBB badge border-radius |
| `--dur-base` | Link hover transition |

## States
| State | Visual |
|-------|--------|
| **Default** | Dark surface, muted text |
| **Link hover** | Text brightens to white |
| **Social icon hover** | Slight opacity/transform change |

## Code Example
```tsx
// Used in layout.tsx — no props needed
<Footer />
```

## Cross-References
- [AppBar](./appbar.md) — complementary layout component
