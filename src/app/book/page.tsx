'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CALENDAR_ID = 'YOUR_JAMES_MILLER_CALENDAR_ID';
const GHL_WEBHOOK_URL = 'YOUR_GHL_WEBHOOK_URL_HERE';
const CALENDAR_BASE = 'https://api.leadconnectorhq.com/widget/booking/';

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function BookPage() {
  const [contact, setContact] = useState<ContactData | null>(null);
  const bookingFiredRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const raw = sessionStorage.getItem('jm_contact');
      if (raw) setContact(JSON.parse(raw));
    } catch { /* not available */ }

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = event.data;
        const isBookingConfirm =
          (typeof data === 'string' && data.includes('appointment')) ||
          (typeof data === 'object' && data !== null && (data.type === 'appointment' || data.event === 'appointment_booked'));

        if (isBookingConfirm && !bookingFiredRef.current) {
          bookingFiredRef.current = true;
          fireBookedWebhook();
        }
      } catch { /* ignore */ }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const fireBookedWebhook = async () => {
    try {
      const rawContact = sessionStorage.getItem('jm_contact');
      const rawSurvey = sessionStorage.getItem('jm_survey');
      const rawUTM = sessionStorage.getItem('jm_utm');

      const contact = rawContact ? JSON.parse(rawContact) : {};
      const survey = rawSurvey ? JSON.parse(rawSurvey) : {};
      const utm = rawUTM ? JSON.parse(rawUTM) : {};

      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contact,
          ...survey,
          ...utm,
          step_completed: 'booked',
          is_booked: true,
          funnel_source: 'dscr-qualifier',
          booked_at: new Date().toISOString(),
        }),
      });
    } catch { /* silent fail */ }
  };

  const buildCalendarURL = () => {
    let url = `${CALENDAR_BASE}${CALENDAR_ID}`;
    if (contact) {
      const params = new URLSearchParams();
      if (contact.firstName) params.set('first_name', contact.firstName);
      if (contact.lastName) params.set('last_name', contact.lastName);
      if (contact.email) params.set('email', contact.email);
      if (contact.phone) params.set('phone', contact.phone);
      const qs = params.toString();
      if (qs) url += '?' + qs;
    }
    return url;
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
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-bold text-white text-sm" style={{ letterSpacing: '-0.02em' }}>James Miller</p>
            <p className="text-gray-400 text-[11px] tracking-wide">West Capital Lending &middot; Investment Property Loans</p>
          </div>
          <span
            className="text-label px-2.5 py-1 rounded-full"
            style={{ fontSize: '10px', background: 'rgba(201, 168, 76, 0.12)', color: '#C9A84C', border: '1px solid rgba(201, 168, 76, 0.2)' }}
          >
            Book a Call
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 py-12 sm:py-14">
        <div className="max-w-2xl mx-auto">

          {/* Context framing */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="text-center mb-8"
          >
            {/* Step indicator */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-label mb-6"
              style={{
                fontSize: '11px',
                background: 'rgba(201,168,76,0.1)',
                color: '#C9A84C',
                border: '1px solid rgba(201,168,76,0.22)',
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Final step
            </div>

            <h1 className="heading-display font-display text-[1.75rem] sm:text-[2.5rem] text-brand-text-primary mb-4">
              {contact?.firstName
                ? `${contact.firstName}, pick a time that works for you.`
                : 'Pick a time that works for you.'}
            </h1>
            <p className="body-relaxed text-brand-text-secondary text-base sm:text-lg max-w-md mx-auto">
              James will review your property profile before the call so you get straight to what matters.
            </p>
          </motion.div>

          {/* Trust signals -- clean row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-3 gap-3 mb-8"
          >
            {[
              { label: 'Free consultation' },
              { label: 'No credit check' },
              { label: 'No obligation' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-xl text-center"
                style={{ background: '#fff', border: '1px solid #E5E7EB' }}
              >
                <span style={{ color: '#16a34a' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-xs font-semibold text-brand-text-secondary leading-tight">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Calendar embed -- properly framed */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(229, 231, 235, 0.8)',
              background: '#fff',
              boxShadow: '0 12px 40px rgba(27,42,74,0.07), 0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            {/* Calendar header bar */}
            <div
              className="px-6 py-5 flex items-center gap-3"
              style={{ borderBottom: '1px solid #F3F4F6' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(27,42,74,0.07)' }}
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="#1B2A4A" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm text-brand-text-primary" style={{ letterSpacing: '-0.01em' }}>Investment Property Strategy Call with James Miller</p>
                <p className="text-xs text-brand-text-muted mt-0.5">30 min &middot; Video or Phone &middot; Free</p>
              </div>
            </div>

            <iframe
              src={buildCalendarURL()}
              style={{
                width: '100%',
                minHeight: '680px',
                border: 'none',
                display: 'block',
              }}
              title="Book a strategy call with James Miller"
            />
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
