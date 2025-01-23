import type { Metadata } from "next";
import Script from "next/script";
import { ClientProviders } from "./ClientProviders";
import { AppBar } from "@/components/layout/AppBar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";
export const metadata: Metadata = {
  title: "Senna Automation - Streamline Your Workflow",
  description: "Powerful automation tools for modern businesses",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="vtag-ai-js"
          src="https://r2.leadsy.ai/tag.js"
          async
          data-pid="5eWHMMjnfGOlrKfh"
          data-version="062024"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ClientProviders>
          <AppBar />
          <main
            style={{
              minHeight: "100vh",
              paddingTop: "64px", // Height of the AppBar
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
