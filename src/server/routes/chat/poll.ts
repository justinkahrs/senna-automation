import { NextResponse } from "@/compat/next/server";
import { isChatDbWebhookError, pollChatMessages } from "@/lib/chat-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const session_id = searchParams.get("session_id");
    const cursor = searchParams.get("cursor"); // ISO timestamp string
    const limit = parseInt(searchParams.get("limit") || "50");

    if (!session_id) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    const { messages, nextCursor } = await pollChatMessages({
      sessionId: session_id,
      cursor,
      limit,
    });

    return NextResponse.json({
      messages: messages || [],
      nextCursor,
    });
  } catch (error: any) {
    if (isChatDbWebhookError(error)) {
      console.error("Poll DB error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to poll chat messages" },
        { status: error.status }
      );
    }

    console.error("Poll API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
