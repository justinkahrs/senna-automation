import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

const allowedDevOrigins = Array.from(
  new Set([
    "localhost",
    "127.0.0.1",
    ...Object.values(networkInterfaces())
      .flat()
      .filter((address): address is NonNullable<typeof address> =>
        Boolean(address && address.family === "IPv4" && !address.internal),
      )
      .map((address) => address.address),
  ]),
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins,
  transpilePackages: ["framer-motion"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async headers() {
    const staticAssetCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=604800",
      },
    ];

    return [
      {
        source: "/images/:path*",
        headers: staticAssetCache,
      },
      {
        source: "/og/:path*",
        headers: staticAssetCache,
      },
      {
        source:
          "/:media(admin.webm|businessFormula.webm|dashboard.webm|home-work.mp4|leads.webm|visualContent.mp4)",
        headers: staticAssetCache,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/form-hook",
        destination: "https://hook.us2.make.com/vp8vpc4allsibttx61nk23bkw24etkrx"
      }
    ];
  }
};

export default nextConfig;
