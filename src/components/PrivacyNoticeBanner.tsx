"use client";

import { useEffect, useState } from "react";
import { Box, Button, Fade, Stack, Typography } from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

const STORAGE_KEY = "senna_privacy_notice_acknowledged";

export default function PrivacyNoticeBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      setIsVisible(localStorage.getItem(STORAGE_KEY) !== "true");
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Storage can be unavailable in restricted browser contexts.
    }

    setIsVisible(false);
  };

  return (
    <Fade in={isVisible} unmountOnExit>
      <Box
        role="status"
        aria-live="polite"
        sx={{
          position: "fixed",
          left: { xs: "var(--space-4)", sm: "var(--space-6)" },
          right: { xs: "var(--space-4)", sm: "auto" },
          bottom: {
            xs: "calc(var(--space-16) + var(--space-5))",
            sm: "var(--space-6)",
          },
          zIndex: "calc(var(--z-toast) - 1)",
          width: {
            xs: "auto",
            sm: "min(560px, calc(100vw - var(--space-12)))",
          },
          pointerEvents: "auto",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 3 }}
          alignItems={{ xs: "stretch", sm: "center" }}
          sx={{
            p: { xs: 2, sm: 2.25 },
            border: "1px solid var(--color-border-soft)",
            borderRadius: "var(--radius-2xl)",
            backgroundColor:
              "color-mix(in srgb, var(--color-bg-paper) 94%, transparent)",
            backdropFilter: "blur(14px)",
            boxShadow: "var(--shadow-dialog)",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="flex-start"
            sx={{ flex: 1 }}
          >
            <Box
              aria-hidden="true"
              sx={{
                width: 36,
                height: 36,
                flex: "0 0 36px",
                borderRadius: "var(--radius-pill)",
                display: "grid",
                placeItems: "center",
                color: "var(--color-accent)",
                backgroundColor: "var(--color-bg-accent-subtle)",
                border: "1px solid var(--color-border-neutral-light)",
              }}
            >
              <VerifiedUserOutlinedIcon sx={{ fontSize: 20 }} />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="p"
                sx={{
                  color: "var(--color-text-primary)",
                  fontSize: "var(--type-body)",
                  fontWeight: "var(--weight-semibold)",
                  lineHeight: "var(--leading-snug)",
                  mb: 0.5,
                }}
              >
                Senna Automation takes your privacy seriously.
              </Typography>
              <Typography
                component="p"
                sx={{
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--type-body-sm)",
                  lineHeight: "var(--leading-normal)",
                }}
              >
                We do not use tracking cookies. Site traffic is measured
                anonymously with{" "}
                <a
                  href="https://umami.is"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline" }}
                >
                  Umami
                </a>
                .
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            onClick={handleDismiss}
            sx={{
              alignSelf: { xs: "flex-start", sm: "center" },
              borderRadius: "var(--radius-pill)",
              px: 2.25,
              py: 1,
              minWidth: 96,
              color: "var(--color-text-inverse)",
              backgroundColor: "var(--color-accent)",
              fontSize: "var(--type-button)",
              fontWeight: "var(--weight-semibold)",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "var(--color-accent-light)",
                boxShadow: "none",
              },
              "&:active": {
                transform: "translateY(1px)",
              },
            }}
          >
            Thanks!
          </Button>
        </Stack>
      </Box>
    </Fade>
  );
}
