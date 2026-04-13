"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import {
  login,
  logout,
  onAuth,
  getAll,
  create,
  update,
  remove,
  COLLECTIONS,
  slugify,
} from "@/lib/firebase";

// ─── Field wrapper ─────────────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Login Form ────────────────────────────────────────────────────────────
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch {
      setError("Invalid credentials. Check email & password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-extrabold text-xl">SJ</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">SarkariJobs CMS Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 text-sm"
              placeholder="admin@sarkarijobs.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-xl transition-colors"
          >
            {loading ? "Logging in..." : "🔐 Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Job Form ──────────────────────────────────────────────────────────────
const EMPTY_JOB = {
  title: "",
  department: "",
  posts: "",
  category: "MPSC",
  location: "Maharashtra",
  qualification: "",
  salary: "",
  ageMin: 18,
  ageMax: 38,
  description: "",
  descriptionEn: "",
  applyLink: "",
  officialLink: "",
  applicationFee: { general: 0, reserved: 0 },
  importantDates: {
    notificationDate: "",
    applicationStart: "",
    applicationEnd: "",
    examDate: "",
    admitCardDate: "",
  },
  isNew: true,
  isTrending: false,
  isActive: true,
  slug: "",
};

function JobForm({ initial, onSave, onCancel, saving }) {
  const base = initial ? { ...EMPTY_JOB, ...initial } : { ...EMPTY_JOB };
  const [form, setForm] = useState(base);

  function setField(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function setDateField(key, val) {
    setForm((prev) => ({
      ...prev,
      importantDates: { ...prev.importantDates, [key]: val },
    }));
  }

  function setFeeField(key, val) {
    setForm((prev) => ({
      ...prev,
      applicationFee: { ...prev.applicationFee, [key]: Number(val) },
    }));
  }

  useEffect(() => {
    if (form.title && !initial?.slug) {
      setField("slug", slugify(form.title));
    }
  }, [form.title]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  const DATE_FIELDS = [
    ["Notification Date", "notificationDate"],
    ["Application Start", "applicationStart"],
    ["Application End", "applicationEnd"],
    ["Admit Card Date", "admitCardDate"],
    ["Exam Date", "examDate"],
  ];

  const CATEGORIES = ["MPSC", "UPSC", "Railway", "Bank", "Police", "SSC", "ZP", "NMK"];

  const TOGGLE_FIELDS = [
    { key: "isNew", label: "New Badge" },
    { key: "isTrending", label: "Trending" },
    { key: "isActive", label: "Active" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Job Title" required>
          <input
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            required
            className="field-input"
            placeholder="MPSC Rajyaseva 2026"
          />
        </Field>

        <Field label="Department" required>
          <input
            value={form.department}
            onChange={(e) => setField("department", e.target.value)}
            required
            className="field-input"
          />
        </Field>

        <Field label="Slug (Auto)">
          <input
            value={form.slug}
            onChange={(e) => setField("slug", e.target.value)}
            className="field-input font-mono text-sm"
            placeholder="auto-generated"
          />
        </Field>

        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
            className="field-input"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Total Posts">
          <input
            type="number"
            value={form.posts}
            onChange={(e) => setField("posts", Number(e.target.value))}
            className="field-input"
          />
        </Field>

        <Field label="Location">
          <input
            value={form.location}
            onChange={(e) => setField("location", e.target.value)}
            className="field-input"
          />
        </Field>

        <Field label="Salary Range">
          <input
            value={form.salary}
            onChange={(e) => setField("salary", e.target.value)}
            className="field-input"
            placeholder="₹41,800 – ₹1,32,300"
          />
        </Field>

        <Field label="Qualification">
          <input
            value={form.qualification}
            onChange={(e) => setField("qualification", e.target.value)}
            className="field-input"
          />
        </Field>

        <Field label="Age Min">
          <input
            type="number"
            value={form.ageMin}
            onChange={(e) => setField("ageMin", Number(e.target.value))}
            className="field-input"
          />
        </Field>

        <Field label="Age Max">
          <input
            type="number"
            value={form.ageMax}
            onChange={(e) => setField("ageMax", Number(e.target.value))}
            className="field-input"
          />
        </Field>
      </div>

      <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide pt-2">
        Important Dates
      </h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {DATE_FIELDS.map(([label, key]) => (
          <Field key={key} label={label}>
            <input
              type="date"
              value={form.importantDates[key] || ""}
              onChange={(e) => setDateField(key, e.target.value)}
              className="field-input"
            />
          </Field>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="General Fee (₹)">
          <input
            type="number"
            value={form.applicationFee.general}
            onChange={(e) => setFeeField("general", e.target.value)}
            className="field-input"
          />
        </Field>

        <Field label="Reserved Fee (₹)">
          <input
            type="number"
            value={form.applicationFee.reserved}
            onChange={(e) => setFeeField("reserved", e.target.value)}
            className="field-input"
          />
        </Field>

        <Field label="Apply Link">
          <input
            type="url"
            value={form.applyLink}
            onChange={(e) => setField("applyLink", e.target.value)}
            className="field-input"
            placeholder="https://"
          />
        </Field>

        <Field label="Official Website">
          <input
            type="url"
            value={form.officialLink}
            onChange={(e) => setField("officialLink", e.target.value)}
            className="field-input"
            placeholder="https://"
          />
        </Field>
      </div>

      <Field label="Description (Marathi)">
        <textarea
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
          rows={3}
          className="field-input"
        />
      </Field>

      <Field label="Description (English)">
        <textarea
          value={form.descriptionEn}
          onChange={(e) => setField("descriptionEn", e.target.value)}
          rows={3}
          className="field-input"
        />
      </Field>

      <div className="flex gap-4">
        {TOGGLE_FIELDS.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form[key]}
              onChange={(e) => setField(key, e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-xl transition-colors"
        >
          {saving ? "Saving..." : "💾 Save Job"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────────────
export default function AdminPage() {
  // undefined = resolving, null = logged out, object = logged in
  const [user, setUser] = useState(undefined);
  const [activeTab, setActiveTab] = useState("jobs");

  const [jobs, setJobs] = useState([]);
  const [results, setResults] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [admitCards, setAdmitCards] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const [formMode, setFormMode] = useState(null); // "add" | "edit" | null
  const [editItem, setEditItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState(null);

  // Auth subscription — client-only, safe for Vercel
  useEffect(() => {
    const unsub = onAuth((u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  // Load all collections from Firestore
  async function loadData() {
    setDataLoading(true);
    try {
      const [j, r, b, a] = await Promise.all([
        getAll(COLLECTIONS.JOBS),
        getAll(COLLECTIONS.RESULTS),
        getAll(COLLECTIONS.BLOGS),
        getAll(COLLECTIONS.ADMIT_CARDS),
      ]);
      setJobs(j);
      setResults(r);
      setBlogs(b);
      setAdmitCards(a);
    } finally {
      setDataLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSaveJob(form) {
    setSaving(true);
    try {
      if (editItem && editItem.id) {
        await update(COLLECTIONS.JOBS, editItem.id, form);
        showToast("Job updated successfully!");
      } else {
        await create(COLLECTIONS.JOBS, form);
        showToast("Job added successfully!");
      }
      setFormMode(null);
      setEditItem(null);
      await loadData();
    } catch (err) {
      showToast("Error saving job: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(collection, id, name) {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await remove(collection, id);
      showToast("Deleted successfully!");
      await loadData();
    } catch (err) {
      showToast("Error: " + err.message, "error");
    }
  }

  function getCollectionKey(tab) {
    const map = {
      jobs: "JOBS",
      results: "RESULTS",
      blogs: "BLOGS",
      admitCards: "ADMIT_CARDS",
    };
    return COLLECTIONS[map[tab]];
  }

  // ── Auth resolving
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 animate-pulse text-sm">Loading...</p>
      </div>
    );
  }

  // ── Not logged in
  if (user === null) {
    return <LoginForm />;
  }

  // ── Dashboard
  const TABS = [
    { id: "jobs",       label: "💼 Jobs",       count: jobs.length },
    { id: "results",    label: "📋 Results",     count: results.length },
    { id: "admitCards", label: "🎫 Admit Cards", count: admitCards.length },
    { id: "blogs",      label: "📝 Blogs",       count: blogs.length },
  ];

  const DATA_MAP = { jobs, results, admitCards, blogs };
  const currentData = DATA_MAP[activeTab] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white font-semibold text-sm ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {toast.type === "error" ? "❌" : "✅"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">SJ</span>
          </div>
          <div>
            <h1 className="font-extrabold text-gray-900 text-base">Admin Panel</h1>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
        >
          🚪 Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {TABS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
            >
              <p className="text-2xl font-extrabold text-gray-900">{t.count}</p>
              <p className="text-gray-500 text-sm">{t.label}</p>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl border border-gray-100 p-1.5 shadow-sm w-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                setFormMode(null);
                setEditItem(null);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === t.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Add Job Form */}
        {formMode === "add" && activeTab === "jobs" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">➕ Add New Job</h2>
            <JobForm
              onSave={handleSaveJob}
              onCancel={() => setFormMode(null)}
              saving={saving}
            />
          </div>
        )}

        {/* Edit Job Form */}
        {formMode === "edit" && editItem && activeTab === "jobs" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">✏️ Edit Job</h2>
            <JobForm
              initial={editItem}
              onSave={handleSaveJob}
              onCancel={() => {
                setFormMode(null);
                setEditItem(null);
              }}
              saving={saving}
            />
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-50">
            <h2 className="font-bold text-gray-900 capitalize">
              {activeTab} ({currentData.length})
            </h2>
            {activeTab === "jobs" && (
              <button
                onClick={() => {
                  setFormMode("add");
                  setEditItem(null);
                }}
                className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors"
              >
                ➕ Add Job
              </button>
            )}
          </div>

          {dataLoading ? (
            <div className="p-8 text-center text-gray-400 animate-pulse">
              Loading data...
            </div>
          ) : currentData.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p className="text-4xl mb-3">📂</p>
              <p>No {activeTab} found. Add your first one!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">
                      Title
                    </th>
                    {activeTab === "jobs" && (
                      <>
                        <th className="text-left px-5 py-3 font-semibold text-gray-600">
                          Category
                        </th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-600">
                          Posts
                        </th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-600">
                          Status
                        </th>
                      </>
                    )}
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800 line-clamp-1">
                          {item.title}
                        </p>
                        {item.slug && (
                          <p className="text-xs text-gray-400 mt-0.5 font-mono">
                            {item.slug}
                          </p>
                        )}
                      </td>

                      {activeTab === "jobs" && (
                        <>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-medium">
                            {item.posts
                              ? Number(item.posts).toLocaleString("en-IN")
                              : "—"}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                item.isActive
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {item.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                        </>
                      )}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {activeTab === "jobs" && (
                            <button
                              onClick={() => {
                                setEditItem(item);
                                setFormMode("edit");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              ✏️ Edit
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleDelete(
                                getCollectionKey(activeTab),
                                item.id,
                                item.title
                              )
                            }
                            className="text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .field-input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          background: white;
          font-family: inherit;
          color: #1a202c;
        }
        .field-input:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15);
        }
        textarea.field-input {
          resize: vertical;
          min-height: 80px;
        }
      `}</style>
    </div>
  );
}
