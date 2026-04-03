import Link from "next/link";
import type { Metadata } from "next";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NumberedSteps } from "@/components/blog/NumberedSteps";
import OrganicHighlight from "@/components/OrganicHighlight";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "AI Workflow Automation Services — Business Process Automation | Senna Automation",
  description:
    "Automate lead follow-up, data entry, sales pipelines, and internal workflows. Senna Automation builds custom AI automation systems that save time and eliminate manual work. Book a free audit.",
  alternates: {
    canonical: "https://www.senna-automation.com/services",
  },
};

const services = [
  {
    icon: AutoFixHighIcon,
    title: "Workflow",
    description:
      "Stop wasting hours on repetitive internal tasks. We map your existing processes and build systems that handle the work automatically, so your team can focus on what actually moves the business forward.",
    examples: ["Data entry automation", "Internal process routing", "Task handoffs between tools"],
    outcomes: ["Save hours each week", "Reduce costly human error"],
  },
  {
    icon: PersonSearchIcon,
    title: "Lead generation",
    description:
      "Every lead that slips through the cracks is lost revenue. We set up systems that capture, qualify, and route leads automatically, so no opportunity goes unanswered.",
    examples: [
      "Lead capture from forms & landing pages",
      "CRM integration & auto-tagging",
      "Automated lead qualification",
    ],
    outcomes: ["Capture more leads", "Respond instantly, 24/7"],
  },
  {
    icon: TrendingUpIcon,
    title: "Sales",
    description:
      "Following up manually is time-consuming and inconsistent. We build automated sequences that keep your pipeline moving without your team having to remember to send a single email.",
    examples: [
      "Follow-up email & SMS sequences",
      "Pipeline stage automation",
      "Appointment reminders & confirmations",
    ],
    outcomes: ["Close more deals", "Spend less time chasing leads"],
  },
  {
    icon: SmartToyIcon,
    title: "Assistants & internal tools",
    description:
      "Give your team tools that actually help them work faster. We build lightweight AI assistants and internal systems that answer common questions, surface important info, and eliminate repetitive decision-making.",
    examples: [
      "Internal knowledge assistants",
      "Chat-based workflow tools",
      "Custom AI-powered dashboards",
    ],
    outcomes: ["Speed up internal operations", "Reduce repetitive questions & decisions"],
  },
];

const steps = [
  {
    number: "01",
    title: "Audit",
    description:
      "We start by understanding your current workflows. We identify where time is being lost and where automation will have the most impact.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "We build and configure your automation systems, integrated directly with the tools your business already uses.",
  },
  {
    number: "03",
    title: "Deploy",
    description:
      "We test everything and launch. You get a fully working system with clear documentation and a walkthrough for your team.",
  },
  {
    number: "04",
    title: "Optimize",
    description:
      "After launch, we monitor performance and make refinements to ensure your system keeps delivering results.",
  },
];

export default function ServicesPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <Box
        component="section"
        sx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          pt: { xs: 12, md: 20 },
          pb: { xs: 10, md: 16 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle noise texture */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            opacity: 0.03,
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
            pointerEvents: 'none'
          }} 
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: "center" }}>
          <Box sx={{ maxWidth: "900px", mx: "auto" }}>
            <Typography
              component="h1"
              variant="h1"
              sx={{ mb: 2, color: "inherit" }}
            >
              Let the routine work run in the background
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "var(--color-text-on-dark)", mb: 4 }}
            >
              We build automation systems that save time, reduce manual work, and help your team focus
              on growing revenue.
            </Typography>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Get Your Automation Plan
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── Intro ─────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Box
              sx={{
                maxWidth: 720,
                mx: "auto",
                textAlign: "left",
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                sx={{ lineHeight: 1.35 }}
              >
                You&apos;re not lacking capability.{" "}
                <OrganicHighlight>
                  You&apos;re carrying the overhead of keeping everything in
                  sync.
                </OrganicHighlight>
              </Typography>
              <Typography
                variant="h4"
                component="h3"
                color="text.primary"
                sx={{
                  mt: 3,
                  lineHeight: 1.35,
                }}
              >
                We remove that overhead so things stay in motion without you
                thinking about it.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Divider />

      {/* ── Core Services ─────────────────────────────────── */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            How work gets simplified
          </Typography>

          <Grid container spacing={5}>
            {services.map((service) => (
              <Grid item xs={12} md={6} key={service.title}>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    p: { xs: 3, md: 4 },
                    height: "100%",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {/* Icon + Title */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        borderRadius: 2,
                        p: 1.2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <service.icon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h4" component="h3">
                      {service.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.8 }}
                  >
                    {service.description}
                  </Typography>

                  {/* Examples */}
                  <Typography
                    variant="overline"
                    sx={{ color: "text.secondary" }}
                  >
                    Examples
                  </Typography>
                  <Box component="ul" sx={{ mt: 0.5, mb: 2.5, pl: 2 }}>
                    {service.examples.map((ex) => (
                      <Typography
                        key={ex}
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        {ex}
                      </Typography>
                    ))}
                  </Box>

                  {/* Outcomes */}
                  <Typography
                    variant="overline"
                    sx={{ color: "text.secondary" }}
                  >
                    Outcomes
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    {service.outcomes.map((outcome) => (
                      <Box
                        key={outcome}
                        sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
                      >
                        <CheckCircleOutlineIcon
                          sx={{ fontSize: 18, color: "primary.main" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, color: "text.primary" }}
                        >
                          {outcome}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── How It Works ──────────────────────────────────── */}
      <Box sx={{ bgcolor: "background.paper", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            How it works
          </Typography>
          <NumberedSteps steps={steps} />
        </Container>
      </Box>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <FinalCTA />
    </Box>
  );
}
