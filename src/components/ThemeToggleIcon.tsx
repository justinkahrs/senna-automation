"use client";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const sunPath =
  "M12 4.5c.83 0 1.5-.67 1.5-1.5V1.5C13.5.67 12.83 0 12 0s-1.5.67-1.5 1.5v1.5c0 .83.67 1.5 1.5 1.5zm6.36 3.6l1.06-1.06a1.49 1.49 0 0 0 0-2.12 1.49 1.49 0 0 0-2.12 0L16.24 6a1.49 1.49 0 0 0 0 2.12 1.49 1.49 0 0 0 2.12 0zM12 19.5c-.83 0-1.5.67-1.5 1.5V22.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-1.5c0-.83-.67-1.5-1.5-1.5zm-6.36-3.6a1.49 1.49 0 0 0 2.12 0 1.49 1.49 0 0 0 0-2.12L4.64 13.5a1.49 1.49 0 0 0-2.12 0 1.49 1.49 0 0 0 0 2.12l1.06 1.06zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm7.5 4.5h-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h1.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zM6 10.5H4.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5H6c.83 0 1.5-.67 1.5-1.5S6.83 10.5 6 10.5zm12.71 6.79l-1.06 1.06a1.49 1.49 0 0 0 0 2.12 1.49 1.49 0 0 0 2.12 0l1.06-1.06a1.49 1.49 0 0 0 0-2.12 1.49 1.49 0 0 0-2.12 0z";
const moonPath =
  "M9.37 5.51c-.07.36-.13.72-.16 1.09-.07.93.06 1.84.4 2.68s.86 1.62 1.53 2.28 1.4 1.19 2.28 1.53 1.75.47 2.68.4c.37-.03.73-.09 1.09-.16.29-.06.4-.46.18-.68-1.32-1.32-2.05-3.09-2.05-4.95 0-1.86.73-3.64 2.05-4.95.21-.21.11-.61-.18-.68-.36-.07-.72-.13-1.09-.16-.93-.07-1.84.06-2.68.4s-1.62.86-2.28 1.53-1.19 1.4-1.53 2.28-.47 1.75-.4 2.68z";
const variants = { light: { d: sunPath }, dark: { d: moonPath } };

interface Props {
  mode: "dark" | "light";
  onToggle: () => void;
}

export default function ThemeToggleIcon({ mode, onToggle }: Props) {
  const [spinAngle, setSpinAngle] = useState(0);
  const handleClick = () => {
    setSpinAngle(s => s + 360);
    onToggle();
  };
  return (
    <Box className="themeToggleIcon" onClick={handleClick}>
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        animate={{ rotate: spinAngle }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.path
          variants={variants}
          animate={mode}
          transition={{ duration: 0.5 }}
          fill="currentColor"
        />
      </motion.svg>
    </Box>
  );
}