import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const planets = [
  {
    name: 'Mercury', color: '#b5b5b5', size: 18, orbit: 110, speed: 8,
    desc: 'Smallest planet, closest to the Sun. Extreme temperature variations.',
    distance: '77M km', moons: 0, day: '59 Earth days', temp: '-180°C to 430°C',
    gradient: 'from-gray-400 to-gray-600',
  },
  {
    name: 'Venus', color: '#e8c57b', size: 28, orbit: 160, speed: 12,
    desc: 'Hottest planet with a thick toxic atmosphere of CO₂ and sulfuric acid clouds.',
    distance: '261M km', moons: 0, day: '243 Earth days', temp: '465°C',
    gradient: 'from-yellow-300 to-orange-500',
  },
  {
    name: 'Earth', color: '#4fc3f7', size: 30, orbit: 215, speed: 16,
    desc: 'Our home — the only known planet to harbor life, with liquid water oceans.',
    distance: '150M km', moons: 1, day: '24 hours', temp: '-88°C to 58°C',
    gradient: 'from-blue-400 to-green-500',
  },
  {
    name: 'Mars', color: '#c1440e', size: 22, orbit: 275, speed: 20,
    desc: 'The Red Planet. Currently home to Perseverance rover exploring ancient riverbeds.',
    distance: '225M km', moons: 2, day: '24.6 hours', temp: '-125°C to 20°C',
    gradient: 'from-red-600 to-orange-600',
  },
  {
    name: 'Jupiter', color: '#c88b3a', size: 65, orbit: 350, speed: 28,
    desc: 'Largest planet, a gas giant with the Great Red Spot storm and 95 known moons.',
    distance: '778M km', moons: 95, day: '9.9 hours', temp: '-110°C',
    gradient: 'from-yellow-600 to-orange-700',
  },
  {
    name: 'Saturn', color: '#e4d191', size: 55, orbit: 440, speed: 36,
    desc: 'Famous for its stunning ring system — 7 rings made of ice and rock particles.',
    distance: '1.43B km', moons: 146, day: '10.7 hours', temp: '-140°C',
    gradient: 'from-yellow-200 to-yellow-500',
  },
  {
    name: 'Uranus', color: '#7de8e8', size: 42, orbit: 525, speed: 44,
    desc: 'Ice giant tilted on its side, rotating nearly perpendicular to its orbit.',
    distance: '2.88B km', moons: 28, day: '17.2 hours', temp: '-195°C',
    gradient: 'from-cyan-300 to-teal-500',
  },
  {
    name: 'Neptune', color: '#3f54ba', size: 40, orbit: 605, speed: 52,
    desc: 'Farthest planet with the fastest winds in the solar system — 2,100 km/h.',
    distance: '4.5B km', moons: 16, day: '16.1 hours', temp: '-200°C',
    gradient: 'from-blue-600 to-indigo-700',
  },
]

