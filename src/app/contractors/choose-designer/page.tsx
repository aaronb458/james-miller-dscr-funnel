import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DesignerCard from "@/components/DesignerCard";
import DesignerTabs from "@/components/DesignerTabs";
import ContractorBanner from "@/components/ContractorBanner";
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
        {/* Confirmation Banner - personalized with lead name */}
        <ContractorBanner />

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
