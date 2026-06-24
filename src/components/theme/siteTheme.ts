"use client";

import { createTheme } from "@mui/material/styles";
import { getThemeTokens } from "./theme";

export const siteTheme = createTheme(getThemeTokens());
