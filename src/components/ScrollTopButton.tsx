"use client";

export default function ScrollTopButton() {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold py-4 px-8 rounded-lg text-base transition-all duration-200 active:scale-[0.98]"
    >
      Claim Your Free Consultation
    </button>
  );
}
