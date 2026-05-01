import { NextResponse } from "next/server";
import { query } from "@/utils/db";
import { createTelegramTopic } from "@/utils/telegram";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session_id, display_name, consented } = body;

    if (!session_id || !display_name || !consented) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upsert session using Postgres
    // We use ON CONFLICT (session_id) to match the upsert behavior
    const upsertQuery = `
      INSERT INTO sessions (session_id, display_name, consented_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (session_id) 
      DO UPDATE SET 
        display_name = EXCLUDED.display_name,
        consented_at = EXCLUDED.consented_at,
        updated_at = NOW()
      RETURNING *;
    `;
    
    const { rows } = await query(upsertQuery, [
      session_id,
      display_name,
      new Date().toISOString(),
    ]);
    
    const session = rows[0];

    if (!session) {
      console.error("Session upsert failed: No rows returned");
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 }
      );
    }

    let topicThreadId = session.topic_thread_id;
    let topicTitle = session.topic_title;
    let createdNewTopic = false;

    if (!topicThreadId) {
      // Generate a short ID for the topic title
      const shortId = session_id.slice(0, 8);
      topicTitle = `${display_name} - ${shortId}`;

      try {
        topicThreadId = await createTelegramTopic(topicTitle);
        createdNewTopic = true;

        // Update session with topic info
        await query(
          "UPDATE sessions SET topic_thread_id = $1, topic_title = $2, updated_at = NOW() WHERE session_id = $3",
          [topicThreadId, topicTitle, session_id]
        );
      } catch (err: any) {
        console.error("Telegram topic creation failed:", err);
        return NextResponse.json(
          { error: "Failed to create communication channel" },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({
      session_id,
      topic_thread_id: topicThreadId,
      topic_title: topicTitle,
      created: createdNewTopic,
    });
  } catch (error: any) {
    console.error("Start chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
