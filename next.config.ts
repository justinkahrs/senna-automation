const nextConfig = {
  reactStrictMode: true,
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