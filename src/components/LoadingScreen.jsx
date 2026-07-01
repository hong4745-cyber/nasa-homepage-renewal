import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Spaceship({ phase }) {
  return (
    <svg
      viewBox="0 0 120 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-24 h-44"
      style={{ filter: 'drop-shadow(0 0 24px #4fc3f7) drop-shadow(0 0 60px #7c3aed55)' }}
    >
      {/* Engine glow */}
      {phase === 'launch' && (
        <>
          <ellipse cx="60" cy="200" rx="18" ry="28"
            fill="url(#engineGlow)" opacity="0.9">
            <animate attributeName="ry" values="28;38;28" dur="0.15s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.6;0.9" dur="0.2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="60" cy="195" rx="10" ry="18" fill="url(#innerGlow)" opacity="0.8" />
        </>
      )}

      {/* Side fins */}
      <path d="M28 140 L10 185 L38 165 Z" fill="url(#finGrad)" />
      <path d="M92 140 L110 185 L82 165 Z" fill="url(#finGrad)" />

      {/* Small side fins top */}
      <path d="M35 80 L18 110 L38 100 Z" fill="#1a2a4a" />
      <path d="M85 80 L102 110 L82 100 Z" fill="#1a2a4a" />

      {/* Main body */}
      <path d="M60 8 C42 8 30 30 28 60 L26 160 L94 160 L92 60 C90 30 78 8 60 8Z"
        fill="url(#bodyGrad)" />

      {/* Body detail lines */}
      <path d="M38 100 L82 100" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.4" />
      <path d="M36 120 L84 120" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.3" />
      <path d="M35 140 L85 140" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.2" />

      {/* Cockpit window */}
      <ellipse cx="60" cy="60" rx="18" ry="22" fill="url(#cockpitBg)" />
      <ellipse cx="60" cy="60" rx="18" ry="22" fill="none" stroke="#4fc3f7" strokeWidth="1.5" />
      <ellipse cx="60" cy="60" rx="12" ry="15" fill="url(#cockpitInner)" opacity="0.7" />
      {/* Window reflection */}
      <ellipse cx="54" cy="52" rx="4" ry="6" fill="rgba(255,255,255,0.15)" />

      {/* Nose cone */}
      <path d="M42 30 Q60 2 78 30 L80 55 Q60 45 40 55 Z" fill="url(#noseGrad)" />

      {/* Engine nozzle */}
      <rect x="44" y="155" width="32" height="12" rx="3" fill="#0d2040" />
      <ellipse cx="60" cy="167" rx="16" ry="6" fill="#0a1830" />
      <ellipse cx="60" cy="167" rx="10" ry="4" fill="#071220" />

      {/* Panel details */}
      <rect x="46" y="90" width="10" height="6" rx="1" fill="#0a2040" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.6" />
      <rect x="64" y="90" width="10" height="6" rx="1" fill="#0a2040" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.6" />

      {/* Antenna */}
      <line x1="60" y1="2" x2="60" y2="12" stroke="#4fc3f7" strokeWidth="1.5" />
      <circle cx="60" cy="2" r="2" fill="#4fc3f7">
        <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
      </circle>

      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0d2040" />
          <stop offset="40%" stopColor="#1a3060" />
          <stop offset="60%" stopColor="#1e3870" />
          <stop offset="100%" stopColor="#0d2040" />
        </linearGradient>
        <linearGradient id="noseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a4a80" />
          <stop offset="100%" stopColor="#0d2040" />
        </linearGradient>
        <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d2040" />
          <stop offset="100%" stopColor="#061020" />
        </linearGradient>
        <radialGradient id="cockpitBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a4080" />
          <stop offset="100%" stopColor="#061830" />
        </radialGradient>
        <radialGradient id="cockpitInner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="engineGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#4fc3f7" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#7c3aed" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="innerGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('enter')   // enter → idle → launch → done
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEMS...')

  const statuses = [
    'INITIALIZING SYSTEMS...',
    'CALIBRATING NAVIGATION...',
    'LOADING STAR CHARTS...',
    'SYNCING MISSION DATA...',
    'ESTABLISHING TELEMETRY...',
    'ALL SYSTEMS NOMINAL',
  ]

  useEffect(() => {
    // Enter phase — ship flies in
    const enterTimer = setTimeout(() => setPhase('idle'), 1200)

    // Progress bar
    let p = 0
    const progressInterval = setInterval(() => {
      p += Math.random() * 8 + 2
      if (p >= 100) {
        p = 100
        clearInterval(progressInterval)
        setStatusText('ALL SYSTEMS NOMINAL')
        setTimeout(() => setPhase('launch'), 600)
        setTimeout(() => onComplete(), 1800)
      } else {
        const idx = Math.floor((p / 100) * (statuses.length - 1))
        setStatusText(statuses[idx])
      }
      setProgress(Math.min(p, 100))
    }, 150)

    return () => {
      clearTimeout(enterTimer)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, #0d0d2b 0%, #050510 100%)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(120)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white star-twinkle"
              style={{
                width: Math.random() * 2.5 + 0.5,
                height: Math.random() * 2.5 + 0.5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.1,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(79,195,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* HUD corner decorations */}
        {[
          'top-6 left-6 border-t-2 border-l-2',
          'top-6 right-6 border-t-2 border-r-2',
          'bottom-6 left-6 border-b-2 border-l-2',
          'bottom-6 right-6 border-b-2 border-r-2',
        ].map((cls, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className={`absolute w-10 h-10 border-[#4fc3f7] ${cls}`}
          />
        ))}

        {/* Scanning ring */}
        <motion.div
          className="absolute rounded-full border border-[#4fc3f7]/20"
          animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          style={{ width: 300, height: 300 }}
        />
        <motion.div
          className="absolute rounded-full border border-[#7c3aed]/20"
          animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
          style={{ width: 300, height: 300 }}
        />

        {/* Spaceship */}
        <motion.div
          initial={{ y: phase === 'enter' ? -300 : 0, opacity: 0 }}
          animate={
            phase === 'launch'
              ? { y: 600, scale: 0.2, opacity: 0 }
              : { y: 0, opacity: 1 }
          }
          transition={
            phase === 'launch'
              ? { duration: 0.9, ease: [0.4, 0, 1, 1] }
              : { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
          }
          style={{ marginBottom: 40 }}
        >
          <motion.div
            animate={phase === 'idle' ? { y: [0, -10, 0] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Spaceship phase={phase} />
          </motion.div>
        </motion.div>

        {/* NASA Logo text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <div className="text-5xl font-black tracking-[0.4em] text-white mb-1">NASA</div>
          <div className="text-xs font-mono tracking-[0.3em] text-[#4fc3f7]/70 uppercase">
            National Aeronautics & Space Administration
          </div>
        </motion.div>

        {/* Progress section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-80 space-y-3"
        >
          {/* Status text */}
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#4fc3f7] tracking-widest">{statusText}</span>
            <span className="text-white/50">{Math.round(progress)}%</span>
          </div>

          {/* Progress bar */}
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #4fc3f7, #7c3aed)',
                boxShadow: '0 0 10px #4fc3f7',
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Segment ticks */}
          <div className="flex justify-between px-0.5">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-px h-1.5 rounded-full transition-all duration-300"
                style={{ background: progress > i * 10 ? '#4fc3f7' : 'rgba(255,255,255,0.15)' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-16 text-xs font-mono text-white/20 tracking-[0.5em] uppercase"
        >
          Exploring the Universe Since 1958
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
