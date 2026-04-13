"use client";
// components/BlogCard.jsx
import Link from "next/link";
import { formatDateEn } from "@/lib/utils";

export function BlogCard({ blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="card card-hover group block">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge bg-purple-100 text-purple-700 text-xs">{blog.category}</span>
          <span className="text-gray-400 text-xs">{blog.readTime} min read</span>
        </div>
        <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
          {blog.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">📅 {formatDateEn(blog.publishedAt)}</span>
          <span className="text-primary-600 font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
            वाचा <span>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

// components/ResultCard.jsx
export function ResultCard({ result }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-xl group">
      <div className="flex items-start gap-3">
        <div className={`shrink-0 w-2 h-2 rounded-full mt-2 ${
          result.status === "Declared" ? "bg-green-500" : "bg-orange-400"
        }`} />
        <div>
          <p className="font-semibold text-gray-800 text-sm group-hover:text-primary-600 transition-colors">
            {result.title}
          </p>
          <p className="text-gray-400 text-xs mt-0.5">{formatDateEn(result.resultDate)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`badge text-xs ${
          result.status === "Declared"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}>
          {result.status}
        </span>
        {result.downloadLink && (
          <a
            href={result.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-primary-600 hover:text-primary-800 transition-colors whitespace-nowrap"
            onClick={(e) => e.stopPropagation()}
          >
            Download →
          </a>
        )}
      </div>
    </div>
  );
}

// components/AdBanner.jsx - AdSense placeholder
export function AdBanner({ slot = "auto", format = "auto", className = "", height = 90 }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  if (!adsenseId) {
    // Show placeholder in development
    return (
      <div
        className={`ad-slot ${className}`}
        style={{ height }}
      >
        Advertisement ({format})
      </div>
    );
  }

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
        }}
      />
    </div>
  );
}

// components/Breadcrumb.jsx
export function Breadcrumb({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
      {crumbs.map((crumb, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-gray-300">/</span>}
          {i === crumbs.length - 1 ? (
            <span className="text-gray-700 font-medium line-clamp-1">{crumb.name}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-primary-600 transition-colors">
              {crumb.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

// components/SectionHeader.jsx
export function SectionHeader({ title, subtitle, viewAllHref, viewAllLabel = "सर्व पाहा" }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-primary-600 hover:text-primary-800 text-sm font-semibold flex items-center gap-1 shrink-0 ml-4"
        >
          {viewAllLabel}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}
