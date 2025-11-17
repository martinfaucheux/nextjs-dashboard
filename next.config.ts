import { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig: NextConfig = {
  // Your existing Next.js config here
};

export default withPWA({
  dest: "public",
  register: true,
})(nextConfig);
