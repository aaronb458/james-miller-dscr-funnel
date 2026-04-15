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
              <p className="font-semibold text-white text-sm">James&apos; Story</p>
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
            title="Investment Property Loans with James Miller"
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
      className="py-5 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1B2A4A 0%, #0f1c30 100%)',
        borderBottom: '1px solid rgba(201, 168, 76, 0.15)',
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div>
          <p className="font-bold text-white text-base" style={{ letterSpacing: '-0.02em' }}>James Miller</p>
          <p className="text-gray-400 text-xs tracking-wide">West Capital Lending &middot; NMLS 2024710</p>
        </div>
        <span
          className="hidden sm:inline text-label px-3 py-1.5 rounded-full"
          style={{
            fontSize: '10px',
            background: 'rgba(201, 168, 76, 0.12)',
            color: '#C9A84C',
            border: '1px solid rgba(201, 168, 76, 0.2)',
          }}
        >
          Investment Property Loans
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

      {/* Hero -- textured navy section, left-aligned split layout */}
      <section
        className="relative overflow-hidden hero-grid hero-noise"
        style={{
          background: 'linear-gradient(160deg, #1B2A4A 0%, #0f1c30 60%, #162238 100%)',
        }}
      >
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            opacity: 0.6,
          }}
        />
        {/* Gold radial glow bottom-right */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: '55%',
            height: '100%',
            background: 'radial-gradient(ellipse at 85% 75%, rgba(201,168,76,0.06) 0%, transparent 55%)',
          }}
        />
        {/* Top-left navy glow for depth */}
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: '40%',
            height: '60%',
            background: 'radial-gradient(ellipse at 15% 20%, rgba(34,53,99,0.4) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
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

              <h1
                className="heading-display font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] text-white mb-7"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.35)' }}
              >
                No W-2s. No Tax Returns.{' '}
                <br className="hidden sm:block" />
                <span style={{ color: '#C9A84C' }}>Just Your Property.</span>
              </h1>

              <p className="body-relaxed text-gray-300 text-lg mb-12 max-w-lg">
                We specialize in investment property loans that qualify based on rental income — not your personal income or employment status. Find out if you qualify in 60 seconds.
              </p>

              <motion.button
                onClick={() => router.push('/survey')}
                whileTap={{ scale: 0.96 }}
                className="cta-pulse btn-tactile inline-flex items-center gap-3 font-bold text-lg px-10 py-[18px] rounded-2xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C 0%, #b8922e 50%, #a87d1e 100%)',
                  color: '#fff',
                  boxShadow: '0 6px 32px rgba(201, 168, 76, 0.4), 0 1px 0 rgba(255,255,255,0.15) inset, 0 -1px 0 rgba(0,0,0,0.1) inset',
                }}
              >
                Check My Property Now
                <svg className="cta-arrow w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.button>

              <p className="mt-5 text-sm text-gray-500">No credit check. No obligation. Takes 60 seconds.</p>
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
      <section className="py-12 px-4" style={{ background: '#fff', borderBottom: '1px solid #E5E7EB' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { number: '[X]', label: 'Investment Loans Closed', unit: '', placeholder: true },
              { number: '[X]', label: 'States Licensed', unit: '', placeholder: true },
              { number: '[X]', label: 'Avg Close Time', unit: 'days', placeholder: true },
              { number: '[X]%', label: 'Investment Property Focus', unit: '', placeholder: true },
            ].map((stat) => (
              <div
                key={stat.label}
                className="stat-card flex flex-col items-center py-6 px-4 rounded-2xl"
                style={{ background: '#F8F7F4', border: '1px solid #E5E7EB' }}
              >
                <p className="font-bold text-2xl font-display" style={{ color: '#C9A84C', letterSpacing: '-0.03em' }}>
                  {stat.number}{stat.unit ? <span className="text-lg ml-0.5">{stat.unit}</span> : null}
                </p>
                <p className="text-label text-brand-text-muted text-center mt-1.5" style={{ fontSize: '10px' }}>{stat.label}</p>
                {stat.placeholder && (
                  <span className="placeholder-badge mt-2">Update with real data</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 px-4 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto w-full">

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-2xl p-8 sm:p-12"
            style={{
              background: '#fff',
              border: '1px solid rgba(229, 231, 235, 0.8)',
              boxShadow: '0 8px 32px rgba(27,42,74,0.05), 0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <h2 className="text-label text-brand-text-primary mb-8 text-center" style={{ fontSize: '11px' }}>
              How It Works
            </h2>
            <div className="space-y-8">
              {[
                { n: '1', title: 'Answer 7 quick questions', desc: 'Takes about 60 seconds. No personal info required upfront.' },
                { n: '2', title: 'See your qualification results', desc: 'Know immediately whether your property is a good fit and what loan structure makes sense.' },
                { n: '3', title: 'Book your free strategy session', desc: 'James reviews your file before the call. You leave knowing exactly what you qualify for.' },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.08, ease: [0.32, 0.72, 0, 1] }}
                  className="flex gap-5 items-start"
                >
                  <div
                    className="step-orb w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm text-white"
                  >
                    {step.n}
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold text-brand-text-primary text-[15px]" style={{ letterSpacing: '-0.01em' }}>{step.title}</p>
                    <p className="body-relaxed text-brand-text-secondary text-sm mt-1">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="divider-gold my-10" />

            <motion.button
              onClick={() => router.push('/survey')}
              whileTap={{ scale: 0.96 }}
              className="btn-tactile w-full flex items-center justify-center gap-3 font-bold text-base px-8 py-[18px] rounded-2xl cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #b8922e 50%, #a87d1e 100%)',
                color: '#fff',
                boxShadow: '0 6px 24px rgba(201, 168, 76, 0.38), 0 1px 0 rgba(255,255,255,0.12) inset',
              }}
            >
              Check My Property Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.button>
            <p className="mt-4 text-center text-xs text-brand-text-muted">No credit check. No obligation. Takes 60 seconds.</p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t" style={{ borderColor: '#E5E7EB' }}>
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
