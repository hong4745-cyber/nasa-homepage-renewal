import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PLANETS = [
  {
    name: 'Mercury', symbol: '☿', color: '#b5b5b5', size: 52, distance: '77M km',
    moons: 0, day: '59 Earth days', temp: '430°C / -180°C',
    mass: '3.3 × 10²³ kg', gravity: '3.7 m/s²', type: 'Terrestrial',
    desc: 'The smallest planet and closest to the Sun. Mercury\'s surface resembles our Moon, covered in craters from billions of years of impacts. Despite being closest to the Sun, it\'s not the hottest planet.',
    funFact: 'A year on Mercury is just 88 Earth days, but a day lasts 59 Earth days.',
    gradient: ['#9e9e9e', '#616161', '#424242'],
    rings: false, hasLife: false,
    missions: ['Mariner 10', 'MESSENGER', 'BepiColombo'],
  },
  {
    name: 'Venus', symbol: '♀', color: '#e8c57b', size: 82, distance: '261M km',
    moons: 0, day: '243 Earth days', temp: '465°C',
    mass: '4.87 × 10²⁴ kg', gravity: '8.87 m/s²', type: 'Terrestrial',
    desc: 'Venus is Earth\'s twin in size but an infernal hellscape. Its thick atmosphere of CO₂ and sulfuric acid clouds trap heat, creating a runaway greenhouse effect that makes it the hottest planet.',
    funFact: 'Venus rotates backwards — the Sun rises in the west and sets in the east.',
    gradient: ['#ffe082', '#ffca28', '#ff8f00'],
    rings: false, hasLife: false,
    missions: ['Venera probes', 'Magellan', 'Parker Solar Probe'],
  },
  {
    name: 'Earth', symbol: '♁', color: '#4fc3f7', size: 88, distance: '0 km (home)',
    moons: 1, day: '24 hours', temp: '-88°C to 58°C',
    mass: '5.97 × 10²⁴ kg', gravity: '9.81 m/s²', type: 'Terrestrial',
    desc: 'Our pale blue dot — the only known world to harbor life. Earth\'s liquid water, protective atmosphere, and magnetic field create the perfect conditions for the incredible diversity of life we know.',
    funFact: '71% of Earth\'s surface is covered in water. The oceans are on average 3.7 km deep.',
    gradient: ['#4fc3f7', '#1565c0', '#0d47a1'],
    rings: false, hasLife: true,
    missions: ['ISS', 'Landsat', 'GOES satellites'],
  },
  {
    name: 'Mars', symbol: '♂', color: '#ef5350', size: 68, distance: '225M km',
    moons: 2, day: '24.6 hours', temp: '-125°C to 20°C',
    mass: '6.39 × 10²³ kg', gravity: '3.72 m/s²', type: 'Terrestrial',
    desc: 'The Red Planet is humanity\'s next great destination. With evidence of ancient rivers and lakes, Mars once had liquid water. Today, NASA\'s Perseverance rover searches for signs of ancient microbial life.',
    funFact: 'Olympus Mons on Mars is the tallest volcano in the solar system — 22km high.',
    gradient: ['#ef5350', '#c62828', '#7f0000'],
    rings: false, hasLife: false,
    missions: ['Perseverance', 'Ingenuity', 'Curiosity', 'InSight'],
  },
  {
    name: 'Jupiter', symbol: '♃', color: '#ffb74d', size: 140, distance: '778M km',
    moons: 95, day: '9.9 hours', temp: '-110°C',
    mass: '1.9 × 10²⁷ kg', gravity: '24.79 m/s²', type: 'Gas Giant',
    desc: 'The king of planets, Jupiter is more than twice as massive as all other planets combined. Its Great Red Spot is a storm that has raged for over 400 years. Europa, one of its 95 moons, may harbor a subsurface ocean.',
    funFact: 'The Great Red Spot is shrinking — it was 3× Earth\'s size in 1800, now just 1.3×.',
    gradient: ['#ffe0b2', '#ffb74d', '#ef6c00'],
    rings: true, hasLife: false,
    missions: ['Juno', 'Galileo', 'Europa Clipper'],
  },
  {
    name: 'Saturn', symbol: '♄', color: '#fff176', size: 126, distance: '1.43B km',
    moons: 146, day: '10.7 hours', temp: '-140°C',
    mass: '5.68 × 10²⁶ kg', gravity: '10.44 m/s²', type: 'Gas Giant',
    desc: 'Saturn\'s magnificent ring system — made of billions of ice particles and rocks — stretches 282,000 km across but is razor-thin at just 10-100 meters. Titan, its largest moon, has lakes of liquid methane.',
    funFact: 'Saturn is the least dense planet — it would float in water!',
    gradient: ['#fff9c4', '#fff176', '#f9a825'],
    rings: true, hasLife: false,
    missions: ['Cassini-Huygens', 'Dragonfly (2028)'],
  },
  {
    name: 'Uranus', symbol: '⛢', color: '#80deea', size: 100, distance: '2.88B km',
    moons: 28, day: '17.2 hours', temp: '-195°C',
    mass: '8.68 × 10²⁵ kg', gravity: '8.69 m/s²', type: 'Ice Giant',
    desc: 'Uranus is the oddball of the solar system — it rotates on its side with an axial tilt of 98°. This ice giant has a faint ring system and its atmosphere contains methane, giving it that distinctive blue-green color.',
    funFact: 'Uranus was the first planet discovered with a telescope, in 1781 by William Herschel.',
    gradient: ['#b2ebf2', '#80deea', '#00acc1'],
    rings: true, hasLife: false,
    missions: ['Voyager 2 (flyby)'],
  },
  {
    name: 'Neptune', symbol: '♆', color: '#5c6bc0', size: 96, distance: '4.5B km',
    moons: 16, day: '16.1 hours', temp: '-200°C',
    mass: '1.02 × 10²⁶ kg', gravity: '11.15 m/s²', type: 'Ice Giant',
    desc: 'The windiest planet in the solar system, Neptune\'s storms can reach 2,100 km/h. Though it receives 900× less sunlight than Earth, it generates its own internal heat. Triton, its largest moon, orbits backwards.',
    funFact: 'Neptune was discovered through mathematics — astronomers predicted its location before seeing it.',
    gradient: ['#7986cb', '#5c6bc0', '#283593'],
    rings: false, hasLife: false,
    missions: ['Voyager 2 (flyby)'],
  },
]

