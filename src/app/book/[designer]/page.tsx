import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingCalendar from "@/components/BookingCalendar";
import { designers, getDesignerBySlug } from "@/lib/designers";
import { Star } from "@phosphor-icons/react/dist/ssr";

export function generateStaticParams() {
  return designers.map((d) => ({ designer: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { designer: string };
}) {
  const designer = getDesignerBySlug(params.designer);
  if (!designer) return { title: "Designer Not Found" };
  return {
    title: `Book with ${designer.name} | Jessen Cabinets`,
    description: `Schedule your free design consultation with ${designer.name}. ${designer.experience} of experience in kitchen and bath design.`,
  };
}

export default function BookDesignerPage({
  params,
}: {
  params: { designer: string };
}) {
  const designer = getDesignerBySlug(params.designer);
  if (!designer) notFound();

  return (
    <>
      <Header />
      <main className="min-h-[100dvh]">
        {/* Designer Header */}
        <section className="bg-brand-brown py-10 md:py-14">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-brand-gold/30">
                <Image
                  src={designer.imageUrl}
                  alt={designer.name}
                  fill
                  className="object-cover object-top"
                  sizes="96px"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Book with {designer.firstName}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-2">
                  <Star
                    size={14}
                    weight="fill"
                    className="text-brand-gold"
                  />
                  <span className="text-white/70 text-sm">
                    {designer.experience}
                  </span>
                </div>
                <p className="text-white/60 text-sm max-w-lg">
                  {designer.bio.slice(0, 150)}...
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-brand-text-primary mb-2">
                Pick a Time That Works for You
              </h2>
              <p className="text-brand-text-secondary text-sm">
                Your free design consultation is typically 30-45 minutes. We
                will walk through your project goals, discuss materials, and
                outline next steps.
              </p>
            </div>

            <BookingCalendar
              calendarUrl={designer.calendarUrl}
              designerSlug={designer.slug}
            />

            <div className="mt-8 text-center">
              <p className="text-brand-text-muted text-sm mb-3">
                Calendar not loading? No worries.
              </p>
              <a
                href="/thanks"
                className="inline-flex items-center gap-2 bg-brand-charcoal hover:bg-brand-brown text-white font-medium py-3 px-6 rounded-lg text-sm transition-all duration-200 active:scale-[0.98]"
              >
                I Have Already Booked My Consultation
              </a>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-12 bg-brand-cream">
          <div className="max-w-3xl mx-auto px-4">
            <h3 className="text-lg font-semibold text-brand-text-primary mb-6 text-center">
              What to Expect
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-brand-gold font-bold">1</span>
                </div>
                <h4 className="text-brand-text-primary font-medium text-sm mb-1">
                  Discovery Call
                </h4>
                <p className="text-brand-text-muted text-xs">
                  We learn about your space, style preferences, and budget range.
                </p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-brand-gold font-bold">2</span>
                </div>
                <h4 className="text-brand-text-primary font-medium text-sm mb-1">
                  In-Home Measure
                </h4>
                <p className="text-brand-text-muted text-xs">
                  We measure your space and discuss layout options on-site.
                </p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-brand-gold font-bold">3</span>
                </div>
                <h4 className="text-brand-text-primary font-medium text-sm mb-1">
                  Custom Design
                </h4>
                <p className="text-brand-text-muted text-xs">
                  You receive a detailed design with 3D renders and pricing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
