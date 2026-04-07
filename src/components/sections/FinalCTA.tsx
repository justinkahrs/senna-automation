"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ScheduleCallButton from "@/components/ScheduleCallButton";

interface FinalCTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function FinalCTA({
  title = "See what you can automate",
  subtitle = "We start with a free 30-min call to walk through your workflows. No commitment — just a clear picture of where you can save time.",
  buttonText = "Book a Demo",
}: FinalCTAProps) {
  return (
    <Box
      component="section"
      id="final-cta"
      sx={{
        color: "var(--color-text-inverse)",
        py: { xs: 8, md: 12 },
        textAlign: "center",
        position: "relative",
        overflow: "visible",
        isolation: "isolate",
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
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "50%",
          width: "100vw",
          height: { xs: "calc(100% + 80rem)", md: "calc(100% + 48rem)" },
          transform: "translateX(-50%)",
          background:
            "linear-gradient(-45deg, var(--color-accent), var(--ds-shadow-grey), var(--color-accent))",
          backgroundSize: "400% 400%",
          animation: "gradientBG 15s ease infinite",
          pointerEvents: "none",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "50%",
          width: "100vw",
          height: { xs: "calc(100% + 80rem)", md: "calc(100% + 48rem)" },
          transform: "translateX(-50%)",
          opacity: 0.03,
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            mb: 2, 
            color: "var(--color-bg-subtle)" 
            }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ 
            color: "var(--color-accent-cyan)", 
            mb: 4,
            fontWeight: 500 
          }}
        >
          {subtitle}
        </Typography>
        <Stack spacing={2} alignItems="center">
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
              }
            }}
            showIcon={false}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "var(--color-text-on-dark-secondary)",
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
          <Typography variant="caption" sx={{ color: "var(--color-text-on-dark-muted)" }}>
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
                }
              }}
            >
              Contact us
            </Button>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
