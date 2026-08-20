import type { ReactNode } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AdsClickOutlinedIcon from "@mui/icons-material/AdsClickOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { ContentSystemDashboard } from "@/components/portal/ContentSystemDashboard";
import { PortalUploadForm } from "@/components/portal/PortalUploadForm";
import { PortalSignOutButton } from "@/components/portal/PortalSignOutButton";
import type { PortalAccessRole } from "@/lib/portal-access";

interface PortalWorkspaceProps {
  displayName: string;
  email: string;
  role: PortalAccessRole;
}

const activeModules = [
  {
    id: "content-operations",
    label: "Content operations",
    href: "#content-operations",
    status: "Live",
    icon: CampaignOutlinedIcon,
    adminOnly: true,
  },
  {
    id: "rfp-workspace",
    label: "Proposal studio",
    href: "#rfp-workspace",
    status: "Available",
    icon: RequestQuoteOutlinedIcon,
    adminOnly: false,
  },
  {
    id: "growth-signals",
    label: "Growth signals",
    href: "#growth-signals",
    status: "Admin",
    icon: AssessmentOutlinedIcon,
    adminOnly: true,
  },
];

const roadmapModules = [
  {
    label: "Client delivery",
    description:
      "Project status, active automations, open decisions, and handoff risk by client.",
    icon: BusinessCenterOutlinedIcon,
  },
  {
    label: "Revenue attribution",
    description:
      "Bookings, qualified opportunities, payments, and source-neutral conversion evidence.",
    icon: AccountTreeOutlinedIcon,
  },
  {
    label: "Automation health",
    description:
      "n8n execution failures, provider incidents, retries, stale leases, and closed gates.",
    icon: ShieldOutlinedIcon,
  },
  {
    label: "Content backlog",
    description:
      "Opportunities, research readiness, planned articles, channel assets, and quarantine review.",
    icon: FactCheckOutlinedIcon,
  },
];

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Stack
      id={id}
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        scrollMarginTop: 96,
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "flex-end" },
      }}
    >
      <Box>
        <Typography
          variant="overline"
          sx={{
            color: "var(--color-accent)",
            fontWeight: 800,
            letterSpacing: "0.1em",
          }}
        >
          {eyebrow}
        </Typography>
        <Typography component="h2" variant="h3" sx={{ mt: 0.5 }}>
          {title}
        </Typography>
        <Typography sx={{ mt: 1, color: "text.secondary", maxWidth: 760 }}>
          {description}
        </Typography>
      </Box>
      {action}
    </Stack>
  );
}

function ModuleRail({
  role,
  displayName,
  email,
}: {
  role: PortalAccessRole;
  displayName: string;
  email: string;
}) {
  const visibleModules = activeModules.filter(
    (module) => !module.adminOnly || role === "admin",
  );

  return (
    <Paper
      elevation={0}
      sx={{
        position: { lg: "sticky" },
        top: { lg: 96 },
        p: 2,
        borderRadius: "12px",
        border: "1px solid var(--color-border-soft)",
        bgcolor: "rgba(255,255,255,0.92)",
        boxShadow: "0 18px 50px rgba(24, 25, 37, 0.06)",
      }}
    >
      <Stack spacing={2.25}>
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
            }}
          >
            Signed in
          </Typography>
          <Typography sx={{ mt: 0.5, fontWeight: 800 }}>{displayName}</Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontFamily: "var(--font-mono)",
              wordBreak: "break-word",
            }}
          >
            {email}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={0.75}>
          {visibleModules.map((module) => {
            const Icon = module.icon;
            return (
              <Button
                key={module.id}
                href={module.href}
                fullWidth
                startIcon={<Icon />}
                sx={{
                  justifyContent: "flex-start",
                  borderRadius: "8px",
                  px: 1.25,
                  py: 1.1,
                  color: "text.primary",
                  textTransform: "none",
                  "&:active": { transform: "translateY(1px)" },
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 800 }}>{module.label}</Typography>
                  <Chip
                    label={module.status}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: 22,
                      fontSize: "0.68rem",
                      color: "text.secondary",
                    }}
                  />
                </Stack>
              </Button>
            );
          })}
        </Stack>

        <Divider />

        <Stack spacing={1.25}>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
            }}
          >
            External consoles
          </Typography>
          <Link
            href="https://n8n.senna-automation.com"
            target="_blank"
            rel="noreferrer"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              color: "text.primary",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            n8n <OpenInNewIcon fontSize="inherit" />
          </Link>
          <Link
            href="https://mixpost.senna-automation.com"
            target="_blank"
            rel="noreferrer"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              color: "text.primary",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            Mixpost <OpenInNewIcon fontSize="inherit" />
          </Link>
        </Stack>

        <PortalSignOutButton />
      </Stack>
    </Paper>
  );
}

