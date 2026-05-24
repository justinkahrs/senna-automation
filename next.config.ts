const nextConfig = {
  reactStrictMode: true,
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
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
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
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
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
