"use client";
import { Box, CircularProgress } from "@mui/material";

export default function SubmittingOverlay() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
