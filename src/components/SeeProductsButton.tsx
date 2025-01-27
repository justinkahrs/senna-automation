"use client";
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
    <Link href="/products" style={{ textDecoration: "none" }}>
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
      >
        {text}
      </Button>
    </Link>
  );
}