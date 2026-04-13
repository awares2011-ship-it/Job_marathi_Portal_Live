// app/robots.js
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkarijobs.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
