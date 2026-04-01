"use client";

import { useEffect, useState } from "react";

export default function PersonalizedBanner() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("leadData");
      if (stored) {
        const data = JSON.parse(stored);
        if (data.firstName) setFirstName(data.firstName);
      }
    } catch {
      // sessionStorage not available
    }
  }, []);

  return (
    <section className="bg-brand-charcoal py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-300 text-sm font-medium">
            Your consultation request has been received
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
          {firstName
            ? `${firstName}, Choose the Designer Who Fits Your Project`
            : "Choose the Designer Who Fits Your Project"}
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
          Each designer brings a different background and approach. Pick the
          one who resonates with your vision, then book your consultation
          directly with them.
        </p>
      </div>
    </section>
  );
}
