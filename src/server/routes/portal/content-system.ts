import { NextResponse } from "@/compat/next/server";
import {
  getPortalAccessByEmail,
  hasActivePortalAccess,
} from "@/lib/portal-access";
import { getPortalSession } from "@/lib/portal-session";
import { getAllBlogPosts } from "@/utils/blog";
import { query } from "@/utils/db";

export const runtime = "nodejs";

type StatusLevel = "ok" | "warning" | "error" | "unknown";

interface ScheduleDefinition {
  id: string;
  label: string;
  cadence: string;
  time: string;
  owner: string;
  purpose: string;
  rule:
    | { kind: "daily" }
    | { kind: "weekly"; isoWeekday: number }
    | { kind: "first-monday" }
    | { kind: "article-wednesday" };
}

const EASTERN_TIME_ZONE = "America/Detroit";
const DAY_MS = 24 * 60 * 60 * 1000;
const CURRENT_CONTENT_ROLLOUT_ID =
  "ce89e3dd879ac24e886e146b4bb282aa03ea09443e6d2def10ddc83ba41afc7a";

const scheduleDefinitions: ScheduleDefinition[] = [
  {
    id: "outcomes",
    label: "Collect outcomes",
    cadence: "Daily at 5:30 AM Eastern",
    time: "05:30",
    owner: "CONTENT - Collect Outcomes",
    purpose:
      "Reads source-neutral performance signals, filters owner/bot traffic, and records learning observations.",
    rule: { kind: "daily" },
  },
  {
    id: "snapshot",
    label: "Qualified ICP snapshot",
    cadence: "Saturday at 6:30 AM Eastern",
    time: "06:30",
    owner: "CONTENT - Qualified ICP Snapshot",
    purpose:
      "Builds privacy-safe aggregate cohorts from score-75+ CRM-synced accounts; cohorts below three companies are suppressed.",
    rule: { kind: "weekly", isoWeekday: 6 },
  },
  {
    id: "research",
    label: "Market research",
    cadence: "Sunday at 7:00 AM Eastern",
    time: "07:00",
    owner: "CONTENT - Market Research",
    purpose:
      "Refreshes external demand and evidence packets using ScrapingDog/DataForSEO under the weekly credit cap.",
    rule: { kind: "weekly", isoWeekday: 7 },
  },
  {
    id: "portfolio",
    label: "Portfolio selection",
    cadence: "Monday at 7:00 AM Eastern",
    time: "07:00",
    owner: "CONTENT - Weekly Portfolio Selection",
    purpose:
      "Chooses one-cohort/one-problem opportunities for articles and independent company-social posts.",
    rule: { kind: "weekly", isoWeekday: 1 },
  },
  {
    id: "learning",
    label: "Strategy learning",
    cadence: "First Monday monthly",
    time: "07:20",
    owner: "CONTENT - Monthly Learning",
    purpose:
      "Adjusts strategy only after minimum evidence thresholds are met; otherwise records no-op learning.",
    rule: { kind: "first-monday" },
  },
  {
    id: "linkedin",
    label: "LinkedIn Page",
    cadence: "Tuesday at 9:00 AM Eastern",
    time: "09:00",
    owner: "CONTENT - Publish LinkedIn Page",
    purpose:
      "Publishes an opportunity-driven company post through Mixpost after social novelty and evidence checks.",
    rule: { kind: "weekly", isoWeekday: 2 },
  },
  {
    id: "article",
    label: "Article publication",
    cadence: "First and third Wednesday at 8:30 AM Eastern",
    time: "08:30",
    owner: "CONTENT - Article Schedule",
    purpose:
      "Builds a v3 evidence-bound brief, drafts, QA-checks, opens a website PR, and waits for Vercel release verification.",
    rule: { kind: "article-wednesday" },
  },
  {
    id: "facebook",
    label: "Facebook Page",
    cadence: "Thursday at 11:00 AM Eastern",
    time: "11:00",
    owner: "CONTENT - Publish Facebook Page",
    purpose:
      "Publishes a channel-native company post through Mixpost only after provider-verifiable success conditions are available.",
    rule: { kind: "weekly", isoWeekday: 4 },
  },
  {
    id: "instagram",
    label: "Instagram",
    cadence: "Saturday at 9:00 AM Eastern",
    time: "09:00",
    owner: "CONTENT - Publish Instagram",
    purpose:
      "Creates a sourced Instagram asset, renders through HyperFrames, submits through Mixpost, and verifies the provider post ID.",
    rule: { kind: "weekly", isoWeekday: 6 },
  },
];

function compactError(error: unknown) {
  return error instanceof Error ? error.message.slice(0, 240) : "Unknown error.";
}

function parseTime(value: string) {
  const [hour = "0", minute = "0"] = value.split(":");
  return Number(hour) * 60 + Number(minute);
}

function easternParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts: Record<string, string> = {};
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== "literal") parts[part.type] = part.value;
  }
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  };
}

