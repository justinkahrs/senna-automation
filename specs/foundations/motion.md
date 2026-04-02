# Motion / Transitions

## Overview
Senna Automation favors subtle, purposeful motion. Animations reinforce the
calm, premium brand identity. The system provides three easing curves and
four duration steps.

## Easing Curves

| Token | Value | Use |
|-------|-------|-----|
| `--ease-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Default for all UI transitions |
| `--ease-enter` | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering the viewport |
| `--ease-exit` | `cubic-bezier(0.55, 0, 1, 0.45)` | Elements leaving the viewport |

## Duration Steps

| Token | Value | Use |
|-------|-------|-----|
| `--dur-instant` | 0ms | Disabling animation |
| `--dur-fast` | 120ms | Micro-interactions: hover, active, focus, color changes |
| `--dur-base` | 180ms | Standard transitions: button, link, nav item state changes |
| `--dur-moderate` | 280ms | Card hover lift, accordion expand, medium transitions |
| `--dur-slow` | 520ms | Full-page transitions, entrance animations |

## Composite Transition Shorthands

| Token | Animates |
|-------|----------|
| `--transition-colors` | `color`, `background-color`, `border-color` at `--dur-base` |
| `--transition-shadow` | `box-shadow` at `--dur-moderate` |
| `--transition-transform` | `transform` at `--dur-fast` |
| `--transition-all-fast` | All visual properties at `--dur-fast` |

## Framer Motion
For JS-driven animations (Framer Motion), use the same easing values:
```tsx
transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
```

This corresponds to `--ease-smooth` / `--dur-moderate`.

## Keyframe Animations
Defined in `globals.css`:
- `fadeInUp` — entrance animation, 18px translate
- `fadeIn` — simple opacity fade
- `slideInFromRight` / `slideInFromLeft` — drawer/panel slides
- `subtlePulse` — pulsing indicator

## Rules
1. **Never use raw `ms` or easing values** in CSS `transition` properties.
2. Use `var(--dur-*)` for durations and `var(--ease-*)` for easing.
3. Use `var(--transition-*)` shorthand where it matches the property set.
4. For Framer Motion, reference the numeric equivalents documented above.
5. Respect `prefers-reduced-motion` — Framer's `useReducedMotion` hook is
   already used in animation components.
