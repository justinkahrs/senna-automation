"use client";

import Link from "@/compat/next/link";
import { Button } from "@mui/material";
import { WARM_BLACK } from "@/components/theme/colors";
import { trackCta } from "@/utils/analytics";

interface RequestFormButtonProps {
  text?: string;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  href?: string;
  sx?: any;
  ariaLabel?: string;
}

export default function RequestFormButton({
  text = "Custom Request",
  variant = "outlined",
  size = "medium",
  fullWidth = false,
  href = "/contact",
  sx = {},
  ariaLabel,
}: RequestFormButtonProps) {
  const requestActionAttributes = {
    toolname: "request_assessment",
    tooldescription:
      "Open the relevant page to request a workflow assessment or next-step conversation.",
  } as const;

  return (
    <Button 
      component={Link} 
      href={href} 
      variant={variant} 
      size={size} 
      fullWidth={fullWidth}
      onClick={() => trackCta(text)}
      aria-label={ariaLabel ?? text}
      {...requestActionAttributes}
      sx={{
        borderRadius: "var(--radius-pill)",
        fontWeight: "bold",
        px: 2,
        ...(variant === "contained" && {
          backgroundColor: WARM_BLACK,
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: WARM_BLACK,
          },
        }),
        ...sx,
      }}
    >
      {text}
    </Button>
  );
}
