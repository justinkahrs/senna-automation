"use client";

import { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import styles from "./SennaAdvantageVideo.module.css";

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
    <div className={styles.wrapper}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={styles.video}
      >
        <source src="/home-work.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      <IconButton
        onClick={handleTogglePlayback}
        aria-label={isPaused ? "Play homepage video" : "Pause homepage video"}
        aria-pressed={!isPaused}
        className={styles.button}
      >
        {isPaused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
      </IconButton>
    </div>
  );
}
