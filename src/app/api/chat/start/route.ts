import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";
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

    const supabase = createAdminClient();

    // Upsert session
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .upsert(
        {
          session_id,
          display_name,
          consented_at: new Date().toISOString(),
        },
        { onConflict: "session_id" }
      )
      .select()
      .single();

    if (sessionError) {
      console.error("Session upsert error:", sessionError);
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
        const { error: updateError } = await supabase
          .from("sessions")
          .update({
            topic_thread_id: topicThreadId,
            topic_title: topicTitle,
          })
          .eq("session_id", session_id);

        if (updateError) {
          console.error("Failed to update session with topic:", updateError);
          // Don't fail the request, just log it. The topic exists now.
        }
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
