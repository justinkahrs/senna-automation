"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  ACCENT,
  BORDER_SOFT,
  STONE_600,
  WARM_BLACK,
} from "@/components/theme/colors";

interface ScheduleCallButtonProps {
  text?: string;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  sx?: any;
  showIcon?: boolean;
}

export default function ScheduleCallButton({
  text = "Schedule Call",
  variant = "contained",
  size = "medium",
  fullWidth = false,
  sx = {},
  showIcon = true,
}: ScheduleCallButtonProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Redirect to confirmation after closing
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleOpen}
        fullWidth={fullWidth}
        sx={{
          borderRadius: "50px",
          fontWeight: "bold",
          px: 3,
          ...(variant === "contained" && {
            backgroundColor: WARM_BLACK,
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: WARM_BLACK,
            },
          }),
          ...sx,
        }}
        endIcon={showIcon ? (
          <Box
            component="img"
            src="/Calendly.svg"
            alt="Calendly"
            sx={{
              height: "1.2rem",
              width: "auto",
              filter: variant === "contained" ? "brightness(0) invert(1)" : "none",
              ml: -0.5,
              mt: 0.4,
              verticalAlign: 'middle',
            }}
          />
        ) : undefined}
      >
        {text}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            sx: {
              background:
                "linear-gradient(180deg, rgba(28,25,23,0.68) 0%, rgba(28,25,23,0.78) 100%)",
              backdropFilter: "blur(8px)",
            },
          },
        }}
      >
        <Box
          sx={{
            borderRadius: 4,
            backgroundColor: "background.paper",
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: "0 32px 120px rgba(28,25,23,0.28)",
            width: "100%",
            maxWidth: mounted && isMobile ? "96%" : "980px",
            maxHeight: "96vh",
            display: "flex",
            flexDirection: "column",
            height: mounted && isMobile ? "94vh" : "92vh",
            overflow: "hidden",
            border: `1px solid ${BORDER_SOFT}`,
          }}
        >
          <Stack
            sx={{
              px: { xs: 2.5, md: 3 },
              pt: { xs: 2.25, md: 2.75 },
              pb: { xs: 2, md: 2.25 },
              borderBottom: `1px solid ${alpha(ACCENT, 0.12)}`,
              background:
                "linear-gradient(180deg, rgba(45,107,94,0.06) 0%, rgba(45,107,94,0.02) 100%)",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    color: WARM_BLACK,
                    fontSize: { xs: "1.65rem", md: "1.95rem" },
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    mb: 0.5,
                  }}
                >
                  Schedule a Call
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: STONE_600,
                    lineHeight: 1.65,
                    display: { xs: "none", md: "block" },
                  }}
                >
                  Pick a time that works for you. We&apos;ll walk through your
                  workflow, identify opportunities, and keep it practical.
                </Typography>
              </Box>
              <IconButton
                onClick={handleClose}
                sx={{
                  mt: 0.25,
                  border: `1px solid ${alpha(ACCENT, 0.14)}`,
                  bgcolor: alpha(ACCENT, 0.05),
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: alpha(ACCENT, 0.1),
                  },
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Box
            sx={{
              flex: 1,
              p: { xs: 1, md: 1.25 },
              bgcolor: alpha(ACCENT, 0.025),
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                overflow: "hidden",
                borderRadius: 3,
                bgcolor: "#FFFFFF",
                border: `1px solid ${BORDER_SOFT}`,
              }}
            >
              <iframe
                src="https://calendly.com/senna-automation/intro?hide_event_type_details=1&hide_gdpr_banner=1"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="Schedule a Call with Senna Automation"
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
