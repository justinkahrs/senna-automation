# Color

## Overview
Senna Automation uses a confident, modern color palette built around magenta and
cyan accents, offset by cool indigo darks and soft off-white backgrounds. The
palette conveys energy, trust, and premium quality.

## Palette

### Core neutrals
| Swatch | Token | Hex | Usage |
|--------|-------|-----|-------|
| ■ | `--ds-space-indigo` | `#181925` | Primary text, dark surfaces, headlines |
| ■ | `--ds-shadow-grey` | `#2b2d42` | Secondary dark surfaces, menus, tooltips, nav links |
| ■ | `--ds-airforce-blue` | `#5f8594` | Body/secondary/muted text, descriptions |

### Backgrounds
| Swatch | Token | Hex | Usage |
|--------|-------|-----|-------|
| □ | `--ds-bg-base` | `#f8f7f9` | Page background (Bright Snow) |
| □ | `--ds-bg-paper` | `#FFFFFF` | Cards, paper surfaces |
| □ | `--ds-bg-subtle` | `#f8f7f9` | Subtle distinction (alternate sections) |

### Accent (brand magenta)
| Swatch | Token | Hex | Usage |
|--------|-------|-----|-------|
| ■ | `--ds-magenta` | `#8f006b` | Primary CTAs, links, active states |
| ■ | `--ds-magenta-light` | `#991778` | Hover states, button hover |
| ■ | `--ds-magenta-dark` | `#8f006b` | Active/pressed states |

### Highlight & Energy
| Swatch | Token | Hex | Usage |
|--------|-------|-----|-------|
| ■ | `--ds-banana` | `#f7ec59` | Badges, highlight underlines, floating accents |
| ■ | `--ds-light-cyan` | `#92dce5` | Bright accent, footer links, hover borders |
| ■ | `--ds-frosted-blue` | `#c5eaef` | Subtle borders (30% opacity), card backgrounds |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `--ds-border-soft` | `#c5eaef` | Default card/input borders (Frosted Blue) |
| `--ds-border-med` | `#92dce5` | Hover borders, scrollbar thumb (Light Cyan) |

### On-dark surface text
White at calibrated opacities for use on `--ds-space-indigo` or `--ds-shadow-grey` backgrounds:

| Token | Opacity | Usage |
|-------|---------|-------|
| `--color-text-on-dark` | 0.70 | Body text on dark |
| `--color-text-on-dark-secondary` | 0.55 | Secondary text on dark |
| `--color-text-on-dark-muted` | 0.40 | Muted text, captions on dark |
| `--color-text-on-dark-body` | 0.60 | Body/stat descriptions on dark |
| `--color-text-on-dark-prominent` | 0.78 | Prominent labels on dark |
| `--color-text-on-dark-strong` | 0.84 | Strong emphasis on dark |
| `--color-text-on-dark-subtle` | 0.50 | Subtle text on dark |
| `--color-text-on-dark-faint` | 0.06 | Borders/dividers on dark |

### Interactive state colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-hover` | `rgba(143,0,107,0.06)` | Accent-tinted hover |
| `--color-bg-selected` | `rgba(143,0,107,0.10)` | Accent-tinted selected |
| `--color-bg-focus` | `rgba(143,0,107,0.12)` | Focus ring fill |
| `--color-bg-neutral-hover` | `rgba(24,25,37,0.04)` | Neutral hover |

## Usage Patterns
- **Primary Actions**: Dark Magenta `#8f006b` → strong CTAs
- **Text Hierarchy**: Space Indigo (headlines) → Shadow Grey (subheads) → Air Force Blue (body)
- **Backgrounds**: Bright Snow `#f8f7f9` ↔ White (alternating sections)
- **Accents/Energy**: Banana Cream `#f7ec59` for highlights and badges
- **Calm/Trust**: Light Cyan `#92dce5` & Frosted Blue `#c5eaef` for soft touches
- **Dark Sections**: Space Indigo `#181925` with Light Cyan text

## Rules
1. **Never use raw hex or rgba values** in component code.
   Use `var(--color-*)` semantic aliases.
2. Text on light backgrounds: `--color-text-primary`, `--color-text-secondary`, or `--color-text-muted`.
3. Text on dark backgrounds: use the `--color-text-on-dark-*` tokens.
4. Interactive states: always use the pre-defined `--color-bg-*-hover`/selected/focus tokens.
