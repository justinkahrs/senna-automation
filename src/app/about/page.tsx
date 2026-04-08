import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Senna Automation — AI & Workflow Automation Consulting | Grand Rapids, MI",
  description:
    "Learn about Senna Automation: a Grand Rapids, MI-based AI workflow automation consultancy with 15+ years of software expertise. We help businesses eliminate repetitive work and move faster.",
  alternates: {
    canonical: "https://www.senna-automation.com/about",
  },
};

import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FinalCTA from "@/components/sections/FinalCTA";

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

const visuallyHiddenSx = {
  position: "absolute",
  width: "1px",
  height: "1px",
  p: 0,
  m: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export default function About() {
  return (
    <>
      <Box
        component="section"
        sx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          pt: { xs: 16, md: 28 },
          pb: { xs: 10, md: 16 },
          position: "relative",
          overflow: "hidden",
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
          }}
        />
        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <Typography
            variant="overline"
            sx={{ ...homeEyebrowSx, mb: 2, mx: "auto" }}
          >
            About Us
          </Typography>
          <Typography component="h1" variant="h1" color="inherit" gutterBottom>
            AI &amp; Workflow Automation Consulting
          </Typography>

          <Typography
            variant="subtitle1"
            color="inherit"
            sx={{ mt: 2, maxWidth: 800, mx: "auto", opacity: 0.7 }}
          >
            Based in Grand Rapids, MI, helping businesses eliminate repetitive
            work with 15+ years of hands-on software experience.
          </Typography>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          bgcolor: "background.default",
          py: { xs: 10, md: 15 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10, lg: 12 }}>
            <Grid item xs={12} md={7}>
              <Stack spacing={4}>
                <Box>
                  <Typography
                    variant="h2"
                    component="h2"
                    color="text.primary"
                    gutterBottom
                  >
                    Systems built for people, not just for machines.
                  </Typography>
                </Box>

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ maxWidth: "640px" }}
                >
                  Most businesses aren’t short on tools, they’re short on time.
                  Between follow-ups, data entry, handoffs, and everything else
                  that piles up, a lot of the day ends up being spent just
                  keeping things moving.
                </Typography>

                <Typography
                  variant="h5"
                  color="text.primary"
                  sx={{ fontWeight: 600 }}
                >
                  Senna Automation helps take that off your plate.
                </Typography>

                <Stack spacing={3} sx={{ mt: 2 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: "1.125rem", lineHeight: 1.8 }}
                  >
                    We're a full-stack automation and workflow consulting agency
                    based in Grand Rapids, Michigan. Our approach comes from
                    over 15 years of software development and working with
                    automation long before it was something everyone had an
                    opinion about.
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: "1.125rem", lineHeight: 1.8 }}
                  >
                    We focus on making the repetitive parts of your business run
                    on their own. Not a big overhaul. Not a complicated rebuild.
                    Just smarter systems that fit into how you already work.
                    Leads get followed up, data goes where it needs to go, and
                    tasks don’t sit around waiting for someone to notice them.
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: "1.125rem", lineHeight: 1.8 }}
                  >
                    At the end of the day, this is about making work feel
                    lighter. Fewer things slipping through the cracks, less time
                    spent on routine tasks, and more time for the work that
                    actually matters.
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box sx={{ position: { md: "sticky" }, top: 120 }}>
                <Box
                  component="figure"
                  sx={{
                    borderRadius: { xs: 0, md: 1.5 },
                    boxShadow: "var(--shadow-hero)",
                    overflow: "hidden",
                    position: "relative",
                    minHeight: { xs: 420, md: 720 },
                    m: 0,
                  }}
                >
                  <Image
                    src="/about-grand-rapids.jpg"
                    alt="Grand Rapids skyline and blue bridge over the river"
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    style={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, color-mix(in srgb, var(--ds-airforce-blue) 60%, transparent) 0%, color-mix(in srgb, var(--ds-airforce-blue) 60%, transparent) 100%)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      pt: { xs: 8, md: 12 },
                      px: 4,
                      pb: 4,
                    }}
                  >
                    <Stack spacing={2.5} alignItems="center">
                      <Box
                        component="img"
                        src="/master-logo.svg"
                        alt="Senna Automation"
                        sx={{
                          width: { xs: "170%", sm: "160%", md: "170%" },
                          maxWidth: 1120,
                          height: "auto",
                          display: "block",
                          filter:
                            "brightness(0) invert(1) drop-shadow(0 12px 30px rgba(24,25,37,0.28))",
                        }}
                      />
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: "var(--radius-pill)",
                          bgcolor: "rgba(255,255,255,0.16)",
                          backdropFilter: "blur(6px)",
                          color: "var(--color-text-inverse)",
                        }}
                      >
                        <LocationOnIcon sx={{ fontSize: 18, color: "inherit" }} />
                        <Typography
                          variant="body1"
                          sx={{ color: "var(--color-text-inverse)", fontWeight: 600 }}
                        >
                          Grand Rapids, MI
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          width: { xs: 120, md: 156 },
                          height: "8px",
                          bgcolor: "var(--color-accent-cyan)",
                          boxShadow: "0 0 18px rgba(146,220,229,0.25)",
                        }}
                      />
                      <Typography
                        variant="overline"
                        sx={{
                          fontSize: "1rem",
                          color: "var(--color-text-inverse)",
                          opacity: 0.92,
                        }}
                      >
                        Est. 2024
                      </Typography>
                    </Stack>
                  </Box>
                  <Box component="figcaption" sx={visuallyHiddenSx}>
                    Photo by{" "}
                    <Box
                      component="a"
                      href="https://unsplash.com/@karishea?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    >
                      Kari Shea
                    </Box>{" "}
                    on{" "}
                    <Box
                      component="a"
                      href="https://unsplash.com/photos/blue-bridge-over-river-near-city-buildings-during-daytime-koxByITzIUg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    >
                      Unsplash
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <FinalCTA
        title={
          <>
            If you’ve ever thought,{" "}
            <Box
              component="span"
              sx={{ fontStyle: "italic", color: "var(--color-text-primary)" }}
            >
              there has to be a better way to do this,
            </Box>{" "}
            there probably is.
          </>
        }
        subtitle="It just hasn’t been set up yet."
        buttonText="Let's fix that"
        buttonHref="/contact#contact-form"
        showContactLink={false}
        showCalendlyMeta={false}
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
