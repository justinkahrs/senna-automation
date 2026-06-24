import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";
import {
  getPortalAccessByEmail,
  hasActivePortalAccess,
} from "@/lib/portal-access";
import { getPortalSession } from "@/lib/portal-session";
import { PortalUploadForm } from "./PortalUploadForm";

export const metadata: Metadata = {
  title: "Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PortalPage() {
  const session = await getPortalSession(await headers());

  if (!session?.user?.email) {
    redirect("/login");
  }

  let portalAccess = null;

  try {
    portalAccess = await getPortalAccessByEmail(
      session.user.email,
      session.user.id,
    );
  } catch (error) {
    console.error("[Portal] Failed to verify portal access", error);
    redirect("/login?access=unavailable");
  }

  if (!hasActivePortalAccess(portalAccess)) {
    redirect("/login?access=denied");
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
      <PortalUploadForm
        displayName={session.user.name || portalAccess.displayName || "Portal user"}
        email={session.user.email}
        role={portalAccess.role}
      />
    </Container>
  );
}
