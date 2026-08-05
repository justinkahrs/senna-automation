export type CalendlyContentContext = {
  contentId?: string;
  assetId?: string;
  offerId?: string;
  placement?: string;
};

export type CalendlyUtmFields = Partial<
  Record<
    "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content",
    string
  >
>;

const CALENDLY_UTM_VALUE_MAX = 254;
const TRACKING_KEYS = ["aid", "cid", "asid", "oid", "plc"] as const;
const TECHNICAL_TOKEN = /^(aid|cid|asid|oid|plc):/i;

function safeTokenValue(value: string | undefined, maxLength: number) {
  const normalized = String(value || "").trim();
  if (
    !normalized ||
    normalized.length > maxLength ||
    !/^[A-Za-z0-9._:-]+$/.test(normalized)
  ) {
    return "";
  }
  return normalized;
}

export function mergeCalendlyContentContext(
  existing: CalendlyContentContext | undefined,
  supplied: CalendlyContentContext,
) {
  const isOfferPage = String(supplied.assetId || "").startsWith("offer-page:");
  if (!isOfferPage || (!existing?.contentId && !existing?.assetId)) {
    return supplied;
  }

  return {
    contentId: existing.contentId,
    assetId: existing.assetId,
    offerId: supplied.offerId || existing.offerId,
    placement: supplied.placement || existing.placement,
  } satisfies CalendlyContentContext;
}

export function buildCalendlyTrackingContent(
  originalContent: string | null | undefined,
  attributionId: string,
  context: CalendlyContentContext,
) {
  const values = {
    aid: safeTokenValue(attributionId, 80),
    cid: safeTokenValue(context.contentId, 100),
    asid: safeTokenValue(context.assetId, 120),
    oid: safeTokenValue(context.offerId, 80),
    plc: safeTokenValue(context.placement, 80),
  };

  if (!values.aid) {
    throw new Error("A valid attribution ID is required for Calendly tracking.");
  }

  const tokens: string[] = [];
  for (const key of TRACKING_KEYS) {
    const value = values[key];
    if (!value) continue;
    const candidate = `${key}:${value}`;
    const withCandidate = [...tokens, candidate].join("|");
    if (withCandidate.length <= CALENDLY_UTM_VALUE_MAX) {
      tokens.push(candidate);
    }
  }

  const originalSegments = String(originalContent || "")
    .split("|")
    .map((segment) => segment.trim())
    .filter(
      (segment, index, segments) =>
        segment &&
        !TECHNICAL_TOKEN.test(segment) &&
        segments.indexOf(segment) === index,
    );

  for (const segment of originalSegments) {
    const candidate = [...tokens, segment].join("|");
    if (candidate.length <= CALENDLY_UTM_VALUE_MAX) {
      tokens.push(segment);
    }
  }

  return tokens.join("|");
}

export function buildTrackedCalendlyUrl(
  baseUrl: string,
  utm: CalendlyUtmFields,
  attributionId: string,
  context: CalendlyContentContext,
) {
  const url = new URL(baseUrl);
  url.searchParams.set("hide_event_type_details", "1");
  url.searchParams.set("hide_gdpr_banner", "1");

  for (const [key, value] of Object.entries(utm)) {
    if (value) url.searchParams.set(key, value);
  }

  url.searchParams.set(
    "utm_content",
    buildCalendlyTrackingContent(
      url.searchParams.get("utm_content"),
      attributionId,
      context,
    ),
  );

  return url.toString();
}
