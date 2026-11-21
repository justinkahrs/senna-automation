import { useCallback, useEffect, useState } from "react";
import { Alert, Box, Button, Chip, Container, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";

type Project = {
  id: string; name: string; mode: string; role?: string; dispatch_version?: number; paused_from?: string | null;
  queued_jobs?: number; active_writes?: number; outstanding_effects?: number;
};
type Decision = {
  id: string; project_id: string; version: number; title: string; reason: string; state: string;
  role: string; options: { action: string; label: string }[]; expires_at: string;
  slack_url: string | null; notification: string | null;
};
type Source = {
  id: string; project_id: string; provider: string; resource: string; health: string;
  last_ok: string | null; gap_from: string | null; sync_age_seconds?: number | null;
  may_reconcile?: boolean; generation?: string;
  checkpoint_state?: string; checkpoint_window?: string | null; checkpoint_page?: number | null;
};
type Run = {
  id: string; project_id: string; kind: string; state: string; created_at: string;
  completed_at: string | null; last_error: string | null; attempts: number;
  source_url: string | null; worker: string | null; lease_until: string | null;
  last_started_at?: string | null;
  recent_attempts?: { generation: number; started_at: string; finished_at: string | null; result: string | null }[];
  eta?: { earliest: string; latest: string; samples: number; calculated_at: string } | null;
};
type Event = {
  id: string; project_id: string; kind: string; observed_at: string; disposition: string | null;
  reason: string | null; projection: { status?: string; summary?: string; sourceUrl?: string };
};
type Runtime = { id: string; external_id: string | null; provider: string; external_scope: string; stage: string | null;
  state: string; last_seen: string | null; job_id: string | null; source_url: string | null };
type Cost = { project_id: string; reserved_micros: string; uncertain_micros: string; confirmed_micros: string; included_units: string };
type Release = {
  id: string; project_id: string; delivery: "verifying" | "verified" | "rollback_required" | "restored" | "verification_needs_review";
  observed_at: string; revision: string | null; change_url: string | null;
  source_status: string | null; slack_status: string | null; slack_url: string | null;
};
type Portfolio = {
  projects: Project[]; decisions: Decision[]; sources: Source[]; runs: Run[]; events: Event[];
  runtimes: Runtime[]; costs: Cost[]; mayEnroll: boolean; dispatchPaused?: boolean; releases?: Release[];
};

const endpoint = "/api/portal/factory";
const money = (micros: string) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 4 })
  .format(Number(micros) / 1_000_000);
const emptyEnrollment = { name: "", client: "", template: "observe-only", repository: "" };
const format = (value: string | null) => value ? new Date(value).toLocaleString() : "Unavailable";
const label = (value: string) => value.replaceAll("_", " ");
const safeTarget = (value?: string | null) => {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
};

const releaseLabel: Record<Release["delivery"], string> = {
  verifying: "Waiting for production verification",
  verification_needs_review: "Production verification needs review",
  verified: "Production verified",
  rollback_required: "Rollback review required",
  restored: "Rollback verified",
};

function writebackLabel(state: string) {
  if (state === "succeeded") return "Confirmed";
  if (state === "leased") return "Checking";
  if (state === "hold" || state === "failed") return "Needs review";
  if (state === "cancelled") return "Cancelled";
  return "Pending";
}

function RuntimeStatus({ run }: { run: Runtime }) {
  return <Box>
    <Typography>{label(run.provider)} · {run.external_scope} · {label(run.state)}</Typography>
    <Typography color="text.secondary" variant="body2">
      {run.stage ? `${run.stage} · ` : ""} Last observed {format(run.last_seen)}
    </Typography>
    {safeTarget(run.source_url) && <Button href={safeTarget(run.source_url)}>Open runtime</Button>}
  </Box>;
}

