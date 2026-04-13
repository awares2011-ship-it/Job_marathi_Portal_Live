/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export capable
  // output: "export",  // ❌ removed for Vercel dynamic support

  // Image optimization
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // unoptimized: true ❌ removed (Vercel handles optimization)
  },

  // Compress responses
  compress: true,

  // Strict mode for better React patterns
  reactStrictMode: true,

  // ✅ ADD: ensure clean modern build
  swcMinify: true,

  // ✅ ADD: disable caching issues during build
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // ✅ ADD: disable browser caching (VERY IMPORTANT)
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

module.exports = nextConfig;
