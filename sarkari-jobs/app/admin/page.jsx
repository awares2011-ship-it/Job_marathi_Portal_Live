// app/admin/page.jsx

// ✅ FIX: define t globally (works in server + client)
if (typeof globalThis !== "undefined") {
  globalThis.t = (v) => v;
}

// ✅ Server Component — NO "use client", NO Firebase, NO hooks
import dynamic from "next/dynamic";

const AdminClient = dynamic(() => import("./AdminClient"), { ssr: false });

export default function AdminPage() {
  return <AdminClient />;
}
