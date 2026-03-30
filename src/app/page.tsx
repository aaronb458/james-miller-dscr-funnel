import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import ScrollTopButton from "@/components/ScrollTopButton";
import { heroImage, sectionBgImages } from "@/lib/images";
import {
  ShieldCheck,
  Star,
  Hammer,
  Truck,
  Package,
  CurrencyDollar,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";

export default function OptInPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section - white overlay at 87% opacity */}
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
                    Free Design Consultation
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance mb-6 text-brand-text-primary">
                  Your Dream Kitchen Starts with the Right Cabinets
                </h1>

                <p className="text-brand-text-secondary text-lg leading-relaxed mb-8 max-w-lg">
                  White shaker cabinets. Solid hardwood construction. Dovetail
                  drawers. Ready to assemble, shipped flat-packed to your door.
                  Free shipping on orders over $4,000. Get a personalized
                  consultation and see exactly how your space can transform.
                </p>

                {/* Trust Signals */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0">
                      <Star
                        size={20}
                        weight="fill"
                        className="text-brand-gold-dark"
                      />
                    </div>
                    <span className="text-brand-text-secondary text-sm">
                      5-Star Reviewed
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0">
                      <Hammer
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
                      <ShieldCheck
                        size={20}
                        weight="fill"
                        className="text-brand-gold-dark"
                      />
                    </div>
                    <span className="text-brand-text-secondary text-sm">
                      Dovetail Drawers
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0">
                      <Package
                        size={20}
                        weight="fill"
                        className="text-brand-gold-dark"
                      />
                    </div>
                    <span className="text-brand-text-secondary text-sm">
                      Ready to Assemble
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-brand-charcoal/90 backdrop-blur-sm border border-brand-charcoal/20 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="text-center mb-6">
                  <h2 className="text-white text-xl font-semibold mb-2">
                    Claim Your Free Design Consultation
                  </h2>
                  <p className="text-white/60 text-sm">
                    Work with a dedicated designer to plan your perfect kitchen.
                  </p>
                </div>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* Value Props Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-4">
                Why Homeowners Choose Jessen
              </h2>
              <p className="text-brand-text-secondary text-base max-w-2xl mx-auto">
                From your first consultation to the day your cabinets arrive, we
                handle every detail so you can focus on enjoying the
                transformation.
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
          </div>
        </section>

        {/* Kitchen Gallery */}
        <section className="py-16 md:py-20 bg-brand-cream">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-3">
                Real Kitchens. Real Results.
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
          </div>
        </section>

        {/* Shipping, Assembly & Financing */}
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
                  <Truck
                    size={28}
                    weight="fill"
                    className="text-brand-gold-dark"
                  />
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
                  <Wrench
                    size={28}
                    weight="fill"
                    className="text-brand-gold-dark"
                  />
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
                  <CurrencyDollar
                    size={28}
                    weight="fill"
                    className="text-brand-gold-dark"
                  />
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
          </div>
        </section>

        {/* Social Proof - Real testimonials from jessencabinets.com */}
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
                    <Star
                      key={i}
                      size={16}
                      weight="fill"
                      className="text-brand-gold"
                    />
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
                    <Star
                      key={i}
                      size={16}
                      weight="fill"
                      className="text-brand-gold"
                    />
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
                    <Star
                      key={i}
                      size={16}
                      weight="fill"
                      className="text-brand-gold"
                    />
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
                    <Star
                      key={i}
                      size={16}
                      weight="fill"
                      className="text-brand-gold"
                    />
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
              Ready to Transform Your Kitchen?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Your free design consultation is just a scroll away. Fill out the
              form above and pick the designer who fits your project best.
            </p>
            <ScrollTopButton />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
