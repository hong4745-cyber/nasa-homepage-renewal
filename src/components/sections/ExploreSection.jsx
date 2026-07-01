import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Rocket, Globe, Cpu, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TABS = [
  { id: 'missions', label: 'Missions', icon: Rocket, color: '#4fc3f7' },
  { id: 'planets', label: 'Planets', icon: Globe, color: '#ff6b35' },
  { id: 'technology', label: 'Technology', icon: Cpu, color: '#7c3aed' },
  { id: 'humans', label: 'Humans', icon: Users, color: '#ec4899' },
]

const CONTENT = {
  missions: {
    headline: 'Pushing Boundaries',
    sub: 'Every mission is a leap into the unknown — a testament to human ambition and engineering excellence.',
    items: [
      { title: 'Artemis Program', status: 'ACTIVE', desc: 'Returning humans to the Moon — and preparing for the journey to Mars. The most ambitious crewed space program since Apollo.', tag: 'LUNAR', progress: 68, color: '#4fc3f7' },
      { title: 'Mars Sample Return', status: 'DEVELOPMENT', desc: 'A joint NASA-ESA mission to bring Martian rock samples to Earth for the first time in history.', tag: 'MARS', progress: 35, color: '#ef5350' },
      { title: 'Europa Clipper', status: 'EN ROUTE', desc: 'Searching for signs of habitability in the subsurface ocean of Jupiter\'s moon Europa.', tag: 'JUPITER', progress: 45, color: '#80deea' },
      { title: 'Nancy Grace Roman', status: 'PLANNED', desc: 'The next flagship space telescope — will survey 100× more sky area than Hubble in a single observation.', tag: 'ASTRONOMY', progress: 80, color: '#a78bfa' },
    ]
  },
  planets: {
    headline: 'Worlds to Explore',
    sub: 'Eight planets, hundreds of moons, and billions of mysteries await humanity\'s curiosity.',
    items: [
      { title: 'Mars: The Red Planet', status: 'ACTIVE', desc: 'Currently home to 6 active robots. Evidence of ancient rivers and lakes suggests Mars once had the conditions for life.', tag: 'TERRESTRIAL', progress: 75, color: '#ef5350' },
      { title: 'Europa: Ocean World', status: 'INCOMING', desc: 'Beneath Europa\'s icy shell lies a saltwater ocean twice as large as Earth\'s — possibly habitable.', tag: 'MOON', progress: 40, color: '#80deea' },
      { title: 'Titan: Alien Seas', status: 'FUTURE', desc: 'Saturn\'s largest moon has lakes and rivers of liquid methane. Dragonfly will explore its surface in 2034.', tag: 'MOON', progress: 25, color: '#ffb74d' },
      { title: 'Enceladus: Ice Geysers', status: 'STUDIED', desc: 'Active water geysers erupt from the south pole, seeding Saturn\'s rings with organic compounds.', tag: 'MOON', progress: 60, color: '#e1f5fe' },
    ]
  },
  technology: {
    headline: 'Engineering the Future',
    sub: 'NASA technologies power everything from kidney dialysis to laptop computers. Every dollar invested returns $7 to the economy.',
    items: [
      { title: 'Nuclear Thermal Propulsion', status: 'DEVELOPMENT', desc: 'Reduces Mars travel time from 9 months to 4 months. Critical for protecting astronauts from radiation exposure.', tag: 'PROPULSION', progress: 50, color: '#7c3aed' },
      { title: 'AI Mission Planning', status: 'ACTIVE', desc: 'Machine learning algorithms now plan rover driving routes autonomously — enabling 3× more science per sol.', tag: 'ARTIFICIAL INTELLIGENCE', progress: 85, color: '#4fc3f7' },
      { title: 'Space-Based Solar Power', status: 'RESEARCH', desc: 'Collecting solar energy in orbit and transmitting it to Earth could provide unlimited clean power globally.', tag: 'ENERGY', progress: 30, color: '#ffb74d' },
      { title: 'Quantum GPS', status: 'TESTING', desc: 'Quantum-based positioning systems 1000× more precise than GPS, works underground and underwater.', tag: 'NAVIGATION', progress: 65, color: '#ec4899' },
    ]
  },
  humans: {
    headline: 'People in Space',
    sub: 'For over 23 consecutive years, humans have lived and worked aboard the International Space Station.',
    items: [
      { title: 'ISS: Humanity\'s Lab', status: 'ACTIVE', desc: '7 crew members currently living and working in microgravity, conducting thousands of experiments for Earth\'s benefit.', tag: 'SPACE STATION', progress: 99, color: '#4caf50' },
      { title: 'Astronaut Selection 2024', status: 'COMPLETED', desc: '10 new NASA astronauts selected from 12,000 applicants for future Moon and Mars missions.', tag: 'RECRUITMENT', progress: 100, color: '#4fc3f7' },
      { title: 'Space Medicine Advances', status: 'ONGOING', desc: 'Research on long-duration spaceflight has led to breakthroughs in cancer treatment, osteoporosis, and vision care.', tag: 'MEDICINE', progress: 70, color: '#ec4899' },
      { title: 'Commercial Crew', status: 'ACTIVE', desc: 'SpaceX Crew Dragon and Boeing Starliner provide regular taxi service to the ISS, reducing NASA costs by 60%.', tag: 'PARTNERSHIP', progress: 90, color: '#ffb74d' },
    ]
  }
}

export default function ExploreSection() {
  const [activeTab, setActiveTab] = useState('missions')
  const sectionRef = useRef(null)
  const content = CONTENT[activeTab]
  const tabColor = TABS.find(t => t.id === activeTab)?.color || '#4fc3f7'

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from('.explore-item', {
        opacity: 0, y: 30, stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 60%', once: true }
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 px-6" style={{ background: '#06060e' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue text-xs font-mono text-[#4fc3f7] mb-5">
            🔭 DEEP EXPLORATION
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3">
            Explore{' '}
            <span className="text-gradient">by Category</span>
          </h2>
        </motion.div>

        {/* Tab Bar */}
        <div className="flex gap-2 mb-10 p-1.5 rounded-2xl overflow-x-auto"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {TABS.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 min-w-max flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 relative"
                style={{
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                  background: isActive ? `${tab.color}1a` : 'transparent',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `${tab.color}15`, border: `1px solid ${tab.color}33` }}
                    transition={{ type: 'spring', damping: 25 }}
                  />
                )}
                <Icon size={15} style={{ color: isActive ? tab.color : 'inherit' }} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {/* Section headline */}
            <div className="mb-8">
              <h3 className="text-3xl font-black text-white mb-2" style={{ color: tabColor }}>{content.headline}</h3>
              <p className="text-white/50 max-w-2xl">{content.sub}</p>
            </div>

            {/* Items grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {content.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="explore-item group rounded-2xl p-6 cursor-pointer transition-all duration-200"
                  style={{
                    background: `${item.color}08`,
                    border: `1px solid ${item.color}22`,
                  }}
                  whileHover={{
                    borderColor: `${item.color}55`,
                    boxShadow: `0 8px 40px ${item.color}15`,
                    y: -4,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold"
                        style={{ background: `${item.color}22`, color: item.color }}
                      >
                        {item.tag}
                      </span>
                      <span className="text-[9px] font-mono text-white/30 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: item.color }} />
                        {item.status}
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">{item.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{item.desc}</p>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-white/30">
                      <span>Progress</span>
                      <span style={{ color: item.color }}>{item.progress}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
