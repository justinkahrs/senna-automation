import React from "react";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";

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
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
          pointerEvents: 'none'
        }
      }}
    >
      <Typography variant="h2" gutterBottom color="inherit" sx={{ mb: 2 }}>
        Need a smarter way to work?
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: "rgba(255,255,255,0.7)", mb: 6, maxWidth: "600px", mx: "auto" }}
      >
        Let's look at your current workflows and find the friction points
        together. Our AI-driven audit will reveal where you're losing time.
      </Typography>
      <Link href="/contact" passHref>
        <Button variant="contained" size="large" color="primary">
          Schedule a Consultation
        </Button>
      </Link>
    </Box>
  );
};
