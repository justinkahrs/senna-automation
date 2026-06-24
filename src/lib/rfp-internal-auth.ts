export function getRfpInternalSecret() {
  return process.env.RFP_PORTAL_UPLOAD_SECRET?.trim() || "";
}

export function isAuthorizedRfpInternalRequest(request: Request) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const configuredSecret = getRfpInternalSecret();
  if (!configuredSecret) {
    throw new Error("RFP_PORTAL_UPLOAD_SECRET is not configured.");
  }

  const providedSecret =
    request.headers.get("x-senna-render-secret")?.trim() || "";

  return providedSecret === configuredSecret;
}
