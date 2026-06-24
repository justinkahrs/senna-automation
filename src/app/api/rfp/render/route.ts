import { NextResponse } from "next/server";
import { isAuthorizedRfpInternalRequest } from "@/lib/rfp-internal-auth";
import {
  renderRfpProposal,
  type RfpRenderInput,
} from "@/lib/rfp-proposal-renderer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!isAuthorizedRfpInternalRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    return NextResponse.json(rendered, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[RFP Render] Failed to render proposal HTML", error);
    return NextResponse.json(
      { error: "Unable to render the proposal right now." },
      { status: 500 },
    );
  }
}
