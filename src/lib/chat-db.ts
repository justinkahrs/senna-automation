type ChatDirection = "to_telegram" | "from_telegram";

interface ChatSessionRow {
  session_id: string;
  display_name: string;
  consented_at: string;
  topic_thread_id: number | null;
  topic_title: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface ChatMessageRow {
  id: string;
  session_id: string;
  direction: ChatDirection;
  text: string;
  telegram_message_id: number | null;
  created_at: string;
}

class ChatDbWebhookError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ChatDbWebhookError";
    this.status = status;
  }
}

function getChatDbWebhookSecret() {
  const secret = process.env.RFP_PORTAL_UPLOAD_SECRET?.trim();

  if (!secret) {
    throw new Error("RFP_PORTAL_UPLOAD_SECRET is not configured.");
  }

  return secret;
}

function getChatDbWebhookEndpoint() {
  const explicitEndpoint = process.env.N8N_CHAT_DB_WEBHOOK_URL?.trim();

  if (explicitEndpoint) {
    return new URL(explicitEndpoint).toString();
  }

  const portalEndpoint = process.env.N8N_RFP_PORTAL_WEBHOOK_URL?.trim();

  if (!portalEndpoint) {
    throw new Error(
      "N8N_RFP_PORTAL_WEBHOOK_URL is not configured, and no N8N_CHAT_DB_WEBHOOK_URL override was provided.",
    );
  }

  const derivedEndpoint = new URL(portalEndpoint);
  derivedEndpoint.pathname = "/webhook/chat-db";
  derivedEndpoint.search = "";
  derivedEndpoint.hash = "";

  return derivedEndpoint.toString();
}

async function readWebhookError(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: string; message?: string }
      | null;
    const errorMessage = payload?.error || payload?.message;

    if (typeof errorMessage === "string" && errorMessage.trim()) {
      return errorMessage.trim();
    }
  }

  const text = (await response.text().catch(() => "")).trim();

  if (text) {
    return text.slice(0, 240);
  }

  return `Chat DB webhook failed with status ${response.status}.`;
}

async function callChatDbWebhook<TPayload>(
  payload: Record<string, unknown>,
): Promise<TPayload> {
  const response = await fetch(getChatDbWebhookEndpoint(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getChatDbWebhookSecret()}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new ChatDbWebhookError(
      response.status,
      await readWebhookError(response),
    );
  }

  const body = (await response.json().catch(() => null)) as TPayload | null;

  if (!body) {
    throw new ChatDbWebhookError(502, "Chat DB webhook returned an empty response.");
  }

  return body;
}

function normalizeIsoDate(value: unknown) {
  if (!value) return null;

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function normalizeSession(row: Partial<ChatSessionRow> | null | undefined) {
  if (!row?.session_id || !row.display_name || !row.consented_at) {
    return null;
  }

  return {
    session_id: String(row.session_id),
    display_name: String(row.display_name),
    consented_at: normalizeIsoDate(row.consented_at) || new Date().toISOString(),
    topic_thread_id:
      typeof row.topic_thread_id === "number"
        ? row.topic_thread_id
        : row.topic_thread_id == null
          ? null
          : Number(row.topic_thread_id),
    topic_title:
      typeof row.topic_title === "string" ? row.topic_title : null,
    created_at: normalizeIsoDate(row.created_at),
    updated_at: normalizeIsoDate(row.updated_at),
  } satisfies ChatSessionRow;
}

function normalizeMessage(row: Partial<ChatMessageRow> | null | undefined) {
  if (!row?.id || !row?.session_id || !row?.direction || !row?.created_at) {
    return null;
  }

  return {
    id: String(row.id),
    session_id: String(row.session_id),
    direction:
      row.direction === "from_telegram" ? "from_telegram" : "to_telegram",
    text: typeof row.text === "string" ? row.text : "",
    telegram_message_id:
      typeof row.telegram_message_id === "number"
        ? row.telegram_message_id
        : row.telegram_message_id == null
          ? null
          : Number(row.telegram_message_id),
    created_at: normalizeIsoDate(row.created_at) || new Date().toISOString(),
  } satisfies ChatMessageRow;
}

export function isChatDbWebhookError(error: unknown): error is ChatDbWebhookError {
  return error instanceof ChatDbWebhookError;
}

export async function upsertChatSession(input: {
  sessionId: string;
  displayName: string;
  consentedAt?: string;
}) {
  const payload = await callChatDbWebhook<{
    session?: Partial<ChatSessionRow> | null;
  }>({
    action: "upsertSession",
    session_id: input.sessionId,
    display_name: input.displayName,
    consented_at: input.consentedAt || new Date().toISOString(),
  });

  const session = normalizeSession(payload.session);

  if (!session) {
    throw new Error("Chat DB webhook returned an invalid session payload.");
  }

  return session;
}

export async function updateChatSessionTopic(input: {
  sessionId: string;
  topicThreadId: number;
  topicTitle: string;
}) {
  const payload = await callChatDbWebhook<{
    session?: Partial<ChatSessionRow> | null;
  }>({
    action: "updateSessionTopic",
    session_id: input.sessionId,
    topic_thread_id: input.topicThreadId,
    topic_title: input.topicTitle,
  });

  const session = normalizeSession(payload.session);

  if (!session) {
    throw new Error("Chat DB webhook returned an invalid updated session.");
  }

  return session;
}

export async function getChatSession(sessionId: string) {
  const payload = await callChatDbWebhook<{
    session?: Partial<ChatSessionRow> | null;
  }>({
    action: "getSession",
    session_id: sessionId,
  });

  return normalizeSession(payload.session);
}

export async function getChatSessionByTopic(topicThreadId: number) {
  const payload = await callChatDbWebhook<{
    session?: Partial<ChatSessionRow> | null;
  }>({
    action: "getSessionByTopic",
    topic_thread_id: topicThreadId,
  });

  return normalizeSession(payload.session);
}

export async function insertChatMessage(input: {
  sessionId: string;
  direction: ChatDirection;
  text: string;
  telegramMessageId?: number | null;
}) {
  const payload = await callChatDbWebhook<{
    message?: Partial<ChatMessageRow> | null;
  }>({
    action: "insertMessage",
    session_id: input.sessionId,
    direction: input.direction,
    text: input.text,
    telegram_message_id: input.telegramMessageId ?? null,
  });

  const message = normalizeMessage(payload.message);

  if (!message) {
    throw new Error("Chat DB webhook returned an invalid message payload.");
  }

  return message;
}

export async function pollChatMessages(input: {
  sessionId: string;
  cursor?: string | null;
  limit?: number;
}) {
  const payload = await callChatDbWebhook<{
    messages?: Array<Partial<ChatMessageRow>>;
    nextCursor?: string | null;
  }>({
    action: "pollMessages",
    session_id: input.sessionId,
    cursor: input.cursor || null,
    limit: input.limit ?? 50,
  });

  const messages = Array.isArray(payload.messages)
    ? payload.messages.map(normalizeMessage).filter(Boolean)
    : [];
  const nextCursor =
    typeof payload.nextCursor === "string" && payload.nextCursor.trim()
      ? payload.nextCursor
      : input.cursor || null;

  return {
    messages,
    nextCursor,
  };
}
