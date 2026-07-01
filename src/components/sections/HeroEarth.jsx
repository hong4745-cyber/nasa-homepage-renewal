import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function EarthCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let angle = 0

    const draw = () => {
      const W = canvas.width = canvas.offsetWidth
      const H = canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      const cx = W / 2
      const cy = H / 2
      const r = Math.min(W, H) * 0.42

      // Deep space background
      const spaceBg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.5)
      spaceBg.addColorStop(0, '#0a1628')
      spaceBg.addColorStop(1, '#020408')
      ctx.fillStyle = spaceBg
      ctx.fillRect(0, 0, W, H)

      // Stars
      ctx.save()
      for (let i = 0; i < 200; i++) {
        const x = (Math.sin(i * 137.508) * 0.5 + 0.5) * W
        const y = (Math.cos(i * 137.508 * 2.1) * 0.5 + 0.5) * H
        const s = Math.random() * 1.5 + 0.2
        const opacity = 0.3 + Math.sin(Date.now() * 0.001 + i) * 0.2
        ctx.fillStyle = `rgba(200, 220, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, s, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // Outer glow / atmosphere
      const atmGlow = ctx.createRadialGradient(cx, cy, r * 0.95, cx, cy, r * 1.35)
      atmGlow.addColorStop(0, 'rgba(79,195,247,0.18)')
      atmGlow.addColorStop(0.4, 'rgba(30,100,180,0.08)')
      atmGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = atmGlow
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.35, 0, Math.PI * 2)
      ctx.fill()

      // Clip to circle
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.clip()

      // Ocean base
      const oceanGrad = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, 0, cx, cy, r)
      oceanGrad.addColorStop(0, '#1565c0')
      oceanGrad.addColorStop(0.3, '#0d47a1')
      oceanGrad.addColorStop(0.7, '#0a2d6e')
      oceanGrad.addColorStop(1, '#061848')
      ctx.fillStyle = oceanGrad
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2)

      // Continents (stylized landmasses)
      const landColor = (a = 1) => `rgba(34,85,40,${a})`
      const desertColor = (a = 1) => `rgba(160,110,60,${a})`

      const offs = angle % (Math.PI * 2)

      // Helper to draw landmass
      const drawLand = (points, color) => {
        ctx.beginPath()
        const shifted = points.map(([px, py]) => {
          const nx = cx + (px - cx + Math.cos(offs) * r * 0.5 + r) % (r * 2) - r
          return [nx, py]
        })
        ctx.moveTo(shifted[0][0], shifted[0][1])
        shifted.slice(1).forEach(([px, py]) => ctx.lineTo(px, py))
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
      }

      // Americas (rough)
      drawLand([
        [cx - r * 0.15, cy - r * 0.5],
        [cx + r * 0.05, cy - r * 0.55],
        [cx + r * 0.12, cy - r * 0.3],
        [cx + r * 0.08, cy + r * 0.05],
        [cx - r * 0.05, cy + r * 0.3],
        [cx - r * 0.12, cy + r * 0.5],
        [cx - r * 0.25, cy + r * 0.55],
        [cx - r * 0.3, cy + r * 0.2],
        [cx - r * 0.25, cy - r * 0.1],
        [cx - r * 0.3, cy - r * 0.35],
      ], landColor(0.9))

      // Europe/Africa
      drawLand([
        [cx + r * 0.25, cy - r * 0.55],
        [cx + r * 0.45, cy - r * 0.5],
        [cx + r * 0.5, cy - r * 0.2],
        [cx + r * 0.42, cy + r * 0.1],
        [cx + r * 0.38, cy + r * 0.5],
        [cx + r * 0.25, cy + r * 0.6],
        [cx + r * 0.18, cy + r * 0.3],
        [cx + r * 0.2, cy - r * 0.1],
        [cx + r * 0.15, cy - r * 0.3],
      ], landColor(0.85))

      // Desert overlay (Sahara)
      drawLand([
        [cx + r * 0.25, cy - r * 0.05],
        [cx + r * 0.44, cy - r * 0.08],
        [cx + r * 0.46, cy + r * 0.12],
        [cx + r * 0.28, cy + r * 0.14],
      ], desertColor(0.6))

      // Asia/Australia
      drawLand([
        [cx + r * 0.55, cy - r * 0.55],
        [cx + r * 0.85, cy - r * 0.4],
        [cx + r * 0.88, cy],
        [cx + r * 0.7, cy + r * 0.2],
        [cx + r * 0.55, cy + r * 0.1],
        [cx + r * 0.5, cy - r * 0.25],
      ], landColor(0.8))

      // Antarctica
      const iceGrad = ctx.createLinearGradient(cx - r, cy + r * 0.7, cx + r, cy + r)
      iceGrad.addColorStop(0, 'rgba(220,235,255,0.7)')
      iceGrad.addColorStop(1, 'rgba(200,220,255,0.5)')
      ctx.fillStyle = iceGrad
      ctx.fillRect(cx - r, cy + r * 0.72, r * 2, r * 0.3)

      // Arctic
      const arcticGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy - r * 0.65)
      arcticGrad.addColorStop(0, 'rgba(220,235,255,0.5)')
      arcticGrad.addColorStop(1, 'rgba(200,220,255,0.2)')
      ctx.fillStyle = arcticGrad
      ctx.fillRect(cx - r, cy - r, r * 2, r * 0.3)

      // Cloud layer
      ctx.save()
      ctx.globalAlpha = 0.35
      const cloudOffs = -angle * 1.3
      const clouds = [
        { x: 0.2, y: -0.3, rx: 0.35, ry: 0.08 },
        { x: 0.5, y: -0.1, rx: 0.25, ry: 0.06 },
        { x: -0.3, y: 0.2, rx: 0.4, ry: 0.07 },
        { x: 0.1, y: 0.4, rx: 0.3, ry: 0.06 },
        { x: -0.5, y: -0.5, rx: 0.2, ry: 0.05 },
        { x: 0.6, y: 0.35, rx: 0.28, ry: 0.06 },
      ]
      clouds.forEach(c => {
        const px = cx + (c.x * r + Math.cos(cloudOffs) * r * 0.4 + r * 1.5) % (r * 2) - r
        const py = cy + c.y * r
        const cg = ctx.createRadialGradient(px, py, 0, px, py, c.rx * r)
        cg.addColorStop(0, 'rgba(255,255,255,0.9)')
        cg.addColorStop(0.6, 'rgba(240,250,255,0.5)')
        cg.addColorStop(1, 'transparent')
        ctx.fillStyle = cg
        ctx.beginPath()
        ctx.ellipse(px, py, c.rx * r, c.ry * r, 0, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()

      // Specular highlight
      const specGrad = ctx.createRadialGradient(
        cx - r * 0.3, cy - r * 0.35, 0,
        cx - r * 0.1, cy - r * 0.1, r * 0.7
      )
      specGrad.addColorStop(0, 'rgba(255,255,255,0.12)')
      specGrad.addColorStop(0.4, 'rgba(79,195,247,0.04)')
      specGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = specGrad
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2)

      // Shadow (night side — right)
      const shadowGrad = ctx.createRadialGradient(
        cx + r * 0.5, cy, 0,
        cx + r * 0.9, cy, r * 0.9
      )
      shadowGrad.addColorStop(0, 'rgba(0,0,0,0.6)')
      shadowGrad.addColorStop(0.5, 'rgba(0,0,0,0.3)')
      shadowGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = shadowGrad
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2)

      ctx.restore()

      // Atmosphere rim
      const rimGrad = ctx.createRadialGradient(cx, cy, r * 0.88, cx, cy, r * 1.05)
      rimGrad.addColorStop(0, 'transparent')
      rimGrad.addColorStop(0.5, 'rgba(79,195,247,0.08)')
      rimGrad.addColorStop(0.8, 'rgba(79,195,247,0.15)')
      rimGrad.addColorStop(1, 'transparent')
      ctx.strokeStyle = rimGrad
      ctx.lineWidth = r * 0.06
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.stroke()

      angle += 0.0008
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  )
}

export default function HeroEarth() {
  const sectionRef = useRef(null)
  const earthWrapRef = useRef(null)
  const textRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const earthScale = useTransform(scrollYProgress, [0, 0.7], [1, 14])
  const earthOpacity = useTransform(scrollYProgress, [0.5, 0.75], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -120])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '300vh' }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ background: 'radial-gradient(ellipse at center, #020c1b 0%, #010308 100%)' }}
      >
        {/* Stars layer */}
        <div className="absolute inset-0">
          {[...Array(160)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white star-twinkle"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.1,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Orbit ring decorations */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1.5, 1.9, 2.4].map((scale, i) => (
            <div key={i} className="absolute rounded-full border border-[#4fc3f7]/8"
              style={{
                width: `${scale * 55}vmin`,
                height: `${scale * 55}vmin`,
                animation: `rotate-slow ${40 + i * 20}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
              }}
            >
              {/* Satellite dot */}
              <div className="absolute w-2 h-2 rounded-full bg-[#4fc3f7]"
                style={{
                  top: 0, left: '50%', transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 8px #4fc3f7',
                }}
              />
            </div>
          ))}
        </div>

        {/* Earth */}
        <motion.div
          ref={earthWrapRef}
          style={{
            scale: earthScale,
            opacity: earthOpacity,
            width: '55vmin',
            height: '55vmin',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <EarthCanvas />
        </motion.div>

        {/* Overlay text */}
        <motion.div
          ref={textRef}
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4"
        >
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10 flex items-center gap-2 px-5 py-2 rounded-full glass-blue text-xs font-mono text-[#4fc3f7]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4fc3f7] animate-pulse" />
            LIVE EARTH — ISS ALTITUDE 408km
            <span className="w-1.5 h-1.5 rounded-full bg-[#4fc3f7] animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center font-black leading-[0.9] mb-4"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)' }}
          >
            <span className="text-white block">EXPLORE</span>
            <span className="text-gradient block">THE COSMOS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/40 text-lg font-mono tracking-[0.2em] uppercase mt-4"
          >
            Scroll to Enter
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={22} className="text-[#4fc3f7]/50" />
          </motion.div>
        </motion.div>

        {/* HUD elements */}
        <div className="absolute top-8 left-8 text-xs font-mono text-[#4fc3f7]/30 pointer-events-none z-20">
          <div>LAT 51.5074° N</div>
          <div>LON 0.1278° W</div>
          <div className="mt-1">ALT 408.50 KM</div>
        </div>
        <div className="absolute top-8 right-8 text-xs font-mono text-[#4fc3f7]/30 text-right pointer-events-none z-20">
          <div>VELOCITY</div>
          <div className="text-[#4fc3f7]/50">27,600 KM/H</div>
        </div>
      </div>
    </section>
  )
}
