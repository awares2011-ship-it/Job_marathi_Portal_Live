// app/jobs/[slug]/page.jsx - Job Detail Page (SSG)
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, AdBanner } from "@/components/Cards";
import JobCard from "@/components/JobCard";
import jobsData from "@/data/jobs.json";
import { getJobMeta, jobPostingSchema, breadcrumbSchema } from "@/lib/seo";
import { formatDateEn, daysLeft, getCategoryColor } from "@/lib/utils";

// SSG: pre-generate all job pages at build time
export async function generateStaticParams() {
  return jobsData.map((job) => ({ slug: job.slug }));
}

// Dynamic metadata per job
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = jobsData.find((j) => j.slug === slug);
  if (!job) return { title: "Job Not Found" };
  return getJobMeta(job);
}

export default async function JobDetailPage({ params }) {
  const { slug } = await params;
  const job = jobsData.find((j) => j.slug === slug);
  if (!job) notFound();

  const remaining = daysLeft(job.importantDates?.applicationEnd);
  const isExpired = remaining !== null && remaining < 0;
  const isUrgent = remaining !== null && remaining <= 7 && remaining >= 0;
  const catColor = getCategoryColor(job.category);

  // Related jobs (same category, excluding current)
  const related = jobsData
    .filter((j) => j.category === job.category && j.id !== job.id)
    .slice(0, 3);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: job.title, href: `/jobs/${job.slug}` },
  ];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema(job)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />

      <div className="container-main py-6 lg:py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Breadcrumb crumbs={crumbs} />

            {/* Job Header Card */}
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                <div className={`shrink-0 w-16 h-16 rounded-2xl ${catColor.badge} flex items-center justify-center shadow-md`}>
                  <span className="text-white text-lg font-extrabold">{job.category?.slice(0, 2)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {job.isNew && <span className="badge bg-green-100 text-green-700">✅ New</span>}
                    {job.isTrending && <span className="badge bg-orange-100 text-orange-700">🔥 Trending</span>}
                    <span className={`badge ${catColor.bg} ${catColor.text}`}>{job.category}</span>
                  </div>
                  <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-1">
                    {job.title}
                  </h1>
                  <p className="text-gray-500 font-medium">{job.department}</p>
                </div>
              </div>

              {/* Apply deadline alert */}
              {!isExpired && (
                <div className={`p-4 rounded-xl mb-5 ${
                  isUrgent
                    ? "bg-orange-50 border border-orange-200 text-orange-800"
                    : "bg-blue-50 border border-blue-200 text-blue-800"
                }`}>
                  <p className="font-bold flex items-center gap-2">
                    {isUrgent ? "⚡ Urgent!" : "📅 Application Deadline:"}
                    <span>{isUrgent ? `Only ${remaining} days left!` : formatDateEn(job.importantDates?.applicationEnd)}</span>
                  </p>
                </div>
              )}
              {isExpired && (
                <div className="p-4 rounded-xl mb-5 bg-red-50 border border-red-200 text-red-700">
                  <p className="font-bold">❌ This job application has expired.</p>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Total Posts", value: job.posts?.toLocaleString("en-IN") },
                  { label: "Location", value: job.location },
                  { label: "Qualification", value: job.qualification },
                  { label: "Age Limit", value: `${job.ageMin}–${job.ageMax} yrs` },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 font-medium mb-1">{stat.label}</p>
                    <p className="font-bold text-gray-900 text-sm">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Salary */}
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl mb-5">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-xs text-green-600 font-medium">Pay Scale</p>
                  <p className="font-bold text-green-800 text-lg">{job.salary}</p>
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-primary flex-1 text-center text-base py-4 ${isExpired ? "opacity-50 cursor-not-allowed" : ""}`}
                  
                >
                  {isExpired ? "❌ Expired" : "✅ Online Apply करा"}
                </a>
                <a
                  href={job.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-center text-sm"
                >
                  Official Website →
                </a>
              </div>
            </div>

            {/* Ad */}
            <AdBanner slot="4455667788" format="horizontal" height={90} className="rounded-xl" />

            {/* Important Dates */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                📅 महत्त्वाच्या तारखा (Important Dates)
              </h2>
              <table className="info-table">
                <tbody>
                  {[
                    { label: "Notification Date", value: job.importantDates?.notificationDate },
                    { label: "Application Start", value: job.importantDates?.applicationStart },
                    { label: "Application End", value: job.importantDates?.applicationEnd },
                    { label: "Admit Card", value: job.importantDates?.admitCardDate },
                    { label: "Exam Date", value: job.importantDates?.examDate },
                  ].map(({ label, value }) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td className={
                        label === "Application End" && isUrgent
                          ? "text-orange-600"
                          : label === "Application End" && isExpired
                          ? "text-red-500"
                          : ""
                      }>
                        {value ? formatDateEn(value) : "To be announced"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Eligibility */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📋 पात्रता (Eligibility)</h2>
              <ul className="space-y-2">
                {job.eligibility?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-2">Application Fee:</p>
                <div className="flex gap-4">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">General</p>
                    <p className="font-bold text-gray-800">₹{job.applicationFee?.general}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Reserved</p>
                    <p className="font-bold text-gray-800">₹{job.applicationFee?.reserved}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selection Process */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 निवड प्रक्रिया (Selection Process)</h2>
              <div className="flex flex-wrap gap-3">
                {job.selection?.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{step}</span>
                    {i < job.selection.length - 1 && (
                      <span className="text-gray-300 text-sm">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📝 संपूर्ण माहिती</h2>
              <p className="text-gray-700 leading-relaxed mb-3">{job.description}</p>
              {job.descriptionEn && (
                <p className="text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3">
                  {job.descriptionEn}
                </p>
              )}
            </div>

            {/* Ad */}
            <AdBanner slot="5566778899" format="rectangle" height={250} className="rounded-xl" />

            {/* FAQ */}
            {job.faq && job.faq.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5">
                  ❓ वारंवार विचारले जाणारे प्रश्न (FAQ)
                </h2>
                <div className="space-y-4">
                  {job.faq.map((item, i) => (
                    <div key={i} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                      <p className="font-bold text-gray-800 mb-2 flex items-start gap-2">
                        <span className="text-primary-600 shrink-0">Q.</span>
                        {item.q}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed flex gap-2">
                        <span className="text-green-600 font-bold shrink-0">A.</span>
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick Apply */}
            <div className="card p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">⚡ Quick Apply</h3>
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center mb-3"
              >
                Apply Now →
              </a>
              <a
                href={job.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full text-center text-sm"
              >
                Official Notification
              </a>

              <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Posts</span>
                  <span className="font-bold text-gray-800">{job.posts?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <span className={`badge ${catColor.bg} ${catColor.text}`}>{job.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Deadline</span>
                  <span className={`font-bold text-sm ${isUrgent ? "text-orange-600" : isExpired ? "text-red-500" : "text-gray-800"}`}>
                    {isExpired ? "Expired" : remaining === 0 ? "Today!" : `${remaining} days left`}
                  </span>
                </div>
              </div>
            </div>

            {/* Ad sidebar */}
            <AdBanner slot="6677889900" format="rectangle" height={250} className="rounded-xl" />

            {/* Telegram */}
            <div className="bg-gradient-to-br from-[#229ED9] to-[#1a7ab5] text-white rounded-2xl p-5">
              <p className="font-bold mb-2">📢 Job Alert Free मिळवा</p>
              <p className="text-blue-100 text-sm mb-3">Telegram वर Join करा</p>
              <a
                href={process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/sarkarijobs"}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white text-[#229ED9] font-bold text-center py-2 rounded-xl text-sm hover:bg-blue-50 transition-colors"
              >
                Join Channel →
              </a>
            </div>
          </div>
        </div>

        {/* Related Jobs */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">
              संबंधित भरत्या (Related Jobs)
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
