"use client";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { blink } from "./animations";

import type { Theme, ThemeOptions } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Theme {
    keyframes: { blink: object };
  }
  interface ThemeOptions {
    keyframes?: { blink?: object };
  }
}

/* ================================================================
   FONTS
   ================================================================ */

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

/* ================================================================
   DESIGN TOKENS
   ================================================================ */

// ── Palette ──────────────────────────────────────────────────────
const WARM_BLACK    = "#1C1917";   // stone-900 warm near-black
const WARM_DARK     = "#292524";   // stone-800
const STONE_600     = "#57534E";   // readable warm mid-tone
const STONE_400     = "#A8A29E";   // muted label / placeholder
const ACCENT        = "#2D6B5E";   // muted sage-teal — trust, capability
const ACCENT_LIGHT  = "#3D8B78";
const ACCENT_DARK   = "#1E5244";
const BG_BASE       = "#F7F6F4";   // warm off-white — calm, premium
const BG_PAPER      = "#FFFFFF";
const BG_SUBTLE     = "#F0EFEC";   // second-layer sections
const BORDER_SOFT   = "#E7E5E4";
const BORDER_MED    = "#D6D3D1";

// ── Type families ─────────────────────────────────────────────────
const SERIF  = cormorant.style.fontFamily;   // display heads
const SANS   = inter.style.fontFamily;       // body, UI, labels

/* ================================================================
   TYPE SCALE — Senna Automation Design System
   ────────────────────────────────────────────
   Ratio: ~1.265 (augmented fourth, slightly compressed for calm)
   Base: 16px

   Variant     Family  Desktop   Mobile   Wt   LH    LS
   h1          Serif   4.209rem  2.75rem  600  1.10  -0.030em
   h2          Serif   3.157rem  2.25rem  600  1.13  -0.025em
   h3          Serif   2.369rem  1.875rem 500  1.18  -0.020em
   h4          Serif   1.777rem  1.5rem   500  1.25  -0.015em
   h5          Sans    1.125rem  1.0rem   600  1.35  -0.015em
   h6          Sans    0.9375rem 0.875rem 600  1.40  -0.010em
   subtitle1   Sans    1.125rem  1.0625rem 500 1.60  -0.010em  (body large)
   subtitle2   Sans    0.9375rem 0.875rem 500  1.55  -0.008em  (body medium)
   body1       Sans    1.0rem    1.0rem   400  1.65  -0.008em  (body)
   body2       Sans    0.875rem  0.875rem 400  1.60   0.000em  (small body)
   button      Sans    0.9375rem 0.9375rem 500 1.00  -0.010em
   caption     Sans    0.75rem   0.75rem  400  1.50  +0.010em
   overline    Sans    0.6875rem 0.6875rem 700 1.50  +0.080em  uppercase (eyebrow)
   ================================================================ */

