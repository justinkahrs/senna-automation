"use client";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { keyframes } from "@emotion/react";

export default function AnimatedHeroTitle() {
  const [ellipsis, setEllipsis] = useState("");
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = useRef(["work.", "business.", "day.", "life."]);
  const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;
  useEffect(() => {
    if (ellipsis.length < 3) {
      const timer = setTimeout(() => setEllipsis((e) => `${e}.`), 500);
      return () => clearTimeout(timer);
    }
  }, [ellipsis]);

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
    >
      <Typography
        variant="h1"
        align="center"
        sx={{ fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" } }}
      >
        Let&apos;s automate...
      </Typography>
      <Typography
        variant="h1"
        align="center"
        sx={{ fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" } }}
      >
        {`your ${words.current[index].substring(0, count)}`}
        <motion.span
          style={{
            marginLeft: 2,
            display: "inline-block",
            animation: `${blink} 0.8s infinite steps(1)`,
          }}
        >
          |
        </motion.span>
      </Typography>
    </motion.div>
  );
}
