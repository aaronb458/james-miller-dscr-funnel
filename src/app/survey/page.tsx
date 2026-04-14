'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 6; // 5 qualifier questions + contact info
const GHL_WEBHOOK_URL = 'YOUR_GHL_WEBHOOK_URL_HERE';
const CONTACT_KEY = 'jm_contact';
const SURVEY_KEY = 'jm_survey';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SurveyData {
  property_intent: string;
  property_type: string;
  rental_income: string;
  property_value: string;
  timeline: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sms_consent: boolean;
}

// ─── Step Options ─────────────────────────────────────────────────────────────

const propertyIntentOptions = [
  { value: 'purchase', label: 'Purchase a new property', sub: 'Looking to acquire and finance a rental' },
  { value: 'refinance', label: 'Refinance existing', sub: 'Better rate or terms on a property I own' },
  { value: 'both', label: 'Both', sub: 'Looking at purchase and refinance options' },
  { value: 'not_sure', label: 'Not sure yet', sub: 'Exploring what options are available' },
];

const propertyTypeOptions = [
  { value: 'sfr', label: 'Single family home', sub: 'Standalone 1-unit residential property' },
  { value: '2_4_unit', label: '2-4 unit multi-family', sub: 'Duplex, triplex, or fourplex' },
  { value: '5_plus', label: '5+ unit multi-family', sub: 'Larger apartment complex' },
  { value: 'commercial', label: 'Commercial', sub: 'Retail, office, or mixed-use building' },
  { value: 'not_sure', label: 'Not sure', sub: 'We can help you figure out the best fit' },
];

const rentalIncomeOptions = [
  { value: 'yes_rented', label: "Yes, it's already rented", sub: 'Income is established and documented' },
  { value: 'yes_will_rent', label: 'Yes, I plan to rent it', sub: 'Projected rental income from market data' },
  { value: 'not_sure', label: "I'm not sure yet", sub: 'Exploring the investment angle' },
  { value: 'no', label: 'No', sub: 'This property will not generate rental income' },
];

const propertyValueOptions = [
  { value: 'under_300k', label: 'Under $300K', sub: '' },
  { value: '300k_600k', label: '$300K - $600K', sub: '' },
  { value: '600k_1m', label: '$600K - $1M', sub: '' },
  { value: '1m_2m', label: '$1M - $2M', sub: '' },
  { value: '2m_plus', label: '$2M+', sub: '' },
];