function isoWeekday(year: number, month: number, day: number) {
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return weekday === 0 ? 7 : weekday;
}

function candidateMatches(
  definition: ScheduleDefinition,
  candidate: { year: number; month: number; day: number; isoWeekday: number },
) {
  if (definition.rule.kind === "daily") return true;
  if (definition.rule.kind === "weekly") {
    return candidate.isoWeekday === definition.rule.isoWeekday;
  }
  if (definition.rule.kind === "first-monday") {
    return candidate.isoWeekday === 1 && candidate.day <= 7;
  }
  return (
    candidate.isoWeekday === 3 &&
    ((candidate.day >= 1 && candidate.day <= 7) ||
      (candidate.day >= 15 && candidate.day <= 21))
  );
}

function formatEasternRunLabel(
  candidate: { year: number; month: number; day: number },
  time: string,
) {
  const [hourText = "0", minuteText = "0"] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const labelDate = new Date(
    Date.UTC(candidate.year, candidate.month - 1, candidate.day, 12),
  );
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(labelDate);
  const timeLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(Date.UTC(2026, 0, 1, hour, minute)));

  return `${dateLabel} at ${timeLabel} ET`;
}

function nextRunFor(definition: ScheduleDefinition, now = new Date()) {
  const nowEastern = easternParts(now);
  const nowMinutes = nowEastern.hour * 60 + nowEastern.minute;
  const start = Date.UTC(
    nowEastern.year,
    nowEastern.month - 1,
    nowEastern.day,
    12,
  );

  for (let offset = 0; offset < 370; offset += 1) {
    const candidateDate = new Date(start + offset * DAY_MS);
    const candidate = {
      year: candidateDate.getUTCFullYear(),
      month: candidateDate.getUTCMonth() + 1,
      day: candidateDate.getUTCDate(),
      isoWeekday: isoWeekday(
        candidateDate.getUTCFullYear(),
        candidateDate.getUTCMonth() + 1,
        candidateDate.getUTCDate(),
      ),
    };

    if (!candidateMatches(definition, candidate)) continue;
    if (offset === 0 && nowMinutes >= parseTime(definition.time)) continue;

    return formatEasternRunLabel(candidate, definition.time);
  }

  return definition.cadence;
}

function normalizeSetting(value: unknown) {
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return JSON.stringify(value);
}

function statusFromPublicCheck(ok: boolean, containsExpected: boolean) {
  if (!ok) return "error" satisfies StatusLevel;
  if (!containsExpected) return "warning" satisfies StatusLevel;
  return "ok" satisfies StatusLevel;
}

