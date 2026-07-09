import { NextResponse } from "@/compat/next/server";
import {
  getChatSession,
  insertChatMessage,
  isChatDbWebhookError,
} from "@/lib/chat-db";
import { sendTelegramMessage } from "@/utils/telegram";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session_id = typeof body?.session_id === "string" ? body.session_id : "";
    const text = typeof body?.text === "string" ? body.text : "";

    if (!session_id || !text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const session = await getChatSession(session_id);

    if (!session || !session.topic_thread_id) {
      return NextResponse.json(
        { error: "Session invalid or missing topic" },
        { status: 404 }
      );
    }

    // 2. Send to Telegram
    let telegramMsg;
    try {
      telegramMsg = await sendTelegramMessage(session.topic_thread_id, text);
    } catch (err: any) {
      console.error("Failed to send to Telegram:", err);
      const errorMessage = err.message || "";
      if (errorMessage.toLowerCase().includes("thread not found") || errorMessage.toLowerCase().includes("topic not found")) {
          return NextResponse.json(
            { error: "Conversation ended on server" },
            { status: 410 }
          );
      }

      return NextResponse.json(
        { error: "Failed to send message to Telegram" },
        { status: 502 }
      );
    }

    const storedMessage = await insertChatMessage({
      sessionId: session_id,
      direction: "to_telegram",
      text,
      telegramMessageId: telegramMsg.message_id,
    });

    return NextResponse.json({
      ok: true,
      message: storedMessage,
    });
  } catch (error: any) {
    if (isChatDbWebhookError(error)) {
      console.error("Send message DB error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to load chat session" },
        { status: error.status }
      );
    }

    console.error("Send message error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
