import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  CHAT_CAPABILITY_TTL_SECONDS,
  createChatCapabilityCookie,
  isSameOriginRequest,
  readLimitedJson,
  readChatCapabilitySessionId,
} from "../src/lib/chat-capability.mjs";

const secret = "test-chat-capability-secret-32-bytes-minimum";
const originalSecret = process.env.BETTER_AUTH_SECRET;
const originalNodeEnv = process.env.NODE_ENV;

test.before(() => {
  process.env.BETTER_AUTH_SECRET = secret;
  process.env.NODE_ENV = "production";
});

test.after(() => {
  if (originalSecret === undefined) delete process.env.BETTER_AUTH_SECRET;
  else process.env.BETTER_AUTH_SECRET = originalSecret;

  if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = originalNodeEnv;
});

test("capability cookie is HttpOnly, Secure, host-only and expires", () => {
  const now = Date.parse("2026-11-05T12:00:00Z");
  const cookie = createChatCapabilityCookie("123e4567-e89b-12d3-a456-426614174000", now);

  assert.match(cookie, /^__Host-senna-chat-cap=/);
  assert.match(cookie, /; HttpOnly/);
  assert.match(cookie, /; Secure/);
  assert.match(cookie, /; SameSite=Strict/);
  assert.match(cookie, /; Path=\//);
  assert.doesNotMatch(cookie, /; Domain=/i);
  assert.match(cookie, new RegExp(`Max-Age=${CHAT_CAPABILITY_TTL_SECONDS}`));
});

test("only a valid unexpired signed cookie authorizes its session", () => {
  const now = Date.parse("2026-11-05T12:00:00Z");
  const cookie = createChatCapabilityCookie("123e4567-e89b-12d3-a456-426614174000", now);
  const request = new Request("https://www.senna-automation.com/api/chat/poll", {
    headers: { cookie: cookie.split(";")[0] },
  });

  assert.equal(readChatCapabilitySessionId(request, now), "123e4567-e89b-12d3-a456-426614174000");
  assert.equal(readChatCapabilitySessionId(request, now + CHAT_CAPABILITY_TTL_SECONDS * 1000), null);

  const [cookieKey, token] = cookie.split(";")[0].split("=");
  const tamperedToken = `${token.slice(0, -1)}${token.endsWith("a") ? "b" : "a"}`;
  const tampered = `${cookieKey}=${tamperedToken}`;
  const tamperedRequest = new Request(request.url, { headers: { cookie: tampered } });
  assert.equal(readChatCapabilitySessionId(tamperedRequest, now), null);

  const missingRequest = new Request(request.url);
  assert.equal(readChatCapabilitySessionId(missingRequest, now), null);
});

test("unsafe requests require a matching Origin", () => {
  const url = "https://www.senna-automation.com/api/chat/send";
  assert.equal(isSameOriginRequest(new Request(url, { method: "POST", headers: { origin: "https://www.senna-automation.com" } })), true);
  assert.equal(isSameOriginRequest(new Request(url, { method: "POST", headers: { origin: "https://evil.example" } })), false);
  assert.equal(isSameOriginRequest(new Request(url, { method: "POST" })), false);
});

test("request JSON reader rejects oversized and malformed bodies", async () => {
  const url = "https://www.senna-automation.com/api/chat/send";
  const valid = new Request(url, { method: "POST", body: JSON.stringify({ text: "ok" }) });
  assert.deepEqual(await readLimitedJson(valid, 128), { text: "ok" });

  const oversized = new Request(url, { method: "POST", body: JSON.stringify({ text: "x".repeat(200) }) });
  await assert.rejects(readLimitedJson(oversized, 64), RangeError);

  const malformed = new Request(url, { method: "POST", body: "{" });
  await assert.rejects(readLimitedJson(malformed, 64), SyntaxError);
});

test("legacy session IDs are cleared and never stored or sent by the widget", () => {
  const widget = readFileSync(new URL("../src/components/ChatWidget.tsx", import.meta.url), "utf8");
  const startRoute = readFileSync(new URL("../src/server/routes/chat/start.ts", import.meta.url), "utf8");

  assert.match(widget, /localStorage\.removeItem\(STORAGE_KEY_SESSION\)/);
  assert.doesNotMatch(widget, /localStorage\.setItem\(STORAGE_KEY_SESSION/);
  assert.doesNotMatch(widget, /searchParams\.append\(["']session_id/);
  assert.doesNotMatch(widget, /session_id\s*:\s*(?:session|currentSession)/);
  assert.match(startRoute, /session_id\s*=\s*randomUUID\(\)/);
  assert.doesNotMatch(startRoute, /body\?\.session_id/);
});
