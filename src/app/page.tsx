'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// ─── VSL Video Component ───────────────────────────────────────────────────────

function VSLVideo() {
  const vslUrl = process.env.NEXT_PUBLIC_VSL_VIDEO_URL;
  if (!vslUrl) return null;

  // Detect YouTube vs direct video
  const isYouTube = /youtube\.com|youtu\.be/.test(vslUrl);

  if (isYouTube) {
    // Extract video ID and build embed URL
    let embedUrl = vslUrl;
    const ytMatch = vslUrl.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
    if (ytMatch) {
      embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-2xl mx-auto mb-8 px-4"
        style={{ paddingTop: '0' }}
      >
        <div
          className="w-full rounded-2xl overflow-hidden shadow-lg"
          style={{ position: 'relative', paddingBottom: '56.25%', height: 0, border: '1px solid rgba(201,168,76,0.2)' }}
        >
          <iframe
            src={embedUrl}
            title="DSCR Loan Overview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
      </motion.div>
    );
  }

  // Direct video (mp4, etc.)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="w-full max-w-2xl mx-auto mb-8 px-4"
    >
      <div
        className="w-full rounded-2xl overflow-hidden shadow-lg"
        style={{ position: 'relative', paddingBottom: '56.25%', height: 0, border: '1px solid rgba(201,168,76,0.2)' }}
      >
        <video
          src={vslUrl}
          controls
          playsInline
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#0f1c30' }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const router = useRouter();

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
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-bold text-white text-base tracking-tight">James Miller</p>
            <p className="text-gray-400 text-xs tracking-wide">West Capital Lending &middot; NMLS 2024710</p>
          </div>
          <span
            className="hidden sm:inline text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest"
            style={{
              background: 'rgba(201, 168, 76, 0.12)',
              color: '#C9A84C',
              border: '1px solid rgba(201, 168, 76, 0.2)',
            }}
          >
            DSCR Specialist
          </span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-16">
        <div className="max-w-2xl mx-auto w-full text-center">

          {/* VSL Video — renders only when NEXT_PUBLIC_VSL_VIDEO_URL is set */}
          <VSLVideo />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{
                background: 'rgba(201, 168, 76, 0.1)',
                color: '#C9A84C',
                border: '1px solid rgba(201, 168, 76, 0.25)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Free Qualification Check
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text-primary tracking-tight leading-tight mb-5">
              Does Your Investment Property Qualify for a{' '}
              <span style={{ color: '#C9A84C' }}>DSCR Loan?</span>
            </h1>

            <p className="text-brand-text-secondary text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto">
              Find out in 60 seconds. Answer 6 quick questions, see your results instantly, and book a free strategy session with James.
            </p>

            <motion.button
              onClick={() => router.push('/survey')}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-200 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #a87d1e 100%)',
                color: '#fff',
                boxShadow: '0 4px 24px rgba(201, 168, 76, 0.35)',
              }}
            >
              Check My Property Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.button>

            <p className="mt-4 text-sm text-brand-text-muted">No credit check. No obligation. Takes 60 seconds.</p>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { number: '$100M+', label: 'DSCR Loans Closed' },
              { number: '50', label: 'States Licensed' },
              { number: '70%+', label: 'Pull-Through Rate' },
              { number: '85%', label: 'DSCR Specialization' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center py-5 rounded-2xl"
                style={{ background: '#fff', border: '1px solid #E5E7EB' }}
              >
                <p className="font-bold text-2xl tracking-tight" style={{ color: '#C9A84C' }}>{stat.number}</p>
                <p className="text-brand-text-muted text-[11px] text-center mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="mt-8 text-left rounded-2xl p-6 sm:p-8"
            style={{ background: '#fff', border: '1px solid #E5E7EB' }}
          >
            <h2 className="text-sm font-semibold text-brand-text-primary mb-5 text-center uppercase tracking-wider">How It Works</h2>
            <div className="space-y-5">
              {[
                { n: '1', title: 'Answer 6 quick questions', desc: 'Takes about 60 seconds. No personal info required upfront.' },
                { n: '2', title: 'See your qualification results', desc: 'Know immediately whether your property fits the DSCR criteria.' },
                { n: '3', title: 'Book your free strategy session', desc: 'James reviews your file before the call. You leave knowing exactly what you qualify for.' },
              ].map((step) => (
                <div key={step.n} className="flex gap-4 items-start">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #1B2A4A, #223563)' }}
                  >
                    {step.n}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-text-primary text-sm">{step.title}</p>
                    <p className="text-brand-text-secondary text-sm mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center border-t" style={{ borderColor: '#E5E7EB' }}>
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
