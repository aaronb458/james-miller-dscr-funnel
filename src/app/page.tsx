'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// ─── VSL Video Component ───────────────────────────────────────────────────────

function VSLVideo() {
  const vslUrl = process.env.NEXT_PUBLIC_VSL_VIDEO_URL;

  if (!vslUrl) {
    // Placeholder — visible until env var is set
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="w-full mb-8"
      >
        <div
          className="w-full rounded-2xl overflow-hidden relative flex flex-col items-center justify-center"
          style={{
            paddingBottom: '56.25%',
            background: 'linear-gradient(135deg, #0f1c30 0%, #1B2A4A 60%, #1a2d50 100%)',
            border: '1px solid rgba(201,168,76,0.25)',
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6"
          >
            {/* Play button ring */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(201,168,76,0.12)',
                border: '2px solid rgba(201,168,76,0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <svg className="w-7 h-7 ml-1" fill="#C9A84C" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-semibold text-white text-sm">James&apos; Story — Video Coming Soon</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(201,168,76,0.7)' }}>
                Set <code className="font-mono">NEXT_PUBLIC_VSL_VIDEO_URL</code> to activate
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Detect YouTube vs direct video
  const isYouTube = /youtube\.com|youtu\.be/.test(vslUrl);

  if (isYouTube) {
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
        className="w-full mb-8"
      >
        <div
          className="w-full rounded-2xl overflow-hidden shadow-lg"
          style={{ position: 'relative', paddingBottom: '56.25%', height: 0, border: '1px solid rgba(201,168,76,0.2)' }}
        >
          <iframe
            src={embedUrl}
            title="DSCR Loan Overview with James Miller"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="w-full mb-8"
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

// ─── Header ────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header
      className="py-4 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1B2A4A 0%, #0f1c30 100%)',
        borderBottom: '1px solid rgba(201, 168, 76, 0.15)',
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
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
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: '#F8F7F4' }}>
      <Header />

      {/* Hero — textured navy section, left-aligned split layout */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1B2A4A 0%, #0f1c30 60%, #162238 100%)',
        }}
      >
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.13) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.6,
          }}
        />
        {/* Gold radial glow bottom-right */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: '50%',
            height: '100%',
            background: 'radial-gradient(ellipse at 90% 80%, rgba(201,168,76,0.07) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          {/* Two-column: left hero copy, right VSL */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              className="order-2 lg:order-1"
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: 'rgba(201, 168, 76, 0.1)',
                  color: '#C9A84C',
                  border: '1px solid rgba(201, 168, 76, 0.25)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Free Qualification Check
              </div>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.08] mb-5"
                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}
              >
                Does Your Investment Property Qualify for a{' '}
                <span style={{ color: '#C9A84C' }}>DSCR Loan?</span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Find out in 60 seconds. Answer 6 quick questions, see your results instantly, and book a free strategy session with James.
              </p>

              <motion.button
                onClick={() => router.push('/survey')}
                whileTap={{ scale: 0.97 }}
                className="cta-pulse btn-tactile inline-flex items-center gap-3 font-bold text-lg px-8 py-4 rounded-2xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C 0%, #a87d1e 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 28px rgba(201, 168, 76, 0.4), 0 1px 0 rgba(255,255,255,0.1) inset',
                }}
              >
                Check My Property Now
                <svg className="cta-arrow w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.button>

              <p className="mt-4 text-sm text-gray-500">No credit check. No obligation. Takes 60 seconds.</p>
            </motion.div>

            {/* Right: VSL */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
              className="order-1 lg:order-2 w-full"
            >
              <VSLVideo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-8 px-4" style={{ background: '#fff', borderBottom: '1px solid #E5E7EB' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { number: '[X]', label: 'DSCR Loans Closed', unit: '', placeholder: true },
              { number: '[X]', label: 'States Licensed', unit: '', placeholder: true },
              { number: '[X]', label: 'Avg Close Time', unit: 'days', placeholder: true },
              { number: '[X]%', label: 'DSCR Specialization', unit: '', placeholder: true },
            ].map((stat) => (
              <div
                key={stat.label}
                className="stat-card flex flex-col items-center py-5 px-3 rounded-2xl"
                style={{ background: '#F8F7F4', border: '1px solid #E5E7EB' }}
              >
                <p className="font-bold text-2xl tracking-tight font-display" style={{ color: '#C9A84C' }}>
                  {stat.number}{stat.unit ? <span className="text-lg ml-0.5">{stat.unit}</span> : null}
                </p>
                <p className="text-brand-text-muted text-[11px] text-center mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
                {stat.placeholder && (
                  <span className="placeholder-badge mt-2">Update with real data</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 px-4 py-10 sm:py-14">
        <div className="max-w-2xl mx-auto w-full">

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-2xl p-7 sm:p-9"
            style={{
              background: '#fff',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 24px rgba(27,42,74,0.04)',
            }}
          >
            <h2 className="text-xs font-bold text-brand-text-primary mb-6 text-center uppercase tracking-widest">
              How It Works
            </h2>
            <div className="space-y-6">
              {[
                { n: '1', title: 'Answer 6 quick questions', desc: 'Takes about 60 seconds. No personal info required upfront.' },
                { n: '2', title: 'See your qualification results', desc: 'Know immediately whether your property fits the DSCR criteria.' },
                { n: '3', title: 'Book your free strategy session', desc: 'James reviews your file before the call. You leave knowing exactly what you qualify for.' },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.08, ease: [0.32, 0.72, 0, 1] }}
                  className="flex gap-4 items-start"
                >
                  <div
                    className="step-orb w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-sm text-white"
                  >
                    {step.n}
                  </div>
                  <div className="pt-0.5">
                    <p className="font-semibold text-brand-text-primary text-sm">{step.title}</p>
                    <p className="text-brand-text-secondary text-sm mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="divider-gold my-7" />

            <motion.button
              onClick={() => router.push('/survey')}
              whileTap={{ scale: 0.97 }}
              className="btn-tactile w-full flex items-center justify-center gap-3 font-bold text-base px-8 py-4 rounded-2xl cursor-pointer transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #a87d1e 100%)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(201, 168, 76, 0.35)',
              }}
            >
              Check My Property Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.button>
            <p className="mt-3 text-center text-xs text-brand-text-muted">No credit check. No obligation. Takes 60 seconds.</p>
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
