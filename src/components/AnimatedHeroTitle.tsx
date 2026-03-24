"use client";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function AnimatedHeroTitle() {
  const words = useRef([
    "scheduling",
    "follow-ups",
    "onboarding",
    "lead capture",
    "reporting",
    "invoicing",
    "qualification",
    "routing",
    "handoffs",
    "approvals",
    "reminders",
    "document prep",
    "status updates",
    "renewals",
    "data entry",
    "admin work",
    "the busywork",
  ]);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const current = words.current[index];

    if (isFinished) {
      return;
    }

    const isLastWord = index === words.current.length - 1;
    const speed = isDeleting ? 28 : 52;
    const pauseAfterWord = isLastWord ? 0 : 140;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (count < current.length) {
          setCount((c) => c + 1);
          return;
        }

        if (isLastWord) {
          setIsFinished(true);
          return;
        }

        setTimeout(() => setIsDeleting(true), pauseAfterWord);
        return;
      }

      if (count > 0) {
        setCount((c) => c - 1);
        return;
      }

      setIsDeleting(false);
      setIndex((i) => i + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [count, index, isDeleting, isFinished]);

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
        Let&apos;s take
      </Typography>
      <Typography
        variant="h1"
        align="center"
        color="text.primary"
        sx={{ fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" } }}
      >
        {words.current[index].substring(0, count)}
        {!isFinished ? (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            style={{
              marginLeft: 2,
              display: "inline-block",
            }}
          >
            |
          </motion.span>
        ) : null}
      </Typography>
      <Typography
        variant="h1"
        align="center"
        color="text.primary"
        sx={{ fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" } }}
      >
        off your plate.
      </Typography>
    </motion.div>
  );
}
