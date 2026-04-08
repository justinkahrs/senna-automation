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
  Button,
  Container,
  Stack,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FinalCTA from "@/components/sections/FinalCTA";

export default function About() {
  return (
    <>
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
                    variant="overline"
                    color="primary.main"
                    sx={{ mb: 2, display: "block" }}
                  >
                    Our Core Focus
                  </Typography>
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
                <Card
                  sx={{
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 4,
                    boxShadow: "var(--shadow-hero)",
                    overflow: "hidden",
                  }}
                >
                  <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                    <Stack spacing={4} alignItems="center">
                      <LocationOnIcon
                        sx={{ fontSize: 48, color: "primary.main" }}
                      />
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h4"
                          component="h2"
                          gutterBottom
                          sx={{ color: "text.primary" }}
                        >
                          Senna Automation
                        </Typography>
                        <Stack spacing={0.5}>
                          <Typography variant="body1" color="text.secondary">
                            AI Automation & Custom Software Development
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Serving Grand Rapids, MI & Nationwide
                          </Typography>
                        </Stack>
                      </Box>

                      <Divider sx={{ width: "100%", opacity: 0.5 }} />

                      <Stack spacing={2} alignItems="center">
                        <Typography variant="h5" color="text.primary">
                          (616) 287-3360
                        </Typography>
                        <Typography variant="overline" color="text.secondary">
                          Est. 2024
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
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
              “there has to be a better way to do this,”
            </Box>{" "}
            there probably is.
          </>
        }
        subtitle="It just hasn’t been set up yet."
        buttonText="Let's fix that"
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
