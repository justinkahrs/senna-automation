"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./PortfolioCard.module.css";

interface PortfolioCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  previewHeight?: number;
  duration?: number;
  className?: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  imageSrc,
  href,
  previewHeight = 260,
  duration = 8,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [travelDistance, setTravelDistance] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Measure content to determine travel distance
  const measure = useCallback(() => {
    if (containerRef.current && imageRef.current) {
      const containerH = containerRef.current.offsetHeight;
      const imageH = imageRef.current.offsetHeight;
      const dist = Math.max(0, imageH - containerH);
      setTravelDistance(dist);
    }
  }, []);

  // Re-measure on load and resize
  useEffect(() => {
    measure();

    // ResizeObserver for robustness
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    resizeObserver.observe(containerRef.current);
    if (imageRef.current) {
      resizeObserver.observe(imageRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [measure, imageSrc]); // Re-run if src changes

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.cardWrapper} ${className}`}
      onHoverStart={() => !shouldReduceMotion && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => !shouldReduceMotion && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className={styles.previewContainer}
        style={{ height: previewHeight }}
        ref={containerRef}
      >
        <motion.img
          ref={imageRef}
          src={imageSrc}
          alt={`${title} Screenshot`}
          className={styles.image}
          initial={{ y: 0 }}
          animate={{
            y: isHovered && !shouldReduceMotion ? -travelDistance : 0,
          }}
          transition={{
            duration: isHovered ? duration : 0.8,
            ease: isHovered ? "linear" : "easeOut",
          }}
          onLoad={measure}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </motion.a>
  );
};

export default PortfolioCard;
