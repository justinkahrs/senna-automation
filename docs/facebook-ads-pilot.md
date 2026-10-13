# Senna Facebook Ads Pilot

Prepare a paused Facebook lead campaign for Senna Automation using the same
assessment offer and durable acquisition records as the Google Ads pilot.
Facebook delivery, conversion uploads, and spending remain disabled until the
account, consent, attribution, and budget checks below pass.

## Account state on October 13 2026

The signed-in Meta Business Suite shows business portfolio `1974401656477610`,
Facebook Page `886668227870287` (Senna Automation), and Instagram
`@sennaautomation`. Justin has full portfolio access. The owner created ad account
**Senna Automation**, ID `1076290755387824`, with USD currency and
America/Detroit time zone. Account Overview shows zero active campaigns and
$0.00 spent. Ads Manager can create drafts but still requests account information
before publication; billing readiness has not been established.
Datasets & pixels initially showed “No Datasets Added”. These findings apply to
this portfolio, not every personal or business account Justin may own.

The created dataset name is **Senna Automation Website**. Its creation form
defaults to connecting all existing and future portfolio datasets to Meta's
Conversions API. Leave that option unchecked; configure the Senna website
integration explicitly after consent and data checks pass. The owner explicitly
approved Meta Business Tools Terms and dataset creation in this chat. Meta
confirmed “Dataset created”. Business settings displays ID `29239084765779222`
and its details URL uses `selected_asset_id=1578614043482133`. Events Manager's
installation code confirms Pixel ID `29239084765779222`. The owner approved
connecting it to ad account `1076290755387824`; Meta confirmed one assigned
ad account. No website events have been sent.

The owner approved a persistent direct-integration Conversions API credential,
without Dataset Quality API. It was generated and stored privately in the VPS
runtime environment with META_CAPI_ENABLED=false and META_CAPI_DRY_RUN=true.
No service was restarted; current code does not yet consume those settings.
No conversion upload has been made. Meta warns
that an ad account cannot be removed from a portfolio once added. The owner
completed account creation and terms; billing remains an owner action.

## Saved paused campaign

| Setting | Saved value |
| --- | --- |
| Campaign name | `SENNA | Meta | GR Metro | Workflow Assessment | v1` |
| Objective | Leads |
| Conversion location | Website |
| Offer | Free workflow assessment |
| Destination | `https://www.senna-automation.com/ads/workflow-automation-consultant-grand-rapids` |
| Initial geography | Grand Rapids, Michigan +25 miles; geographic interest expansion off |
| Initial audience | Adults in the selected geography; copy identifies operational buyers |
| Initial delivery | Facebook Feed only; spending on excluded placements off |
| Campaign and ad set status | Saved as unpublished drafts with switches off |
| Ad status | Lead follow-up ad saved; switch off; not published |
| Budget | Separate $150 lifetime budget saved and verified |

The saved draft contains one ad set and one lead-follow-up ad. The other two
angles below are copy proposals only. No Apollo export or CRM audience was
uploaded. All campaign, ad set, and ad delivery switches are off.

The owner approved a separate **$150 total Facebook test**, leaving Google's
**$500 monthly cap** intact. This is budget preparation, not launch approval.
The campaign has a verified **$150 lifetime budget**. The draft schedule is
October 13, 2026 at 12:02 PM through November 13, 2026 at 12:02 PM Eastern;
review and reset the schedule at launch so review delays do not shorten delivery.

Saved identifiers: campaign `120251302730150185`, ad set
`120251302730140185`, and ad `120251302730130185`.
The ad set uses Website conversions, Senna Automation Website, and the Lead
event. Lead is currently inactive because no events have been received.
Only Facebook Feed is selected. All other platforms and placements are excluded,
and Meta's limited spending on excluded placements is disabled.

The ad uses the Senna Facebook Page and Instagram identity, the destination
below, Learn More, and the lead-follow-up copy. Its existing Page-library photo
shows a person working at two monitors (1080×720); no new image was uploaded.
Multi-advertiser ads, music, animation, overlays, visual/text improvements,
CTA enhancement, brightness changes, spotlights, and the website-form interactive
experience are off. Relevant comments remains on. The URL parameters below are
saved. Preview crops and expanded parameters before launch.

