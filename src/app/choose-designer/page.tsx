import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DesignerCard from "@/components/DesignerCard";
import DesignerTabs from "@/components/DesignerTabs";
import PersonalizedBanner from "@/components/PersonalizedBanner";
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
        {/* Confirmation Banner - personalized with lead name */}
        <PersonalizedBanner />

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
