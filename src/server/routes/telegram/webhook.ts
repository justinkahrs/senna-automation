import { NextResponse } from "@/compat/next/server";
import {
  getChatSessionByTopic,
  insertChatMessage,
  isChatDbWebhookError,
} from "@/lib/chat-db";

export async function POST(request: Request) {
  try {
    // 1. Secret Token Verification
    const secretToken = request.headers.get("x-telegram-bot-api-secret-token");
    console.log("[Webhook] Incoming request. Secret:", secretToken ? "***" : "null");
    
    if (secretToken !== process.env.TELEGRAM_WEBHOOK_SECRET) {
      console.error("[Webhook] Secret token mismatch");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const update = await request.json();
    const message = update.message;
    
    console.log("[Webhook] Received update:", JSON.stringify(update, null, 2));

    // Ignore if not a message or no text
    if (!message || !message.text) {
      return NextResponse.json({ ok: true });
    }

    // Ignore if not from the configured group
    const chatId = message.chat.id.toString();
    const configChatId = process.env.TELEGRAM_GROUP_CHAT_ID?.toString();
    console.log(`[Webhook] Chat ID Check: Got ${chatId}, Expected ${configChatId}`);
    
    if (chatId !== configChatId) {
      console.log("[Webhook] Chat ID mismatch. Ignoring.");
      return NextResponse.json({ ok: true }); // Ignore unknown groups
    }

    // Ignore if not in a topic (thread)
    const threadId = message.message_thread_id;
    console.log(`[Webhook] Thread ID: ${threadId}`);

    if (!threadId) {
      console.log("[Webhook] No thread ID. Ignoring.");
      return NextResponse.json({ ok: true }); // Ignore general messages
    }

    const session = await getChatSessionByTopic(threadId);

    if (!session) {
      console.warn(
        `[Webhook] No session found for thread ${threadId}.`
      );
      return NextResponse.json({ ok: true }); // No session to route to
    }
    
    console.log(`[Webhook] Found session: ${session.session_id}`);

    // 3. Store the message
    if (message.from?.is_bot) {
        console.log("[Webhook] Message is from bot. Ignoring.");
        return NextResponse.json({ ok: true });
    }

    await insertChatMessage({
      sessionId: session.session_id,
      direction: "from_telegram",
      text: message.text,
      telegramMessageId: message.message_id,
    });

    console.log("[Webhook] Successfully stored message from Telegram.");

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (isChatDbWebhookError(error)) {
      console.error("[Webhook] Chat DB error:", error);
      return NextResponse.json(
        { error: error.message || "Unable to store Telegram message" },
        { status: error.status }
      );
    }

    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
