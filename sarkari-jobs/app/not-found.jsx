// app/not-found.jsx - Custom 404 Page
import Link from "next/link";

export const metadata = {
  title: "404 – Page Not Found | SarkariJobs Maharashtra",
};

export default function NotFound() {
  return (
    <div className="container-main py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-8xl mb-6">😕</div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          404 – Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          हे पृष्ठ सापडले नाही. कदाचित हे job expired झाले असेल किंवा link चुकीचा असेल.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            🏠 मुख्यपृष्ठ
          </Link>
          <Link href="/jobs" className="btn-outline">
            💼 सर्व Jobs पाहा
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-gray-400 text-sm mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "MPSC Jobs", href: "/jobs?cat=MPSC" },
              { label: "Police Bharti", href: "/jobs?cat=Police" },
              { label: "Railway Jobs", href: "/jobs?cat=Railway" },
              { label: "Results", href: "/results" },
              { label: "Blog", href: "/blog" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm bg-gray-100 hover:bg-primary-50 hover:text-primary-600 text-gray-600 px-4 py-2 rounded-full transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
