import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

const MAX_LENGTHS = {
  name: 160,
  company: 200,
  assistance: 5000,
  contactValue: 320,
  attributionId: 100,
  landingPageSlug: 180,
  landingPageVariant: 80,
  referrer: 1200,
  utm: 500,
  clickId: 300,
  contentContext: 160,
  placement: 100,
} as const;

type JsonRecord = Record<string, unknown>;
const SAFE_ATTRIBUTION_QUERY_KEYS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "variant",
  "content_id",
  "asset_id",
  "offer_id",
  "placement",
]);

function jsonResponse(body: JsonRecord, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
    },
  });
}

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.trim().replace(/\0/g, "").slice(0, maxLength)
    : "";
}

function isObject(value: unknown): value is JsonRecord {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function canonicalPath(value: unknown) {
  const raw = cleanString(value, 1200).replace(/\\+/g, "/");
  try {
    const url = new URL(raw || "/", "https://www.senna-automation.com");
    let pathname = url.pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "");
    if (!pathname || !pathname.startsWith("/") || /%(?![0-9a-f]{2})/i.test(pathname)) {
      pathname = "/";
    }
    const query = new URLSearchParams();
    for (const [key, entry] of url.searchParams) {
      if (SAFE_ATTRIBUTION_QUERY_KEYS.has(key)) {
        query.set(key, cleanString(entry, MAX_LENGTHS.utm));
      }
    }
    return `${pathname}${query.size ? `?${query.toString()}` : ""}`.slice(0, 1200);
  } catch {
    return "/";
  }
}

function canonicalReferrer(value: unknown) {
  const raw = cleanString(value, MAX_LENGTHS.referrer);
  if (!raw) return "";
  try {
    const url = new URL(raw);
    if (!/^https?:$/.test(url.protocol)) return "";
    const pathname = canonicalPath(url.pathname).split("?")[0];
    return `${url.origin}${pathname}`.slice(0, MAX_LENGTHS.referrer);
  } catch {
    return "";
  }
}

async function readRequestBody(request: Request): Promise<JsonRecord | null> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const parsed = await request.json().catch(() => null);
    return isObject(parsed) ? parsed : null;
  }

  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const formData = await request.formData().catch(() => null);
    if (!formData) return null;
    return Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [
        key,
        typeof value === "string" ? value : value.name,
      ]),
    );
  }

  return null;
}

export function readConsent(value: unknown) {
  const consent = isObject(value) ? value : {};
  const normalize = (choice: unknown) =>
    choice === "granted" || choice === "denied" ? choice : "unset";

  return {
    necessary: true,
    analytics: normalize(consent.analytics),
    marketing: normalize(consent.marketing),
    updatedAt: cleanString(consent.updatedAt, 64) || null,
    version: 1,
  };
}

export function selectClickId(body: JsonRecord) {
  const declaredType = cleanString(body.clickIdType, 20);
  const declaredValue = cleanString(body.clickId, MAX_LENGTHS.clickId);
  if (
    declaredValue &&
    (declaredType === "gclid" ||
      declaredType === "gbraid" ||
      declaredType === "wbraid")
  ) {
    return { type: declaredType, value: declaredValue };
  }

  for (const type of ["gclid", "gbraid", "wbraid"] as const) {
    const value = cleanString(body[type], MAX_LENGTHS.clickId);
    if (value) return { type, value };
  }

  return null;
}

