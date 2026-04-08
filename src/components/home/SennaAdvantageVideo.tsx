"use client";

import { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

export default function SennaAdvantageVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncPausedState = () => setIsPaused(video.paused);

    syncPausedState();
    video.addEventListener("play", syncPausedState);
    video.addEventListener("pause", syncPausedState);

    return () => {
      video.removeEventListener("play", syncPausedState);
      video.removeEventListener("pause", syncPausedState);
    };
  }, []);

  const handleTogglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: { xs: 280, sm: 340, md: "100%" },
        bgcolor: "var(--color-text-primary)",
        borderTopLeftRadius: { xs: 0, md: "12px" },
        borderBottomLeftRadius: { xs: 0, md: "12px" },
        overflow: "hidden",
      }}
    >
      <Box
        ref={videoRef}
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 8%",
          display: "block",
        }}
      >
        <source src="/home-work.mp4" type="video/mp4" />
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom right, rgba(0,0,0,0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <IconButton
        onClick={handleTogglePlayback}
        aria-label={isPaused ? "Play homepage video" : "Pause homepage video"}
        aria-pressed={!isPaused}
        sx={{
          position: "absolute",
          right: { xs: 12, md: 16 },
          bottom: { xs: 12, md: 16 },
          width: 44,
          height: 44,
          bgcolor: "rgba(24,25,37,0.72)",
          color: "var(--color-text-inverse)",
          border: "1px solid rgba(255,255,255,0.22)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 10px 24px rgba(24,25,37,0.22)",
          "&:hover": {
            bgcolor: "rgba(24,25,37,0.84)",
          },
          "&:focus-visible": {
            outline: "2px solid var(--color-highlight)",
            outlineOffset: 2,
          },
        }}
      >
        {isPaused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
      </IconButton>
    </Box>
  );
}
