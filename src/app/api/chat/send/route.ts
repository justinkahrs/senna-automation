import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";
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

    const supabase = createAdminClient();

    // 1. Get session to find the topic ID
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("topic_thread_id, display_name")
      .eq("session_id", session_id)
      .single();

    if (sessionError || !session || !session.topic_thread_id) {
      return NextResponse.json(
        { error: "Session invalid or missing topic" },
        { status: 404 }
      );
    }

    // 2. Send to Telegram
    let telegramMsg;
    try {
        // Optionally prefix with display name, but requirements say keep minimal.
        // We'll just send the text.
      telegramMsg = await sendTelegramMessage(session.topic_thread_id, text);
    } catch (err: any) {
      console.error("Failed to send to Telegram:", err);
      // Telegram API error for missing thread usually contains "thread not found" or similar
      // The utils/telegram throws Error with description.
      // Typical error: "Bad Request: message thread not found"
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

    // 3. Store in DB
    const { data: storedMessage, error: insertError } = await supabase
      .from("messages")
      .insert({
        session_id,
        direction: "to_telegram",
        text,
        telegram_message_id: telegramMsg.message_id,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Failed to save message to DB:", insertError);
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
