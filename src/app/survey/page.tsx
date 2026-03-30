"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SurveyData {
  zipCode: string;
  projectSpace: string;
  style: string;
  scope: string;
  cabinetCount: string;
  hasInstaller: string;
  timeline: string;
  budget: string;
  financing: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// ─── Step Definitions ────────────────────────────────────────────────────────

const projectSpaces = [
  { value: "kitchen", label: "Kitchen", icon: "🍳" },
  { value: "bathroom", label: "Bathroom", icon: "🚿" },
  { value: "laundry", label: "Laundry Room", icon: "👕" },
  { value: "pantry", label: "Pantry / Butler's Pantry", icon: "🏺" },
  { value: "mudroom", label: "Mudroom / Entryway", icon: "🚪" },
  { value: "other", label: "Other / Multiple Rooms", icon: "🏠" },
];

const styleOptions = [
  {
    value: "timeless",
    label: "A timeless, classic look that never dates",
    sub: "Clean lines, no trends to age out of",
  },
  {
    value: "versatile",
    label: "Something that pairs with any countertop or backsplash",
    sub: "Flexibility to change your mind on finishes",
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

const scopeOptions = [
  { value: "full-remodel", label: "Full remodel", sub: "Gutting it and starting fresh" },
  { value: "cabinet-replacement", label: "Replacing existing cabinets", sub: "Keeping the layout, upgrading the cabinets" },
  { value: "new-construction", label: "New construction", sub: "Building from the ground up" },
  { value: "adding", label: "Adding cabinets to existing space", sub: "Island, pantry wall, extra storage" },
];

const cabinetCountOptions = [
  { value: "1-10", label: "1 to 10 cabinets", sub: "Small project or single area" },
  { value: "11-20", label: "11 to 20 cabinets", sub: "Average kitchen" },
  { value: "21-35", label: "21 to 35 cabinets", sub: "Large kitchen or multiple areas" },
  { value: "35+", label: "35+ cabinets", sub: "Full home or major remodel" },
  { value: "not-sure", label: "Not sure yet", sub: "We'll help you figure it out" },
];

const installerOptions = [
  {
    value: "yes-contractor",
    label: "Yes, I have a contractor",
    sub: "They'll handle assembly and installation",
  },
  {
    value: "yes-diy",
    label: "I'll do it myself",
    sub: "Average cabinet takes about 30 minutes to assemble",
  },
  {
    value: "need-help",
    label: "I need help finding someone",
    sub: "We can connect you with local installers",
  },
];

const timelineOptions = [
  { value: "now", label: "Ready to order", sub: "Let's go" },
  { value: "1-month", label: "Within a month", sub: "Finalizing details" },
  { value: "3-6-months", label: "3 to 6 months out", sub: "Planning ahead" },
  { value: "exploring", label: "Just exploring options", sub: "No rush, doing research" },
];

const budgetOptions = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-20k", label: "$10,000 - $20,000" },
  { value: "20k-plus", label: "$20,000+" },
  { value: "not-sure", label: "Not sure yet" },
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

const TOTAL_STEPS = 11;
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center px-4 py-3">
      <span className="text-xs text-brand-text-muted uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm text-brand-text-primary font-medium text-right max-w-[60%]">
        {value}
      </span>
    </div>
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
      <h1 className="text-2xl md:text-3xl font-bold text-brand-text-primary tracking-tight">
        {title}
      </h1>
      <p className="text-brand-text-secondary mt-2 text-sm">{subtitle}</p>
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

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SurveyPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<SurveyData>({
    zipCode: "",
    projectSpace: "",
    style: "",
    scope: "",
    cabinetCount: "",
    hasInstaller: "",
    timeline: "",
    budget: "",
    financing: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

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

  const qualifiesForFreeShipping =
    ["10k-20k", "20k-plus"].includes(data.budget) &&
    data.financing !== "financing";

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);

      try {
        const utmRaw =
          typeof window !== "undefined"
            ? sessionStorage.getItem("utmData")
            : null;
        const utmData = utmRaw ? JSON.parse(utmRaw) : {};

        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            funnel_source: utmData.utm_source || "jessen_survey",
            funnel_page: "survey",
            submitted_at: new Date().toISOString(),
            page_url:
              typeof window !== "undefined" ? window.location.href : "",
            ...utmData,
          }),
          mode: "no-cors",
        }).catch(() => {});
      } catch {
        // Silent fail
      }

      setSubmitting(false);
      setSubmitted(true);
    },
    [data]
  );

  // Fire confetti on reveal
  useEffect(() => {
    if (submitted) {
      fireConfetti();
    }
  }, [submitted]);

  // ─── Reveal Page ─────────────────────────────────────────────────────────

  if (submitted) {
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
                  You qualify for 20% off
                </h1>
              </div>

              <div className="px-6 py-8 space-y-6">
                <p className="text-brand-text-secondary text-sm leading-relaxed">
                  Based on your answers, we ship to your area and your project
                  is a perfect fit for our premium white shaker line.
                </p>

                {/* Free Shipping callout */}
                {qualifiesForFreeShipping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
                  >
                    <p className="text-green-700 font-bold text-lg">
                      &#127881; FREE Shipping Included! &#127881;
                    </p>
                    <p className="text-green-600 text-xs mt-1">
                      Orders over $4,000 paid in full ship free. You just saved
                      $499 - $699.
                    </p>
                  </motion.div>
                )}

                {!qualifiesForFreeShipping && (
                  <div className="bg-brand-warm-gray rounded-xl p-4 text-center">
                    <p className="text-brand-text-secondary text-sm">
                      Shipping runs $499 - $699 depending on order size.
                      {data.financing !== "financing" && (
                        <span className="font-medium">
                          {" "}Orders over $4,000 paid in full ship free!
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {/* Bonus */}
                <div className="bg-brand-warm-gray rounded-xl p-5 border border-zinc-100">
                  <p className="text-xs font-semibold tracking-widest text-brand-gold-dark uppercase">
                    Bonus included
                  </p>
                  <h2 className="text-xl font-bold text-brand-text-primary mt-2">
                    Free 3D Design Consultation
                  </h2>
                  <p className="text-brand-text-secondary text-sm mt-1">
                    A $500 value. See your project in full 3D before you buy.
                    No obligation.
                  </p>
                </div>

                {/* What you get */}
                <ul className="text-left space-y-3">
                  {[
                    "20% off your entire cabinet order",
                    "Free 3D design rendering of your space",
                    "One-on-one consultation with a designer",
                    "Solid hardwood, dovetail drawers, soft-close",
                    "Ready to assemble, shipped flat-packed to your door",
                    "Average cabinet assembles in about 30 minutes",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-brand-text-secondary"
                    >
                      <span className="text-brand-gold text-lg leading-none mt-px">
                        &#10003;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Financing note */}
                <div className="border-t border-zinc-100 pt-5">
                  <p className="text-xs text-brand-text-muted">
                    Financing available. 0% interest if paid in full within 12
                    months. Flexible monthly payments for every budget.
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="https://api.leadconnectorhq.com/widget/booking/zJhQa1OgSFxbW2ulmclx"
                  className="block w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold text-center py-4 rounded-xl transition-colors text-base"
                >
                  Book Your Free 3D Design Consult
                </a>

                <p className="text-xs text-brand-text-muted">
                  Limited availability. Spots fill up fast.
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // ─── Survey Shell ────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (data.zipCode.length === 5) next();
                  }}
                  className="mt-8"
                >
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium text-brand-text-primary mb-2"
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
                    className="mt-6 w-full bg-brand-gold hover:bg-brand-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-brand-charcoal font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Check Availability
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── Step 1: Project Space ── */}
            {step === 1 && (
              <motion.div
                key="space"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="What room are you working on?"
                  subtitle="Pick the space that needs new cabinets."
                />
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {projectSpaces.map((space) => (
                    <OptionCard
                      key={space.value}
                      selected={data.projectSpace === space.value}
                      onClick={() =>
                        selectAndAdvance("projectSpace", space.value)
                      }
                    >
                      <span className="text-2xl block mb-1">{space.icon}</span>
                      <span className="text-sm font-medium text-brand-text-primary">
                        {space.label}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 2: Style ── */}
            {step === 2 && (
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
                  subtitle="There's no wrong answer. This helps us tailor your consultation."
                />
                <div className="mt-8 space-y-3">
                  {styleOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={data.style === opt.value}
                      onClick={() => selectAndAdvance("style", opt.value)}
                    >
                      <span className="text-sm font-medium text-brand-text-primary block">
                        {opt.label}
                      </span>
                      <span className="text-xs text-brand-text-muted block mt-0.5">
                        {opt.sub}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 3: Project Scope ── */}
            {step === 3 && (
              <motion.div
                key="scope"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="What does your project look like?"
                  subtitle="This helps us understand the size of the job."
                />
                <div className="mt-8 space-y-3">
                  {scopeOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={data.scope === opt.value}
                      onClick={() => selectAndAdvance("scope", opt.value)}
                    >
                      <span className="text-sm font-medium text-brand-text-primary block">
                        {opt.label}
                      </span>
                      <span className="text-xs text-brand-text-muted block mt-0.5">
                        {opt.sub}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 4: Cabinet Count ── */}
            {step === 4 && (
              <motion.div
                key="count"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="How many cabinets do you think you'll need?"
                  subtitle="Just a rough estimate. Your designer will help finalize the count."
                />
                <div className="mt-8 space-y-3">
                  {cabinetCountOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={data.cabinetCount === opt.value}
                      onClick={() =>
                        selectAndAdvance("cabinetCount", opt.value)
                      }
                    >
                      <span className="text-sm font-medium text-brand-text-primary block">
                        {opt.label}
                      </span>
                      <span className="text-xs text-brand-text-muted block mt-0.5">
                        {opt.sub}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 5: Assembly / Installer ── */}
            {step === 5 && (
              <motion.div
                key="installer"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="Do you have someone to assemble and install?"
                  subtitle="Our cabinets ship flat-packed and ready to assemble. Average cabinet takes about 30 minutes."
                />
                <div className="mt-8 space-y-3">
                  {installerOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={data.hasInstaller === opt.value}
                      onClick={() =>
                        selectAndAdvance("hasInstaller", opt.value)
                      }
                    >
                      <span className="text-sm font-medium text-brand-text-primary block">
                        {opt.label}
                      </span>
                      <span className="text-xs text-brand-text-muted block mt-0.5">
                        {opt.sub}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 6: Timeline ── */}
            {step === 6 && (
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
                      <span className="text-sm font-medium text-brand-text-primary block">
                        {opt.label}
                      </span>
                      <span className="text-xs text-brand-text-muted block mt-0.5">
                        {opt.sub}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 7: Budget ── */}
            {step === 7 && (
              <motion.div
                key="budget"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="Do you have a budget in mind?"
                  subtitle="Just a ballpark. Helps us recommend the right package."
                />
                <div className="mt-8 space-y-3">
                  {budgetOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={data.budget === opt.value}
                      onClick={() => selectAndAdvance("budget", opt.value)}
                    >
                      <span className="text-sm font-medium text-brand-text-primary">
                        {opt.label}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 8: Financing ── */}
            {step === 8 && (
              <motion.div
                key="financing"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="How are you planning to pay?"
                  subtitle="We offer flexible financing with 0% interest if paid within 12 months."
                />
                <div className="mt-8 space-y-3">
                  {financingOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={data.financing === opt.value}
                      onClick={() => selectAndAdvance("financing", opt.value)}
                    >
                      <span className="text-sm font-medium text-brand-text-primary block">
                        {opt.label}
                      </span>
                      <span className="text-xs text-brand-text-muted block mt-0.5">
                        {opt.sub}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 9: Contact Info ── */}
            {step === 9 && (
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
                    next();
                  }}
                  className="mt-8 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-brand-text-primary mb-1"
                      >
                        First name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        value={data.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-brand-text-primary placeholder:text-zinc-400 focus:border-brand-gold focus:ring-0"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-brand-text-primary mb-1"
                      >
                        Last name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        value={data.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-brand-text-primary placeholder:text-zinc-400 focus:border-brand-gold focus:ring-0"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-brand-text-primary mb-1"
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
                      className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-brand-text-primary placeholder:text-zinc-400 focus:border-brand-gold focus:ring-0"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-brand-text-primary mb-1"
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
                      className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-brand-text-primary placeholder:text-zinc-400 focus:border-brand-gold focus:ring-0"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    See My Results
                  </button>
                </form>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 10: Confirmation / Submit ── */}
            {step === 10 && (
              <motion.div
                key="confirm"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title={`Here's what you told us, ${data.firstName}.`}
                  subtitle="Look good? Hit the button and we'll check your eligibility."
                />

                <div className="mt-8 bg-white rounded-xl border border-zinc-200 divide-y divide-zinc-100">
                  <SummaryRow label="Zip code" value={data.zipCode} />
                  <SummaryRow
                    label="Room"
                    value={
                      projectSpaces.find((s) => s.value === data.projectSpace)
                        ?.label || data.projectSpace
                    }
                  />
                  <SummaryRow
                    label="Priority"
                    value={
                      styleOptions.find((s) => s.value === data.style)?.label ||
                      data.style
                    }
                  />
                  <SummaryRow
                    label="Project"
                    value={
                      scopeOptions.find((s) => s.value === data.scope)?.label ||
                      data.scope
                    }
                  />
                  <SummaryRow
                    label="Cabinets"
                    value={
                      cabinetCountOptions.find(
                        (s) => s.value === data.cabinetCount
                      )?.label || data.cabinetCount
                    }
                  />
                  <SummaryRow
                    label="Assembly"
                    value={
                      installerOptions.find(
                        (s) => s.value === data.hasInstaller
                      )?.label || data.hasInstaller
                    }
                  />
                  <SummaryRow
                    label="Timeline"
                    value={
                      timelineOptions.find((s) => s.value === data.timeline)
                        ?.label || data.timeline
                    }
                  />
                  <SummaryRow
                    label="Budget"
                    value={
                      budgetOptions.find((s) => s.value === data.budget)
                        ?.label || data.budget
                    }
                  />
                  <SummaryRow
                    label="Payment"
                    value={
                      financingOptions.find((s) => s.value === data.financing)
                        ?.label || data.financing
                    }
                  />
                  <SummaryRow label="Email" value={data.email} />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="mt-6 w-full bg-brand-gold hover:bg-brand-gold-dark disabled:opacity-60 text-brand-charcoal font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
                >
                  {submitting ? "Checking..." : "See If I Qualify"}
                </button>
                <BackButton onClick={back} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
