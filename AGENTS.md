# AGENTS.md

## Project Purpose

`senna-automation` is the public website and content hub for Senna Automation.
It markets AI workflow automation, custom software, and operations consulting,
and its blog content feeds downstream SEO and social automations.

Production website:

```text
https://www.senna-automation.com
```

This repo owns the public Astro site. It does not own VPS infrastructure, live
n8n workflows, Mixpost, Umami, or either Instagram renderer. Those systems are
operational dependencies and must be checked when website content, forms,
analytics, feeds, or conversion paths change.

## System Map

- Website repo: `~/Projects/senna-automation`
- Infra repo: `~/Projects/infra`
- Instagram HyperFrames repo: `~/Projects/senna-insta`
- Legacy/rollback Remotion repo: `~/Projects/senna-overview-video`
- Live VPS SSH host: `senna-infra`
- Public website host: Vercel for `senna-automation.com` and
  `www.senna-automation.com`
- Infrastructure host: VPS subdomains such as `n8n.senna-automation.com`,
  `mixpost.senna-automation.com`, and `umami.senna-automation.com`

Keep the apex and `www` website records pointed at Vercel. Infra subdomains are
routed to the VPS through the separate `infra` project.

## Website Stack

- Astro v7 with the Vercel adapter.
- React 19 islands and TypeScript.
- MUI is the primary component system.
- Framer Motion is used for motion-heavy interface pieces.
- Better Auth supports authenticated portal routes.
- Blog content is an Astro content collection backed by Markdown in
  `src/content/blog`.
- RSS, Atom, JSON Feed, sitemap, and Open Graph outputs are Astro routes.
- Supabase/Postgres supports the live chat message/session flow.
- Telegram is the operator-side chat destination.
- Umami analytics loads in production from `umami.senna-automation.com`.

The previous Next.js implementation remains under `src/app/**` during the
migration window. Do not treat it as the active routing source. Public Astro
routes live under `src/pages/**`.

Important active paths:

- `src/pages/*.astro`: main public routes.
- `src/pages/blog/**`: blog listing, detail, and blog Open Graph routes.
- `src/pages/api/**`: active API endpoints.
- `src/site/pages/**`: React page implementations used by Astro routes.
- `src/site/feeds/**`: feed and sitemap builders.
- `src/site/og/**`: Open Graph image implementations.
- `src/server/routes/**`: shared server route implementations.
- `src/content/blog/*.md`: blog source content.
- `src/components/ScheduleCallButton.tsx`: Calendly modal and attribution.
- `src/utils/analytics.ts`: central Umami event helpers.
- `src/utils/attribution.ts`: ads and Calendly attribution helpers.
- `src/app/tokens.css`, `src/components/theme/*`, and `specs/`: design tokens
  and component guidance.
- `trackedEvents.md`: analytics event map.
- `docs/blogToMixpost.md`: historical notes, not the current social source of
  truth.
- `docs/google-ads-pilot.md`: guarded ads rollout; the pilot is not evidence of
  active traffic until its n8n workflows and ad campaign are explicitly enabled.
- `docs/content-acquisition-reset.md`: current cadence, outcome definitions, and
  the 30-day review contract.

## Environment Variables

Do not commit secrets. Production values belong in Vercel or the applicable VPS
runtime environment.

Core website and chat:

- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_GROUP_CHAT_ID`
- `TELEGRAM_WEBHOOK_SECRET`
- `N8N_CHAT_DB_WEBHOOK_URL`

Authentication:

- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `FACEBOOK_CLIENT_ID`
- `FACEBOOK_CLIENT_SECRET`
- `APPLE_CLIENT_ID`
- `APPLE_CLIENT_SECRET`

Portal and RFP:

- `RFP_PORTAL_UPLOAD_SECRET`
- `N8N_RFP_PORTAL_WEBHOOK_URL`
- `N8N_PORTAL_ACCESS_WEBHOOK_URL`
- `N8N_RFP_PREVIEW_PDF_WEBHOOK_URL`
- `N8N_RFP_PORTAL_JOB_WEBHOOK_URL`

Guarded Google Ads pilot:

- `ADS_LEAD_WEBHOOK_URL`
- `ADS_ATTRIBUTION_WEBHOOK_URL`
- `ADS_WEBHOOK_SIGNING_SECRET`
- `LEAD_FINGERPRINT_SECRET`
- `ADS_SHADOW_MAKE_WEBHOOK_URL`
- `ADS_SHADOW_MAKE_ENABLED`
- `PUBLIC_GOOGLE_ADS_ID`
- `PUBLIC_GOOGLE_LEAD_CONVERSION_LABEL`

## Local Development

```bash
cd ~/Projects/senna-automation
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npm run build
npm run token-audit
npm run test:visual
```

Visual tests run against Astro dev mode because `astro preview` is not supported
by the current Vercel adapter setup.

## Editing Guidance

Follow existing Astro, React, MUI, and token patterns. Prefer the tokens in
`src/app/tokens.css` over hardcoded visual values. Check desktop and mobile
layouts for public-page changes. Avoid generic landing-page filler, unrelated
decoration, and copy that over-explains the UI.

For blog posts:

- Add Markdown in `src/content/blog/<slug>.md`.
- Add images under `public/blog/<slug>/` or `public/blog/`.
- Keep slugs stable once published.
- Validate the blog detail page, feed routes, sitemap, and Open Graph image.
- Use IndexNow and WebSub only for real, significant content releases:

```bash
npm run indexnow:submit -- /blog/<slug>
npm run websub:publish
```

Do not update timestamps or promote an existing post merely because of a small
metadata or internal-link edit. Downstream automation can mistake any changed
blog Markdown file for a new article.

## Autonomous ICP Content And Distribution

The live n8n instance—not this repo—is the runtime source of truth. Source
artifacts, rollout controls, and operating instructions live in
`~/Projects/infra`; website content contracts and release checks live here.

The autonomous system uses only privacy-safe aggregates of score-75+,
auto-qualified, CRM-synced accounts. Cohorts with fewer than three companies are
suppressed before any value reaches a content prompt. It researches external
demand, creates one-cohort/one-problem opportunities, drafts and validates
articles, opens website PRs, waits for Vercel HTTP success, and then distributes
independent social assets through Mixpost and HyperFrames.

Production delivery is enabled for immutable infra rollout
`a8abe39fd8a529962a4fafbceaa642ea951bbef6dfd1183c790996cafcd4c600` as of
August 5, 2026. Website and company-social gates are open; Mautic publication,
sync, enrollment, sending, outreach, and paid-media gates remain closed. The
accepted replay, activation journal, closed-gate cycle, and provider repair
records are documented in `~/Projects/infra/AGENTS.md` and
`~/Projects/infra/docs/autonomous-content-production-state.md`.

Current cadence and boundaries:

- Qualified ICP snapshot: Saturday 6:30 AM Eastern.
- Market research: Sunday 7:00 AM Eastern.
- Portfolio selection: Monday 7:00 AM Eastern.
- Articles: first and third Wednesday at 8:30 AM Eastern, at most two per month
  and at least fourteen days apart.
- LinkedIn Page: Tuesday 9:00 AM Eastern.
- Facebook Page: Thursday 11:00 AM Eastern.
- Instagram: Saturday 9:00 AM Eastern.
- Outcomes: daily 5:30 AM Eastern; strategy learning: first Monday monthly.
- Mautic assets may be prepared only as unpublished drafts. Sync, enrollment,
  sending, outreach, and paid-media gates remain disabled.

Every generated article must include the optional legacy-compatible metadata
fields defined in `src/content.config.ts`, one Mermaid workflow, disclosed
low/base/high ROI assumptions, three to six valid sources, and the Workflow
Bottleneck Review offer. `npm run validate:content` enforces the content
contract, privacy and fake-case-study checks, deterministic ROI math, required
sections, novelty thresholds, and Mermaid compilation in a JSDOM-backed Node
environment. Keep `jsdom` as a direct development dependency; without it,
Mermaid's sanitizer cannot perform a real CI parse. `npm run
validate:content-outputs` verifies feeds, sitemap, robots, and OG build
artifacts.

The live publisher accepts only drafts whose generator and QA metadata both
carry `senna-article-contract/v2`, then rechecks the deterministic Mermaid,
exact `Implementation cost` ROI header, operating/evidence sections, and
Workflow Bottleneck Review CTA before creating a branch. A stale queued draft
is quarantined before GitHub rather than relying on website CI to catch it.
Article publication uses a content-specific lease, and the fifteen-minute
recovery trigger stands down during the primary 8:30 AM Eastern cadence minute.
Content Telegram alerts are durably deduplicated for fifteen minutes and include
workflow, trigger/mode, node, available content/PR context, cause, and the
fail-closed action.

The repaired rollout's first same-day live article retry published PR 134,
“Reducing Missed Updates in Customer Handoffs for Membership-Based Activity
Operations,” at QA 91. Its page, RSS, Atom, JSON Feed, sitemap, and Open Graph
image were publicly verified, and its content asset and opportunity are both
durably `published`. This one-off retry did not alter the recurring schedule or
trigger article-diff social promotion.

The publisher sends no-cache GitHub requests and reconciles the branch head
from the created PR's authoritative `head.sha`. Release checks use the n8n 2.x
HTTP helper response options; do not restore the legacy request-promise flags
that made successful public HTTP responses appear as status zero. Waiting
release checks must retain article/feed/sitemap/OG diagnostics rather than
returning unexplained empty output.

Social publication is opportunity-driven and must not be restored to GitHub
diff polling. Provider success requires Mixpost `published_at` plus a provider
post ID. The legacy Scheduled Blog Agent, old blog-social polling, humanizer,
and prior Instagram producer/completion flows remain retired. The SEO publisher
and hardened SEO PR helper remain manual-only and non-blog-only.

Closed setup article PRs 128–130 and 133 are quarantined audit fixtures, not
publishable articles. PR 133 is the stale-contract artifact from the August 5
8:30 AM run. PR 131 is the accepted JSDOM/Mermaid validation repair. Do not
reopen, redate, or promote the setup fixtures.

Do not change live automation from this repo. Update the generator and pinned
rollout in `~/Projects/infra`, run its replay/audit controls, and verify live
workflow, provider, and attribution state.

## Conversion And Analytics Reality

Umami is a useful directional signal, not a clean lead ledger. Client-side
analytics currently include owner/testing traffic, bots, data-center traffic,
and malformed crawler paths. Segment or filter those before drawing conclusions
from aggregate sessions.

The Calendly button tracks modal opens separately from the
`calendly.event_scheduled` embed message. Only a verified Calendly webhook and
durable booking row are authoritative; the browser event is a directional
signal.

Umami must load only after analytics consent. Google tags must load only after
marketing consent and remain optional. The internal portal includes a browser
exclusion preference for owner/testing traffic.

Lead intake uses a hidden honeypot, minimum useful message length, combined
time/content signals, and an HMAC request fingerprint. Never store raw IP
addresses. Google Ads configuration must not block form persistence, Calendly,
Mautic, revenue sync, or source-neutral acquisition reporting.

For a funnel audit, check all layers:

1. Qualified source sessions in Umami, excluding obvious bots and owner tests.
2. Landing-page engagement and CTA/modal opens.
3. Contact form submissions and spam disposition.
4. Calendly booking-completion records, not just modal clicks.
5. Mixpost publish status and referral traffic, not just created drafts.
6. Search Console/DataForSEO query demand and clicks, not ranking position alone.

## Business Infrastructure

The `infra` repo runs the VPS Docker Compose stack and is a separate production
system. Core services include Traefik, n8n main/worker, Postgres, Redis, Mixpost,
Umami, Mautic, Akaunting, Qdrant, HyperFrames rendering, and the legacy Remotion
renderer.

Use the VPS runtime env explicitly for Compose inspection:

```bash
ssh senna-infra 'cd ~/Projects/infra && docker compose --env-file .env.runtime ps'
ssh senna-infra 'cd ~/Projects/infra && docker compose --env-file .env.runtime logs --tail=100 n8n'
ssh senna-infra 'cd ~/Projects/infra && docker compose --env-file .env.runtime logs --tail=100 n8n-worker'
```

Do not make infra changes in this repo. Make them in `~/Projects/infra` and
follow that repo's instructions.

## Deployment

Website deployment is separate from VPS deployment. Normal website changes are
committed and pushed through the repository flow used by Vercel.

Before handing off a website change:

```bash
npm run lint
npm run build
git status --short
```

For significant SEO/content releases, also validate the feeds, sitemap, robots,
and Open Graph endpoints before considering IndexNow or WebSub notification.

## Boundaries

- Keep this repo focused on the public website, content, website APIs, and
  website-adjacent scripts.
- Do not place runtime data, backups, or service secrets in this repo.
- Do not edit live n8n workflows without explicitly working in n8n.
- Do not change Mixpost, Traefik, Docker Compose, database services, or renderers
  from this repo.
- If a website change affects automation inputs, test the related n8n and
  Mixpost behavior before considering the change complete.
