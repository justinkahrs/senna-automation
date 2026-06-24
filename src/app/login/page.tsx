import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  Alert,
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { headers } from "next/headers";
import { configuredPortalProviders } from "@/lib/auth";
import {
  getPortalAccessByEmail,
  hasActivePortalAccess,
} from "@/lib/portal-access";
import { getPortalSession } from "@/lib/portal-session";
import { PortalLoginActions } from "./PortalLoginActions";
import { PortalSessionRecovery } from "./PortalSessionRecovery";
import { PortalSignOutButton } from "./PortalSignOutButton";

export const metadata: Metadata = {
  title: "Portal Login",
  robots: {
    index: false,
    follow: false,
  },
};

const accessCopy = {
  "oauth-error": "The sign-in flow did not complete. Try again.",
  denied: "This account is authenticated but not enabled for portal access.",
  unavailable:
    "Portal access could not be verified right now. Try again shortly.",
} as const;

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ access?: string }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const accessState = resolvedSearchParams.access;
  const session = await getPortalSession(await headers());

  if (session?.user?.email) {
    try {
      const portalAccess = await getPortalAccessByEmail(
        session.user.email,
        session.user.id,
      );

      if (hasActivePortalAccess(portalAccess)) {
        redirect("/portal");
      }

      return (
        <Container maxWidth="sm" sx={{ py: { xs: 10, md: 14 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: "28px",
              border: "1px solid var(--color-border-soft)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,246,249,0.98) 100%)",
              boxShadow: "0 24px 80px rgba(24, 25, 37, 0.08)",
            }}
          >
            <Stack spacing={3}>
              <Chip
                label="Portal access"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "rgba(143, 0, 107, 0.08)",
                  color: "var(--color-accent)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              />
              <Box>
                <Typography variant="h3" sx={{ mb: 1.5 }}>
                  Access not enabled
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "var(--color-text-secondary)" }}
                >
                  {session.user.email} authenticated successfully, but this
                  account is not enabled for the Senna portal yet.
                </Typography>
              </Box>
              <Alert severity="warning">
                Client access is managed manually in v1. Use an allowlisted
                Google account or ask Senna to enable this address.
              </Alert>
              <PortalSignOutButton />
            </Stack>
          </Paper>
        </Container>
      );
    } catch (error) {
      console.error("[Portal] Failed to verify portal access", error);

      return (
        <Container maxWidth="sm" sx={{ py: { xs: 10, md: 14 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: "28px",
              border: "1px solid var(--color-border-soft)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,246,249,0.98) 100%)",
              boxShadow: "0 24px 80px rgba(24, 25, 37, 0.08)",
            }}
          >
            <Stack spacing={3}>
              <Chip
                label="Portal access"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "rgba(143, 0, 107, 0.08)",
                  color: "var(--color-accent)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              />
              <Box>
                <Typography variant="h3" sx={{ mb: 1.5 }}>
                  Access check unavailable
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "var(--color-text-secondary)" }}
                >
                  We could not verify portal access for {session.user.email} at
                  the moment.
                </Typography>
              </Box>
              <Alert severity="error">
                Portal access verification is temporarily unavailable. Try again
                shortly.
              </Alert>
              <PortalSignOutButton />
            </Stack>
          </Paper>
        </Container>
      );
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 10, md: 14 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 5 },
          borderRadius: "28px",
          border: "1px solid var(--color-border-soft)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,246,249,0.98) 100%)",
          boxShadow: "0 24px 80px rgba(24, 25, 37, 0.08)",
        }}
      >
        <Stack spacing={3.5}>
          <PortalSessionRecovery />
          <Stack spacing={1.5}>
            <Chip
              label="Hidden portal"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "rgba(247, 236, 89, 0.5)",
                color: "var(--color-text-primary)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            />
            <Typography variant="h3">Portal login</Typography>
            <Typography variant="body1" sx={{ color: "var(--color-text-secondary)" }}>
              Sign in with an allowlisted account to upload an RFP PDF and send
              it directly into the Senna proposal workflow.
            </Typography>
          </Stack>

          {accessState && accessState in accessCopy ? (
            <Alert severity={accessState === "denied" ? "warning" : "error"}>
              {accessCopy[accessState as keyof typeof accessCopy]}
            </Alert>
          ) : null}

          {configuredPortalProviders.length ? (
            <PortalLoginActions providers={configuredPortalProviders} />
          ) : (
            <Alert severity="info">
              Portal sign-in is not configured yet. Add Google OAuth
              credentials to enable access.
            </Alert>
          )}

          <Typography
            variant="body2"
            sx={{
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
            }}
          >
            Google is the primary sign-in path for v1. Additional providers are
            shown automatically when their credentials are configured.
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
