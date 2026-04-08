import type { Metadata } from "next";
import type { ReactNode } from "react";
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
import { getAllBlogPosts } from "@/utils/blog";
import { Button } from "@mui/material";
import OrganicHighlight from "@/components/OrganicHighlight";
import FinalCTA from "@/components/sections/FinalCTA";

const faqs: Array<{ question: string; answer: ReactNode }> = [
  {
    question: "How is this different from other automation tools?",
    answer: (
      <>
        <Box component="p" sx={{ m: 0 }}>
          There are already powerful automation platforms out there, but most
          are built for large teams and require time to learn and maintain.
        </Box>
        <Box component="p" sx={{ mt: 2, mb: 0 }}>
          This is different. You&apos;re getting a system designed around your
          business that actually runs, not a tool you have to manage.
        </Box>
      </>
    ),
  },
  {
    question: "Do I need to be technical to use this?",
    answer: (
      <>
        <Box component="p" sx={{ m: 0 }}>
          No.
        </Box>
        <Box component="p" sx={{ mt: 2, mb: 0 }}>
          Everything is set up to match how your business already works. You and
          your team just interact with simple inputs like emails, forms, or
          messages, and the system handles the rest quietly in the background.
        </Box>
      </>
    ),
  },
  {
    question: "What kinds of things can actually be automated?",
    answer: (
      <>
        <Box component="p" sx={{ m: 0 }}>
          Anything that follows a pattern.
        </Box>
        <Box component="p" sx={{ mt: 2, mb: 0 }}>
          That usually includes:
        </Box>
        <Box component="ul" sx={{ mt: 1.5, mb: 0, pl: 3 }}>
          <Box component="li">
            Incoming leads getting organized and qualified
          </Box>
          <Box component="li">Follow-ups happening without reminders</Box>
          <Box component="li">Scheduling handled without back-and-forth</Box>
          <Box component="li">
            Invoices or documents created from conversations
          </Box>
          <Box component="li">
            Tasks moving between people without manual coordination
          </Box>
        </Box>
        <Box component="p" sx={{ mt: 2, mb: 0 }}>
          Most businesses are already doing this work manually.
        </Box>
      </>
    ),
  },
  {
    question: "How do I get started?",
    answer: (
      <>
        <Box component="p" sx={{ m: 0 }}>
          We start by looking at where work is getting stuck or repeated.
        </Box>
        <Box component="p" sx={{ mt: 2, mb: 0 }}>
          From there, we build one system that takes that off your plate. Once
          that&apos;s running, we expand into other areas.
        </Box>
      </>
    ),
  },
];

const integrationLogos = [
  { src: "/hubspot.png", alt: "HubSpot", width: { xs: 118, md: 152 } },
  { src: "/quickbooks.png", alt: "QuickBooks", width: { xs: 126, md: 164 } },
  { src: "/openai.png", alt: "OpenAI", width: { xs: 104, md: 132 } },
  { src: "/azure.png", alt: "Azure", width: { xs: 104, md: 132 } },
  { src: "/slack.png", alt: "Slack", width: { xs: 92, md: 120 } },
  { src: "/asana.png", alt: "Asana", width: { xs: 98, md: 126 } },
  { src: "/shopify.png", alt: "Shopify", width: { xs: 112, md: 144 } },
  { src: "/stripe.png", alt: "Stripe", width: { xs: 96, md: 124 } },
  { src: "/paypal.png", alt: "PayPal", width: { xs: 100, md: 128 } },
  { src: "/n8n.png", alt: "n8n", width: { xs: 54, md: 70 } },
  { src: "/airtable.png", alt: "Airtable", width: { xs: 108, md: 138 } },
  { src: "/notion.png", alt: "Notion", width: { xs: 96, md: 122 } },
  { src: "/clickup.png", alt: "ClickUp", width: { xs: 104, md: 136 } },
  { src: "/dropbox.png", alt: "Dropbox", width: { xs: 112, md: 144 } },
  { src: "/frontapp.png", alt: "Front", width: { xs: 74, md: 96 } },
  { src: "/typeform.png", alt: "Typeform", width: { xs: 104, md: 134 } },
  { src: "/monday.png", alt: "Monday.com", width: { xs: 126, md: 164 } },
  { src: "/pipedrive.png", alt: "Pipedrive", width: { xs: 118, md: 152 } },
  { src: "/servicenow.png", alt: "ServiceNow", width: { xs: 128, md: 166 } },
  { src: "/zendesk.png", alt: "Zendesk", width: { xs: 112, md: 144 } },
  {
    group: [
      {
        src: "/teams.png",
        alt: "Microsoft Teams",
        width: { xs: 122, md: 156 },
      },
      { src: "/outlook.png", alt: "Outlook", width: { xs: 114, md: 146 } },
      { src: "/excel.png", alt: "Excel", width: { xs: 88, md: 116 } },
      { src: "/onedrive.png", alt: "OneDrive", width: { xs: 124, md: 160 } },
    ],
    alt: "Microsoft tools",
  },
];

