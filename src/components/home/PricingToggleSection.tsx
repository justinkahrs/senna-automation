"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { alpha } from "@mui/material/styles";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import {
  growthTier,
  sharedPricingTiers,
  starterTier,
} from "@/components/pricing/tierData";

const tierMap = {
  [starterTier.id]: starterTier,
  [growthTier.id]: growthTier,
};

export default function PricingToggleSection() {
  const [activeTierId, setActiveTierId] = useState<"starter" | "growth">(
    starterTier.id
  );

  const activeTier = useMemo(() => tierMap[activeTierId], [activeTierId]);

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "primary.main",
        color: "background.paper",
        py: { xs: 8, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 20%, var(--color-bg-on-dark-16), transparent 40%), radial-gradient(circle at 80% 30%, var(--color-bg-on-dark-border), transparent 36%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={{ xs: 4, md: 5 }}>
          <Box
            sx={{
              maxWidth: "1120px",
              mx: "auto",
              borderRadius: { xs: 4, md: 5 },
              bgcolor: "var(--color-bg-on-dark-hover)",
              border: "1px solid",
              borderColor: "var(--color-bg-on-dark-16)",
              px: { xs: 3, sm: 4, md: 6 },
              py: { xs: 4, md: 5 },
              backdropFilter: "blur(8px)",
            }}
          >
            <Stack spacing={{ xs: 2.5, md: 3 }}>
              <Box sx={{ maxWidth: "860px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    p: 0.5,
                    mb: 2.5,
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid",
                    borderColor: "var(--color-bg-on-dark-22)",
                    bgcolor: "var(--color-bg-on-dark-hover)",
                    width: { xs: "100%", sm: "fit-content" },
                  }}
                >
                  {sharedPricingTiers.map((tier) => {
                    const active = tier.id === activeTierId;

                    return (
                      <Button
                        key={tier.id}
                        onClick={() => setActiveTierId(tier.id)}
                        disableElevation
                        sx={{
                          flex: { xs: 1, sm: "initial" },
                          minWidth: { xs: 0, md: 112 },
                          px: { xs: 1, sm: 2 },
                          py: 0.85,
                          borderRadius: "var(--radius-pill)",
                          bgcolor: active ? "secondary.main" : "transparent",
                          color: "background.paper",
                          fontSize: { xs: "0.68rem", sm: "0.75rem", md: "0.78rem" },
                          fontWeight: active ? 700 : 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                          "&:hover": {
                            bgcolor: active
                              ? "secondary.main"
                              : "var(--color-bg-on-dark-hover)",
                          },
                        }}
                      >
                        {tier.toggleLabel}
                      </Button>
                    );
                  })}
                </Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: "var(--color-text-on-dark-prominent)",
                    display: "block",
                    mb: 2,
                  }}
                >
                  {activeTier.eyebrow}
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    maxWidth: "980px",
                    mb: 3,
                    color: "background.paper",
                  }}
                >
                  {activeTier.homepageHeadline}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    maxWidth: "760px",
                    color: "var(--color-text-on-dark-strong)",
                  }}
                >
                  {activeTier.homepageDescription}
                </Typography>
              </Box>

              <Stack
                direction="column"
                spacing={1.5}
                alignItems="flex-start"
                sx={{ mt: { xs: 0.5, md: 1 } }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: "620px",
                    color: "var(--color-text-on-dark-prominent)",
                  }}
                >
                  {activeTier.homepageNote}
                </Typography>

                <Button
                  component={Link}
                  href={activeTier.ctaHref}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    mt: { xs: 2.5, md: 3 },
                    px: 3,
                    py: 1.4,
                    bgcolor: "background.paper",
                    color: "secondary.main",
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      bgcolor: "background.paper",
                      boxShadow: "none",
                    },
                  }}
                >
                  {activeTier.ctaLabel}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
