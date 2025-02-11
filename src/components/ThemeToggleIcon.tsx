"use client";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface Props {
  mode: "dark" | "light";
  onToggle: () => void;
}

export default function ThemeToggleIcon({ mode, onToggle }: Props) {
  const [spinAngle, setSpinAngle] = useState(0);
  const handleClick = () => {
    setSpinAngle((prev) => prev + 360);
    onToggle();
  };

  const IconComponent = mode === "dark" ? DarkModeIcon : LightModeIcon;

  return (
    <Box onClick={handleClick} sx={{ cursor: "pointer" }}>
      <motion.div
        animate={{ rotate: spinAngle }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <IconComponent color="inherit" fontSize="medium" />
      </motion.div>
    </Box>
  );
}