const homeEyebrowSx = {
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
  px: 1.75,
  py: 0.5,
  border: "1px solid",
  borderColor: "var(--color-border-medium)",
  borderRadius: "var(--radius-pill)",
  bgcolor:
    "color-mix(in srgb, var(--color-accent-cyan), transparent 84%)",
  color: "var(--color-text-secondary)",
  letterSpacing: "0.12em",
};

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
          minHeight: { xs: "100svh", md: "min(100svh, 920px)" },
          pt: { xs: "64px", md: "112px" },
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          pb: { xs: 16, md: 20 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: { md: "flex-start" } }}>
            <Stack
              spacing={0}
              alignItems={{ xs: "center", md: "flex-start" }}
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", md: 760 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <AnimatedHeroTitle />
              <Box
                component="hr"
                sx={{
                  my: 4,
                  width: { xs: "min(160px, 44vw)", md: 180 },
                  border: 0,
                  borderTop: "8px solid var(--color-accent-cyan)",
                  alignSelf: { xs: "center", md: "flex-start" },
                }}
              />

              {/* subtitle1 = body-large (18px, lh1.60) */}
              <Typography
                id="hero-description"
                variant="subtitle1"
                component="h2"
                color="text.secondary"
                sx={{
                  mt: 0,
                  mb: 4,
                  maxWidth: 720,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Support your team with systems that handle the repetitive work.
                So they can focus on the work that moves things forward.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  alignItems: { xs: "center", sm: "flex-start" },
                  justifyContent: { xs: "center", md: "flex-start" },
                  width: "100%",
                }}
              >
                <Stack
                  spacing={1.25}
                  alignItems={{ xs: "center", sm: "flex-start" }}
                  sx={{
                    textAlign: { xs: "center", md: "left" },
                    width: { xs: "100%", sm: 300 },
                    maxWidth: 300,
                  }}
                >
                  <ScheduleCallButton
                    fullWidth
                    size="large"
                    text="Schedule a Call"
                    showIcon={false}
                    aria-label="Schedule a consultation call with our AI automation experts via Calendly"
                  />
                </Stack>
                <Box
                  sx={{
                    width: { xs: "100%", sm: 300 },
                    maxWidth: 300,
                  }}
                >
                  <RequestFormButton
                    fullWidth
                    size="large"
                    text="See What You Can Automate"
                    href="/services"
                    aria-label="See what you can automate"
                    sx={{
                      color: "var(--color-text-primary)",
                      borderColor: "var(--color-text-primary)",
                      "&:hover": {
                        borderColor: "var(--color-text-primary)",
                        backgroundColor: "rgba(24, 25, 37, 0.04)",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* ── Why Choose Section (Floating Card) ──────── */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          mt: { xs: -8, md: -14 },
          mb: { xs: -44, md: -68 },
        }}
      >
        <Box
          component="section"
          sx={{
            maxWidth: { xs: "100%", md: 1240 },
            mx: "auto",
            bgcolor: "background.paper",
            borderRadius: { xs: 0, md: 1.5 },
            px: 0,
            py: 0,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Grid
            container
            spacing={0}
            alignItems="stretch"
          >
            {/* Visual Element (5 Columns) */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{ p: 0, bgcolor: "var(--color-text-primary)" }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  minHeight: { xs: 360, md: "100%" },
                  bgcolor: "var(--color-text-primary)",
                  borderTopLeftRadius: { xs: 0, md: "12px" }, // Matching 1.5 * 8
                  borderBottomLeftRadius: { xs: 0, md: "12px" },
                  overflow: "hidden",
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                >
                  <source src="/visualContent.mp4" type="video/mp4" />
                </video>

                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom right, rgba(0,0,0,0.1) 0%, transparent 50%)",
                    pointerEvents: "none",
                  }}
                />
              </Box>
            </Grid>
            {/* Text Content (7 Columns) */}
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                py: { xs: 10, md: 14, lg: 16 },
                px: { xs: 4, sm: 8, md: 10, lg: 12 },
                display: "flex",
                alignItems: "center",
                justifyContent: { md: "flex-start", lg: "center" },
              }}
            >
              <Box sx={{ maxWidth: 640, width: "100%" }}>
                <Typography
                  variant="overline"
                  sx={{ ...homeEyebrowSx, mb: 2 }}
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
                  Systems that handle the work, so you can{" "}
                  <Box component="span" sx={{ color: "primary.main" }}>
                    handle the business
                  </Box>
                  .
                </Typography>

                <Stack spacing={3}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: "1.125rem", lineHeight: 1.8 }}
                  >
                    Senna Automation builds systems that take work off your
                    plate and keep your business moving. Instead of juggling
                    emails, follow-ups, and repetitive tasks, your workflows run
                    quietly in the background, turning inputs into completed
                    outcomes.
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: "1.125rem", lineHeight: 1.8 }}
                  >
                    We design and build custom automation systems for small and
                    mid-sized businesses, combining modern AI with software that
                    fits the tools you already use. The result is less manual
                    work, fewer gaps, and more time focused on what actually
                    matters.
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontStyle: "italic",
                      borderLeft: "8px solid",
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
          </Grid>
        </Box>
      </Box>

      {latestPost && (
        <Box
          component="section"
          sx={{
            bgcolor: "var(--color-text-primary)",
            pt: { xs: 50, md: 74 },
            pb: { xs: 0, md: 0 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "relative",
              bgcolor: "var(--color-text-primary)",
              color: "background.paper",
              overflow: "hidden",
              minHeight: { md: "600px" },
              display: "flex",
              alignItems: "center",
            }}
          >
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
                maxWidth: { xs: "100%", md: 1240 },
                mx: "auto",
                px: { xs: 4, sm: 6, md: 0 },
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
                      maxWidth: { md: "680px", lg: "760px" },
                    }}
                  >
                    <Stack spacing={4}>
                      <Box>
                        <Typography
                          variant="overline"
                          sx={{ ...homeEyebrowSx, mb: 2 }}
                        >
                          Case Study
                        </Typography>
                      </Box>

                      <Stack spacing={3}>
                        <Typography variant="h2" color="inherit">
                          {latestPost.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "var(--color-text-on-dark-prominent)",
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
                <Grid
                  item
                  md={5}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      aspectRatio: "4 / 3",
                      width: "100%",
                      borderRadius: { xs: 0, md: 1.5 },
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
                        bgcolor:
                          "color-mix(in srgb, var(--color-accent-cyan), transparent 50%)",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: { xs: "block", md: "none" }, pb: 8 }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      aspectRatio: "4 / 3",
                      borderRadius: { xs: 0, md: 1.5 },
                      overflow: "hidden",
                      width: "100%",
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
                        bgcolor:
                          "color-mix(in srgb, var(--color-accent-cyan), transparent 50%)",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      )}
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
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{
              mt: { xs: 4, md: 5 },
              maxWidth: 760,
              mx: "auto",
              lineHeight: 1.8,
              fontWeight: 500,
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
          py: { xs: 9, md: 12 },
          minHeight: { md: 720 },
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: 1240 },
            mx: "auto",
            px: { xs: 3, sm: 4, md: 0 },
            transform: { md: "translateY(-64px)" },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="overline"
            align="center"
            sx={{ ...homeEyebrowSx, mb: 6, mx: "auto" }}
          >
            What clients say
          </Typography>
          <Grid container spacing={{ xs: 3, md: 4 }}>
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
                    bgcolor: "background.default",
                    backgroundImage: "none",
                    boxShadow: "none",
                    border: "1px solid",
                    borderColor: "var(--color-border-neutral-light)",
                    borderRadius: { xs: 0, md: 1.5 },
                    "&:hover": {
                      transform: "none",
                      boxShadow: "none",
                      borderColor: "var(--color-border-neutral-light)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 4, md: 5.5 },
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: 4,
                      minHeight: { xs: 320, md: 380 },
                      "&:last-child": { pb: { xs: 4, md: 5.5 } },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        component="div"
                        sx={{
                          color: "var(--color-text-accent)",
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: { xs: "3rem", md: "3.5rem" },
                          lineHeight: 0.8,
                          mb: 2,
                        }}
                      >
                        &ldquo;
                      </Typography>
                      <Typography
                        variant="h4"
                        color="text.primary"
                        sx={{
                          fontWeight: 400,
                          fontStyle: "italic",
                          lineHeight: 1.4,
                        }}
                      >
                        {t.quote}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "text.primary",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
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
      {/* ── FAQ Section ──────────────────────────────── */}
      <Box
        component="section"
        sx={{
          bgcolor: "var(--color-text-inverse)",
          color: "text.primary",
          pt: { xs: 8, md: 10 },
          pb: { xs: 8, md: 10 },
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
            opacity: 0.015,
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
            A few common questions about how automation works and where to
            start.
          </Typography>

          <CascadingStagger spacing={2}>
            {faqs.map((faq) => (
              <Accordion
                key={faq.question}
                disableGutters
                slotProps={{ transition: { timeout: 140 } }}
                sx={{
                  bgcolor: "background.paper",
                  borderColor: "divider",
                  color: "inherit",
                  "&.Mui-expanded": {
                    bgcolor: "background.paper",
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
                    component="div"
                    variant="body1"
                    sx={{ color: "text.secondary" }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </CascadingStagger>
        </Container>
      </Box>
      <FinalCTA
        title="Ready to see how this works for your business?"
        subtitle="Thirty minutes, no prep, no commitment."
        buttonText="Schedule a Free Assessment"
        showContactLink={false}
        showTexture={false}
        containerMaxWidth="md"
        sx={{
          bgcolor: "var(--color-text-highlight)",
          color: "text.primary",
          py: 12,
          background: "none",
          animation: "none",
        }}
        titleSx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          py: 1.75,
          fontFamily:
            '"itc-avant-garde-gothic-pro", system-ui, -apple-system, sans-serif',
          color: "var(--color-text-primary)",
        }}
        subtitleSx={{
          maxWidth: 620,
          mx: "auto",
          color: "var(--ds-space-indigo, #181925)",
        }}
        buttonSx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          "&:hover": {
            bgcolor: "secondary.main",
            filter: "brightness(1.05)",
          },
        }}
        calendlyLogoSx={{
          filter: "none",
        }}
        viaSx={{
          color: "text.secondary",
        }}
        stackSpacing={1.5}
      />
    </>
  );
}
