"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import ScheduleCallButton from "@/components/ScheduleCallButton";

import { usePathname } from "next/navigation";

interface FinalCTAProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  buttonText?: string;
  sx?: SxProps<Theme>;
  containerMaxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  titleSx?: SxProps<Theme>;
  subtitleSx?: SxProps<Theme>;
  buttonSx?: SxProps<Theme>;
  calendlyLogoSx?: SxProps<Theme>;
  viaSx?: SxProps<Theme>;
  showContactLink?: boolean;
  showTexture?: boolean;
  stackSpacing?: number | string;
  transparentBackground?: boolean;
}

export default function FinalCTA({
  title = "See what you can automate",
  subtitle = "We start with a free 30-min call to walk through your workflows. No commitment — just a clear picture of where you can save time.",
  buttonText = "Book a Demo",
  sx,
  containerMaxWidth = "sm",
  titleSx,
  subtitleSx,
  buttonSx,
  calendlyLogoSx,
  viaSx,
  showContactLink = true,
  showTexture = true,
  stackSpacing = 2,
  transparentBackground,
}: FinalCTAProps) {
  const pathname = usePathname();
  const isExtended = ["/blog", "/pricing", "/services", "/solutions"].some(p => pathname.startsWith(p));
  const isTransparent = transparentBackground || isExtended;

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
        <Stack spacing={stackSpacing} alignItems="center">
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
          />
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
              src="/Calendly.svg"
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
          {showContactLink && (
            <Typography
              variant="caption"
              sx={{ color: "var(--color-text-on-dark-muted)" }}
            >
              Prefer a form?{" "}
              <Button
                component={Link}
                href="/contact"
                variant="text"
                size="small"
                sx={{
                  color: "var(--color-text-on-dark-subtle)",
                  p: 0,
                  minWidth: 0,
                  textDecoration: "underline",
                  fontSize: "inherit",
                  "&:hover": {
                    color: "var(--color-accent-cyan)",
                    textDecoration: "underline",
                  },
                }}
              >
                Contact us
              </Button>
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
