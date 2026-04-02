# Elevation / Shadows

## Overview
Senna Automation uses warm-toned shadows based on `rgba(28,25,23,…)` 
(warm black) rather than cool `rgba(0,0,0,…)` grays. This creates a
natural, premium feel that complements the stone-inspired palette.

## Generic Scale

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-none` | `none` | Flat surfaces, reset |
| `--shadow-xs` | `0 1px 3px rgba(28,25,23,0.06), 0 1px 2px rgba(28,25,23,0.04)` | Cards at rest |
| `--shadow-sm` | `0 4px 16px rgba(28,25,23,0.08), 0 2px 6px rgba(28,25,23,0.05)` | Slight lift |
| `--shadow-md` | `0 8px 32px rgba(28,25,23,0.10), 0 3px 10px rgba(28,25,23,0.06)` | Elevated containers |
| `--shadow-lg` | `0 20px 60px rgba(28,25,23,0.12), 0 6px 16px rgba(28,25,23,0.08)` | Modals, popovers |
| `--shadow-xl` | `0 32px 80px rgba(28,25,23,0.16), 0 8px 24px rgba(28,25,23,0.10)` | Hero sections |
| `--shadow-2xl` | `0 40px 100px rgba(28,25,23,0.20), 0 10px 32px rgba(28,25,23,0.12)` | Dramatic emphasis |

## Context-Specific Shadows

| Token | Use |
|-------|-----|
| `--shadow-card` | Card default (alias for `--shadow-xs`) |
| `--shadow-card-hover` | Card on hover |
| `--shadow-dialog` | Dialog/modal overlay |
| `--shadow-dropdown` | Menu dropdown |
| `--shadow-appbar` | Scrolled app bar |
| `--shadow-btn-accent` | Contained button hover glow |
| `--shadow-btn-dark` | Dark button hover |
| `--shadow-hero` | Hero section cards |
| `--shadow-hero-image` | Hero section photos |
| `--shadow-blog-card` | Blog index cards |
| `--shadow-blog-card-hover` | Blog card hover |
| `--shadow-cta` | CTA banner |
| `--shadow-pricing` | Pricing cards |
| `--shadow-portfolio` | Portfolio cards at rest |
| `--shadow-portfolio-hover` | Portfolio cards on hover |
| `--shadow-schedule` | Schedule dialog |

## Rules
1. **Never write raw box-shadow values** in component code.
2. For common patterns, use the context-specific tokens.
3. For custom needs, compose from the generic scale tokens.
4. The `MuiCard` theme override already uses `--shadow-card`; don't duplicate.
