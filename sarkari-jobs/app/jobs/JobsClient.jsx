"use client";
// app/jobs/JobsClient.jsx
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import JobCard from "@/components/JobCard";
import { AdBanner } from "@/components/Cards";

const CATEGORIES = ["All", "MPSC", "UPSC", "Railway", "Bank", "Police", "SSC", "ZP", "NMK"];
const PER_PAGE = 9;

export default function JobsClient({ jobs }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("cat") || "All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [query, category, sortBy]);

  const filtered = useMemo(() => {
    let list = [...jobs];

    // Search filter
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (j) =>
          j.title?.toLowerCase().includes(q) ||
          j.department?.toLowerCase().includes(q) ||
          j.category?.toLowerCase().includes(q) ||
          j.location?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category !== "All") {
      list = list.filter((j) => j.category === category);
    }

    // Sort
    switch (sortBy) {
      case "newest":
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "posts":
        list.sort((a, b) => b.posts - a.posts);
        break;
      case "deadline":
        list.sort(
          (a, b) =>
            new Date(a.importantDates?.applicationEnd) -
            new Date(b.importantDates?.applicationEnd)
        );
        break;
    }

    return list;
  }, [jobs, query, category, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="container-main py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Latest Govt Jobs 2026
        </h1>
        <p className="text-gray-500">
          {filtered.length} jobs found{category !== "All" ? ` in ${category}` : ""}
          {query ? ` for "${query}"` : ""}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Job शोधा..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-50 text-sm"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-400 text-sm font-medium bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="posts">Most Posts</option>
            <option value="deadline">Deadline Soon</option>
          </select>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                category === cat
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Top ad */}
      <AdBanner slot="2233445566" format="horizontal" height={90} className="mb-6 rounded-xl" />

      {/* Results */}
      {paginated.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.map((job, idx) => (
              <div key={job.id}>
                <JobCard job={job} />
                {/* Insert ad every 6 jobs */}
                {(idx + 1) % 6 === 0 && idx + 1 < paginated.length && (
                  <div className="sm:col-span-2 lg:col-span-3 mt-2">
                    <AdBanner slot="3344556677" format="horizontal" height={90} className="rounded-xl" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                ← Prev
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                      page === p
                        ? "bg-primary-600 text-white shadow-sm"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              {totalPages > 5 && <span className="text-gray-400">...</span>}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">कोणताही Job सापडला नाही</h3>
          <p className="text-gray-400 mb-6">
            "{query || category}" साठी कोणताही job नाही. वेगळा शब्द वापरून पाहा.
          </p>
          <button
            onClick={() => { setQuery(""); setCategory("All"); }}
            className="btn-outline"
          >
            Filter हटवा
          </button>
        </div>
      )}
    </div>
  );
}
