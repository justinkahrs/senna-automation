export interface MetaAttribution {
  fbclid?: string;
  fbc?: string;
  fbp?: string;
}

export function normalizeMetaAttribution(value: unknown, allowed: boolean): MetaAttribution {
  if (!allowed || !value || typeof value !== "object") return {};
  const source = value as Record<string, unknown>;
  const result: MetaAttribution = {};
  for (const [key, pattern, limit] of [
    ["fbclid", /^[A-Za-z0-9_-]{1,500}$/, 500],
    ["fbc", /^fb\.[0-2]\.\d{13}\.[A-Za-z0-9_-]{1,500}$/, 530],
    ["fbp", /^fb\.[0-2]\.\d{13}\.\d{1,30}$/, 60],
  ] as const) {
    const field = source[key];
    if (typeof field === "string" && field.length <= limit && pattern.test(field)) result[key] = field;
  }
  return result;
}

export function captureMetaAttribution(target: Window, allowed: boolean): MetaAttribution {
  if (!allowed) return {};
  const cookies = Object.fromEntries(target.document.cookie.split(";").map((entry) => {
    const separator = entry.indexOf("=");
    return [entry.slice(0, separator).trim(), entry.slice(separator + 1)];
  }));
  const fbclid = new URL(target.location.href).searchParams.get("fbclid") || undefined;
  const value = normalizeMetaAttribution({ fbclid, fbc: cookies._fbc, fbp: cookies._fbp }, true);
  // Only a real click can create fbc; never manufacture fbp or a click identity.
  if (value.fbclid && !value.fbc?.endsWith("." + value.fbclid)) {
    value.fbc = "fb.1." + Date.now() + "." + value.fbclid;
  }
  return value;
}
