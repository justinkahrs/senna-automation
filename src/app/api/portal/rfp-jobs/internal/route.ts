import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import {
  createPortalRfpJob,
  updatePortalRfpJob,
  type PortalRfpJobStatus,
} from "@/lib/portal-rfp-jobs";
import { isAuthorizedRfpInternalRequest } from "@/lib/rfp-internal-auth";

export const runtime = "nodejs";

function isJobStatus(value: unknown): value is PortalRfpJobStatus {
  return (
    value === "queued" ||
    value === "processing" ||
    value === "completed" ||
    value === "failed"
  );
}

function readMetadata(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

export async function POST(request: Request) {
  try {
    if (!isAuthorizedRfpInternalRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json().catch(() => null)) as
      | Record<string, unknown>
      | null;

    if (!body) {
      return NextResponse.json(
        { error: "A JSON payload is required." },
        { status: 400 },
      );
    }

    const action = body.action;

    if (action === "create") {
      const createdByEmail =
        typeof body.createdByEmail === "string" ? body.createdByEmail.trim() : "";

      if (!createdByEmail) {
        return NextResponse.json(
          { error: "createdByEmail is required." },
          { status: 400 },
        );
      }

      const job = await createPortalRfpJob({
        id:
          typeof body.jobId === "string" && body.jobId.trim()
            ? body.jobId.trim()
            : `rfp_${randomUUID()}`,
        createdByEmail,
        createdBySubject:
          typeof body.createdBySubject === "string"
            ? body.createdBySubject.trim()
            : null,
        portalAccessRole:
          body.portalAccessRole === "admin" || body.portalAccessRole === "client"
            ? body.portalAccessRole
            : null,
        opportunityTitle:
          typeof body.opportunityTitle === "string"
            ? body.opportunityTitle.trim()
            : null,
        issuerName:
          typeof body.issuerName === "string" ? body.issuerName.trim() : null,
        sourceChannel:
          typeof body.sourceChannel === "string"
            ? body.sourceChannel.trim()
            : null,
        status:
          typeof body.status === "string" && isJobStatus(body.status)
            ? body.status
            : "queued",
        statusMessage:
          typeof body.statusMessage === "string"
            ? body.statusMessage.trim()
            : "Submission accepted. Proposal generation is queued.",
        workflowExecutionId:
          typeof body.workflowExecutionId === "string"
            ? body.workflowExecutionId.trim()
            : null,
        metadata: readMetadata(body.metadata),
      });

      return NextResponse.json(
        {
          job: {
            id: job.id,
            status: job.status,
            statusMessage: job.statusMessage,
          },
        },
        {
          status: 201,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    if (action === "update") {
      const jobId = typeof body.jobId === "string" ? body.jobId.trim() : "";

      if (!jobId) {
        return NextResponse.json(
          { error: "jobId is required." },
          { status: 400 },
        );
      }

      const resultPdfBase64 =
        typeof body.resultPdfBase64 === "string" && body.resultPdfBase64.trim()
          ? body.resultPdfBase64.trim()
          : null;

      const updated = await updatePortalRfpJob(jobId, {
        status:
          typeof body.status === "string" && isJobStatus(body.status)
            ? body.status
            : undefined,
        statusMessage:
          typeof body.statusMessage === "string"
            ? body.statusMessage.trim()
            : undefined,
        errorMessage:
          typeof body.errorMessage === "string"
            ? body.errorMessage.trim()
            : undefined,
        workflowExecutionId:
          typeof body.workflowExecutionId === "string"
            ? body.workflowExecutionId.trim()
            : undefined,
        resultFileName:
          typeof body.resultFileName === "string"
            ? body.resultFileName.trim()
            : undefined,
        resultPdf: resultPdfBase64
          ? Buffer.from(resultPdfBase64, "base64")
          : undefined,
        metadata: body.metadata ? readMetadata(body.metadata) : undefined,
      });

      if (!updated) {
        return NextResponse.json({ error: "Job not found." }, { status: 404 });
      }

      return NextResponse.json(
        {
          job: {
            id: updated.id,
            status: updated.status,
            statusMessage: updated.statusMessage,
            hasResultPdf: updated.hasResultPdf,
          },
        },
        {
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    return NextResponse.json(
      { error: "Unsupported action." },
      { status: 400 },
    );
  } catch (error) {
    console.error("[Portal] Failed to handle internal RFP job request", error);
    return NextResponse.json(
      { error: "Unable to update the portal RFP job." },
      { status: 500 },
    );
  }
}
