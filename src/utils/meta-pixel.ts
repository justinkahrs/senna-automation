type PixelCommand = ((...args: unknown[]) => void) & {
  queue: unknown[][];
  callMethod?: (...args: unknown[]) => void;
  loaded: boolean;
  version: string;
  disablePushState: boolean;
  push?: (...args: unknown[]) => void;
};

type PixelWindow = Window & {
  fbq?: PixelCommand;
  _fbq?: PixelCommand;
};

// Limit the initial pilot to its public conversion surfaces. Other routes may
// contain portal context or customer data and must not load advertising code.
function isPilotPage(location: Location) {
  const allowedQueryKeys = new Set([
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "fbclid", "gclid", "gbraid", "wbraid", "variant", "content_id",
    "asset_id", "offer_id", "placement",
  ]);
  // The provider reads the current URL. Refuse pages with unrecognized query
  // parameters rather than exposing tokens or form answers in a page view.
  if ([...new URLSearchParams(location.search).keys()].some((key) => !allowedQueryKeys.has(key))) {
    return false;
  }
  return (
    /^\/ads\/[a-z0-9-]+\/?$/.test(location.pathname) ||
    /^\/workflow-bottleneck-review\/?$/.test(location.pathname)
  );
}

export function initializeMetaPixel(
  target: Window,
  pixelId: string,
  canTrack: () => boolean,
  consentChangedEvent: string,
) {
  if (!/^\d{5,30}$/.test(pixelId)) return () => {};
  const browser = target as PixelWindow;
  let initialized = false;
  let granted = false;
  let lastPage = "";

  const sync = () => {
    const permitted = canTrack() && isPilotPage(browser.location);
    if (!permitted) {
      if (browser.fbq && granted) {
        // Discard events still waiting for the provider script, then revoke.
        browser.fbq.queue = browser.fbq.queue.filter(
          (args) => args[0] !== "trackSingle",
        );
        browser.fbq("consent", "revoke");
      }
      granted = false;
      lastPage = "";
      return;
    }

    if (!initialized) {
      // Do not attach to an unknown pre-existing pixel installation.
      if (browser.fbq) return;
      const command: PixelCommand = Object.assign(
        (...args: unknown[]) => {
          if (command.callMethod) command.callMethod(...args);
          else command.queue.push(args);
        },
        { queue: [] as unknown[][], loaded: true, version: "2.0", disablePushState: true },
      );
      browser.fbq = command;
      browser._fbq = command;
      command.push = command;
      command("set", "autoConfig", false, pixelId);
      command("init", pixelId);
      const script = browser.document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      script.dataset.sennaMetaPixel = pixelId;
      browser.document.head.appendChild(script);
      initialized = true;
    }

    if (!granted && browser.fbq) {
      // The SDK stops draining its queue on revoke. A delayed re-grant must
      // replace pending consent commands so the bootstrap cannot stay locked.
      if (!browser.fbq.callMethod) {
        browser.fbq.queue = browser.fbq.queue.filter((args) => args[0] !== "consent");
      }
      browser.fbq("consent", "grant");
    }
    granted = true;
    const page = browser.location.href;
    if (lastPage !== page) {
      browser.fbq?.("trackSingle", pixelId, "PageView");
      lastPage = page;
    }
  };

  browser.addEventListener(consentChangedEvent, sync);
  browser.document.addEventListener("astro:page-load", sync);
  sync();
  return () => {
    browser.removeEventListener(consentChangedEvent, sync);
    browser.document.removeEventListener("astro:page-load", sync);
  };
}
