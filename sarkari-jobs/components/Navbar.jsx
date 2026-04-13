"use client";
"use client";
// components/Navbar.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "मुख्यपृष्ठ", labelEn: "Home", href: "/" },
  { label: "नवीन भरती", labelEn: "Jobs", href: "/jobs" },
  { label: "निकाल", labelEn: "Results", href: "/results" },
  { label: "प्रवेशपत्र", labelEn: "Admit Cards", href: "/admit-card" },
  { label: "ब्लॉग", labelEn: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Breaking news ticker */}
      <div className="bg-primary-700 text-white py-1.5 overflow-hidden">
        <div className="container-main flex items-center gap-3">
          <span className="shrink-0 bg-saffron text-white text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wide">
            🔥 Breaking
          </span>
          <div className="ticker-wrap flex-1">
            <span className="animate-ticker text-sm">
              🎯 MPSC 2026 अर्ज सुरू – Apply Now! &nbsp;|&nbsp; 🚔 Police Bharti 12,000 Posts – Last Date June 1 &nbsp;|&nbsp; 🏦 IBPS PO 2026 Notification Out &nbsp;|&nbsp; 🚂 Railway NTPC 8,000 Posts &nbsp;|&nbsp; 📢 UPSC CSE 2026 Prelims – May 25
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-blue-800 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-white font-extrabold text-sm">SJ</span>
              </div>
              <div>
                <div className="font-extrabold text-gray-900 text-lg leading-none">
                  Sarkari<span className="text-primary-600">Jobs</span>
                </div>
                <div className="text-[10px] text-gray-400 font-medium leading-none mt-0.5">
                  Maharashtra
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href))
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href={process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/sarkarijobs"}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.483c-.147.658-.537.819-1.084.509l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.194 1.003.131.875.737z" />
                </svg>
                Telegram
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <div className={`space-y-1 transition-all ${isOpen ? "space-y-0" : ""}`}>
                  <span className={`block w-5 h-0.5 bg-current transition-all ${isOpen ? "rotate-45 translate-y-0.5" : ""}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-all ${isOpen ? "opacity-0" : ""}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-all ${isOpen ? "-rotate-45 -translate-y-1" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 border-t border-gray-100" : "max-h-0"
          }`}
        >
          <div className="container-main py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href))
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-gray-400">{link.labelEn}</span>
              </Link>
            ))}
            <Link
              href={process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/sarkarijobs"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-bold mt-2"
            >
              📢 Telegram वर Join करा
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
