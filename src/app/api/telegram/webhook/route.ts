import { NextResponse } from "next/server";
import { query } from "@/utils/db";

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

    // 2. Find session mapped to this thread using Postgres
    const sessionRes = await query(
      "SELECT session_id FROM sessions WHERE topic_thread_id = $1",
      [threadId]
    );
    const session = sessionRes.rows[0];

    if (!session) {
      console.warn(`[Webhook] No session found for thread ${threadId}.`);
      return NextResponse.json({ ok: true }); // No session to route to
    }
    
    console.log(`[Webhook] Found session: ${session.session_id}`);

    // 3. Store the message
    if (message.from?.is_bot) {
        console.log("[Webhook] Message is from bot. Ignoring.");
        return NextResponse.json({ ok: true });
    }

    const insertQuery = `
      INSERT INTO messages (session_id, direction, text, telegram_message_id)
      VALUES ($1, $2, $3, $4)
    `;
    await query(insertQuery, [
      session.session_id,
      "from_telegram",
      message.text,
      message.message_id,
    ]);

    console.log("[Webhook] Successfully stored message from Telegram.");

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
