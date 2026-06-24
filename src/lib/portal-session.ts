import { auth } from "@/lib/auth";

export async function getPortalSession(requestHeaders: Headers) {
  // This portal currently uses Better Auth's stateless cookie-backed sessions.
  // Bypassing cookie cache forces a database lookup path and breaks OAuth returns.
  return auth.api.getSession({
    headers: requestHeaders,
  });
}
