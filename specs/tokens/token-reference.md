# Token Reference — Master Map

Complete index of every CSS custom property in `src/app/tokens.css`.

## How to Read This Document
- **Layer 1** tokens (`--ds-*`) are upstream primitives — never reference directly in components.
- **Layer 2** tokens (no prefix) are semantic aliases — use these in all component code.
- The "When to use" column describes the semantic intent of each token.

---

## Colors — Text

| Token | Value | When to use |
|-------|-------|-------------|
| `--color-text-primary` | `var(--ds-warm-black, #1C1917)` | Primary headings, body text on light backgrounds |
| `--color-text-secondary` | `var(--ds-stone-600, #57534E)` | Secondary body text, descriptions |
| `--color-text-muted` | `var(--ds-stone-400, #A8A29E)` | Captions, placeholders, disabled text |
| `--color-text-inverse` | `var(--ds-white, #FFFFFF)` | Text on dark/accent backgrounds |
| `--color-text-accent` | `var(--ds-accent, #2D6B5E)` | Accent-colored text, active items |
| `--color-text-link` | `var(--ds-accent, #2D6B5E)` | Hyperlinks |
| `--color-text-link-hover` | `var(--ds-accent-light, #3D8B78)` | Hovered hyperlinks |
| `--color-text-on-dark` | `rgba(255,255,255, 0.70)` | Body text on dark surfaces |
| `--color-text-on-dark-secondary` | `rgba(255,255,255, 0.55)` | Secondary text on dark surfaces |
| `--color-text-on-dark-muted` | `rgba(255,255,255, 0.40)` | Muted/caption text on dark surfaces |
| `--color-text-on-dark-body` | `rgba(255,255,255, 0.60)` | Body/stat descriptions on dark surfaces |
| `--color-text-on-dark-subtle` | `rgba(255,255,255, 0.50)` | Subtle text on dark surfaces |
| `--color-text-on-dark-prominent` | `rgba(255,255,255, 0.78)` | Prominent labels on dark surfaces |
| `--color-text-on-dark-strong` | `rgba(255,255,255, 0.84)` | Strong emphasis on dark surfaces |
| `--color-text-on-dark-faint` | `rgba(255,255,255, 0.06)` | Divider/border lines on dark surfaces |

## Colors — Background

| Token | Value | When to use |
|-------|-------|-------------|
| `--color-bg-base` | `var(--ds-bg-base, #F7F6F4)` | Page background |
| `--color-bg-paper` | `var(--ds-bg-paper, #FFFFFF)` | Cards, dialogs, paper surfaces |
| `--color-bg-subtle` | `var(--ds-bg-subtle, #F0EFEC)` | Subtle background distinction |
| `--color-bg-inverse` | `var(--ds-warm-black, #1C1917)` | Dark sections (footer, hero CTA) |
| `--color-bg-dark` | `var(--ds-warm-dark, #292524)` | Menus, tooltips, dark UI |
| `--color-bg-chat` | `#F2F6F5` | Chat widget logo bar |
| `--color-bg-hover` | `rgba(45,107,94,0.06)` | Accent-tinted hover state |
| `--color-bg-selected` | `rgba(45,107,94,0.10)` | Accent-tinted selected state |
| `--color-bg-focus` | `rgba(45,107,94,0.12)` | Focus ring fill |
| `--color-bg-accent-faint` | `rgba(45,107,94,0.08)` | Very light accent wash |
| `--color-bg-accent-subtle` | `rgba(45,107,94,0.04)` | Barely visible accent |
| `--color-bg-accent-hover` | `rgba(45,107,94,0.07)` | Accent hover for nav items |
| `--color-bg-neutral-hover` | `rgba(28,25,23,0.04)` | Neutral element hover |
| `--color-bg-neutral-subtle` | `rgba(28,25,23,0.03)` | Very subtle neutral wash |
| `--color-bg-on-dark-hover` | `rgba(255,255,255,0.08)` | Hover on dark surfaces |
| `--color-bg-on-dark-subtle` | `rgba(255,255,255,0.03)` | Subtle fill on dark surfaces |
| `--color-bg-on-dark-raised` | `rgba(255,255,255,0.06)` | Raised element on dark surfaces |
| `--color-bg-on-dark-border` | `rgba(255,255,255,0.10)` | Border on dark surfaces |
| `--color-bg-on-dark-16` | `rgba(255,255,255,0.16)` | Medium fill on dark surfaces |
| `--color-bg-on-dark-22` | `rgba(255,255,255,0.22)` | Strong fill on dark surfaces |

## Colors — Accent

| Token | Value | When to use |
|-------|-------|-------------|
| `--color-accent` | `var(--ds-accent, #2D6B5E)` | Primary action, brand color |
| `--color-accent-light` | `var(--ds-accent-light, #3D8B78)` | Hover, lighter accent |
| `--color-accent-dark` | `var(--ds-accent-dark, #1E5244)` | Pressed, darker accent |

## Colors — Border

| Token | Value | When to use |
|-------|-------|-------------|
| `--color-border-soft` | `var(--ds-border-soft, #E7E5E4)` | Default borders |
| `--color-border-medium` | `var(--ds-border-med, #D6D3D1)` | Hover borders |
| `--color-border-accent` | `var(--ds-accent, #2D6B5E)` | Focused input borders |
| `--color-border-on-dark` | `rgba(255,255,255,0.06)` | Borders on dark surfaces |
| `--color-border-neutral-light` | `rgba(28,25,23,0.08)` | Light neutral border |
| `--color-border-neutral` | `rgba(0,0,0,0.05)` | Very light neutral border |

## Colors — Focus

