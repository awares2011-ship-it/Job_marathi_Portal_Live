// app/layout.jsx - Root Layout (Server Component)
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { baseMetadata, websiteSchema } from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  ...baseMetadata,
  title: {
    default: "SarkariJobs Maharashtra – Latest Govt Jobs, Results & Admit Cards 2026",
    template: "%s | SarkariJobs Maharashtra",
  },
  description:
    "Maharashtra's #1 platform for latest Sarkari Jobs, Exam Results, Admit Cards & Notifications. MPSC, Police, Railway, Bank, UPSC 2026 updates.",
  keywords:
    "सरकारी नोकरी 2026, MPSC भरती, Maharashtra govt jobs, Railway jobs, Police bharti, Bank jobs, Sarkari Result",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mr" className={poppins.variable}>
      <head>
        {/* ✅ GLOBAL FIX: define t BEFORE bundle loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof globalThis !== "undefined") {
                globalThis.t = function(v){ return v; };
              }
            `,
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}

        {/* Website JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </head>

      <body className="bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
