"use client";
import { useEffect, useRef, useState } from "react";
import { Stack } from "@mui/material";
import type { StackProps } from "@mui/material/Stack";
import React from "react";

interface CascadingStaggerProps extends StackProps {
  children: React.ReactNode;
}

/**
 * A component that animates its children with a staggered "cascade" effect
 * starting from the top and moving down into position.
 */
export default function CascadingStagger({ children, spacing = 2, ...props }: CascadingStaggerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Stack spacing={spacing} {...props}>
        {React.Children.map(children, (child, index) => (
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translate3d(0, 0, 0)"
                : "translate3d(0, -20px, 0)",
              transition: [
                `opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.08}s`,
                `transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.08}s`,
              ].join(", "),
              willChange: "opacity, transform",
            }}
          >
            {child}
          </div>
        ))}
      </Stack>
    </div>
  );
}
