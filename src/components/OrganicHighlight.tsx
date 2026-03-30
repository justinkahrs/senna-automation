"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface OrganicHighlightProps {
  children: ReactNode;
}

export default function OrganicHighlight({
  children,
}: OrganicHighlightProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      initial={
        prefersReducedMotion
          ? { backgroundSize: "100% 100%, 100% 100%" }
          : { backgroundSize: "0% 100%, 0% 100%" }
      }
      whileInView={{ backgroundSize: "100% 100%, 100% 100%" }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "inline",
        padding: "0 0.22em",
        margin: "0 -0.06em",
        borderRadius: "0.2em 0.35em 0.18em 0.3em",
        backgroundImage:
          "linear-gradient(178deg, transparent 0 24%, rgba(212, 176, 92, 0.16) 24% 70%, transparent 70% 100%), linear-gradient(182deg, transparent 0 34%, rgba(212, 176, 92, 0.32) 34% 86%, transparent 86% 100%)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 0, 0 0",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </motion.span>
  );
}
