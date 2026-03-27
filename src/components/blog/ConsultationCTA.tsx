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
        boxShadow: "0 40px 100px rgba(0,0,0,0.15)",
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
          sx={{ color: "rgba(255,255,255,0.7)", mb: 6, maxWidth: "560px", mx: "auto" }}
        >
          Book a free 30-minute call. We&apos;ll walk through your workflows and
          identify exactly where automation can save you time.
        </Typography>
        <Stack spacing={1.5} alignItems="center">
          <ScheduleCallButton
            text="Schedule a Call"
            size="large"
            showIcon={false}
            sx={{ px: 6, backgroundColor: "primary.main", "&:hover": { backgroundColor: "primary.dark" } }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "rgba(255,255,255,0.55)",
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
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>
            No commitment. No prep needed.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
