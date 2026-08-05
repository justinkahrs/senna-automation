import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

import {
  handleAttribution,
  handleLeadSubmission,
  readConsent,
  selectClickId,
  verifySignedWebhookBody,
} from "../src/server/routes/ads/webhooks.ts";
import {
  buildTrackedCalendlyUrl,
  mergeCalendlyContentContext,
} from "../src/utils/calendly-context.ts";

test("Google click identifiers use gclid, gbraid, wbraid precedence", () => {
  assert.deepEqual(
    selectClickId({
      gclid: "g-click",
      gbraid: "gb-click",
      wbraid: "wb-click",
    }),
    { type: "gclid", value: "g-click" },
  );
  assert.deepEqual(
    selectClickId({ gbraid: "gb-click", wbraid: "wb-click" }),
    { type: "gbraid", value: "gb-click" },
  );
});

test("consent defaults to unset and preserves explicit rejection", () => {
  assert.deepEqual(readConsent(null), {
    necessary: true,
    analytics: "unset",
    marketing: "unset",
    updatedAt: null,
    version: 1,
  });
  assert.equal(
    readConsent({ analytics: "granted", marketing: "denied" }).marketing,
    "denied",
  );
});

test("Calendly URL preserves content context without overwriting custom questions", () => {
  const upstream = {
    contentId: "cnt_service_scheduling_001",
    assetId: "blog:cnt_service_scheduling_001",
    offerId: "workflow-bottleneck-review",
    placement: "article-inline",
  };
  const offerPageContext = mergeCalendlyContentContext(upstream, {
    contentId: "offer-workflow-bottleneck-review",
    assetId: "offer-page:workflow-bottleneck-review",
    offerId: "workflow-bottleneck-review",
    placement: "offer-hero",
  });
  assert.deepEqual(offerPageContext, {
    ...upstream,
    placement: "offer-hero",
  });

  const trackedUrl = new URL(
    buildTrackedCalendlyUrl(
      "https://calendly.com/senna-automation/intro",
      {
        utm_source: "linkedin",
        utm_medium: "organic-social",
        utm_content:
          "service-scheduling|aid:attr_old|cid:old|asid:old|oid:old|plc:old",
      },
      "attr_12345678-1234-4234-9234-123456789abc",
      offerPageContext,
    ),
  );

  for (const positionalAnswer of ["a1", "a2", "a3", "a4", "a5"]) {
    assert.equal(trackedUrl.searchParams.has(positionalAnswer), false);
  }

  const trackingContent = trackedUrl.searchParams.get("utm_content");
  assert.ok(trackingContent);
  assert.ok(trackingContent.length < 255);
  const tokens = Object.fromEntries(
    trackingContent
      .split("|")
      .filter((part) => /^(aid|cid|asid|oid|plc):/.test(part))
      .map((part) => {
        const separator = part.indexOf(":");
        return [part.slice(0, separator), part.slice(separator + 1)];
      }),
  );
  assert.deepEqual(tokens, {
    aid: "attr_12345678-1234-4234-9234-123456789abc",
    cid: upstream.contentId,
    asid: upstream.assetId,
    oid: upstream.offerId,
    plc: "offer-hero",
  });
  for (const key of ["aid", "cid", "asid", "oid", "plc"]) {
    assert.equal(
      trackingContent.split("|").filter((part) => part.startsWith(`${key}:`))
        .length,
      1,
    );
  }

  const calendlyWebhookFixture = {
    event: "invitee.created",
    payload: {
      uri: "https://api.calendly.com/scheduled_events/event-001/invitees/invitee-001",
      tracking: { utm_content: trackingContent },
      questions_and_answers: [
        {
          question: "What workflow should we review?",
          answer: "Scheduling exceptions across three service territories",
        },
      ],
    },
  };
  assert.deepEqual(
    Object.fromEntries(
      calendlyWebhookFixture.payload.tracking.utm_content
        .split("|")
        .filter((part) => /^(aid|cid|asid|oid|plc):/.test(part))
        .map((part) => {
          const separator = part.indexOf(":");
          return [part.slice(0, separator), part.slice(separator + 1)];
        }),
    ),
    tokens,
  );
  assert.equal(
    calendlyWebhookFixture.payload.questions_and_answers[0].answer,
    "Scheduling exceptions across three service territories",
  );
});

test("signed webhook verification rejects tampering", () => {
  process.env.ADS_WEBHOOK_SIGNING_SECRET = "unit-test-signing-secret";
  const timestamp = "1785182400";
  const body = JSON.stringify({ submissionId: "lead_test_001" });
  const signature = createHmac(
    "sha256",
    process.env.ADS_WEBHOOK_SIGNING_SECRET,
  )
    .update(`${timestamp}.${body}`)
    .digest("hex");

  assert.equal(
    verifySignedWebhookBody(timestamp, body, `sha256=${signature}`),
    true,
  );
  assert.equal(
    verifySignedWebhookBody(timestamp, `${body}x`, `sha256=${signature}`),
    false,
  );
});

