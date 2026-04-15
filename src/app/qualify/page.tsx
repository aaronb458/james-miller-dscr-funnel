'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CALENDAR_ID = 'YOUR_JAMES_MILLER_CALENDAR_ID';

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
}

interface SurveyData {
  loan_type: string;
  hard_money_loan: string;
  property_value: string;
  current_balance: string;
  cash_out_amount: string;
  credit_score: string;
  self_employed: string;
  is_rented: string;
  rental_income: string;
  taxes_insurance: string;
}

// ─── Equity helper ────────────────────────────────────────────────────────────

function hasStrongEquity(survey: SurveyData): boolean {
  const highValue = ['600k_1m', '1m_2m', '2m_plus'].includes(survey.property_value);
  const lowBalance = ['under_100k', '100k_250k', 'free_and_clear'].includes(survey.current_balance);
  return highValue && lowBalance;
}

function hasCashOut(survey: SurveyData): boolean {
  return survey.cash_out_amount !== 'no' && survey.cash_out_amount !== '';
}

function getLoanTypeLabel(loan_type: string): string {
  switch (loan_type) {
    case 'cash_out_refi': return 'cash-out refinance';
    case 'rate_term_refi': return 'rate & term refinance';
    case 'purchase': return 'purchase';
    default: return 'investment property loan';
  }
}

function getLoanTypeBullet(loan_type: string): string | null {
  switch (loan_type) {
    case 'cash_out_refi':
      return 'A cash-out refinance lets you pull equity out of your property without selling it -- and qualifies based on the rental income, not your tax returns';
    case 'rate_term_refi':
      return 'A rate & term refinance can lower your monthly payment and improve your cash flow -- with far less paperwork than a conventional loan';
    case 'purchase':
      return 'Investment property purchases qualify based on the rental income the property can generate -- your personal income stays out of it';
    default:
      return null;
  }
}

function getQualifyBullets(survey: SurveyData | null): { text: string }[] {
  if (!survey) {
    return [
      { text: 'These loans qualify based on rental income -- not your tax returns or W-2s' },
      { text: 'Your personal income is irrelevant -- the property pays for itself' },
      { text: 'Close faster, with less documentation than traditional financing' },
    ];
  }

  const bullets: { text: string }[] = [];

  // Bullet 1: loan type context
  const loanTypeBullet = getLoanTypeBullet(survey.loan_type);
  if (loanTypeBullet) {
    bullets.push({ text: loanTypeBullet });
  } else if (hasStrongEquity(survey)) {
    bullets.push({ text: 'You have strong equity to work with -- that opens up better rates and more flexible options' });
  } else if (survey.current_balance === 'free_and_clear') {
    bullets.push({ text: 'Owning free and clear gives you maximum flexibility -- you can structure this loan exactly how you need it' });
  } else {
    bullets.push({ text: 'These loans qualify based on rental income, not your tax returns or W-2s' });
  }

  // Bullet 2: cash-out / rental income context
  if (hasCashOut(survey) && survey.loan_type === 'cash_out_refi') {
    const cashMap: Record<string, string> = {
      '50k_100k': '$50K-$100K',
      '100k_250k': '$100K-$250K',
      '250k_500k': '$250K-$500K',
      '500k_plus': '$500K+',
    };
    const cashLabel = cashMap[survey.cash_out_amount] ?? 'cash';
    bullets.push({ text: `Your goal to pull ${cashLabel} in cash is achievable -- no income verification required` });
  } else if (survey.is_rented === 'yes') {
    bullets.push({ text: 'You have documented rental income -- that is the cleanest possible profile for this type of loan' });
  } else if (hasStrongEquity(survey)) {
    bullets.push({ text: 'Your equity position gives you real leverage -- more options, better terms' });
  } else {
    bullets.push({ text: 'Your personal income is irrelevant to qualification -- the property cash flow is what matters' });
  }

  // Bullet 3: credit / self-employed / speed
  if (survey.credit_score === '720_plus') {
    bullets.push({ text: 'Your credit score puts you in the top tier -- best available rates and terms' });
  } else if (survey.credit_score === '680_720') {
    bullets.push({ text: 'Your credit score puts you in a solid range -- good options available' });
  } else if (survey.self_employed === 'yes') {
    bullets.push({ text: 'Self-employed investors are exactly who this loan type is built for -- no tax return headaches, no W-2 required' });
  } else {
    bullets.push({ text: 'These loans close faster than conventional financing with significantly less documentation' });
  }

  // Hard money priority bullet — prepended so it always appears first
  if (survey.hard_money_loan === 'yes') {
    bullets.unshift({ text: "You're in a hard money loan -- that gives us a clear path to move fast and get you into a better position" });
  }

  return bullets;
}

// ─── What-to-expect items ─────────────────────────────────────────────────────

