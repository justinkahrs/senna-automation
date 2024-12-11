import type { Metadata } from "next";
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
      <body>
        <ClientProviders>
          <AppBar />
          <main style={{ minHeight: "100vh" }}>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
