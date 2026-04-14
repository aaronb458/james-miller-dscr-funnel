"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SurveyData {
  zipCode: string;
  whiteShaker: string;
  style: string[];
  timeline: string;
  financing: string;
  measurements: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// ─── Step Definitions ────────────────────────────────────────────────────────

const whiteShakerOptions = [
  {
    value: "yes",
    label: "Yes, that is exactly what I want",
    sub: "Let's keep going",
  },
  {
    value: "not-sure",
    label: "I am still figuring out my style",
    sub: "We can help you decide. White shaker works with almost everything.",
  },
  {
    value: "no",
    label: "I need a different style or color",
    sub: "Custom colors, frameless, or specialty styles",
  },
];

const styleOptions = [
  {
    value: "timeless",
    label: "A timeless, classic look that never dates",
    sub: "Clean lines, no trends to age out of",
  },
  {
    value: "luxury",
    label: "Luxury look at an affordable price",
    sub: "High-end appearance without the custom price tag",
  },
  {
    value: "quality",
    label: "Solid hardwood construction that lasts decades",
    sub: "Dovetail drawers, soft-close everything",
  },
  {
    value: "bright",
    label: "A bright, open feel that makes the room look bigger",
    sub: "Light, airy, and welcoming",
  },
];

const timelineOptions = [
  { value: "now", label: "Ready to order", sub: "Let's go" },
  { value: "1-month", label: "Within a month", sub: "Finalizing details" },
  { value: "3-6-months", label: "3 to 6 months out", sub: "Planning ahead" },
  { value: "exploring", label: "Just exploring options", sub: "No rush, doing research" },
];

const financingOptions = [
  {
    value: "pay-full",
    label: "Paying in full",
    sub: "Free shipping on orders over $4,000",
  },
  {
    value: "financing",
    label: "I'd like financing options",
    sub: "0% interest if paid within 12 months",
  },
  {
    value: "undecided",
    label: "Not sure yet",
    sub: "We'll walk you through options on your consult",
  },
];

const measurementOptions = [
  {
    value: "yes",
    label: "Yes, I have them ready",
    sub: "Perfect, we'll use them on your consult",
  },
  {
    value: "not-yet",
    label: "Not yet, but I can get them",
    sub: "No worries, we'll send you our free measuring guide",
  },
  {
    value: "not-sure",
    label: "I'm not sure what I need",
    sub: "We'll send you everything you need",
  },
];

// Steps: 0=zip, 1=congrats, 2=whiteShaker, 3=style(multi), 4=measurements, 5=timeline, 6=financing, 7=contact
const TOTAL_STEPS = 8;
const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/cObQXIqcbjUWRdqwM6aq/webhook-trigger/6a8a72a8-04be-42c8-a827-857eb88f44b5";

// ─── Animation Variants ─────────────────────────────────────────────────────

const pageVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

