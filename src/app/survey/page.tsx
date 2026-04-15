'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 7;
const GHL_WEBHOOK_URL = 'YOUR_GHL_WEBHOOK_URL_HERE';
const CONTACT_KEY = 'jm_contact';
const SURVEY_KEY = 'jm_survey';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SurveyData {
  // Step 0 (new routing question)
  loan_type: string;
  // Step 1
  property_value: string;
  // Step 2
  current_balance: string;
  // Step 3
  cash_out_amount: string;
  // Step 4
  credit_score: string;
  // Step 5 — optional
  self_employed: string;
  is_rented: string;
  rental_income: string;
  taxes_insurance: string;
  // Step 6 — contact
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  sms_consent: boolean;
}

// ─── Step Options ─────────────────────────────────────────────────────────────

const loanTypeOptions = [
  { value: 'cash_out_refi', label: 'Pull cash out (Cash-Out Refinance)' },
  { value: 'rate_term_refi', label: 'Lower my rate or payment (Rate & Term Refi)' },
  { value: 'purchase', label: 'Purchase a new investment property' },
  { value: 'not_sure', label: "I'm not sure yet" },
];

const propertyValueOptions = [
  { value: 'under_300k', label: 'Under $300K' },
  { value: '300k_600k', label: '$300K - $600K' },
  { value: '600k_1m', label: '$600K - $1M' },
  { value: '1m_2m', label: '$1M - $2M' },
  { value: '2m_plus', label: '$2M+' },
];

const currentBalanceOptions = [
  { value: 'under_100k', label: 'Under $100K' },
  { value: '100k_250k', label: '$100K - $250K' },
  { value: '250k_500k', label: '$250K - $500K' },
  { value: '500k_750k', label: '$500K - $750K' },
  { value: '750k_plus', label: '$750K+' },
  { value: 'free_and_clear', label: 'Own it free and clear' },
];

const cashOutOptions = [
  { value: 'no', label: 'No' },
  { value: '50k_100k', label: 'Yes, $50K - $100K' },
  { value: '100k_250k', label: 'Yes, $100K - $250K' },
  { value: '250k_500k', label: 'Yes, $250K - $500K' },
  { value: '500k_plus', label: 'Yes, $500K+' },
  { value: 'not_sure', label: 'Not sure yet' },
];

