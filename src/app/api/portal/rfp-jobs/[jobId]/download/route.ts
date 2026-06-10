import { NextResponse } from "next/server";
import {
  getPortalAccessByEmail,
  hasActivePortalAccess,
} from "@/lib/portal-access";
import {
  createPortalJobLookupToken,
  getPortalJobWebhookEndpoint,
} from "@/lib/portal-upload-token";
import { getPortalSession } from "@/lib/portal-session";

export const runtime = "nodejs";

interface JobDownloadRouteContext {
  params: Promise<{
    jobId: string;
  }>;
}

function normalizeFileName(value: string | null, fallbackBaseName: string) {
  const raw = (value || fallbackBaseName || "senna-rfp-response").trim();
  const safe = raw
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (safe.toLowerCase().endsWith(".pdf")) {
    return safe;
  }

  return `${safe || "senna-rfp-response"}.pdf`;
}

export async function GET(request: Request, context: JobDownloadRouteContext) {
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

    const { jobId } = await context.params;
    const lookup = createPortalJobLookupToken({
      sub: session.user.id,
      email: session.user.email,
      jobId,
      mode: "download",
    });
    const response = await fetch(getPortalJobWebhookEndpoint(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Senna-Portal-Service-Token": lookup.token,
      },
      body: JSON.stringify({
        action: "download",
        email: session.user.email,
        jobId,
      }),
      cache: "no-store",
    });

    const payload = (await response.json().catch(() => null)) as
      | {
          error?: string;
          resultFileName?: string;
          opportunityTitle?: string | null;
          resultPdfBase64?: string | null;
        }
      | null;

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            payload?.error || "Unable to download the final PDF right now.",
        },
        { status: response.status },
      );
    }

    const resultPdfBase64 =
      typeof payload?.resultPdfBase64 === "string" ? payload.resultPdfBase64 : "";

    if (!resultPdfBase64) {
      return NextResponse.json(
        { error: "The final PDF is not ready yet." },
        { status: 425 },
      );
    }

    const resultPdf = Buffer.from(resultPdfBase64, "base64");

    const fileName = normalizeFileName(
      typeof payload?.resultFileName === "string" ? payload.resultFileName : null,
      typeof payload?.opportunityTitle === "string"
        ? payload.opportunityTitle
        : "senna-rfp-response",
    );

    return new NextResponse(resultPdf, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("[Portal] Failed to download RFP job PDF", error);
    return NextResponse.json(
      { error: "Unable to download the final PDF right now." },
      { status: 500 },
    );
  }
}
