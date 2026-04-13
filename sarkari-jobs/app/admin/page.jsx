// app/admin/page.jsx
if (typeof window !== "undefined") { window.t = (v) => v; }
// ✅ Server Component — NO "use client", NO Firebase, NO hooks
import dynamic from "next/dynamic";

const AdminClient = dynamic(() => import("./AdminClient"), { ssr: false });

export default function AdminPage() {
  return <AdminClient />;
}
