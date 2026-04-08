"use client";

import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import {
  growthTier,
  starterTier,
} from "@/components/pricing/tierData";

export default function PricingToggleSection() {
  const tiers = [starterTier, growthTier];

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "var(--color-text-primary)",
        color: "background.paper",
        pt: { xs: 50, md: 74 },
        pb: { xs: 8, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: { xs: "100%", md: 1240 },
          mx: "auto",
          px: { xs: 3, sm: 4, md: 0 },
        }}
      >
        <Stack spacing={{ xs: 4, md: 5 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: { xs: 3, md: 4 },
              width: "100%",
              mx: "auto",
            }}
          >
            {tiers.map((tier) => (
              <Box key={tier.id} id={tier.anchorId}>
                <Box
                  sx={{
                    height: "100%",
                    borderRadius: { xs: 0, md: 1.5 },
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    px: { xs: 3, sm: 4, md: 5 },
                    py: { xs: 4, md: 5 },
                  }}
                >
                  <Stack
                    spacing={{ xs: 2.5, md: 3 }}
                    sx={{ height: "100%" }}
                  >
                    <Box sx={{ maxWidth: "520px" }}>
                      <Typography
                        variant="overline"
                        sx={{
                          color: "var(--color-text-accent)",
                          display: "block",
                          mb: 2,
                        }}
                      >
                        {tier.eyebrow}
                      </Typography>
                      <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                          mb: 3,
                          color: "text.primary",
                        }}
                      >
                        {tier.homepageHeadline}
                      </Typography>
                    </Box>

                    <Stack
                      direction="column"
                      spacing={4}
                      alignItems="flex-start"
                      sx={{ mt: "auto" }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          maxWidth: "520px",
                          color: "text.secondary",
                        }}
                      >
                        {tier.homepageNote}
                      </Typography>

                      <Button
                        component={Link}
                        href={tier.ctaHref}
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          px: 3,
                          py: 1.4,
                          bgcolor: "secondary.main",
                          color: "background.paper",
                          boxShadow: "none",
                          whiteSpace: "nowrap",
                          "&:hover": {
                            bgcolor: "secondary.main",
                            filter: "brightness(1.05)",
                            boxShadow: "none",
                          },
                        }}
                      >
                        {tier.ctaLabel}
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
