'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContactData {
  firstName: string;
}

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
    <div className="min-h-screen flex flex-col" style={{ background: '#F8F7F4' }}>
      {/* Header */}
      <header
        className="py-4 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(160deg, #1B2A4A 0%, #0f1c30 100%)',
          borderBottom: '1px solid rgba(201, 168, 76, 0.15)',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="font-bold text-white text-sm tracking-tight">James Miller</p>
          <p className="text-gray-400 text-[11px] tracking-wide">West Capital Lending &middot; DSCR Specialist</p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-2xl p-8 text-center"
            style={{ background: '#fff', border: '1px solid #E5E7EB' }}
          >
            {/* Check circle */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(34, 197, 94, 0.1)' }}
            >
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary tracking-tight mb-3">
              {contact?.firstName
                ? `You're all set, ${contact.firstName}.`
                : "You're all set."}
            </h1>
            <p className="text-brand-text-secondary leading-relaxed mb-8">
              Your strategy call is confirmed. Jordan will reach out ahead of time to introduce himself and make sure the call is as useful as possible for you.
            </p>

            <div className="space-y-4 text-left">
              {[
                { icon: '📧', title: 'Check your email', desc: 'A confirmation with call details is on its way.' },
                { icon: '📱', title: "You'll hear from Jordan", desc: 'He may send a quick text to confirm and introduce himself before the call.' },
                { icon: '📋', title: 'Nothing to prepare', desc: 'No documents needed upfront. Just show up ready to discuss your property.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-brand-text-primary">{item.title}</p>
                    <p className="text-sm text-brand-text-secondary mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
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
