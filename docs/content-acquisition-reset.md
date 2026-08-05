# Autonomous Content And Acquisition Operating Contract

The July 27–28, 2026 reset remains the historical baseline. It is superseded by
the autonomous ICP-to-revenue system introduced August 2026.

## Objective

Replace publication volume with a smaller, measurable acquisition system. A
page view, draft, modal open, or bot form fill is not a business outcome. The
primary outcomes are:

1. a legitimate lead accepted by the durable intake ledger;
2. a confirmed Calendly booking;
3. a lead explicitly qualified in Mautic;
4. a paid customer reconciled from Akaunting.

## Active Cadence

- Qualified ICP snapshot: Saturday at 6:30 AM Eastern.
- Market research: Sunday at 7:00 AM Eastern.
- Opportunity portfolio selection: Monday at 7:00 AM Eastern.
- New articles: first and third Wednesday at 8:30 AM Eastern, maximum two per
  calendar month and at least fourteen days apart.
- LinkedIn Page: Tuesday at 9:00 AM Eastern.
- Facebook Page: Thursday at 11:00 AM Eastern.
- Instagram: Saturday at 9:00 AM Eastern, with asynchronous HyperFrames
  completion polling.
- Outcomes: daily at 5:30 AM Eastern.
- Strategy revision: first Monday of each month; no outcome reweighting below
  100 filtered sessions or three verified meetings for the content family.

## Intentionally Disabled Or Retired

- The legacy Scheduled Blog Agent.
- Open-blog-PR and merged-blog-PR social polling.
- The generic humanizer and old blog-to-social helper.
- The prior Instagram trust-calendar producer and completion poller.
- Automatic SEO publishing and merging; the hardened SEO helper is non-blog and
  manual-only.
- Mautic publication, sync, enrollment, sending, and outreach. Content-aware
  assets remain unpublished drafts.
- Google campaign research, creation, optimization, and diagnostics until Ads
  is deliberately configured. This does not block organic, referral, social,
  direct, or Calendly acquisition.

Social assets are selected from the opportunity library and are not article
summary duplicates. A successful n8n execution is insufficient: publication is
verified from Mixpost `published_at` and the provider-owned post ID.

## Measurement Rules

- Umami loads only after analytics consent and can be disabled in an owner's
  browser from the ads dashboard.
- A Calendly modal open is directional. Only the signed Calendly webhook and
  durable booking ledger establish a verified meeting. The website preserves
  `contentId`, `assetId`, `offerId`, and CTA placement in `utm_content`.
- Forms use a honeypot, minimum completion/content signals, an HMAC request
  fingerprint, and a durable five-attempt-per-hour limit. Raw IP addresses are
  not stored.
- Lead persistence and the HTTP response occur before optional Mautic,
  conversion, or Telegram work.
- Google conversion uploads require explicit marketing consent.

## 90-Day Review

Review weekly, but do not change strategy from one noisy week. At day 90
compare:

- legitimate leads, confirmed bookings, qualified leads, and paid customers;
- landing-page conversion by acquisition channel;
- content-assisted sessions and legitimate CTA actions;
- indexed pages, query impressions, and clicks;
- draft count versus approved/published social posts.

The commercial target is three verified qualified meetings in the first 90
days. It is a target, not a guarantee. If qualified reach remains below 100
sessions by day 45, record a distribution constraint without enabling paid
media. If meetings remain weak, change the offer, audience, proof, or
distribution channel before increasing publication frequency.
