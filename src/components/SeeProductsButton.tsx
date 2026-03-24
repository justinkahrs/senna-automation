import { Button } from "@mui/material";
import Link from "next/link";

interface SeeProductsButtonProps {
  text?: string;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export default function SeeProductsButton({
  text = "See Products",
  variant = "outlined",
  size = "medium",
  fullWidth = false,
}: SeeProductsButtonProps) {
  return (
    <Button
      component={Link}
      href="/products"
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      sx={{ textDecoration: "none" }}
    >
      {text}
    </Button>
  );
}
