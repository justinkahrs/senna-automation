import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

const fromRoot = (value) => fileURLToPath(new URL(value, import.meta.url));

export default defineConfig({
  site: "https://www.senna-automation.com",
  output: "static",
  integrations: [react()],
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
