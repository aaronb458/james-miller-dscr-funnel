import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DesignerCard from "@/components/DesignerCard";
import DesignerTabs from "@/components/DesignerTabs";
import { designers } from "@/lib/designers";

export const metadata = {
  title: "Choose Your Designer | Jessen Cabinets - Contractors",
  description:
    "Pick the designer who will coordinate your cabinet supply. Each brings unique expertise to keep your projects on track.",
};

export default function ContractorChooseDesignerPage() {
  return (
    <>
      <Header />
      <main className="min-h-[100dvh]">
        {/* Confirmation Banner */}
        <section className="bg-brand-brown py-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 text-sm font-medium">
                Your request has been received
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              Pick Your Dedicated Design Contact
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
              Each designer works directly with contractors on project
              coordination, layouts, and specifications. Pick the one whose
              background fits your work best, then book an intro call.
            </p>
          </div>
        </section>

        {/* Designer Cards */}
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
                Not sure who to pick? Any of our designers can serve as your
                project contact. Just choose the one whose background speaks to
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
