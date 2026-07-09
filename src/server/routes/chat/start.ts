import { NextResponse } from "@/compat/next/server";
import {
  isChatDbWebhookError,
  updateChatSessionTopic,
  upsertChatSession,
} from "@/lib/chat-db";
import { createTelegramTopic } from "@/utils/telegram";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session_id = typeof body?.session_id === "string" ? body.session_id : "";
    const display_name =
      typeof body?.display_name === "string" ? body.display_name.trim() : "";
    const consented = body?.consented;

    if (!session_id || !display_name || !consented) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const persistedSession = await upsertChatSession({
      sessionId: session_id,
      displayName: display_name,
    });

    let topicThreadId = persistedSession.topic_thread_id;
    let topicTitle = persistedSession.topic_title;
    let createdNewTopic = false;

    if (!topicThreadId) {
      // Generate a short ID for the topic title
      const shortId = session_id.slice(0, 8);
      topicTitle = `${display_name} - ${shortId}`;

      try {
        topicThreadId = await createTelegramTopic(topicTitle);
        createdNewTopic = true;

        await updateChatSessionTopic({
          sessionId: persistedSession.session_id,
          topicThreadId,
          topicTitle,
        });
      } catch (err: any) {
        console.error("Telegram topic creation failed:", err);
        return NextResponse.json(
          { error: "Failed to create communication channel" },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({
      session_id: persistedSession.session_id,
      topic_thread_id: topicThreadId,
      topic_title: topicTitle,
      created: createdNewTopic,
    });
  } catch (error: any) {
    if (isChatDbWebhookError(error)) {
      console.error("Start chat DB error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to create session" },
        { status: error.status }
      );
    }

    console.error("Start chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
