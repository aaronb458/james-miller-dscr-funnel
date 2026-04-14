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
}

interface SurveyData {
  property_intent: string;
  property_type: string;
  rental_income: string;
  property_value: string;
  timeline: string;
}

function getQualifyBullets(survey: SurveyData | null): string[] {
  const bullets: string[] = [];

  if (!survey) {
    return [
      'DSCR loans qualify based on rental income, not your tax returns or W-2s',
      'Your personal income is irrelevant — the property pays for itself',
      'Close faster, with less documentation than traditional financing',
    ];
  }

  // Bullet 1: based on property type
  if (survey.property_type === 'sfr') {
    bullets.push('Single family rentals are ideal DSCR candidates — strong demand, easy to appraise');
  } else if (survey.property_type === '2_4_unit' || survey.property_type === '5_plus') {
    bullets.push('Multi-family properties often hit DSCR thresholds easily — multiple income streams strengthen your ratio');
  } else {
    bullets.push('DSCR loans qualify based on rental income, not your tax returns or W-2s');
  }

  // Bullet 2: based on rental income
  if (survey.rental_income === 'yes_rented') {
    bullets.push('You have documented rental income — that is the cleanest possible DSCR profile');
  } else if (survey.rental_income === 'yes_will_rent') {
    bullets.push("We use market rent appraisal data to project income — you don't need tenants in place to qualify");
  } else {
    bullets.push('Your personal income is irrelevant to DSCR qualification — the property cash flow is what matters');
  }

  // Bullet 3: based on timeline
  if (survey.timeline === 'asap') {
    bullets.push('With your ASAP timeline, Jordan can get your file moving this week — DSCR closes faster than conventional');
  } else if (survey.timeline === '1_3_months') {
    bullets.push('Your 1-3 month timeline gives us room to optimize your rate and structure the deal right');
  } else {
    bullets.push('DSCR loans close faster than conventional financing with significantly less documentation');
  }

  return bullets;
}

export default function QualifyPage() {
  const router = useRouter();
  const confettiFiredRef = useRef(false);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [survey, setSurvey] = useState<SurveyData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load from sessionStorage
    try {
      const rawContact = sessionStorage.getItem('jm_contact');
      if (rawContact) setContact(JSON.parse(rawContact));
      const rawSurvey = sessionStorage.getItem('jm_survey');
      if (rawSurvey) setSurvey(JSON.parse(rawSurvey));
    } catch { /* not available */ }

    // Fire confetti once
    if (!confettiFiredRef.current) {
      confettiFiredRef.current = true;
      const end = Date.now() + 1200;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#C9A84C', '#a87d1e', '#d4b06a', '#1B2A4A', '#ffffff'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#C9A84C', '#a87d1e', '#d4b06a', '#1B2A4A', '#ffffff'],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, []);

  const bullets = getQualifyBullets(survey);

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
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-bold text-white text-sm tracking-tight">James Miller</p>
            <p className="text-gray-400 text-[11px] tracking-wide">West Capital Lending &middot; DSCR Specialist</p>
          </div>
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-widest"
            style={{ background: 'rgba(201, 168, 76, 0.12)', color: '#C9A84C', border: '1px solid rgba(201, 168, 76, 0.2)' }}
          >
            Results
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 py-10 sm:py-14">
        <div className="max-w-2xl mx-auto">
          {/* Result card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-2xl p-6 sm:p-8 mb-6"
            style={{ background: '#fff', border: '1px solid #E5E7EB' }}
          >
            {/* Check icon */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(201, 168, 76, 0.1)' }}
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary text-center tracking-tight mb-2">
              {contact?.firstName ? `Good news, ${contact.firstName}.` : 'Good news.'}
            </h1>
            <p className="text-center text-brand-text-secondary mb-7">
              Based on your answers, you look like a strong DSCR candidate.
            </p>

            {/* Why bullets */}
            <div
              className="rounded-xl p-5 mb-6"
              style={{ background: 'rgba(27, 42, 74, 0.03)', border: '1px solid rgba(27, 42, 74, 0.08)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
                Why DSCR is the right fit
              </p>
              <div className="space-y-3">
                {bullets.map((bullet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.32, 0.72, 0, 1] }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(201, 168, 76, 0.15)' }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-sm leading-relaxed text-brand-text-secondary">{bullet}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.button
              onClick={() => router.push(`/book`)}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 font-semibold text-base py-4 rounded-2xl transition-all duration-200 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #a87d1e 100%)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(201, 168, 76, 0.35)',
              }}
            >
              Book Your Free Strategy Call with Jordan
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.button>

            <p className="text-center text-xs text-brand-text-muted mt-3">
              Free. No obligation. Jordan reviews your profile before the call.
            </p>
          </motion.div>

          {/* What to expect */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: '#fff', border: '1px solid #E5E7EB' }}
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-text-primary mb-5">
              What to expect on the call
            </h2>
            <div className="space-y-4">
              {[
                { icon: '📋', title: 'Review your property profile', desc: 'Jordan walks through your situation and confirms which loan products fit.' },
                { icon: '💰', title: 'See real rate ranges', desc: "You'll get a realistic picture of what DSCR financing looks like for your deal." },
                { icon: '📅', title: 'Build a clear path forward', desc: 'Whether you close next month or in 6 months, you leave knowing exactly what to do next.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="text-2xl shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-sm text-brand-text-primary">{item.title}</p>
                    <p className="text-sm text-brand-text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-4 px-4 text-center">
        <p className="text-brand-text-muted text-xs">
          &copy; {new Date().getFullYear()} James Miller &middot; West Capital Lending &middot; NMLS 2024710
        </p>
      </footer>
    </div>
  );
}
