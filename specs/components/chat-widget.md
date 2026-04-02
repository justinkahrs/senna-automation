# ChatWidget

## Metadata
- **Name:** ChatWidget
- **Category:** Interactive / Communication
- **Status:** Stable
- **File:** `src/components/ChatWidget.tsx`

## Overview
A floating chat widget (bottom-right FAB) that connects visitors to Senna's
Telegram-based support team. Not AI — human-operated with specific business hours.

**When to use:** Present on every page via root layout.
**When not to use:** N/A — singleton global component.

## Anatomy
1. **FAB trigger** — pill-shaped floating button with chat icon + "Chat with Sales"
2. **Chat panel** — `<Paper>` popup above the FAB
   - **Header** — accent background with title + embedded logo on subtle bg
   - **Close button** — top-right icon button
   - **Consent view** — name input + disclaimer + start button
   - **Chat view** — message bubbles + input area
   - **Footer input** — text field + send button (or "chat ended" state)

## Tokens Used
| Token | Property |
|-------|----------|
| `--color-accent` | FAB + header background (via MUI primary) |
| `--color-bg-base` | FAB text, header text |
| `--color-bg-chat` | Logo container background |
| `--color-bg-paper` | Chat panel background |
| `--color-text-primary` | Logo font color |
| `--radius-pill` | FAB border-radius |
| `--weight-bold` | FAB text weight |
| `--type-body` | Chat message font size |
| `--z-toast` | z-index: 9999 |

## Props / API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| _(none)_ | — | — | Self-contained, reads localStorage for session |

## States
| State | Visual |
|-------|--------|
| **Closed** | Only FAB visible |
| **Open / no consent** | Panel showing name input + disclaimer |
| **Open / chatting** | Panel showing message thread + input |
| **Chat ended** | "Ended by agent" message + "Start New Chat" button |
| **Sending** | Send button shows spinner |

## Code Example
```tsx
// Used in layout.tsx — no props needed
<ChatWidget />
```

## Cross-References
- [Button](./button.md) — start chat / send buttons
- [TextField](./text-field.md) — name and message inputs
