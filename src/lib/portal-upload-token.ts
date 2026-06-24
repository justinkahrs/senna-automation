import { createHmac, timingSafeEqual } from "crypto";
import type { PortalAccessRole } from "./portal-access";

type PortalUploadMode = "draft_improve";
type PortalUploadPurpose = "rfp-upload";
type PortalAccessLookupMode = "lookup";
type PortalAccessLookupPurpose = "portal-access-check";
type PortalJobLookupMode = "status" | "download";
type PortalJobLookupPurpose = "portal-rfp-job";

export interface PortalUploadTokenPayload {
  sub: string;
  email: string;
  role: PortalAccessRole;
  purpose: PortalUploadPurpose;
  mode: PortalUploadMode;
  iat: number;
  exp: number;
}

export interface PortalAccessLookupTokenPayload {
  sub: string;
  email: string;
  purpose: PortalAccessLookupPurpose;
  mode: PortalAccessLookupMode;
  iat: number;
  exp: number;
}

export interface PortalJobLookupTokenPayload {
  sub: string;
  email: string;
  jobId: string;
  purpose: PortalJobLookupPurpose;
  mode: PortalJobLookupMode;
  iat: number;
  exp: number;
}

type PortalSignedTokenPayload =
  | PortalUploadTokenPayload
  | PortalAccessLookupTokenPayload
  | PortalJobLookupTokenPayload;

const TOKEN_HEADER = {
  alg: "HS256",
  typ: "JWT",
} as const;

function encodeSegment(value: unknown) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function decodeSegment<T>(value: string): T {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as T;
}

export function getPortalSharedSecret() {
  const secret = process.env.RFP_PORTAL_UPLOAD_SECRET?.trim();

  if (!secret) {
    throw new Error("RFP_PORTAL_UPLOAD_SECRET is not configured.");
  }

  return secret;
}

export function getPortalWebhookEndpoint() {
  const endpoint = process.env.N8N_RFP_PORTAL_WEBHOOK_URL?.trim();

  if (!endpoint) {
    throw new Error("N8N_RFP_PORTAL_WEBHOOK_URL is not configured.");
  }

  return new URL(endpoint).toString();
}

export function getPortalAccessWebhookEndpoint() {
  const explicitEndpoint = process.env.N8N_PORTAL_ACCESS_WEBHOOK_URL?.trim();

  if (explicitEndpoint) {
    return new URL(explicitEndpoint).toString();
  }

  const derivedEndpoint = new URL(getPortalWebhookEndpoint());
  derivedEndpoint.pathname = "/webhook/portal-access-check";
  derivedEndpoint.search = "";
  derivedEndpoint.hash = "";

  return derivedEndpoint.toString();
}

export function getPortalPreviewPdfWebhookEndpoint() {
  const explicitEndpoint = process.env.N8N_RFP_PREVIEW_PDF_WEBHOOK_URL?.trim();

  if (explicitEndpoint) {
    return new URL(explicitEndpoint).toString();
  }

  const derivedEndpoint = new URL(getPortalWebhookEndpoint());
  derivedEndpoint.pathname = "/webhook/portal-rfp-preview-pdf";
  derivedEndpoint.search = "";
  derivedEndpoint.hash = "";

  return derivedEndpoint.toString();
}

export function getPortalJobWebhookEndpoint() {
  const explicitEndpoint = process.env.N8N_RFP_PORTAL_JOB_WEBHOOK_URL?.trim();

  if (explicitEndpoint) {
    return new URL(explicitEndpoint).toString();
  }

  const derivedEndpoint = new URL(getPortalWebhookEndpoint());
  derivedEndpoint.pathname = "/webhook/portal-rfp-job";
  derivedEndpoint.search = "";
  derivedEndpoint.hash = "";

  return derivedEndpoint.toString();
}

function sign(unsignedToken: string, secret: string) {
  return createHmac("sha256", secret)
    .update(unsignedToken)
    .digest("base64url");
}

function createSignedToken<TPayload extends PortalSignedTokenPayload>(
  payload: TPayload,
) {
  const encodedHeader = encodeSegment(TOKEN_HEADER);
  const encodedPayload = encodeSegment(payload);
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = sign(unsignedToken, getPortalSharedSecret());

  return {
    token: `${unsignedToken}.${signature}`,
    expiresAt: new Date(payload.exp * 1000).toISOString(),
    payload,
  };
}

export function createPortalUploadToken(input: {
  sub: string;
  email: string;
  role: PortalAccessRole;
  expiresInSeconds?: number;
}) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresInSeconds = input.expiresInSeconds ?? 5 * 60;
  const payload: PortalUploadTokenPayload = {
    sub: input.sub,
    email: input.email,
    role: input.role,
    purpose: "rfp-upload",
    mode: "draft_improve",
    iat: issuedAt,
    exp: issuedAt + expiresInSeconds,
  };

  return createSignedToken(payload);
}

export function createPortalAccessLookupToken(input: {
  sub: string;
  email: string;
  expiresInSeconds?: number;
}) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresInSeconds = input.expiresInSeconds ?? 5 * 60;
  const payload: PortalAccessLookupTokenPayload = {
    sub: input.sub,
    email: input.email,
    purpose: "portal-access-check",
    mode: "lookup",
    iat: issuedAt,
    exp: issuedAt + expiresInSeconds,
  };

  return createSignedToken(payload);
}

export function createPortalJobLookupToken(input: {
  sub: string;
  email: string;
  jobId: string;
  mode: PortalJobLookupMode;
  expiresInSeconds?: number;
}) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresInSeconds = input.expiresInSeconds ?? 5 * 60;
  const payload: PortalJobLookupTokenPayload = {
    sub: input.sub,
    email: input.email,
    jobId: input.jobId,
    purpose: "portal-rfp-job",
    mode: input.mode,
    iat: issuedAt,
    exp: issuedAt + expiresInSeconds,
  };

  return createSignedToken(payload);
}

function verifyPortalSignedToken(token: string) {
  const [encodedHeader, encodedPayload, providedSignature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = sign(
    `${encodedHeader}.${encodedPayload}`,
    getPortalSharedSecret(),
  );
  const provided = Buffer.from(providedSignature);
  const expected = Buffer.from(expectedSignature);

  if (provided.length !== expected.length) {
    return null;
  }

  if (!timingSafeEqual(provided, expected)) {
    return null;
  }

  const header = decodeSegment<typeof TOKEN_HEADER>(encodedHeader);

  if (header.alg !== TOKEN_HEADER.alg || header.typ !== TOKEN_HEADER.typ) {
    return null;
  }

  const payload = decodeSegment<PortalSignedTokenPayload>(encodedPayload);

  if (payload.exp <= Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}

export function verifyPortalUploadToken(token: string) {
  const payload = verifyPortalSignedToken(token);

  if (!payload) {
    return null;
  }

  if (payload.purpose !== "rfp-upload" || payload.mode !== "draft_improve") {
    return null;
  }

  if (!("role" in payload)) {
    return null;
  }

  return payload;
}
