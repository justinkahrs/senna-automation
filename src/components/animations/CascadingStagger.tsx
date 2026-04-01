"use client";
import { motion } from "framer-motion";
import { Stack, StackProps } from "@mui/material";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface CascadingStaggerProps extends StackProps {
  children: React.ReactNode;
}

/**
 * A component that animates its children with a staggered "cascade" effect
 * starting from the top and moving down into position.
 */
export default function CascadingStagger({ children, spacing = 2, ...props }: CascadingStaggerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Stack spacing={spacing} {...props}>
        {React.Children.map(children, (child) => (
          <motion.div variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </Stack>
    </motion.div>
  );
}
