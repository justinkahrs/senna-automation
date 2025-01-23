"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ScheduleCallButtonProps {
  text?: string;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export default function ScheduleCallButton({
  text = "Schedule Call",
  variant = "contained",
  size = "medium",
  fullWidth = false,
}: ScheduleCallButtonProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Redirect to confirmation after closing
  };

  useEffect(() => {
    let isCalendlyInitialized = false;

    if (open) {
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );

      function initializeCalendlyWidget() {
        if (window.Calendly && !isCalendlyInitialized) {
          window.Calendly.initInlineWidget({
            url: "https://calendly.com/senna-automation/let-s-chat-ai-automation?hide_event_type_details=1&hide_gdpr_banner=1",
            parentElement: document.getElementById("calendly-inline-widget"),
          });
          isCalendlyInitialized = true;
        }
      }

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        script.onload = initializeCalendlyWidget;
        document.body.appendChild(script);
      } else {
        initializeCalendlyWidget();
      }
    }

    return () => {
      if (!open) {
        // Clean up Calendly widget when modal is closed
        const calendlyContainer = document.getElementById(
          "calendly-inline-widget"
        );
        if (calendlyContainer) {
          calendlyContainer.innerHTML = "";
        }
        isCalendlyInitialized = false;
      }
    };
  }, [open]);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleOpen}
        fullWidth={fullWidth}
      >
        {text}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            width: "100%",
            maxWidth: isMobile ? "95%" : "600px", // Smaller maxWidth on mobile
            maxHeight: "95vh",
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            p: 2, // Add padding for better spacing
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1, // Ensure it is on top of other elements
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <iframe
            src="https://calendly.com/senna-automation/let-s-chat-ai-automation?hide_event_type_details=1&hide_gdpr_banner=1"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Schedule a Call with Senna Automation"
          />
        </Box>
      </Modal>
    </>
  );
}
