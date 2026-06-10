import { NextResponse } from "next/server";
import {
  getPortalAccessByEmail,
  hasActivePortalAccess,
} from "@/lib/portal-access";
import { getPortalRfpJobForEmail } from "@/lib/portal-rfp-jobs";
import { getPortalSession } from "@/lib/portal-session";

export const runtime = "nodejs";

interface JobRouteContext {
  params: Promise<{
    jobId: string;
  }>;
}

export async function GET(request: Request, context: JobRouteContext) {
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
    const job = await getPortalRfpJobForEmail(jobId, session.user.email);

    if (!job) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    return NextResponse.json(
      {
        job: {
          id: job.id,
          status: job.status,
          statusMessage: job.statusMessage,
          errorMessage: job.errorMessage,
          opportunityTitle: job.opportunityTitle,
          issuerName: job.issuerName,
          resultFileName: job.resultFileName,
          hasResultPdf: job.hasResultPdf,
          metadata: job.metadata,
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
          startedAt: job.startedAt,
          completedAt: job.completedAt,
          failedAt: job.failedAt,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("[Portal] Failed to read RFP job status", error);
    return NextResponse.json(
      { error: "Unable to load the portal RFP job." },
      { status: 500 },
    );
  }
}
