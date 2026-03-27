"use client";

import { useEffect, useState } from "react";
import { X, CircleNotch } from "@phosphor-icons/react";
import type { Designer } from "@/lib/designers";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
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

        {/* Calendar iframe */}
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
            className="w-full border-none"
            style={{ minHeight: "680px" }}
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
}