const timelineOptions = [
  { value: 'asap', label: 'ASAP (within 30 days)', sub: 'Deal is under contract or actively shopping' },
  { value: '1_3_months', label: '1-3 months', sub: 'Getting the details together' },
  { value: '3_6_months', label: '3-6 months', sub: 'Planning ahead, not rushed' },
  { value: 'researching', label: 'Just researching', sub: 'Doing research before committing' },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 36 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -36 }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  const progress = ((step + 1) / TOTAL_STEPS) * 100;
  return (
    <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(201, 168, 76, 0.15)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: 'linear-gradient(90deg, #a87d1e 0%, #C9A84C 60%, #d4b06a 100%)' }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      />
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  label,
  sub,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  sub?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="w-full text-left rounded-xl px-5 py-4 transition-all duration-200 cursor-pointer"
      style={{
        background: selected ? 'rgba(201, 168, 76, 0.06)' : '#ffffff',
        border: selected ? '2px solid #C9A84C' : '2px solid #E5E7EB',
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200"
          style={{
            borderColor: selected ? '#C9A84C' : '#D1D5DB',
            background: selected ? '#C9A84C' : 'transparent',
          }}
        >
          {selected && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm leading-snug" style={{ color: selected ? '#1B2A4A' : '#111827' }}>
            {label}
          </p>
          {sub && (
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: selected ? '#4B5563' : '#9CA3AF' }}>
              {sub}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 text-sm font-medium flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
      style={{ color: '#9CA3AF' }}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      Back
    </button>
  );
}

function StepLabel({ step }: { step: number }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
      Question {step + 1} of {TOTAL_STEPS}
    </p>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SurveyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const webhookFiredRef = useRef(false);

  const [data, setData] = useState<SurveyData>({
    property_intent: '',
    property_type: '',
    rental_income: '',
    property_value: '',
    timeline: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    sms_consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SurveyData, string>>>({});

  // Ensure UTMs are available
  useEffect(() => {
    if (typeof window === 'undefined') return;
  }, []);

  const update = useCallback((field: keyof SurveyData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const selectAndAdvance = useCallback(
    (field: keyof SurveyData, value: string) => {
      update(field, value);
      setDirection(1);
      setTimeout(() => setStep((s) => s + 1), 260);
    },
    [update]
  );

  const getUTMs = () => {
    try {
      const raw = sessionStorage.getItem('jm_utm');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const validateContact = useCallback(() => {
    const newErrors: Partial<Record<keyof SurveyData, string>> = {};
    if (!data.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!data.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (data.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [data]);

  const handleSubmit = useCallback(async () => {
    if (!validateContact()) return;
    if (webhookFiredRef.current) return;
    webhookFiredRef.current = true;
    setSubmitting(true);

    // Format phone to E.164
    let phone = data.phone.replace(/\D/g, '');
    if (phone.length === 10) phone = '+1' + phone;
    else if (phone.length === 11 && phone.startsWith('1')) phone = '+' + phone;

    // Save to sessionStorage for /qualify personalization
    try {
      sessionStorage.setItem(CONTACT_KEY, JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone,
      }));
      sessionStorage.setItem(SURVEY_KEY, JSON.stringify({
        property_intent: data.property_intent,
        property_type: data.property_type,
        rental_income: data.rental_income,
        property_value: data.property_value,
        timeline: data.timeline,
      }));
    } catch { /* sessionStorage not available */ }

    const utms = getUTMs();

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone,
      sms_consent: data.sms_consent,
      property_intent: data.property_intent,
      property_type: data.property_type,
      rental_income: data.rental_income,
      property_value: data.property_value,
      timeline: data.timeline,
      funnel_source: 'dscr-qualifier',
      step_completed: 'survey_complete',
      is_booked: false,
      submitted_at: new Date().toISOString(),
      ...utms,
    };

    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Silent fail — route forward regardless
    }

    setSubmitting(false);
    router.push('/qualify');
  }, [data, validateContact, router]);

  // ─── Render Steps ─────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <StepLabel step={0} />
            <h1 className="text-xl sm:text-2xl font-bold text-brand-text-primary tracking-tight leading-snug mb-2">
              Are you looking to purchase a new investment property or refinance an existing one?
            </h1>
            <p className="text-sm text-brand-text-secondary mb-6">Select the option that best describes your situation.</p>
            <div className="space-y-3">
              {propertyIntentOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={data.property_intent === opt.value}
                  onClick={() => selectAndAdvance('property_intent', opt.value)}
                  label={opt.label}
                  sub={opt.sub}
                />
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <StepLabel step={1} />
            <h1 className="text-xl sm:text-2xl font-bold text-brand-text-primary tracking-tight leading-snug mb-2">
              What type of property?
            </h1>
            <p className="text-sm text-brand-text-secondary mb-6">DSCR works differently depending on property type.</p>
            <div className="space-y-3">
              {propertyTypeOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={data.property_type === opt.value}
                  onClick={() => selectAndAdvance('property_type', opt.value)}
                  label={opt.label}
                  sub={opt.sub}
                />
              ))}
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      case 2:
        return (
          <div>
            <StepLabel step={2} />
            <h1 className="text-xl sm:text-2xl font-bold text-brand-text-primary tracking-tight leading-snug mb-2">
              Does the property generate (or will it generate) rental income?
            </h1>
            <p className="text-sm text-brand-text-secondary mb-6">DSCR loans qualify based on rental income, not your personal income.</p>
            <div className="space-y-3">
              {rentalIncomeOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={data.rental_income === opt.value}
                  onClick={() => selectAndAdvance('rental_income', opt.value)}
                  label={opt.label}
                  sub={opt.sub}
                />
              ))}
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      case 3:
        return (
          <div>
            <StepLabel step={3} />
            <h1 className="text-xl sm:text-2xl font-bold text-brand-text-primary tracking-tight leading-snug mb-2">
              What is the estimated property value?
            </h1>
            <p className="text-sm text-brand-text-secondary mb-6">Ballpark is fine. This helps us find the right loan product.</p>
            <div className="space-y-3">
              {propertyValueOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={data.property_value === opt.value}
                  onClick={() => selectAndAdvance('property_value', opt.value)}
                  label={opt.label}
                  sub={opt.sub}
                />
              ))}
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      case 4:
        return (
          <div>
            <StepLabel step={4} />
            <h1 className="text-xl sm:text-2xl font-bold text-brand-text-primary tracking-tight leading-snug mb-2">
              What is your timeline?
            </h1>
            <p className="text-sm text-brand-text-secondary mb-6">No wrong answers here. Helps Jordan prepare for the call.</p>
            <div className="space-y-3">
              {timelineOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={data.timeline === opt.value}
                  onClick={() => selectAndAdvance('timeline', opt.value)}
                  label={opt.label}
                  sub={opt.sub}
                />
              ))}
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      case 5:
        return (
          <div>
            <StepLabel step={5} />
            <h1 className="text-xl sm:text-2xl font-bold text-brand-text-primary tracking-tight leading-snug mb-2">
              Almost there. Where should we send your results?
            </h1>
            <p className="text-sm text-brand-text-secondary mb-6">
              Jordan will reach out to confirm your session. No spam, ever.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-secondary mb-1.5 uppercase tracking-wide">
                    First Name
                  </label>
                  <input
                    type="text"
                    autoComplete="given-name"
                    autoCapitalize="words"
                    value={data.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    placeholder="James"
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm font-medium text-brand-text-primary placeholder-gray-400 transition-all duration-200"
                    style={{
                      background: '#fff',
                      borderColor: errors.firstName ? '#EF4444' : '#E5E7EB',
                    }}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-text-secondary mb-1.5 uppercase tracking-wide">
                    Last Name
                  </label>
                  <input
                    type="text"
                    autoComplete="family-name"
                    autoCapitalize="words"
                    value={data.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    placeholder="Miller"
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm font-medium text-brand-text-primary placeholder-gray-400 transition-all duration-200"
                    style={{
                      background: '#fff',
                      borderColor: errors.lastName ? '#EF4444' : '#E5E7EB',
                    }}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text-secondary mb-1.5 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl border-2 text-sm font-medium text-brand-text-primary placeholder-gray-400 transition-all duration-200"
                  style={{
                    background: '#fff',
                    borderColor: errors.email ? '#EF4444' : '#E5E7EB',
                  }}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text-secondary mb-1.5 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border-2 text-sm font-medium text-brand-text-primary placeholder-gray-400 transition-all duration-200"
                  style={{
                    background: '#fff',
                    borderColor: errors.phone ? '#EF4444' : '#E5E7EB',
                  }}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* SMS Consent */}
              <label className="flex items-start gap-3 cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={data.sms_consent}
                  onChange={(e) => update('sms_consent', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded shrink-0"
                />
                <span className="text-xs leading-relaxed text-brand-text-muted">
                  By checking this box, you consent to receive SMS messages from James Miller / West Capital Lending about your DSCR loan inquiry. Msg &amp; data rates may apply. Reply STOP to unsubscribe.
                </span>
              </label>

              <motion.button
                onClick={handleSubmit}
                disabled={submitting}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 font-semibold text-base py-4 rounded-2xl transition-all duration-200 cursor-pointer mt-2"
                style={{
                  background: submitting
                    ? 'rgba(201, 168, 76, 0.5)'
                    : 'linear-gradient(135deg, #C9A84C 0%, #a87d1e 100%)',
                  color: '#fff',
                  boxShadow: submitting ? 'none' : '0 4px 20px rgba(201, 168, 76, 0.3)',
                }}
              >
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    See My Results
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </motion.button>

              <p className="text-center text-xs text-brand-text-muted">
                Your information is secure and never sold to third parties.
              </p>
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8F7F4' }}>
      {/* Header */}
      <header
        className="py-4 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(160deg, #1B2A4A 0%, #0f1c30 100%)',
          borderBottom: '1px solid rgba(201, 168, 76, 0.15)',
        }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <p className="font-bold text-white text-sm tracking-tight">James Miller</p>
            <p className="text-gray-400 text-[11px] tracking-wide">West Capital Lending &middot; DSCR Specialist</p>
          </div>
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-widest"
            style={{ background: 'rgba(201, 168, 76, 0.12)', color: '#C9A84C', border: '1px solid rgba(201, 168, 76, 0.2)' }}
          >
            Free Qualifier
          </span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="px-4 pt-4 pb-0 max-w-lg mx-auto w-full">
        <ProgressBar step={step} />
      </div>

      {/* Survey card */}
      <main className="flex-1 flex items-start justify-center px-4 pt-6 pb-12">
        <div
          className="w-full max-w-lg rounded-2xl p-6 sm:p-8 overflow-hidden"
          style={{ background: '#fff', border: '1px solid #E5E7EB' }}
        >
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 text-center">
        <p className="text-brand-text-muted text-xs">
          &copy; {new Date().getFullYear()} James Miller &middot; West Capital Lending &middot; NMLS 2024710
        </p>
      </footer>
    </div>
  );
}
