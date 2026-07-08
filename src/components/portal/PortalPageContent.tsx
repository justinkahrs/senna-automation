import { Container } from "@mui/material";
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
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
      <PortalUploadForm displayName={displayName} email={email} role={role} />
    </Container>
  );
}