function normalizeTouch(value: unknown) {
  const touch = isObject(value) ? value : {};
  const clickId = isObject(touch.clickId)
    ? {
        type: cleanString(touch.clickId.type, 20),
        value: cleanString(touch.clickId.value, MAX_LENGTHS.clickId),
      }
    : null;

  return {
    utm_source: cleanString(touch.utm_source, MAX_LENGTHS.utm),
    utm_medium: cleanString(touch.utm_medium, MAX_LENGTHS.utm),
    utm_campaign: cleanString(touch.utm_campaign, MAX_LENGTHS.utm),
    utm_term: cleanString(touch.utm_term, MAX_LENGTHS.utm),
    utm_content: cleanString(touch.utm_content, MAX_LENGTHS.utm),
    clickId:
      clickId &&
      clickId.value &&
      ["gclid", "gbraid", "wbraid"].includes(clickId.type)
        ? clickId
        : null,
    landingPage: canonicalPath(touch.landingPage),
    landingPageSlug: canonicalPath(
      `/${cleanString(touch.landingPageSlug, MAX_LENGTHS.landingPageSlug)}`,
    )
      .split("?")[0]
      .replace(/^\//, "") || "home",
    landingPageVariant: cleanString(
      touch.landingPageVariant,
      MAX_LENGTHS.landingPageVariant,
    ),
    referrer: canonicalReferrer(touch.referrer),
    touchedAt: cleanString(touch.touchedAt, 64),
    contentId: cleanString(touch.contentId, MAX_LENGTHS.contentContext),
    assetId: cleanString(touch.assetId, MAX_LENGTHS.contentContext),
    offerId: cleanString(touch.offerId, MAX_LENGTHS.contentContext),
    placement: cleanString(touch.placement, MAX_LENGTHS.placement),
  };
}

function normalizeContentContext(value: unknown) {
  const context = isObject(value) ? value : {};
  const touchedAt = cleanString(context.touchedAt, 64);
  return {
    contentId: cleanString(context.contentId, MAX_LENGTHS.contentContext),
    assetId: cleanString(context.assetId, MAX_LENGTHS.contentContext),
    offerId: cleanString(context.offerId, MAX_LENGTHS.contentContext),
    placement: cleanString(context.placement, MAX_LENGTHS.placement),
    ...(touchedAt ? { touchedAt } : {}),
  };
}

function createSignedHeaders(payload: string, idempotencyKey: string) {
  const secret = process.env.ADS_WEBHOOK_SIGNING_SECRET?.trim();
  if (!secret) {
    throw new Error("ADS_WEBHOOK_SIGNING_SECRET is not configured.");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");

  return {
    "Content-Type": "application/json",
    "X-Idempotency-Key": idempotencyKey,
    "X-Senna-Signature": `sha256=${signature}`,
    "X-Senna-Timestamp": timestamp,
  };
}

async function forwardSignedJson(
  url: string,
  payload: JsonRecord,
  idempotencyKey: string,
) {
  if (!url) throw new Error("The destination webhook is not configured.");
  const serialized = JSON.stringify(payload);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: createSignedHeaders(serialized, idempotencyKey),
      body: serialized,
      cache: "no-store",
      signal: controller.signal,
    });
    const responseBody = await response.text().catch(() => "");

    if (!response.ok) {
      throw new Error(
        `Destination returned ${response.status}: ${responseBody.slice(0, 240)}`,
      );
    }

    return responseBody;
  } finally {
    clearTimeout(timeout);
  }
}

async function shadowToMake(payload: JsonRecord) {
  const url = process.env.ADS_SHADOW_MAKE_WEBHOOK_URL?.trim();
  if (!url || process.env.ADS_SHADOW_MAKE_ENABLED === "false") {
    return { attempted: false, ok: true };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  }).catch(() => null);

  return {
    attempted: true,
    ok: Boolean(response?.ok),
    status: response?.status || 0,
  };
}

