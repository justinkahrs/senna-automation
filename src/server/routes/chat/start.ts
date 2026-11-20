import { randomUUID } from "node:crypto";
import { NextResponse } from "@/compat/next/server";
import {
  isChatDbWebhookError,
  updateChatSessionTopic,
  upsertChatSession,
} from "@/lib/chat-db";
import { createTelegramTopic } from "@/utils/telegram";
import {
  createChatCapabilityCookie,
  isSameOriginRequest,
  readLimitedJson,
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

    let body: Record<string, unknown>;
    try {
      body = await readLimitedJson(request, 8192);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof RangeError ? "Request is too large." : "Invalid JSON request." },
        {
          status: error instanceof RangeError ? 413 : 400,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }
    const display_name =
      typeof body?.display_name === "string" ? body.display_name.trim() : "";
    const consented = body?.consented;

    if (!display_name || display_name.length > 100 || consented !== true) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    const session_id = randomUUID();

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
      } catch {
        console.error("Telegram topic creation failed");
        return NextResponse.json(
          { error: "Failed to create communication channel" },
          { status: 502, headers: { "Cache-Control": "no-store" } },
        );
      }
    }

    return NextResponse.json(
      {
        topic_title: topicTitle,
        created: createdNewTopic,
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "Set-Cookie": createChatCapabilityCookie(persistedSession.session_id),
        },
      },
    );
  } catch (error: any) {
    if (isChatDbWebhookError(error)) {
      console.error("Start chat database request failed", {
        status: error.status,
      });
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: error.status, headers: { "Cache-Control": "no-store" } },
      );
    }

    console.error("Start chat request failed");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