// ─── Components ──────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  const progress = ((step + 1) / TOTAL_STEPS) * 100;
  return (
    <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-brand-gold rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border-2 p-4 transition-all cursor-pointer ${
        selected
          ? "border-brand-gold bg-brand-gold/5 shadow-sm"
          : "border-zinc-200 bg-white hover:border-zinc-300"
      }`}
    >
      {children}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 text-sm text-brand-text-muted hover:text-brand-text-secondary transition-colors cursor-pointer"
    >
      &larr; Back
    </button>
  );
}

function StepHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <h1 className="text-[22px] md:text-[28px] font-bold text-brand-text-primary tracking-tight leading-tight">
        {title}
      </h1>
      <p className="text-brand-text-secondary mt-2 text-base">{subtitle}</p>
    </>
  );
}

// ─── Confetti helpers ────────────────────────────────────────────────────────

function fireConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#F7CE1F", "#D4AD00", "#ffffff", "#38bdf8"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#F7CE1F", "#D4AD00", "#ffffff", "#38bdf8"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}

// ─── Exit Intent Popup ───────────────────────────────────────────────────────

function ExitIntentPopup({
  onClose,
  onContinue,
}: {
  onClose: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center z-10"
      >
        <h2 className="text-2xl font-bold text-brand-text-primary mb-3">
          Don&apos;t Miss Out!
        </h2>
        <p className="text-brand-text-secondary text-base leading-relaxed mb-6">
          Your free $500 3D design consult and 20% discount are still waiting for you.
        </p>
        <button
          onClick={onContinue}
          className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold py-3.5 rounded-xl transition-colors cursor-pointer mb-3 text-base"
        >
          Continue My Application
        </button>
        <button
          onClick={onClose}
          className="text-sm text-brand-text-muted hover:text-brand-text-secondary transition-colors cursor-pointer"
        >
          No thanks
        </button>
      </motion.div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SurveyPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [disqualified, setDisqualified] = useState(false);
  const [zipDisqualified, setZipDisqualified] = useState(false);
  const [zipDqEmailSubmitted, setZipDqEmailSubmitted] = useState(false);
  const [zipDqEmail, setZipDqEmail] = useState("");
  const [zipDqEmailSubmitting, setZipDqEmailSubmitting] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [countdown, setCountdown] = useState(1200); // 20:00 in seconds

  // Track time on page for exit intent
  const pageLoadTimeRef = useRef<number>(Date.now());

  // Refs for exit/submit tracking
  const submittedRef = useRef(false);
  const exitFiredRef = useRef(false);

  // When leadData exists in sessionStorage (came from /start), skip contact steps
  const [skipContact, setSkipContact] = useState(false);
  const [data, setData] = useState<SurveyData>({
    zipCode: "",
    whiteShaker: "",
    style: [],
    timeline: "",
    financing: "",
    measurements: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Check sessionStorage on mount for pre-existing leadData from /start
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = sessionStorage.getItem("leadData");
      if (stored) {
        const lead = JSON.parse(stored);
        if (lead.firstName && lead.email) {
          setData((prev) => ({
            ...prev,
            firstName: lead.firstName,
            lastName: lead.lastName || "",
            email: lead.email,
            phone: lead.phone || "",
          }));
          setSkipContact(true);
        }
      }
    } catch {
      // sessionStorage not available
    }
  }, []);

  const update = useCallback(
    (field: keyof SurveyData, value: string) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const next = useCallback(() => setStep((s) => s + 1), []);
  const back = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  const selectAndAdvance = useCallback(
    (field: keyof SurveyData, value: string) => {
      update(field, value);
      setTimeout(() => setStep((s) => s + 1), 300);
    },
    [update]
  );

  // ─── Webhook helper ───────────────────────────────────────────────────────

  const fireWebhook = useCallback(
    async (
      stepName: string,
      currentData: SurveyData,
      isBooked: boolean = false,
      isQualified: boolean = true,
      surveyPartial: boolean = true
    ) => {
      try {
        const utmRaw =
          typeof window !== "undefined"
            ? sessionStorage.getItem("utmData")
            : null;
        const utmData = utmRaw ? JSON.parse(utmRaw) : {};

        const styleValue = Array.isArray(currentData.style)
          ? currentData.style.join(",")
          : currentData.style;

        const sendMeasuringGuide =
          currentData.measurements === "not-yet" ||
          currentData.measurements === "not-sure";

        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: currentData.firstName,
            lastName: currentData.lastName,
            name: `${currentData.firstName} ${currentData.lastName}`.trim(),
            email: currentData.email,
            phone: currentData.phone,
            projectType: "",
            sms_consent: true,
            ab_variant: "full-survey",
            funnel_source: utmData.utm_source || "jessen_survey",
            funnel_page: "survey",
            submitted_at: new Date().toISOString(),
            page_url: typeof window !== "undefined" ? window.location.href : "",
            utm_source: utmData.utm_source || "",
            utm_medium: utmData.utm_medium || "",
            utm_campaign: utmData.utm_campaign || "",
            utm_content: utmData.utm_content || "",
            utm_term: utmData.utm_term || "",
            survey_zip_code: currentData.zipCode,
            survey_style: styleValue,
            survey_timeline: currentData.timeline,
            survey_financing: currentData.financing,
            survey_white_shaker_confirmed: currentData.whiteShaker || "",
            survey_measurements: currentData.measurements || "",
            send_measuring_guide: sendMeasuringGuide,
            step_completed: stepName,
            is_booked: isBooked,
            is_qualified: isQualified,
            survey_partial: surveyPartial,
          }),
          mode: "no-cors",
        }).catch(() => {});
      } catch {
        // Silent fail — never block UX
      }
    },
    []
  );

  // White shaker selection — "no" disqualifies, others advance
  const selectWhiteShaker = useCallback(
    (value: string) => {
      update("whiteShaker", value);
      if (value === "no") {
        setDisqualified(true);
        // Fire DQ webhook with whatever data we have
        setData((prev) => {
          const updated = { ...prev, whiteShaker: value };
          fireWebhook("disqualified", updated, false, false, true);
          return updated;
        });
      } else {
        setTimeout(() => setStep((s) => s + 1), 300);
      }
    },
    [update, fireWebhook]
  );

  // Zip DQ check
  const handleZipSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (data.zipCode.length !== 5) return;

      const zip = data.zipCode;
      const prefix = parseInt(zip.substring(0, 3));
      const isHawaii = zip.startsWith("967") || zip.startsWith("968");
      const isAlabama = prefix >= 350 && prefix <= 369;

      if (isHawaii || isAlabama) {
        // Fire zip DQ webhook then show shipping DQ page
        fireWebhook("zip_dq", data, false, false, true);
        setZipDisqualified(true);
      } else {
        next(); // advance to congrats slide (step 1)
      }
    },
    [data, next, fireWebhook]
  );

  // Zip DQ email capture submit
  const handleZipDqEmailSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!zipDqEmail || zipDqEmailSubmitting) return;
      setZipDqEmailSubmitting(true);
      try {
        const zip = data.zipCode;
        const isHawaii = zip.startsWith("967") || zip.startsWith("968");
        const state = isHawaii ? "Hawaii" : "Alabama";
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: zipDqEmail,
            step_completed: "zip_dq",
            is_qualified: false,
            survey_zip_code: zip,
            zip_dq_state: state,
            submitted_at: new Date().toISOString(),
            page_url: typeof window !== "undefined" ? window.location.href : "",
          }),
          mode: "no-cors",
        }).catch(() => {});
      } catch {
        // Silent fail
      }
      setZipDqEmailSubmitting(false);
      setZipDqEmailSubmitted(true);
    },
    [zipDqEmail, zipDqEmailSubmitting, data.zipCode]
  );

  const qualifiesForFreeShipping = data.financing !== "financing";

  // Task 1: Normalized payload on submit
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      submittedRef.current = true;

      try {
        await fireWebhook("submit", data, false, true, false);

        if (
          typeof window !== "undefined" &&
          (
            window as Window & {
              posthog?: { capture: (e: string, p?: Record<string, unknown>) => void };
            }
          ).posthog
        ) {
          const utmRaw = sessionStorage.getItem("utmData");
          const utmData = utmRaw ? JSON.parse(utmRaw) : {};
          (
            window as Window & {
              posthog?: { capture: (e: string, p?: Record<string, unknown>) => void };
            }
          ).posthog!.capture("survey_submit", {
            ab_variant: "full-survey",
            timeline: data.timeline,
            ...utmData,
          });
        }
      } catch {
        // Silent fail
      }

      // Save contact data for calendar prefill via BookingModal
      try {
        sessionStorage.setItem(
          "leadData",
          JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
          })
        );
      } catch {
        // sessionStorage not available
      }

      setSubmitting(false);
      setSubmitted(true);
    },
    [data, fireWebhook]
  );

  // Auto-advance from step 7 when skipContact is true
  useEffect(() => {
    if (step === 7 && skipContact) {
      // Fire webhook immediately since we already have contact info
      fireWebhook("contact", data, false, true, true);
      const t = setTimeout(() => {
        // Submit directly
        submittedRef.current = true;
        fireWebhook("submit", data, false, true, false).then(() => {
          try {
            sessionStorage.setItem(
              "leadData",
              JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
              })
            );
          } catch {
            // ignore
          }
          setSubmitted(true);
        });
      }, 400);
      return () => clearTimeout(t);
    }
  }, [step, skipContact, data, fireWebhook]);

  // Fire milestone webhooks for skipContact users when style/timeline complete
  // Steps: 0=zip, 1=congrats, 2=whiteShaker, 3=style, 4=measurements, 5=timeline, 6=financing, 7=contact
  const prevStepRef = useRef(step);
  useEffect(() => {
    if (!skipContact) return;
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    // style is step 3, timeline is step 5
    if (prev === 3 && step === 4) {
      fireWebhook("style", data, false, true, true);
    }
    if (prev === 5 && step === 6) {
      fireWebhook("timeline", data, false, true, true);
    }
  }, [step, skipContact, data, fireWebhook]);

  // Fire confetti on reveal
  useEffect(() => {
    if (submitted) {
      fireConfetti();
    }
  }, [submitted]);

  // Countdown timer — starts when submitted
  useEffect(() => {
    if (!submitted) return;
    setCountdown(1200);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  // Exit intent — desktop mouseleave
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (submittedRef.current) return;
      if (exitFiredRef.current) return;
      if (step === 0) return;
      // Don't fire while user is actively typing
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA" ||
          document.activeElement.tagName === "SELECT")
      ) return;
      // Check sessionStorage flag — once per session only
      try {
        if (sessionStorage.getItem("exitPopupShown")) return;
      } catch { /* ignore */ }
      // Must be on page at least 30 seconds
      if (Date.now() - pageLoadTimeRef.current < 30000) return;
      // Mouse must exit above top 10% of viewport (not 5%)
      if (e.clientY < window.innerHeight * 0.10) {
        exitFiredRef.current = true;
        try { sessionStorage.setItem("exitPopupShown", "1"); } catch { /* ignore */ }
        setShowExitPopup(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [step]);

  // Exit intent + exit webhook — visibilitychange / pagehide
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleVisibility = () => {
      if (!document.hidden) return;

      // Exit intent popup (mobile) — only after 20 seconds on page
      if (
        !submittedRef.current &&
        !exitFiredRef.current &&
        step > 0 &&
        Date.now() - pageLoadTimeRef.current >= 20000
      ) {
        // Don't fire while user is actively typing
        const active = document.activeElement;
        const isTyping = active && (
          active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.tagName === "SELECT"
        );
        if (!isTyping) {
          try {
            if (!sessionStorage.getItem("exitPopupShown")) {
              exitFiredRef.current = true;
              sessionStorage.setItem("exitPopupShown", "1");
              setShowExitPopup(true);
            }
          } catch { /* ignore */ }
        }
      }

      // Exit webhook — only if we have contact info
      setData((current) => {
        const hasContact = current.email || current.phone;
        let hasSessionContact = false;
        try {
          const stored = sessionStorage.getItem("leadData");
          if (stored) {
            const lead = JSON.parse(stored);
            hasSessionContact = !!(lead.email || lead.phone);
          }
        } catch { /* ignore */ }

        if ((hasContact || hasSessionContact) && !submittedRef.current) {
          fireWebhook(`exit_step_${step}`, current, false, true, true);
        }
        return current;
      });
    };

    const handlePageHide = () => {
      setData((current) => {
        const hasContact = current.email || current.phone;
        if (hasContact && !submittedRef.current) {
          fireWebhook(`exit_step_${step}`, current, false, true, true);
        }
        return current;
      });
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [step, fireWebhook]);

  // ─── Zip / Shipping DQ Screen ────────────────────────────────────────────

  if (zipDisqualified) {
    const zip = data.zipCode;
    const isHawaii = zip.startsWith("967") || zip.startsWith("968");
    const stateName = isHawaii ? "Hawaii" : "Alabama";

    return (
      <div className="min-h-screen bg-brand-charcoal flex flex-col">
        <header className="py-4 border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Jessen Cabinets"
              width={160}
              height={53}
              className="h-10 w-auto"
            />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
            className="max-w-lg w-full text-center"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-10 space-y-6">
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center mx-auto">
                <span className="text-brand-gold text-2xl">📦</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  We don&apos;t ship to {stateName} yet
                </h1>
                <p className="text-white/70 text-base leading-relaxed">
                  Jessen Cabinets currently ships to the continental US only. We&apos;re working on expanding — leave your email and we&apos;ll let you know when we reach you.
                </p>
              </div>

              {zipDqEmailSubmitted ? (
                <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl px-5 py-4">
                  <p className="text-brand-gold font-semibold text-base">
                    You&apos;re on the list. We&apos;ll reach out as soon as we ship to {stateName}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleZipDqEmailSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={zipDqEmail}
                    onChange={(e) => setZipDqEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-brand-gold focus:ring-0 focus:outline-none text-base"
                  />
                  <button
                    type="submit"
                    disabled={zipDqEmailSubmitting}
                    className="w-full bg-brand-gold hover:bg-brand-gold-dark disabled:opacity-60 text-brand-charcoal font-semibold py-3.5 rounded-xl transition-colors cursor-pointer text-base"
                  >
                    {zipDqEmailSubmitting ? "Saving..." : "Notify Me When You Ship Here"}
                  </button>
                </form>
              )}

              <p className="text-white/30 text-xs">
                No spam. One email when we expand.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // ─── Disqualification Screen ─────────────────────────────────────────────

  if (disqualified) {
    return (
      <div className="min-h-screen bg-brand-charcoal flex flex-col">
        <header className="py-4 border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Jessen Cabinets"
              width={160}
              height={53}
              className="h-10 w-auto"
            />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
            className="max-w-lg w-full text-center"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-10 space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                We may not be the right fit
              </h1>
              <p className="text-white/70 text-base leading-relaxed">
                We carry one style and one color. It&apos;s timeless, never goes out of style, and has worked in hundreds of kitchens — but if you&apos;re looking for something different, a custom cabinet shop might be a better match.
              </p>
              <div className="pt-2">
                <a
                  href="/choose-designer"
                  className="text-brand-gold text-base underline hover:text-brand-gold-dark transition-colors"
                >
                  Still want to talk to a designer?
                </a>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // ─── Reveal Page ─────────────────────────────────────────────────────────

  if (submitted) {
    const mins = Math.floor(countdown / 60);
    const secs = countdown % 60;
    const timerExpired = countdown === 0;

    return (
      <div className="min-h-screen bg-brand-cream flex flex-col">
        <header className="py-4 border-b border-zinc-200">
          <div className="max-w-2xl mx-auto px-4 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Jessen Cabinets"
              width={160}
              height={53}
              className="h-10 w-auto"
            />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
            className="max-w-lg w-full text-center"
          >
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-lg overflow-hidden">
              {/* Gold banner */}
              <div className="bg-brand-gold px-6 py-5">
                <p className="text-brand-charcoal text-sm font-semibold tracking-wide uppercase">
                  Great news, {data.firstName}!
                </p>
                <h1 className="text-brand-charcoal text-2xl md:text-3xl font-bold mt-1">
                  You Qualify for Our Premium White Shaker Cabinets!
                </h1>
              </div>

              <div className="px-6 py-8 space-y-6">
                <p className="text-brand-text-secondary text-base leading-relaxed">
                  We ship to your area and your project is a great fit for our premium white shaker line.
                </p>

                {/* CTA — prominent, distinct color from gold header */}
                <a
                  href="/choose-designer"
                  className="cta-pulse block w-full text-center font-semibold text-white text-lg leading-snug rounded-xl transition-all duration-150 cursor-pointer px-6 py-4"
                  style={{
                    backgroundColor: "#FF9900",
                    boxShadow: "0 6px 0 #CC7A00",
                    minHeight: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.animationPlayState = "paused";
                    el.style.transform = "translateY(-2px)";
                    el.style.filter = "brightness(1.08)";
                    el.style.boxShadow = "0 8px 0 #CC7A00";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.animationPlayState = "running";
                    el.style.transform = "translateY(0)";
                    el.style.filter = "brightness(1)";
                    el.style.boxShadow = "0 6px 0 #CC7A00";
                  }}
                  onMouseDown={(e) => {
                    const el = e.currentTarget;
                    el.style.animationPlayState = "paused";
                    el.style.transform = "translateY(2px)";
                    el.style.boxShadow = "0 2px 0 #CC7A00";
                  }}
                  onMouseUp={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 8px 0 #CC7A00";
                  }}
                >
                  <span className="block">Book Your Free 3D Design Consult Now &amp;</span>
                  <span className="block">Get 20% off my entire order <span className="cta-arrow">&#8594;</span></span>
                </a>

                <p className="text-xs text-brand-text-muted -mt-3">
                  Limited availability. Spots fill up fast.
                </p>

                {/* What you get */}
                <ul className="text-left space-y-3">
                  {[
                    "One-on-one consultation with a designer",
                    "Free 3D design rendering — see your space before you buy",
                    "Solid hardwood, dovetail drawers, soft-close",
                    "Ready to assemble, shipped flat-packed to your door",
                    "Each cabinet assembles in about 30 minutes",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base text-brand-text-secondary"
                    >
                      <span className="text-brand-gold text-lg leading-none mt-px">
                        &#10003;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* 3D Design Consult — integrated naturally, not as a "bonus" header */}
                <div className="bg-brand-warm-gray rounded-xl p-5 border border-zinc-100 text-left">
                  <h2 className="text-lg font-bold text-brand-text-primary">
                    Free 3D Design Consultation — a $500 value
                  </h2>
                  <p className="text-brand-text-secondary text-base mt-1">
                    See your project in full 3D before you buy. No obligation.
                  </p>
                </div>

                {/* Shipping callout */}
                {qualifiesForFreeShipping ? (
                  <div className="bg-brand-warm-gray rounded-xl p-4 text-center">
                    <p className="text-brand-text-secondary text-base">
                      Shipping runs $499–$699 depending on order size.{" "}
                      <span className="font-medium">
                        Orders over $4,000 paid in full ship free.
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="bg-brand-warm-gray rounded-xl p-4 text-center">
                    <p className="text-brand-text-secondary text-base">
                      Shipping runs $499–$699 depending on order size.
                    </p>
                  </div>
                )}

                {/* Financing note */}
                <div className="border-t border-zinc-100 pt-5">
                  <p className="text-sm text-brand-text-muted">
                    Financing available. 0% interest if paid in full within 12 months.
                  </p>
                </div>

                {/* Countdown timer */}
                <div className="bg-brand-charcoal rounded-xl p-4 text-center">
                  <p className="text-white/70 text-sm mb-1">
                    Your spot and pricing are held for:
                  </p>
                  {timerExpired ? (
                    <p className="text-red-400 text-base font-semibold">
                      Time expired — book now to secure your spot.
                    </p>
                  ) : (
                    <p className="text-brand-gold text-3xl font-bold tabular-nums">
                      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // ─── Survey Shell ────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col" style={{ fontSize: "16px" }}>
      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <ExitIntentPopup
            onClose={() => setShowExitPopup(false)}
            onContinue={() => setShowExitPopup(false)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="py-4 border-b border-zinc-200">
        <div className="max-w-2xl mx-auto px-4 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Jessen Cabinets"
            width={160}
            height={53}
            className="h-10 w-auto"
          />
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-lg mx-auto w-full px-6 pt-6">
        <ProgressBar step={step} />
        <p className="text-xs text-brand-text-muted mt-2 text-right">
          {step + 1} of {TOTAL_STEPS}
        </p>
      </div>

      {/* Step Content */}
      <main className="flex-1 flex items-start justify-center px-4 pt-8 pb-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {/* ── Step 0: Zip Code ── */}
            {step === 0 && (
              <motion.div
                key="zip"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="First, let's check if we deliver to your area."
                  subtitle="We ship flat-packed cabinets direct to your door across the U.S."
                />
                <form
                  onSubmit={handleZipSubmit}
                  className="mt-8"
                >
                  <label
                    htmlFor="zip"
                    className="block text-base font-medium text-brand-text-primary mb-2"
                  >
                    Zip code
                  </label>
                  <input
                    id="zip"
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    pattern="[0-9]{5}"
                    required
                    value={data.zipCode}
                    onChange={(e) =>
                      update(
                        "zipCode",
                        e.target.value.replace(/\D/g, "").slice(0, 5)
                      )
                    }
                    placeholder="e.g. 30075"
                    className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3.5 text-lg text-brand-text-primary placeholder:text-zinc-400 focus:border-brand-gold focus:ring-0"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={data.zipCode.length !== 5}
                    className="mt-6 w-full bg-brand-gold hover:bg-brand-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-brand-charcoal font-semibold py-3.5 rounded-xl transition-colors cursor-pointer text-lg"
                  >
                    Check Availability
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── Step 1: Congrats Slide ── */}
            {step === 1 && (
              <motion.div
                key="congrats"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <CongratsSlide onContinue={next} onConfetti={fireConfetti} />
              </motion.div>
            )}

            {/* ── Step 2: White Shaker Qualifier ── */}
            {step === 2 && (
              <motion.div
                key="white-shaker"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-[22px] md:text-[28px] font-bold text-brand-text-primary tracking-tight leading-tight">
                  Before we go further
                </h1>
                <div className="mt-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-4">
                    <div className="text-base font-semibold text-brand-text-primary mb-1">What is white shaker?</div>
                    <div className="text-sm text-brand-text-secondary leading-relaxed">
                      A classic cabinet style with a simple frame-and-panel door in white. Clean, timeless, and works with almost any countertop or backsplash. Painted white on the inside AND outside — no other RTA company does that.
                    </div>
                  </div>
                  <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-4">
                    <div className="text-base font-semibold text-brand-text-primary mb-1">What does ready to assemble mean?</div>
                    <div className="text-sm text-brand-text-secondary leading-relaxed">
                      Cabinets ship flat-packed to your door. You or your contractor assembles them on-site. Each cabinet typically takes about 30 minutes.
                    </div>
                  </div>
                </div>
                <p className="text-base text-brand-text-secondary mb-4">
                  Jessen Cabinets specializes exclusively in white shaker, ready to assemble cabinets. Does that work for your project?
                </p>
                <div className="space-y-3">
                  {whiteShakerOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={data.whiteShaker === opt.value}
                      onClick={() => selectWhiteShaker(opt.value)}
                    >
                      <span className="text-base font-medium text-brand-text-primary block">
                        {opt.label}
                      </span>
                      <span className="text-sm text-brand-text-muted block mt-0.5">
                        {opt.sub}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 3: Style (multi-select) ── */}
            {step === 3 && (
              <motion.div
                key="style"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="What matters most to you in a cabinet?"
                  subtitle="Select all that apply. This helps us tailor your consultation."
                />
                <div className="mt-8 space-y-3">
                  {styleOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={data.style.includes(opt.value)}
                      onClick={() => {
                        setData((prev) => {
                          const current = prev.style;
                          const updated = current.includes(opt.value)
                            ? current.filter((v) => v !== opt.value)
                            : [...current, opt.value];
                          return { ...prev, style: updated };
                        });
                      }}
                    >
                      <span className="text-base font-medium text-brand-text-primary block">
                        {opt.label}
                      </span>
                      <span className="text-sm text-brand-text-muted block mt-0.5">
                        {opt.sub}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                {data.style.length > 0 && (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="mt-6 w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold py-3.5 rounded-xl transition-colors cursor-pointer text-lg"
                  >
                    Continue
                  </button>
                )}
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 4: Measurements ── */}
            {step === 4 && (
              <motion.div
                key="measurements"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="Do you have your room measurements ready?"
                  subtitle="No worries if not — we'll help you get set up."
                />
                <div className="mt-8 space-y-3">
                  {measurementOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={data.measurements === opt.value}
                      onClick={() => selectAndAdvance("measurements", opt.value)}
                    >
                      <span className="text-base font-medium text-brand-text-primary block">
                        {opt.label}
                      </span>
                      <span className="text-sm text-brand-text-muted block mt-0.5">
                        {opt.sub}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 5: Timeline ── */}
            {step === 5 && (
              <motion.div
                key="timeline"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="When are you looking to get started?"
                  subtitle="No pressure. We work on your timeline."
                />
                <div className="mt-8 space-y-3">
                  {timelineOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={data.timeline === opt.value}
                      onClick={() => selectAndAdvance("timeline", opt.value)}
                    >
                      <span className="text-base font-medium text-brand-text-primary block">
                        {opt.label}
                      </span>
                      <span className="text-sm text-brand-text-muted block mt-0.5">
                        {opt.sub}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 6: Financing ── */}
            {step === 6 && (
              <motion.div
                key="financing"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="Do you need financing?"
                  subtitle="We offer flexible financing with 0% interest if paid within 12 months."
                />
                <div className="mt-8 space-y-3">
                  {financingOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={data.financing === opt.value}
                      onClick={() => selectAndAdvance("financing", opt.value)}
                    >
                      <span className="text-base font-medium text-brand-text-primary block">
                        {opt.label}
                      </span>
                      <span className="text-sm text-brand-text-muted block mt-0.5">
                        {opt.sub}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 7: Contact Info (skipped if skipContact=true) ── */}
            {step === 7 && !skipContact && (
              <motion.div
                key="contact"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="Almost done. Where should we send your results?"
                  subtitle="We'll also use this to set up your free consultation."
                />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Fire contact webhook then submit
                    fireWebhook("contact", data, false, true, true).then(() => {
                      handleSubmit(e);
                    });
                  }}
                  className="mt-8 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-base font-medium text-brand-text-primary mb-1"
                      >
                        First name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        value={data.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-base text-brand-text-primary placeholder:text-zinc-400 focus:border-brand-gold focus:ring-0"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-base font-medium text-brand-text-primary mb-1"
                      >
                        Last name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        value={data.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-base text-brand-text-primary placeholder:text-zinc-400 focus:border-brand-gold focus:ring-0"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-base font-medium text-brand-text-primary mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-base text-brand-text-primary placeholder:text-zinc-400 focus:border-brand-gold focus:ring-0"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-base font-medium text-brand-text-primary mb-1"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(555) 555-5555"
                      className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-base text-brand-text-primary placeholder:text-zinc-400 focus:border-brand-gold focus:ring-0"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand-gold hover:bg-brand-gold-dark disabled:opacity-60 text-brand-charcoal font-semibold py-3.5 rounded-xl transition-colors cursor-pointer text-lg"
                    style={{ minHeight: "56px" }}
                  >
                    {submitting ? "Checking..." : "See My Results"}
                  </button>
                </form>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 7 (skipContact=true): Auto-advance handled by useEffect ── */}
            {step === 7 && skipContact && (
              <motion.div
                key="contact-skip"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="Almost there..."
                  subtitle="Checking your answers."
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// ─── Congrats Slide Component ────────────────────────────────────────────────

function CongratsSlide({
  onContinue,
  onConfetti,
}: {
  onContinue: () => void;
  onConfetti: () => void;
}) {
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (!hasFiredRef.current) {
      hasFiredRef.current = true;
      onConfetti();
    }
    const t = setTimeout(onContinue, 2000);
    return () => clearTimeout(t);
  }, [onContinue, onConfetti]);

  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
        className="w-20 h-20 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center mx-auto mb-6"
      >
        <span className="text-brand-gold text-4xl font-bold">&#10003;</span>
      </motion.div>
      <h1 className="text-[22px] md:text-[28px] font-bold text-brand-text-primary tracking-tight mb-3">
        Great news — we ship to your area!
      </h1>
      <p className="text-brand-text-secondary text-base leading-relaxed max-w-sm mx-auto mb-8">
        Jessen Cabinets delivers flat-packed, ready-to-assemble cabinets direct to your door.
      </p>
      <button
        onClick={onContinue}
        className="bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold py-3.5 px-8 rounded-xl transition-colors cursor-pointer text-lg"
      >
        Let&apos;s Get Started
      </button>
    </div>
  );
}
