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

    // Load contact from sessionStorage
    try {
      const raw = sessionStorage.getItem('jm_contact');
      if (raw) setContact(JSON.parse(raw));
    } catch { /* not available */ }

    // Listen for booking confirmation from calendar iframe
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

  // Build calendar URL with pre-filled contact info
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
            Book a Call
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 py-10 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="text-center mb-8"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(201, 168, 76, 0.1)' }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary tracking-tight mb-2">
              Book Your Free Strategy Call with Jordan
            </h1>
            <p className="text-brand-text-secondary text-base max-w-md mx-auto">
              {contact?.firstName
                ? `${contact.firstName}, pick a time that works for you. Jordan will review your profile before the call.`
                : 'Pick a time that works for you. Jordan will review your profile before the call.'}
            </p>
          </motion.div>

          {/* Calendar embed */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #E5E7EB', background: '#fff' }}
          >
            <iframe
              src={buildCalendarURL()}
              style={{
                width: '100%',
                minHeight: '680px',
                border: 'none',
                display: 'block',
              }}
              title="Book a strategy call with Jordan"
            />
          </motion.div>

          {/* Reassurance strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-brand-text-muted"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Free consultation
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              No credit check required
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              No obligation
            </span>
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
