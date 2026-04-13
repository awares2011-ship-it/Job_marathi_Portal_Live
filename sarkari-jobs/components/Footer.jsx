// components/Footer.jsx - Server Component
import Link from "next/link";

const jobCategories = [
  { label: "MPSC Jobs", href: "/jobs?cat=MPSC" },
  { label: "UPSC Jobs", href: "/jobs?cat=UPSC" },
  { label: "Railway Jobs", href: "/jobs?cat=Railway" },
  { label: "Bank Jobs", href: "/jobs?cat=Bank" },
  { label: "Police Bharti", href: "/jobs?cat=Police" },
  { label: "SSC Jobs", href: "/jobs?cat=SSC" },
  { label: "ZP Bharti", href: "/jobs?cat=ZP" },
  { label: "NMK Jobs", href: "/jobs?cat=NMK" },
];

const quickLinks = [
  { label: "Latest Jobs", href: "/jobs" },
  { label: "Results", href: "/results" },
  { label: "Admit Cards", href: "/admit-card" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-primary-700 via-blue-600 to-primary-700 py-8">
        <div className="container-main text-center">
          <h3 className="text-white text-xl font-bold mb-2">
            🔔 सरकारी नोकरीचे अपडेट मिळवा – FREE!
          </h3>
          <p className="text-blue-100 text-sm mb-5">
            Telegram आणि WhatsApp वर Join करा आणि सर्वात आधी भरतीची माहिती मिळवा
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/sarkarijobs"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#229ED9] hover:bg-[#1a8abf] text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.483c-.147.658-.537.819-1.084.509l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.194 1.003.131.875.737z" />
              </svg>
              Telegram Join करा
            </a>
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://whatsapp.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Join करा
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-extrabold text-sm">SJ</span>
              </div>
              <div>
                <div className="font-extrabold text-white text-lg leading-none">
                  Sarkari<span className="text-blue-400">Jobs</span>
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">Maharashtra</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              महाराष्ट्रातील सरकारी नोकरी, परीक्षा निकाल आणि प्रवेशपत्रांसाठी आपला विश्वासू स्रोत.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for latest Government Jobs, Results & Admit Cards in Maharashtra.
            </p>
          </div>

          {/* Job Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Job Categories
            </h4>
            <ul className="space-y-2">
              {jobCategories.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-gray-600">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-gray-600">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2 mb-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-gray-600">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="bg-gray-900 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">Contact</p>
              <a
                href="mailto:contact@sarkarijobs.com"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                contact@sarkarijobs.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {year} SarkariJobs Maharashtra. All rights reserved.</p>
          <p className="text-center">
            ⚠️ Disclaimer: We are not affiliated with any government body. Always verify from official websites.
          </p>
        </div>
      </div>
    </footer>
  );
}
