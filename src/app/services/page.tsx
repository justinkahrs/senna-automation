import Link from "next/link";
import type { Metadata } from "next";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const metadata: Metadata = {
  title: "Services | Senna Automation",
  description:
    "Automate your business workflows, lead generation, and sales processes with Senna Automation. We help small and mid-sized businesses save time, reduce manual work, and grow revenue.",
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

const useCases = [
  "Automate lead follow-up for service businesses so no prospect goes cold",
  "Eliminate manual data entry between tools like CRMs, spreadsheets, and email",
  "Instantly qualify inbound leads and route them to the right team member",
  "Send automated appointment reminders to reduce no-shows and cancellations",
  "Build a knowledge assistant that answers common staff and customer questions",
];

export default function ServicesPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: { xs: 10, md: 14 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h1"
            sx={{ fontSize: { xs: "2.4rem", md: "3.5rem" }, mb: 2, color: "#FFFFFF" }}
          >
            Let the Routine Work Run in the Background
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "rgba(255,255,255,0.9)", mb: 4, fontWeight: 400, fontSize: { xs: "1.1rem", md: "1.3rem" } }}
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
            sx={{
              bgcolor: "#FFFFFF",
              color: "#000000",
              "&:hover": { bgcolor: "#EEEEEE" },
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            Get Your Automation Plan
          </Button>
        </Container>
      </Box>

      {/* ── Intro ─────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Most businesses are losing hours to manual work
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mx: "auto", lineHeight: 1.8 }}>
            Repetitive tasks like data entry, follow-up emails, and lead routing eat up hours that should
            go toward growing your business. Our services are built to take that work off your
            plate, permanently.
          </Typography>
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
            {services.map((service, i) => (
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
                    <Typography variant="h4" component="h3" sx={{ fontWeight: 600 }}>
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
                    sx={{ fontWeight: 700, letterSpacing: 1, color: "text.primary" }}
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
                    sx={{ fontWeight: 700, letterSpacing: 1, color: "text.primary" }}
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
                          sx={{ fontWeight: 600, color: "text.primary" }}
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
          <Grid container spacing={3}>
            {steps.map((step) => (
              <Grid item xs={12} sm={6} md={3} key={step.number}>
                <Box sx={{ textAlign: "center", px: 1 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      color: "#767676",
                      fontSize: "3.5rem",
                      fontFamily: "monospace",
                      mb: 1,
                    }}
                  >
                    {step.number}
                  </Typography>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Use Cases ─────────────────────────────────────── */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 2 }}>
            Real-world examples
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 5 }}
          >
            Here are some of the most common ways businesses like yours use automation.
          </Typography>
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}
          >
            {useCases.map((useCase, i) => (
              <Box
                key={useCase}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  px: 3,
                  py: 2.5,
                  borderBottom: i < useCases.length - 1 ? "1px solid" : "none",
                  borderColor: "divider",
                }}
              >
                <ArrowForwardIcon
                  sx={{ fontSize: 18, color: "primary.main", mt: 0.3, flexShrink: 0 }}
                />
                <Typography variant="body1" color="text.primary">{useCase}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: { xs: 8, md: 12 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.8rem" }, color: "#FFFFFF" }}>
            See what you can automate
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.9)", mb: 4, fontSize: "1.05rem", lineHeight: 1.8 }}
          >
            We start with a free audit of your current workflows. No commitment, just a clear
            picture of where you can save time and reduce overhead.
          </Typography>
          <Button
            component={Link}
            href="/contact"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: "#FFFFFF",
              color: "#000000",
              "&:hover": { bgcolor: "#EEEEEE" },
              borderRadius: "50px",
              px: 5,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            Book a Free Audit
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
