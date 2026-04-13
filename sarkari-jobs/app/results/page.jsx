// app/results/page.jsx - Results Page (SSG)
import { ResultCard, AdBanner } from "@/components/Cards";
import { breadcrumbSchema } from "@/lib/seo";
import resultsData from "@/data/results.json";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Sarkari Result 2026 – MPSC, Police, Railway Results | SarkariJobs",
  description:
    "Check latest government exam results 2026. MPSC, Maharashtra Police, UPSC, Railway results declared. Download result PDF.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Results", href: "/results" },
            ])
          ),
        }}
      />

      <div className="container-main py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              ताजे सरकारी निकाल 2026
            </h1>
            <p className="text-gray-500 mb-6">
              Latest Government Exam Results – Check your result here
            </p>

            <AdBanner slot="1133557799" format="horizontal" height={90} className="rounded-xl mb-6" />

            <div className="card divide-y divide-gray-50">
              {resultsData.length > 0 ? (
                resultsData.map((result) => (
                  <ResultCard key={result.id} result={result} />
                ))
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <p className="text-4xl mb-3">📋</p>
                  <p>अद्याप कोणताही निकाल उपलब्ध नाही.</p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-5">
            <AdBanner slot="2244668800" format="rectangle" height={250} className="rounded-xl" />

            <div className="card p-5">
              <h3 className="font-bold text-gray-900 mb-3">📢 Result Alert</h3>
              <p className="text-gray-500 text-sm mb-4">
                निकाल आल्यावर लगेच notification मिळवा
              </p>
              <a
                href={process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/sarkarijobs"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center text-sm"
              >
                📲 Telegram Join करा
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
