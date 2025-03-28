"use client";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { blink } from "./animations";

import type { PaletteMode, Theme, ThemeOptions } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Theme {
    keyframes: {
      blink: object;
    };
  }
  interface ThemeOptions {
    keyframes?: {
      blink?: object;
    };
  }
}
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export function getThemeTokens(mode: PaletteMode): ThemeOptions {
  return {
    keyframes: { blink },
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#000000" : "#FFFFFF",
        contrastText: mode === "light" ? "#FFFFFF" : "#000000",
      },
      background: {
        default: mode === "light" ? "#F5F6F7" : "#121212",
        paper: mode === "light" ? "#FFFFFF" : "#181818",
      },
      text: {
        primary: mode === "light" ? "#1A1A1A" : "#FFFFFF",
        secondary: mode === "light" ? "#4A4A4A" : "#AAAAAA",
      },
      divider: mode === "light" ? "#E3E5E7" : "#444444",
    },
    typography: {
      fontFamily: inter.style.fontFamily,
      h1: {
        fontFamily: cormorant.style.fontFamily,
        fontWeight: 600,
      },
      h2: {
        fontFamily: cormorant.style.fontFamily,
        fontWeight: 600,
      },
      h3: {
        fontFamily: cormorant.style.fontFamily,
        fontWeight: 500,
      },
      h4: {
        fontFamily: cormorant.style.fontFamily,
        fontWeight: 500,
      },
      h5: {
        fontFamily: cormorant.style.fontFamily,
        fontWeight: 500,
      },
      h6: {
        fontFamily: cormorant.style.fontFamily,
        fontWeight: 500,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[700]
                : theme.palette.primary.main,
            transition: "background-color 0.8s ease",
          }),
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "8px 24px",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
          outlined: {
            borderWidth: "1px",
            "&:hover": {
              borderWidth: "1px",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 4px 12px rgba(255,255,255,.4)"
                : "0 4px 12px rgba(0,0,0,.4)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 12px rgba(255,255,255,.9)"
                  : "0 4px 12px rgba(0,0,0,.9)",
            },
          }),
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            width: "100%",
            height: 200,
            objectFit: "cover",
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: "16px",
            "& .MuiCardHeader-title": {
              fontWeight: 600,
              fontSize: "1.125rem",
            },
            "& .MuiCardHeader-subheader": {
              fontSize: "0.875rem",
              color: (theme: Theme) => theme.palette.text.secondary,
            },
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "16px",
            fontSize: "0.95rem",
          },
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: "8px 16px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          "@global": {
            "@keyframes slideInFromRight": {
              "0%": { transform: "translateX(100%)" },
              "100%": { transform: "translateX(0)" },
            },
            "@keyframes slideInFromLeft": {
              "0%": { transform: "translateX(-100%)" },
              "100%": { transform: "translateX(0)" },
            },
          },
          ".themeToggleIcon": {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            },
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: "16px",
            fontWeight: 600,
            fontSize: "1.125rem",
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: "16px",
            fontSize: "0.95rem",
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: "8px 16px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            "&[type=number]": {
              MozAppearance: "textfield",
            },
            "&[type=number]::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "&[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[900]
                : theme.palette.primary.main,
            width: "200px",
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === "dark"
                ? // @ts-expect-error this value works but TS hates this one weird trick
                  theme.palette.grey[750]
                : theme.palette.primary.main,
            color: "#FFF",
            "&:not(:last-child)": {
              borderBottom: "1px solid #FFF",
            },
            margin: 0,
          }),
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: mode === "light" ? "#000000" : "#ffffff",
          },
          track: {
            backgroundColor: mode === "light" ? "#cccccc" : "#000000",
          },
          thumb: {
            color: mode === "light" ? "#ffffff" : "#000000",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            alignItems: "center",
          },
        },
      },
    },
  };
}