function PlanetSphere({ planet, isSelected, onClick }) {
  const size = isSelected ? planet.size * 1.2 : planet.size
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer relative flex items-center justify-center"
      style={{ width: planet.size * 1.4, height: planet.size * 1.4, flexShrink: 0 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Selection ring */}
      {isSelected && (
        <motion.div
          className="absolute rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            width: size * 1.5, height: size * 1.5,
            border: `2px solid ${planet.color}`,
            boxShadow: `0 0 30px ${planet.color}55`,
          }}
        />
      )}

      {/* Planet glow */}
      <div className="absolute rounded-full"
        style={{
          width: size * 1.2, height: size * 1.2,
          background: `radial-gradient(circle at 30% 30%, ${planet.gradient[0]}44, ${planet.gradient[2]}11)`,
          filter: 'blur(8px)',
          opacity: isSelected ? 1 : 0.4,
        }}
      />

      {/* Planet body */}
      <motion.div
        className="relative rounded-full overflow-hidden"
        style={{
          width: size, height: size,
          animation: 'rotate-slow 12s linear infinite',
          background: `radial-gradient(circle at 35% 30%, ${planet.gradient[0]}, ${planet.gradient[1]} 50%, ${planet.gradient[2]})`,
          boxShadow: `inset -${size * 0.2}px -${size * 0.1}px ${size * 0.3}px rgba(0,0,0,0.6), 0 0 ${size * 0.4}px ${planet.color}33`,
        }}
        animate={{ rotateY: isSelected ? [0, 360] : 0 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        {/* Surface bands for gas giants */}
        {(planet.type === 'Gas Giant') && [0.3, 0.45, 0.6, 0.72, 0.85].map((y, i) => (
          <div key={i}
            className="absolute left-0 right-0"
            style={{
              top: `${y * 100}%`,
              height: size * 0.06,
              background: `rgba(0,0,0,${0.1 + i * 0.05})`,
              transform: `translateY(-50%)`,
            }}
          />
        ))}
        {/* Shadow */}
        <div className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle at 70% 60%, rgba(0,0,0,0.5), transparent 60%)' }}
        />
        {/* Highlight */}
        <div className="absolute rounded-full"
          style={{
            width: size * 0.3, height: size * 0.25,
            top: '15%', left: '20%',
            background: `radial-gradient(circle, rgba(255,255,255,0.2), transparent)`,
          }}
        />
      </motion.div>

      {/* Rings (Saturn-style) */}
      {planet.rings && (
        <div className="absolute rounded-full pointer-events-none"
          style={{
            width: size * 2.2, height: size * 0.45,
            border: `${size * 0.04}px solid ${planet.color}55`,
            borderRadius: '50%',
            transform: 'rotateX(75deg)',
            boxShadow: `0 0 12px ${planet.color}33`,
          }}
        />
      )}

      {/* Name label */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono font-bold whitespace-nowrap transition-colors"
        style={{ color: isSelected ? planet.color : 'rgba(255,255,255,0.35)' }}
      >
        {planet.name}
      </div>
    </motion.div>
  )
}

