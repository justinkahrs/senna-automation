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
        "next/image": fromRoot("./src/compat/next/image.tsx"),
        "next/link": fromRoot("./src/compat/next/link.tsx"),
        "next/navigation": fromRoot("./src/compat/next/navigation.tsx"),
        "next/og": fromRoot("./src/compat/next/og.ts"),
        "next/script": fromRoot("./src/compat/next/script.tsx"),
        "next/server": fromRoot("./src/compat/next/server.ts"),
      },
    },
    ssr: {
      noExternal: ["framer-motion"],
    },
  },
});
