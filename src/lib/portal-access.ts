import {
  createPortalAccessLookupToken,
  getPortalAccessWebhookEndpoint,
} from "./portal-upload-token";

export type PortalAccessRole = "admin" | "client";
export type PortalAccessStatus = "active" | "disabled";

export interface PortalAccessRecord {
  email: string;
  role: PortalAccessRole;
  status: PortalAccessStatus;
  displayName: string | null;
}

export function normalizePortalEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hasActivePortalAccess(
  record: PortalAccessRecord | null,
): record is PortalAccessRecord {
  return Boolean(record && record.status === "active");
}

async function readPortalAccessError(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const payload = await response.json().catch(() => null);
    const errorMessage =
      payload?.error || payload?.message || payload?.details || null;

    if (typeof errorMessage === "string" && errorMessage.trim()) {
      return errorMessage.trim();
    }
  }

  const text = (await response.text().catch(() => "")).trim();

  if (text) {
    return text.slice(0, 240);
  }

  return `Portal access lookup failed with status ${response.status}.`;
}

export async function getPortalAccessByEmail(
  email?: string | null,
  subject?: string | null,
) {
  if (!email) return null;

  const normalizedEmail = normalizePortalEmail(email);
  const { token } = createPortalAccessLookupToken({
    sub: subject || normalizedEmail,
    email: normalizedEmail,
  });
  const response = await fetch(getPortalAccessWebhookEndpoint(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Senna-Portal-Service-Token": token,
    },
    body: JSON.stringify({
      email: normalizedEmail,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await readPortalAccessError(response));
  }

  const payload = (await response.json().catch(() => null)) as
    | {
        access?: Partial<PortalAccessRecord> | null;
      }
    | null;

  if (!payload?.access) {
    return null;
  }

  const accessEmail =
    typeof payload.access.email === "string"
      ? normalizePortalEmail(payload.access.email)
      : normalizedEmail;
  const accessRole =
    payload.access.role === "admin" || payload.access.role === "client"
      ? payload.access.role
      : null;
  const accessStatus =
    payload.access.status === "active" || payload.access.status === "disabled"
      ? payload.access.status
      : null;

  if (!accessRole || !accessStatus || accessEmail !== normalizedEmail) {
    throw new Error("Portal access service returned an invalid response.");
  }

  return {
    email: accessEmail,
    role: accessRole,
    status: accessStatus,
    displayName:
      typeof payload.access.displayName === "string"
        ? payload.access.displayName
        : null,
  } satisfies PortalAccessRecord;
}
