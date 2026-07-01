import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play, Satellite } from 'lucide-react'

const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*'

function GlitchText({ text, className }) {
  const [displayed, setDisplayed] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  const triggerGlitch = () => {
    setIsGlitching(true)
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayed(
        text.split('').map((char, i) =>
          i < iteration ? char : char === ' ' ? ' ' : glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ).join('')
      )
      if (iteration >= text.length) {
        clearInterval(interval)
        setDisplayed(text)
        setIsGlitching(false)
      }
      iteration += 0.5
    }, 30)
  }

  useEffect(() => {
    const timer = setTimeout(triggerGlitch, 800)
    const interval = setInterval(triggerGlitch, 8000)
    return () => { clearTimeout(timer); clearInterval(interval) }
  }, [])

  return (
    <span className={className} onMouseEnter={triggerGlitch} style={{ fontFamily: 'monospace' }}>
      {displayed}
    </span>
  )
}

function Planet({ size, color, glow, style, rings }) {
  return (
    <div className="relative float-animation" style={style}>
      <div
        className="rounded-full"
        style={{
          width: size, height: size,
          background: `radial-gradient(circle at 30% 30%, ${color}cc, ${color}44)`,
          boxShadow: `0 0 ${size / 2}px ${glow}55, inset 0 0 ${size / 3}px rgba(0,0,0,0.5)`,
        }}
      />
      {rings && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: size * 1.8, height: size * 0.5,
            borderColor: `${color}44`,
            transform: 'translate(-50%, -50%) rotateX(70deg)',
          }}
        />
      )}
    </div>
  )
}

const taglines = [
  'Explore the Cosmos',
  'Discover New Worlds',
  'Push the Boundaries',
  'Reach for the Stars',
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [taglineIdx, setTaglineIdx] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx(i => (i + 1) % taglines.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Nebula canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const drawNebula = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const colors = [
        { x: 0.3, y: 0.4, r: 300, c: 'rgba(79,195,247,0.06)' },
        { x: 0.7, y: 0.6, r: 250, c: 'rgba(124,58,237,0.05)' },
        { x: 0.5, y: 0.8, r: 200, c: 'rgba(236,72,153,0.04)' },
      ]
      colors.forEach(({ x, y, r, c }) => {
        const grad = ctx.createRadialGradient(
          canvas.width * x, canvas.height * y, 0,
          canvas.width * x, canvas.height * y, r
        )
        grad.addColorStop(0, c)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })
    }

    drawNebula()
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawNebula()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Planets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-[8%]" style={{ animationDelay: '0s' }}>
          <Planet size={140} color="#4fc3f7" glow="#4fc3f7" style={{ animationDelay: '0s' }} />
        </div>
        <div className="absolute bottom-32 left-[6%]" style={{ animationDelay: '2s' }}>
          <Planet size={80} color="#ff6b35" glow="#ff6b35" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute top-1/3 left-[12%]">
          <Planet size={50} color="#7c3aed" glow="#7c3aed" style={{ animationDelay: '4s' }} rings />
        </div>
        <div className="absolute top-[15%] left-[35%]">
          <Planet size={25} color="#ec4899" glow="#ec4899" style={{ animationDelay: '1s' }} />
        </div>

        {/* Orbiting dot */}
        <div
          className="absolute top-20 right-[8%]"
          style={{
            width: 280, height: 280,
            marginTop: -70, marginRight: -70,
            animation: 'rotate-slow 20s linear infinite',
          }}
        >
          <div
            className="absolute"
            style={{
              top: 0, left: '50%',
              width: 8, height: 8,
              marginLeft: -4, marginTop: -4,
              borderRadius: '50%',
              background: '#4fc3f7',
              boxShadow: '0 0 10px #4fc3f7',
            }}
          />
        </div>

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(79,195,247,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79,195,247,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Meteor streaks */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#4fc3f7] to-transparent"
            style={{
              top: `${15 + i * 12}%`,
              left: '-10%',
              width: `${80 + Math.random() * 100}px`,
              opacity: 0.4,
              transform: 'rotate(-30deg)',
              animation: `meteor ${3 + i}s ${i * 1.5}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue mb-8 text-sm font-mono text-[#4fc3f7]"
        >
          <Satellite size={14} className="animate-pulse" />
          <span>National Aeronautics and Space Administration</span>
          <span className="w-2 h-2 rounded-full bg-[#4fc3f7] animate-pulse" />
        </motion.div>

        {/* Main Title */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-8xl lg:text-[120px] font-black tracking-tight leading-none"
          >
            <GlitchText
              text="EXPLORE"
              className="text-white block"
            />
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-8xl lg:text-[120px] font-black tracking-tight leading-none"
          >
            <span className="text-gradient">THE UNIVERSE</span>
          </motion.div>
        </div>

        {/* Rotating tagline */}
        <div className="h-8 mb-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIdx}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg md:text-xl text-white/50 font-mono tracking-widest uppercase"
            >
              — {taglines[taglineIdx]} —
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(79,195,247,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="relative px-10 py-4 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#7c3aed] text-white font-bold text-lg overflow-hidden group"
          >
            <span className="relative z-10">Explore Missions</span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-8 py-4 rounded-full glass border border-[#4fc3f7]/30 text-white font-semibold text-lg hover:border-[#4fc3f7]/60 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#4fc3f7]/20 flex items-center justify-center">
              <Play size={16} className="ml-0.5 text-[#4fc3f7]" />
            </div>
            Watch Live
          </motion.button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {[
            { label: 'Active Missions', value: '62+' },
            { label: 'Countries', value: '130+' },
            { label: 'Years of Flight', value: '65+' },
            { label: 'Planets Visited', value: '8' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-[#4fc3f7]">{stat.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 uppercase tracking-[0.3em] font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-[#4fc3f7]/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
