"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type StatusLevel = "ok" | "warning" | "error" | "unknown";

interface ScheduleItem {
  id: string;
  label: string;
  cadence: string;
  nextRun: string;
  owner: string;
  purpose: string;
}

interface StatusCheck {
  id: string;
  label: string;
  status: StatusLevel;
  detail: string;
  target: string;
  checkedAt: string;
}

interface SettingRow {
  key: string;
  value: string;
  updatedAt: string | null;
}

interface AssetRow {
  content_id: string;
  title: string;
  slug: string;
  asset_type: string;
  channel: string;
  status: string;
  qa_score: number | null;
  qa_passed: boolean;
  public_url: string;
  published_at: string | null;
  updated_at: string | null;
  quarantine_reason: string;
}

interface LifecycleRow {
  entity_type: string;
  from_state: string;
  to_state: string;
  reason: string;
  actor: string;
  occurred_at: string;
}

interface ContentSystemPayload {
  generatedAt: string;
  rollout: {
    id: string;
    source: string;
    articleContract: string;
    researchContract: string;
  };
  schedule: ScheduleItem[];
  publicSurface: {
    latestPost: {
      slug: string;
      title: string;
      date: string | null;
      contentId: string | null;
      qaScore: number | null;
      researchPacketId: string | null;
    } | null;
    checks: StatusCheck[];
  };
  telemetry: {
    available: boolean;
    message: string | null;
    settings: SettingRow[];
    summary: {
      articles_published_30d?: number;
      social_published_30d?: number;
      quarantined_14d?: number;
      active_assets?: number;
      last_published_at?: string | null;
    } | null;
    research: {
      current_ready_v3?: number;
      collecting?: number;
      quarantined_14d?: number;
      last_retrieved_at?: string | null;
    } | null;
    latestAssets: AssetRow[];
    distribution: Array<{
      channel: string;
      status: string;
      count: number;
    }>;
    lifecycle: LifecycleRow[];
  };
}

const systemStages = [
  {
    label: "Select",
    detail:
      "Build aggregate ICP snapshots, suppress small cohorts, research external demand, and pick one-cohort opportunities.",
  },
  {
    label: "Publish",
    detail:
      "Create a v3 evidence-bound brief, draft an article, run deterministic QA, open a website PR, and verify Vercel.",
  },
  {
    label: "Distribute",
    detail:
      "Create independent LinkedIn, Facebook, and Instagram assets, submit through Mixpost or HyperFrames, then verify provider IDs.",
  },
  {
    label: "Learn",
    detail:
      "Collect filtered sessions, CTA, booking, revenue, and provider outcomes before the monthly strategy pass changes weights.",
  },
];

const statusMeta: Record<
  StatusLevel,
  {
    label: string;
    color: "success" | "warning" | "error" | "default";
    icon: typeof CheckCircleOutlineIcon;
  }
> = {
  ok: { label: "OK", color: "success", icon: CheckCircleOutlineIcon },
  warning: { label: "Review", color: "warning", icon: WarningAmberIcon },
  error: { label: "Failing", color: "error", icon: ErrorOutlineIcon },
  unknown: { label: "Unknown", color: "default", icon: WarningAmberIcon },
};

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatDate(value?: string | null) {
  if (!value) return "Not recorded";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function settingValue(settings: SettingRow[], key: string) {
  return settings.find((setting) => setting.key === key)?.value ?? null;
}

function metricValue(value: unknown) {
  const numeric = Number(value ?? 0);
  return numberFormatter.format(Number.isFinite(numeric) ? numeric : 0);
}

function StatusChip({ status }: { status: StatusLevel }) {
  const meta = statusMeta[status] || statusMeta.unknown;
  const Icon = meta.icon;

  return (
    <Chip
      icon={<Icon />}
      label={meta.label}
      color={meta.color === "default" ? undefined : meta.color}
      size="small"
      variant={meta.color === "default" ? "outlined" : "filled"}
      sx={{ fontWeight: 700 }}
    />
  );
}

function Metric({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <Box sx={{ py: 2.25 }}>
      <Typography
        variant="overline"
        sx={{ color: "text.secondary", letterSpacing: "0.1em" }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          mt: 0.5,
          fontFamily: "var(--font-mono)",
          fontSize: { xs: "1.65rem", md: "2.1rem" },
          lineHeight: 1,
          fontWeight: 800,
          letterSpacing: 0,
        }}
      >
        {value}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {helper}
      </Typography>
    </Box>
  );
}

