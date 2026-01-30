"use client";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function AnimatedHeroTitle() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = useRef(["work.", "business.", "day."]);

  useEffect(() => {
    const current = words.current[index];
    let speed = 150;
    if (isDeleting) speed /= 2;
    const timeout = setTimeout(() => {
      setCount((c) => c + (isDeleting ? -1 : 1));
      if (!isDeleting && count === current.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && count === 0) {
        setIsDeleting(false);
        setIndex((i) => (i + 1) % words.current.length);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [count, index, isDeleting]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        color="text.primary"
        sx={{ fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" } }}
      >
        Let&apos;s automate...
      </Typography>
      <Typography
        variant="h1"
        align="center"
        color="text.primary"
        sx={{ fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" } }}
      >
        {`your ${words.current[index].substring(0, count)}`}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          style={{
            marginLeft: 2,
            display: "inline-block",
          }}
        >
          |
        </motion.span>
      </Typography>
    </motion.div>
  );
}
