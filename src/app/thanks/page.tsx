"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CheckCircle,
  Phone,
  Envelope,
  CalendarCheck,
} from "@phosphor-icons/react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface SelectedDesigner {
  name: string;
  firstName: string;
  imageUrl: string;
  slug: string;
}

export default function ThanksPage() {
  const [designer, setDesigner] = useState<SelectedDesigner | null>(null);

  useEffect(() => {
    // Load selected designer from sessionStorage
    try {
      const stored = sessionStorage.getItem("selectedDesigner");
      if (stored) {
        setDesigner(JSON.parse(stored));
      }
    } catch {
      // sessionStorage not available
    }

    // Fire Meta Pixel CompleteRegistration event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "CompleteRegistration");
    }
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[100dvh]">
        {/* Hero - Light background */}
        <section className="bg-brand-cream py-12 md:py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-5">
              <CheckCircle
                size={40}
                weight="fill"
                className="text-green-500"
              />
            </div>

            {/* Personalized heading with designer info */}
            {designer ? (
              <>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-text-primary tracking-tight mb-3">
                  Your Consultation with {designer.firstName} Is Confirmed!
                </h1>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-gold ring-offset-2">
                    <Image
                      src={designer.imageUrl}
                      alt={designer.name}
                      fill
                      className="object-cover object-top"
                      sizes="48px"
                    />
                  </div>
                  <span className="text-brand-text-secondary text-base">
                    {designer.name}
                  </span>
                </div>
              </>
            ) : (
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-text-primary tracking-tight mb-3">
                Your Consultation Is Booked!
              </h1>
            )}

            <p className="text-brand-text-secondary text-base max-w-lg mx-auto">
              Thank you for choosing Jessen Cabinets.{" "}
              {designer
                ? `${designer.firstName} is looking forward to helping you bring your vision to life.`
                : "Your designer is looking forward to helping you bring your vision to life."}
            </p>
          </div>
        </section>

        {/* What Happens Next */}
        <section className="py-10 md:py-14 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold text-brand-text-primary mb-8 text-center">
              What Happens Next
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <Envelope
                    size={22}
                    weight="fill"
                    className="text-brand-gold"
                  />
                </div>
                <div>
                  <h3 className="text-brand-text-primary font-semibold mb-1">
                    Check Your Inbox
                  </h3>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">
                    You will receive a confirmation email with your appointment
                    details, including the date, time, and your designer&apos;s
                    contact information.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone
                    size={22}
                    weight="fill"
                    className="text-brand-gold"
                  />
                </div>
                <div>
                  <h3 className="text-brand-text-primary font-semibold mb-1">
                    Quick Introduction Call
                  </h3>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">
                    {designer
                      ? `${designer.firstName} may reach out within 24-48 hours to introduce themselves and gather a few details about your project before the consultation.`
                      : "Your designer may reach out within 24-48 hours to introduce themselves and gather a few details about your project before the consultation."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <CalendarCheck
                    size={22}
                    weight="fill"
                    className="text-brand-gold"
                  />
                </div>
                <div>
                  <h3 className="text-brand-text-primary font-semibold mb-1">
                    Your Design Consultation
                  </h3>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">
                    During your consultation, you will discuss your goals, walk
                    through material options, review layout possibilities, and
                    get a clear picture of what your new space can look like.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-10 bg-brand-cream">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h3 className="text-lg font-semibold text-brand-text-primary mb-3">
              Questions Before Your Appointment?
            </h3>
            <p className="text-brand-text-secondary text-sm mb-5">
              Our team is here to help. Give us a call and we will get you
              sorted.
            </p>
            <a
              href="tel:4048565461"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold py-3 px-6 rounded-lg text-sm transition-all duration-200 active:scale-[0.98]"
            >
              <Phone size={18} weight="bold" />
              (404) 856-5461
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
