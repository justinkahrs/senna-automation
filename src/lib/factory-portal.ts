import { createHash, createHmac } from "node:crypto";
import { getPortalAccessByEmail, hasActivePortalAccess } from "@/lib/portal-access";
import { getPortalSession } from "@/lib/portal-session";

type SessionUser = { id: string; email: string };

export function factoryLandingEnabled() {
  return process.env.SENNA_FACTORY_ADMIN_LANDING === "enabled";
}

export function factoryServiceAvailable() {
  return Boolean(process.env.SENNA_FACTORY_API_URL && process.env.SENNA_FACTORY_PORTAL_SECRET);
}

export async function getFactoryOperator(headers: Headers, user?: SessionUser | null) {
  const sessionUser = user === undefined ? (await getPortalSession(headers))?.user : user;
  if (!sessionUser?.email || !sessionUser.id) return null;
  const access = await getPortalAccessByEmail(sessionUser.email, sessionUser.id);
  return hasActivePortalAccess(access) && access.role === "admin" ? sessionUser : null;
}

export async function requestFactory(subject: string, target: string, method = "GET", body = "") {
  const origin = process.env.SENNA_FACTORY_API_URL;
  const secret = process.env.SENNA_FACTORY_PORTAL_SECRET;
  if (!origin || !secret || secret.length < 32 || !target.startsWith("/v1/")) {
    throw new Error("Factory service configuration is incomplete.");
  }
  const url = new URL(target, origin);
  if ((url.protocol !== "https:" && !(process.env.NODE_ENV === "development" &&
      url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) ||
      url.username || url.password || url.hash || url.origin !== new URL(origin).origin) {
    throw new Error("Factory service URL is invalid.");
  }
  const claims = Buffer.from(JSON.stringify({
    aud: "senna-factory",
    sub: subject,
    path: url.pathname + url.search,
    method,
    digest: createHash("sha256").update(body).digest("hex"),
    exp: Date.now() + 15_000,
  })).toString("base64url");
  const signature = createHmac("sha256", secret).update(claims).digest("hex");
  return fetch(url, {
    method,
    headers: { Authorization: `Bearer ${claims}.${signature}`, "Content-Type": "application/json" },
    ...(body ? { body } : {}),
    redirect: "error",
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });
}
