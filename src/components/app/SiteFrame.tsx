"use client";

import { Footer } from "@/components/layout/Footer";
import { AppBar } from "@/components/layout/AppBar";
import { PathnameProvider } from "@/compat/next/navigation";
import MuiProviders from "@/components/app/MuiProviders";

export default function SiteFrame({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  return (
    <MuiProviders>
      <PathnameProvider pathname={pathname}>
        <AppBar />
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 10,
          }}
        >
          {children}
        </main>
        <Footer currentYear={new Date().getFullYear()} />
      </PathnameProvider>
    </MuiProviders>
  );
}
