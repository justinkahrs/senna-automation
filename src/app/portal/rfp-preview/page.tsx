import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";
import {
  getPortalAccessByEmail,
  hasActivePortalAccess,
} from "@/lib/portal-access";
import { getPortalSession } from "@/lib/portal-session";
import { createRfpPreviewInput } from "@/lib/rfp-proposal-renderer";
import { RfpPreviewStudio } from "./RfpPreviewStudio";

export const metadata: Metadata = {
  title: "RFP Preview Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RfpPreviewPage() {
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
    console.error("[Portal] Failed to verify preview access", error);
    redirect("/login?access=unavailable");
  }

  if (!hasActivePortalAccess(portalAccess)) {
    redirect("/login?access=denied");
  }

  return (
    <Container maxWidth={false} sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}>
      <RfpPreviewStudio initialInput={createRfpPreviewInput("balanced")} />
    </Container>
  );
}
