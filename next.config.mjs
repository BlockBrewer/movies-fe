import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Explicitly define public runtime config for better visibility
  // Note: NEXT_PUBLIC_* vars are embedded at build time
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3025",
    NEXT_PUBLIC_API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || "v1",
    NEXT_PUBLIC_API_DEBUG: process.env.NEXT_PUBLIC_API_DEBUG || "false",
  },
  // Configure output for Amplify
  output: "standalone",
};

export default withNextIntl(nextConfig);
