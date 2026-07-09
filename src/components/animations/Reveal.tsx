"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scaleFrom?: number;
  opacityFrom?: number;
  letterSpacingFrom?: number;
  letterSpacingTo?: number;
  trigger?: "mount" | "in-view";
  amount?: number;
  once?: boolean;
};

function buildTransform(x: number, y: number, scaleFrom: number) {
  const transforms = [];

  if (x || y) {
    transforms.push(`translate3d(${x}px, ${y}px, 0)`);
  }

  if (scaleFrom !== 1) {
    transforms.push(`scale(${scaleFrom})`);
  }

  return transforms.length ? transforms.join(" ") : "none";
}

export default function Reveal({
  children,
  className,
  style,
  delay = 0,
  duration = 0.6,
  x = 0,
  y = 0,
  scaleFrom = 1,
  opacityFrom = 0,
  letterSpacingFrom,
  letterSpacingTo,
  trigger = "mount",
  amount = 0.1,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger === "mount") {
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: amount },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [amount, once, trigger]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : opacityFrom,
        transform: isVisible
          ? "translate3d(0, 0, 0) scale(1)"
          : buildTransform(x, y, scaleFrom),
        letterSpacing:
          letterSpacingFrom === undefined && letterSpacingTo === undefined
            ? undefined
            : `${isVisible ? (letterSpacingTo ?? 0) : letterSpacingFrom ?? 0}px`,
        transition: [
          `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
          `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
          `letter-spacing ${duration}s ease ${delay}s`,
        ].join(", "),
        willChange: "opacity, transform, letter-spacing",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
