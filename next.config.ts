import { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default;

const nextConfig: NextConfig = {
  // Your existing Next.js config here
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
  fallbacks: {
    document: "/offline",
  },
})(nextConfig);
