import { NextResponse } from "next/server";
import { query } from "@/utils/db";
import { sendTelegramMessage } from "@/utils/telegram";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session_id, text } = body;

    if (!session_id || !text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Get session to find the topic ID using Postgres
    const sessionRes = await query(
      "SELECT topic_thread_id, display_name FROM sessions WHERE session_id = $1",
      [session_id]
    );
    const session = sessionRes.rows[0];

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

    // 3. Store in DB using Postgres
    const insertQuery = `
      INSERT INTO messages (session_id, direction, text, telegram_message_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await query(insertQuery, [
      session_id,
      "to_telegram",
      text,
      telegramMsg.message_id,
    ]);
    const storedMessage = rows[0];

    if (!storedMessage) {
      console.error("Failed to save message to DB: No rows returned");
      return NextResponse.json(
        { error: "Message sent but failed to save history" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: storedMessage,
    });
  } catch (error: any) {
    console.error("Send message error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
