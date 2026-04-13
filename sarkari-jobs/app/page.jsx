// app/page.jsx - Homepage (Static Server Component - SSG)
import Link from "next/link";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import { BlogCard, ResultCard, SectionHeader, AdBanner } from "@/components/Cards";
import { breadcrumbSchema } from "@/lib/seo";
import jobsData from "@/data/jobs.json";
import resultsData from "@/data/results.json";
import blogsData from "@/data/blogs.json";

// SSG - This page is fully static
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

const categories = [
  { icon: "🏛️", label: "MPSC Jobs", href: "/jobs?cat=MPSC", count: "342+", color: "from-blue-500 to-blue-700" },
  { icon: "🚔", label: "Police Bharti", href: "/jobs?cat=Police", count: "12K+", color: "from-red-500 to-red-700" },
  { icon: "🚂", label: "Railway Jobs", href: "/jobs?cat=Railway", count: "8K+", color: "from-orange-500 to-orange-700" },
  { icon: "🏦", label: "Bank Jobs", href: "/jobs?cat=Bank", count: "4K+", color: "from-green-500 to-green-700" },
  { icon: "📋", label: "UPSC Jobs", href: "/jobs?cat=UPSC", count: "1K+", color: "from-purple-500 to-purple-700" },
  { icon: "📚", label: "SSC Jobs", href: "/jobs?cat=SSC", count: "2K+", color: "from-teal-500 to-teal-700" },
  { icon: "🏘️", label: "ZP Bharti", href: "/jobs?cat=ZP", count: "1.5K+", color: "from-indigo-500 to-indigo-700" },
  { icon: "📜", label: "All Jobs", href: "/jobs", count: "30K+", color: "from-gray-600 to-gray-800" },
];

const stats = [
  { label: "Active Jobs", value: "30,000+", icon: "💼" },
  { label: "Daily Visitors", value: "1 Lakh+", icon: "👥" },
  { label: "States Covered", value: "28+", icon: "🗺️" },
  { label: "Years Serving", value: "5+", icon: "⭐" },
];

