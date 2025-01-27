"use client";

import type React from "react";
import { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getThemeTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
