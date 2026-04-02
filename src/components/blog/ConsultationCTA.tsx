"use client";
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import ScheduleCallButton from "@/components/ScheduleCallButton";

export const ConsultationCTA = () => {
  return (
    <Box
      sx={{
        mt: 16,
        bgcolor: "secondary.main",
        color: "background.paper",
        p: { xs: 6, md: 10 },
        borderRadius: 4,
        textAlign: "center",
        boxShadow: "var(--shadow-cta)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h2" gutterBottom color="inherit" sx={{ mb: 2 }}>
          Want to see this in your business?
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "var(--color-text-on-dark)", mb: 6, maxWidth: "560px", mx: "auto" }}
        >
          Book a free 30-minute call. We&apos;ll walk through your workflows and
          identify exactly where automation can save you time.
        </Typography>
        <Stack spacing={1.5} alignItems="center">
          <ScheduleCallButton
            text="Schedule a Call"
            size="large"
            showIcon={false}
            inverse
            sx={{ px: 6 }}
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
            No commitment. No prep needed.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
