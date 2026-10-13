import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import { initializeMetaPixel } from "../src/utils/meta-pixel.ts";

const pixelId = "29239084765779222";
const event = "senna:consent-changed";
const pilotUrl = "https://www.senna-automation.com/ads/workflow-automation-consultant-grand-rapids";

test("Meta loads only after consent and removes pending events on withdrawal", () => {
  const { window } = new JSDOM("<html><head></head><body></body></html>", { url: pilotUrl });
  let allowed = false;
  initializeMetaPixel(window, pixelId, () => allowed, event);
  assert.equal(window.document.querySelectorAll("script").length, 0);
  assert.equal(window.fbq, undefined);
  allowed = true;
  window.dispatchEvent(new window.Event(event));
  assert.equal(window.document.querySelectorAll("script").length, 1);
  assert.deepEqual(window.fbq.queue.slice(0, 3), [
    ["consent", "revoke"], ["set", "autoConfig", false, pixelId], ["init", pixelId],
  ]);
  assert.equal(window.fbq.disablePushState, true);
  assert.equal(window.fbq.queue.filter((args) => args[0] === "trackSingle").length, 1);
  window.dispatchEvent(new window.Event(event));
  window.document.dispatchEvent(new window.Event("astro:page-load"));
  assert.equal(window.fbq.queue.filter((args) => args[0] === "trackSingle").length, 1);
  allowed = false;
  window.dispatchEvent(new window.Event(event));
  assert.equal(window.fbq.queue.filter((args) => args[0] === "trackSingle").length, 0);
  assert.deepEqual(window.fbq.queue.at(-1), ["consent", "revoke"]);
  allowed = true;
  window.dispatchEvent(new window.Event(event));
  assert.equal(window.document.querySelectorAll("script").length, 1);
  assert.deepEqual(window.fbq.queue.at(-1), ["trackSingle", pixelId, "PageView"]);
});

test("Excluded traffic, private routes and missing pixel configuration never load Meta", () => {
  for (const [url, id, allowed] of [
    [pilotUrl, pixelId, false],
    [pilotUrl, "", true],
    ["https://www.senna-automation.com/portal/ads", pixelId, true],
    ["https://www.senna-automation.com/login", pixelId, true],
    [`${pilotUrl}?token=private-value`, pixelId, true],
  ]) {
    const { window } = new JSDOM("<html><head></head></html>", { url });
    initializeMetaPixel(window, id, () => allowed, event);
    assert.equal(window.document.querySelectorAll("script").length, 0);
  }
});

test("Navigation into the portal revokes consent without issuing another event", () => {
  const { window } = new JSDOM("<html><head></head></html>", { url: pilotUrl });
  initializeMetaPixel(window, pixelId, () => true, event);
  window.fbq.queue = [];
  window.history.pushState({}, "", "/portal/ads");
  window.document.dispatchEvent(new window.Event("astro:page-load"));
  assert.deepEqual(window.fbq.queue, [["consent", "revoke"]]);
});
