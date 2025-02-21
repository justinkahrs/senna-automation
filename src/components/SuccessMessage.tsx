"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Fade } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Script from "next/script";

export default function SuccessMessage() {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    setShowFirst(true);
  }, []);

  useEffect(() => {
    if (showFirst) {
      const timer = setTimeout(() => {
        setShowSecond(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showFirst]);

  useEffect(() => {
    if (showSecond) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showSecond, router]);

  return (
    <>
      <Script id="gtag-event" strategy="afterInteractive">
        {`
          gtag('event', 'ads_conversion_Book_appointment_1', {
            // <event_parameters>
          });
        `}
      </Script>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Fade in={showFirst} timeout={500}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Got it!
          </Typography>
        </Fade>
        <Fade in={showSecond} timeout={500}>
          <Typography variant="h4">We will be in touch soon!</Typography>
        </Fade>
      </Box>
    </>
  );
}
