"use client";

import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { authClient } from "@/lib/auth-client";

interface PortalSignOutButtonProps {
  variant?: "contained" | "outlined" | "text";
}

export function PortalSignOutButton({
  variant = "outlined",
}: PortalSignOutButtonProps) {
  const [pending, setPending] = useState(false);

  const handleSignOut = async () => {
    try {
      setPending(true);
      await authClient.signOut();
      window.location.assign("/login");
    } catch (error) {
      console.error("[Portal] Sign-out failed", error);
      setPending(false);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={() => void handleSignOut()}
      disabled={pending}
      startIcon={
        pending ? <CircularProgress size={16} color="inherit" /> : undefined
      }
      sx={{
        borderRadius: "999px",
      }}
    >
      Sign out
    </Button>
  );
}
