"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Star, Hammer, Truck, CurrencyDollar, Wrench } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { heroImage, sectionBgImages } from "@/lib/images";
import LeadForm from "@/components/LeadForm";

// ─── Exit Intent Popup (reused from survey) ───────────────────────────────────

function ExitIntentPopup({
  onClose,
  onContinue,
}: {
  onClose: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center z-10"
      >
        <h2 className="text-2xl font-bold text-brand-text-primary mb-3">
          Don&apos;t Miss Out!
        </h2>
        <p className="text-brand-text-secondary text-sm leading-relaxed mb-6">
          Your free $500 3D design consult and 20% discount are still waiting for you.
        </p>
        <button
          onClick={onContinue}
          className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold py-3.5 rounded-xl transition-colors cursor-pointer mb-3"
        >
          Continue My Application
        </button>
        <button
          onClick={onClose}
          className="text-sm text-brand-text-muted hover:text-brand-text-secondary transition-colors cursor-pointer"
        >
          No thanks
        </button>
      </motion.div>
    </div>
  );
}

// ─── Scroll-to-top CTA button ─────────────────────────────────────────────────

function ScrollCTA({ label }: { label: string }) {
  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold py-4 px-8 rounded-lg text-base transition-all duration-200 active:scale-[0.98] cursor-pointer"
      >
        {label}
        <ArrowRight size={18} weight="bold" />
      </button>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function StartPage() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const exitFiredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (exitFiredRef.current) return;
      try {
        if (sessionStorage.getItem("exitPopupShown")) return;
      } catch { /* ignore */ }
      if (e.clientY < window.innerHeight * 0.05) {
        exitFiredRef.current = true;
        try { sessionStorage.setItem("exitPopupShown", "1"); } catch { /* ignore */ }
        setShowExitPopup(true);
      }
    };

    const handleVisibility = () => {
      if (!document.hidden) return;
      if (exitFiredRef.current) return;
      try {
        if (sessionStorage.getItem("exitPopupShown")) return;
        exitFiredRef.current = true;
        sessionStorage.setItem("exitPopupShown", "1");
        setShowExitPopup(true);
      } catch { /* ignore */ }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showExitPopup && (
          <ExitIntentPopup
            onClose={() => setShowExitPopup(false)}
            onContinue={() => setShowExitPopup(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Hero Section ── */}
      <section id="hero-top" className="relative overflow-hidden bg-brand-charcoal">
        {/* Background kitchen image at low opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-brand-charcoal/85" />

        {/* Logo bar */}
        <div className="relative border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Image
              src="/images/logo.png"
              alt="Jessen Cabinets"
              width={160}
              height={53}
              className="h-9 w-auto brightness-0 invert"
            />
            <div className="hidden sm:flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} weight="fill" className="text-brand-gold" />
              ))}
              <span className="text-white/70 text-xs ml-1">5-star rated</span>
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left Column — Headline + trust signals (desktop only, below form on mobile) */}
            <div className="order-2 lg:order-1 pt-2">
              <div className="inline-block bg-brand-gold/20 border border-brand-gold/40 rounded-full px-4 py-1.5 mb-5">
                <span className="text-brand-gold text-sm font-medium">
                  Free Design Consultation
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance mb-6 text-white">
                Find Out Exactly What Your Space Needs
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Answer a few quick questions and get matched with a designer who specializes in cabinets for any room. Free consultation, no pressure.
              </p>

              {/* Trust signals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Hammer size={18} weight="fill" />, text: "Solid hardwood — no particle board" },
                  { icon: <Truck size={18} weight="fill" />, text: "Free shipping over $4,000" },
                  { icon: <CurrencyDollar size={18} weight="fill" />, text: "Financing available, 0% for 12 months" },
                  { icon: <Star size={18} weight="fill" />, text: "5-star rated, Roswell GA" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-gold/20 flex items-center justify-center flex-shrink-0 text-brand-gold">
                      {item.icon}
                    </div>
                    <span className="text-white/80 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Quick Contact Form (first on mobile) */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Card header */}
                <div className="bg-brand-charcoal px-6 pt-6 pb-4">
                  <div className="text-center mb-2">
                    <h2 className="text-white text-lg font-semibold">
                      Free Design Consultation
                    </h2>
                    <p className="text-white/60 text-xs mt-1">
                      Takes 60 seconds. No obligation.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="bg-brand-charcoal px-6 pt-5 pb-6">
                  <LeadForm
                    funnelSource="jessen_facebook"
                    funnelPage="homeowner_cro"
                    redirectTo="/survey"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof Strip ── */}
      <section className="bg-brand-gold py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} weight="fill" className="text-brand-charcoal" />
                ))}
              </div>
              <span className="text-brand-charcoal font-semibold text-sm">5.0</span>
            </div>
            <div className="text-brand-charcoal text-sm font-medium">
              100+ verified reviews
            </div>
            <div className="text-brand-charcoal text-sm font-medium">
              Jessen Cabinets · Roswell, GA
            </div>
            <div className="text-brand-charcoal text-sm font-medium">
              Solid hardwood. No particle board. Ever.
            </div>
          </div>
        </div>
      </section>

      {/* ── Value Props Section ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-4">
              Why Homeowners Choose Jessen
            </h2>
            <p className="text-brand-text-secondary text-base max-w-2xl mx-auto">
              From your first consultation to the day your cabinets arrive, we
              handle every detail so you can focus on enjoying the
              transformation of your space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left - Real Kitchen Image */}
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-[460px]">
              <Image
                src={sectionBgImages.valueProps}
                alt="White shaker cabinet kitchen by Jessen Cabinets"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right - Benefits */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-gold font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-brand-text-primary font-semibold text-lg mb-1">
                    Expert Design Consultation
                  </h3>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">
                    Work directly with a dedicated designer who listens to
                    your vision and guides you through layouts, materials, and
                    finishes for your space.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-gold font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-brand-text-primary font-semibold text-lg mb-1">
                    Solid Hardwood, Built to Last
                  </h3>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">
                    No particle board. No shortcuts. Every cabinet features
                    solid hardwood construction, dovetail drawers, and
                    high-quality hardware.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-gold font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-brand-text-primary font-semibold text-lg mb-1">
                    Ready to Assemble, Delivered to You
                  </h3>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">
                    Your cabinets ship directly to your door, ready to
                    assemble. Work with your own installer or tackle it as a
                    DIY project.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-gold font-bold text-lg">4</span>
                </div>
                <div>
                  <h3 className="text-brand-text-primary font-semibold text-lg mb-1">
                    White Shaker Style, Always in Stock
                  </h3>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">
                    Our signature white shaker cabinets are always available.
                    Base, wall, and tall cabinets in the sizes you need, ready
                    when you are.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ScrollCTA label="Get My Free Consultation" />
        </div>
      </section>

      {/* ── Kitchen Gallery Section ── */}
      <section className="py-16 md:py-20 bg-brand-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-3">
              Real Spaces. Real Results.
            </h2>
            <p className="text-brand-text-secondary text-base max-w-xl mx-auto">
              Every project features our signature white shaker cabinets,
              crafted from solid hardwood with dovetail drawers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {sectionBgImages.gallery.map((img, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden ${
                  i === 0 ? "col-span-2 row-span-2 h-64 md:h-[400px]" : "h-40 md:h-48"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes={
                    i === 0
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 50vw, 33vw"
                  }
                />
              </div>
            ))}
          </div>

          <ScrollCTA label="Design My Space" />
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-4">
              How It Works: Order to Install
            </h2>
            <p className="text-brand-text-secondary text-base max-w-2xl mx-auto">
              Our cabinets ship flat-packed and ready to assemble. No
              warehouse middleman, no inflated markup. Just quality cabinets
              delivered to your door.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-4">
                <Truck size={28} weight="fill" className="text-brand-gold-dark" />
              </div>
              <h3 className="text-brand-text-primary font-semibold text-lg mb-2">
                Free Shipping Over $4,000
              </h3>
              <p className="text-brand-text-secondary text-sm leading-relaxed">
                Orders over $4,000 paid in full ship free. Otherwise shipping
                runs $499 - $699 depending on order size. Delivered direct to
                your door.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-4">
                <Wrench size={28} weight="fill" className="text-brand-gold-dark" />
              </div>
              <h3 className="text-brand-text-primary font-semibold text-lg mb-2">
                Ready to Assemble
              </h3>
              <p className="text-brand-text-secondary text-sm leading-relaxed">
                Shipped flat-packed for safe delivery. Average cabinet takes
                about 30 minutes to assemble. DIY-friendly or hand it to your
                contractor.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-4">
                <CurrencyDollar size={28} weight="fill" className="text-brand-gold-dark" />
              </div>
              <h3 className="text-brand-text-primary font-semibold text-lg mb-2">
                Financing Available
              </h3>
              <p className="text-brand-text-secondary text-sm leading-relaxed">
                0% interest if paid in full within 12 months. Flexible monthly
                payments to fit any budget. Get the kitchen you want now,
                pay over time.
              </p>
            </div>
          </div>

          <ScrollCTA label="Start My Project" />
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-3">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-cream rounded-xl p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} weight="fill" className="text-brand-gold" />
                ))}
              </div>
              <p className="text-brand-text-secondary text-sm leading-relaxed mb-4">
                &quot;My experience with Jessen cabinets was wonderful. They
                were so helpful with assisting me in designing my kitchen and
                made the ordering process very smooth.&quot;
              </p>
              <div className="text-brand-text-primary text-sm font-medium">
                B. Burdett
              </div>
            </div>

            <div className="bg-brand-cream rounded-xl p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} weight="fill" className="text-brand-gold" />
                ))}
              </div>
              <p className="text-brand-text-secondary text-sm leading-relaxed mb-4">
                &quot;Richard and Guido were at the door waiting to help me
                when I arrived. They took time to listen to my project needs
                and provided multiple solutions.&quot;
              </p>
              <div className="text-brand-text-primary text-sm font-medium">
                J. Davis
              </div>
            </div>

            <div className="bg-brand-cream rounded-xl p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} weight="fill" className="text-brand-gold" />
                ))}
              </div>
              <p className="text-brand-text-secondary text-sm leading-relaxed mb-4">
                &quot;High quality cabinets in stock with reasonable pricing.
                They did a great job on the cabinets I purchased for
                installation.&quot;
              </p>
              <div className="text-brand-text-primary text-sm font-medium">
                C. Touton
              </div>
            </div>

            <div className="bg-brand-cream rounded-xl p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} weight="fill" className="text-brand-gold" />
                ))}
              </div>
              <p className="text-brand-text-secondary text-sm leading-relaxed mb-4">
                &quot;I highly recommend Jessen Cabinets! A terrific product
                at a great price with fantastic customer service.&quot;
              </p>
              <div className="text-brand-text-primary text-sm font-medium">
                B. Carrington
              </div>
            </div>
          </div>

          <ScrollCTA label="Book a Free Consultation" />
        </div>
      </section>

      {/* ── Bottom CTA Section ── */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${sectionBgImages.bottomCta}')` }}
        />
        <div className="absolute inset-0 bg-brand-charcoal/80" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Your free design consultation is just a scroll away. Fill out the
            form above and pick the designer who fits your project best.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold py-4 px-8 rounded-lg text-base transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            Start My Free Consultation
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-brand-charcoal py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Image
              src="/images/logo.png"
              alt="Jessen Cabinets"
              width={120}
              height={40}
              className="h-8 w-auto brightness-0 invert opacity-70"
            />
            <p className="text-white/40 text-xs text-center">
              &copy; {new Date().getFullYear()} Jessen Cabinets. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="/privacy-policy" className="text-white/40 hover:text-white/60 text-xs transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-white/40 hover:text-white/60 text-xs transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
