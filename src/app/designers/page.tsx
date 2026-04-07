"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DesignerCard from "@/components/DesignerCard";
import DesignerTabs from "@/components/DesignerTabs";
import Footer from "@/components/Footer";
import PersonalizedBanner from "@/components/PersonalizedBanner";
import { designers } from "@/lib/designers";

// ─── Nav Data ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    label: "About Us",
    dropdown: [
      { label: "About Jessen Cabinets", href: "https://www.jessencabinets.com/about-jessen-cabinets/" },
      { label: "Why Choose Jessen Cabinets", href: "https://www.jessencabinets.com/why-choose-jessen-cabinets/" },
      { label: "Partner Up", href: "https://www.jessencabinets.com/partner-up/" },
      { label: "Meet the Designers", href: "https://www.jessencabinets.com/meet-the-designers/" },
    ],
  },
  {
    label: "Products",
    dropdown: [
      { label: "Product Offering", href: "https://www.jessencabinets.com/products/" },
      { label: "Pricing", href: "https://www.jessencabinets.com/pricing/" },
    ],
  },
  {
    label: "Portfolio",
    href: "https://www.jessencabinets.com/portfolio/",
  },
  {
    label: "Get Started",
    href: "https://www.jessencabinets.com/get-started/",
  },
  {
    label: "Inspiration",
    href: "https://www.jessencabinets.com/inspiration/",
  },
  {
    label: "Contact",
    href: "https://kitchen.jessencabinets.com/",
  },
];

// ─── Nav Component ────────────────────────────────────────────────────────────

function JessenNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-brand-charcoal border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="https://www.jessencabinets.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/logo.png"
              alt="Jessen Cabinets"
              width={140}
              height={46}
              className="h-9 w-auto brightness-0 invert"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10 cursor-pointer">
                    {item.label}
                    <svg className="w-3.5 h-3.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 min-w-[220px] bg-white rounded-xl shadow-xl border border-zinc-100 py-2 mt-1">
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2.5 text-sm text-brand-text-secondary hover:bg-brand-cream hover:text-brand-text-primary transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10"
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 space-y-1">
            {NAV_ITEMS.map((item) =>
              item.dropdown ? (
                <div key={item.label}>
                  <button
                    className="w-full text-left px-4 py-2.5 text-white/80 text-sm font-medium"
                    onClick={() =>
                      setOpenDropdown((o) => (o === item.label ? null : item.label))
                    }
                  >
                    {item.label}
                  </button>
                  {openDropdown === item.label && (
                    <div className="pl-6 space-y-1 pb-2">
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-white/60 text-sm hover:text-white transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 text-white/80 hover:text-white text-sm font-medium transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignersPage() {
  return (
    <>
      <JessenNav />
      <main className="min-h-[100dvh]">
        {/* Confirmation Banner - personalized with lead name */}
        <PersonalizedBanner />

        {/* Designer Cards */}
        <section className="py-14 md:py-20 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-text-primary mb-3">
                Choose Your Designer
              </h1>
              <p className="text-brand-text-secondary text-base max-w-xl mx-auto">
                Pick the designer who fits your project. Each brings unique expertise to make your vision a reality.
              </p>
            </div>

            {/* Desktop: 3-column grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {designers.map((designer, index) => (
                <DesignerCard
                  key={designer.slug}
                  designer={designer}
                  index={index}
                />
              ))}
            </div>

            {/* Mobile: Tab navigation */}
            <div className="md:hidden">
              <DesignerTabs />
            </div>

            <div className="mt-12 text-center">
              <p className="text-brand-text-muted text-sm">
                Not sure who to pick? Any of our designers will take great care
                of your project. Just choose the one whose background speaks to
                you.
              </p>
              <div className="mt-4">
                <Link
                  href="/choose-designer"
                  className="text-brand-gold text-sm underline hover:text-brand-gold-dark transition-colors"
                >
                  Go back to the funnel
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
