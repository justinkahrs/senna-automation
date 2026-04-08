"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isCalendlyOpen: boolean;
  setIsCalendlyOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isCalendlyOpen, setIsCalendlyOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
