# Senna Google Ads Pilot

This implementation connects the Astro/Vercel site to the internal Senna ads
automation stack while keeping all Google mutations disabled by default.

## Website surfaces

- Paid landing pages:
  - `/ads/ai-automation-grand-rapids`
  - `/ads/workflow-automation-consultant-grand-rapids`
  - `/ads/ai-consulting-grand-rapids`
- Lead intake: `POST /api/form-hook`
- Attribution intake: `POST /api/attribution`
- Authenticated reporting: `/portal/ads`

The landing pages are noindex and use one content schema so an experiment can
change copy without generating arbitrary page code. Attribution stores an
opaque token, first/last-touch UTMs, one Google click ID, landing-page context,
and consent state. Calendly receives the UTMs and token through `utm_content`
and `a1`.

Google advertising tags default to denied. They are loaded only after marketing
consent. Rejecting marketing consent does not block the form; it prevents
customer-data conversion uploads.

## Vercel configuration

Configure these values in Vercel, not in source control:

```text
DATABASE_URL=
ADS_LEAD_WEBHOOK_URL=https://n8n.senna-automation.com/webhook/ads/lead-intake
ADS_ATTRIBUTION_WEBHOOK_URL=https://n8n.senna-automation.com/webhook/ads/attribution
ADS_WEBHOOK_SIGNING_SECRET=
LEAD_FINGERPRINT_SECRET=
ADS_SHADOW_MAKE_WEBHOOK_URL=
ADS_SHADOW_MAKE_ENABLED=true
PUBLIC_GOOGLE_ADS_ID=
PUBLIC_GOOGLE_LEAD_CONVERSION_LABEL=
```

`ADS_WEBHOOK_SIGNING_SECRET` must match the n8n/VPS value. Keep
`ADS_SHADOW_MAKE_ENABLED=true` for the seven-day comparison and then set it to
`false` only after Make and n8n record counts and payloads match.

## n8n workflow set

The workflows are created in the Senna n8n instance but intentionally remain
unpublished until the infrastructure and account gates below are complete.

| Workflow | ID |
| --- | --- |
| ADS - Lead Intake | `tSuGJaJDISARkwNx` |
| ADS - Calendly Intake | `KBMGNeTq9qJEmd1C` |
| ADS - Research And Campaign Sync | `E7fGgZhviG1FZ0an` |
| ADS - Daily Performance Optimizer | `1gGs150S5qJDb3ND` |
| ADS - Revenue Sync | `mWy3tffwa2O6CUBN` |
| ADS - Conversion Diagnostics | `RuF9XImJzH9cqIfd` |
| ADS - Weekly Report | `NuS2N25YzJDAQ7ZT` |
| ADS - Error Handler | `t8PM3VjpD1kGEauG` |
| ADS - Telegram Controls | `uinSbfCfp0RCQ3Fw` |

Before publication:

1. Deploy the `ads-schema-init` and internal `ads-automation` services from
   `~/Projects/infra`.
2. Populate the VPS variables documented in
   `~/Projects/infra/ads-automation/README.md`.
3. Confirm the Postgres, Mautic, Telegram, and Akaunting credentials assigned to
   the workflows.
4. In Mautic, create the contact custom fields `lifecycle_status`,
   `ads_submission_id`, and `ads_attribution_id`. The exact value `qualified`
   is the explicit qualified-lead signal. Lead intake upserts the contact and,
   when supplied, the company and contact/company relationship.
5. Set `ADS_TELEGRAM_CHAT_ID` and `ADS_TELEGRAM_USER_ID`; both must match for
   control commands.
6. Create the Calendly webhook for `invitee.created` and `invitee.canceled`.
7. Publish the error handler first and configure it as the error workflow for
   the other eight workflows.
8. Publish intake workflows before setting the Vercel webhook URLs.

Telegram control commands are `/ads_status`, `/ads_pause`, and `/ads_resume`.
Resume cannot enable live automation while `ADS_AUTOMATION_ENABLED=false`.

## Google account gates

Owner action is required to complete billing, advertiser verification,
customer/manager linking, production developer-token access, OAuth consent, and
the Google customer-data terms. Create the five conversion actions before
supplying their IDs:

- Lead form submitted
- Consultation booked
- Qualified lead
- Paid customer
- Calls from ads lasting at least 60 seconds

The internal service uses validation-only Data Manager uploads while dry-run is
enabled. With Google credentials present, campaign sync submits the complete
atomic campaign mutation with Google `validate_only`. Live bootstrap is blocked
until all five conversion-action IDs, an owner-approved pre-uploaded business
logo asset, the production environment switch, the Postgres control switch, and
the non-emergency control state all agree. A live bootstrap creates the complete
campaign in `PAUSED` state; activation is always a separate owner action.

Keyword research combines the existing DataForSEO brief with monthly cached
Keyword Planner ideas, historical metrics, and a 30-day forecast. The forecast
80th-percentile CPC is capped at $10 before campaign sync. The optimizer can
advance from Maximize Clicks to Maximize Conversions and then 300% target ROAS
only when the conversion, tracking, and stable-value gates are observed directly
from Postgres and Google Ads. Every applied change stores a reversible payload;
after a 14-day comparison matures, a qualified-CPA regression over 30% can
reference that change log for rollback. The service calculates both CPA windows
from its own daily-performance table rather than trusting caller evidence.

## Rollout

1. Shadow Make and n8n for seven days.
2. Keep the campaign paused and run 48 hours of consent/tag, form, Calendly,
   Mautic, Akaunting, and conversion-upload validation.
3. Confirm `/portal/ads`, `/healthz`, and Telegram `/ads_status`.
4. Set `ADS_AUTOMATION_DRY_RUN=false` and
   `ADS_AUTOMATION_ENABLED=true`, then use authenticated `/ads_resume` to set
   the independent Postgres control switch.
5. Run campaign sync once; verify that the complete campaign was created in
   `PAUSED` state, then activate it as the owner-controlled production step.
6. Keep autonomous optimizer workflows unpublished or in observation mode for
   two weeks while reviewing the decision log and rollback payloads.
7. Publish the daily optimizer only after the observation review passes.

At every stage, the $32.90 average daily budget and $1,000 monthly ceiling
remain independent policy checks in Postgres and in the internal service.

## Verification

```bash
npm run lint
npm run build
npm run token-audit
node --experimental-strip-types --test tests/ads-contract.test.mjs
```

Use Tag Assistant on all three paid pages to confirm no Google request occurs
before marketing consent and one successful form creates exactly one browser
conversion with its `submissionId` as the transaction ID.