export default function SolarExplorer() {
  const [selected, setSelected] = useState(2) // Earth default
  const sectionRef = useRef(null)
  const planet = PLANETS[selected]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 20%',
        end: 'bottom 80%',
        toggleClass: { targets: section, className: 'in-view' },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden" style={{ background: '#030310' }}>
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white star-twinkle"
            style={{
              width: Math.random() * 2 + 0.5, height: Math.random() * 2 + 0.5,
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Sun glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #fff9c4 0%, #ff6b35 30%, transparent 70%)',
          filter: 'blur(30px)', opacity: 0.5,
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue text-xs font-mono text-[#4fc3f7] mb-5">
            ☀️ INTERACTIVE SOLAR EXPLORER
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3">
            Our{' '}
            <span className="text-gradient-orange">Solar System</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            Select any planet to explore. Click and watch it come alive.
          </p>
        </motion.div>

        {/* Planet selector row */}
        <div className="relative mb-16">
          {/* Orbital plane line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(79,195,247,0.15) 10%, rgba(79,195,247,0.15) 90%, transparent)' }}
          />
          <div className="flex items-center justify-center gap-8 overflow-x-auto pb-10 pt-4 px-4 scrollbar-hide">
            {PLANETS.map((p, i) => (
              <PlanetSphere
                key={p.name}
                planet={p}
                isSelected={selected === i}
                onClick={() => setSelected(i)}
              />
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={planet.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Left — main info */}
            <div className="rounded-3xl p-8"
              style={{
                background: `linear-gradient(135deg, ${planet.gradient[2]}22, rgba(5,5,20,0.95))`,
                border: `1px solid ${planet.color}33`,
                boxShadow: `0 0 60px ${planet.color}10`,
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{planet.symbol}</span>
                    <div>
                      <h3 className="text-4xl font-black text-white">{planet.name}</h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full"
                        style={{ background: `${planet.color}22`, color: planet.color }}
                      >
                        {planet.type}
                      </span>
                    </div>
                  </div>
                </div>
                {planet.hasLife && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(76,175,80,0.15)', color: '#4caf50', border: '1px solid rgba(76,175,80,0.3)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4caf50] animate-pulse" />
                    LIFE DETECTED
                  </div>
                )}
              </div>

              <p className="text-white/60 leading-relaxed mb-6 text-sm">{planet.desc}</p>

              <div className="p-4 rounded-2xl mb-6"
                style={{ background: `${planet.color}0d`, border: `1px solid ${planet.color}22` }}
              >
                <div className="text-xs font-mono text-white/40 mb-1">⚡ FUN FACT</div>
                <p className="text-sm text-white/80 italic">{planet.funFact}</p>
              </div>

              {/* Active missions */}
              <div>
                <div className="text-xs font-mono text-white/30 mb-3 tracking-widest">ACTIVE MISSIONS</div>
                <div className="flex flex-wrap gap-2">
                  {planet.missions.map(m => (
                    <span key={m} className="px-3 py-1 rounded-full text-xs font-mono glass border border-white/10 text-white/60">
                      🛸 {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Distance from Sun', value: planet.distance, icon: '📏' },
                { label: 'Natural Moons', value: planet.moons, icon: '🌙' },
                { label: 'Day Length', value: planet.day, icon: '⏱' },
                { label: 'Temperature', value: planet.temp, icon: '🌡' },
                { label: 'Mass', value: planet.mass, icon: '⚖️' },
                { label: 'Surface Gravity', value: planet.gravity, icon: '🌍' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-2xl p-4 hover:scale-105 transition-transform cursor-default"
                  style={{
                    background: `${planet.color}0a`,
                    border: `1px solid ${planet.color}22`,
                  }}
                >
                  <div className="text-xl mb-2">{stat.icon}</div>
                  <div className="text-xs text-white/30 font-mono mb-1">{stat.label}</div>
                  <div className="text-sm font-bold text-white leading-tight">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Planet nav arrows */}
        <div className="flex justify-center gap-4 mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(s => (s - 1 + PLANETS.length) % PLANETS.length)}
            className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#4fc3f7]/40 transition-all"
          >
            ←
          </motion.button>
          <div className="flex gap-2 items-center">
            {PLANETS.map((_, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: selected === i ? PLANETS[i].color : 'rgba(255,255,255,0.2)',
                  transform: selected === i ? 'scale(1.4)' : 'scale(1)',
                }}
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(s => (s + 1) % PLANETS.length)}
            className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#4fc3f7]/40 transition-all"
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  )
}
