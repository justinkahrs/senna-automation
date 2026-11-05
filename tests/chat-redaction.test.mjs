import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  getChatSessionByTopic,
  isChatDbWebhookError,
} from "../src/lib/chat-db.ts";
import { handleTelegramWebhook } from "../src/lib/telegram-webhook-handler.ts";

const upstreamSentinel = "UPSTREAM_ERROR_SENTINEL_PRIVATE_BODY";

function captureConsole() {
  const calls = [];
  const original = {
    error: console.error,
    warn: console.warn,
    log: console.log,
  };
  for (const level of Object.keys(original)) {
    console[level] = (...args) => calls.push([level, ...args]);
  }
  return {
    calls,
    restore() {
      Object.assign(console, original);
    },
  };
}

test("chat database errors never expose upstream response bodies", async () => {
  const oldFetch = globalThis.fetch;
  const oldEndpoint = process.env.N8N_CHAT_DB_WEBHOOK_URL;
  const oldSecret = process.env.RFP_PORTAL_UPLOAD_SECRET;
  process.env.N8N_CHAT_DB_WEBHOOK_URL = "https://n8n.example.test/webhook/chat-db";
  process.env.RFP_PORTAL_UPLOAD_SECRET = "TEST_ONLY_SECRET_SENTINEL";
  globalThis.fetch = async () => new Response(
    JSON.stringify({ error: upstreamSentinel }),
    { status: 500, headers: { "content-type": "application/json" } },
  );

  try {
    await assert.rejects(
      getChatSessionByTopic(123),
      (error) => isChatDbWebhookError(error)
        && error.status === 500
        && !error.message.includes(upstreamSentinel),
    );
  } finally {
    globalThis.fetch = oldFetch;
    if (oldEndpoint === undefined) delete process.env.N8N_CHAT_DB_WEBHOOK_URL;
    else process.env.N8N_CHAT_DB_WEBHOOK_URL = oldEndpoint;
    if (oldSecret === undefined) delete process.env.RFP_PORTAL_UPLOAD_SECRET;
    else process.env.RFP_PORTAL_UPLOAD_SECRET = oldSecret;
  }
});

test("Telegram webhook handler never logs update bodies, customer text, or session identifiers", async () => {
  const source = await readFile(
    new URL("../src/lib/telegram-webhook-handler.ts", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(source, /JSON\.stringify\s*\(\s*update/);
  assert.doesNotMatch(source, /console\.(?:log|warn|error)\s*\([^\n]*(?:update|message\.text|session\.session_id|threadId|chatId)/);
  assert.doesNotMatch(source, /console\.(?:log|warn|error)\s*\([^\n]*,\s*error\s*\)/);
  assert.match(source, /Unable to store Telegram message/);
  assert.doesNotMatch(source, /error\.message/);
});

test("Telegram webhook success keeps customer text and capabilities out of logs and response", async () => {
  const sentinels = [
    "TELEGRAM_SECRET_SENTINEL",
    "CUSTOMER_MESSAGE_SENTINEL",
    "SESSION_CAPABILITY_SENTINEL",
    "TELEGRAM_CHAT_SENTINEL",
    "TELEGRAM_THREAD_SENTINEL",
  ];
  const capture = captureConsole();
  let inserted;
  try {
    const response = await handleTelegramWebhook(new Request(
      "https://example.test/api/telegram/webhook",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-telegram-bot-api-secret-token": sentinels[0],
        },
        body: JSON.stringify({
          message: {
            message_id: 234,
            text: sentinels[1],
            message_thread_id: sentinels[4],
            chat: { id: sentinels[3] },
            from: { id: 17, is_bot: false, username: "customer-sentinel" },
          },
        }),
      },
    ), {
      secret: sentinels[0],
      groupChatId: sentinels[3],
      getChatSessionByTopic: async () => ({ session_id: sentinels[2] }),
      insertChatMessage: async (message) => { inserted = message; },
      isChatDbWebhookError: isChatDbWebhookError,
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(inserted.text, sentinels[1]);
    assert.equal(inserted.sessionId, sentinels[2]);
    const exposed = JSON.stringify(capture.calls);
    for (const sentinel of sentinels) assert.equal(exposed.includes(sentinel), false);
  } finally {
    capture.restore();
  }
});

test("Telegram webhook error keeps upstream details out of logs and API response", async () => {
  const sentinels = ["UPSTREAM_ERROR_SENTINEL", "CUSTOMER_ERROR_BODY_SENTINEL"];
  const capture = captureConsole();
  try {
    const response = await handleTelegramWebhook(new Request(
      "https://example.test/api/telegram/webhook",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-telegram-bot-api-secret-token": "valid-test-secret",
        },
        body: JSON.stringify({
          message: {
            message_id: 234,
            text: "valid test message",
            message_thread_id: 22,
            chat: { id: "test-group" },
            from: { id: 17, is_bot: false },
          },
        }),
      },
    ), {
      secret: "valid-test-secret",
      groupChatId: "test-group",
      getChatSessionByTopic: async () => ({ session_id: "test-session" }),
      insertChatMessage: async () => {
        throw Object.assign(
          new Error(`${sentinels[0]}: ${sentinels[1]}`),
          { name: "ChatDbWebhookError", status: 502 },
        );
      },
      isChatDbWebhookError: (error) => error?.name === "ChatDbWebhookError",
    });

    assert.equal(response.status, 502);
    const body = await response.text();
    assert.match(body, /Unable to store Telegram message/);
    const exposed = JSON.stringify(capture.calls) + body;
    for (const sentinel of sentinels) assert.equal(exposed.includes(sentinel), false);
  } finally {
    capture.restore();
  }
});

test("chat API routes do not log error objects or echo upstream messages", async () => {
  for (const route of ["start", "send", "poll"]) {
    const source = await readFile(
      new URL(`../src/server/routes/chat/${route}.ts`, import.meta.url),
      "utf8",
    );
    assert.doesNotMatch(source, /console\.(?:log|warn|error)\s*\([^\n]*,\s*(?:err|error)\s*\)/, route);
    assert.doesNotMatch(source, /\{\s*error:\s*error\.message/, route);
  }
});