function PlanetInfo({ planet, onClose }) {
  if (!planet) return null
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="absolute z-20 glass rounded-2xl p-6 w-72 pointer-events-auto"
      style={{
        border: `1px solid ${planet.color}44`,
        boxShadow: `0 0 40px ${planet.color}22`,
        top: '50%',
        right: '5%',
        transform: 'translateY(-50%)',
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white/40 hover:text-white text-lg leading-none"
      >×</button>

      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${planet.color}ee, ${planet.color}44)`,
            boxShadow: `0 0 20px ${planet.color}55`,
          }}
        />
        <div>
          <h3 className="text-xl font-black text-white">{planet.name}</h3>
          <div className="text-xs text-white/40 font-mono">Solar System</div>
        </div>
      </div>

      <p className="text-sm text-white/60 mb-5 leading-relaxed">{planet.desc}</p>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Distance', value: planet.distance },
          { label: 'Moons', value: planet.moons },
          { label: 'Day Length', value: planet.day },
          { label: 'Temperature', value: planet.temp },
        ].map(item => (
          <div key={item.label} className="rounded-xl p-3" style={{ background: `${planet.color}11` }}>
            <div className="text-xs text-white/40 font-mono">{item.label}</div>
            <div className="text-sm font-bold text-white mt-0.5">{item.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function SolarSystem() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue text-xs font-mono text-[#4fc3f7] mb-6">
            ☀️ INTERACTIVE SOLAR SYSTEM
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Our{' '}
            <span className="text-gradient-orange">Solar System</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Click any planet to explore its secrets. Eight worlds, billions of mysteries.
          </p>
        </motion.div>

        {/* Solar System Visualization */}
        <div className="relative overflow-x-auto">
          <div
            className="relative mx-auto"
            style={{ height: 700, minWidth: 700, maxWidth: 1200 }}
          >
            {/* Stars background */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{
              background: 'radial-gradient(ellipse at center, #0d0d2b 0%, #0a0a1a 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              {[...Array(60)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white star-twinkle"
                  style={{
                    width: Math.random() * 2 + 1,
                    height: Math.random() * 2 + 1,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    opacity: Math.random() * 0.7 + 0.2,
                  }}
                />
              ))}
            </div>

            {/* Sun */}
            <div
              className="absolute rounded-full cursor-pointer"
              style={{
                width: 80, height: 80,
                top: '50%', left: 80,
                transform: 'translateY(-50%)',
                background: 'radial-gradient(circle at 30% 30%, #fff9c4, #ff6b35, #ff3500)',
                boxShadow: '0 0 60px #ff6b3588, 0 0 120px #ff6b3533',
              }}
              onClick={() => setSelected({ name: 'Sun', color: '#ff6b35', desc: 'Our star, a G-type main-sequence star. Contains 99.86% of the solar system\'s mass.', distance: '0 km', moons: 8, day: '25 Earth days', temp: '5,500°C surface, 15M°C core' })}
            >
              <div className="absolute inset-0 rounded-full animate-pulse" style={{ boxShadow: '0 0 80px #ff6b3544' }} />
            </div>

            {/* Orbit rings + planets */}
            {planets.map((planet) => (
              <div key={planet.name}>
                {/* Orbit Ring */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: planet.orbit * 2,
                    height: planet.orbit * 1.1,
                    top: '50%',
                    left: 80 + 40,
                    transform: 'translate(0, -50%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '50%',
                  }}
                />

                {/* Planet orbiting */}
                <div
                  className="absolute"
                  style={{
                    width: planet.orbit * 2,
                    height: planet.orbit * 1.1,
                    top: '50%',
                    left: 80 + 40,
                    transform: 'translate(0, -50%)',
                    animation: `rotate-slow ${planet.speed}s linear infinite`,
                  }}
                >
                  <div
                    className="absolute cursor-pointer transition-all duration-200 hover:scale-125"
                    style={{
                      width: planet.size,
                      height: planet.size,
                      top: 0,
                      left: '50%',
                      marginLeft: -planet.size / 2,
                      marginTop: -planet.size / 2,
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 35% 35%, ${planet.color}ee, ${planet.color}44)`,
                      boxShadow: `0 0 ${planet.size}px ${planet.color}66`,
                    }}
                    onClick={() => setSelected(planet)}
                    title={planet.name}
                  >
                    {/* Saturn rings */}
                    {planet.name === 'Saturn' && (
                      <div
                        className="absolute"
                        style={{
                          width: planet.size * 2.2,
                          height: planet.size * 0.4,
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%) rotateX(75deg)',
                          border: `2px solid ${planet.color}88`,
                          borderRadius: '50%',
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                    {/* Moon for Earth */}
                    {planet.name === 'Earth' && (
                      <div
                        className="absolute"
                        style={{
                          width: 8, height: 8,
                          borderRadius: '50%',
                          background: '#ccc',
                          top: -10, left: '50%',
                          animation: 'rotate-slow 3s linear infinite',
                          transformOrigin: `0 ${planet.size}px`,
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Planet label */}
                <div
                  className="absolute text-[10px] font-mono text-white/40 pointer-events-none"
                  style={{
                    left: 80 + 40 + planet.orbit + planet.size / 2 + 4,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  {planet.name}
                </div>
              </div>
            ))}

            {/* Planet Info Panel */}
            <AnimatePresence>
              {selected && <PlanetInfo planet={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
          </div>
        </div>

        {/* Planet Quick Select */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {planets.map(planet => (
            <motion.button
              key={planet.name}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(planet)}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-mono hover:border-opacity-60 transition-all"
              style={{
                border: `1px solid ${planet.color}33`,
                color: selected?.name === planet.name ? planet.color : 'rgba(255,255,255,0.5)',
                background: selected?.name === planet.name ? `${planet.color}11` : 'transparent',
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: planet.color, boxShadow: `0 0 6px ${planet.color}` }}
              />
              {planet.name}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
