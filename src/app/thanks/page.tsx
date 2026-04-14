'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContactData {
  firstName: string;
}

const nextSteps = [
  {
    title: 'Check your email',
    desc: 'A confirmation with call details is on its way.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "You'll hear from James",
    desc: 'He may send a quick text to confirm and introduce himself before the call.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3h3m-3 3h3" />
      </svg>
    ),
  },
  {
    title: 'Nothing to prepare',
    desc: 'No documents needed upfront. Just show up ready to discuss your property.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ThanksPage() {
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = sessionStorage.getItem('jm_contact');
      if (raw) setContact(JSON.parse(raw));
    } catch { /* not available */ }
  }, []);

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
            <p className="font-bold text-white text-sm tracking-tight">James Miller</p>
            <p className="text-gray-400 text-[11px] tracking-wide">West Capital Lending &middot; DSCR Specialist</p>
          </div>
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-widest"
            style={{ background: 'rgba(201, 168, 76, 0.12)', color: '#C9A84C', border: '1px solid rgba(201, 168, 76, 0.2)' }}
          >
            Confirmed
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: '#fff',
              border: '1px solid #E5E7EB',
              boxShadow: '0 8px 32px rgba(27,42,74,0.08)',
            }}
          >
            {/* Gold top accent */}
            <div
              className="h-1.5 w-full"
              style={{ background: 'linear-gradient(90deg, #1B2A4A, #C9A84C, #1B2A4A)' }}
            />

            <div className="p-8 sm:p-10 text-center">
              {/* Confirmation icon with pulse ring */}
              <div className="flex justify-center mb-6">
                <div
                  className="icon-ring-pulse w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.06) 100%)',
                    border: '2px solid rgba(201,168,76,0.35)',
                  }}
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={2.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-text-primary tracking-tight mb-3">
                {contact?.firstName
                  ? `You're all set, ${contact.firstName}.`
                  : "You're all set."}
              </h1>
              <p className="text-brand-text-secondary leading-relaxed mb-8 max-w-sm mx-auto">
                Your strategy call with James is confirmed. He&apos;ll review your profile before reaching out so the conversation is already productive before it starts.
              </p>

              {/* Divider */}
              <div className="divider-gold mb-8" />

              {/* Next steps */}
              <div className="space-y-5 text-left">
                {nextSteps.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                    className="flex gap-4 items-start"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(27,42,74,0.06)', color: '#1B2A4A' }}
                    >
                      {item.icon}
                    </div>
                    <div className="pt-0.5">
                      <p className="font-semibold text-sm text-brand-text-primary">{item.title}</p>
                      <p className="text-sm text-brand-text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-4 px-4 text-center">
        <p className="text-brand-text-muted text-xs">
          &copy; {new Date().getFullYear()} James Miller &middot; West Capital Lending &middot; NMLS 2024710 &middot;{' '}
          <a href="/privacy-policy" className="underline hover:text-brand-text-secondary transition-colors">Privacy Policy</a>
          {' '}&middot;{' '}
          <a href="/terms-of-service" className="underline hover:text-brand-text-secondary transition-colors">Terms</a>
        </p>
      </footer>
    </div>
  );
}
