import type { Metadata } from "next";
import RequestFormButton from "@/components/RequestFormButton";

export const metadata: Metadata = {
  title: "AI Workflow Automation & Business Process Automation | Senna Automation",
  description:
    "Senna Automation helps businesses in Grand Rapids, MI and beyond eliminate repetitive work with AI-powered workflow automation. Schedule a free 30-min call to see what you can automate.",
  alternates: {
    canonical: "https://www.senna-automation.com",
  },
};

import ScheduleCallButton from "@/components/ScheduleCallButton";
import AnimatedHeroTitle from "@/components/AnimatedHeroTitle";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CascadingStagger from "@/components/animations/CascadingStagger";
import Link from "next/link";
import { alpha } from "@mui/material/styles";
import { ACCENT } from "@/components/theme/colors";
import { getAllBlogPosts } from "@/utils/blog";
import { Button } from "@mui/material";

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
      "Yes. Most systems can connect with tools already in use, such as CRMs, email platforms, scheduling tools, and internal systems. The goal is to improve what's already there, not replace everything.",
  },
  {
    question: "Is technical experience required to manage it?",
    answer:
      "No. Everything is set up to be simple and easy to manage. Once it's in place, it should feel like part of the normal workflow, not something that requires technical expertise.",
  },
  {
    question: "Is it possible to start with a smaller scope?",
    answer:
      "Yes. Many projects start with one workflow or a single problem area. That makes it easy to see value quickly before expanding into other areas.",
  },
  {
    question: "What does getting started look like?",
    answer:
      "Start with a quick conversation about current workflows and where time is being lost. From there, it's easy to identify a few opportunities to automate and outline what that would look like.",
  },
];

export default function Home() {
  const blogPosts = getAllBlogPosts();
  const latestPost = blogPosts[0];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <Box
        component="section"
        aria-labelledby="hero-heading"
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center">
            <AnimatedHeroTitle />

            {/* subtitle1 = body-large (18px, lh1.60) */}
            <Typography
              id="hero-description"
              variant="subtitle1"
              align="center"
              component="h2"
              color="text.secondary"
              sx={{ mb: 4, mx: "auto", maxWidth: 720 }}
            >
              Support your team with systems that handle the repetitive work. So
              they can focus on the work that moves things forward.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Stack spacing={2} sx={{ textAlign: "center", width: 300 }}>
                <ScheduleCallButton
                  fullWidth
                  size="large"
                  text="Schedule a Call via"
                  aria-label="Schedule a consultation call with our AI automation experts via Calendly"
                />
                <RequestFormButton
                  fullWidth
                  size="large"
                  text="See What You Can Automate"
                  href="/services"
                  aria-label="See what you can automate"
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* ── Why Choose Section ───────────────────────── */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.paper",
          py: { xs: 12, md: 24 },
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={{ xs: 8, md: 10, lg: 12 }}
            alignItems="center"
          >
            {/* Text Content (7 Columns) */}
            <Grid item xs={12} md={7}>
              <Box sx={{ maxWidth: 640 }}>
                <Typography
                  variant="overline"
                  color="primary.main"
                  sx={{ mb: 2, display: "block" }}
                >
                  The Senna Advantage
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  color="text.primary"
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Systems that handle the work, so you can handle the business.
                </Typography>

                <Stack spacing={3}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: "1.125rem", lineHeight: 1.8 }}
                  >
                    <strong>
                      Senna Automation specializes in AI workflow automation and
                      custom software development
                    </strong>
                    , helping businesses in Grand Rapids, Michigan and beyond
                    harness the power of artificial intelligence.
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: "1.125rem", lineHeight: 1.8 }}
                  >
                    Whether you need <strong>B2B AI consulting</strong>,{" "}
                    <strong>digital transformation</strong> strategies, or
                    end-to-end workflow automation, our team delivers measurable
                    outcomes—including reduced operational costs and improved
                    efficiency.
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontStyle: "italic",
                      borderLeft: "2px solid",
                      borderColor: "primary.light",
                      pl: 3,
                      py: 1,
                      mt: 2,
                    }}
                  >
                    Expertise spans custom web app development, modern AI
                    integration, and high-performance, SEO-optimized systems
                    that help your business stand out.
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            {/* Visual Element (5 Columns) */}
            <Grid item xs={12} md={5}></Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Latest Insight Section ───────────────────── */}
      {latestPost && (
        <Box
          component="section"
          sx={{
            position: "relative",
            bgcolor: "background.default",
            color: "secondary.main",
            overflow: "hidden",
            minHeight: { md: "600px" },
            display: "flex",
            alignItems: "center",
            borderY: "1px solid",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          {/* Texture overlay matching blog hero */}
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
              zIndex: 1,
            }}
          />

          {/* Full-bleed background image for desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "50%",
              zIndex: 0,
            }}
          >
            <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
              <img
                src={latestPost.image || "/gradient-fallback.png"}
                alt={latestPost.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: alpha(ACCENT, 0.5),
                  pointerEvents: "none",
                }}
              />
            </Box>
          </Box>

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
            <Grid container spacing={{ xs: 8, md: 10, lg: 12 }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ py: { xs: 8, md: 16 }, pr: { md: 8 } }}>
                  <Stack spacing={4}>
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ color: "primary.light", mb: 2, display: "block" }}
                      >
                        Latest Insight
                      </Typography>
                    </Box>

                    <Stack spacing={3}>
                      <Typography variant="h2" color="inherit">
                        {latestPost.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          fontSize: "1.25rem",
                          lineHeight: 1.8,
                        }}
                      >
                        {latestPost.excerpt}
                      </Typography>
                      <Box sx={{ pt: 2 }}>
                        <Link href={`/blog/${latestPost.slug}`} passHref>
                          <Button variant="contained" size="large">
                            Read It
                          </Button>
                        </Link>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>

              {/* Mobile Image (hidden on desktop) */}
              <Grid
                item
                xs={12}
                sx={{ display: { xs: "block", md: "none" }, pb: 8 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    height: 300,
                  }}
                >
                  <img
                    src={latestPost.image || "/gradient-fallback.png"}
                    alt={latestPost.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: alpha(ACCENT, 0.5),
                      pointerEvents: "none",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* ── FAQ Section ──────────────────────────────── */}
      <Box
        component="section"
        sx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          py: { xs: 12, md: 20 },
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
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            color="inherit"
            sx={{ mb: 2 }}
          >
            Frequently asked questions
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="inherit"
            sx={{ maxWidth: 600, mx: "auto", mb: 8, opacity: 0.7 }}
          >
            A few common questions teams ask before they start automating their
            workflows.
          </Typography>

          <CascadingStagger spacing={2}>
            {faqs.map((faq) => (
              <Accordion
                key={faq.question}
                disableGutters
                sx={{
                  bgcolor: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "inherit",
                  "&.Mui-expanded": {
                    bgcolor: "rgba(255,255,255,0.06)",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: "primary.light" }} />
                  }
                >
                  <Typography variant="h5" color="inherit">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </CascadingStagger>

          <Box sx={{ mt: 8, textAlign: "center" }}>
            <Typography
              variant="h5"
              color="inherit"
              sx={{ mb: 2, opacity: 0.9 }}
            >
              Ready to see how this works for your business?
            </Typography>
            <Stack spacing={1.5} alignItems="center">
              <ScheduleCallButton
                text="Schedule a Free Call"
                size="large"
                sx={{ px: 6 }}
              />
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.4)" }}
              >
                Free 30-min call. No commitment.
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
