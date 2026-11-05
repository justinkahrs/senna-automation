type TelegramWebhookDependencies = {
  getChatSessionByTopic: (topicThreadId: number) => Promise<
    { session_id: string } | null
  >;
  insertChatMessage: (input: {
    sessionId: string;
    direction: "from_telegram";
    text: string;
    telegramMessageId: number;
  }) => Promise<unknown>;
  isChatDbWebhookError: (error: unknown) => error is Error & { status: number };
  secret: string | undefined;
  groupChatId: string | undefined;
};

export async function handleTelegramWebhook(
  request: Request,
  dependencies: TelegramWebhookDependencies,
) {
  try {
    const secretToken = request.headers.get(
      "x-telegram-bot-api-secret-token",
    );

    if (!dependencies.secret || secretToken !== dependencies.secret) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const update = await request.json();
    const message = update?.message;

    if (!message || !message.text) {
      return Response.json({ ok: true });
    }

    const chatId = message.chat?.id?.toString();
    if (!chatId || chatId !== dependencies.groupChatId) {
      return Response.json({ ok: true });
    }

    const threadId = message.message_thread_id;
    if (!threadId || message.from?.is_bot) {
      return Response.json({ ok: true });
    }

    const session = await dependencies.getChatSessionByTopic(threadId);
    if (!session) {
      return Response.json({ ok: true });
    }

    await dependencies.insertChatMessage({
      sessionId: session.session_id,
      direction: "from_telegram",
      text: message.text,
      telegramMessageId: message.message_id,
    });

    return Response.json({ ok: true });
  } catch (error) {
    if (dependencies.isChatDbWebhookError(error)) {
      console.error("[Webhook] Chat database request failed", {
        status: error.status,
      });
      return Response.json(
        { error: "Unable to store Telegram message" },
        { status: error.status },
      );
    }

    console.error("[Webhook] Request processing failed");
    return Response.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
