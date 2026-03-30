import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DesignerCard from "@/components/DesignerCard";
import DesignerTabs from "@/components/DesignerTabs";
import { designers } from "@/lib/designers";

export const metadata = {
  title: "Choose Your Designer | Jessen Cabinets",
  description:
    "Pick the kitchen designer who fits your project. Each brings unique expertise to make your vision a reality.",
};

export default function ChooseDesignerPage() {
  return (
    <>
      <Header />
      <main className="min-h-[100dvh]">
        {/* Confirmation Banner */}
        <section className="bg-brand-charcoal py-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 text-sm font-medium">
                Your consultation request has been received
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              Choose the Designer Who Fits Your Project
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
              Each designer brings a different background and approach. Pick the
              one who resonates with your vision, then book your consultation
              directly with them.
            </p>
          </div>
        </section>

        {/* Designer Cards - Desktop: wider grid, Mobile: tab navigation */}
        <section className="py-14 md:py-20 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-4">
            {/* Desktop: 4-column grid with wider cards */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
