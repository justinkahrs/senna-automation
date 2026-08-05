"use client";

import Link from "@/compat/next/link";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import { trackContactLink, trackCta } from "@/utils/analytics";
import {
  captureAttribution,
  type ContentAttributionContext,
} from "@/utils/attribution";

interface FinalCTAProps extends ContentAttributionContext {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
  sx?: SxProps<Theme>;
  containerMaxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  titleSx?: SxProps<Theme>;
  subtitleSx?: SxProps<Theme>;
  buttonSx?: SxProps<Theme>;
  calendlyLogoSx?: SxProps<Theme>;
  viaSx?: SxProps<Theme>;
  showContactLink?: boolean;
  showCalendlyMeta?: boolean;
  showTexture?: boolean;
  stackSpacing?: number | string;
  transparentBackground?: boolean;
}

export default function FinalCTA({
  title = "See what you can automate",
  subtitle = "We start with a free 30-min call to walk through your workflows. No commitment — just a clear picture of where you can save time.",
  buttonText = "Book a Demo",
  buttonHref,
  sx,
  containerMaxWidth = "sm",
  titleSx,
  subtitleSx,
  buttonSx,
  calendlyLogoSx,
  viaSx,
  showContactLink = true,
  showCalendlyMeta = true,
  showTexture = true,
  stackSpacing = 2,
  transparentBackground,
  contentId,
  assetId,
  offerId,
  placement = "final-cta",
}: FinalCTAProps) {
  const isTransparent = Boolean(transparentBackground);
  const trackingContext = { contentId, assetId, offerId, placement };
  const analyticsContext = {
    content_id: contentId,
    asset_id: assetId,
    offer_id: offerId,
    placement,
  };

  return (
    <Box
      component="section"
      id="final-cta"
      sx={{
        background: isTransparent
          ? "transparent"
          : "linear-gradient(-45deg, var(--color-accent), var(--ds-shadow-grey), var(--color-accent))",
        backgroundSize: "400% 400%",
        color: "var(--color-text-inverse)",
        py: { xs: 8, md: 24 },
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        zIndex: isTransparent ? 2 : 1,
        "@keyframes gradientBG": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        animation: "gradientBG 15s ease infinite",
        ...sx,
      }}
    >
      {showTexture && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
            pointerEvents: "none",
          }}
        />
      )}
      <Container maxWidth={containerMaxWidth} sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            color: "var(--color-bg-subtle)",
            ...titleSx,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "var(--color-accent-cyan)",
            mb: 4,
            fontWeight: 500,
            ...subtitleSx,
          }}
        >
          {subtitle}
        </Typography>
        <Stack spacing={stackSpacing} sx={{
          alignItems: "center"
        }}>
          {buttonHref ? (
            <Button
              component={Link}
              href={buttonHref}
              variant="contained"
              size="large"
              onClick={() => {
                captureAttribution(trackingContext);
                trackCta(buttonText, analyticsContext);
              }}
              sx={{
                bgcolor: "var(--color-highlight)",
                color: "var(--color-text-primary)",
                "&:hover": {
                  bgcolor: "var(--color-highlight)",
                  opacity: 0.9,
                  boxShadow: "var(--shadow-lg)",
                },
                ...buttonSx,
              }}
            >
              {buttonText}
            </Button>
          ) : (
            <ScheduleCallButton
              text={buttonText}
              size="large"
              sx={{
                bgcolor: "var(--color-highlight)",
                color: "var(--color-text-primary)",
                "&:hover": {
                  bgcolor: "var(--color-highlight)",
                  opacity: 0.9,
                  boxShadow: "var(--shadow-lg)",
                },
                ...buttonSx,
              }}
              showIcon={false}
              {...trackingContext}
            />
          )}
          {showCalendlyMeta && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "var(--color-text-on-dark-secondary)",
                ...viaSx,
              }}
            >
              <Typography variant="caption" sx={{ color: "inherit" }}>
                via
              </Typography>
              <Box
                component="img"
                src="/images/calendly.svg"
                alt="Calendly"
                sx={{
                  height: "0.95rem",
                  width: "auto",
                  opacity: 0.9,
                  filter: "brightness(0) invert(1)",
                  mt: "3px",
                  ...calendlyLogoSx,
                }}
              />
            </Box>
          )}
          {showContactLink && (
            <Typography
              variant="body1"
              sx={{ color: "var(--color-text-on-dark-muted)" }}
            >
              Prefer a form?{" "}
              <Box
                component={Link}
                href="/contact"
                onClick={() => {
                  captureAttribution(trackingContext);
                  trackContactLink("FinalCTA Contact Link", analyticsContext);
                }}
                sx={{
                  display: "inline",
                  color: "var(--color-text-on-dark-subtle)",
                  textDecoration: "underline",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  "&:hover": {
                    color: "var(--color-accent-cyan)",
                    textDecoration: "underline",
                  },
                }}
              >
                Contact us
              </Box>
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