Dataset settings: automatic detailed page/product information, automatic events,
automatic advanced matching, and automatic event tracking without code are off.
Direct integration **without Dataset Quality API** was used to generate the
approved credential. It is privately stored, with delivery disabled.

## Draft creative copy

All three ads use the existing landing page's free workflow assessment. They
make no guaranteed savings, customer-count, revenue, or performance claims.
CTA: **Learn More**. Description: **Free workflow assessment. Grand Rapids based.**

### Lead follow up

Primary text: A new inquiry arrives. Someone copies it into another tool.
Follow-up waits on a reminder. Senna Automation maps the handoff and scopes an
automation around the systems your team already uses. Start with a free workflow
assessment for your West Michigan business.

Headline: **Give every inquiry a next step**

Saved creative: Existing Senna Page-library office photo showing a person at two
monitors. A workflow illustration is a future alternative. Avoid fabricated
dashboards, customer logos, testimonials, or outcome numbers.

### Repeated data entry

Primary text: Still entering the same information in two systems? Bring one
intake, approval, or reporting process to Senna Automation. We map the rules,
exceptions, and owner before scoping a focused implementation. Book a free
workflow assessment. Projects start at $500.

Headline: **Scope one workflow to automate**

Creative direction: Show the same business record moving between existing
tools, with an approval or exception path. Use a clear illustration rather than
claiming an integration that has not been built for a customer.

### Stalled handoffs

Primary text: Your team should know what happens after a form, document, or
approval arrives. Senna Automation helps West Michigan businesses connect intake
to the next step, with rules and exceptions defined. Describe the handoff that
keeps stalling. Start with a free workflow assessment.

Headline: **Turn a slow handoff into a plan**

Creative direction: Contrast a waiting task with a task assigned to a named
workflow role. Keep the illustration readable on a phone. Prepare a square
image for the proposed Feed pilot; preview actual crops before publishing.

## Attribution and conversion contract

Reuse `/api/form-hook`, `/api/attribution`, accepted lead records, Calendly
booking records, CRM qualification, and collected revenue. The existing service
is named `ads-automation` but supports source-neutral acquisition. Meta delivery
must be a separate adapter and gate from Google campaign mutations.

Use the following URL parameters in Ads Manager:

```text
utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.id}}&utm_term={{adset.id}}&utm_content={{ad.id}}&placement={{placement}}&offer_id=workflow-bottleneck-review
```

If Instagram is later included, use `{{site_source_name}}` for `utm_source` and
normalize its actual reported values in the acquisition service. Test the
expanded URL using an ad preview. Keep campaign, ad set, and ad IDs in reporting
so renaming ads does not break joins. Existing Calendly tracking carries the
opaque attribution ID in `utm_content`; do not replace it with custom-question
answers.

Facebook identifiers now use a separate validated metaAttribution object
(fbclid, fbc, fbp), captured only with marketing consent and owner exclusion off.
The signed website payload repeats those checks. Google clickId remains restricted
to gclid/gbraid/wbraid. Campaign/adset/ad IDs stay in the existing UTM fields.
Paid social is classified as paid_social; organic social remains social.

The existing n8n intake stores the complete signed lead and attribution-touch JSON,
and reporting projects acquisition_channel dynamically. Compatibility tests and
Postgres replay confirm that no workflow graph or published pin change is needed.
The independently gated service worker reads authoritative records directly;
Calendly continues joining through the existing opaque attribution ID.

Meta event mapping:

| Acquisition record | Meta event | Authoritative trigger |
| --- | --- | --- |
| Accepted contact request | `Lead` | Durable non-spam lead record |
| Consultation booked | `Schedule` | Verified Calendly intake and durable booking record |
| Qualified opportunity | Separate qualified-lead event | Explicit CRM qualification, after mapping is validated |
| Collected customer payment | `Purchase` | Collected payment, value and currency from revenue sync |

