import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import AdLeadForm from "@/components/ads/AdLeadForm";
import type { AdLandingPageConfig } from "@/components/ads/adLandingPages";

export default function AdLandingPage({
  page,
}: {
  page: AdLandingPageConfig;
}) {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100dvh" }}>
      <Box
        component="section"
        sx={{
          pt: { xs: 14, md: 20 },
          pb: { xs: 8, md: 12 },
          bgcolor: "secondary.main",
          color: "var(--color-text-on-dark)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 9 }} sx={{ alignItems: "start" }}>
            <Grid size={{ xs: 12, md: 6.4 }}>
              <Stack spacing={3.25} sx={{ pt: { md: 4 } }}>
                <Typography
                  variant="overline"
                  sx={{
                    width: "fit-content",
                    px: 1.5,
                    py: 0.5,
                    border: "1px solid color-mix(in srgb, var(--color-accent-cyan) 50%, transparent)",
                    color: "var(--color-accent-cyan)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {page.eyebrow}
                </Typography>
                <Typography
                  component="h1"
                  variant="h1"
                  sx={{
                    color: "inherit",
                    maxWidth: 760,
                    fontSize: { xs: "2.65rem", md: "4.25rem" },
                    lineHeight: 0.98,
                  }}
                >
                  {page.h1}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "inherit", opacity: 0.86, maxWidth: 650 }}
                >
                  {page.lead}
                </Typography>
                <Stack spacing={1.35} sx={{ pt: 1 }}>
                  {page.proofPoints.map((point) => (
                    <Stack
                      key={point}
                      direction="row"
                      spacing={1.25}
                      sx={{ alignItems: "center" }}
                    >
                      <CheckCircleOutlineIcon
                        sx={{ color: "var(--color-accent-cyan)", fontSize: 21 }}
                      />
                      <Typography sx={{ color: "inherit" }}>{point}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  sx={{ alignItems: { sm: "center" }, pt: 1 }}
                >
                  <ScheduleCallButton
                    text="Book a Free 30-Minute Call"
                    size="large"
                    inverse
                  />
                  <Button
                    href="tel:+16162873360"
                    startIcon={<PhoneOutlinedIcon />}
                    sx={{
                      color: "inherit",
                      justifyContent: { xs: "flex-start", sm: "center" },
                    }}
                  >
                    (616) 287-3360
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5.6 }}>
              <AdLeadForm
                landingPageSlug={`ads/${page.slug}`}
                landingPageVariant={page.variant}
                prompt={page.formPrompt}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }}>
            <Grid size={{ xs: 12, md: 4.5 }}>
              <Typography component="h2" variant="h2">
                What the assessment covers
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7.5 }}>
              <Stack divider={<Divider flexItem />} spacing={0}>
                {page.assessmentFocus.map((item, index) => (
                  <Grid
                    container
                    spacing={2}
                    key={item}
                    sx={{ py: 3, alignItems: "baseline" }}
                  >
                    <Grid size={{ xs: 2 }}>
                      <Typography
                        sx={{
                          color: "primary.main",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                        }}
                      >
                        0{index + 1}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 10 }}>
                      <Typography component="h3" variant="h5">
                        {item}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
              <Typography sx={{ color: "text.secondary", mt: 3, maxWidth: 680 }}>
                {page.followUp} Focused projects start at $500. Larger work is
                scoped after the workflow, systems, and exception paths are clear.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

