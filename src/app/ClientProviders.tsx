"use client";

import type React from "react";
import { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { getThemeTokens } from "@/components/theme/theme";

interface ColorModeContextProps {
  mode: "light" | "dark";
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextProps>({
  mode: "light",
  toggleColorMode: () => {},
});

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const theme = useMemo(() => createTheme(getThemeTokens()), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
