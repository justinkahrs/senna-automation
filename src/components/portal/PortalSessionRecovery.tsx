"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function PortalSessionRecovery() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      try {
        const result = await authClient.getSession();

        if (!active) return;

        if (result.data?.user?.email) {
          window.location.replace("/portal");
          return;
        }
      } catch (error) {
        console.error("[Portal] Session recovery failed", error);
      } finally {
        if (active) {
          setChecking(false);
        }
      }
    };

    void checkSession();

    return () => {
      active = false;
    };
  }, []);

  if (!checking) {
    return null;
  }

  return null;
}