export function getThemeTokens(): ThemeOptions {
  return {
    keyframes: { blink },

    /* ── Palette ── */
    palette: {
      mode:   "light",
      primary: {
        main:          ACCENT,
        light:         ACCENT_LIGHT,
        dark:          ACCENT_DARK,
        contrastText:  "#FFFFFF",
      },
      secondary: {
        main:          WARM_BLACK,
        contrastText:  "#FFFFFF",
      },
      background: {
        default: BG_BASE,
        paper:   BG_PAPER,
      },
      text: {
        primary:   WARM_BLACK,
        secondary: STONE_600,
        disabled:  STONE_400,
      },
      divider: BORDER_SOFT,
      action: {
        hover:    "rgba(45, 107, 94, 0.06)",
        selected: "rgba(45, 107, 94, 0.10)",
        focus:    "rgba(45, 107, 94, 0.12)",
      },
    },

    /* ── Typography ── */
    typography: {
      fontFamily: SANS,
      // base is 16px (browser default)
      htmlFontSize: 16,

      /* ─── Display & section headings (Cormorant Garamond) ─── */

      h1: {
        fontFamily:    SERIF,
        fontWeight:    600,
        // Desktop: 67.34px | Mobile: 44px
        fontSize:      "clamp(2.75rem, 5.5vw, 4.209rem)",
        lineHeight:    1.10,
        letterSpacing: "-0.030em",
        color:         WARM_BLACK,
      },
      h2: {
        fontFamily:    SERIF,
        fontWeight:    600,
        // Desktop: 50.5px | Mobile: 36px
        fontSize:      "clamp(2.25rem, 4.5vw, 3.157rem)",
        lineHeight:    1.13,
        letterSpacing: "-0.025em",
        color:         WARM_BLACK,
      },
      h3: {
        fontFamily:    SERIF,
        fontWeight:    500,
        // Desktop: 37.9px | Mobile: 30px
        fontSize:      "clamp(1.875rem, 3.5vw, 2.369rem)",
        lineHeight:    1.18,
        letterSpacing: "-0.020em",
        color:         WARM_BLACK,
      },
      h4: {
        fontFamily:    SERIF,
        fontWeight:    500,
        // Desktop: 28.4px | Mobile: 24px
        fontSize:      "clamp(1.5rem, 2.5vw, 1.777rem)",
        lineHeight:    1.25,
        letterSpacing: "-0.015em",
        color:         WARM_BLACK,
      },

      /* ─── UI headings (Inter sans) ─── */

      h5: {
        fontFamily:    SANS,
        fontWeight:    600,
        fontSize:      "1.125rem",     // 18px — same as body-lg, but bolder
        lineHeight:    1.35,
        letterSpacing: "-0.015em",
        color:         WARM_BLACK,
      },
      h6: {
        fontFamily:    SANS,
        fontWeight:    600,
        fontSize:      "0.9375rem",    // 15px — same as button, headed feel
        lineHeight:    1.40,
        letterSpacing: "-0.010em",
        color:         WARM_BLACK,
      },

      /* ─── Body large / callout text ─── */
      subtitle1: {
        fontFamily:    SANS,
        fontWeight:    400,
        fontSize:      "1.125rem",     // 18px
        lineHeight:    1.60,
        letterSpacing: "-0.010em",
        color:         STONE_600,
      },

      /* ─── Body medium (cards, list items, secondary context) ─── */
      subtitle2: {
        fontFamily:    SANS,
        fontWeight:    500,
        fontSize:      "0.9375rem",    // 15px
        lineHeight:    1.55,
        letterSpacing: "-0.008em",
        color:         STONE_600,
      },

      /* ─── Body (standard paragraphs) ─── */
      body1: {
        fontFamily:    SANS,
        fontWeight:    400,
        fontSize:      "1.0rem",       // 16px
        lineHeight:    1.65,
        letterSpacing: "-0.008em",
        color:         STONE_600,
      },

      /* ─── Small body (secondary descriptions, list items) ─── */
      body2: {
        fontFamily:    SANS,
        fontWeight:    400,
        fontSize:      "0.875rem",     // 14px
        lineHeight:    1.60,
        letterSpacing: "0.000em",
        color:         STONE_600,
      },

      /* ─── Button text ─── */
      button: {
        fontFamily:    SANS,
        fontWeight:    500,
        fontSize:      "0.9375rem",    // 15px
        lineHeight:    1.0,
        letterSpacing: "-0.010em",
        textTransform: "none",
      },

      /* ─── Caption / meta text ─── */
      caption: {
        fontFamily:    SANS,
        fontWeight:    400,
        fontSize:      "0.75rem",      // 12px
        lineHeight:    1.50,
        letterSpacing: "0.010em",
        color:         STONE_400,
      },

      /* ─── Eyebrow / label ─── */
      overline: {
        fontFamily:    SANS,
        fontWeight:    700,
        fontSize:      "0.6875rem",    // 11px
        lineHeight:    1.50,
        letterSpacing: "0.080em",
        textTransform: "uppercase",
        color:         STONE_400,
      },
    },

    /* ── Shape ── */
    shape: { borderRadius: 10 },

    /* ── Shadows (warm, not cold) ── */
    shadows: [
      "none",
      "0 1px 3px rgba(28,25,23,0.06), 0 1px 2px rgba(28,25,23,0.04)",
      "0 4px 16px rgba(28,25,23,0.08), 0 2px 6px rgba(28,25,23,0.05)",
      "0 8px 32px rgba(28,25,23,0.10), 0 3px 10px rgba(28,25,23,0.06)",
      "0 1px 0px rgba(28,25,23,0.06)",
      "0 4px 24px rgba(28,25,23,0.12)",
      "0 6px 28px rgba(28,25,23,0.13)",
      "0 8px 32px rgba(28,25,23,0.14)",
      "0 10px 36px rgba(28,25,23,0.15)",
      "0 12px 40px rgba(28,25,23,0.16)",
      "0 14px 44px rgba(28,25,23,0.17)",
      "0 16px 48px rgba(28,25,23,0.18)",
      "0 18px 52px rgba(28,25,23,0.19)",
      "0 20px 56px rgba(28,25,23,0.20)",
      "0 22px 60px rgba(28,25,23,0.21)",
      "0 24px 64px rgba(28,25,23,0.22)",
      "0 26px 68px rgba(28,25,23,0.23)",
      "0 28px 72px rgba(28,25,23,0.24)",
      "0 30px 76px rgba(28,25,23,0.25)",
      "0 32px 80px rgba(28,25,23,0.26)",
      "0 34px 84px rgba(28,25,23,0.27)",
      "0 36px 88px rgba(28,25,23,0.28)",
      "0 38px 92px rgba(28,25,23,0.29)",
      "0 40px 96px rgba(28,25,23,0.30)",
      "0 42px 100px rgba(28,25,23,0.31)",
    ],

    /* ── Component overrides ── */
    components: {

      /* ── AppBar ── */
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: BG_PAPER,
            color:           WARM_BLACK,
            boxShadow:       `0 1px 0 ${BORDER_SOFT}`,
            backdropFilter:  "blur(12px)",
            transition:      "background-color 0.4s ease, box-shadow 0.4s ease",
          },
        },
      },

      /* ── Toolbar ── */
      MuiToolbar: {
        styleOverrides: {
          root: {
            alignItems: "center",
            minHeight: "64px !important",
          },
        },
      },

      /* ── Button ── */
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily:    SANS,
            fontWeight:    500,
            fontSize:      "0.9375rem",
            letterSpacing: "-0.010em",
            lineHeight:    1.0,
            borderRadius:  "9999px",
            padding:       "10px 28px",
            textTransform: "none",
            transition: [
              "background-color 180ms cubic-bezier(0.25,0.46,0.45,0.94)",
              "color 180ms cubic-bezier(0.25,0.46,0.45,0.94)",
              "border-color 180ms cubic-bezier(0.25,0.46,0.45,0.94)",
              "box-shadow 180ms cubic-bezier(0.25,0.46,0.45,0.94)",
              "transform 120ms cubic-bezier(0.25,0.46,0.45,0.94)",
            ].join(", "),
            "&:active": { transform: "scale(0.975)" },
          },
          contained: {
            boxShadow: "none",
            "&:hover": { boxShadow: "0 4px 14px rgba(45,107,94,0.22)" },
          },
          outlined: {
            borderWidth: "1.5px",
            "&:hover":   { borderWidth: "1.5px" },
          },
          sizeSmall: {
            padding:  "6px 18px",
            fontSize: "0.8125rem",
          },
          sizeLarge: {
            padding:  "13px 36px",
            fontSize: "1.0625rem",
          },
        },
      },

      /* ── Card ── */
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            overflow:     "hidden",
            position:     "relative",
            boxShadow:    "0 1px 3px rgba(28,25,23,0.06), 0 1px 2px rgba(28,25,23,0.04)",
            border:       `1px solid ${BORDER_SOFT}`,
            transition:
              "transform 280ms cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 280ms cubic-bezier(0.25,0.46,0.45,0.94), border-color 280ms cubic-bezier(0.25,0.46,0.45,0.94)",
            "&:hover": {
              transform:   "translateY(-3px)",
              boxShadow:   "0 8px 28px rgba(28,25,23,0.10), 0 3px 8px rgba(28,25,23,0.06)",
              borderColor: BORDER_MED,
            },
          },
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          root: { width: "100%", height: 200, objectFit: "cover" },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: "20px",
            "& .MuiCardHeader-title": {
              fontFamily:    SANS,
              fontWeight:    600,
              fontSize:      "1.0625rem",
              letterSpacing: "-0.010em",
            },
            "& .MuiCardHeader-subheader": {
              fontFamily: SANS,
              fontSize:   "0.875rem",
              color:      STONE_600,
              marginTop:  2,
            },
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "20px",
            "&:last-child": { paddingBottom: "20px" },
          },
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding:        "12px 20px 20px",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
          },
        },
      },

      /* ── CssBaseline / global overrides ── */
      MuiCssBaseline: {
        styleOverrides: {
          ".themeToggleIcon": {
            display:        "inline-flex",
            alignItems:     "center",
            justifyContent: "center",
            cursor:         "pointer",
          },
        },
      },

      /* ── Accordion ── */
      MuiAccordion: {
        styleOverrides: {
          root: {
            border:          `1px solid ${BORDER_SOFT}`,
            borderRadius:    "12px !important",
            boxShadow:       "none",
            backgroundColor: BG_PAPER,
            transition:      "background-color 220ms ease, border-color 220ms ease",
            "&:before":      { display: "none" },
            "&.Mui-expanded": {
              borderColor:     BORDER_MED,
              backgroundColor: BG_SUBTLE,
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            padding:   "4px 20px",
            minHeight: 58,
            "&.Mui-expanded": { minHeight: 58 },
            "& .MuiAccordionSummary-expandIconWrapper": {
              color:      STONE_400,
              transition: "transform 250ms cubic-bezier(0.25,0.46,0.45,0.94), color 220ms ease",
            },
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              color: ACCENT,
            },
          },
          content: {
            margin: "16px 0",
            "&.Mui-expanded": { margin: "16px 0" },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { padding: "0 20px 22px" },
        },
      },

      /* ── Dialog ── */
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            overflow:     "hidden",
            boxShadow:    "0 20px 64px rgba(28,25,23,0.14), 0 6px 16px rgba(28,25,23,0.08)",
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontFamily:    SANS,
            padding:       "20px 24px 12px",
            fontWeight:    600,
            fontSize:      "1.125rem",
            letterSpacing: "-0.010em",
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: { padding: "8px 24px", fontSize: "0.9375rem" },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: { padding: "12px 24px 20px", gap: 8 },
        },
      },

      /* ── TextField ── */
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,
              transition:   "box-shadow 200ms ease",
              fontFamily:   SANS,
              fontSize:     "0.9375rem",
              "&:hover .MuiOutlinedInput-notchedOutline":   { borderColor: BORDER_MED },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: ACCENT,
                borderWidth: "1.5px",
              },
              "&.Mui-focused": { boxShadow: "0 0 0 3px rgba(45,107,94,0.12)" },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: BORDER_SOFT,
              transition:  "border-color 180ms ease",
            },
            "& .MuiInputLabel-root": {
              fontFamily:    SANS,
              fontSize:      "0.9375rem",
              letterSpacing: "-0.008em",
            },
          },
        },
      },

      /* ── InputBase ── */
      MuiInputBase: {
        styleOverrides: {
          input: {
            fontFamily:    SANS,
            fontSize:      "0.9375rem",
            letterSpacing: "-0.008em",
            "&[type=number]": { MozAppearance: "textfield" },
            "&[type=number]::-webkit-outer-spin-button": { WebkitAppearance: "none", margin: 0 },
            "&[type=number]::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
          },
        },
      },

      /* ── List typography ── */
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontFamily:    SANS,
            fontSize:      "0.9375rem",
            fontWeight:    400,
            lineHeight:    1.55,
            letterSpacing: "-0.008em",
            color:         STONE_600,
          },
          secondary: {
            fontFamily: SANS,
            fontSize:   "0.875rem",
            lineHeight: 1.55,
            color:      STONE_400,
          },
        },
      },

      /* ── Menu ── */
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: WARM_DARK,
            borderRadius:    12,
            boxShadow:       "0 8px 32px rgba(28,25,23,0.16)",
            border:          "1px solid rgba(255,255,255,0.06)",
            width:           "200px",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            backgroundColor: WARM_DARK,
            color:           "#FFFFFF",
            fontFamily:      SANS,
            fontSize:        "0.9375rem",
            letterSpacing:   "-0.008em",
            padding:         "10px 16px",
            transition:      "background-color 150ms ease",
            "&:hover":       { backgroundColor: "rgba(255,255,255,0.08)" },
            "&:not(:last-child)": { borderBottom: "1px solid rgba(255,255,255,0.06)" },
          },
        },
      },

      /* ── Switch ── */
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: STONE_400,
            "&.Mui-checked": { color: ACCENT },
          },
          track: {
            backgroundColor: BORDER_MED,
            ".Mui-checked.Mui-checked + &": { backgroundColor: ACCENT_LIGHT },
          },
        },
      },

      /* ── Chip ── */
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily:    SANS,
            fontWeight:    600,
            fontSize:      "0.75rem",
            letterSpacing: "0.010em",
            borderRadius:  6,
          },
        },
      },

      /* ── Tooltip ── */
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: WARM_DARK,
            fontFamily:      SANS,
            fontSize:        "0.8125rem",
            letterSpacing:   "-0.008em",
            borderRadius:    6,
            padding:         "6px 12px",
          },
        },
      },

      /* ── IconButton ── */
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "background-color 180ms ease, color 180ms ease, transform 120ms ease",
            "&:hover":  { backgroundColor: "rgba(28,25,23,0.05)" },
            "&:active": { transform: "scale(0.92)" },
          },
        },
      },

      /* ── Divider ── */
      MuiDivider: {
        styleOverrides: {
          root: { borderColor: BORDER_SOFT },
        },
      },
    },
  };
}