test("malformed form payload is rejected before forwarding", async () => {
  const request = new Request("https://www.senna-automation.com/api/form-hook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "A",
      assistance: "",
      contactMethod: "email",
      contactValue: "not-an-email",
    }),
  });

  const response = await handleLeadSubmission(request);
  assert.equal(response.status, 422);
});

test("duplicate submission IDs retain one deterministic idempotency key", async () => {
  process.env.ADS_WEBHOOK_SIGNING_SECRET = "unit-test-signing-secret";
  process.env.ADS_LEAD_WEBHOOK_URL = "https://n8n.example/webhook/ads/lead-intake";
  process.env.ADS_SHADOW_MAKE_ENABLED = "false";
  const originalFetch = globalThis.fetch;
  const forwarded = [];
  globalThis.fetch = async (url, init) => {
    forwarded.push({ url: String(url), init });
    return new Response(JSON.stringify({ accepted: true }), { status: 200 });
  };

  try {
    const payload = {
      submissionId: "lead_duplicate_001",
      name: "Test Lead",
      assistance: "Automate our intake and scheduling workflow.",
      contactMethod: "email",
      contactValue: "lead@example.com",
      consent: { analytics: "denied", marketing: "denied" },
      contentId: "cnt_manufacturing_rfq_001",
      assetId: "blog:cnt_manufacturing_rfq_001",
      offerId: "workflow-bottleneck-review",
      placement: "article-final",
    };

    for (let attempt = 0; attempt < 2; attempt += 1) {
      const response = await handleLeadSubmission(
        new Request("https://www.senna-automation.com/api/form-hook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      );
      assert.equal(response.status, 202);
      assert.equal((await response.json()).submissionId, payload.submissionId);
    }

    assert.equal(forwarded.length, 2);
    assert.equal(
      forwarded[0].init.headers["X-Idempotency-Key"],
      "lead_duplicate_001",
    );
    assert.equal(
      forwarded[1].init.headers["X-Idempotency-Key"],
      "lead_duplicate_001",
    );
    assert.equal(
      JSON.parse(forwarded[0].init.body).consent.marketing,
      "denied",
    );
    const forwardedBody = JSON.parse(forwarded[0].init.body);
    assert.deepEqual(
      {
        contentId: forwardedBody.contentId,
        assetId: forwardedBody.assetId,
        offerId: forwardedBody.offerId,
        placement: forwardedBody.placement,
      },
      {
        contentId: "cnt_manufacturing_rfq_001",
        assetId: "blog:cnt_manufacturing_rfq_001",
        offerId: "workflow-bottleneck-review",
        placement: "article-final",
      },
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("attribution forwarding preserves normalized content conversion context", async () => {
  process.env.ADS_WEBHOOK_SIGNING_SECRET = "unit-test-signing-secret";
  process.env.ADS_ATTRIBUTION_WEBHOOK_URL =
    "https://n8n.example/webhook/ads/attribution";
  const originalFetch = globalThis.fetch;
  const forwarded = [];
  globalThis.fetch = async (url, init) => {
    forwarded.push({ url: String(url), init });
    return new Response(JSON.stringify({ accepted: true }), { status: 200 });
  };

  try {
    const response = await handleAttribution(
      new Request("https://www.senna-automation.com/api/attribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attributionId: "attr_1234567890abcdef",
          firstTouch: {
            landingPage:
              "/blog//rfq-guide/?email=private%40example.com&utm_source=linkedin#fragment",
            landingPageSlug: "blog/rfq-guide",
            landingPageVariant: "control",
            contentId: " cnt_rfq_001 ",
            referrer: "https://www.linkedin.com/feed/?tracking=private-token",
          },
          lastTouch: {
            landingPage: "/workflow-bottleneck-review",
            landingPageSlug: "workflow-bottleneck-review",
            landingPageVariant: "control",
            offerId: "workflow-bottleneck-review",
          },
          conversionContext: {
            contentId: " cnt_rfq_001 ",
            assetId: " blog:cnt_rfq_001 ",
            offerId: " workflow-bottleneck-review ",
            placement: " article-inline ",
            touchedAt: "2026-08-04T12:00:30.000Z",
          },
          consent: { analytics: "granted", marketing: "denied" },
          createdAt: "2026-08-04T12:00:00.000Z",
          updatedAt: "2026-08-04T12:01:00.000Z",
        }),
      }),
    );

    assert.equal(response.status, 202);
    assert.equal(forwarded.length, 1);
    const forwardedBody = JSON.parse(forwarded[0].init.body);
    assert.deepEqual(forwardedBody.conversionContext, {
      contentId: "cnt_rfq_001",
      assetId: "blog:cnt_rfq_001",
      offerId: "workflow-bottleneck-review",
      placement: "article-inline",
      touchedAt: "2026-08-04T12:00:30.000Z",
    });
    assert.equal(forwardedBody.contentId, "cnt_rfq_001");
    assert.equal(forwardedBody.firstTouch.contentId, "cnt_rfq_001");
    assert.equal(forwardedBody.lastTouch.offerId, "workflow-bottleneck-review");
    assert.equal(
      forwardedBody.firstTouch.landingPage,
      "/blog/rfq-guide?utm_source=linkedin",
    );
    assert.equal(forwardedBody.firstTouch.referrer, "https://www.linkedin.com/feed");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
