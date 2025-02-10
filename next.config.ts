const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/form-hook",
        destination: "https://hook.us2.make.com/utvv1tsaaawy4glvn6eikqgqxbjg6u5d"
      }
    ];
  }
};

export default nextConfig;