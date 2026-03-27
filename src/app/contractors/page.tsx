import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import ScrollTopButton from "@/components/ScrollTopButton";
import { kitchenImages, heroImage, sectionBgImages } from "@/lib/images";
import {
  ShieldCheck,
  Star,
  Truck,
  Handshake,
} from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Contractor Cabinet Supply | Jessen Cabinets",
  description:
    "White shaker cabinets for contractors and builders. Volume pricing, reliable supply, and a dedicated design team for your projects.",
};

export default function ContractorOptInPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="absolute inset-0 bg-white/[0.87]" />
          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column - Copy */}
              <div className="pt-4">
                <div className="inline-block bg-brand-gold/20 border border-brand-gold/40 rounded-full px-4 py-1.5 mb-6">
                  <span className="text-brand-charcoal text-sm font-medium">
                    For Contractors & Builders
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance mb-6 text-brand-text-primary">
                  White Shaker Cabinets Your Clients Will Love
                </h1>

                <p className="text-brand-text-secondary text-lg leading-relaxed mb-8 max-w-lg">
                  Solid hardwood construction. Consistent quality across every
                  order. A design team that coordinates directly with your crew
                  so your projects stay on schedule.
                </p>

                {/* Trust Signals */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0">
                      <Truck
                        size={20}
                        weight="fill"
                        className="text-brand-gold-dark"
                      />
                    </div>
                    <span className="text-brand-text-secondary text-sm">
                      Reliable Supply Chain
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0">
                      <Handshake
                        size={20}
                        weight="fill"
                        className="text-brand-gold-dark"
                      />
                    </div>
                    <span className="text-brand-text-secondary text-sm">
                      Volume Pricing Available
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck
                        size={20}
                        weight="fill"
                        className="text-brand-gold-dark"
                      />
                    </div>
                    <span className="text-brand-text-secondary text-sm">
                      Solid Hardwood Construction
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0">
                      <Star
                        size={20}
                        weight="fill"
                        className="text-brand-gold-dark"
                      />
                    </div>
                    <span className="text-brand-text-secondary text-sm">
                      25+ Kitchen Custom Orders
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-brand-charcoal/90 backdrop-blur-sm border border-brand-charcoal/20 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="text-center mb-6">
                  <h2 className="text-white text-xl font-semibold mb-2">
                    Set Up Your Contractor Account
                  </h2>
                  <p className="text-white/60 text-sm">
                    Get volume pricing and a dedicated design contact for your
                    projects.
                  </p>
                </div>
                <LeadForm
                  funnelSource="jessen_facebook"
                  funnelPage="contractor_optin"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Value Props Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-4">
                Why Contractors Partner with Jessen
              </h2>
              <p className="text-brand-text-secondary text-base max-w-2xl mx-auto">
                We supply white shaker cabinets exclusively. That focus means
                consistent quality, predictable lead times, and a team that
                knows exactly how to support your builds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Left - Real Kitchen Image */}
              <div className="relative rounded-2xl overflow-hidden h-80 md:h-[460px]">
                <Image
                  src={kitchenImages[4].src}
                  alt={kitchenImages[4].alt}
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
                      Volume Pricing for Builders
                    </h3>
                    <p className="text-brand-text-secondary text-sm leading-relaxed">
                      Competitive pricing on bulk orders means better margins
                      for your projects. Orders of 25+ kitchens unlock custom
                      colors and frame options.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-brand-text-primary font-semibold text-lg mb-1">
                      Reliable Supply, On Schedule
                    </h3>
                    <p className="text-brand-text-secondary text-sm leading-relaxed">
                      Predictable lead times and dependable inventory so your
                      job sites never stall waiting on cabinets. RTA format
                      means easy transport and storage.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-brand-text-primary font-semibold text-lg mb-1">
                      Design Coordination Built In
                    </h3>
                    <p className="text-brand-text-secondary text-sm leading-relaxed">
                      Our designers work directly with your team on layouts,
                      measurements, and specifications. Less back and forth,
                      fewer mistakes on the job site.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="text-brand-text-primary font-semibold text-lg mb-1">
                      Solid Hardwood, Every Time
                    </h3>
                    <p className="text-brand-text-secondary text-sm leading-relaxed">
                      White shaker cabinets built from solid hardwood with
                      dovetail drawers and high-quality hardware. No particle
                      board. No shortcuts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kitchen Gallery */}
        <section className="py-16 md:py-20 bg-brand-cream">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-3">
                Projects Built with Jessen Cabinets
              </h2>
              <p className="text-brand-text-secondary text-base max-w-xl mx-auto">
                White shaker cabinets only. Consistent quality across every
                build, every time.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {sectionBgImages.gallery.map((img, i) => (
                <div
                  key={i}
                  className={`relative rounded-xl overflow-hidden ${
                    i === 0
                      ? "col-span-2 row-span-2 h-64 md:h-[400px]"
                      : "h-40 md:h-48"
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
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${sectionBgImages.bottomCta}')` }}
          />
          <div className="absolute inset-0 bg-brand-charcoal/80" />
          <div className="relative max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Streamline Your Cabinet Supply?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Fill out the form above to get started with volume pricing and a
              dedicated design contact for your projects.
            </p>
            <ScrollTopButton />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