async function publicCheck(
  origin: string,
  id: string,
  label: string,
  path: string,
  expectedText?: string,
) {
  const url = new URL(path, origin);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/html,application/json,application/xml,text/xml,*/*",
      },
      cache: "no-store",
    });
    const text = expectedText ? await response.text() : "";
    const containsExpected = expectedText ? text.includes(expectedText) : true;

    return {
      id,
      label,
      status: statusFromPublicCheck(response.ok, containsExpected),
      detail: expectedText
        ? `${response.status} ${response.statusText}; expected marker ${
            containsExpected ? "found" : "missing"
          }`
        : `${response.status} ${response.statusText}`,
      target: path,
      checkedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      id,
      label,
      status: "error" satisfies StatusLevel,
      detail: compactError(error),
      target: path,
      checkedAt: new Date().toISOString(),
    };
  }
}

async function loadPublicSurface(origin: string) {
  const latestPost = getAllBlogPosts()[0] || null;
  const slug = latestPost?.slug || "";
  const checks = [
    publicCheck(origin, "portal-login", "Portal login route", "/login"),
    publicCheck(origin, "blog-index", "Blog index", "/blog"),
  ];

  if (slug) {
    checks.push(
      publicCheck(
        origin,
        "latest-article",
        "Latest article",
        `/blog/${slug}`,
        slug,
      ),
      publicCheck(origin, "rss", "RSS feed", "/rss.xml", slug),
      publicCheck(origin, "atom", "Atom feed", "/atom.xml", slug),
      publicCheck(origin, "json-feed", "JSON feed", "/feed.json", slug),
      publicCheck(origin, "sitemap", "Sitemap", "/sitemap.xml", slug),
      publicCheck(
        origin,
        "open-graph",
        "Latest Open Graph image",
        `/blog/${slug}/opengraph-image.png`,
      ),
    );
  }

  return {
    latestPost: latestPost
      ? {
          slug: latestPost.slug,
          title: latestPost.title || latestPost.slug,
          date: latestPost.date ? String(latestPost.date) : null,
          contentId: latestPost.contentId || null,
          qaScore: latestPost.qaScore ?? null,
          researchPacketId: latestPost.researchPacketId || null,
        }
      : null,
    checks: await Promise.all(checks),
  };
}

async function loadMarketingTelemetry() {
  try {
    const [
      settingsResult,
      summaryResult,
      researchResult,
      latestAssetsResult,
      distributionResult,
      lifecycleResult,
    ] = await Promise.all([
      query(`
        SELECT key, value, updated_at::text
        FROM marketing.settings
        WHERE key IN (
          'publishing_enabled',
          'mautic_publish_enabled',
          'scrapingdog_weekly_credit_cap',
          'mautic_sync_enabled',
          'mautic_enrollment_enabled',
          'outreach_enabled',
          'paid_media_enabled'
        )
        ORDER BY key
      `),
      query(`
        SELECT
          COUNT(*) FILTER (
            WHERE asset_type = 'blog'
              AND status = 'published'
              AND published_at >= now() - interval '30 days'
          )::int AS articles_published_30d,
          COUNT(*) FILTER (
            WHERE asset_type IN ('linkedin', 'facebook', 'instagram')
              AND status = 'published'
              AND published_at >= now() - interval '30 days'
          )::int AS social_published_30d,
          COUNT(*) FILTER (
            WHERE status = 'quarantined'
              AND updated_at >= now() - interval '14 days'
          )::int AS quarantined_14d,
          COUNT(*) FILTER (
            WHERE status IN ('drafting', 'qa', 'scheduled', 'publishing')
          )::int AS active_assets,
          MAX(published_at)::text AS last_published_at
        FROM marketing.content_assets
      `),
      query(`
        SELECT
          COUNT(*) FILTER (
            WHERE status = 'ready'
              AND valid_until > now()
              AND metadata->>'research_contract_version' = 'senna-research-contract/v3'
          )::int AS current_ready_v3,
          COUNT(*) FILTER (WHERE status = 'collecting')::int AS collecting,
          COUNT(*) FILTER (
            WHERE status = 'quarantined'
              AND updated_at >= now() - interval '14 days'
          )::int AS quarantined_14d,
          MAX(retrieved_at)::text AS last_retrieved_at
        FROM marketing.research_packets
      `),
      query(`
        SELECT
          content_id,
          title,
          slug,
          asset_type,
          channel,
          status,
          qa_score::float,
          qa_passed,
          public_url,
          published_at::text,
          updated_at::text,
          quarantine_reason
        FROM marketing.content_assets
        ORDER BY updated_at DESC
        LIMIT 10
      `),
      query(`
        SELECT channel, status, COUNT(*)::int AS count
        FROM marketing.distribution_jobs
        WHERE created_at >= now() - interval '30 days'
        GROUP BY channel, status
        ORDER BY channel, status
      `),
      query(`
        SELECT
          entity_type,
          from_state,
          to_state,
          reason,
          actor,
          occurred_at::text
        FROM marketing.lifecycle_events
        ORDER BY occurred_at DESC
        LIMIT 12
      `),
    ]);

    return {
      available: true,
      settings: settingsResult.rows.map((row) => ({
        key: String(row.key),
        value: normalizeSetting(row.value),
        updatedAt: row.updated_at ? String(row.updated_at) : null,
      })),
      summary: summaryResult.rows[0] || null,
      research: researchResult.rows[0] || null,
      latestAssets: latestAssetsResult.rows,
      distribution: distributionResult.rows,
      lifecycle: lifecycleResult.rows,
      message: null,
    };
  } catch (error) {
    return {
      available: false,
      settings: [],
      summary: null,
      research: null,
      latestAssets: [],
      distribution: [],
      lifecycle: [],
      message: compactError(error),
    };
  }
}

function buildSchedule() {
  return scheduleDefinitions.map((definition) => ({
    id: definition.id,
    label: definition.label,
    cadence: definition.cadence,
    nextRun: nextRunFor(definition),
    owner: definition.owner,
    purpose: definition.purpose,
  }));
}

export async function GET(request: Request) {
  try {
    const session = await getPortalSession(request.headers);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const access = await getPortalAccessByEmail(
      session.user.email,
      session.user.id,
    );
    if (!hasActivePortalAccess(access) || access.role !== "admin") {
      return NextResponse.json(
        { error: "Administrator access is required." },
        { status: 403 },
      );
    }

    const origin = new URL(request.url).origin;
    const [publicSurface, telemetry] = await Promise.all([
      loadPublicSurface(origin),
      loadMarketingTelemetry(),
    ]);

    return NextResponse.json(
      {
        generatedAt: new Date().toISOString(),
        rollout: {
          id: CURRENT_CONTENT_ROLLOUT_ID,
          source: "infra rollout manifest",
          articleContract: "senna-article-contract/v3",
          researchContract: "senna-research-contract/v3",
        },
        schedule: buildSchedule(),
        publicSurface,
        telemetry,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[Content system portal] Failed to load dashboard", error);
    return NextResponse.json(
      { error: "Content system status is not available right now." },
      { status: 503 },
    );
  }
}
