# Portal Auth Setup

This project now includes a hidden `/login` portal and a protected `/portal`
upload flow for authenticated RFP PDF submission.

Portal auth is stateless on the website. Vercel does not need direct Postgres
access. n8n performs the allowlist lookup against the internal VPS database.

## Required Website Environment Variables

Set these in Vercel for the website:

- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`
- `RFP_PORTAL_UPLOAD_SECRET`
- `N8N_RFP_PORTAL_WEBHOOK_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

Optional:

- `N8N_PORTAL_ACCESS_WEBHOOK_URL`

Optional providers can be enabled later with:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `FACEBOOK_CLIENT_ID`
- `FACEBOOK_CLIENT_SECRET`
- `APPLE_CLIENT_ID`
- `APPLE_CLIENT_SECRET`

## OAuth Callback URLs

Register these callback URLs with each provider:

- `http://localhost:3000/api/auth/callback/<provider>`
- `https://www.senna-automation.com/api/auth/callback/<provider>`

## Database Setup

Apply [portal-auth-schema.sql](../supabase/portal-auth-schema.sql)
to the shared Postgres database before using the portal in production.

The script creates:

- `portal_access`

It also seeds:

- `justin@justinkahrs.com` as `admin`

## n8n Setup

The portal website expects the n8n wrapper webhook at:

- `https://n8n.senna-automation.com/webhook/portal-rfp-improve`

The access lookup webhook defaults to:

- `https://n8n.senna-automation.com/webhook/portal-access-check`

The live wrapper workflow name is:

- `WEBHOOK - Portal - Improve RFP Response`
- `WEBHOOK - Portal - Access Check`

The n8n instance must have the same `RFP_PORTAL_UPLOAD_SECRET` value as the
website. Without that secret, the webhooks return:

- `Portal upload secret is not configured.`

## Behavior

- `/login` shows only configured providers.
- `/portal` requires a valid Better Auth session and an `active` row in
  `portal_access`, resolved through n8n.
- The browser uploads PDFs directly to n8n after requesting a short-lived
  signed token from `/api/portal/rfp-upload-token`.
