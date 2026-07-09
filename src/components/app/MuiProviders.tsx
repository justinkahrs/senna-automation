import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getThemeTokens } from "@/components/theme/theme";

const theme = createTheme(getThemeTokens());

export default function MuiProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
