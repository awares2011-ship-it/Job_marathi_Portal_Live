// app/jobs/page.jsx - Jobs Listing (SSG with client-side filtering)
import JobsClient from "./JobsClient";
import jobsData from "@/data/jobs.json";
import { breadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Latest Govt Jobs 2026 – MPSC, Police, Railway, Bank | SarkariJobs",
  description:
    "Browse 30,000+ latest Government Jobs 2026. Filter by MPSC, Police, Railway, Bank, UPSC. Apply online with direct links. Updated daily.",
  keywords:
    "सरकारी नोकरी 2026, MPSC Jobs, Police Bharti, Railway Jobs, Bank Jobs, Maharashtra Govt Jobs",
  alternates: { canonical: "/jobs" },
};

export default function JobsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Jobs", href: "/jobs" },
            ])
          ),
        }}
      />
      <JobsClient jobs={jobsData} />
    </>
  );
}
