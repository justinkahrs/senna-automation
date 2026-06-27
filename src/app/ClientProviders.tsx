"use client";

import type React from "react";
import { ModalProvider } from "@/context/ModalContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  );
}
