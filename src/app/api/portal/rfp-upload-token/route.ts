import { NextResponse } from "next/server";
import {
  createPortalUploadToken,
  getPortalWebhookEndpoint,
} from "@/lib/portal-upload-token";
import {
  getPortalAccessByEmail,
  hasActivePortalAccess,
} from "@/lib/portal-access";
import { getPortalSession } from "@/lib/portal-session";

export async function POST(request: Request) {
  try {
    const session = await getPortalSession(request.headers);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const portalAccess = await getPortalAccessByEmail(
      session.user.email,
      session.user.id,
    );

    if (!hasActivePortalAccess(portalAccess)) {
      return NextResponse.json(
        { error: "Portal access is not enabled for this account." },
        { status: 403 },
      );
    }

    const { token, expiresAt } = createPortalUploadToken({
      sub: session.user.id,
      email: session.user.email,
      role: portalAccess.role,
    });

    return NextResponse.json(
      {
        endpoint: getPortalWebhookEndpoint(),
        token,
        expiresAt,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("[Portal] Failed to mint upload token", error);
    return NextResponse.json(
      { error: "Unable to prepare the portal upload right now." },
      { status: 500 },
    );
  }
}
