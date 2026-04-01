"use client";

import Link from "next/link";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CascadingStagger from "@/components/animations/CascadingStagger";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { BlogPost } from "@/utils/blog";
import { WARM_BLACK } from "@/components/theme/colors";
import OrganicHighlight from "@/components/OrganicHighlight";

interface Solution {
  title: string;
  problem: string;
  solution: string;
  outcomes: string[];
  category?: string;
  caseStudyCategory?: string;
  video?: string;
  latestPost?: Omit<BlogPost, "content"> | null;
}

interface SolutionsClientProps {
  solutions: Solution[];
}

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

export default function SolutionsClient({ solutions }: SolutionsClientProps) {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
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
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
            pointerEvents: "none",
          }}
        />
        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <Box sx={{ maxWidth: "900px", mx: "auto" }}>
            <Typography
              component="h1"
              variant="h1"
              sx={{ mb: 2, color: "inherit" }}
            >
              Solve the work that slows you down
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "rgba(255,255,255,0.7)",
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
            >
              Get Your Automation Plan
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md" sx={{ textAlign: "left" }}>
          <Typography
            variant="h4"
            component="h2"
            color="text.primary"
            sx={{ maxWidth: 720, lineHeight: 1.35 }}
          >
            <OrganicHighlight>
              Most bottlenecks look more familiar than you think.
            </OrganicHighlight>{" "}
            Too much admin work, inconsistent follow-up, messy handoffs, and
            not enough visibility.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" sx={{ mb: 6 }}>
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
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
                    position: "relative",
                  }}
                >
                  <Grid container>
                    {/* Content Side (7 Columns) */}
                    <Grid
                      item
                      xs={12}
                      md={5}
                      order={{ xs: 2, md: index % 2 === 0 ? 1 : 2 }}
                    >
                      <Box
                        sx={{
                          p: { xs: 4, md: 5, lg: 6 },
                        }}
                      >
                        <Typography
                          variant="h3"
                          component="h3"
                          sx={{
                            mb: 3,
                            lineHeight: 1.2,
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Stack spacing={4}>
                          <Box>
                            <Typography
                              variant="overline"
                              sx={{
                                color: "primary.main",
                                fontWeight: 800,
                                letterSpacing: 1.5,
                                display: "block",
                                mb: 1,
                              }}
                            >
                              The Problem
                            </Typography>
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}
                            >
                              {item.problem}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography
                              variant="overline"
                              sx={{
                                color: "primary.main",
                                fontWeight: 800,
                                letterSpacing: 1.5,
                                display: "block",
                                mb: 1,
                              }}
                            >
                              The Solution
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                            >
                              {item.solution}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography
                              variant="overline"
                              sx={{
                                color: "primary.main",
                                fontWeight: 800,
                                letterSpacing: 1.5,
                                display: "block",
                                mb: 1,
                              }}
                            >
                              Key Outcomes
                            </Typography>
                            <Stack spacing={1.5} sx={{ mt: 1 }}>
                              {item.outcomes.map((outcome) => (
                                <Box
                                  key={outcome}
                                  sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 1.5,
                                  }}
                                >
                                  <CheckCircleOutlineIcon
                                    sx={{
                                      fontSize: 22,
                                      color: "primary.main",
                                      mt: 0.3,
                                    }}
                                  />
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color: "text.primary",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {outcome}
                                  </Typography>
                                </Box>
                              ))}
                            </Stack>
                          </Box>

                          {item.latestPost && (
                            <Box sx={{ pt: 2 }}>
                              <Button
                                component={Link}
                                href={`/blog/${item.latestPost.slug}`}
                                variant="outlined"
                                size="large"
                                sx={{
                                  borderColor: "divider",
                                  color: "text.primary",
                                  "&:hover": {
                                    borderColor: "primary.main",
                                    bgcolor: "transparent",
                                  },
                                }}
                              >
                                Read the Case Study
                              </Button>
                            </Box>
                          )}
                        </Stack>
                      </Box>
                    </Grid>

                    {/* Visualization Side (7 Columns) */}
                    <Grid
                      item
                      xs={12}
                      md={7}
                      order={{ xs: 1, md: index % 2 === 0 ? 2 : 1 }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          minHeight: { xs: 300, md: "auto" },
                          bgcolor:
                            index % 2 === 0
                              ? "rgba(0,0,0,0.01)"
                              : "rgba(0,0,0,0.02)",
                          borderLeft: {
                            md: index % 2 === 0 ? "1px solid" : "none",
                          },
                          borderRight: {
                            md: index % 2 !== 0 ? "1px solid" : "none",
                          },
                          borderColor: "divider",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          overflow: "hidden",
                          background:
                            "linear-gradient(135deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.03) 100%)",
                        }}
                      >
                        {item.video ? (
                          <Box
                            component="video"
                            autoPlay
                            muted
                            loop
                            playsInline
                            src={item.video}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              opacity: 1,
                              display: "block",
                            }}
                          />
                        ) : (
                          <>
                            <Typography
                              color="text.disabled"
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: 2,
                                zIndex: 1,
                              }}
                            >
                              Solution Visualization
                            </Typography>
                            {/* Subtle geometric pattern placeholder */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                opacity: 0.04,
                                background: `radial-gradient(circle at 2px 2px, ${WARM_BLACK} 1px, transparent 0)`,
                                backgroundSize: "32px 32px",
                              }}
                            />
                          </>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  mb: 2,
                  fontSize: { xs: "2.2rem", md: "3rem" },
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                Frequently asked questions
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.1rem", maxWidth: 320 }}
              >
                A few common questions teams ask before they start automating
                their workflows.
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <CascadingStagger spacing={2}>
                {faqs.map((faq) => (
                  <Accordion
                    key={faq.question}
                    disableGutters
                    slotProps={{ transition: { timeout: 180 } }}
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
                      <Typography variant="h5" color="text.primary">
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
              </CascadingStagger>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          py: { xs: 8, md: 12 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Texture overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
            pointerEvents: "none",
          }}
        />
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h2" sx={{ mb: 2, color: "inherit" }}>
            See what you can automate
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.7)",
              mb: 4,
            }}
          >
            Start with a quick 30-minute conversation about where time is being
            lost and what feels most repetitive. We will identify practical
            opportunities and map out the best place to start.
          </Typography>
          <Stack spacing={2} alignItems="center">
            <ScheduleCallButton
              text="Book a Demo"
              size="large"
              inverse
              sx={{ px: 6 }}
              showIcon={false}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              <Typography variant="caption" sx={{ color: "inherit" }}>
                via
              </Typography>
              <Box
                component="img"
                src="/Calendly.svg"
                alt="Calendly"
                sx={{
                  height: "0.95rem",
                  width: "auto",
                  opacity: 0.9,
                  filter: "brightness(0) invert(1)",
                  mt: "3px",
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.4)" }}
            >
              Prefer a form?{" "}
              <Button
                component={Link}
                href="/contact"
                variant="text"
                size="small"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  p: 0,
                  minWidth: 0,
                  textDecoration: "underline",
                  fontSize: "inherit",
                }}
              >
                Contact us
              </Button>
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
