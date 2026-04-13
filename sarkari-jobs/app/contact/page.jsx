// app/contact/page.jsx
export const metadata = {
  title: "Contact Us | SarkariJobs Maharashtra",
  description: "Contact SarkariJobs Maharashtra for queries, job submissions, or advertising.",
};

export default function ContactPage() {
  return (
    <div className="container-main py-12 max-w-2xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-8">We typically respond within 24 hours.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {[
          { icon: "📧", label: "Email", value: "contact@sarkarijobs.com", href: "mailto:contact@sarkarijobs.com" },
          { icon: "📢", label: "Telegram", value: "@sarkarijobs_mr", href: process.env.NEXT_PUBLIC_TELEGRAM_LINK || "#" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="card p-5 hover:border-primary-200 transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <p className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{item.label}</p>
            <p className="text-gray-500 text-sm">{item.value}</p>
          </a>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-bold text-gray-900 mb-4">Send a Message</h2>
        <p className="text-gray-500 text-sm mb-4">
          Please email us directly at{" "}
          <a href="mailto:contact@sarkarijobs.com" className="text-primary-600 font-semibold">
            contact@sarkarijobs.com
          </a>{" "}
          for:
        </p>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>• Job submission / correction requests</li>
          <li>• Advertising enquiries</li>
          <li>• Content partnership</li>
          <li>• Technical issues</li>
        </ul>
      </div>
    </div>
  );
}
