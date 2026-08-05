import Script from "@/compat/next/script";
import { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import RuleOutlinedIcon from "@mui/icons-material/RuleOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import FinalCTA from "@/components/sections/FinalCTA";
import type { RouteMetadata } from "@/utils/metadata";
import { SITE_NAME, SITE_URL } from "@/utils/site";
import { captureAttribution, persistAttribution } from "@/utils/attribution";

const OFFER_ID = "workflow-bottleneck-review";
const CONTENT_ID = "offer-workflow-bottleneck-review";
const ASSET_ID = "offer-page:workflow-bottleneck-review";

export const metadata: RouteMetadata = {
  title: "30-Minute Workflow Bottleneck Review | Senna Automation",
  description:
    "Map one costly business handoff, estimate its operational impact, and leave with a practical next step in a focused 30-minute review with Senna Automation.",
  alternates: {
    canonical: `${SITE_URL}/workflow-bottleneck-review`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/workflow-bottleneck-review`,
    title: "Find the workflow bottleneck worth fixing first",
    description:
      "A focused 30-minute review of one costly handoff, including impact, constraints, exceptions, and the next practical step.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find the workflow bottleneck worth fixing first",
    description:
      "Map one costly handoff and leave with a practical next step in 30 minutes.",
  },
};

const reviewStages = [
  {
    label: "Current handoff",
    detail: "Where work enters, who touches it, and where it waits.",
  },
  {
    label: "Business rules",
    detail: "What can move automatically and what needs judgment.",
  },
  {
    label: "Operational impact",
    detail: "Time, rework, response delay, and revenue exposure.",
  },
  {
    label: "Practical next step",
    detail: "Fix, automate, measure, or leave it alone for now.",
  },
];

const sessionSteps = [
  {
    number: "00–08",
    title: "Trace what happens now",
    description:
      "We follow one real request, job, quote, registration, or approval from trigger to completion.",
  },
  {
    number: "08–18",
    title: "Find the expensive friction",
    description:
      "We separate routine work from exceptions and locate the delay, duplicate entry, or missing ownership.",
  },
  {
    number: "18–26",
    title: "Estimate the impact",
    description:
      "We use your rough volumes and labor assumptions to establish whether the problem is worth solving.",
  },
  {
    number: "26–30",
    title: "Choose the next move",
    description:
      "You leave knowing what to improve first, what systems are involved, and what should remain human.",
  },
];

const deliverables = [
  "A plain-language map of the workflow and its owner",
  "The key rules, exceptions, and system boundaries",
  "A rough low/base/high impact range using your assumptions",
  "A recommendation: automate, simplify, measure first, or defer",
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Workflow Bottleneck Review",
  description: metadata.description,
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  url: `${SITE_URL}/workflow-bottleneck-review`,
  areaServed: ["Lower Michigan", "Chicagoland"],
  serviceType: "Business workflow assessment",
};

const tracking = {
  contentId: CONTENT_ID,
  assetId: ASSET_ID,
  offerId: OFFER_ID,
};

export default function WorkflowBottleneckReviewPage() {
  useEffect(() => {
    const state = captureAttribution({
      ...tracking,
      placement: "offer-page-view",
    });
    void persistAttribution(state);
  }, []);

  return (
    <Box sx={{ bgcolor: "transparent", minHeight: "100vh" }}>
      <Script
        id="workflow-bottleneck-review-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <Box
        component="section"
        sx={{
          bgcolor: "var(--color-bg-inverse)",
          color: "var(--color-text-inverse)",
          pt: { xs: 16, md: 25 },
          pb: { xs: 10, md: 16 },
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            opacity: 0.22,
            backgroundImage:
              "linear-gradient(var(--color-border-on-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-on-dark) 1px, transparent 1px)",
            backgroundSize: "var(--space-12) var(--space-12)",
            maskImage:
              "linear-gradient(90deg, transparent 10%, currentColor 70%, transparent 100%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Grid container spacing={{ xs: 8, md: 10 }} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={3} sx={{ maxWidth: "46rem" }}>
                <Typography
                  variant="overline"
                  sx={{
                    width: "fit-content",
                    color: "var(--color-accent-cyan)",
                    letterSpacing: "0.14em",
                    borderBottom: "1px solid var(--color-border-medium)",
                    pb: 0.75,
                  }}
                >
                  30-minute Workflow Bottleneck Review
                </Typography>
                <Typography component="h1" variant="h1" sx={{ color: "inherit" }}>
                  Find the handoff costing your team time, margin, or follow-through.
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "var(--color-text-on-dark)", maxWidth: "40rem" }}
                >
                  Bring one process that keeps slipping, stalling, or demanding
                  manual cleanup. We&apos;ll map it together, estimate the impact,
                  and decide what is actually worth changing.
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
                >
                  <ScheduleCallButton
                    text="Book the Review"
                    size="large"
                    showIcon={false}
                    inverse
                    {...tracking}
                    placement="offer-hero"
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--color-text-on-dark-secondary)" }}
                  >
                    No deck. No commitment. One useful decision.
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  border: "1px solid var(--color-bg-on-dark-border)",
                  borderRadius: "var(--radius-xl)",
                  bgcolor: "var(--color-bg-on-dark-subtle)",
                  boxShadow: "inset 0 1px 0 var(--color-bg-on-dark-border)",
                  p: { xs: 3, md: 4 },
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: "var(--color-text-on-dark-secondary)" }}
                >
                  The review follows one thread
                </Typography>
                <Stack
                  spacing={0}
                  sx={{ mt: 2.5, borderLeft: "1px solid var(--color-border-medium)" }}
                >
                  {reviewStages.map((stage, index) => (
                    <Box
                      key={stage.label}
                      sx={{
                        pl: 3,
                        pb: index === reviewStages.length - 1 ? 0 : 3.5,
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: "calc(var(--space-1) * -1)",
                          top: "var(--space-1)",
                          width: "var(--space-2)",
                          height: "var(--space-2)",
                          borderRadius: "var(--radius-pill)",
                          bgcolor:
                            index === reviewStages.length - 1
                              ? "var(--color-highlight)"
                              : "var(--color-accent-cyan)",
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "inherit", mb: 0.5 }}>
                        {stage.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--color-text-on-dark-secondary)" }}
                      >
                        {stage.detail}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 9, md: 15 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="overline" sx={{ color: "var(--color-text-accent)" }}>
                Bring the messy version
              </Typography>
              <Typography variant="h2" component="h2" sx={{ mt: 1.5, mb: 3 }}>
                You do not need a process map before the call.
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: "34rem" }}>
                A shared inbox, an overloaded spreadsheet, a scheduling queue,
                an RFQ handoff, or an approval that lives in someone&apos;s memory
                is enough. We start with what your team really does—not the tidy
                version in a procedure manual.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack divider={<Box sx={{ borderTop: "1px solid var(--color-border-neutral-light)" }} />}>
                {sessionSteps.map((step) => (
                  <Grid
                    container
                    spacing={3}
                    key={step.number}
                    sx={{ py: 3, alignItems: "baseline" }}
                  >
                    <Grid size={{ xs: 4, sm: 3 }}>
                      <Typography
                        variant="overline"
                        sx={{ color: "var(--color-text-accent)", letterSpacing: "0.1em" }}
                      >
                        {step.number} min
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 8, sm: 9 }}>
                      <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {step.description}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{ py: { xs: 9, md: 15 }, bgcolor: "var(--color-bg-paper)" }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 7, md: 12 }} sx={{ alignItems: "start" }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="overline" sx={{ color: "var(--color-text-accent)" }}>
                What you leave with
              </Typography>
              <Typography variant="h2" component="h2" sx={{ mt: 1.5, mb: 4 }}>
                Clarity before software.
              </Typography>
              <Stack
                spacing={0}
                divider={<Box sx={{ borderTop: "1px solid var(--color-border-neutral-light)" }} />}
              >
                {deliverables.map((deliverable, index) => (
                  <Stack
                    key={deliverable}
                    direction="row"
                    spacing={2.5}
                    sx={{ py: 2.5, alignItems: "flex-start" }}
                  >
                    <Typography
                      variant="overline"
                      sx={{ color: "var(--color-text-accent)", minWidth: "2rem" }}
                    >
                      0{index + 1}
                    </Typography>
                    <Typography variant="body1">{deliverable}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  bgcolor: "var(--color-bg-inverse)",
                  color: "var(--color-text-inverse)",
                  p: { xs: 4, md: 5 },
                  borderRadius: "var(--radius-xl)",
                  boxShadow: "var(--shadow-dialog)",
                }}
              >
                <Typography variant="h4" component="h3" sx={{ color: "inherit", mb: 2 }}>
                  A good fit when the work is real but the fix is still fuzzy.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "var(--color-text-on-dark)", mb: 3 }}
                >
                  The review works best when a recurring process already has
                  volume, ownership, and visible consequences when it breaks.
                  If there is not enough evidence yet, the right next step may
                  simply be measuring it.
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    [AccountTreeOutlinedIcon, "A handoff crosses people or systems"],
                    [QueryStatsOutlinedIcon, "The delay or rework can be estimated"],
                    [RuleOutlinedIcon, "Most decisions follow recognizable rules"],
                    [TaskAltOutlinedIcon, "Someone owns the result"],
                  ].map(([Icon, label]) => {
                    const ItemIcon = Icon as typeof AccountTreeOutlinedIcon;
                    return (
                      <Stack key={label as string} direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        <ItemIcon sx={{ color: "var(--color-accent-cyan)", fontSize: "1.2rem" }} />
                        <Typography variant="body2" sx={{ color: "var(--color-text-on-dark-prominent)" }}>
                          {label as string}
                        </Typography>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <FinalCTA
        title="Bring one workflow. Leave with one useful decision."
        subtitle="We'll map the handoff, estimate the impact, and identify what should happen next—whether or not that means automation."
        buttonText="Book the 30-Minute Review"
        {...tracking}
        placement="offer-final"
      />
    </Box>
  );
}
