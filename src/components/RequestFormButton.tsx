import Link from "next/link";
import { Button } from "@mui/material";
import { WARM_BLACK } from "@/components/theme/colors";

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
          backgroundColor: WARM_BLACK,
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: WARM_BLACK,
          },
        }),
      }}
    >
      {text}
    </Button>
  );
}
