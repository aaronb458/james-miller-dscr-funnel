import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import ScrollTopButton from "@/components/ScrollTopButton";
import {
  ShieldCheck,
  Star,
  Hammer,
  Ruler,
} from "@phosphor-icons/react/dist/ssr";

export default function OptInPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-brand-brown relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80')] bg-cover bg-center opacity-10" />
          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column - Copy */}
              <div className="text-white pt-4">
                <div className="inline-block bg-brand-gold/20 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                  <span className="text-brand-gold text-sm font-medium">
                    Limited Time: Free Design Consultation
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance mb-6">
                  Your Dream Kitchen Starts with the Right Cabinets
                </h1>

                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                  Solid wood. Expert craftsmanship. A design team that listens.
                  Get a personalized consultation and see exactly how your space
                  can transform.
                </p>

                {/* Trust Signals */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                      <Star
                        size={20}
                        weight="fill"
                        className="text-brand-gold"
                      />
                    </div>
                    <span className="text-white/80 text-sm">
                      4.9 Google Rating
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck
                        size={20}
                        weight="fill"
                        className="text-brand-gold"
                      />
                    </div>
                    <span className="text-white/80 text-sm">
                      Lifetime Warranty
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                      <Hammer
                        size={20}
                        weight="fill"
                        className="text-brand-gold"
                      />
                    </div>
                    <span className="text-white/80 text-sm">
                      Solid Wood Construction
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                      <Ruler
                        size={20}
                        weight="fill"
                        className="text-brand-gold"
                      />
                    </div>
                    <span className="text-white/80 text-sm">
                      Free In-Home Measure
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <div className="text-center mb-6">
                  <h2 className="text-white text-xl font-semibold mb-2">
                    Claim Your Free Design Consultation
                  </h2>
                  <p className="text-white/60 text-sm">
                    Normally $450. Yours free for a limited time.
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
                From your first consultation to the final installation, we
                handle every detail so you can enjoy the transformation without
                the stress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Left - Image */}
              <div className="relative rounded-2xl overflow-hidden h-80 md:h-[460px]">
                <Image
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                  alt="Premium kitchen with white cabinets and modern finishes"
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
                      your vision and guides you through materials, layouts, and
                      finishes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-brand-text-primary font-semibold text-lg mb-1">
                      Solid Wood, Built to Last
                    </h3>
                    <p className="text-brand-text-secondary text-sm leading-relaxed">
                      No particle board. No shortcuts. Every cabinet is crafted
                      from solid wood with dovetail joints and soft-close
                      hardware.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-brand-text-primary font-semibold text-lg mb-1">
                      Professional Installation
                    </h3>
                    <p className="text-brand-text-secondary text-sm leading-relaxed">
                      Our certified install teams handle everything, leaving you
                      with a kitchen that looks exactly like the design, down to
                      every detail.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="text-brand-text-primary font-semibold text-lg mb-1">
                      Backed by a Lifetime Warranty
                    </h3>
                    <p className="text-brand-text-secondary text-sm leading-relaxed">
                      We stand behind our work. Your cabinets are protected with
                      a comprehensive lifetime warranty on materials and
                      craftsmanship.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-3">
                Trusted by Hundreds of Homeowners
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
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
                  &quot;From the first meeting to the final walkthrough,
                  everything was handled with care. The cabinets are gorgeous and
                  the soft-close drawers are a game changer. Our kitchen feels
                  brand new.&quot;
                </p>
                <div className="text-brand-text-primary text-sm font-medium">
                  Jennifer R.
                </div>
                <div className="text-brand-text-muted text-xs">
                  Kitchen Remodel, 2024
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
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
                  &quot;We compared five companies before choosing Jessen. The
                  quality of their solid wood cabinets blew everything else out
                  of the water. Worth every penny.&quot;
                </p>
                <div className="text-brand-text-primary text-sm font-medium">
                  Mark & Lisa T.
                </div>
                <div className="text-brand-text-muted text-xs">
                  Full Kitchen Renovation, 2024
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-20 bg-brand-brown relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80')] bg-cover bg-center opacity-5" />
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
