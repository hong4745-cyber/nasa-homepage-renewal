import { useState } from 'react'
import { motion } from 'framer-motion'
import { technologies } from '../../data/missions'
import { Cpu, Zap } from 'lucide-react'

export default function Technology() {
  const [hovered, setHovered] = useState(null)

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10"
          style={{ background: 'radial-gradient(circle, #4fc3f7, transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-8"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
        />
        {/* Circuit lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M0 40 H30 M50 40 H80 M40 0 V30 M40 50 V80" stroke="#4fc3f7" strokeWidth="0.5" fill="none" />
              <circle cx="40" cy="40" r="3" fill="none" stroke="#4fc3f7" strokeWidth="0.5" />
              <rect x="28" y="28" width="24" height="24" fill="none" stroke="#4fc3f7" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue text-xs font-mono text-[#4fc3f7] mb-6">
            <Cpu size={12} />
            INNOVATION HUB
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Technology That{' '}
            <span className="text-gradient">Changes Everything</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            NASA&apos;s R&D drives breakthroughs that transform industries here on Earth.
          </p>
        </motion.div>

        {/* Tech Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              onHoverStart={() => setHovered(tech.title)}
              onHoverEnd={() => setHovered(null)}
              className="relative group rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300"
              style={{
                background: hovered === tech.title ? `${tech.color}0d` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${hovered === tech.title ? tech.color + '44' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: hovered === tech.title ? `0 20px 60px ${tech.color}15` : 'none',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${tech.color}08, transparent 60%)` }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${tech.color}15`,
                  border: `1px solid ${tech.color}33`,
                }}
              >
                {tech.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                {tech.title}
              </h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">
                {tech.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tech.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold"
                    style={{
                      background: `${tech.color}15`,
                      color: tech.color,
                      border: `1px solid ${tech.color}30`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
                style={{ background: `linear-gradient(90deg, ${tech.color}, transparent)` }}
                initial={{ width: 0 }}
                animate={{ width: hovered === tech.title ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(79,195,247,0.05), rgba(124,58,237,0.05))',
              border: '1px solid rgba(79,195,247,0.15)',
            }}
          >
            <div className="text-left">
              <div className="text-xl font-black text-white">Spinoff Technologies</div>
              <div className="text-sm text-white/50">NASA innovations now available to the public</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#7c3aed] text-white font-bold text-sm whitespace-nowrap"
            >
              <Zap size={14} />
              Explore 2000+ Technologies
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
