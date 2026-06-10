import { betterAuth } from "better-auth";
import { SITE_URL } from "../utils/site";

export type PortalProviderId = "google" | "github" | "facebook" | "apple";

export interface PortalProviderDefinition {
  id: PortalProviderId;
  label: string;
}

type SocialProviderConfig = {
  clientId: string;
  clientSecret: string;
};

const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : SITE_URL);

const authSecret =
  process.env.BETTER_AUTH_SECRET ||
  (!process.env.VERCEL
    ? "local-build-only-secret-change-me-before-production"
    : undefined);

const trustedOrigins = Array.from(
  new Set([
    "https://www.senna-automation.com",
    "https://senna-automation.com",
    "http://localhost:3000",
    baseURL,
  ]),
);

const socialProviders: Record<string, SocialProviderConfig> = {};

const registerProvider = (
  id: PortalProviderId,
  clientId: string | undefined,
  clientSecret: string | undefined,
) => {
  if (!clientId || !clientSecret) return;

  socialProviders[id] = {
    clientId,
    clientSecret,
  };
};

registerProvider(
  "google",
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);
registerProvider(
  "github",
  process.env.GITHUB_CLIENT_ID,
  process.env.GITHUB_CLIENT_SECRET,
);
registerProvider(
  "facebook",
  process.env.FACEBOOK_CLIENT_ID,
  process.env.FACEBOOK_CLIENT_SECRET,
);
registerProvider(
  "apple",
  process.env.APPLE_CLIENT_ID,
  process.env.APPLE_CLIENT_SECRET,
);

const providerCatalog: PortalProviderDefinition[] = [
  { id: "google", label: "Google" },
  { id: "github", label: "GitHub" },
  { id: "facebook", label: "Facebook" },
  { id: "apple", label: "Apple" },
];

export const configuredPortalProviders = providerCatalog.filter(
  ({ id }) => Boolean(socialProviders[id]),
);

export const auth = betterAuth({
  appName: "Senna Automation Portal",
  baseURL,
  secret: authSecret,
  trustedOrigins,
  session: {
    expiresIn: 7 * 24 * 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "jwe",
      refreshCache: true,
    },
  },
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true,
  },
  socialProviders,
});
