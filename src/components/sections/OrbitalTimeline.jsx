import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const events = [
  { year: 1958, title: 'NASA Founded', desc: 'President Eisenhower signs the National Aeronautics and Space Act, establishing NASA.', icon: '🏛️', color: '#4fc3f7', category: 'MILESTONE' },
  { year: 1961, title: 'First American in Space', desc: 'Alan Shepard becomes the first American in space aboard Freedom 7.', icon: '👨‍🚀', color: '#ff6b35', category: 'CREW' },
  { year: 1969, title: 'Moon Landing', desc: 'Apollo 11 lands on the Moon. Neil Armstrong takes humanity\'s first steps on another world.', icon: '🌙', color: '#ffb74d', category: 'MILESTONE' },
  { year: 1977, title: 'Voyager Launches', desc: 'Voyager 1 & 2 begin their grand tour of the outer planets and beyond.', icon: '🚀', color: '#7c3aed', category: 'MISSION' },
  { year: 1990, title: 'Hubble Space Telescope', desc: 'Hubble revolutionizes astronomy, revealing the universe in unprecedented detail.', icon: '🔭', color: '#ec4899', category: 'TELESCOPE' },
  { year: 1998, title: 'ISS Construction Begins', desc: 'International Space Station assembly starts, uniting 15 nations in orbit.', icon: '🛸', color: '#4fc3f7', category: 'STATION' },
  { year: 2004, title: 'Mars Rovers Land', desc: 'Spirit and Opportunity begin exploring the Martian surface, far exceeding expectations.', icon: '🔴', color: '#fc3d21', category: 'MISSION' },
  { year: 2011, title: 'Shuttle Program Ends', desc: 'After 30 years and 135 missions, the Space Shuttle program concludes.', icon: '✈️', color: '#78909c', category: 'MILESTONE' },
  { year: 2021, title: 'James Webb Launches', desc: 'JWST launches on Christmas Day, becoming the most powerful space telescope ever built.', icon: '✨', color: '#a78bfa', category: 'TELESCOPE' },
  { year: 2024, title: 'Artemis Era Begins', desc: 'NASA returns humans to the lunar orbit for the first time since Apollo.', icon: '🌕', color: '#4fc3f7', category: 'MISSION' },
  { year: 2026, title: 'Mars Horizon', desc: 'Preparations for the first crewed Mars mission reach critical development phase.', icon: '🪐', color: '#ff6b35', category: 'FUTURE' },
]

export default function OrbitalTimeline() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const totalWidth = track.scrollWidth - window.innerWidth

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      }
    })

    tl.to(track, { x: -totalWidth, ease: 'none' })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#050510]" style={{ height: '100vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 px-12 pt-10 flex items-start justify-between pointer-events-none">
          <div>
            <div className="text-xs font-mono text-[#4fc3f7] tracking-[0.3em] mb-2">⟵ DRAG TO EXPLORE ⟶</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              65 Years of{' '}
              <span className="text-gradient">Discovery</span>
            </h2>
          </div>
          <div className="text-xs font-mono text-white/20 text-right">
            <div>TIMELINE: 1958 — 2026</div>
            <div className="mt-1">{events.length} EVENTS</div>
          </div>
        </div>

        {/* Orbit line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, transparent, #4fc3f7 10%, #4fc3f7 90%, transparent)' }}
        />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex items-center h-full pl-[10vw]"
          style={{ width: 'max-content' }}
        >
          {events.map((ev, i) => (
            <div key={ev.year} className="relative flex-shrink-0" style={{ width: 320, marginRight: 60 }}>
              {/* Connector dot on line */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 z-20 relative"
                  style={{
                    background: ev.color,
                    borderColor: ev.color,
                    boxShadow: `0 0 12px ${ev.color}, 0 0 24px ${ev.color}44`,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-60"
                    style={{ background: ev.color }}
                  />
                </div>
              </div>

              {/* Card — alternating above/below */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ [i % 2 === 0 ? 'bottom' : 'top']: 'calc(50% + 30px)', width: 280 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: i % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="rounded-2xl p-5 cursor-default group"
                  style={{
                    background: 'rgba(10,10,30,0.9)',
                    border: `1px solid ${ev.color}33`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: `0 4px 30px ${ev.color}15`,
                  }}
                >
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest"
                      style={{ background: `${ev.color}22`, color: ev.color, border: `1px solid ${ev.color}44` }}
                    >
                      {ev.category}
                    </span>
                    <span className="text-2xl">{ev.icon}</span>
                  </div>

                  <div
                    className="text-3xl font-black mb-1 font-mono"
                    style={{ color: ev.color }}
                  >
                    {ev.year}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-tight">{ev.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{ev.desc}</p>

                  {/* Bottom accent */}
                  <div
                    className="mt-4 h-px opacity-30"
                    style={{ background: `linear-gradient(90deg, ${ev.color}, transparent)` }}
                  />
                </motion.div>

                {/* Connector line to orbit */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-px"
                  style={{
                    [i % 2 === 0 ? 'top' : 'bottom']: '100%',
                    height: 28,
                    background: `linear-gradient(${i % 2 === 0 ? '180deg' : '0deg'}, transparent, ${ev.color}88)`,
                  }}
                />
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div style={{ width: '15vw', flexShrink: 0 }} />
        </div>

        {/* Year display bottom */}
        <div className="absolute bottom-8 left-12 flex items-center gap-6">
          <div className="text-xs font-mono text-white/20">
            {events[0].year} ←
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-white/10 to-transparent" />
          <div className="text-xs font-mono text-white/20">
            → {events[events.length - 1].year}
          </div>
        </div>
      </div>
    </section>
  )
}
