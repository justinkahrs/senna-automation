# Senna Automation

Public marketing site and content hub for [senna-automation.com](https://www.senna-automation.com).

The site now runs on Astro v7 with React islands, MUI, Framer Motion, Astro content collections, and the Vercel adapter. Public URLs, feed endpoints, OG image routes, portal routes, and API paths are preserved from the previous Next.js implementation.

## Stack

- Astro v7
- React + TypeScript
- MUI
- Framer Motion
- Better Auth
- Astro content collections for blog content
- Vercel deployment target

## Local Development

Install dependencies and start the Astro dev server:

```bash
npm install
npm run dev
```

Useful project checks:

```bash
npm run build
npm run lint
npm run token-audit
npm run test:visual
```

Notes:

- `npm run dev` starts Astro on `http://localhost:3000` by default.
- Visual regression tests currently run against Astro dev mode because `astro preview` is not supported with the Vercel adapter used in this repo.
- The repo still contains the previous `src/app/**` implementation during the migration window. Astro routes live under `src/pages/**`.

## Environment Variables

Do not commit secrets. Configure them locally in your shell or `.env`, and in production through Vercel or the relevant infrastructure environment.

Core site and integrations:

- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_GROUP_CHAT_ID`
- `TELEGRAM_WEBHOOK_SECRET`
- `GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`

Better Auth:

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

Portal and RFP workflows:

- `RFP_PORTAL_UPLOAD_SECRET`
- `N8N_RFP_PORTAL_WEBHOOK_URL`
- `N8N_PORTAL_ACCESS_WEBHOOK_URL`
- `N8N_RFP_PREVIEW_PDF_WEBHOOK_URL`
- `N8N_RFP_PORTAL_JOB_WEBHOOK_URL`

## Content and Public Artifacts

Key preserved routes and outputs:

- `/`
- `/about`
- `/services`
- `/solutions`
- `/pricing`
- `/contact`
- `/blog`
- `/blog/[slug]`
- `/rss.xml`
- `/atom.xml`
- `/feed.json`
- `/sitemap.xml`
- `/opengraph-image.png`
- `/blog/[slug]/opengraph-image.png`
- `/api/**`

Blog content lives in `src/content/blog/*.md`.

## Deployment

Production remains on Vercel. Before shipping:

```bash
npm run build
npx eslint src --ext .ts,.tsx --ignore-pattern '*.astro' --ignore-pattern '.astro' --ignore-pattern 'dist' --ignore-pattern '.vercel/output'
git status --short
```

If the release changes public content or feed metadata, also validate:

- `/rss.xml`
- `/atom.xml`
- `/feed.json`
- `/sitemap.xml`
- `/robots.txt`
- OG image endpoints