const creditScoreOptions = [
  { value: '720_plus', label: '720+ (Excellent)' },
  { value: '680_720', label: '680 - 720 (Good)' },
  { value: '640_680', label: '640 - 680 (Fair)' },
  { value: 'below_640', label: 'Below 640' },
  { value: 'not_sure', label: 'Not sure' },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 36 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -36 }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepTracker({ step }: { step: number }) {
  const current = step + 1;
  return (
    <div className="flex items-center gap-0 w-full">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < current;
        const isActive = stepNum === current;
        return (
          <div key={stepNum} className="flex items-center" style={{ flex: i < TOTAL_STEPS - 1 ? 1 : 'none' }}>
            <div
              className={`step-dot ${
                isCompleted ? 'step-dot-completed' : isActive ? 'step-dot-active' : 'step-dot-upcoming'
              }`}
            >
              {isCompleted ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                stepNum
              )}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div
                className={`step-connector ${
                  stepNum < current ? 'step-connector-done' : 'step-connector-pending'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: selected ? 1 : 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="w-full text-left rounded-[14px] px-6 py-5 cursor-pointer option-card-lift"
      style={{
        background: selected ? 'rgba(27, 42, 74, 0.04)' : '#ffffff',
        border: selected ? '2px solid #1B2A4A' : '1.5px solid #E5E7EB',
        boxShadow: selected
          ? '0 4px 16px rgba(27,42,74,0.1), 0 1px 2px rgba(0,0,0,0.04)'
          : '0 1px 3px rgba(0,0,0,0.03)',
      }}
    >
      <div className="flex items-center gap-4">
        {/* Selection indicator -- navy fill when selected, clean and committed */}
        <div
          className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0"
          style={{
            background: selected ? '#1B2A4A' : 'transparent',
            border: selected ? '2px solid #1B2A4A' : '2px solid #D1D5DB',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: selected ? '0 2px 6px rgba(27,42,74,0.25)' : 'none',
          }}
        >
          {selected && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
        </div>
        <p
          className="font-semibold text-[15px] leading-snug flex-1"
          style={{ color: selected ? '#1B2A4A' : '#374151', letterSpacing: '-0.01em' }}
        >
          {label}
        </p>
      </div>
    </motion.button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-5 text-sm font-medium flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
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
    <p className="text-label mb-5" style={{ color: '#C9A84C', fontSize: '11px' }}>
      Question {step + 1} of {TOTAL_STEPS}
    </p>
  );
}

function InputField({
  label,
  value,
  onChange,
  type,
  inputMode,
  autoComplete,
  placeholder,
  error,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: string;
  placeholder?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      {label && (
        <label className="text-label block mb-2 text-brand-text-secondary" style={{ fontSize: '11px' }}>
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-4 text-sm font-medium" style={{ color: '#9CA3AF' }}>{prefix}</span>
        )}
        <input
          type={type ?? 'text'}
          inputMode={inputMode}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium text-brand-text-primary placeholder-gray-400 transition-all duration-200"
          style={{
            background: '#fff',
            borderColor: error ? '#EF4444' : '#E5E7EB',
            paddingLeft: prefix ? '28px' : undefined,
            paddingRight: suffix ? '56px' : undefined,
          }}
        />
        {suffix && (
          <span className="absolute right-4 text-sm font-medium" style={{ color: '#9CA3AF' }}>{suffix}</span>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
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
    loan_type: '',
    property_value: '',
    current_balance: '',
    cash_out_amount: '',
    credit_score: '',
    self_employed: '',
    is_rented: '',
    rental_income: '',
    taxes_insurance: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    sms_consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SurveyData, string>>>({});

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

  const advanceStep = useCallback(() => {
    setDirection(1);
    setStep((s) => s + 1);
  }, []);

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
    if (!data.address.trim()) newErrors.address = 'Property address is required';
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
        address: data.address,
      }));
      sessionStorage.setItem(SURVEY_KEY, JSON.stringify({
        loan_type: data.loan_type,
        property_value: data.property_value,
        current_balance: data.current_balance,
        cash_out_amount: data.cash_out_amount,
        credit_score: data.credit_score,
        self_employed: data.self_employed,
        is_rented: data.is_rented,
        rental_income: data.rental_income,
        taxes_insurance: data.taxes_insurance,
      }));
    } catch { /* sessionStorage not available */ }

    const utms = getUTMs();

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone,
      address: data.address,
      sms_consent: data.sms_consent,
      loan_type: data.loan_type,
      property_value: data.property_value,
      current_balance: data.current_balance,
      cash_out_amount: data.cash_out_amount,
      credit_score: data.credit_score,
      self_employed: data.self_employed || null,
      is_rented: data.is_rented || null,
      rental_income: data.rental_income || null,
      taxes_insurance: data.taxes_insurance || null,
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

      // ── Step 0: Loan Type / Intent Routing ──────────────────────────
      case 0:
        return (
          <div>
            <StepLabel step={0} />
            <h1 className="heading-display font-display text-xl sm:text-2xl text-brand-text-primary mb-2">
              What are you looking to do with your investment property?
            </h1>
            <p className="body-relaxed text-sm text-brand-text-secondary mb-8">We&apos;ll match you to the right loan structure.</p>
            <div className="space-y-3">
              {loanTypeOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={data.loan_type === opt.value}
                  onClick={() => selectAndAdvance('loan_type', opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
          </div>
        );

      // ── Step 1: Property Value ────────────────────────────────────────────
      case 1:
        return (
          <div>
            <StepLabel step={1} />
            <h1 className="heading-display font-display text-xl sm:text-2xl text-brand-text-primary mb-2">
              What&apos;s your best estimate of the property&apos;s current value?
            </h1>
            <p className="body-relaxed text-sm text-brand-text-secondary mb-8">Ballpark is fine.</p>
            <div className="space-y-3">
              {propertyValueOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={data.property_value === opt.value}
                  onClick={() => selectAndAdvance('property_value', opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      // ── Step 2: Current Balance ───────────────────────────────────────────
      case 2:
        return (
          <div>
            <StepLabel step={2} />
            <h1 className="heading-display font-display text-xl sm:text-2xl text-brand-text-primary mb-2">
              Roughly how much do you currently owe on the property?
            </h1>
            <p className="body-relaxed text-sm text-brand-text-secondary mb-8">Current mortgage balance, or select free and clear if there&apos;s no mortgage.</p>
            <div className="space-y-3">
              {currentBalanceOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={data.current_balance === opt.value}
                  onClick={() => selectAndAdvance('current_balance', opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      // ── Step 3: Cash-out ─────────────────────────────────────────────────
      case 3:
        return (
          <div>
            <StepLabel step={3} />
            <h1 className="heading-display font-display text-xl sm:text-2xl text-brand-text-primary mb-2">
              Are you looking to pull any cash out?
            </h1>
            <p className="body-relaxed text-sm text-brand-text-secondary mb-8">This helps James find the right loan structure for your situation.</p>
            <div className="space-y-3">
              {cashOutOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={data.cash_out_amount === opt.value}
                  onClick={() => selectAndAdvance('cash_out_amount', opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      // ── Step 4: Credit Score ──────────────────────────────────────────────
      case 4:
        return (
          <div>
            <StepLabel step={4} />
            <h1 className="heading-display font-display text-xl sm:text-2xl text-brand-text-primary mb-2">
              What&apos;s your estimated credit score?
            </h1>
            <p className="body-relaxed text-sm text-brand-text-secondary mb-8">All scores welcome -- we have programs starting at 500. This just helps James find the best product match for you.</p>
            <div className="space-y-3">
              {creditScoreOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={data.credit_score === opt.value}
                  onClick={() => selectAndAdvance('credit_score', opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      // ── Step 5: Nice to Haves (optional) ─────────────────────────────────
      case 5:
        return (
          <div>
            <StepLabel step={5} />
            <h1 className="heading-display font-display text-xl sm:text-2xl text-brand-text-primary mb-1">
              A few more details
            </h1>
            <p className="text-sm mb-7" style={{ color: '#C9A84C', fontWeight: 600 }}>Optional -- skip any that don&apos;t apply</p>

            <div className="space-y-7">
              {/* Self-employed */}
              <div>
                <p className="text-sm font-semibold text-brand-text-primary mb-3">Are you self-employed?</p>
                <div className="flex gap-3">
                  {['Yes', 'No'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => update('self_employed', opt.toLowerCase())}
                      className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
                      style={{
                        background: data.self_employed === opt.toLowerCase() ? 'rgba(27, 42, 74, 0.04)' : '#ffffff',
                        border: data.self_employed === opt.toLowerCase() ? '2px solid #1B2A4A' : '2px solid #E5E7EB',
                        color: data.self_employed === opt.toLowerCase() ? '#1B2A4A' : '#6B7280',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Is the property rented */}
              <div>
                <p className="text-sm font-semibold text-brand-text-primary mb-3">Is the property currently rented?</p>
                <div className="space-y-2.5">
                  {[
                    { value: 'yes', label: "Yes, it's rented" },
                    { value: 'no', label: 'No' },
                    { value: 'not_yet', label: 'Not yet' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        update('is_rented', opt.value);
                        if (opt.value !== 'yes') update('rental_income', '');
                      }}
                      className="w-full text-left py-3.5 px-5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
                      style={{
                        background: data.is_rented === opt.value ? 'rgba(27, 42, 74, 0.04)' : '#ffffff',
                        border: data.is_rented === opt.value ? '2px solid #1B2A4A' : '2px solid #E5E7EB',
                        color: data.is_rented === opt.value ? '#1B2A4A' : '#6B7280',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {/* Conditional rental income input */}
                <AnimatePresence>
                  {data.is_rented === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 overflow-hidden"
                    >
                      <InputField
                        label="Monthly rental income"
                        value={data.rental_income}
                        onChange={(v) => update('rental_income', v)}
                        inputMode="numeric"
                        placeholder="e.g. 2,400"
                        prefix="$"
                        suffix="/mo"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Taxes + insurance */}
              <div>
                <p className="text-sm font-semibold text-brand-text-primary mb-1">
                  What are the monthly property taxes + insurance (combined)?
                </p>
                <p className="text-xs text-brand-text-muted mb-3">Leave blank if you don&apos;t know</p>
                <InputField
                  label=""
                  value={data.taxes_insurance}
                  onChange={(v) => update('taxes_insurance', v)}
                  inputMode="numeric"
                  placeholder="I don't know"
                  prefix="$"
                  suffix="/mo"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <motion.button
                onClick={advanceStep}
                whileTap={{ scale: 0.96 }}
                className="btn-tactile w-full flex items-center justify-center gap-2 font-bold text-base py-[18px] rounded-2xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C 0%, #b8922e 50%, #a87d1e 100%)',
                  color: '#fff',
                  boxShadow: '0 6px 24px rgba(201, 168, 76, 0.35), 0 1px 0 rgba(255,255,255,0.12) inset',
                }}
              >
                Continue
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.button>
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      // ── Step 6: Contact Info ──────────────────────────────────────────────
      case 6:
        return (
          <div>
            <StepLabel step={6} />
            <h1 className="heading-display font-display text-xl sm:text-2xl text-brand-text-primary mb-2">
              Almost there. Where should we send your results?
            </h1>
            <p className="body-relaxed text-sm text-brand-text-secondary mb-8">
              James will review your profile before reaching out. No spam, ever.
            </p>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-label block mb-2 text-brand-text-secondary" style={{ fontSize: '11px' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    autoComplete="given-name"
                    autoCapitalize="words"
                    value={data.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    placeholder="James"
                    className="w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium text-brand-text-primary placeholder-gray-400 transition-all duration-200"
                    style={{
                      background: '#fff',
                      borderColor: errors.firstName ? '#EF4444' : '#E5E7EB',
                    }}
                  />
                  {errors.firstName && <p className="mt-1.5 text-xs text-red-500">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="text-label block mb-2 text-brand-text-secondary" style={{ fontSize: '11px' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    autoComplete="family-name"
                    autoCapitalize="words"
                    value={data.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    placeholder="Miller"
                    className="w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium text-brand-text-primary placeholder-gray-400 transition-all duration-200"
                    style={{
                      background: '#fff',
                      borderColor: errors.lastName ? '#EF4444' : '#E5E7EB',
                    }}
                  />
                  {errors.lastName && <p className="mt-1.5 text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="text-label block mb-2 text-brand-text-secondary" style={{ fontSize: '11px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium text-brand-text-primary placeholder-gray-400 transition-all duration-200"
                  style={{
                    background: '#fff',
                    borderColor: errors.phone ? '#EF4444' : '#E5E7EB',
                  }}
                />
                {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-label block mb-2 text-brand-text-secondary" style={{ fontSize: '11px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium text-brand-text-primary placeholder-gray-400 transition-all duration-200"
                  style={{
                    background: '#fff',
                    borderColor: errors.email ? '#EF4444' : '#E5E7EB',
                  }}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="text-label block mb-2 text-brand-text-secondary" style={{ fontSize: '11px' }}>
                  Property Address
                </label>
                <input
                  type="text"
                  autoComplete="street-address"
                  value={data.address}
                  onChange={(e) => update('address', e.target.value)}
                  placeholder="123 Main St, City, State"
                  className="w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium text-brand-text-primary placeholder-gray-400 transition-all duration-200"
                  style={{
                    background: '#fff',
                    borderColor: errors.address ? '#EF4444' : '#E5E7EB',
                  }}
                />
                {errors.address && <p className="mt-1.5 text-xs text-red-500">{errors.address}</p>}
              </div>

              {/* SMS Consent */}
              <label className="flex items-start gap-3 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={data.sms_consent}
                  onChange={(e) => update('sms_consent', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded shrink-0"
                />
                <span className="text-xs leading-relaxed text-brand-text-muted">
                  By checking this box, you consent to receive SMS messages from James Miller / West Capital Lending about your loan inquiry. Msg &amp; data rates may apply. Reply STOP to unsubscribe.
                </span>
              </label>

              <motion.button
                onClick={handleSubmit}
                disabled={submitting}
                whileTap={{ scale: 0.96 }}
                className="btn-tactile w-full flex items-center justify-center gap-2 font-bold text-base py-[18px] rounded-2xl cursor-pointer mt-3"
                style={{
                  background: submitting
                    ? 'rgba(201, 168, 76, 0.5)'
                    : 'linear-gradient(135deg, #C9A84C 0%, #b8922e 50%, #a87d1e 100%)',
                  color: '#fff',
                  boxShadow: submitting ? 'none' : '0 6px 24px rgba(201, 168, 76, 0.35), 0 1px 0 rgba(255,255,255,0.12) inset',
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
    <div className="min-h-[100dvh] flex flex-col" style={{ background: '#F8F7F4' }}>
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
            <p className="font-bold text-white text-sm" style={{ letterSpacing: '-0.02em' }}>James Miller</p>
            <p className="text-gray-400 text-[11px] tracking-wide">West Capital Lending &middot; Investment Property Loans</p>
          </div>
          <span
            className="text-label px-2.5 py-1 rounded-full"
            style={{ fontSize: '10px', background: 'rgba(201, 168, 76, 0.12)', color: '#C9A84C', border: '1px solid rgba(201, 168, 76, 0.2)' }}
          >
            Free Qualifier
          </span>
        </div>
      </header>

      {/* Step tracker */}
      <div className="px-4 pt-6 pb-0 max-w-lg mx-auto w-full">
        <StepTracker step={step} />
      </div>

      {/* Survey card */}
      <main className="flex-1 flex items-start justify-center px-4 pt-10 pb-16">
        <div
          className="w-full max-w-lg rounded-2xl p-8 sm:p-10 overflow-hidden survey-card"
          style={{
            background: '#fff',
            border: '1px solid rgba(229, 231, 235, 0.8)',
          }}
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
      <footer className="py-5 px-4 text-center">
        <p className="text-brand-text-muted text-xs">
          &copy; {new Date().getFullYear()} James Miller &middot; West Capital Lending &middot; NMLS 2024710
        </p>
      </footer>
    </div>
  );
}
