# TextField

## Metadata
- **Name:** TextField
- **Category:** Form / Input
- **Status:** Stable
- **File:** MUI `<TextField>` with theme overrides in `src/components/theme/theme.ts`

## Overview
Text input field for forms. Uses outlined variant with custom focus styling.

**When to use:** All form inputs — name, email, URL, message.
**When not to use:** N/A.

## Anatomy
1. **Label** — floating label
2. **Input** — text entry area
3. **Outline** — border with focus glow
4. **Helper text** (optional) — validation hint

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-border-soft` | Default outline border |
| `--color-border-medium` | Hover outline border |
| `--color-accent` | Focused outline border |
| `--color-focus-ring` | Focused box-shadow glow |
| `--radius-base` | border-radius: 10px |
| `--type-button` | font-size: 0.9375rem |
| `--dur-base` | Transition duration |

## States
| State | Visual |
|-------|--------|
| **Default** | Soft border, no glow |
| **Hover** | Medium border |
| **Focus** | Accent border (1.5px), accent glow ring |
| **Error** | Red border (MUI error color) |
| **Disabled** | Muted opacity |

## Code Example
```tsx
<TextField
  label="Full Name"
  fullWidth
  variant="outlined"
/>
```

## Cross-References
- [Dialog](./dialog.md) — often contains text fields
- [ContactForm](./contact-form.md) — primary consumer
