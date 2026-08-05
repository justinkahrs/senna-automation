"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import {
  isAnalyticsExcluded,
  setAnalyticsExcluded,
} from "@/utils/consent";

type DashboardPayload = {
  summary: Record<string, number | null>;
  funnel: Record<string, number>;
  daily: Array<Record<string, number | string>>;
  changes: Array<{
    id: string;
    action_type: string;
    entity_type: string;
    reason: string;
    status: string;
    created_at: string;
  }>;
  exclusions: Array<{
    id: string;
    search_term: string | null;
    reason: string;
    status: string;
    created_at: string;
  }>;
  health: {
    automation_enabled: boolean;
    emergency_paused: boolean;
    pause_reason: string | null;
    monthly_budget_ceiling: number;
    average_daily_budget: number;
    last_health_check_at: string | null;
    last_performance_sync_at: string | null;
    last_conversion_upload_at: string | null;
  } | null;
  generatedAt: string;
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

function Metric({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <Box sx={{ py: 2.5 }}>
      <Typography
        variant="overline"
        sx={{ color: "text.secondary", letterSpacing: "0.11em" }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          mt: 0.5,
          fontFamily: "var(--font-mono)",
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          lineHeight: 1,
          fontWeight: 700,
        }}
      >
        {value}
      </Typography>
      {helper && (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {helper}
        </Typography>
      )}
    </Box>
  );
}

