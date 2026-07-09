import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import geoReady from "astro-geoready";

const fromRoot = (value) => fileURLToPath(new URL(value, import.meta.url));
const siteConfig = JSON.parse(
  readFileSync(new URL("./site.config.json", import.meta.url), "utf8"),
);

export default defineConfig({
  site: "https://www.senna-automation.com",
  output: "static",
  integrations: [
    react(),
    geoReady({
      siteName: siteConfig.siteName,
      description: siteConfig.siteDescription,
    }),
  ],
  adapter: vercel(),
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
    ],
  },
  vite: {
    resolve: {
      alias: {
        "@": fromRoot("./src"),
      },
    },
    ssr: {
      noExternal: ["framer-motion"],
    },
  },
});
