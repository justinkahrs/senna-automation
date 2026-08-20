import { PortalWorkspace } from "@/components/portal/PortalWorkspace";
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
  return <PortalWorkspace displayName={displayName} email={email} role={role} />;
}
