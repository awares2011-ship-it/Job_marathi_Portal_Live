// lib/seo.js - SEO metadata & structured data utilities

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkarijobs.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "SarkariJobs Maharashtra";

// ─── Base metadata ────────────────────────────────────────────────────────────
export const baseMetadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    locale: "mr_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sarkarijobsmr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

// ─── Job page metadata ────────────────────────────────────────────────────────
export const getJobMeta = (job) => ({
  title: `${job.title} | ${job.posts} जागा | ${SITE_NAME}`,
  description: job.descriptionEn?.slice(0, 160) || `Apply for ${job.title}. ${job.posts} posts available. Last date: ${job.importantDates?.applicationEnd}`,
  keywords: [
    job.title,
    job.department,
    job.category,
    "सरकारी नोकरी",
    "Sarkari Job",
    `${job.category} bharti 2026`,
    "Maharashtra govt jobs",
  ].join(", "),
  openGraph: {
    title: `${job.title} – ${job.posts} Posts | Apply Now`,
    description: job.descriptionEn?.slice(0, 200),
    url: `${SITE_URL}/jobs/${job.slug}`,
    type: "article",
  },
  alternates: {
    canonical: `${SITE_URL}/jobs/${job.slug}`,
  },
});

// ─── Blog page metadata ───────────────────────────────────────────────────────
export const getBlogMeta = (blog) => ({
  title: `${blog.title} | ${SITE_NAME}`,
  description: blog.metaDescription || blog.excerpt,
  keywords: blog.tags?.join(", "),
  openGraph: {
    title: blog.title,
    description: blog.excerpt,
    url: `${SITE_URL}/blog/${blog.slug}`,
    type: "article",
    publishedTime: blog.publishedAt,
  },
  alternates: {
    canonical: `${SITE_URL}/blog/${blog.slug}`,
  },
});

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────
export const jobPostingSchema = (job) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.titleEn || job.title,
  description: job.descriptionEn || job.description,
  datePosted: job.importantDates?.notificationDate,
  validThrough: job.importantDates?.applicationEnd,
  employmentType: "FULL_TIME",
  hiringOrganization: {
    "@type": "Organization",
    name: job.department,
    sameAs: job.officialLink,
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: job.location,
      addressCountry: "IN",
    },
  },
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "INR",
    value: {
      "@type": "QuantitativeValue",
      value: job.salary,
      unitText: "MONTH",
    },
  },
  educationRequirements: job.qualification,
  url: `${SITE_URL}/jobs/${job.slug}`,
});

export const articleSchema = (blog) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: blog.title,
  description: blog.excerpt,
  author: { "@type": "Person", name: blog.author || "SarkariJobs Team" },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  datePublished: blog.publishedAt,
  url: `${SITE_URL}/blog/${blog.slug}`,
});

export const breadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${SITE_URL}${c.href}`,
  })),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Maharashtra Sarkari Jobs – Latest Govt Jobs, Results, Admit Cards 2026",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/jobs?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});
