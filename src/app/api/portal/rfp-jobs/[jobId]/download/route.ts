import { NextResponse } from "next/server";
import {
  getPortalAccessByEmail,
  hasActivePortalAccess,
} from "@/lib/portal-access";
import { getPortalRfpJobResultForEmail } from "@/lib/portal-rfp-jobs";
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
    const job = await getPortalRfpJobResultForEmail(jobId, session.user.email);

    if (!job) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    if (!job.resultPdf) {
      return NextResponse.json(
        { error: "The final PDF is not ready yet." },
        { status: job.status === "failed" ? 409 : 425 },
      );
    }

    const fileName = normalizeFileName(
      job.resultFileName,
      job.opportunityTitle || "senna-rfp-response",
    );

    return new NextResponse(job.resultPdf, {
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
