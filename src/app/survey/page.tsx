"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SurveyData {
  zipCode: string;
  projectSpace: string;
  style: string;
  scope: string;
  timeline: string;
  budget: string;
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

const TOTAL_STEPS = 8;

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
    timeline: "",
    budget: "",
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);

      // Submit to GHL or webhook
      try {
        const utmRaw = sessionStorage.getItem("utmData");
        const utmData = utmRaw ? JSON.parse(utmRaw) : {};

        await fetch(
          "https://services.leadconnectorhq.com/hooks/cObQXIqcbjUWRdqwM6aq/webhook/survey",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, ...utmData }),
          }
        ).catch(() => {
          // Silent fail - we'll still show the offer
        });
      } catch {
        // Silent fail
      }

      setSubmitting(false);
      setSubmitted(true);
    },
    [data]
  );

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
                <div>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">
                    Based on your answers, we ship to your area and your project
                    is a perfect fit for our premium white shaker line.
                  </p>
                </div>

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
                    "Delivered direct to your door",
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
                <h1 className="text-2xl md:text-3xl font-bold text-brand-text-primary tracking-tight">
                  First, let&apos;s check if we deliver to your area.
                </h1>
                <p className="text-brand-text-secondary mt-2 text-sm">
                  We ship direct to your door across the U.S.
                </p>
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
                <h1 className="text-2xl md:text-3xl font-bold text-brand-text-primary tracking-tight">
                  What room are you working on?
                </h1>
                <p className="text-brand-text-secondary mt-2 text-sm">
                  Pick the space that needs new cabinets.
                </p>
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
                <h1 className="text-2xl md:text-3xl font-bold text-brand-text-primary tracking-tight">
                  What matters most to you in a cabinet?
                </h1>
                <p className="text-brand-text-secondary mt-2 text-sm">
                  There&apos;s no wrong answer. This helps us tailor your
                  consultation.
                </p>
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
                <h1 className="text-2xl md:text-3xl font-bold text-brand-text-primary tracking-tight">
                  What does your project look like?
                </h1>
                <p className="text-brand-text-secondary mt-2 text-sm">
                  This helps us understand the size of the job.
                </p>
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

            {/* ── Step 4: Timeline ── */}
            {step === 4 && (
              <motion.div
                key="timeline"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-brand-text-primary tracking-tight">
                  When are you looking to get started?
                </h1>
                <p className="text-brand-text-secondary mt-2 text-sm">
                  No pressure. We work on your timeline.
                </p>
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

            {/* ── Step 5: Budget ── */}
            {step === 5 && (
              <motion.div
                key="budget"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-brand-text-primary tracking-tight">
                  Do you have a budget in mind?
                </h1>
                <p className="text-brand-text-secondary mt-2 text-sm">
                  Just a ballpark. Helps us recommend the right package.
                </p>
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

            {/* ── Step 6: Contact Info ── */}
            {step === 6 && (
              <motion.div
                key="contact"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-brand-text-primary tracking-tight">
                  Almost done. Where should we send your results?
                </h1>
                <p className="text-brand-text-secondary mt-2 text-sm">
                  We&apos;ll also use this to set up your free consultation.
                </p>
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

            {/* ── Step 7: Confirmation / Submit ── */}
            {step === 7 && (
              <motion.div
                key="confirm"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-brand-text-primary tracking-tight">
                  Here&apos;s what you told us, {data.firstName}.
                </h1>
                <p className="text-brand-text-secondary mt-2 text-sm">
                  Look good? Hit the button and we&apos;ll check your
                  eligibility.
                </p>

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

// ─── Small Components ────────────────────────────────────────────────────────

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
