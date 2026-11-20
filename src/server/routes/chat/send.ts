import { NextResponse } from "@/compat/next/server";
import {
  getChatSession,
  insertChatMessage,
  isChatDbWebhookError,
} from "@/lib/chat-db";
import { sendTelegramMessage } from "@/utils/telegram";
import {
  isSameOriginRequest,
  readLimitedJson,
  readChatCapabilitySessionId,
} from "@/lib/chat-capability.mjs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!isSameOriginRequest(request)) {
      return NextResponse.json(
        { error: "Request origin is not allowed." },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }

    const session_id = readChatCapabilitySessionId(request);
    if (!session_id) {
      return NextResponse.json(
        { error: "Chat session expired. Start a new chat." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await readLimitedJson(request, 16384);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof RangeError ? "Message request is too large." : "Invalid JSON request." },
        {
          status: error instanceof RangeError ? 413 : 400,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }
    const text = typeof body?.text === "string" ? body.text : "";

    if (!text.trim() || text.length > 4000) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    const session = await getChatSession(session_id);

    if (!session || !session.topic_thread_id) {
      return NextResponse.json(
        { error: "Session invalid or missing topic" },
        { status: 404, headers: { "Cache-Control": "no-store" } },
      );
    }

    // 2. Send to Telegram
    let telegramMsg;
    try {
      telegramMsg = await sendTelegramMessage(session.topic_thread_id, text);
    } catch (err: any) {
      const errorMessage = err.message || "";
      if (errorMessage.toLowerCase().includes("thread not found") || errorMessage.toLowerCase().includes("topic not found")) {
          console.warn("Telegram rejected a message for an unavailable conversation");
          return NextResponse.json(
            { error: "Conversation ended on server" },
            { status: 410, headers: { "Cache-Control": "no-store" } },
          );
      }

      console.error("Telegram message delivery failed");
      return NextResponse.json(
        { error: "Failed to send message to Telegram" },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const storedMessage = await insertChatMessage({
      sessionId: session_id,
      direction: "to_telegram",
      text,
      telegramMessageId: telegramMsg.message_id,
    });

    return NextResponse.json(
      {
        ok: true,
        message: storedMessage,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error: any) {
    if (isChatDbWebhookError(error)) {
      console.error("Send message database request failed", {
        status: error.status,
      });
      return NextResponse.json(
        { error: "Failed to load chat session" },
        { status: error.status, headers: { "Cache-Control": "no-store" } },
      );
    }

    console.error("Send message request failed");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
