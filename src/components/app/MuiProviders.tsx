import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getThemeTokens } from "@/components/theme/theme";

const theme = createTheme(getThemeTokens());

export default function MuiProviders({
  children,
  includeCssBaseline = true,
}: {
  children: React.ReactNode;
  includeCssBaseline?: boolean;
}) {
  return (
    <ThemeProvider theme={theme}>
      {includeCssBaseline ? <CssBaseline /> : null}
      {children}
    </ThemeProvider>
  );
}
