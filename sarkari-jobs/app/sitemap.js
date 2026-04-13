// app/sitemap.js - Auto-generated Sitemap (SSG)
import jobsData from "@/data/jobs.json";
import blogsData from "@/data/blogs.json";
import resultsData from "@/data/results.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkarijobs.com";

export default function sitemap() {
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/results`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/admit-card`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Job pages
  const jobPages = jobsData
    .filter((j) => j.isActive)
    .map((job) => ({
      url: `${SITE_URL}/jobs/${job.slug}`,
      lastModified: job.updatedAt || now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Blog pages
  const blogPages = blogsData
    .filter((b) => b.isPublished)
    .map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: blog.publishedAt || now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  // Result pages
  const resultPages = resultsData.map((r) => ({
    url: `${SITE_URL}/results/${r.slug}`,
    lastModified: r.resultDate || now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...jobPages, ...blogPages, ...resultPages];
}
