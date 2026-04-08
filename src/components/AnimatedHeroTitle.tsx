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
        width: "100%",
        overflow: "visible",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        id="hero-heading"
        align="left"
        color="text.primary"
        sx={{
          fontFamily:
            '"itc-avant-garde-gothic-pro", system-ui, -apple-system, sans-serif',
          textAlign: { xs: "center", md: "left" },
          fontSize: "clamp(3.75rem, 9vw, 7rem)",
          lineHeight: 0.96,
          letterSpacing: "-0.04em",
          overflow: "visible",
          position: "relative",
        }}
      >
        <Box
          component="span"
          sx={{
            display: "block",
            fontSize: "0.9em",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Let the
        </Box>
        <Box
          component="span"
          sx={{
            display: "block",
            position: "relative",
            zIndex: 2,
            left: { xs: "-0.22em", md: "-0.34em" },
            fontFamily: '"posh", sans-serif',
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: { xs: "1.02em", sm: "1.1em", md: "1.18em" },
            lineHeight: 0.9,
            color: "var(--ds-space-indigo, #181925)",
            overflow: "visible",
            textShadow: {
              xs: "3px 3px 0 var(--ds-banana, #f7ec59)",
              sm: "4px 4px 0 var(--ds-banana, #f7ec59)",
              md: "6px 6px 0 var(--ds-banana, #f7ec59)",
            },
          }}
        >
          <Box
            component="span"
            sx={{
              fontFeatureSettings: '"ss01" 1, "salt" 1',
            }}
          >
            B
          </Box>
          usywork
        </Box>
        <Box
          component="span"
          sx={{
            display: "block",
            position: "relative",
            zIndex: 1,
            fontSize: "0.9em",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          handle itself.
        </Box>
      </Typography>
    </motion.div>
  );
}
