"use client";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { PaletteMode, ThemeOptions } from "@mui/material/styles";

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
      MuiCssBaseline: {
        styleOverrides: {
          ".themeToggleIcon": {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          },
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
    },
  };
}
