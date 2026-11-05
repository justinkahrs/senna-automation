import { createHmac, timingSafeEqual } from "node:crypto";

export const CHAT_CAPABILITY_TTL_SECONDS = 12 * 60 * 60;

function getCookieName() {
  return process.env.NODE_ENV === "production"
    ? "__Host-senna-chat-cap"
    : "senna-chat-cap";
}

function getSecret() {
  const secret = process.env.BETTER_AUTH_SECRET?.trim();

  if (!secret) {
    throw new Error("Chat capability signing key is not configured.");
  }

  return secret;
}

function sign(value) {
  return createHmac("sha256", getSecret())
    .update(`senna-chat-capability:v1:${value}`)
    .digest("base64url");
}

export function createChatCapabilityCookie(sessionId, now = Date.now()) {
  if (typeof sessionId !== "string" || !sessionId.trim()) {
    throw new TypeError("A server-issued chat session ID is required.");
  }

  const payload = Buffer.from(
    JSON.stringify({
      v: 1,
      sid: sessionId,
      exp: Math.floor(now / 1000) + CHAT_CAPABILITY_TTL_SECONDS,
    }),
  ).toString("base64url");
  const value = `${payload}.${sign(payload)}`;
  const secure = process.env.NODE_ENV === "production";
  const cookieName = getCookieName();

  return `${cookieName}=${value}; Max-Age=${CHAT_CAPABILITY_TTL_SECONDS}; Path=/; HttpOnly; SameSite=Strict${secure ? "; Secure" : ""}`;
}

export function clearChatCapabilityCookie() {
  const cookieName = getCookieName();
  const secure = process.env.NODE_ENV === "production";

  return `${cookieName}=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict${secure ? "; Secure" : ""}`;
}

export function readChatCapabilitySessionId(request, now = Date.now()) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookieName = getCookieName();
  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`))
    ?.slice(cookieName.length + 1);

  if (!token) return null;

  const [payload, suppliedSignature, ...extra] = token.split(".");
  if (!payload || !suppliedSignature || extra.length) return null;

  let expectedSignature;
  try {
    expectedSignature = sign(payload);
  } catch {
    return null;
  }

  const suppliedBytes = Buffer.from(suppliedSignature, "base64url");
  const expectedBytes = Buffer.from(expectedSignature, "base64url");
  if (
    suppliedBytes.length !== expectedBytes.length ||
    !timingSafeEqual(suppliedBytes, expectedBytes)
  ) {
    return null;
  }

  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      claims?.v !== 1 ||
      typeof claims.sid !== "string" ||
      claims.sid.length < 16 ||
      claims.sid.length > 128 ||
      !Number.isInteger(claims.exp) ||
      claims.exp <= Math.floor(now / 1000)
    ) {
      return null;
    }

    return claims.sid;
  } catch {
    return null;
  }
}

export function isSameOriginRequest(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function readLimitedJson(request, maxBytes) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > maxBytes) throw new RangeError("Request body is too large.");
  if (!request.body) throw new SyntaxError("Request body is required.");

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        throw new RangeError("Request body is too large.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(body));
}
