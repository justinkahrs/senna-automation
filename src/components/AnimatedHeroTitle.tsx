"use client";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function AnimatedHeroTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: "1rem"
      }}
    >
      <Typography
        variant="h1"
        align="center"
        color="text.primary"
        sx={{ 
          fontSize: { xs: "3rem", md: "4.5rem", lg: "5rem" }, 
          fontWeight: 800,
          mb: 4,
          lineHeight: 1.1,
          letterSpacing: "-0.02em"
        }}
      >
        You&apos;ve got a lot going on.
      </Typography>

      <Typography
        variant="h4"
        component="div"
        align="center"
        color="text.secondary"
        sx={{ 
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem", lg: "2.3rem" },
          fontWeight: 400,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: { xs: 0.5, sm: 1 },
          lineHeight: 1.2
        }}
      >
        <span>Let&apos;s take</span>
        <Box
          component="span"
          sx={{ 
            color: "primary.main",
            fontWeight: 700,
          }}
        >
          the busywork
        </Box>
        <span>off your plate.</span>
      </Typography>
    </motion.div>
  );
}
