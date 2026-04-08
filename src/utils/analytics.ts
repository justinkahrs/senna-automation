// ─── Umami Analytics Helpers ────────────────────────────────────
// Centralized tracking utilities for Umami analytics.
// All event tracking should go through `trackEvent` — never call
// `umami.track` directly in components.

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, unknown>) => void;
    };
  }
}

// ─── UTM ────────────────────────────────────────────────────────

const UTM_STORAGE_KEY = "utm_data";

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type UtmKey = (typeof UTM_PARAMS)[number];

export interface UtmData extends Partial<Record<UtmKey, string>> {
  captured_at?: string;
}

/**
 * Read UTM parameters from the current URL search params.
 * Returns null if none are present.
 */
function parseUtmFromUrl(): UtmData | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const utm: UtmData = {};
  let found = false;

  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
      found = true;
    }
  }

  return found ? utm : null;
}

/**
 * Capture UTM parameters from the URL and persist them to localStorage.
 * Only overwrites stored values when new UTM params are actually present.
 * Call this once on page load (e.g. inside a client-side provider).
 */
export function captureUtmParams(): void {
  const fresh = parseUtmFromUrl();
  if (!fresh) return; // keep whatever is already stored

  try {
    fresh.captured_at = new Date().toISOString();
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fresh));
  } catch {
    // localStorage may be unavailable (private browsing, quota, etc.)
  }
}

/**
 * Retrieve previously stored UTM data (if any).
 */
export function getStoredUtm(): UtmData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmData) : null;
  } catch {
    return null;
  }
}

// ─── Page Context ───────────────────────────────────────────────

function getPageContext(): Record<string, string> {
  if (typeof window === "undefined") return {};

  return {
    path: window.location.pathname,
    title: document.title,
  };
}

// ─── Core Tracker ───────────────────────────────────────────────

/**
 * Track a named event through Umami.
 *
 * - No-ops safely if `umami` is not loaded.
 * - Automatically attaches stored UTM data & page context.
 * - All event names should use the "[Action] [Object]" convention,
 *   e.g. "Clicked CTA", "Submitted Contact Form".
 */
export function trackEvent(
  name: string,
  data?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || !window.umami) return;

  const utm = getStoredUtm();
  const context = getPageContext();

  const payload: Record<string, unknown> = {
    ...context,
    ...(utm ?? {}),
    ...(data ?? {}),
  };

  // Strip the internal timestamp — not useful in the event payload
  delete payload.captured_at;

  window.umami.track(name, payload);
}

// ─── Convenience Helpers ────────────────────────────────────────

/** Track a primary CTA click. */
export function trackCta(label: string): void {
  trackEvent("Clicked CTA", { label });
}

/** Track a navigation link click. */
export function trackNavLink(href: string, label?: string): void {
  trackEvent("Clicked Nav Link", { href, label });
}

/** Track a contact-related link click. */
export function trackContactLink(label?: string): void {
  trackEvent("Clicked Contact Link", { label });
}

/** Track an external link click. */
export function trackExternalLink(href: string, label?: string): void {
  trackEvent("Clicked External Link", { href, label });
}

/** Track a successful form submission. */
export function trackFormSubmission(
  formType: string,
  meta?: Record<string, unknown>,
): void {
  trackEvent("Submitted Contact Form", { form_type: formType, ...meta });
}
