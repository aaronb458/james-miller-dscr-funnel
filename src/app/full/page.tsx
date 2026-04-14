"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowRight, CircleNotch } from "@phosphor-icons/react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  smsConsent: boolean;
}

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
}

// ─── Constants ───────────────────────────────────────────────────────────────

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/cObQXIqcbjUWRdqwM6aq/webhook-trigger/6a8a72a8-04be-42c8-a827-857eb88f44b5";

const homeownerProjectTypes = [
  "Kitchen Cabinets",
  "Bathroom Vanity",
  "Laundry Room Cabinets",
  "Full Home Cabinet Package",
  "Other",
];

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

// Step 0 = contact form, Steps 1-9 = survey questions, Step 10 = summary confirmation
const TOTAL_STEPS = 11;

// ─── Animation Variants ──────────────────────────────────────────────────────

const pageVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

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

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-brand-text-primary tracking-tight">
        {title}
      </h1>
      <p className="text-brand-text-secondary mt-2 text-sm">{subtitle}</p>
    </>
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

// ─── Confetti ────────────────────────────────────────────────────────────────

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
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function FullPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [utmData, setUtmData] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    smsConsent: false,
  });

  const [surveyData, setSurveyData] = useState<SurveyData>({
    zipCode: "",
    projectSpace: "",
    style: "",
    scope: "",
    cabinetCount: "",
    hasInstaller: "",
    timeline: "",
    budget: "",
    financing: "",
  });

  // Load UTM data from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("utmData");
      if (stored) setUtmData(JSON.parse(stored));
    } catch {
      // sessionStorage not available
    }
  }, []);

  const updateSurvey = useCallback((field: keyof SurveyData, value: string) => {
    setSurveyData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const next = useCallback(() => setStep((s) => s + 1), []);
  const back = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  const selectAndAdvance = useCallback(
    (field: keyof SurveyData, value: string) => {
      updateSurvey(field, value);
      setTimeout(() => setStep((s) => s + 1), 300);
    },
    [updateSurvey]
  );

  // ─── Form Step Validation ─────────────────────────────────────────────────

  function validateForm(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Please enter a valid email";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-().]{7,}$/.test(formData.phone))
      errors.phone = "Please enter a valid phone number";
    if (!formData.projectType) errors.projectType = "Please select a project type";
    if (!formData.smsConsent) errors.smsConsent = "Please agree to receive messages";
    return errors;
  }

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsFormSubmitting(true);

    // Save lead data to sessionStorage so choose-designer can prefill the calendar
    try {
      sessionStorage.setItem(
        "leadData",
        JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        })
      );
    } catch {
      // sessionStorage not available
    }

    // Small delay for UX feel, then advance to survey
    setTimeout(() => {
      setIsFormSubmitting(false);
      next();
    }, 400);
  }

  // ─── Final Submit (fires combined webhook) ────────────────────────────────

  const qualifiesForFreeShipping =
    ["10k-20k", "20k-plus"].includes(surveyData.budget) &&
    surveyData.financing !== "financing";

  const handleFinalSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        sms_consent: formData.smsConsent,
        ab_variant: "full-form-survey",
        funnel_source: utmData.utm_source || "jessen_facebook",
        funnel_page: "homeowner_full",
        submitted_at: new Date().toISOString(),
        page_url: typeof window !== "undefined" ? window.location.href : "",
        utm_source: utmData.utm_source || "",
        utm_medium: utmData.utm_medium || "",
        utm_campaign: utmData.utm_campaign || "",
        utm_content: utmData.utm_content || "",
        utm_term: utmData.utm_term || "",
        survey_zip_code: surveyData.zipCode,
        survey_project_space: surveyData.projectSpace,
        survey_style: surveyData.style,
        survey_scope: surveyData.scope,
        survey_cabinet_count: surveyData.cabinetCount,
        survey_has_installer: surveyData.hasInstaller,
        survey_timeline: surveyData.timeline,
        survey_budget: surveyData.budget,
        survey_financing: surveyData.financing,
        survey_white_shaker_confirmed: "",
      };

      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          mode: "no-cors",
        });
      } catch {
        // Fire and forget
      }

      // PostHog tracking
      if (
        typeof window !== "undefined" &&
        (window as Window & { posthog?: { capture: (e: string, p?: Record<string, unknown>) => void } }).posthog
      ) {
        (window as Window & { posthog?: { capture: (e: string, p?: Record<string, unknown>) => void } }).posthog!.capture(
          "full_form_survey_submit",
          {
            ab_variant: "full-form-survey",
            project_space: surveyData.projectSpace,
            budget: surveyData.budget,
            timeline: surveyData.timeline,
            ...utmData,
          }
        );
      }

      setSubmitting(false);
      setSubmitted(true);
    },
    [formData, surveyData, utmData]
  );

  // Fire confetti on reveal
  useEffect(() => {
    if (submitted) fireConfetti();
  }, [submitted]);

  // ─── Reveal Screen ────────────────────────────────────────────────────────

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
                  Great news, {formData.firstName}!
                </p>
                <h1 className="text-brand-charcoal text-2xl md:text-3xl font-bold mt-1">
                  You Qualify for Our Premium White Shaker Cabinets!
                </h1>
                <p className="text-brand-charcoal text-base font-semibold mt-2">
                  Plus a FREE $500 3D Design Consultation
                </p>
              </div>

              <div className="px-6 py-8 space-y-6">
                <p className="text-brand-text-secondary text-sm leading-relaxed">
                  Based on your answers, we ship to your area and your project
                  is a perfect fit for our premium white shaker line.
                </p>

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
                      {surveyData.financing !== "financing" && (
                        <span className="font-medium">
                          {" "}Orders over $4,000 paid in full ship free!
                        </span>
                      )}
                    </p>
                  </div>
                )}

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

                <div className="border-t border-zinc-100 pt-5">
                  <p className="text-xs text-brand-text-muted">
                    Financing available. 0% interest if paid in full within 12
                    months. Flexible monthly payments for every budget.
                  </p>
                </div>

                <button
                  onClick={() => router.push("/choose-designer")}
                  className="block w-full bg-[#FF9900] hover:bg-[#CC7A00] text-brand-charcoal font-semibold text-center py-4 rounded-xl transition-colors text-base cursor-pointer"
                >
                  Book Your Free 3D Design Consult
                </button>

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

  // ─── Survey Shell ─────────────────────────────────────────────────────────

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

            {/* ── Step 0: Contact Info Form ── */}
            {step === 0 && (
              <motion.div
                key="contact-form"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <StepHeading
                  title="Get Your Free 3D Cabinet Design"
                  subtitle="Takes 2 minutes. No obligation. See your project before you buy."
                />
                <form onSubmit={handleFormSubmit} className="mt-8 space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-brand-text-primary mb-1.5"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        autoComplete="given-name"
                        autoCapitalize="words"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-zinc-200 bg-white text-brand-text-primary placeholder:text-zinc-400 text-sm transition-all duration-200 focus:border-brand-gold focus:ring-0"
                        placeholder="Your first name"
                      />
                      {formErrors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-brand-text-primary mb-1.5"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        autoComplete="family-name"
                        autoCapitalize="words"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-zinc-200 bg-white text-brand-text-primary placeholder:text-zinc-400 text-sm transition-all duration-200 focus:border-brand-gold focus:ring-0"
                        placeholder="Your last name"
                      />
                      {formErrors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-brand-text-primary mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-zinc-200 bg-white text-brand-text-primary placeholder:text-zinc-400 text-sm transition-all duration-200 focus:border-brand-gold focus:ring-0"
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-brand-text-primary mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-zinc-200 bg-white text-brand-text-primary placeholder:text-zinc-400 text-sm transition-all duration-200 focus:border-brand-gold focus:ring-0"
                      placeholder="(555) 123-4567"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-brand-text-primary mb-1.5"
                    >
                      What are you looking for?
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-zinc-200 bg-white text-brand-text-primary text-sm transition-all duration-200 appearance-none cursor-pointer focus:border-brand-gold focus:ring-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(0,0,0,0.4)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                      }}
                    >
                      <option value="">Select what you need</option>
                      {homeownerProjectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {formErrors.projectType && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.projectType}</p>
                    )}
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.smsConsent}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            smsConsent: e.target.checked,
                          }));
                          if (formErrors.smsConsent) {
                            setFormErrors((prev) => {
                              const next = { ...prev };
                              delete next.smsConsent;
                              return next;
                            });
                          }
                        }}
                        className="mt-1 h-4 w-4 rounded border-zinc-300 flex-shrink-0"
                      />
                      <span className="text-brand-text-muted text-xs leading-relaxed">
                        By checking this box, you agree to receive text messages from Jessen
                        Cabinets at the phone number provided. Message and data rates may
                        apply. Message frequency varies. Reply STOP to opt out. Reply HELP
                        for help. View our{" "}
                        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-text-secondary">Privacy Policy</a>{" "}and{" "}
                        <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-text-secondary">Terms of Service</a>.
                      </span>
                    </label>
                    {formErrors.smsConsent && (
                      <p className="text-red-500 text-xs mt-1.5 ml-7">{formErrors.smsConsent}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold py-4 px-8 rounded-xl text-base transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isFormSubmitting ? (
                      <>
                        <CircleNotch size={20} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Start My Free Design Quiz
                        <ArrowRight size={20} weight="bold" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── Step 1: Zip Code ── */}
            {step === 1 && (
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
                    if (surveyData.zipCode.length === 5) next();
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
                    value={surveyData.zipCode}
                    onChange={(e) =>
                      updateSurvey("zipCode", e.target.value.replace(/\D/g, "").slice(0, 5))
                    }
                    placeholder="e.g. 30075"
                    className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3.5 text-lg text-brand-text-primary placeholder:text-zinc-400 focus:border-brand-gold focus:ring-0"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={surveyData.zipCode.length !== 5}
                    className="mt-6 w-full bg-brand-gold hover:bg-brand-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-brand-charcoal font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Check Availability
                  </button>
                </form>
                <BackButton onClick={back} />
              </motion.div>
            )}

            {/* ── Step 2: Project Space ── */}
            {step === 2 && (
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
                      selected={surveyData.projectSpace === space.value}
                      onClick={() => selectAndAdvance("projectSpace", space.value)}
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

            {/* ── Step 3: Style ── */}
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
                  subtitle="There's no wrong answer. This helps us tailor your consultation."
                />
                <div className="mt-8 space-y-3">
                  {styleOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={surveyData.style === opt.value}
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

            {/* ── Step 4: Project Scope ── */}
            {step === 4 && (
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
                      selected={surveyData.scope === opt.value}
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

            {/* ── Step 5: Cabinet Count ── */}
            {step === 5 && (
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
                      selected={surveyData.cabinetCount === opt.value}
                      onClick={() => selectAndAdvance("cabinetCount", opt.value)}
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

            {/* ── Step 6: Assembly / Installer ── */}
            {step === 6 && (
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
                      selected={surveyData.hasInstaller === opt.value}
                      onClick={() => selectAndAdvance("hasInstaller", opt.value)}
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

            {/* ── Step 7: Timeline ── */}
            {step === 7 && (
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
                      selected={surveyData.timeline === opt.value}
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

            {/* ── Step 8: Budget ── */}
            {step === 8 && (
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
                      selected={surveyData.budget === opt.value}
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

            {/* ── Step 9: Financing ── */}
            {step === 9 && (
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
                      selected={surveyData.financing === opt.value}
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
                  title={`Here's what you told us, ${formData.firstName}.`}
                  subtitle="Look good? Hit the button and we'll check your eligibility."
                />

                <div className="mt-8 bg-white rounded-xl border border-zinc-200 divide-y divide-zinc-100">
                  <SummaryRow label="Project Type" value={formData.projectType} />
                  <SummaryRow label="Zip code" value={surveyData.zipCode} />
                  <SummaryRow
                    label="Room"
                    value={
                      projectSpaces.find((s) => s.value === surveyData.projectSpace)?.label ||
                      surveyData.projectSpace
                    }
                  />
                  <SummaryRow
                    label="Priority"
                    value={
                      styleOptions.find((s) => s.value === surveyData.style)?.label ||
                      surveyData.style
                    }
                  />
                  <SummaryRow
                    label="Project"
                    value={
                      scopeOptions.find((s) => s.value === surveyData.scope)?.label ||
                      surveyData.scope
                    }
                  />
                  <SummaryRow
                    label="Cabinets"
                    value={
                      cabinetCountOptions.find((s) => s.value === surveyData.cabinetCount)
                        ?.label || surveyData.cabinetCount
                    }
                  />
                  <SummaryRow
                    label="Assembly"
                    value={
                      installerOptions.find((s) => s.value === surveyData.hasInstaller)
                        ?.label || surveyData.hasInstaller
                    }
                  />
                  <SummaryRow
                    label="Timeline"
                    value={
                      timelineOptions.find((s) => s.value === surveyData.timeline)?.label ||
                      surveyData.timeline
                    }
                  />
                  <SummaryRow
                    label="Budget"
                    value={
                      budgetOptions.find((s) => s.value === surveyData.budget)?.label ||
                      surveyData.budget
                    }
                  />
                  <SummaryRow
                    label="Payment"
                    value={
                      financingOptions.find((s) => s.value === surveyData.financing)?.label ||
                      surveyData.financing
                    }
                  />
                  <SummaryRow label="Email" value={formData.email} />
                </div>

                <button
                  onClick={handleFinalSubmit}
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
