"use client";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface Props {
  mode: "dark" | "light";
  onToggle: () => void;
}

const ClickableArea = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(2),
  display: "inline-flex",
  borderRadius: theme.shape.borderRadius,
}));

export default function ThemeToggleIcon({ mode, onToggle }: Props) {
  const [spinAngle, setSpinAngle] = useState(0);
  const handleClick = () => {
    setSpinAngle((prev) => prev + 360);
    onToggle();
  };

  const IconComponent = mode === "dark" ? DarkModeIcon : LightModeIcon;

  return (
    <ClickableArea onClick={handleClick}>
      <motion.div
        animate={{ rotate: spinAngle }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <IconButton edge="start" color="inherit" aria-label="menu">
          <IconComponent color="inherit" fontSize="medium" />
        </IconButton>
      </motion.div>
    </ClickableArea>
  );
}
