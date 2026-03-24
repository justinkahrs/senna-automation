import Link from "next/link";
import { Button } from "@mui/material";

interface RequestFormButtonProps {
  text?: string;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export default function RequestFormButton({
  text = "Custom Request",
  variant = "outlined",
  size = "medium",
  fullWidth = false,
}: RequestFormButtonProps) {
  return (
    <Button component={Link} href="/contact" variant={variant} size={size} fullWidth={fullWidth}>
      {text}
    </Button>
  );
}