export default function FactoryDashboard({ enabled, initialProject, initialDecision }: {
  enabled: boolean; initialProject: string; initialDecision: string;
}) {
  const [project, setProject] = useState(initialProject);
  const [focused, setFocused] = useState(initialDecision);
  const [data, setData] = useState<Portfolio | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [reconciledSource, setReconciledSource] = useState("");
  const [enrollment, setEnrollment] = useState(emptyEnrollment);
  const [enrollmentKey, setEnrollmentKey] = useState("");
  const [preview, setPreview] = useState(false);
  const [created, setCreated] = useState("");
  const [reply, setReply] = useState<Record<string, string>>({});

  const refresh = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch(`${endpoint}${project ? `?project=${encodeURIComponent(project)}` : ""}`, { signal });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load the factory.");
      if (signal?.aborted) return;
      setData(result);
      setError("");
    } catch (failure) {
      if (!signal?.aborted) setError(failure instanceof Error ? failure.message : "Could not load the factory.");
    }
  }, [project]);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const interval = window.setInterval(() => void refresh(controller.signal), 20_000);
    void refresh(controller.signal);
    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, [enabled, refresh]);

  function filter(value: string) {
    setData(null);
    setProject(value);
    setFocused("");
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("project", value);
    else url.searchParams.delete("project");
    url.searchParams.delete("decision");
    window.history.replaceState(null, "", url);
  }

  async function respond(decision: Decision, action?: string) {
    setBusy(decision.id);
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision: decision.id, version: decision.version, action, text: reply[decision.id] }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Decision could not be saved.");
      setReply((previous) => ({ ...previous, [decision.id]: "" }));
      await refresh();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Decision could not be saved.");
    } finally {
      setBusy("");
    }
  }

  async function changeDispatch(item: Project) {
    const action = item.mode === "paused" ? "resume" : "pause";
    setBusy(item.id);
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "dispatch", project: item.id, version: item.dispatch_version, action }),
      });
      const result = await response.json();
      if (!response.ok) {
        await refresh();
        throw new Error(result.error || "Project dispatch could not be updated.");
      }
      await refresh();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Project dispatch could not be updated.");
    } finally {
      setBusy("");
    }
  }

  async function reconcileSource(source: Source) {
    setBusy(source.id);
    setReconciledSource("");
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "reconcile", source: source.id, generation: source.generation }),
      });
      const result = await response.json();
      await refresh();
      if (!response.ok) throw new Error(result.error || "Source reconciliation could not be scheduled.");
      setReconciledSource(source.id);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Source reconciliation could not be scheduled.");
    } finally {
      setBusy("");
    }
  }

  async function enroll() {
    setBusy("enrollment");
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "enroll", requestKey: enrollmentKey, ...enrollment, client: enrollment.client.trim() }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Project could not be drafted.");
      setCreated(result.project_id);
      setEnrollment(emptyEnrollment);
      setPreview(false);
      setEnrollmentKey("");
      await refresh();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Project could not be drafted.");
    } finally {
      setBusy("");
    }
  }

  const selectedProject = data?.projects.find((item) => item.id === project);
  const decisions = data?.decisions.filter((item) => focused ? item.id === focused : true) ?? [];
  const pending = data?.decisions.filter((item) => item.state === "pending").length ?? 0;
  const jobs = data?.runs ?? [];
  const jobIds = new Set(jobs.map((run) => run.id));
  const linked = new Map<string, Runtime[]>();
  const external: Runtime[] = [];
  for (const runtime of data?.runtimes ?? []) {
    if (runtime.job_id && jobIds.has(runtime.job_id)) {
      const existing = linked.get(runtime.job_id) ?? [];
      existing.push(runtime);
      linked.set(runtime.job_id, existing);
    } else {
      external.push(runtime);
    }
  }
  const runtimeRunning = (run: Runtime) => run.state === "running";
  const runtimeBlocked = (run: Runtime) => run.state === "blocked" || run.state === "failed";
  const running = jobs.filter((run) =>
    (run.state === "leased" && new Date(run.lease_until ?? "").getTime() > Date.now()) ||
    linked.get(run.id)?.some(runtimeRunning)).length + external.filter(runtimeRunning).length;
  const blocked = jobs.filter((run) => run.state === "hold" || run.state === "failed" ||
    linked.get(run.id)?.some(runtimeBlocked)).length + external.filter(runtimeBlocked).length;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 }, minWidth: 0, overflowWrap: "anywhere" }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={1}>
          <Typography component="h1" variant="h3">Factory</Typography>
          <Button href="/portal?view=legacy" sx={{ alignSelf: { xs: "start", sm: "auto" } }}>Proposal Studio</Button>
        </Stack>
        {!enabled && <Alert severity="info">Factory service is disconnected.</Alert>}
        {error && <Alert severity="warning" role="status">{error}</Alert>}
        {enabled && !data && !error && <Typography role="status">Loading project activity…</Typography>}
        {data && <>
          {data.dispatchPaused && <Alert severity="warning">Portfolio dispatch paused. Source intake continues.</Alert>}
          <TextField select size="small" label="Project" value={project} onChange={(event) => filter(event.target.value)} fullWidth>
            <MenuItem value="">All projects</MenuItem>
            {data.projects.map((item) => <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>)}
          </TextField>
          <Stack direction="row" gap={1} flexWrap="wrap" aria-label="Portfolio summary">
            <Chip label={`${pending} needs you`} color={pending ? "primary" : "default"} />
            <Chip label={`${running} running`} />
            <Chip label={`${blocked} blocked`} />
          </Stack>
          {selectedProject?.dispatch_version && (
            <Paper variant="outlined" sx={{ p: 2 }} component="section" aria-label="Project dispatch">
              <Stack spacing={1}>
                <Typography component="h2" variant="h6">Project dispatch</Typography>
                <Typography>{selectedProject.mode === "paused" ? "Paused · Source intake continues" : label(selectedProject.mode)}</Typography>
                <Typography color="text.secondary">
                  {selectedProject.queued_jobs} queued · {selectedProject.active_writes} active writes · {selectedProject.outstanding_effects} outstanding effects
                </Typography>
                {selectedProject.role === "operator" && (selectedProject.mode !== "paused" || selectedProject.paused_from) && (
                  <Button sx={{ alignSelf: "start" }} variant="outlined" onClick={() => void changeDispatch(selectedProject)}
                    disabled={Boolean(busy) || (selectedProject.mode === "paused" &&
                      Boolean(selectedProject.active_writes || selectedProject.outstanding_effects))}>
                    {selectedProject.mode === "paused" ? "Resume dispatch" : "Pause dispatch"}
                  </Button>
                )}
              </Stack>
            </Paper>
          )}
          {data.mayEnroll && <Stack spacing={1.5} component="section" aria-label="Enroll a project">
            <Typography component="h2" variant="h5">Enroll a project</Typography>
            {created && <Alert severity="success">
              Project draft saved. <Button href={`/portal/factory?project=${encodeURIComponent(created)}`}>Open project</Button>
            </Alert>}
            {!preview ? <>
              <TextField label="Project name" value={enrollment.name} size="small"
                onChange={(event) => setEnrollment((previous) => ({ ...previous, name: event.target.value }))} />
              <TextField label="Client key" value={enrollment.client} size="small"
                onChange={(event) => setEnrollment((previous) => ({ ...previous, client: event.target.value }))} />
              <TextField select label="Template" value={enrollment.template} size="small"
                onChange={(event) => setEnrollment((previous) => ({ ...previous, template: event.target.value }))}>
                <MenuItem value="observe-only">Observe only</MenuItem>
                <MenuItem value="existing-client">Adopt existing repository</MenuItem>
                <MenuItem value="senna-site">Senna site</MenuItem>
              </TextField>
              <TextField label="Repository (owner/name)" value={enrollment.repository} size="small"
                onChange={(event) => setEnrollment((previous) => ({ ...previous, repository: event.target.value }))} />
              <Button sx={{ alignSelf: "start" }} disabled={!enrollment.name.trim() || !enrollment.client.trim()} onClick={() => {
                setEnrollmentKey(window.crypto.randomUUID());
                setPreview(true);
              }}>Preview enrollment</Button>
            </> : <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6">{enrollment.name}</Typography>
              <Typography>{enrollment.client} · {label(enrollment.template)}</Typography>
              {enrollment.repository && <Typography>Repository {enrollment.repository}</Typography>}
              <Typography>Observation only. Sources, private Slack membership, and deployment permissions await setup.</Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                <Button disabled={Boolean(busy)} onClick={() => setPreview(false)}>Edit</Button>
                <Button disabled={Boolean(busy)} onClick={() => void enroll()}>Save project draft</Button>
              </Stack>
            </Paper>}
          </Stack>}
          <Stack spacing={1.5} component="section" aria-label="Decisions">
            <Typography component="h2" variant="h5">Decisions</Typography>
            {focused && <Button onClick={() => setFocused("")} sx={{ alignSelf: "start" }}>Show all decisions</Button>}
            {!decisions.length && <Typography color="text.secondary">No decisions in this view.</Typography>}
            {decisions.map((item) => (
              <Paper key={item.id} variant="outlined" sx={{ p: 2 }}>
                <Stack spacing={1}>
                  <Typography component="h3" variant="h6">{item.title}</Typography>
                  <Typography color="text.secondary">{item.reason}</Typography>
                  <Typography variant="body2">
                    {label(item.state)} · Expires {format(item.expires_at)} · Slack {label(item.notification ?? "unconfigured")}
                  </Typography>
                  {safeTarget(item.slack_url) && <Button href={safeTarget(item.slack_url)} sx={{ alignSelf: "start" }}>Project thread</Button>}
                  {item.state === "pending" && item.role === "operator" && <>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {item.options.filter((option) => option.action !== "edit").map((option) => (
                        <Button key={option.action} variant="outlined" disabled={Boolean(busy)}
                          onClick={() => void respond(item, option.action)}>{option.label}</Button>
                      ))}
                    </Stack>
                    <TextField multiline label="Reply" size="small" value={reply[item.id] ?? ""}
                      onChange={(event) => setReply((previous) => ({ ...previous, [item.id]: event.target.value }))} />
                    <Button onClick={() => void respond(item)} disabled={Boolean(busy) || !reply[item.id]?.trim()}
                      sx={{ alignSelf: "start" }}>Submit reply</Button>
                  </>}
                </Stack>
              </Paper>
            ))}
          </Stack>
          {Boolean(data.releases?.length) && (
            <Stack spacing={1.5} component="section" aria-label="Production releases">
              <Typography component="h2" variant="h5">Production releases</Typography>
              {data.releases?.map((release) => (
                <Paper key={release.id} variant="outlined" sx={{ p: 2 }}>
                  <Typography component="h3" variant="h6">{releaseLabel[release.delivery]}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.projects.find((item) => item.id === release.project_id)?.name ?? "Project"} · {format(release.observed_at)}
                    {release.revision && ` · ${release.revision.slice(0, 7)}`}
                  </Typography>
                  {release.source_status && release.slack_status && (
                    <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 1 }}>
                      <Chip size="small" label={`Asana · ${writebackLabel(release.source_status)}`} />
                      <Chip size="small" label={`Slack · ${writebackLabel(release.slack_status)}`} />
                    </Stack>
                  )}
                  {safeTarget(release.change_url) && <Button href={safeTarget(release.change_url)}>Open change</Button>}
                  {safeTarget(release.slack_url) && <Button href={safeTarget(release.slack_url)}>Open Slack reply</Button>}
                </Paper>
              ))}
            </Stack>
          )}
          <Stack spacing={1.5} component="section" aria-label="Runs">
            <Typography component="h2" variant="h5">Runs</Typography>
            {!data.runs.length && <Typography color="text.secondary">No runs recorded.</Typography>}
            {data.runs.map((run) => (
              <Paper key={run.id} variant="outlined" sx={{ p: 2 }}>
                <Typography component="h3" variant="h6">{label(run.kind)}</Typography>
                <Typography>{label(run.state)} · {run.attempts} attempts</Typography>
                <Typography variant="body2" color="text.secondary">
                  {run.worker ? `Worker ${run.worker.slice(0, 8)} · ` : ""}
                  {run.completed_at ? `Finished ${format(run.completed_at)}`
                    : run.last_started_at ? `Last started ${format(run.last_started_at)}` : `Queued ${format(run.created_at)}`}
                </Typography>
                {run.state === "leased" && <Typography variant="body2" color="text.secondary">
                  {run.eta ? `Estimated ${format(run.eta.earliest)} to ${format(run.eta.latest)} · Based on ${run.eta.samples} comparable runs as of ${format(run.eta.calculated_at)}`
                    : "ETA unavailable"}
                </Typography>}
                {Boolean(run.recent_attempts?.length) && <Box component="details" sx={{ mt: 0.5 }}>
                  <Typography component="summary" variant="body2">Attempt history</Typography>
                  <Box component="ul" sx={{ my: 0.5, pl: 3 }}>
                    {run.recent_attempts?.map((attempt) => <Typography key={attempt.generation} component="li" variant="body2">
                      Attempt {attempt.generation} · {format(attempt.started_at)}
                      {attempt.finished_at ? ` to ${format(attempt.finished_at)}` : ""}
                      {attempt.result ? ` · ${label(attempt.result)}` : ""}
                    </Typography>)}
                  </Box>
                </Box>}
                {run.last_error && <Typography color="error.main">{run.last_error}</Typography>}
                {safeTarget(run.source_url) && <Button href={safeTarget(run.source_url)}>Open source</Button>}
                {linked.get(run.id)?.map((runtime) =>
                  <RuntimeStatus key={`${runtime.id}:${runtime.external_id ?? ""}`} run={runtime} />
                )}
              </Paper>
            ))}
          </Stack>
          <Stack spacing={1.5} component="section" aria-label="External runtimes">
            <Typography component="h2" variant="h5">External runtimes</Typography>
            {!external.length && <Typography color="text.secondary">No external runs observed.</Typography>}
            {external.map((run) => <RuntimeStatus key={`${run.id}:${run.external_id ?? ""}`} run={run} />)}
          </Stack>
          <Stack spacing={1.5} component="section" aria-label="Project costs">
            <Typography component="h2" variant="h5">Charges this month</Typography>
            {!data.costs.length && <Typography color="text.secondary">No priced usage reported.</Typography>}
            {data.costs.map((cost) => <Box key={cost.project_id}>
              <Typography>{data.projects.find((item) => item.id === cost.project_id)?.name ?? "Project"}</Typography>
              <Typography variant="body2" color="text.secondary">
                Confirmed {money(cost.confirmed_micros)} · Reserved {money(cost.reserved_micros)} ·
                Uncertain {money(cost.uncertain_micros)} · Included units used {cost.included_units}
              </Typography>
            </Box>)}
          </Stack>
          <Stack spacing={1.5} component="section" aria-label="Source health">
            <Typography component="h2" variant="h5">Source health</Typography>
            {!data.sources.length && <Typography color="text.secondary">No sources enrolled.</Typography>}
            {data.sources.map((source) => (
              <Box key={source.id}>
                <Typography>{source.provider} · {source.resource} · {label(source.health)}</Typography>
                <Typography color="text.secondary" variant="body2">
                  Last synced {format(source.last_ok)}
                  {source.sync_age_seconds != null && ` · ${Math.floor(source.sync_age_seconds / 60)} min ago`}
                  {source.gap_from ? ` · Gap since ${format(source.gap_from)}` : ""}
                </Typography>
                {source.checkpoint_state && <Typography color="text.secondary" variant="body2">
                  Checkpoint {label(source.checkpoint_state)}
                  {source.checkpoint_window && ` · Window starts ${format(source.checkpoint_window)}`}
                  {source.checkpoint_page != null && ` · ${source.checkpoint_page} pages read`}
                </Typography>}
                {reconciledSource === source.id && <Typography variant="body2" role="status">Reconciliation scheduled.</Typography>}
                {source.may_reconcile && source.generation && (
                  <Button size="small" disabled={Boolean(busy)} onClick={() => void reconcileSource(source)}>
                    Reconcile source
                  </Button>
                )}
              </Box>
            ))}
          </Stack>
          <Stack spacing={1.5} component="section" aria-label="Recent events">
            <Typography component="h2" variant="h5">Recent events</Typography>
            {data.events.map((event) => (
              <Box key={event.id}>
                <Typography>{event.projection.summary ?? label(event.kind)} · {label(event.disposition ?? "pending")}</Typography>
                <Typography variant="body2" color="text.secondary">{[event.reason, format(event.observed_at)].filter(Boolean).join(" · ")}</Typography>
              </Box>
            ))}
          </Stack>
        </>}
      </Stack>
    </Container>
  );
}
