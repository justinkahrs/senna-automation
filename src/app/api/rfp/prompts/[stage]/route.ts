import { NextResponse } from "next/server";
import { isAuthorizedRfpInternalRequest } from "@/lib/rfp-internal-auth";
import {
  buildIntakePromptResponse,
  buildProposalPromptResponse,
  buildReviewPromptResponse,
  buildRfpPromptPack,
  buildSecondPassResponse,
} from "@/lib/rfp-prompt-builder";
import type { RfpRenderInput } from "@/lib/rfp-proposal-renderer";

export const runtime = "nodejs";

type PromptStage = "all" | "intake" | "proposal" | "review" | "second-pass";

const validStages = new Set<PromptStage>([
  "all",
  "intake",
  "proposal",
  "review",
  "second-pass",
]);

function parseRequestBody(value: unknown) {
  return value && typeof value === "object" ? (value as RfpRenderInput) : null;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ stage: string }> },
) {
  try {
    if (!isAuthorizedRfpInternalRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { stage } = await context.params;
    if (!validStages.has(stage as PromptStage)) {
      return NextResponse.json(
        { error: "Unsupported RFP prompt stage." },
        { status: 400 },
      );
    }

    const body = parseRequestBody(await request.json().catch(() => null));
    if (!body) {
      return NextResponse.json(
        { error: "A JSON payload is required." },
        { status: 400 },
      );
    }

    const responseBody =
      stage === "intake"
        ? buildIntakePromptResponse(body)
        : stage === "proposal"
          ? buildProposalPromptResponse(body)
          : stage === "review"
            ? buildReviewPromptResponse(body)
            : stage === "second-pass"
              ? buildSecondPassResponse({
                  notes: body.notes,
                  review: body.review,
                })
              : buildRfpPromptPack(body);

    return NextResponse.json(responseBody, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[RFP Prompts] Failed to build prompt payload", error);
    return NextResponse.json(
      { error: "Unable to build the RFP prompts right now." },
      { status: 500 },
    );
  }
}
