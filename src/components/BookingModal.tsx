"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, CircleNotch } from "@phosphor-icons/react";
import type { Designer } from "@/lib/designers";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface BookingModalProps {
  designer: Designer;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({
  designer,
  isOpen,
  onClose,
}: BookingModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Save designer selection to sessionStorage when modal opens
  // Push lead contact data to parent URL for GHL form_embed.js prefill
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);

      // Store selected designer for thank you page
      try {
        sessionStorage.setItem(
          "selectedDesigner",
          JSON.stringify({
            name: designer.name,
            firstName: designer.firstName,
            imageUrl: designer.imageUrl,
            slug: designer.slug,
          })
        );
      } catch {
        // sessionStorage not available
      }

      // Push lead contact data to parent URL so form_embed.js can relay via postMessage
      try {
        const leadStr = sessionStorage.getItem("leadData");
        if (leadStr) {
          const lead = JSON.parse(leadStr);
          const url = new URL(window.location.href);
          if (lead.firstName) url.searchParams.set("first_name", lead.firstName);
          if (lead.lastName) url.searchParams.set("last_name", lead.lastName);
          if (lead.email) url.searchParams.set("email", lead.email);
          if (lead.phone) {
            let digits = lead.phone.replace(/\D/g, "");
            if (digits.length === 10) digits = "+1" + digits;
            else if (digits.length === 11 && digits.startsWith("1")) digits = "+" + digits;
            url.searchParams.set("phone", digits);
          }
          window.history.replaceState({}, "", url.toString());
        }
      } catch {
        // sessionStorage not available or parse error
      }

      // Fire Meta Pixel Schedule event
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Schedule", {
          content_name: designer.firstName,
        });
      }

    } else {
      document.body.style.overflow = "";

      // On close, remove prefill params from URL
      try {
        const cleanUrl = new URL(window.location.href);
        ["first_name", "last_name", "email", "phone"].forEach((k) =>
          cleanUrl.searchParams.delete(k)
        );
        window.history.replaceState({}, "", cleanUrl.toString());
      } catch {
        // ignore
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, designer]);

  // Listen for postMessage from GHL iframe (booking confirmation)
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      // GHL iframes send various message types -- cast a wide net
      if (event.data && typeof event.data === "string") {
        const lower = event.data.toLowerCase();
        if (
          lower.includes("booking") ||
          lower.includes("appointment") ||
          lower.includes("confirmed") ||
          lower.includes("scheduled") ||
          lower.includes("booked")
        ) {
          router.push("/thanks");
        }
      }
      // Handle object messages
      if (event.data && typeof event.data === "object") {
        const data = event.data as Record<string, unknown>;
        const dataStr = JSON.stringify(data).toLowerCase();
        if (
          data.type === "booking_confirmed" ||
          data.type === "booking-confirmed" ||
          data.type === "appointment-booked" ||
          data.event === "appointment_booked" ||
          data.event === "booking_confirmed" ||
          data.status === "booked" ||
          data.bookingConfirmed === true ||
          dataStr.includes("scheduled") ||
          dataStr.includes("booking") ||
          dataStr.includes("confirmed")
        ) {
          router.push("/thanks");
        }
      }
    },
    [router]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }
  }, [isOpen, handleMessage]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal - Full viewport width */}
      <div
        className="relative w-full h-full sm:h-[95vh] sm:m-4 bg-white sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-zinc-100 flex-shrink-0">
          <div>
            <h3 className="text-lg font-semibold text-brand-text-primary">
              Book with {designer.firstName}
            </h3>
            <p className="text-brand-text-muted text-sm">
              Free design consultation
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors"
            aria-label="Close booking modal"
          >
            <X size={20} weight="bold" className="text-brand-text-secondary" />
          </button>
        </div>

        {/* Calendar iframe - full width */}
        <div className="relative flex-1 overflow-auto">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="flex flex-col items-center gap-3">
                <CircleNotch
                  size={32}
                  className="animate-spin text-brand-gold"
                />
                <p className="text-brand-text-muted text-sm">
                  Loading calendar...
                </p>
              </div>
            </div>
          )}
          <iframe
            src={designer.calendarUrl}
            title={`Book consultation with ${designer.firstName}`}
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-none"
            style={{ minHeight: "680px" }}
            allow="payment"
          />
        </div>

      </div>
    </div>
  );
}
