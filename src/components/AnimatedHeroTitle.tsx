"use client";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function AnimatedHeroTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: "1rem",
      }}
    >
      {/* H1 — uses theme h1: Cormorant, clamp(2.75rem,5.5vw,4.209rem), w600, lh1.10 */}
      <Typography
        variant="h1"
        align="center"
        color="text.primary"
        sx={{ mb: 3 }}
      >
        You&apos;ve got a lot going on.
      </Typography>

      {/* H3 used as tagline — Cormorant, lighter weight, readable scale */}
      <Typography
        variant="h3"
        component="div"
        align="center"
        color="text.secondary"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 0.5, sm: 1 },
          fontWeight: 400,
        }}
      >
        <span>Let&apos;s take</span>
        <Box
          component="span"
          sx={{
            color: "primary.main",
            fontWeight: 600,
          }}
        >
          the busywork
        </Box>
        <span>off your plate.</span>
      </Typography>
    </motion.div>
  );
}
