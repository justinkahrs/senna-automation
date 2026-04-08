"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/utils/analytics";

/**
 * Client-side component that captures UTM parameters on initial page load.
 * Renders nothing — drop it once in the layout tree.
 */
export default function AnalyticsProvider() {
  useEffect(() => {
    captureUtmParams();
  }, []);

  return null;
}
