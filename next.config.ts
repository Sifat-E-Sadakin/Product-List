import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "dummyjson.com", //
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  },
  distDir: "build",
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
