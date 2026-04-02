# Color

## Overview
Senna Automation uses a warm, natural color palette inspired by stone and forest
tones. The palette conveys trust, calm professionalism, and premium quality.

## Palette

### Core neutrals
| Swatch | Token | Hex | Usage |
|--------|-------|-----|-------|
| ■ | `--ds-warm-black` | `#1C1917` | Primary text, dark surfaces |
| ■ | `--ds-warm-dark` | `#292524` | Secondary dark surfaces, menus, tooltips |
| ■ | `--ds-stone-600` | `#57534E` | Secondary/body text |
| ■ | `--ds-stone-400` | `#A8A29E` | Muted/caption text, placeholders |

### Backgrounds
| Swatch | Token | Hex | Usage |
|--------|-------|-----|-------|
| □ | `--ds-bg-base` | `#F7F6F4` | Page background |
| □ | `--ds-bg-paper` | `#FFFFFF` | Cards, paper surfaces |
| □ | `--ds-bg-subtle` | `#F0EFEC` | Subtle distinction (expanded accordion, alternate rows) |

### Accent (brand green)
| Swatch | Token | Hex | Usage |
|--------|-------|-----|-------|
| ■ | `--ds-accent` | `#2D6B5E` | Primary buttons, links, active states |
| ■ | `--ds-accent-light` | `#3D8B78` | Hover states, switch tracks |
| ■ | `--ds-accent-dark` | `#1E5244` | Active/pressed states |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `--ds-border-soft` | `#E7E5E4` | Default card/input borders |
| `--ds-border-med` | `#D6D3D1` | Hover borders, scrollbar thumb |

### On-dark surface text
White at calibrated opacities for use on `--ds-warm-black` or `--ds-warm-dark` backgrounds:

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
| `--color-bg-hover` | `rgba(45,107,94,0.06)` | Accent-tinted hover |
| `--color-bg-selected` | `rgba(45,107,94,0.10)` | Accent-tinted selected |
| `--color-bg-focus` | `rgba(45,107,94,0.12)` | Focus ring fill |
| `--color-bg-neutral-hover` | `rgba(28,25,23,0.04)` | Neutral hover |

## Rules
1. **Never use raw hex or rgba values** in component code.
   Use `var(--color-*)` semantic aliases.
2. Text on light backgrounds: `--color-text-primary`, `--color-text-secondary`, or `--color-text-muted`.
3. Text on dark backgrounds: use the `--color-text-on-dark-*` tokens.
4. Interactive states: always use the pre-defined `--color-bg-*-hover`/selected/focus tokens.
