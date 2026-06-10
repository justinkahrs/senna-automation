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
    const lookup = createPortalJobLookupToken({
      sub: session.user.id,
      email: session.user.email,
      jobId,
      mode: "status",
    });
    const response = await fetch(getPortalJobWebhookEndpoint(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Senna-Portal-Service-Token": lookup.token,
      },
      body: JSON.stringify({
        action: "status",
        email: session.user.email,
        jobId,
      }),
      cache: "no-store",
    });

    const payload = (await response.json().catch(() => null)) as
      | {
          error?: string;
          job?: Record<string, unknown>;
        }
      | null;

    if (!response.ok) {
      return NextResponse.json(
        { error: payload?.error || "Unable to load the portal RFP job." },
        { status: response.status },
      );
    }

    const job =
      payload?.job && typeof payload.job === "object" && !Array.isArray(payload.job)
        ? payload.job
        : null;

    if (!job) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    return NextResponse.json(
      {
        job: {
          id: String(job.id || jobId),
          status:
            job.status === "queued" ||
            job.status === "processing" ||
            job.status === "completed" ||
            job.status === "failed"
              ? job.status
              : "queued",
          statusMessage:
            typeof job.statusMessage === "string" ? job.statusMessage : null,
          errorMessage:
            typeof job.errorMessage === "string" ? job.errorMessage : null,
          opportunityTitle:
            typeof job.opportunityTitle === "string"
              ? job.opportunityTitle
              : null,
          issuerName: typeof job.issuerName === "string" ? job.issuerName : null,
          resultFileName:
            typeof job.resultFileName === "string" ? job.resultFileName : null,
          hasResultPdf: Boolean(job.hasResultPdf),
          metadata:
            job.metadata && typeof job.metadata === "object" && !Array.isArray(job.metadata)
              ? job.metadata
              : {},
          createdAt: typeof job.createdAt === "string" ? job.createdAt : null,
          updatedAt: typeof job.updatedAt === "string" ? job.updatedAt : null,
          startedAt: typeof job.startedAt === "string" ? job.startedAt : null,
          completedAt:
            typeof job.completedAt === "string" ? job.completedAt : null,
          failedAt: typeof job.failedAt === "string" ? job.failedAt : null,
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
