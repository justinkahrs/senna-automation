import { expect, test, type Page } from "@playwright/test";

const routes = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "services", path: "/services" },
  { name: "solutions", path: "/solutions" },
  { name: "pricing", path: "/pricing" },
  { name: "contact", path: "/contact" },
  { name: "blog", path: "/blog" },
  {
    name: "blog-detail",
    path: "/blog/automating-inventory-sync-between-purchasing-production-and-the-stock-room",
  },
  { name: "ai-consulting-grand-rapids", path: "/ai-consulting-grand-rapids" },
  { name: "ai-automation-grand-rapids", path: "/ai-automation-grand-rapids" },
  {
    name: "workflow-automation-consultant-grand-rapids",
    path: "/workflow-automation-consultant-grand-rapids",
  },
  { name: "privacy", path: "/privacy" },
  { name: "terms", path: "/terms" },
  { name: "login", path: "/login" },
];

const headerRoutes = [
  { name: "services", path: "/services" },
  { name: "solutions", path: "/solutions" },
  { name: "ai-consulting-grand-rapids", path: "/ai-consulting-grand-rapids" },
  { name: "ai-automation-grand-rapids", path: "/ai-automation-grand-rapids" },
  {
    name: "workflow-automation-consultant-grand-rapids",
    path: "/workflow-automation-consultant-grand-rapids",
  },
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("senna_privacy_notice_acknowledged", "true");
  });
});

async function preparePage(page: Page, path: string) {
  await page.goto(path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    for (const video of Array.from(document.querySelectorAll("video"))) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Some media streams do not allow seeking until metadata is ready.
      }
    }
  });
  await page.locator("body").waitFor({ state: "visible" });
}

for (const route of routes) {
  test(`${route.name} full page visual parity`, async ({ page }, testInfo) => {
    await preparePage(page, route.path);
    await expect(page).toHaveScreenshot(
      `${route.name}-${testInfo.project.name}.png`,
      { fullPage: true },
    );
  });
}

for (const route of headerRoutes) {
  test(`${route.name} header states visual parity`, async ({
    page,
  }, testInfo) => {
    await preparePage(page, route.path);
    await expect(page).toHaveScreenshot(
      `${route.name}-header-top-${testInfo.project.name}.png`,
    );

    await page.evaluate(() => window.scrollTo(0, 260));
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot(
      `${route.name}-header-scrolled-${testInfo.project.name}.png`,
    );
  });
}