function LoadingState() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        border: "1px solid var(--color-border-soft)",
        borderRadius: "8px",
      }}
    >
      <Stack spacing={2.5}>
        <Skeleton width="24%" height={28} />
        <Skeleton width="58%" height={46} />
        <Skeleton width="82%" height={28} />
        <Grid container spacing={3}>
          {Array.from({ length: 4 }, (_, index) => (
            <Grid key={index} size={{ xs: 6, md: 3 }}>
              <Skeleton height={96} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Paper>
  );
}

export function ContentSystemDashboard() {
  const [data, setData] = useState<ContentSystemPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/portal/content-system", {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const payload = (await response.json().catch(() => null)) as
        | (ContentSystemPayload & { error?: string })
        | null;

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to load content system status.");
      }

      if (!payload) throw new Error("Content system status returned no payload.");
      setData(payload);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load content system status.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const settings = data?.telemetry.settings ?? [];
  const publishingEnabled = settingValue(settings, "publishing_enabled");
  const mauticEnabled = settingValue(settings, "mautic_publish_enabled");
  const scrapingDogCap = settingValue(settings, "scrapingdog_weekly_credit_cap");
  const statusCounts = useMemo(() => {
    const checks = data?.publicSurface.checks ?? [];
    return {
      ok: checks.filter((check) => check.status === "ok").length,
      issues: checks.filter((check) => check.status !== "ok").length,
    };
  }, [data?.publicSurface.checks]);

  if (loading && !data) return <LoadingState />;

  if (error && !data) {
    return (
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
    );
  }

  if (!data) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        border: "1px solid var(--color-border-soft)",
        borderRadius: "8px",
        bgcolor: "rgba(255,255,255,0.98)",
        boxShadow: "0 18px 60px rgba(24, 25, 37, 0.06)",
      }}
    >
      <Stack spacing={4.5}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: { md: "flex-start" } }}
        >
          <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: "wrap" }}>
              <Chip
                icon={<StorageOutlinedIcon />}
                label="Content operations"
                sx={{
                  bgcolor: "rgba(143, 0, 107, 0.08)",
                  color: "var(--color-accent)",
                  fontWeight: 700,
                }}
              />
              <Chip
                label={
                  data.telemetry.available
                    ? "Telemetry connected"
                    : "Telemetry degraded"
                }
                color={data.telemetry.available ? "success" : "warning"}
                variant="outlined"
              />
            </Stack>
            <Typography component="h1" variant="h3" sx={{ mb: 1 }}>
              Autonomous content system
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 840 }}>
              A control-room view of what the system does, when each workflow runs,
              and whether the public publishing surface is healthy.
            </Typography>
          </Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
            <Button
              onClick={() => void load()}
              startIcon={<RefreshIcon />}
              disabled={loading}
              variant="outlined"
              sx={{ borderRadius: "999px" }}
            >
              Refresh
            </Button>
            {data.publicSurface.latestPost?.slug ? (
              <Button
                href={`/blog/${data.publicSurface.latestPost.slug}`}
                target="_blank"
                rel="noreferrer"
                endIcon={<OpenInNewIcon />}
                variant="contained"
                sx={{ borderRadius: "999px" }}
              >
                Latest article
              </Button>
            ) : null}
          </Stack>
        </Stack>

        {error ? <Alert severity="warning">{error}</Alert> : null}
        {!data.telemetry.available ? (
          <Alert severity="warning">
            Live marketing telemetry is unavailable from this website runtime:
            {data.telemetry.message || "No database response was returned."}
          </Alert>
        ) : null}

        <Box
          sx={{
            borderTop: "1px solid",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Grid container columnSpacing={4}>
            <Grid size={{ xs: 6, md: 3 }}>
              <Metric
                label="Publishing gate"
                value={publishingEnabled === "true" ? "Open" : "Closed"}
                helper="Website and company-social master gate"
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Metric
                label="Mautic gate"
                value={mauticEnabled === "true" ? "Open" : "Closed"}
                helper="Draft-only unless explicitly opened"
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Metric
                label="Ready research"
                value={metricValue(data.telemetry.research?.current_ready_v3)}
                helper="Current ready v3 packets"
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Metric
                label="Public checks"
                value={`${statusCounts.ok}/${data.publicSurface.checks.length}`}
                helper={
                  statusCounts.issues
                    ? `${statusCounts.issues} check needs review`
                    : "Article, feeds, sitemap, OG"
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2.25}>
              <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                <ArticleOutlinedIcon sx={{ color: "var(--color-accent)" }} />
                <Typography component="h2" variant="h5">
                  Latest published surface
                </Typography>
              </Stack>
              {data.publicSurface.latestPost ? (
                <Stack spacing={1.5}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>
                    {data.publicSurface.latestPost.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    Published source date:{" "}
                    {formatDate(data.publicSurface.latestPost.date)}
                  </Typography>
                  <Stack spacing={0.75}>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", letterSpacing: "0.08em" }}
                    >
                      Content ID
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.86rem",
                        wordBreak: "break-word",
                      }}
                    >
                      {data.publicSurface.latestPost.contentId || "Not recorded"}
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "text.secondary" }}>
                    QA score:{" "}
                    {data.publicSurface.latestPost.qaScore ?? "Not recorded"}
                  </Typography>
                </Stack>
              ) : (
                <Box sx={{ py: 3, borderTop: "1px solid", borderColor: "divider" }}>
                  <Typography sx={{ color: "text.secondary" }}>
                    No blog content was found in the website content collection.
                  </Typography>
                </Box>
              )}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2.25}>
              <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                <StorageOutlinedIcon sx={{ color: "var(--color-accent)" }} />
                <Typography component="h2" variant="h5">
                  System map
                </Typography>
              </Stack>
              <Stack divider={<Divider flexItem />}>
                {systemStages.map((stage) => (
                  <Grid
                    key={stage.label}
                    container
                    spacing={2}
                    sx={{ py: 1.6, alignItems: "baseline" }}
                  >
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Typography sx={{ fontWeight: 800 }}>{stage.label}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 9 }}>
                      <Typography sx={{ color: "text.secondary" }}>
                        {stage.detail}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ justifyContent: "space-between", mb: 2 }}
          >
            <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
              <ScheduleIcon sx={{ color: "var(--color-accent)" }} />
              <Typography component="h2" variant="h5">
                Cadence
              </Typography>
            </Stack>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontFamily: "var(--font-mono)" }}
            >
              Refreshed {formatDate(data.generatedAt)}
            </Typography>
          </Stack>
          <Stack divider={<Divider flexItem />}>
            {data.schedule.map((item) => (
              <Grid
                key={item.id}
                container
                spacing={2}
                sx={{ py: 2, alignItems: "baseline" }}
              >
                <Grid size={{ xs: 12, md: 3 }}>
                  <Typography sx={{ fontWeight: 800 }}>{item.label}</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {item.owner}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Typography sx={{ fontFamily: "var(--font-mono)" }}>
                    {item.nextRun}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {item.cadence}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={{ color: "text.secondary" }}>
                    {item.purpose}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
              Public status checks
            </Typography>
            <Stack divider={<Divider flexItem />}>
              {data.publicSurface.checks.map((check) => (
                <Grid
                  key={check.id}
                  container
                  spacing={1.5}
                  sx={{ py: 1.75, alignItems: "center" }}
                >
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                      <StatusChip status={check.status} />
                      <Typography sx={{ fontWeight: 700 }}>{check.label}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <Typography sx={{ color: "text.secondary" }}>
                      {check.detail}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontFamily: "var(--font-mono)" }}
                    >
                      {check.target}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
              Operating gates
            </Typography>
            <Stack divider={<Divider flexItem />}>
              {[
                ["Website/company publishing", publishingEnabled],
                ["Mautic publication", mauticEnabled],
                ["ScrapingDog weekly cap", scrapingDogCap],
                ["Article contract", data.rollout.articleContract],
                ["Research contract", data.rollout.researchContract],
              ].map(([label, value]) => (
                <Stack
                  key={label}
                  direction="row"
                  sx={{
                    py: 1.75,
                    justifyContent: "space-between",
                    gap: 2,
                    alignItems: "baseline",
                  }}
                >
                  <Typography sx={{ color: "text.secondary" }}>{label}</Typography>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 800,
                      textAlign: "right",
                      wordBreak: "break-word",
                    }}
                  >
                    {value || "Not available"}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box>
          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            Recent content assets
          </Typography>
          {data.telemetry.latestAssets.length === 0 ? (
            <Box sx={{ py: 3, borderTop: "1px solid", borderColor: "divider" }}>
              <Typography sx={{ color: "text.secondary" }}>
                No recent asset telemetry is available from the marketing tables.
              </Typography>
            </Box>
          ) : (
            <Stack divider={<Divider flexItem />}>
              {data.telemetry.latestAssets.slice(0, 6).map((asset) => (
                <Grid
                  key={asset.content_id}
                  container
                  spacing={2}
                  sx={{ py: 1.9, alignItems: "baseline" }}
                >
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography sx={{ fontWeight: 800 }}>
                      {asset.title || asset.content_id}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {asset.channel} / {asset.asset_type}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, md: 2 }}>
                    <Chip label={asset.status} size="small" variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 6, md: 2 }}>
                    <Typography sx={{ fontFamily: "var(--font-mono)" }}>
                      QA {asset.qa_score ?? "n/a"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Updated {formatDate(asset.updated_at)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 2 }}>
                    {asset.public_url ? (
                      <Link
                        href={asset.public_url}
                        target="_blank"
                        rel="noreferrer"
                        sx={{
                          display: "inline-flex",
                          gap: 0.5,
                          alignItems: "center",
                          fontWeight: 700,
                        }}
                      >
                        Open <OpenInNewIcon fontSize="inherit" />
                      </Link>
                    ) : (
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        No public URL
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              ))}
            </Stack>
          )}
        </Box>

        <Box>
          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            Recent lifecycle events
          </Typography>
          {data.telemetry.lifecycle.length === 0 ? (
            <Box sx={{ py: 3, borderTop: "1px solid", borderColor: "divider" }}>
              <Typography sx={{ color: "text.secondary" }}>
                No lifecycle events are available from the marketing tables.
              </Typography>
            </Box>
          ) : (
            <Stack divider={<Divider flexItem />}>
              {data.telemetry.lifecycle.map((event, index) => (
                <Grid
                  key={`${event.entity_type}-${event.occurred_at}-${index}`}
                  container
                  spacing={2}
                  sx={{ py: 1.7, alignItems: "baseline" }}
                >
                  <Grid size={{ xs: 12, md: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontFamily: "var(--font-mono)" }}
                    >
                      {formatDate(event.occurred_at)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography sx={{ fontWeight: 800 }}>{event.entity_type}</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {event.actor}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 2 }}>
                    <Typography sx={{ fontFamily: "var(--font-mono)" }}>
                      {event.from_state || "start"} to {event.to_state}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Typography sx={{ color: "text.secondary" }}>
                      {event.reason || "No reason recorded."}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          )}
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontFamily: "var(--font-mono)",
            wordBreak: "break-word",
          }}
        >
          Rollout {data.rollout.id}
        </Typography>
      </Stack>
    </Paper>
  );
}
