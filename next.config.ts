import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "orange-space-guacamole-r969xqw4w5xh5xp9-3000.app.github.dev"
        // Add any other domains your application might be deployed on
      ]
    }
  }
};

export default nextConfig;
