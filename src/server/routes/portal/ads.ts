import { NextResponse } from "@/compat/next/server";
import { query } from "@/utils/db";
import {
  getPortalAccessByEmail,
  hasActivePortalAccess,
} from "@/lib/portal-access";
import { getPortalSession } from "@/lib/portal-session";

export const runtime = "nodejs";

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

    const [
      summaryResult,
      dailyResult,
      funnelResult,
      changesResult,
      exclusionsResult,
      healthResult,
    ] = await Promise.all([
        query(`
          SELECT
            COALESCE(SUM(spend), 0)::float AS spend,
            COALESCE(SUM(clicks), 0)::int AS clicks,
            CASE WHEN SUM(clicks) > 0 THEN (SUM(spend) / SUM(clicks))::float ELSE 0 END AS cpc,
            COALESCE(SUM(impressions), 0)::int AS impressions,
            COALESCE(SUM(raw_leads), 0)::int AS raw_leads,
            COALESCE(SUM(bookings), 0)::int AS bookings,
            COALESCE(SUM(qualified_leads), 0)::int AS qualified_leads,
            COALESCE(SUM(paid_customers), 0)::int AS paid_customers,
            COALESCE(SUM(collected_revenue), 0)::float AS collected_revenue,
            CASE WHEN SUM(qualified_leads) > 0
              THEN (SUM(spend) / SUM(qualified_leads))::float ELSE NULL END AS qualified_cpa,
            CASE WHEN SUM(spend) > 0
              THEN (SUM(collected_revenue) / SUM(spend))::float ELSE NULL END AS roas
          FROM ads.daily_performance
          WHERE performance_date >= CURRENT_DATE - INTERVAL '30 days'
        `),
        query(`
          SELECT
            performance_date::text AS date,
            spend::float,
            clicks::int,
            raw_leads::int,
            bookings::int,
            qualified_leads::int,
            paid_customers::int,
            collected_revenue::float
          FROM ads.daily_performance
          WHERE performance_date >= CURRENT_DATE - INTERVAL '30 days'
          ORDER BY performance_date ASC
          LIMIT 31
        `),
        query(`
          WITH paid_events AS (
            SELECT
              c.id,
              c.value,
              adjustment.adjustment_type,
              adjustment.restated_value
            FROM ads.conversion_events c
            LEFT JOIN LATERAL (
              SELECT adjustment_type, restated_value
              FROM ads.conversion_adjustments
              WHERE conversion_event_id = c.id
              ORDER BY adjusted_at DESC, created_at DESC
              LIMIT 1
            ) adjustment ON true
            WHERE c.event_type = 'paid_customer'
              AND c.occurred_at >= now() - INTERVAL '30 days'
          )
          SELECT
            (SELECT COUNT(*) FROM ads.leads WHERE received_at >= now() - INTERVAL '30 days')::int AS raw_leads,
            (SELECT COUNT(*) FROM ads.bookings WHERE status = 'active' AND created_at >= now() - INTERVAL '30 days')::int AS bookings,
            (SELECT COUNT(*) FROM ads.leads WHERE qualified_at >= now() - INTERVAL '30 days')::int AS qualified_leads,
            (SELECT COUNT(*) FROM paid_events WHERE adjustment_type IS DISTINCT FROM 'retract')::int AS paid_customers,
            (
              SELECT COALESCE(SUM(
                CASE
                  WHEN adjustment_type = 'retract' THEN 0
                  WHEN adjustment_type = 'restate' THEN COALESCE(restated_value, value)
                  ELSE value
                END
              ), 0)
              FROM paid_events
            )::float AS collected_revenue
        `),
        query(`
          SELECT
            id::text,
            action_type,
            entity_type,
            entity_id,
            reason,
            status,
            evidence,
            before_state,
            after_state,
            rollback_change_id::text,
            created_at::text
          FROM ads.autonomous_change_logs
          ORDER BY created_at DESC
          LIMIT 25
        `),
        query(`
          SELECT
            id::text,
            after_state->>'text' AS search_term,
            reason,
            status,
            created_at::text
          FROM ads.autonomous_change_logs
          WHERE action_type = 'add_exact_negative'
          ORDER BY created_at DESC
          LIMIT 25
        `),
        query(`
          SELECT
            automation_enabled,
            emergency_paused,
            pause_reason,
            monthly_budget_ceiling::float,
            average_daily_budget::float,
            last_health_check_at::text,
            last_performance_sync_at::text,
            last_conversion_upload_at::text,
            updated_at::text
          FROM ads.control_state
          WHERE singleton = true
          LIMIT 1
        `),
      ]);

    const performance = summaryResult.rows[0] || {};
    const funnel = funnelResult.rows[0] || {};
    const spend = Number(performance.spend || 0);
    const qualifiedLeads = Number(funnel.qualified_leads || 0);
    const collectedRevenue = Number(funnel.collected_revenue || 0);

    return NextResponse.json(
      {
        summary: {
          ...performance,
          ...funnel,
          qualified_cpa: qualifiedLeads > 0 ? spend / qualifiedLeads : null,
          roas: spend > 0 ? collectedRevenue / spend : null,
        },
        daily: dailyResult.rows,
        funnel,
        changes: changesResult.rows,
        exclusions: exclusionsResult.rows,
        health: healthResult.rows[0] || null,
        generatedAt: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[Ads portal] Failed to load dashboard", error);
    return NextResponse.json(
      {
        error:
          "Ads reporting is not available yet. Confirm the ads schema and database connection.",
      },
      { status: 503 },
    );
  }
}
