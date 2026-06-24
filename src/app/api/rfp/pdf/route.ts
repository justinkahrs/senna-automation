import { NextResponse } from "next/server";
import {
  getPortalAccessByEmail,
  hasActivePortalAccess,
} from "@/lib/portal-access";
import {
  getPortalPreviewPdfWebhookEndpoint,
  getPortalSharedSecret,
} from "@/lib/portal-upload-token";
import { getPortalSession } from "@/lib/portal-session";
import {
  renderRfpProposal,
  type RfpRenderInput,
} from "@/lib/rfp-proposal-renderer";

export const runtime = "nodejs";

function getFallbackFileName(input: RfpRenderInput | null) {
  const baseName =
    input?.downloadBaseName ||
    input?.proposal?.coverTitle ||
    input?.opportunityTitle ||
    "senna-rfp-response";

  const slug = String(baseName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);

  return `${slug || "senna-rfp-response"}.pdf`;
}

async function readProxyError(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const payload = (await response.json().catch(() => null)) as
      | {
          error?: string;
          message?: string;
          details?: string;
        }
      | null;

    const message = payload?.error || payload?.message || payload?.details;
    if (typeof message === "string" && message.trim()) {
      return message.trim();
    }
  }

  const text = (await response.text().catch(() => "")).trim();
  if (text) return text.slice(0, 240);

  return `Preview PDF request failed with status ${response.status}.`;
}

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

    const body = (await request.json().catch(() => null)) as
      | RfpRenderInput
      | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "A JSON payload is required." },
        { status: 400 },
      );
    }

    const rendered = renderRfpProposal(body);
    if (rendered.renderMode === "final" && !rendered.readiness.readyForFinal) {
      return NextResponse.json(
        {
          error: "Final proposal is not ready to render.",
          blockingIssues: rendered.readiness.blockingIssues,
          warnings: rendered.readiness.warnings,
        },
        { status: 422 },
      );
    }

    const sharedSecret = getPortalSharedSecret();
    const upstreamResponse = await fetch(getPortalPreviewPdfWebhookEndpoint(), {
      method: "POST",
      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/json",
        "X-Senna-Render-Secret": sharedSecret,
      },
      body: JSON.stringify({
        ...body,
        renderSecret: sharedSecret,
      }),
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { error: await readProxyError(upstreamResponse) },
        { status: upstreamResponse.status },
      );
    }

    const pdfBuffer = Buffer.from(await upstreamResponse.arrayBuffer());
    const contentDisposition =
      upstreamResponse.headers.get("content-disposition") ||
      `attachment; filename="${getFallbackFileName(body)}"`;

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": contentDisposition,
        "Content-Type":
          upstreamResponse.headers.get("content-type") || "application/pdf",
      },
    });
  } catch (error) {
    console.error("[RFP PDF] Failed to render preview PDF", error);
    return NextResponse.json(
      { error: "Unable to generate the preview PDF right now." },
      { status: 500 },
    );
  }
}
