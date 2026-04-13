// app/blog/[slug]/page.jsx - Blog Detail (SSG)
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb, AdBanner } from "@/components/Cards";
import JobCard from "@/components/JobCard";
import blogsData from "@/data/blogs.json";
import jobsData from "@/data/jobs.json";
import { getBlogMeta, articleSchema, breadcrumbSchema } from "@/lib/seo";
import { formatDateEn } from "@/lib/utils";

export async function generateStaticParams() {
  return blogsData
    .filter((b) => b.isPublished)
    .map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const blog = blogsData.find((b) => b.slug === params.slug);
  if (!blog) return { title: "Blog Not Found" };
  return getBlogMeta(blog);
}

// Convert simple markdown-ish content to HTML
function renderContent(content) {
  if (!content) return "";
  return content
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith("### ")) return `<h3>${line.slice(4)}</h3>`;
      if (line.startsWith("- ")) return `<li>${line.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`;
      if (line.match(/^\d+\. /)) return `<li>${line.replace(/^\d+\. /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`;
      if (line.trim() === "") return "<br/>";
      return `<p>${line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`;
    })
    .join("\n");
}

export default function BlogDetailPage({ params }) {
  const blog = blogsData.find((b) => b.slug === params.slug);
  if (!blog || !blog.isPublished) notFound();

  // Related jobs
  const relatedJobs = jobsData
    .filter((j) => blog.relatedJobs?.includes(j.slug))
    .slice(0, 2);

  // Related blogs
  const relatedBlogs = blogsData
    .filter((b) => b.slug !== blog.slug && b.category === blog.category && b.isPublished)
    .slice(0, 3);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: blog.title, href: `/blog/${blog.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(blog)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />

      <div className="container-main py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Article */}
          <article className="lg:col-span-2">
            <Breadcrumb crumbs={crumbs} />

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="badge bg-purple-100 text-purple-700">{blog.category}</span>
              <span className="text-gray-400 text-sm">📅 {formatDateEn(blog.publishedAt)}</span>
              <span className="text-gray-400 text-sm">⏱ {blog.readTime} min read</span>
              <span className="text-gray-400 text-sm">👁 {blog.views?.toLocaleString("en-IN")} views</span>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-500 text-lg mb-6 leading-relaxed border-l-4 border-primary-200 pl-4">
              {blog.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags?.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Top Ad */}
            <AdBanner slot="8899001122" format="horizontal" height={90} className="rounded-xl mb-6" />

            {/* Content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
            />

            {/* Mid Ad */}
            <AdBanner slot="9900112233" format="rectangle" height={250} className="rounded-xl my-6" />

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  💼 संबंधित भरत्या
                </h3>
                <div className="space-y-3">
                  {relatedJobs.map((job) => (
                    <JobCard key={job.id} job={job} compact />
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 p-5 card">
              <h3 className="font-bold text-gray-700 mb-3">हा लेख शेअर करा</h3>
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(blog.title + " " + (process.env.NEXT_PUBLIC_SITE_URL || "") + "/blog/" + blog.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1ebe5d] transition-colors"
                >
                  📱 WhatsApp
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent((process.env.NEXT_PUBLIC_SITE_URL || "") + "/blog/" + blog.slug)}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#229ED9] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a8abf] transition-colors"
                >
                  ✈️ Telegram
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <AdBanner slot="0011223344" format="rectangle" height={250} className="rounded-xl sticky top-20" />

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
              <div className="card p-5">
                <h3 className="font-bold text-gray-900 mb-4">📚 Similar Articles</h3>
                <div className="space-y-4">
                  {relatedBlogs.map((b) => (
                    <Link key={b.id} href={`/blog/${b.slug}`} className="group block">
                      <p className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
                        {b.title}
                      </p>
                      <span className="text-xs text-gray-400">{b.readTime} min • {formatDateEn(b.publishedAt)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Telegram */}
            <div className="bg-gradient-to-br from-[#229ED9] to-[#1a7ab5] text-white rounded-2xl p-5">
              <p className="font-bold mb-2">📢 Free Job Alerts</p>
              <p className="text-blue-100 text-sm mb-3">Telegram वर Join करा</p>
              <a
                href={process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/sarkarijobs"}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white text-[#229ED9] font-bold text-center py-2 rounded-xl text-sm"
              >
                Join Now →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