| Token | Value | When to use |
|-------|-------|-------------|
| `--color-focus-ring` | `rgba(45,107,94,0.12)` | Input focus glow, focus ring |

---

## Spacing

| Token | Value | When to use |
|-------|-------|-------------|
| `--space-0` | 0px | Reset |
| `--space-0-5` | 2px | Hairline |
| `--space-1` | 4px | Tight, icons |
| `--space-1-5` | 6px | Small padding |
| `--space-2` | 8px | Small gaps |
| `--space-3` | 12px | Medium padding |
| `--space-4` | 16px | Standard gap |
| `--space-5` | 20px | Card padding |
| `--space-6` | 24px | Section sub-gap |
| `--space-8` | 32px | Section gap |
| `--space-10` | 40px | Medium section |
| `--space-12` | 48px | Large element |
| `--space-16` | 64px | Section spacing |
| `--space-20` | 80px | Page padding |
| `--space-24` | 96px | Large section |

---

## Typography

### Font Families
| Token | Value |
|-------|-------|
| `--font-sans` | Inter, system-ui, sans-serif |
| `--font-serif` | Cormorant Garamond, Georgia, serif |

### Font Sizes
| Token | Value |
|-------|-------|
| `--type-h1` | 4.209rem |
| `--type-h2` | 3.157rem |
| `--type-h3` | 2.369rem |
| `--type-h4` | 1.777rem |
| `--type-h5` | 1.125rem |
| `--type-h6` | 0.9375rem |
| `--type-body-lg` | 1.125rem |
| `--type-body` | 1.0rem |
| `--type-body-sm` | 0.875rem |
| `--type-caption` | 0.75rem |
| `--type-eyebrow` | 0.875rem |
| `--type-button` | 0.9375rem |
| `--type-pull` | 1.75rem |

### Font Weights
| Token | Value |
|-------|-------|
| `--weight-regular` | 400 |
| `--weight-medium` | 500 |
| `--weight-semibold` | 600 |
| `--weight-bold` | 700 |
| `--weight-extrabold` | 800 |

### Line Heights
| Token | Value |
|-------|-------|
| `--leading-none` | 1.0 |
| `--leading-tight` | 1.1 |
| `--leading-snug` | 1.25 |
| `--leading-normal` | 1.5 |
| `--leading-relaxed` | 1.65 |
| `--leading-loose` | 1.8 |

---

## Border Radius

| Token | Value |
|-------|-------|
| `--radius-xs` | 3px |
| `--radius-sm` | 4px |
| `--radius-md` | 6px |
| `--radius-base` | 10px |
| `--radius-lg` | 12px |
| `--radius-xl` | 14px |
| `--radius-2xl` | 16px |
| `--radius-3xl` | 20px |
| `--radius-pill` | 9999px |

---

## Elevation / Shadows

### Generic Scale
| Token | Description |
|-------|-------------|
| `--shadow-none` | No shadow |
| `--shadow-xs` | Card rest state |
| `--shadow-sm` | Slight lift |
| `--shadow-md` | Elevated container |
| `--shadow-lg` | Modal/popover |
| `--shadow-xl` | Hero sections |
| `--shadow-2xl` | Dramatic emphasis |

### Context-Specific
| Token | Context |
|-------|---------|
| `--shadow-card` | Card default |
| `--shadow-card-hover` | Card hover |
| `--shadow-dialog` | Dialog overlay |
| `--shadow-dropdown` | Dropdown menu |
| `--shadow-appbar` | Scrolled app bar |
| `--shadow-btn-accent` | Accent button hover |
| `--shadow-btn-dark` | Dark button hover |
| `--shadow-hero` | Hero section elements |
| `--shadow-hero-image` | Hero photos |
| `--shadow-cta` | CTA banner |
| `--shadow-pricing` | Pricing cards |
| `--shadow-portfolio` | Portfolio cards |
| `--shadow-portfolio-hover` | Portfolio cards hover |
| `--shadow-blog-card` | Blog cards |
| `--shadow-blog-card-hover` | Blog cards hover |
| `--shadow-blog-hero` | Blog hero images |
| `--shadow-blog-featured` | Blog featured |
| `--shadow-blog-article` | Blog article container |
| `--shadow-blog-header` | Blog header image |
| `--shadow-schedule` | Schedule dialog |

---

## Z-Index

| Token | Value | Use |
|-------|-------|-----|
| `--z-base` | 0 | Default stacking |
| `--z-raised` | 1 | Content above decorative elements |
| `--z-above` | 2 | Overlays within a section |
| `--z-dropdown` | 100 | Dropdowns, tooltips |
| `--z-sticky` | 200 | Sticky headers |
| `--z-overlay` | 1000 | Full-screen overlays |
| `--z-modal` | 2000 | Modals, dialogs |
| `--z-toast` | 9999 | Chat widget, notifications |

---

## Motion

### Easing
| Token | Value |
|-------|-------|
| `--ease-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `--ease-enter` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-exit` | `cubic-bezier(0.55, 0, 1, 0.45)` |

### Duration
| Token | Value |
|-------|-------|
| `--dur-instant` | 0ms |
| `--dur-fast` | 120ms |
| `--dur-base` | 180ms |
| `--dur-moderate` | 280ms |
| `--dur-slow` | 520ms |

### Shorthand Transitions
| Token | Animates |
|-------|----------|
| `--transition-colors` | color, background-color, border-color |
| `--transition-shadow` | box-shadow |
| `--transition-transform` | transform |
| `--transition-all-fast` | color, bg, border, opacity, transform, shadow |

---

## Legacy Aliases

| Token | Points to | Note |
|-------|-----------|------|
| `--background` | `var(--color-bg-base)` | Backward compat |
| `--foreground` | `var(--color-text-primary)` | Backward compat |