function isValidContact(method: string, value: string) {
  if (method === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  return method === "sms" && value.replace(/\D/g, "").length >= 10;
}

function requestFingerprint(request: Request) {
  const secret =
    process.env.LEAD_FINGERPRINT_SECRET?.trim() ||
    process.env.ADS_WEBHOOK_SIGNING_SECRET?.trim() ||
    "";
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  return secret
    ? createHmac("sha256", secret).update(`${ip}|${userAgent}`).digest("hex")
    : "";
}

function deriveAcquisitionChannel(body: JsonRecord, clickId: unknown) {
  const medium = cleanString(body.utm_medium, MAX_LENGTHS.utm).toLowerCase();
  const source = cleanString(body.utm_source, MAX_LENGTHS.utm).toLowerCase();
  const referrer = cleanString(body.referrer, MAX_LENGTHS.referrer).toLowerCase();
  if (clickId || ["cpc", "ppc", "paid", "paid_search"].includes(medium)) {
    return "paid_search";
  }
  if (
    ["social", "paid_social"].includes(medium) ||
    /(facebook|instagram|linkedin|twitter|x\.com|tiktok)/.test(source + referrer)
  ) {
    return "social";
  }
  if (medium === "organic" || /(google|bing|duckduckgo|yahoo)\./.test(referrer)) {
    return "organic_search";
  }
  if (referrer && !referrer.includes("senna-automation.com")) return "referral";
  return referrer ? "unknown" : "direct";
}

function suspiciousSubmission(body: JsonRecord, assistance: string) {
  const startedAt = Date.parse(cleanString(body.formStartedAt, 64));
  const elapsedMs = Number.isFinite(startedAt) ? Date.now() - startedAt : null;
  const urlCount = (assistance.match(/https?:\/\/|www\./gi) || []).length;
  const compact = assistance.replace(/[^a-z]/gi, "");
  const vowelRatio = compact.length
    ? (compact.match(/[aeiou]/gi) || []).length / compact.length
    : 0;
  const contentSignal =
    urlCount > 1 || (compact.length > 30 && (vowelRatio < 0.12 || vowelRatio > 0.75));
  return {
    suppressed: elapsedMs !== null && elapsedMs >= 0 && elapsedMs < 2500 && contentSignal,
    elapsedMs,
    reasons: [
      ...(elapsedMs !== null && elapsedMs < 2500 ? ["very_fast"] : []),
      ...(urlCount > 1 ? ["multiple_urls"] : []),
      ...(compact.length > 30 && (vowelRatio < 0.12 || vowelRatio > 0.75)
        ? ["low_quality_text"]
        : []),
    ],
  };
}

export async function handleLeadSubmission(request: Request) {
  const body = await readRequestBody(request);
  if (!body) return jsonResponse({ error: "A form payload is required." }, 400);

  if (cleanString(body.website, 100)) {
    return jsonResponse({ accepted: true, submissionId: `spam_${randomUUID()}` });
  }

  const name = cleanString(body.name, MAX_LENGTHS.name);
  const company = cleanString(body.company, MAX_LENGTHS.company);
  const assistance = cleanString(body.assistance, MAX_LENGTHS.assistance);
  const contactMethod =
    cleanString(body.contactMethod, 20) === "sms" ? "sms" : "email";
  const contactValue = cleanString(body.contactValue, MAX_LENGTHS.contactValue);

  if (
    name.length < 2 ||
    assistance.length < 20 ||
    !isValidContact(contactMethod, contactValue)
  ) {
    return jsonResponse(
      { error: "Name, assistance details, and valid contact information are required." },
      422,
    );
  }

  const suppliedSubmissionId = cleanString(body.submissionId, 100);
  const submissionId = suppliedSubmissionId || `lead_${randomUUID()}`;
  const clickId = selectClickId(body);
  const classification = suspiciousSubmission(body, assistance);
  if (classification.suppressed) {
    return jsonResponse({ accepted: true, submissionId: `suppressed_${randomUUID()}` }, 202);
  }
  const conversionContext = normalizeContentContext(body.conversionContext);
  const payload = {
    event: "lead.submitted",
    schemaVersion: 1,
    submissionId,
    name,
    company,
    assistance,
    contactMethod,
    contactValue,
    attributionId: cleanString(body.attributionId, MAX_LENGTHS.attributionId),
    firstTouch: normalizeTouch(body.firstTouch),
    lastTouch: normalizeTouch(body.lastTouch),
    utm_source: cleanString(body.utm_source, MAX_LENGTHS.utm),
    utm_medium: cleanString(body.utm_medium, MAX_LENGTHS.utm),
    utm_campaign: cleanString(body.utm_campaign, MAX_LENGTHS.utm),
    utm_term: cleanString(body.utm_term, MAX_LENGTHS.utm),
    utm_content: cleanString(body.utm_content, MAX_LENGTHS.utm),
    clickId,
    acquisitionChannel: deriveAcquisitionChannel(body, clickId),
    requestFingerprint: requestFingerprint(request),
    intakeSignals: {
      elapsedMs: classification.elapsedMs,
      reasons: classification.reasons,
      status: "accepted",
    },
    landingPageSlug:
      canonicalPath(
        `/${cleanString(body.landingPageSlug, MAX_LENGTHS.landingPageSlug)}`,
      )
        .split("?")[0]
        .replace(/^\//, "") || "home",
    landingPageVariant:
      cleanString(body.landingPageVariant, MAX_LENGTHS.landingPageVariant) ||
      "control",
    formContext: cleanString(body.formContext, 120) || "site-contact",
    referrer: canonicalReferrer(body.referrer),
    conversionContext,
    contentId:
      cleanString(body.contentId, MAX_LENGTHS.contentContext) ||
      conversionContext.contentId,
    assetId:
      cleanString(body.assetId, MAX_LENGTHS.contentContext) ||
      conversionContext.assetId,
    offerId:
      cleanString(body.offerId, MAX_LENGTHS.contentContext) ||
      conversionContext.offerId,
    placement:
      cleanString(body.placement, MAX_LENGTHS.placement) ||
      conversionContext.placement,
    consent: readConsent(body.consent),
    submittedAt: cleanString(body.submittedAt, 64) || new Date().toISOString(),
    receivedAt: new Date().toISOString(),
  };

  try {
    const primaryUrl = process.env.ADS_LEAD_WEBHOOK_URL?.trim() || "";
    const [, shadow] = await Promise.all([
      forwardSignedJson(primaryUrl, payload, submissionId),
      shadowToMake(payload),
    ]);

    if (shadow.attempted && !shadow.ok) {
      console.warn("[Ads lead intake] Make shadow delivery failed", {
        submissionId,
        status: shadow.status,
      });
    }

    return jsonResponse({ accepted: true, submissionId }, 202);
  } catch (error) {
    console.error("[Ads lead intake] Primary persistence failed", {
      submissionId,
      error: error instanceof Error ? error.message : String(error),
    });
    return jsonResponse(
      {
        error:
          "We could not safely store your request. Please call (616) 287-3360.",
        submissionId,
      },
      503,
    );
  }
}

export async function handleAttribution(request: Request) {
  const body = await readRequestBody(request);
  if (!body) {
    return jsonResponse({ error: "An attribution payload is required." }, 400);
  }

  const attributionId = cleanString(
    body.attributionId,
    MAX_LENGTHS.attributionId,
  );
  if (!/^attr_[a-zA-Z0-9-]{16,}$/.test(attributionId)) {
    return jsonResponse({ error: "A valid attributionId is required." }, 422);
  }

  const conversionContext = normalizeContentContext(body.conversionContext);
  const payload = {
    event: "attribution.touched",
    schemaVersion: 1,
    attributionId,
    firstTouch: normalizeTouch(body.firstTouch),
    lastTouch: normalizeTouch(body.lastTouch),
    conversionContext,
    contentId: conversionContext.contentId,
    assetId: conversionContext.assetId,
    offerId: conversionContext.offerId,
    placement: conversionContext.placement,
    consent: readConsent(body.consent),
    createdAt: cleanString(body.createdAt, 64),
    updatedAt: cleanString(body.updatedAt, 64) || new Date().toISOString(),
    receivedAt: new Date().toISOString(),
  };

  try {
    await forwardSignedJson(
      process.env.ADS_ATTRIBUTION_WEBHOOK_URL?.trim() || "",
      payload,
      `${attributionId}:${payload.updatedAt}`,
    );
    return jsonResponse({ accepted: true, attributionId }, 202);
  } catch (error) {
    console.error("[Ads attribution] Persistence failed", {
      attributionId,
      error: error instanceof Error ? error.message : String(error),
    });
    return jsonResponse({ error: "Attribution persistence is unavailable." }, 503);
  }
}

export function verifySignedWebhookBody(
  timestamp: string,
  serializedBody: string,
  providedSignature: string,
) {
  const secret = process.env.ADS_WEBHOOK_SIGNING_SECRET?.trim() || "";
  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${serializedBody}`)
    .digest();
  const provided = Buffer.from(
    providedSignature.replace(/^sha256=/, ""),
    "hex",
  );
  return (
    Boolean(secret) &&
    provided.length === expected.length &&
    timingSafeEqual(provided, expected)
  );
}
