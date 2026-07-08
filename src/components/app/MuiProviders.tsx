"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { getThemeTokens } from "@/components/theme/theme";

export default function MuiProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useMemo(() => createTheme(getThemeTokens()), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
