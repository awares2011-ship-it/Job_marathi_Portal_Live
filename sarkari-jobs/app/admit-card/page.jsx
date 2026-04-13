// app/admit-card/page.jsx - Admit Cards (SSG)
import Link from "next/link";
import { AdBanner } from "@/components/Cards";
import admitCardsData from "@/data/admitCards.json";
import { breadcrumbSchema } from "@/lib/seo";
import { formatDateEn } from "@/lib/utils";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Admit Card 2026 – Download Hall Ticket | SarkariJobs Maharashtra",
  description:
    "Download latest Government Exam Admit Cards 2026. MPSC, Railway, Police, UPSC, Bank exam hall tickets available here.",
  alternates: { canonical: "/admit-card" },
};

export default function AdmitCardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Admit Cards", href: "/admit-card" },
            ])
          ),
        }}
      />

      <div className="container-main py-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          प्रवेशपत्र 2026 – Download करा
        </h1>
        <p className="text-gray-500 mb-6">
          All Government Exam Admit Cards / Hall Tickets 2026
        </p>

        <AdBanner slot="3355779911" format="horizontal" height={90} className="rounded-xl mb-6" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {admitCardsData.map((ac) => (
            <div key={ac.id} className="card p-5 group hover:border-primary-200 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="text-3xl">🎫</div>
                <span
                  className={`badge text-xs ${
                    ac.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {ac.status}
                </span>
              </div>

              <h2 className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                {ac.title}
              </h2>
              <p className="text-gray-500 text-sm mb-1">{ac.department}</p>
              <p className="text-xs text-gray-400 mb-4">
                📅 Exam: {formatDateEn(ac.examDate)}
              </p>

              <p className="text-gray-600 text-sm mb-4">{ac.description}</p>

              <a
                href={ac.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  ac.status === "Available"
                    ? "bg-primary-600 hover:bg-primary-700 text-white"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                
              >
                {ac.status === "Available" ? "⬇️ Download Now" : "⏳ Coming Soon"}
              </a>
            </div>
          ))}

          {admitCardsData.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 text-center py-16">
              <p className="text-5xl mb-4">🎫</p>
              <p className="text-gray-400">सध्या कोणतेही प्रवेशपत्र उपलब्ध नाही.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
