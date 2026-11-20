import { NextResponse } from "@/compat/next/server";
import { isChatDbWebhookError, pollChatMessages } from "@/lib/chat-db";
import { readChatCapabilitySessionId } from "@/lib/chat-capability.mjs";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const sessionId = readChatCapabilitySessionId(request);
    if (!sessionId) {
      return NextResponse.json(
        { error: "Chat session expired. Start a new chat." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor"); // ISO timestamp string
    const rawLimit = searchParams.get("limit");
    const limit = rawLimit === null ? 50 : Number(rawLimit);

    if (
      (cursor !== null &&
        (cursor.length > 64 || !Number.isFinite(Date.parse(cursor)))) ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 50
    ) {
      return NextResponse.json(
        { error: "Invalid cursor or limit." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    const { messages, nextCursor } = await pollChatMessages({
      sessionId,
      cursor,
      limit,
    });

    return NextResponse.json(
      {
        messages: messages || [],
        nextCursor,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error: any) {
    if (isChatDbWebhookError(error)) {
      console.error("Poll chat database request failed", {
        status: error.status,
      });
      return NextResponse.json(
        { error: "Failed to poll chat messages" },
        { status: error.status, headers: { "Cache-Control": "no-store" } },
      );
    }

    console.error("Poll chat request failed");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
