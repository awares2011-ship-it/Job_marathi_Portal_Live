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

  // Bundle analyzer (comment out in prod)
  // bundleAnalyzer: { enabled: process.env.ANALYZE === 'true' },

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


