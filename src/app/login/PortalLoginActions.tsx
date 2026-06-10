"use client";

import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { authClient } from "@/lib/auth-client";
import type { PortalProviderDefinition } from "@/lib/auth";

interface PortalLoginActionsProps {
  providers: PortalProviderDefinition[];
}

const providerIcons = {
  google: GoogleIcon,
  github: GitHubIcon,
  facebook: FacebookIcon,
  apple: AppleIcon,
} as const;

export function PortalLoginActions({ providers }: PortalLoginActionsProps) {
  const [pendingProvider, setPendingProvider] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const orderedProviders = useMemo(
    () =>
      [...providers].sort((a, b) => {
        if (a.id === "google") return -1;
        if (b.id === "google") return 1;
        return a.label.localeCompare(b.label);
      }),
    [providers],
  );

  const handleSignIn = async (provider: PortalProviderDefinition["id"]) => {
    try {
      setPendingProvider(provider);
      setErrorMessage("");

      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/portal",
        errorCallbackURL: "/login?access=oauth-error",
      });

      if (result?.error) {
        setErrorMessage(result.error.message || "Unable to start sign-in.");
        setPendingProvider(null);
      }
    } catch (error) {
      console.error("[Portal] Sign-in failed", error);
      setErrorMessage("Unable to start sign-in right now.");
      setPendingProvider(null);
    }
  };

  return (
    <Stack spacing={2.25}>
      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
      {orderedProviders.map((provider) => {
        const Icon = providerIcons[provider.id];
        const isGoogle = provider.id === "google";
        const isPending = pendingProvider === provider.id;

        return (
          <Button
            key={provider.id}
            fullWidth
            size="large"
            variant={isGoogle ? "contained" : "outlined"}
            onClick={() => void handleSignIn(provider.id)}
            disabled={Boolean(pendingProvider)}
            startIcon={
              isPending ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <Icon fontSize="small" />
              )
            }
            sx={{
              minHeight: 54,
              justifyContent: "flex-start",
              px: 2.5,
              borderRadius: "18px",
              borderColor: "var(--color-border-soft)",
              bgcolor: isGoogle ? "var(--color-accent)" : "transparent",
              color: isGoogle
                ? "var(--color-text-inverse)"
                : "var(--color-text-primary)",
              "&:hover": {
                borderColor: "var(--color-accent)",
                bgcolor: isGoogle
                  ? "var(--color-accent-dark)"
                  : "rgba(143, 0, 107, 0.04)",
              },
            }}
          >
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                Continue with {provider.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.82,
                  color: "inherit",
                }}
              >
                {isGoogle
                  ? "Primary portal sign-in"
                  : "Available when configured"}
              </Typography>
            </Box>
          </Button>
        );
      })}
    </Stack>
  );
}
