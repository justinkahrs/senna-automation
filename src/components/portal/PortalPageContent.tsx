import { Box, Container, Stack, Typography } from "@mui/material";
import { ContentSystemDashboard } from "@/components/portal/ContentSystemDashboard";
import { PortalUploadForm } from "@/components/portal/PortalUploadForm";
import type { PortalAccessRole } from "@/lib/portal-access";

export default function PortalPageContent({
  displayName,
  email,
  role,
}: {
  displayName: string;
  email: string;
  role: PortalAccessRole;
}) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <Stack spacing={{ xs: 5, md: 7 }}>
        {role === "admin" ? <ContentSystemDashboard /> : null}

        <Box sx={{ maxWidth: 900, mx: "auto", width: "100%" }}>
          {role === "admin" ? (
            <Typography
              component="h2"
              variant="h4"
              sx={{ mb: 2.5, color: "text.primary" }}
            >
              RFP workspace
            </Typography>
          ) : null}
          <PortalUploadForm displayName={displayName} email={email} role={role} />
        </Box>
      </Stack>
    </Container>
  );
}
