# Menu

## Metadata
- **Name:** Menu
- **Category:** Navigation / Overlay
- **Status:** Stable
- **File:** MUI `<Menu>` with theme overrides in `src/components/theme/theme.ts`

## Overview
A dark-themed dropdown menu used for navigation sub-items.

**When to use:** Navigation dropdowns, context menus.
**When not to use:** Form selects (use MUI `<Select>`).

## Anatomy
1. **Paper** — dark rounded container
2. **MenuItems** — individual selectable rows with dividers

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-bg-dark` | Menu background |
| `--color-text-inverse` | Menu item text |
| `--color-border-on-dark` | Item divider border |
| `--color-bg-on-dark-hover` | Item hover background |
| `--shadow-dropdown` | box-shadow |
| `--radius-lg` | border-radius: 12px |
| `--type-button` | Item font size |
| `--dur-base` | Hover transition |

## States
| State | Visual |
|-------|--------|
| **Default** | Dark, elevated popup |
| **Item hover** | Slightly lighter background |
| **Item active** | Same as hover |

## Code Example
```tsx
<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
  <MenuItem onClick={handleClose}>Option 1</MenuItem>
  <MenuItem onClick={handleClose}>Option 2</MenuItem>
</Menu>
```

## Cross-References
- [AppBar](./appbar.md) — primary consumer