const expectItems = [
  {
    title: 'Review your property profile',
    desc: 'James walks through your situation and confirms which loan products fit.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: 'See real rate ranges',
    desc: "You will get a realistic picture of what financing looks like for your deal.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Build a clear path forward',
    desc: 'Whether you close next month or in 6 months, you leave knowing exactly what to do next.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function QualifyPage() {
  const router = useRouter();
  const confettiFiredRef = useRef(false);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [survey, setSurvey] = useState<SurveyData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const rawContact = sessionStorage.getItem('jm_contact');
      if (rawContact) setContact(JSON.parse(rawContact));
      const rawSurvey = sessionStorage.getItem('jm_survey');
      if (rawSurvey) setSurvey(JSON.parse(rawSurvey));
    } catch { /* not available */ }

    if (!confettiFiredRef.current) {
      confettiFiredRef.current = true;
      const end = Date.now() + 1400;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#C9A84C', '#a87d1e', '#d4b06a', '#1B2A4A', '#F8F7F4'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#C9A84C', '#a87d1e', '#d4b06a', '#1B2A4A', '#F8F7F4'],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, []);

  const bullets = getQualifyBullets(survey);
  const loanTypeLabel = survey ? getLoanTypeLabel(survey.loan_type) : 'investment property loan';
  const isRateAndTerm = survey?.loan_type === 'rate_term_refi';

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
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-bold text-white text-sm" style={{ letterSpacing: '-0.02em' }}>James Miller</p>
            <p className="text-gray-400 text-[11px] tracking-wide">West Capital Lending &middot; Investment Property Loans</p>
          </div>
          <span
            className="text-label px-2.5 py-1 rounded-full"
            style={{ fontSize: '10px', background: 'rgba(201, 168, 76, 0.12)', color: '#C9A84C', border: '1px solid rgba(201, 168, 76, 0.2)' }}
          >
            Your Results
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">

          {/* Result card -- success moment */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-2xl overflow-hidden mb-8"
            style={{
              background: '#fff',
              border: '1px solid rgba(229, 231, 235, 0.8)',
              boxShadow: '0 16px 48px rgba(27,42,74,0.08), 0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            {/* Navy top accent bar with animated sweep */}
            <div className="h-1.5 w-full success-bar" />

            <div className="p-8 sm:p-12">
              {/* Success icon */}
              <div className="flex justify-center mb-8">
                <div
                  className="icon-ring-pulse w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.06) 100%)',
                    border: '2px solid rgba(201,168,76,0.4)',
                  }}
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={2.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>

              {/* Headline -- large, confident (varies by intent) */}
              <h1
                className="heading-display font-display text-[2rem] sm:text-[2.75rem] text-brand-text-primary text-center mb-3"
              >
                {isRateAndTerm
                  ? (contact?.firstName ? `Let\u2019s find your options, ${contact.firstName}.` : `Let\u2019s find your options.`)
                  : (contact?.firstName ? `Good news, ${contact.firstName}.` : 'Good news.')}
              </h1>
              <p className="body-relaxed text-center text-brand-text-secondary text-base sm:text-lg mb-10 max-w-md mx-auto">
                {isRateAndTerm
                  ? 'We can definitely look at your options. Let\u2019s get on a call and see what makes sense for your situation.'
                  : `Based on your answers, your property looks like a strong fit for a ${loanTypeLabel}.`}
              </p>

              {/* Why bullets */}
              <div
                className="rounded-xl p-6 sm:p-7 mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(27,42,74,0.025) 0%, rgba(27,42,74,0.04) 100%)',
                  border: '1px solid rgba(27, 42, 74, 0.08)',
                }}
              >
                <p className="text-label mb-5" style={{ color: '#C9A84C', fontSize: '11px' }}>
                  {isRateAndTerm ? 'What to know about your situation' : 'Why this is the right fit'}
                </p>
                <div className="space-y-5">
                  {bullets.map((bullet, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                      className="flex items-start gap-3.5"
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 bullet-check-icon"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <p className="body-relaxed text-sm sm:text-[15px] text-brand-text-secondary">{bullet.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.button
                onClick={() => router.push('/book')}
                whileTap={{ scale: 0.96 }}
                className="cta-pulse btn-tactile w-full flex items-center justify-center gap-2 font-bold text-base sm:text-lg py-5 rounded-2xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C 0%, #b8922e 50%, #a87d1e 100%)',
                  color: '#fff',
                  boxShadow: '0 6px 28px rgba(201, 168, 76, 0.4), 0 1px 0 rgba(255,255,255,0.12) inset',
                }}
              >
                Book Your Free Strategy Call with James
                <svg className="cta-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.button>

              <p className="text-center text-xs text-brand-text-muted mt-4">
                Free. No obligation. James reviews your profile before the call.
              </p>
            </div>
          </motion.div>

          {/* What to expect */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-2xl p-8 sm:p-10"
            style={{
              background: '#fff',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 16px rgba(27,42,74,0.05)',
            }}
          >
            <h2 className="text-label text-brand-text-primary mb-7" style={{ fontSize: '11px' }}>
              What to expect on the call
            </h2>
            <div className="space-y-6">
              {expectItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.08, ease: [0.32, 0.72, 0, 1] }}
                  className="flex gap-4 items-start"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(27,42,74,0.06)', color: '#1B2A4A' }}
                  >
                    {item.icon}
                  </div>
                  <div className="pt-0.5">
                    <p className="font-semibold text-[15px] text-brand-text-primary" style={{ letterSpacing: '-0.01em' }}>{item.title}</p>
                    <p className="body-relaxed text-sm text-brand-text-secondary mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-6 px-4 text-center">
        <p className="text-brand-text-muted text-xs">
          &copy; {new Date().getFullYear()} James Miller &middot; West Capital Lending &middot; NMLS 2024710
        </p>
      </footer>
    </div>
  );
}
