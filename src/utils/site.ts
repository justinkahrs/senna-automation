import siteConfig from "../../site.config.json";

export const SITE_NAME = siteConfig.siteName;
export const SITE_URL = siteConfig.siteUrl.replace(/\/$/, "");
export const SITE_HOST = new URL(SITE_URL).host;

export const RSS_FEED_URL = `${SITE_URL}/rss.xml`;
export const ATOM_FEED_URL = `${SITE_URL}/atom.xml`;
export const JSON_FEED_URL = `${SITE_URL}/feed.json`;

export const WEBSUB_HUB_URL = siteConfig.webSubHubUrl;

export const INDEXNOW_KEY = siteConfig.indexNowKey;
export const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

export const LOGO_URL = `${SITE_URL}/images/senna-automation-new.png`;
export const FAVICON_URL = `${SITE_URL}/images/favicon.svg`;

export const GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  undefined;

export const BING_SITE_VERIFICATION =
  process.env.BING_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ||
  undefined;