export default function AdsDashboard() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analyticsExcluded, setAnalyticsExcludedState] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/portal/ads", {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const payload = (await response.json()) as DashboardPayload & {
        error?: string;
      };
      if (!response.ok) throw new Error(payload.error || "Unable to load ads data.");
      setData(payload);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Unable to load ads data.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAnalyticsExcludedState(isAnalyticsExcluded());
    void load();
  }, []);

  if (loading && !data) {
    return (
      <Container maxWidth="lg" sx={{ pt: { xs: 14, md: 20 }, pb: 10 }}>
        <Stack spacing={2}>
          <Skeleton width="38%" height={52} />
          <Skeleton width="64%" height={28} />
          <Grid container spacing={3}>
            {Array.from({ length: 8 }, (_, index) => (
              <Grid key={index} size={{ xs: 6, md: 3 }}>
                <Skeleton height={110} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    );
  }

  if (error && !data) {
    return (
      <Container maxWidth="md" sx={{ pt: { xs: 14, md: 20 }, pb: 10 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => void load()}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  if (!data) return null;

  const summary = data.summary;
  const health = data.health;
  const spend = Number(summary.spend || 0);
  const budgetCeiling = Number(health?.monthly_budget_ceiling || 1000);
  const pacing = budgetCeiling > 0 ? spend / budgetCeiling : 0;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100dvh" }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 14, md: 19 }, pb: 12 }}>
        <Stack spacing={6}>
          <Grid container spacing={3} sx={{ alignItems: "end" }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="overline" sx={{ color: "primary.main" }}>
                Senna internal
              </Typography>
              <Typography component="h1" variant="h2">
                Google Ads control room
              </Typography>
              <Typography sx={{ color: "text.secondary", mt: 1, maxWidth: 700 }}>
                Spend, attributed funnel outcomes, autonomous changes, and
                emergency-control state for the Grand Rapids workflow audit pilot.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ justifyContent: { md: "flex-end" }, alignItems: "center" }}
              >
                <Chip
                  icon={
                    health?.emergency_paused ? (
                      <PauseCircleOutlineIcon />
                    ) : (
                      <CheckCircleOutlineIcon />
                    )
                  }
                  label={
                    health?.emergency_paused
                      ? "Emergency paused"
                      : health?.automation_enabled
                        ? "Automation enabled"
                        : "Observation mode"
                  }
                  color={health?.emergency_paused ? "error" : "default"}
                  variant="outlined"
                />
                <Button
                  onClick={() => void load()}
                  startIcon={<RefreshIcon />}
                  disabled={loading}
                >
                  Refresh
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setAnalyticsExcluded(!analyticsExcluded)}
                >
                  {analyticsExcluded
                    ? "Include this browser"
                    : "Exclude this browser"}
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {health?.emergency_paused && (
            <Alert severity="error">
              {health.pause_reason || "Campaigns are paused by the emergency control."}
            </Alert>
          )}

          <Box>
            <Grid
              container
              columnSpacing={4}
              sx={{
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Grid size={{ xs: 6, md: 3 }}>
                <Metric label="30-day spend" value={money.format(spend)} />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Metric
                  label="Clicks"
                  value={integer.format(Number(summary.clicks || 0))}
                  helper={`${money.format(Number(summary.cpc || 0))} average CPC`}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Metric
                  label="Qualified CPA"
                  value={
                    summary.qualified_cpa == null
                      ? "—"
                      : money.format(Number(summary.qualified_cpa))
                  }
                  helper="$100 target"
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Metric
                  label="Paid ROAS"
                  value={
                    summary.roas == null
                      ? "—"
                      : `${Number(summary.roas).toFixed(2)}×`
                  }
                  helper="3.00× target"
                />
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={{ xs: 5, md: 8 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography component="h2" variant="h4" sx={{ mb: 2.5 }}>
                30-day funnel
              </Typography>
              <Stack divider={<Divider flexItem />}>
                {[
                  ["Raw leads", data.funnel.raw_leads || 0],
                  ["Consultations booked", data.funnel.bookings || 0],
                  ["Qualified leads", data.funnel.qualified_leads || 0],
                  ["Paid customers", data.funnel.paid_customers || 0],
                  [
                    "Collected revenue",
                    money.format(Number(data.funnel.collected_revenue || 0)),
                  ],
                ].map(([label, value]) => (
                  <Stack
                    key={String(label)}
                    direction="row"
                    sx={{
                      py: 2,
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography sx={{ color: "text.secondary" }}>{label}</Typography>
                    <Typography
                      sx={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
                    >
                      {value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography component="h2" variant="h4" sx={{ mb: 2.5 }}>
                Budget pacing
              </Typography>
              <Box
                sx={{
                  height: 12,
                  bgcolor: "var(--color-border-soft)",
                  overflow: "hidden",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                <Box
                  sx={{
                    width: `${Math.min(100, Math.max(0, pacing * 100))}%`,
                    height: "100%",
                    bgcolor: pacing > 1 ? "error.main" : "primary.main",
                  }}
                />
              </Box>
              <Typography sx={{ mt: 2, color: "text.secondary" }}>
                {money.format(spend)} of {money.format(budgetCeiling)} monthly
                ceiling. Average daily budget is{" "}
                {money.format(Number(health?.average_daily_budget || 32.9))}.
              </Typography>
              <Stack spacing={0.75} sx={{ mt: 4 }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Last performance sync
                </Typography>
                <Typography sx={{ fontFamily: "var(--font-mono)" }}>
                  {health?.last_performance_sync_at || "Not yet"}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", mt: 1 }}>
                  Last conversion upload
                </Typography>
                <Typography sx={{ fontFamily: "var(--font-mono)" }}>
                  {health?.last_conversion_upload_at || "Not yet"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Box>
            <Typography component="h2" variant="h4" sx={{ mb: 2.5 }}>
              Search-term exclusions
            </Typography>
            {data.exclusions.length === 0 ? (
              <Box sx={{ py: 5, borderTop: "1px solid", borderColor: "divider" }}>
                <Typography sx={{ color: "text.secondary" }}>
                  No exact search-term exclusions have been proposed or applied.
                </Typography>
              </Box>
            ) : (
              <Stack divider={<Divider flexItem />}>
                {data.exclusions.map((exclusion) => (
                  <Grid
                    container
                    spacing={2}
                    key={exclusion.id}
                    sx={{ py: 2.25, alignItems: "baseline" }}
                  >
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Typography sx={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                        {exclusion.search_term || "Unknown term"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography sx={{ color: "text.secondary" }}>
                        {exclusion.reason}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, md: 1 }}>
                      <Chip label={exclusion.status} size="small" variant="outlined" />
                    </Grid>
                    <Grid size={{ xs: 6, md: 2 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", fontFamily: "var(--font-mono)" }}
                      >
                        {new Date(exclusion.created_at).toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            )}
          </Box>

          <Box>
            <Typography component="h2" variant="h4" sx={{ mb: 2.5 }}>
              Recent autonomous decisions
            </Typography>
            {data.changes.length === 0 ? (
              <Box sx={{ py: 5, borderTop: "1px solid", borderColor: "divider" }}>
                <Typography sx={{ color: "text.secondary" }}>
                  No autonomous changes have been applied. The pilot remains in
                  observation mode until the production enable switch is set.
                </Typography>
              </Box>
            ) : (
              <Stack divider={<Divider flexItem />}>
                {data.changes.map((change) => (
                  <Grid
                    container
                    spacing={2}
                    key={change.id}
                    sx={{ py: 2.25, alignItems: "baseline" }}
                  >
                    <Grid size={{ xs: 12, md: 2 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", fontFamily: "var(--font-mono)" }}
                      >
                        {new Date(change.created_at).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Typography sx={{ fontWeight: 700 }}>
                        {change.action_type}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {change.entity_type}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }}>
                      <Typography sx={{ color: "text.secondary" }}>
                        {change.reason}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                      <Chip label={change.status} size="small" variant="outlined" />
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
