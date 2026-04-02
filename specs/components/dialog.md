# Dialog

## Metadata
- **Name:** Dialog
- **Category:** Overlay / Modal
- **Status:** Stable
- **File:** MUI `<Dialog>` with theme overrides in `src/components/theme/theme.ts`

## Overview
A modal overlay for focused interactions — confirmations, forms, scheduling.

**When to use:** Actions requiring focused attention or additional input.
**When not to use:** Simple inline feedback (use snackbar or inline messages).

## Anatomy
1. **Backdrop** — dimmed overlay behind dialog
2. **Paper** — rounded container (16px radius)
3. **DialogTitle** — heading area
4. **DialogContent** — body content
5. **DialogActions** — action buttons

## Tokens Used
| Token | Property |
|-------|----------|
| `--shadow-dialog` | box-shadow |
| `--radius-2xl` | border-radius: 16px |
| `--type-h5` | Title font size |
| `--weight-semibold` | Title font weight |
| `--space-6` | Horizontal padding (24px) |
| `--space-5` | Title top padding (20px) |

## States
| State | Visual |
|-------|--------|
| **Open** | Centered on screen with dimmed backdrop |
| **Closed** | Not rendered |

## Code Example
```tsx
<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Confirm Action</DialogTitle>
  <DialogContent>
    <Typography>Are you sure?</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
  </DialogActions>
</Dialog>
```

## Cross-References
- [ScheduleCallButton](./schedule-call-button.md) — uses dialog internally
- [Button](./button.md) — action buttons within dialog
