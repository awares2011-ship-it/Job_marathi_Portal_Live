"use client";
"use client";
// components/SearchBar.jsx
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import jobsData from "@/data/jobs.json";

export default function SearchBar({ placeholder = "MPSC, Police, Railway, Bank... शोधा", large = false }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = jobsData
        .filter(
          (j) =>
            j.title.toLowerCase().includes(query.toLowerCase()) ||
            j.category.toLowerCase().includes(query.toLowerCase()) ||
            j.department.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/jobs?q=${encodeURIComponent(query.trim())}`);
      setFocused(false);
    }
  };

  const handleSelect = (job) => {
    router.push(`/jobs/${job.slug}`);
    setQuery("");
    setFocused(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={handleSearch}>
        <div className={`flex items-center gap-2 bg-white rounded-2xl shadow-lg border-2 transition-colors ${
          focused ? "border-primary-400" : "border-white"
        } ${large ? "p-2 pl-5" : "p-1.5 pl-4"}`}>
          <svg
            className={`shrink-0 text-gray-400 ${large ? "w-5 h-5" : "w-4 h-4"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={placeholder}
            className={`flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 ${
              large ? "text-base py-1" : "text-sm py-0.5"
            }`}
          />
          <button
            type="submit"
            className={`shrink-0 btn-primary ${large ? "px-7 py-3 text-base" : "px-5 py-2 text-sm"}`}
          >
            शोधा
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {focused && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {suggestions.map((job) => (
            <button
              key={job.id}
              onClick={() => handleSelect(job)}
              className="w-full flex items-center gap-3 px-5 py-3 hover:bg-blue-50 text-left transition-colors border-b border-gray-50 last:border-0"
            >
              <div className={`w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0`}>
                <span className="text-primary-700 text-xs font-bold">{job.category?.slice(0, 2)}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 line-clamp-1">{job.title}</p>
                <p className="text-xs text-gray-400">{job.posts} posts • {job.location}</p>
              </div>
            </button>
          ))}
          <button
            onClick={handleSearch}
            className="w-full px-5 py-3 text-sm text-primary-600 font-semibold hover:bg-primary-50 transition-colors text-center"
          >
            "{query}" साठी सर्व परिणाम पाहा →
          </button>
        </div>
      )}
    </div>
  );
}
