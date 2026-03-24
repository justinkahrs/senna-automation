import Link from "next/link";
import type { Metadata } from "next";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const metadata: Metadata = {
  title: "Solutions | Senna Automation",
  description:
    "See how Senna Automation helps businesses automate administrative work, lead generation, and sales workflows to save time, reduce manual work, and increase revenue.",
};

const solutions = [
  {
    title: "Automate admin work",
    problem:
      "Your team is spending too much time on repetitive tasks that keep the business running but do not move it forward.",
    solution:
      "Automate data entry, task routing, status updates, internal handoffs, and the small steps that eat up time every day.",
    outcomes: [
      "Save hours each week",
      "Reduce manual errors",
      "Free up time for higher-value work",
    ],
  },
  {
    title: "Capture and qualify leads",
    problem:
      "Leads come in, but response times are inconsistent and some opportunities slip through the cracks.",
    solution:
      "Set up automated lead capture, routing, qualification, and follow-up so the right people get the right information quickly.",
    outcomes: [
      "Respond faster",
      "Create more qualified opportunities",
      "Keep leads from going cold",
    ],
  },
  {
    title: "Improve follow-up and sales",
    problem:
      "Sales follow-up depends too much on memory, manual reminders, or inconsistent processes.",
    solution:
      "Build automated follow-up sequences, pipeline triggers, reminders, and simple sales workflows that keep communication moving.",
    outcomes: [
      "More consistent follow-up",
      "Better conversion from active leads",
      "Less time spent chasing next steps",
    ],
  },
  {
    title: "Streamline onboarding",
    problem:
      "Manual onboarding creates delays, missed steps, and a frustrating experience for both your team and new clients or hires.",
    solution:
      "Use automated onboarding flows, checklists, document requests, notifications, and internal tasks to keep everything moving.",
    outcomes: [
      "Faster ramp-up",
      "Fewer gaps in the process",
      "A smoother experience from day one",
    ],
  },
  {
    title: "Reduce back-and-forth",
    problem:
      "Too much time is lost to scheduling, reminders, updates, and repeated communication just to keep work on track.",
    solution:
      "Automate scheduling, reminders, confirmations, and routine updates so people stay informed without extra coordination.",
    outcomes: [
      "Less friction across the process",
      "Faster execution",
      "Fewer delays caused by missed communication",
    ],
  },
  {
    title: "Reporting and visibility",
    problem:
      "It is hard to see what is happening, where work is stuck, or how performance is trending without manual reporting.",
    solution:
      "Automate reports, summaries, and dashboards that make activity, pipeline movement, and key numbers easier to track.",
    outcomes: [
      "Clearer visibility into operations",
      "Less manual reporting work",
      "Better decisions with less effort",
    ],
  },
];

const bestFit = [
  "Service businesses that handle a steady flow of client work",
  "Agencies managing leads, projects, and recurring communication",
  "Teams with high lead volume or slow response times",
  "Operations-heavy businesses with lots of handoffs and admin work",
];

export default function SolutionsPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
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
            Solve the work that slows you down
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255,255,255,0.9)",
              mb: 4,
              fontWeight: 400,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
            }}
          >
            Real-world automation for the repetitive work that drains time,
            slows follow-up, and makes growth harder than it should be.
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

      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Most bottlenecks look more familiar than you think
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 720, mx: "auto", lineHeight: 1.8 }}
          >
            Most businesses run into the same problems: too much admin work,
            inconsistent follow-up, messy handoffs, and not enough visibility.
            These are real examples of how those problems get solved with
            practical automation that saves time and keeps work moving.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{ mb: 6 }}
          >
            Common problems we solve
          </Typography>
          <Grid container spacing={4}>
            {solutions.map((item) => (
              <Grid item xs={12} md={6} key={item.title}>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    p: { xs: 3, md: 4 },
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{ mb: 3, fontWeight: 600 }}
                  >
                    {item.title}
                  </Typography>

                  <Stack spacing={2.5}>
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ color: "text.primary", fontWeight: 700, letterSpacing: 1 }}
                      >
                        Problem
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {item.problem}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ color: "text.primary", fontWeight: 700, letterSpacing: 1 }}
                      >
                        Solution
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {item.solution}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ color: "text.primary", fontWeight: 700, letterSpacing: 1 }}
                      >
                        Outcome
                      </Typography>
                      <Stack spacing={1} sx={{ mt: 1 }}>
                        {item.outcomes.map((outcome) => (
                          <Box
                            key={outcome}
                            sx={{ display: "flex", alignItems: "center", gap: 1 }}
                          >
                            <CheckCircleOutlineIcon
                              sx={{ fontSize: 18, color: "primary.main" }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "text.primary", fontWeight: 600 }}
                            >
                              {outcome}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{ mb: 2 }}
          >
            Where this works best
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 4, maxWidth: 720, mx: "auto" }}
          >
            These kinds of solutions are especially useful for teams that have
            repeatable work, steady lead flow, and too many manual steps.
          </Typography>
          <Box
            sx={{
              bgcolor: "background.default",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 3, md: 4 },
            }}
          >
            <Stack spacing={2}>
              {bestFit.map((item) => (
                <Box
                  key={item}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                >
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: 20, color: "primary.main", mt: 0.2 }}
                  />
                  <Typography variant="body1" color="text.primary">
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: { xs: 8, md: 12 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h2"
            sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.8rem" }, color: "#FFFFFF" }}
          >
            See what you can automate
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.9)",
              mb: 4,
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            Start with a conversation about where time is being lost and what
            feels most repetitive. We will identify practical opportunities and
            map out the best place to start.
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
            Get Your Automation Plan
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
