import Link from "next/link";
import { Button } from "@mui/material";

interface RequestFormButtonProps {
  text?: string;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  href?: string;
}

export default function RequestFormButton({
  text = "Custom Request",
  variant = "outlined",
  size = "medium",
  fullWidth = false,
  href = "/contact",
}: RequestFormButtonProps) {
  return (
    <Button 
      component={Link} 
      href={href} 
      variant={variant} 
      size={size} 
      fullWidth={fullWidth}
      sx={{
        borderRadius: "50px",
        fontWeight: "bold",
        px: 3,
        ...(variant === "contained" && {
          backgroundColor: "#000000",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#333333",
          },
        }),
      }}
    >
      {text}
    </Button>
  );
}
