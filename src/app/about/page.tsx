import Link from "next/link";
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
            Welcome to Senna Automation
          </Typography>

          <Typography
            variant="subtitle1"
            color="inherit"
            sx={{ mt: 2, maxWidth: 800, mx: "auto", opacity: 0.7 }}
          >
            We're glad you're here.
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
                    boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
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

          <Box
            sx={{
              mt: { xs: 12, md: 20 },
              py: 12,
              px: { xs: 4, md: 8 },
              bgcolor: "secondary.main",
              borderRadius: 6,
              boxShadow: "0 30px 90px rgba(0,0,0,0.18)",
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

            <Stack
              spacing={6}
              alignItems="center"
              sx={{ position: "relative", zIndex: 1 }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "background.paper",
                  textAlign: "center",
                  maxWidth: "840px",
                }}
              >
                If you’ve ever thought,{" "}
                <Box
                  component="span"
                  sx={{ fontStyle: "italic", color: "primary.light" }}
                >
                  “there has to be a better way to do this,”
                </Box>{" "}
                there probably is. It just hasn’t been set up yet.
              </Typography>

              <Link href="/contact" passHref>
                <Button variant="contained" size="large" sx={{ px: 8 }}>
                  Let&apos;s fix that
                </Button>
              </Link>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
