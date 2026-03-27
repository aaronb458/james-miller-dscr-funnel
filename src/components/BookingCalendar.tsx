"use client";

import { useState } from "react";

interface BookingCalendarProps {
  calendarUrl: string;
  designerSlug: string;
}

export default function BookingCalendar({
  calendarUrl,
  designerSlug,
}: BookingCalendarProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="calendar-embed relative bg-brand-cream rounded-2xl overflow-hidden border border-zinc-200/60">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-cream z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-brand-text-muted text-sm">
              Loading calendar...
            </p>
          </div>
        </div>
      )}
      <iframe
        src={calendarUrl}
        title={`Book consultation with ${designerSlug}`}
        onLoad={() => setIsLoading(false)}
        className="w-full border-none"
        style={{ minHeight: "680px" }}
        allow="payment"
      />
    </div>
  );
}
