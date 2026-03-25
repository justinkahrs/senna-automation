"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";



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

const faqs = [
  {
    question: "Who is this a good fit for?",
    answer:
      "This is for businesses that feel slowed down by repetitive tasks, manual processes, or inconsistent follow-up. It works well for teams that want to save time, stay organized, and keep things moving without adding more overhead.",
  },
  {
    question: "What challenges does this help address?",
    answer:
      "It reduces time spent on repetitive work, prevents things from slipping through the cracks, and helps leads and tasks move forward without constant manual effort. The goal is smoother operations and more consistency across the board.",
  },
  {
    question: "What types of work can be automated?",
    answer:
      "Common examples include lead capture and follow-up, scheduling, onboarding, data entry, reporting, approvals, notifications, and internal workflows. If something is repetitive or rule-based, it can likely be automated.",
  },
  {
    question: "Do you offer chatbot or AI assistant solutions?",
    answer:
      "Yes, when it makes sense. Chat-based tools can help with lead qualification, answering common questions, or guiding users through a process. The focus is always on usefulness, not just adding a chatbot for the sake of it.",
  },
  {
    question: "Can this work with the tools already in use?",
    answer:
      "Yes. Most systems can connect with tools already in use, such as CRMs, email platforms, scheduling tools, and internal systems. The goal is to improve what’s already there, not replace everything.",
  },
  {
    question: "Is technical experience required to manage it?",
    answer:
      "No. Everything is set up to be simple and easy to manage. Once it’s in place, it should feel like part of the normal workflow, not something that requires technical expertise.",
  },
  {
    question: "Is it possible to start with a smaller scope?",
    answer:
      "Yes. Many projects start with one workflow or a single problem area. That makes it easy to see value quickly before expanding into other areas.",
  },
  {
    question: "What does getting started look like?",
    answer:
      "Start with a quick conversation about current workflows and where time is being lost. From there, it’s easy to identify a few opportunities to automate and outline what that would look like.",
  },
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
            sx={{ mb: 2, color: "#FFFFFF" }}
          >
            Solve the work that slows you down
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.88)",
              mb: 4,
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
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 720, mx: "auto" }}>
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
          <Stack spacing={6}>
            {solutions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: { 
                      xs: 'column', 
                      md: index % 2 === 0 ? 'row' : 'row-reverse' 
                    },
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  }}
                >
                  {/* Content Side */}
                  <Box
                    sx={{
                      flex: 1,
                      p: { xs: 4, md: 6, lg: 8 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography
                      variant="h3"
                      component="h3"
                      sx={{ 
                        mb: 3,
                        lineHeight: 1.2
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Stack spacing={4}>
                      <Box>
                        <Typography
                          variant="overline"
                          sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 1.5, display: 'block', mb: 1 }}
                        >
                          The Problem
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                          {item.problem}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="overline"
                          sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 1.5, display: 'block', mb: 1 }}
                        >
                          The Solution
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {item.solution}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="overline"
                          sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 1.5, display: 'block', mb: 1 }}
                        >
                          Key Outcomes
                        </Typography>
                        <Stack spacing={1.5} sx={{ mt: 1 }}>
                          {item.outcomes.map((outcome) => (
                            <Box
                              key={outcome}
                              sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                            >
                              <CheckCircleOutlineIcon
                                sx={{ fontSize: 22, color: "primary.main", mt: 0.3 }}
                              />
                              <Typography
                                variant="body1"
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

                  {/* Visualization Side */}
                  <Box
                    sx={{
                      flex: 1,
                      minHeight: { xs: 300, md: 'auto' },
                      bgcolor: "rgba(0,0,0,0.02)",
                      borderLeft: { 
                        md: index % 2 === 0 ? "1px solid" : "none" 
                      },
                      borderRight: { 
                        md: index % 2 !== 0 ? "1px solid" : "none" 
                      },
                      borderColor: "divider",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      background: "linear-gradient(135deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.03) 100%)",
                    }}
                  >
                    <Typography color="text.disabled" variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, zIndex: 1 }}>
                      Solution Visualization
                    </Typography>
                    {/* Subtle geometric pattern placeholder */}
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.04,
                        background: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                      }}
                    />
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </Container>
      </Box>

        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper", borderTop: "1px solid", borderColor: "divider" }}>
          <Container maxWidth="lg">
            <Grid container spacing={8}>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '2.2rem', md: '3rem' },
                    fontWeight: 700,
                    lineHeight: 1.1
                  }}
                >
                  Frequently asked questions
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: "1.1rem", maxWidth: 320 }}
                >
                  A few common questions teams ask before they start automating their
                  workflows.
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <motion.div
                  initial={{ opacity: 0, y: 100, scaleY: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <Stack spacing={2}>
                    {faqs.map((faq) => (
                      <Accordion
                        key={faq.question}
                        disableGutters
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 2,
                          boxShadow: "none",
                          "&:before": {
                            display: "none",
                          },
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography 
                            variant="h5" 
                            color="text.primary"
                          >
                            {faq.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 0 }}>
                          <Typography variant="body1" color="text.secondary">
                            {faq.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Stack>
                </motion.div>
              </Grid>
            </Grid>
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
          <Typography variant="h2" sx={{ mb: 2, color: "#FFFFFF" }}>
            See what you can automate
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.88)",
              mb: 4,
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
            }}
          >
            Get Your Automation Plan
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
