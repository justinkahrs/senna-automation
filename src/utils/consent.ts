export const CONSENT_STORAGE_KEY = "senna_consent_v1";
export const CONSENT_CHANGED_EVENT = "senna:consent-changed";
export const CONSENT_MANAGE_EVENT = "senna:consent-manage";
export const ANALYTICS_EXCLUSION_STORAGE_KEY = "senna_analytics_excluded_v1";

export type ConsentChoice = "granted" | "denied" | "unset";

export interface ConsentState {
  necessary: true;
  analytics: ConsentChoice;
  marketing: ConsentChoice;
  updatedAt: string | null;
  version: 1;
}

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: "unset",
  marketing: "unset",
  updatedAt: null,
  version: 1,
};

export function getConsentState(): ConsentState {
  if (typeof window === "undefined") return defaultConsent;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return defaultConsent;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;

    return {
      necessary: true,
      analytics:
        parsed.analytics === "granted" || parsed.analytics === "denied"
          ? parsed.analytics
          : "unset",
      marketing:
        parsed.marketing === "granted" || parsed.marketing === "denied"
          ? parsed.marketing
          : "unset",
      updatedAt:
        typeof parsed.updatedAt === "string" ? parsed.updatedAt : null,
      version: 1,
    };
  } catch {
    return defaultConsent;
  }
}

export function setConsentState(
  choice: Pick<ConsentState, "analytics" | "marketing">,
): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    updatedAt: new Date().toISOString(),
    version: 1,
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Consent still applies to the current page when persistent storage is unavailable.
  }

  window.dispatchEvent(
    new CustomEvent<ConsentState>(CONSENT_CHANGED_EVENT, { detail: state }),
  );
  return state;
}

export function hasConsentDecision() {
  const consent = getConsentState();
  return consent.analytics !== "unset" && consent.marketing !== "unset";
}

export function isAnalyticsExcluded() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(ANALYTICS_EXCLUSION_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function setAnalyticsExcluded(excluded: boolean) {
  try {
    window.localStorage.setItem(
      ANALYTICS_EXCLUSION_STORAGE_KEY,
      excluded ? "true" : "false",
    );
  } catch {
    // The preference still applies to this page when storage is unavailable.
  }
  window.location.reload();
}
