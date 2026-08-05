import { getConsentState, type ConsentState } from "@/utils/consent";
import {
  buildTrackedCalendlyUrl,
  mergeCalendlyContentContext,
} from "@/utils/calendly-context";

export const ATTRIBUTION_STORAGE_KEY = "senna_attribution_v1";
const ATTRIBUTION_SESSION_KEY = "senna_attribution_session_v1";
const ATTRIBUTION_PERSISTED_KEY = "senna_attribution_persisted_v1";
const CONTENT_CONTEXT_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const SITE_ORIGIN = "https://www.senna-automation.com";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type ClickIdKey = (typeof CLICK_ID_KEYS)[number];
export type UtmFields = Partial<Record<UtmKey, string>>;

export interface ContentAttributionContext {
  contentId?: string;
  assetId?: string;
  offerId?: string;
  placement?: string;
}

export interface ContentConversionContext extends ContentAttributionContext {
  touchedAt: string;
}

export interface AttributionCaptureOptions extends ContentAttributionContext {
  landingPageSlug?: string;
  landingPageVariant?: string;
  referrer?: string;
}

export interface ClickIdentifier {
  type: ClickIdKey;
  value: string;
}

export interface AttributionTouch extends UtmFields, ContentAttributionContext {
  clickId?: ClickIdentifier;
  landingPage: string;
  landingPageSlug: string;
  landingPageVariant: string;
  referrer: string;
  touchedAt: string;
}

export interface AttributionState {
  attributionId: string;
  firstTouch: AttributionTouch;
  lastTouch: AttributionTouch;
  consent: ConsentState;
  conversionContext?: ContentConversionContext;
  createdAt: string;
  updatedAt: string;
  version: 1;
}

