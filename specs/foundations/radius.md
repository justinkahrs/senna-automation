# Border Radius

## Overview
Rounded corners in Senna Automation follow a consistent scale that ranges from
subtle rounding to full pills. The default MUI shape radius is 10px.

## Scale

| Token | Value | Use |
|-------|-------|-----|
| `--radius-xs` | 3px | Scrollbar thumb, minor rounding |
| `--radius-sm` | 4px | Code blocks, focus ring, small badges |
| `--radius-md` | 6px | Chips, tooltips |
| `--radius-base` | 10px | Text fields, default MUI shape |
| `--radius-lg` | 12px | Accordions, menus, dropdown containers |
| `--radius-xl` | 14px | Cards |
| `--radius-2xl` | 16px | Dialogs |
| `--radius-3xl` | 20px | Portfolio cards, large containers |
| `--radius-pill` | 9999px | Buttons, tabs, toggles, FABs |

## Rules
1. **Never use raw px values** for `border-radius`.
2. Buttons always use `--radius-pill`.
3. Cards use `--radius-xl` (14px).
4. Dialogs use `--radius-2xl` (16px).
5. Accordions and menus use `--radius-lg` (12px).
