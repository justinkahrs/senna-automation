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
        <Script
          src="https://cdn.usefathom.com/script.js"
          data-site="ZENVGNJZ"
          defer
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.usefathom.com/script.js"
          data-site="ZENVGNJZ"
          defer
          strategy="afterInteractive"
        />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16832579878"
          async
        />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XWW3M708ZP');
    `,
          }}
        />
      </head>
      <body>
        <ClientProviders>
          <AppBar />
          <main
            style={{
              minHeight: "100vh",
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