export default function HomePage() {
  const latestJobs = jobsData.filter((j) => j.isActive).slice(0, 6);
  const trendingJobs = jobsData.filter((j) => j.isTrending).slice(0, 4);
  const latestResults = resultsData.slice(0, 4);
  const latestBlogs = blogsData.slice(0, 3);

  return (
    <>
      {/* JSON-LD Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: "मुख्यपृष्ठ", href: "/" }])
          ),
        }}
      />

      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-blue-900 text-white">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-saffron/5 rounded-full blur-2xl" />
        </div>

        <div className="container-main py-16 md:py-24 relative">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              🔥 2026 च्या नवीन भरत्या लाईव्ह आहेत!
            </span>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fade-in">
              <span className="block">Latest</span>
              <span className="text-gradient-saffron">Sarkari Jobs</span>
              <span className="block text-blue-200 text-3xl md:text-4xl mt-2">
                Maharashtra 2026
              </span>
            </h1>
            <p className="text-blue-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-100">
              MPSC, Police, Railway, Bank, UPSC सह सर्व सरकारी भरत्यांची माहिती एकाच ठिकाणी.
              रोज अपडेट होणारे निकाल आणि प्रवेशपत्रे.
            </p>

            {/* Search bar */}
            <div className="max-w-2xl mx-auto animate-slide-up delay-200">
              <SearchBar
                placeholder="MPSC, Police, Railway, Bank... शोधा"
                large
              />
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["MPSC 2026", "Police Bharti", "Railway NTPC", "UPSC CSE", "IBPS PO"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/jobs?q=${encodeURIComponent(tag)}`}
                    className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition-colors border border-white/10"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto animate-slide-up delay-300">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs text-blue-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 20C1200 0 960 40 720 20C480 0 240 40 0 20L0 40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── AD BANNER ─────────────────────────────────────────────── */}
      <div className="container-main py-4">
        <AdBanner slot="1234567890" format="horizontal" height={90} className="rounded-xl" />
      </div>

      {/* ── CATEGORIES ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-main">
          <SectionHeader
            title="Job Categories"
            subtitle="आपल्या पसंतीची श्रेणी निवडा"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat, i) => (
              <Link
                key={cat.label}
                href={cat.href}
                className={`group flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${cat.color} text-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl animate-fade-in`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-bold text-center leading-tight">{cat.label}</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST JOBS ───────────────────────────────────────────── */}
      <section className="section-alt">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main jobs grid */}
            <div className="lg:col-span-2">
              <SectionHeader
                title="नवीन सरकारी भरती 2026"
                subtitle="ताज्या जाहिराती – अर्ज करण्याची संधी सोडू नका!"
                viewAllHref="/jobs"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {latestJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/jobs" className="btn-primary">
                  सर्व भरत्या पाहा ({jobsData.length}+)
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending */}
              <div className="card p-5">
                <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                  🔥 Trending Jobs
                </h3>
                <div className="space-y-1">
                  {trendingJobs.map((job) => (
                    <JobCard key={job.id} job={job} compact />
                  ))}
                </div>
              </div>

              {/* Ad sidebar */}
              <AdBanner slot="0987654321" format="rectangle" height={250} className="rounded-xl" />

              {/* Telegram CTA */}
              <div className="bg-gradient-to-br from-[#229ED9] to-[#1a7ab5] text-white rounded-2xl p-5">
                <div className="text-2xl mb-2">📢</div>
                <h3 className="font-bold text-lg mb-2">Telegram Join करा</h3>
                <p className="text-blue-100 text-sm mb-4">
                  सरकारी नोकरीचे अपडेट सर्वात आधी मिळवा
                </p>
                <a
                  href={process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/sarkarijobs"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white text-[#229ED9] font-bold text-center py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Join Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AD BANNER MID ─────────────────────────────────────────── */}
      <div className="container-main py-2">
        <AdBanner slot="1122334455" format="horizontal" height={90} />
      </div>

      {/* ── RESULTS + ADMIT CARDS ─────────────────────────────────── */}
      <section className="section">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Results */}
            <div>
              <SectionHeader
                title="ताजे निकाल"
                subtitle="नुकतेच जाहीर झालेले परिणाम"
                viewAllHref="/results"
              />
              <div className="card divide-y divide-gray-50">
                {latestResults.map((result) => (
                  <ResultCard key={result.id} result={result} />
                ))}
              </div>
            </div>

            {/* Admit Cards */}
            <div>
              <SectionHeader
                title="प्रवेशपत्रे"
                subtitle="Download करा आणि परीक्षेला जा"
                viewAllHref="/admit-card"
              />
              <div className="card p-4 space-y-3">
                {[
                  { title: "MPSC PSI Admit Card 2026", date: "Available", slug: "mpsc-psi-admit-2026", isNew: true },
                  { title: "Railway NTPC Admit Card 2026", date: "Coming Soon", slug: "railway-ntpc-admit-2026", isNew: false },
                ].map((ac) => (
                  <Link
                    key={ac.slug}
                    href={`/admit-card/${ac.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-colors group border border-transparent hover:border-blue-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎫</span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm group-hover:text-primary-600 transition-colors">
                          {ac.title}
                        </p>
                        <p className={`text-xs mt-0.5 ${ac.date === "Available" ? "text-green-600 font-semibold" : "text-orange-500"}`}>
                          {ac.date}
                        </p>
                      </div>
                    </div>
                    {ac.isNew && <span className="badge bg-green-100 text-green-700 text-[10px]">NEW</span>}
                  </Link>
                ))}
                <Link href="/admit-card" className="btn-outline w-full text-sm mt-2">
                  सर्व प्रवेशपत्रे पाहा
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG SECTION ──────────────────────────────────────────── */}
      <section className="section-alt">
        <div className="container-main">
          <SectionHeader
            title="उपयुक्त लेख & टिप्स"
            subtitle="परीक्षेची तयारी, करिअर मार्गदर्शन आणि बरेच काही"
            viewAllHref="/blog"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TELEGRAM/WHATSAPP CTA ─────────────────────────────────── */}
      <section className="section bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="container-main text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              🔔 Notifications चुकवू नका!
            </h2>
            <p className="text-gray-600 mb-8">
              1 लाखाहून जास्त उमेदवारांसोबत आमच्या Telegram आणि WhatsApp Channel ला Join करा
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/sarkarijobs"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#229ED9] hover:bg-[#1a8abf] text-white font-bold px-8 py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.483c-.147.658-.537.819-1.084.509l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.194 1.003.131.875.737z" />
                </svg>
                Telegram Join करा (1L+ Members)
              </a>
              <a
                href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://whatsapp.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Channel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM AD ─────────────────────────────────────────────── */}
      <div className="container-main py-4">
        <AdBanner slot="9988776655" format="horizontal" height={90} />
      </div>
    </>
  );
}
