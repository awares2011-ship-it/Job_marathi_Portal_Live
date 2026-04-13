// components/JobCard.jsx - Server Component (no "use client" needed)
import Link from "next/link";
import { formatDateEn, daysLeft, getCategoryColor, formatNumber } from "@/lib/utils";

export default function JobCard({ job, compact = false }) {
  const remaining = daysLeft(job.importantDates?.applicationEnd);
  const catColor = getCategoryColor(job.category);
  const isExpired = remaining !== null && remaining < 0;
  const isUrgent = remaining !== null && remaining <= 5 && remaining >= 0;

  if (compact) {
    return (
      <Link
        href={`/jobs/${job.slug}`}
        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100"
      >
        <div className={`shrink-0 w-10 h-10 rounded-lg ${catColor.badge} flex items-center justify-center`}>
          <span className="text-white text-xs font-bold">
            {job.category?.slice(0, 2)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
            {job.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{formatNumber(job.posts)} posts</span>
            {job.importantDates?.applicationEnd && (
              <span className={`text-xs ${isExpired ? "text-red-500" : isUrgent ? "text-orange-500 font-semibold" : "text-gray-500"}`}>
                {isExpired
                  ? "• Expired"
                  : isUrgent
                  ? `• ${remaining}d left ⚡`
                  : `• ${formatDateEn(job.importantDates.applicationEnd)}`}
              </span>
            )}
          </div>
        </div>
        {job.isNew && (
          <span className="shrink-0 badge bg-green-100 text-green-700 text-[10px]">NEW</span>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="card card-hover group block animate-fade-in"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            {/* Category icon */}
            <div className={`shrink-0 w-12 h-12 rounded-xl ${catColor.badge} flex items-center justify-center shadow-sm`}>
              <span className="text-white text-sm font-extrabold">
                {job.category?.slice(0, 2)}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                {job.title}
              </h3>
              <p className="text-gray-500 text-xs mt-0.5 font-medium">{job.department}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            {job.isNew && (
              <span className="badge bg-green-100 text-green-700">NEW</span>
            )}
            {job.isTrending && (
              <span className="badge bg-orange-100 text-orange-700">🔥 Trending</span>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 my-4 bg-gray-50 rounded-xl p-3">
          <div className="text-center">
            <p className="text-xs text-gray-400 font-medium">Posts</p>
            <p className="text-sm font-bold text-gray-800">{formatNumber(job.posts)}</p>
          </div>
          <div className="text-center border-x border-gray-200">
            <p className="text-xs text-gray-400 font-medium">Salary</p>
            <p className="text-[11px] font-bold text-gray-800 leading-tight">{job.salary}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 font-medium">Location</p>
            <p className="text-[11px] font-bold text-gray-800">{job.location}</p>
          </div>
        </div>

        {/* Important dates */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.importantDates?.applicationEnd && (
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
              isExpired
                ? "bg-red-50 text-red-600"
                : isUrgent
                ? "bg-orange-50 text-orange-600 animate-pulse-slow"
                : "bg-blue-50 text-blue-600"
            }`}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {isExpired
                ? "Expired"
                : isUrgent
                ? `Only ${remaining} days left!`
                : `Last: ${formatDateEn(job.importantDates.applicationEnd)}`}
            </div>
          )}
          <span className={`badge text-xs px-3 py-1.5 ${catColor.bg} ${catColor.text}`}>
            {job.category}
          </span>
          <span className="badge bg-gray-100 text-gray-600 text-xs px-3 py-1.5">
            {job.qualification}
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-primary-600 font-semibold text-sm group-hover:text-primary-700 flex items-center gap-1">
            पूर्ण माहिती पाहा
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          {job.views && (
            <span className="text-xs text-gray-400">👁 {formatNumber(job.views)} views</span>
          )}
        </div>
      </div>
    </Link>
  );
}
