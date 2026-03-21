import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.9"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
