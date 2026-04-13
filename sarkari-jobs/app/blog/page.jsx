// app/blog/page.jsx - Blog Listing (SSG)
import { BlogCard, SectionHeader, AdBanner } from "@/components/Cards";
import blogsData from "@/data/blogs.json";
import { breadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Blog – MPSC Tips, Study Guide, Career Advice | SarkariJobs",
  description:
    "Read expert articles on MPSC preparation, government job tips, career advice and exam strategies. 800+ word SEO articles.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const blogs = blogsData.filter((b) => b.isPublished);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
            ])
          ),
        }}
      />

      <div className="container-main py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            उपयुक्त लेख & टिप्स
          </h1>
          <p className="text-gray-500">
            परीक्षेची तयारी, करिअर मार्गदर्शन आणि सरकारी नोकरीसाठी उपयुक्त माहिती
          </p>
        </div>

        <AdBanner slot="7788991100" format="horizontal" height={90} className="rounded-xl mb-6" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
}