Persist an event ID before delivery and reuse it for retries. If the Pixel and
Conversions API both send the same action, use the same event name and event ID
for deduplication. Sending a browser event does not establish a durable lead or
booking. Do not count CTA clicks, modal opens, rejected spam, invoices issued,
or synthetic tests as business outcomes.

Load the Pixel only after marketing consent, with owner/testing exclusions.
Send server events only when the applicable lead's marketing consent permits
it. Disable automatic advanced matching and automatic event collection during
initial validation; define explicit events. Do not send form message text, raw
IP addresses, URL query secrets, or other unnecessary customer data to Meta.
Collect `fbclid`, `_fbc`, and `_fbp` only under the approved consent behavior;
do not invent a Facebook click identifier for a visit that lacks one.

The local website implementation now supports optional `PUBLIC_META_PIXEL_ID`.
`MetaPixel.astro` and `src/utils/meta-pixel.ts` load the provider only after
marketing consent and only on `/ads/<slug>` or `/workflow-bottleneck-review`.
They honor the browser exclusion, disable automatic configuration and history
tracking, deduplicate page views, remove queued page views on withdrawal and
revoke provider consent. Unknown query parameters block loading. No noscript
tracking image is installed. Server Lead and Schedule are implemented behind disabled gates. Qualification
and payment delivery remain outside the initial adapter.

PUBLIC_META_PIXEL_ID is configured for Production only. PR 143 was released,
then held on the previous production build while explicit Meta disclosure and
renewed consent were added. The follow-up release requires consent version 2;
older Google consent does not authorize Meta capture or server events. The
approved synthetic server Lead was accepted by the API and shown as Processed /
Server in Events Manager, event ID senna-meta-test-20261013-acceptance. This test
created no acquisition record and does not establish real conversion matching.

Meta describes the Pixel and Conversions API as complementary website-data
integrations in its [website data training](https://www.facebookblueprint.com/student/activity/291700-connect-your-website-data-for-better-ad-performance).
Implement deduplication against [Meta's event deduplication contract](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/)
and verify it in Events Manager before delivery.

## Automation and acceptance

Production automation changes belong in `~/Projects/infra` and must follow that
repo's instructions and rollout controls. Use read access first. Grant campaign
management only for the chosen Senna account after owner approval. Meta's
[Marketing API collection](https://www.postman.com/meta/facebook-marketing-api/collection/0zr4mes/facebook-marketing-api-mapi)
documents the app, token, ad account, and permission prerequisites. Facebook
Page publishing credentials and website Facebook login credentials do not
establish permission to manage paid ads.

1. Complete owner-approved account creation and dataset terms, record their IDs,
   verify Page assignment, domain state, account health, and billing readiness.
2. Extend attribution through the website and infra together. Replay Facebook,
   Google, organic, denied-consent, spam, duplicate, and owner-test fixtures.
3. Validate explicit Pixel and server events in Meta Test Events, including
   consent withdrawal, retry deduplication, and Calendly joins. Keep uploads
   disabled outside controlled tests until approved.
4. Create the campaign, ad set, and ads paused. Verify destination, final UTM
   expansion, geography, image previews, approved total budget, and end date.
5. Launch only after a Facebook-specific spending decision. Report accepted
   leads, verified bookings, qualifications, collected revenue, and actual spend
   alongside platform attribution; retain a tested pause control.

Current status: Facebook campaign, ad set and ad remain unpublished and off with
the saved $150 lifetime budget. The VPS Meta adapter is deployed and healthy:
meta_enabled=false, meta_dry_run=true. Google retains $500 monthly / $16.44 daily
limits and disabled spending controls. All 155 workflow pins and other running
services are unchanged. The approved synthetic server test is Processed in Meta.
Website code passed lint, build and 12 contract tests; service tests and temporary
PostgreSQL migration/retry/consent replay passed. The public Pixel setting is installed. Production consent acceptance is recorded
in the infra release receipt after the disclosure follow-up. Actual Meta URL
macro expansion remains an owner-approved launch prerequisite; the parameter
template and a substituted URL fixture were verified without ad publication.
