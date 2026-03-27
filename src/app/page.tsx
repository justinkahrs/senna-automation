import type { Metadata } from "next";
import Image from "next/image";
import RequestFormButton from "@/components/RequestFormButton";

export const metadata: Metadata = {
  title:
    "AI Workflow Automation & Business Process Automation | Senna Automation",
  description:
    "Senna Automation helps businesses in Grand Rapids, MI and beyond eliminate repetitive work with AI-powered workflow automation. Schedule a free 30-min call to see what you can automate.",
  alternates: {
    canonical: "https://www.senna-automation.com",
  },
};

import ScheduleCallButton from "@/components/ScheduleCallButton";
import AnimatedHeroTitle from "@/components/AnimatedHeroTitle";
import PricingToggleSection from "@/components/home/PricingToggleSection";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
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

const integrationLogos = [
  { src: "/hubspot.png", alt: "HubSpot", width: { xs: 118, md: 152 } },
  { src: "/quickbooks.png", alt: "QuickBooks", width: { xs: 126, md: 164 } },
  { src: "/slack.png", alt: "Slack", width: { xs: 92, md: 120 } },
  { src: "/asana.png", alt: "Asana", width: { xs: 98, md: 126 } },
  { src: "/shopify.png", alt: "Shopify", width: { xs: 112, md: 144 } },
  { src: "/stripe.png", alt: "Stripe", width: { xs: 96, md: 124 } },
  { src: "/paypal.png", alt: "PayPal", width: { xs: 100, md: 128 } },
  { src: "/airtable.png", alt: "Airtable", width: { xs: 108, md: 138 } },
  { src: "/notion.png", alt: "Notion", width: { xs: 96, md: 122 } },
  { src: "/clickup.png", alt: "ClickUp", width: { xs: 104, md: 136 } },
  { src: "/dropbox.png", alt: "Dropbox", width: { xs: 112, md: 144 } },
  { src: "/typeform.png", alt: "Typeform", width: { xs: 104, md: 134 } },
  { src: "/monday.png", alt: "Monday.com", width: { xs: 126, md: 164 } },
  { src: "/pipedrive.png", alt: "Pipedrive", width: { xs: 118, md: 152 } },
  { src: "/servicenow.png", alt: "ServiceNow", width: { xs: 128, md: 166 } },
  { src: "/zendesk.png", alt: "Zendesk", width: { xs: 112, md: 144 } },
  {
    group: [
      { src: "/teams.png", alt: "Microsoft Teams", width: { xs: 122, md: 156 } },
      { src: "/outlook.png", alt: "Outlook", width: { xs: 114, md: 146 } },
      { src: "/excel.png", alt: "Excel", width: { xs: 88, md: 116 } },
      { src: "/onedrive.png", alt: "OneDrive", width: { xs: 124, md: 160 } },
    ],
    alt: "Microsoft tools",
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
          minHeight: { xs: "100svh", md: "min(100svh, 860px)" },
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
                <Stack spacing={1.25} alignItems="center">
                  <ScheduleCallButton
                    fullWidth
                    size="large"
                    text="Schedule a Call"
                    showIcon={false}
                    aria-label="Schedule a consultation call with our AI automation experts via Calendly"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "text.secondary",
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
                        mt: "2px",
                      }}
                    />
                  </Box>
                </Stack>
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
          pt: { xs: 12, md: 16 },
          pb: { xs: 10, md: 12 },
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
                      Senna Automation builds systems that take work off your
                      plate
                    </strong>{" "}
                    and keep your business moving. Instead of juggling emails,
                    follow-ups, and repetitive tasks,{" "}
                    <strong>
                      your workflows run quietly in the background
                    </strong>
                    , turning inputs into <strong>completed outcomes</strong>.
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: "1.125rem", lineHeight: 1.8 }}
                  >
                    We design and build{" "}
                    <strong>custom automation systems</strong> for{" "}
                    <strong>small and mid-sized businesses</strong>, combining
                    modern AI with software that fits the tools you already use.
                    The result is <strong>less manual work</strong>,{" "}
                    <strong>fewer gaps</strong>, and{" "}
                    <strong>more time focused on what actually matters</strong>.
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
                    Based in Grand Rapids, Michigan, Senna Automation helps
                    businesses <strong>simplify operations</strong>,{" "}
                    <strong>reduce back-and-forth</strong>, and create systems
                    they can rely on.
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            {/* Visual Element (5 Columns) */}
            <Grid item xs={12} md={5}></Grid>
          </Grid>
        </Container>
      </Box>

      <PricingToggleSection />

      <Box
        component="section"
        sx={{
          bgcolor: "background.paper",
          pt: { xs: 8, md: 10 },
          pb: { xs: 10, md: 16 },
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{ mb: { xs: 4, md: 6 } }}
          >
            Building integrations across your core systems
          </Typography>
        </Container>

        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "max-content",
              alignItems: "center",
              animation: "integration-marquee 48s linear infinite",
              willChange: "transform",
              "@keyframes integration-marquee": {
                from: { transform: "translateX(0)" },
                to: { transform: "translateX(-50%)" },
              },
            }}
          >
            {[...integrationLogos, ...integrationLogos].map((logo, index) => (
              <Box
                key={`${logo.alt}-${index}`}
                sx={{
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  pr: { xs: 3.5, md: 5 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={logo.alt}
              >
                {Array.isArray(logo.group) ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 0.5, md: 0.75 },
                    }}
                  >
                    {logo.group.map((groupLogo) => (
                      <Box
                        key={groupLogo.alt}
                        component="img"
                        src={groupLogo.src}
                        alt={groupLogo.alt}
                        sx={{
                          width: groupLogo.width,
                          height: { xs: 22, md: 30 },
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    ))}
                  </Box>
                ) : (
                  <Box
                    component="img"
                    src={logo.src}
                    alt={logo.alt}
                    sx={{
                      width: logo.width,
                      height: { xs: 22, md: 30 },
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        <Container maxWidth="lg">
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{
              mt: { xs: 4, md: 5 },
              maxWidth: 760,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Using homegrown tools or internal systems? We build automation
            directly into those as well.{" "}
            <Box
              component={Link}
              href="/services"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              See how
            </Box>
          </Typography>
        </Container>
      </Box>

      {/* ── Social Proof ─────────────────────────────── */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.paper",
          py: { xs: 8, md: 10 },
          minHeight: { md: 640 },
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            transform: { md: "translateY(-64px)" },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="overline"
            align="center"
            color="text.secondary"
            sx={{ display: "block", mb: 6, letterSpacing: 2 }}
          >
            What clients say
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                quote:
                  "The quoting workflow Senna built cut our response time from hours to minutes. We stopped losing deals just because we were slow.",
                name: "Operations Manager",
                company: "B2B Distributor",
              },
              {
                quote:
                  "Our lead follow-up used to fall through the cracks constantly. Now it's just done. The team didn't have to change anything about how they work.",
                name: "Sales Director",
                company: "Service Business",
              },
              {
                quote:
                  "Justin took the time to actually understand our process before building anything. The result was something our team immediately trusted.",
                name: "Founder",
                company: "Regional Agency",
              },
            ].map((t) => (
              <Grid item xs={12} md={4} key={t.name}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "transparent",
                    backgroundImage: "none",
                    boxShadow: "none",
                    border: "1px solid",
                    borderColor: "rgba(28,25,23,0.08)",
                    "&:hover": {
                      transform: "none",
                      boxShadow: "none",
                      borderColor: "rgba(28,25,23,0.08)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 4, md: 5 },
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      "&:last-child": { pb: { xs: 4, md: 5 } },
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        fontSize: "1.05rem",
                        lineHeight: 1.75,
                        fontStyle: "italic",
                        flex: 1,
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </Typography>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        {t.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t.company}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
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

          <Container
            maxWidth={false}
            sx={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "1440px",
              px: { xs: 3, sm: 4, md: 5, lg: 6 },
            }}
          >
            <Grid
              container
              spacing={{ xs: 8, md: 6, lg: 8 }}
              alignItems="stretch"
            >
              <Grid item xs={12} md={7}>
                <Box
                  sx={{
                    py: { xs: 8, md: 16 },
                    pr: { md: 4, lg: 5 },
                    ml: { md: -4, lg: -6 },
                    maxWidth: { md: "680px", lg: "760px" },
                  }}
                >
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

              <Grid item md={5} sx={{ display: { xs: "none", md: "block" } }}>
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                    minHeight: { md: 600 },
                    width: {
                      md: "calc(100% + 32px)",
                      lg: "calc(100% + 48px)",
                    },
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={latestPost.image || "/gradient-fallback.png"}
                    alt={latestPost.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    sizes="(max-width: 1440px) 38vw, 560px"
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
                  <Image
                    src={latestPost.image || "/gradient-fallback.png"}
                    alt={latestPost.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
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
                slotProps={{ transition: { timeout: 180 } }}
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
              Ready to see how this works for your business? Thirty minutes, no
              prep, no commitment.
            </Typography>
            <Stack spacing={1.5} alignItems="center">
              <ScheduleCallButton
                text="Schedule a Free Assessment"
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
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