function createOpaqueId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `attr_${crypto.randomUUID()}`;
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return `attr_${Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function safeStorageRead(storage: Storage, key: string) {
  try {
    const value = storage.getItem(key);
    return value ? (JSON.parse(value) as AttributionState) : null;
  } catch {
    return null;
  }
}

function safeStorageWrite(storage: Storage, key: string, value: unknown) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in restricted browsing modes.
  }
}

function cleanParam(value: string | null, maxLength = 500) {
  return value?.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength) || "";
}

export function canonicalizePathname(value: string) {
  const normalized = cleanParam(value.replace(/\\+/g, "/"), 500)
    .replace(/\/{2,}/g, "/")
    .replace(/\/$/, "");
  if (!normalized || normalized === "") return "/";
  if (!normalized.startsWith("/") || /%(?![0-9a-f]{2})/i.test(normalized)) {
    return "/";
  }
  return normalized;
}

function sanitizeReferrer(value: string) {
  const cleaned = cleanParam(value, 1200);
  if (!cleaned) return "";
  try {
    const referrer = new URL(cleaned);
    if (!/^https?:$/.test(referrer.protocol)) return "";
    return `${referrer.origin}${canonicalizePathname(referrer.pathname)}`.slice(
      0,
      700,
    );
  } catch {
    return "";
  }
}

function isExternalReferrer(value: string) {
  if (!value) return false;
  try {
    const referrerHost = new URL(value).hostname.replace(/^www\./, "");
    return referrerHost !== new URL(SITE_ORIGIN).hostname.replace(/^www\./, "");
  } catch {
    return false;
  }
}

function hasAcquisitionParameters(touch: AttributionTouch) {
  return Boolean(
    touch.clickId || UTM_KEYS.some((key) => Boolean(touch[key])),
  );
}

function activeConversionContext(
  context?: Partial<ContentConversionContext>,
): ContentConversionContext | undefined {
  if (!context?.touchedAt) return undefined;
  const touchedAt = Date.parse(context.touchedAt);
  if (!Number.isFinite(touchedAt) || Date.now() - touchedAt > CONTENT_CONTEXT_TTL_MS) {
    return undefined;
  }
  const normalized = {
    contentId: cleanParam(context.contentId || null, 160) || undefined,
    assetId: cleanParam(context.assetId || null, 160) || undefined,
    offerId: cleanParam(context.offerId || null, 160) || undefined,
    placement: cleanParam(context.placement || null, 100) || undefined,
    touchedAt: new Date(touchedAt).toISOString(),
  };
  return [
    normalized.contentId,
    normalized.assetId,
    normalized.offerId,
    normalized.placement,
  ].some(Boolean)
    ? normalized
    : undefined;
}

export function chooseClickIdentifier(
  params: URLSearchParams,
): ClickIdentifier | undefined {
  for (const key of CLICK_ID_KEYS) {
    const value = cleanParam(params.get(key), 300);
    if (value) return { type: key, value };
  }
  return undefined;
}

export function parseAttributionTouch(
  url = typeof window !== "undefined" ? window.location.href : "",
  options?: AttributionCaptureOptions,
): AttributionTouch {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url || `${SITE_ORIGIN}/`, SITE_ORIGIN);
  } catch {
    parsedUrl = new URL(`${SITE_ORIGIN}/`);
  }
  const pathname = canonicalizePathname(parsedUrl.pathname);
  const safeQuery = new URLSearchParams();
  for (const key of [...UTM_KEYS, ...CLICK_ID_KEYS, "variant", "content_id", "asset_id", "offer_id", "placement"] as const) {
    const value = cleanParam(parsedUrl.searchParams.get(key), 500);
    if (value) safeQuery.set(key, value);
  }
  const safeSearch = safeQuery.toString();
  const touch: AttributionTouch = {
    landingPage: `${pathname}${safeSearch ? `?${safeSearch}` : ""}`,
    landingPageSlug:
      cleanParam(options?.landingPageSlug || null, 180) ||
      pathname.replace(/^\/|\/$/g, "") ||
      "home",
    landingPageVariant:
      options?.landingPageVariant || parsedUrl.searchParams.get("variant") || "control",
    referrer: sanitizeReferrer(
      options?.referrer ??
        (typeof document !== "undefined" ? document.referrer : ""),
    ),
    touchedAt: new Date().toISOString(),
  };

  for (const key of UTM_KEYS) {
    const value = cleanParam(parsedUrl.searchParams.get(key));
    if (value) touch[key] = value;
  }

  const clickId = chooseClickIdentifier(parsedUrl.searchParams);
  if (clickId) touch.clickId = clickId;

  const contentContext = {
    contentId:
      cleanParam(options?.contentId || parsedUrl.searchParams.get("content_id"), 160) ||
      undefined,
    assetId:
      cleanParam(options?.assetId || parsedUrl.searchParams.get("asset_id"), 160) ||
      undefined,
    offerId:
      cleanParam(options?.offerId || parsedUrl.searchParams.get("offer_id"), 160) ||
      undefined,
    placement:
      cleanParam(options?.placement || parsedUrl.searchParams.get("placement"), 100) ||
      undefined,
  } satisfies ContentAttributionContext;

  Object.assign(touch, contentContext);
  return touch;
}

export function getAttributionState(): AttributionState | null {
  if (typeof window === "undefined") return null;
  const state =
    safeStorageRead(window.localStorage, ATTRIBUTION_STORAGE_KEY) ||
    safeStorageRead(window.sessionStorage, ATTRIBUTION_SESSION_KEY);
  if (!state) return null;
  return {
    ...state,
    conversionContext: activeConversionContext(state.conversionContext),
  };
}

export function captureAttribution(
  options?: AttributionCaptureOptions,
): AttributionState {
  const now = new Date().toISOString();
  const touch = parseAttributionTouch(window.location.href, options);
  const sessionState = safeStorageRead(
    window.sessionStorage,
    ATTRIBUTION_SESSION_KEY,
  );
  const existing = getAttributionState();
  const suppliedContext = Object.fromEntries(
    Object.entries({
      contentId: touch.contentId,
      assetId: touch.assetId,
      offerId: touch.offerId,
      placement: touch.placement,
    }).filter((entry): entry is [string, string] => Boolean(entry[1])),
  ) as ContentAttributionContext;
  const hasSuppliedContext = Object.values(suppliedContext).some(Boolean);
  const isNewAcquisition =
    hasAcquisitionParameters(touch) ||
    (!sessionState && isExternalReferrer(touch.referrer));
  const existingConversionContext = activeConversionContext(
    existing?.conversionContext,
  );
  const resolvedSuppliedContext =
    hasSuppliedContext && !isNewAcquisition
      ? mergeCalendlyContentContext(existingConversionContext, suppliedContext)
      : suppliedContext;
  const conversionContext = hasSuppliedContext
    ? activeConversionContext({ ...resolvedSuppliedContext, touchedAt: now })
    : isNewAcquisition
      ? undefined
      : existingConversionContext;
  const state: AttributionState = {
    attributionId: existing?.attributionId || createOpaqueId(),
    firstTouch: existing?.firstTouch || touch,
    lastTouch:
      !existing || isNewAcquisition ? touch : existing.lastTouch,
    consent: getConsentState(),
    conversionContext,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    version: 1,
  };

  safeStorageWrite(window.localStorage, ATTRIBUTION_STORAGE_KEY, state);
  safeStorageWrite(window.sessionStorage, ATTRIBUTION_SESSION_KEY, state);
  return state;
}

export async function persistAttribution(state = captureAttribution()) {
  const signature = JSON.stringify({
    attributionId: state.attributionId,
    firstTouch: state.firstTouch,
    lastTouch: state.lastTouch,
    conversionContext: state.conversionContext,
    consent: state.consent,
  });
  try {
    if (window.sessionStorage.getItem(ATTRIBUTION_PERSISTED_KEY) === signature) {
      return;
    }
  } catch {
    // Continue when session storage is unavailable.
  }

  try {
    const response = await fetch("/api/attribution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify(state),
    });
    if (response.ok) {
      try {
        window.sessionStorage.setItem(ATTRIBUTION_PERSISTED_KEY, signature);
      } catch {
        // A future navigation may retry persistence.
      }
    }
  } catch {
    // Attribution persistence is retried on the next page load or form submission.
  }
}

export function initializeAttributionCapture() {
  if (typeof window === "undefined") return;

  const capture = () => {
    const state = captureAttribution();
    void persistAttribution(state);
  };

  capture();
  document.addEventListener("astro:page-load", capture);
}

export function attributionToLeadFields() {
  const state = captureAttribution();
  const touch = state.lastTouch;
  const clickIdentifier = touch.clickId;
  const conversionContext = state.conversionContext || {};

  return {
    attributionId: state.attributionId,
    firstTouch: state.firstTouch,
    lastTouch: state.lastTouch,
    consent: getConsentState(),
    utm_source: touch.utm_source || "",
    utm_medium: touch.utm_medium || "",
    utm_campaign: touch.utm_campaign || "",
    utm_term: touch.utm_term || "",
    utm_content: touch.utm_content || "",
    clickIdType: clickIdentifier?.type || "",
    clickId: clickIdentifier?.value || "",
    landingPageSlug: touch.landingPageSlug,
    landingPageVariant: touch.landingPageVariant,
    referrer: touch.referrer,
    contentId: conversionContext.contentId || touch.contentId || "",
    assetId: conversionContext.assetId || touch.assetId || "",
    offerId: conversionContext.offerId || touch.offerId || "",
    placement: conversionContext.placement || touch.placement || "",
  };
}

export function buildCalendlyUrl(
  baseUrl = "https://calendly.com/senna-automation/intro",
  context?: ContentAttributionContext,
) {
  const attribution = captureAttribution(context);
  const touch = attribution.lastTouch;
  const conversionContext = attribution.conversionContext || context || {};
  return buildTrackedCalendlyUrl(
    baseUrl,
    Object.fromEntries(
      UTM_KEYS.flatMap((key) => (touch[key] ? [[key, touch[key]]] : [])),
    ),
    attribution.attributionId,
    conversionContext,
  );
}
