"use client";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const fetchCache = "force-no-store";
// app/admin/page.jsx - Admin Panel (Client Component - Firebase Dynamic)
import { useState, useEffect } from "react";
import {
  db,
  auth,
  COLLECTIONS,
  getAll,
  create,
  update,
  remove,
  login,
  logout,
  onAuth,
  slugify,
} from "@/lib/firebase";
import { orderBy } from "firebase/firestore";

// ─── Auth Gate ─────────────────────────────────────────────────────────────
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-extrabold text-xl">SJ</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">SarkariJobs CMS Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="field-input" placeholder="admin@sarkarijobs.com" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="field-input" placeholder="••••••••" />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Logging in..." : "🔐 Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ──────────────────────────────────────────────────────
export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuth((u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  // ✅ FIXED (removed useCallback)
  const loadData = async () => {
    if (!user) return;
    setDataLoading(true);
    const j = await getAll(COLLECTIONS.JOBS);
    setJobs(j);
    setDataLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <LoginForm />;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>

      {dataLoading ? (
        <p>Loading data...</p>
      ) : (
        <ul>
          {jobs.map((j) => (
            <li key={j.id}>{j.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}