function PortalHero({ role }: { role: PortalAccessRole }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4.5 },
        borderRadius: "12px",
        border: "1px solid var(--color-border-soft)",
        bgcolor: "rgba(255,255,255,0.96)",
        boxShadow: "0 24px 80px rgba(24, 25, 37, 0.08)",
      }}
    >
      <Grid container spacing={{ xs: 3, md: 5 }} sx={{ alignItems: "stretch" }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              <Chip
                icon={<DashboardCustomizeOutlinedIcon />}
                label="Senna operations portal"
                sx={{
                  bgcolor: "rgba(143, 0, 107, 0.08)",
                  color: "var(--color-accent)",
                  fontWeight: 800,
                }}
              />
              <Chip
                label={role}
                variant="outlined"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  borderColor: "var(--color-border-soft)",
                }}
              />
            </Stack>
            <Typography component="h1" variant="h2">
              One place to check the business systems that now run in the
              background.
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 780 }}>
              The portal is structured as an internal operating console: active
              modules first, direct links to the underlying automation consoles,
              and reserved space for the next business surfaces as they become
              worth monitoring.
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              height: "100%",
              minHeight: 220,
              borderRadius: "10px",
              border: "1px solid var(--color-border-soft)",
              bgcolor: "rgba(248,247,249,0.8)",
              p: 2.5,
            }}
          >
            <Stack divider={<Divider flexItem />}>
              {[
                ["Live operations", "Content publishing and social distribution"],
                ["Response work", "RFP PDF generation and proposal packaging"],
                ["Expansion path", "Delivery, attribution, and health modules"],
              ].map(([label, detail]) => (
                <Stack
                  key={label}
                  direction="row"
                  spacing={2}
                  sx={{ py: 1.6, alignItems: "baseline" }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      mt: 0.85,
                      borderRadius: "50%",
                      bgcolor: "var(--color-accent)",
                      flex: "0 0 auto",
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>{label}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {detail}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

function RoadmapModule({
  label,
  description,
  icon: Icon,
}: {
  label: string;
  description: string;
  icon: typeof AccountTreeOutlinedIcon;
}) {
  return (
    <Box
      sx={{
        py: 2.25,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
        <Icon sx={{ color: "var(--color-accent)", mt: 0.25 }} />
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 800 }}>{label}</Typography>
            <Chip
              label="Planned"
              size="small"
              variant="outlined"
              sx={{ height: 22, color: "text.secondary" }}
            />
          </Stack>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export function PortalWorkspace({ displayName, email, role }: PortalWorkspaceProps) {
  const isAdmin = role === "admin";

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "var(--color-bg)",
        py: { xs: 7, md: 10 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, lg: 5 }}>
          <Grid size={{ xs: 12, lg: 3 }}>
            <ModuleRail displayName={displayName} email={email} role={role} />
          </Grid>

          <Grid size={{ xs: 12, lg: 9 }}>
            <Stack spacing={{ xs: 5, md: 7 }}>
              <PortalHero role={role} />

              {isAdmin ? (
                <Stack spacing={2.5}>
                  <SectionHeading
                    id="content-operations"
                    eyebrow="Live automation"
                    title="Content system control room"
                    description="Monitor the autonomous content engine without having to remember which n8n workflow owns which responsibility."
                  />
                  <ContentSystemDashboard />
                </Stack>
              ) : null}

              <Stack spacing={2.5}>
                <SectionHeading
                  id="rfp-workspace"
                  eyebrow="Response work"
                  title="Proposal response studio"
                  description="Turn an RFP PDF plus commercial context into a final proposal package while preserving pricing, delivery notes, and technology constraints."
                  action={
                    <Button
                      href="/portal/rfp-preview"
                      variant="outlined"
                      startIcon={<DescriptionOutlinedIcon />}
                      sx={{ borderRadius: "999px", flexShrink: 0 }}
                    >
                      Open layout preview
                    </Button>
                  }
                />
                <PortalUploadForm
                  displayName={displayName}
                  email={email}
                  role={role}
                  presentation="workspace"
                />
              </Stack>

              {isAdmin ? (
                <Stack spacing={2.5}>
                  <SectionHeading
                    id="growth-signals"
                    eyebrow="Acquisition"
                    title="Growth and attribution surfaces"
                    description="The portal can grow into the place where ads, source-neutral acquisition, bookings, and revenue checks sit next to content operations."
                    action={
                      <Button
                        href="/portal/ads"
                        variant="contained"
                        startIcon={<AdsClickOutlinedIcon />}
                        sx={{ borderRadius: "999px", flexShrink: 0 }}
                      >
                        Open ads dashboard
                      </Button>
                    }
                  />
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: "12px",
                      border: "1px solid var(--color-border-soft)",
                      bgcolor: "rgba(255,255,255,0.94)",
                    }}
                  >
                    <Grid container spacing={{ xs: 2, md: 4 }}>
                      <Grid size={{ xs: 12, md: 5 }}>
                        <Stack spacing={1.5}>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center" }}
                          >
                            <TuneOutlinedIcon sx={{ color: "var(--color-accent)" }} />
                            <Typography component="h3" variant="h5">
                              Current posture
                            </Typography>
                          </Stack>
                          <Typography sx={{ color: "text.secondary" }}>
                            Ads reporting remains a guarded pilot. It belongs in
                            the portal, but it should stay clearly separated
                            from content automation until the live campaign and
                            n8n workflows are explicitly enabled.
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12, md: 7 }}>
                        <Stack divider={<Divider flexItem />}>
                          {[
                            ["Ads dashboard", "Authenticated reporting and pilot controls"],
                            ["Calendly bookings", "Verified booking rows, not modal clicks"],
                            ["Lead quality", "Spam disposition, qualification, and revenue linkage"],
                          ].map(([label, detail]) => (
                            <Stack
                              key={label}
                              direction="row"
                              spacing={2}
                              sx={{
                                py: 1.6,
                                justifyContent: "space-between",
                                gap: 2,
                              }}
                            >
                              <Typography sx={{ fontWeight: 800 }}>{label}</Typography>
                              <Typography
                                sx={{
                                  color: "text.secondary",
                                  textAlign: { sm: "right" },
                                  maxWidth: 360,
                                }}
                              >
                                {detail}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Paper>
                </Stack>
              ) : null}

              <Stack spacing={2.5}>
                <SectionHeading
                  id="portal-roadmap"
                  eyebrow="Designed to expand"
                  title="Next portal modules"
                  description="These are intentionally reserved slots, not fake dashboards. They give future work a consistent home when the underlying data and operating process are ready."
                />
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: "12px",
                    border: "1px solid var(--color-border-soft)",
                    bgcolor: "rgba(255,255,255,0.94)",
                  }}
                >
                  <Grid container columnSpacing={4}>
                    {roadmapModules.map((module) => (
                      <Grid key={module.label} size={{ xs: 12, md: 6 }}>
                        <RoadmapModule {...module} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Stack>

              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Portal modules should only graduate from planned to live after
                the underlying source of truth and access model are explicit.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
