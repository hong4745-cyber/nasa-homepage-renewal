import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { missions } from '../../data/missions'
import { ArrowRight, Zap, Target, Calendar, X } from 'lucide-react'

function MissionCard({ mission, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onClick={() => onClick(mission)}
      className="relative group cursor-pointer rounded-2xl overflow-hidden glass border border-white/10 hover:border-[#4fc3f7]/40 transition-all duration-300"
      style={{ boxShadow: 'none' }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(79,195,247,0.15)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Background Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={mission.image}
          alt={mission.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={e => {
            e.target.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a1a]" />
        <div className={`absolute inset-0 bg-gradient-to-br ${mission.color} opacity-20`} />

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold backdrop-blur-sm"
            style={{
              background: `${mission.statusColor}22`,
              border: `1px solid ${mission.statusColor}55`,
              color: mission.statusColor,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: mission.statusColor }} />
            {mission.status}
          </div>
        </div>

        {/* Icon */}
        <div className="absolute bottom-4 left-4 text-4xl">{mission.icon}</div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#4fc3f7] transition-colors">
          {mission.name}
        </h3>
        <p className="text-sm text-white/50 mb-4 line-clamp-2 leading-relaxed">
          {mission.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-white/40 mb-4 font-mono">
          <span className="flex items-center gap-1"><Calendar size={10} /> {mission.launch}</span>
          <span className="flex items-center gap-1"><Target size={10} /> {mission.target}</span>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-white/40 font-mono">
            <span>Mission Progress</span>
            <span style={{ color: mission.statusColor }}>{mission.progress}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${mission.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              className={`h-full rounded-full bg-gradient-to-r ${mission.color}`}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-semibold group-hover:gap-3 transition-all"
          style={{ color: mission.statusColor }}
        >
          View Details <ArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  )
}

function MissionModal({ mission, onClose }) {
  if (!mission) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#0a0a1a]/80 backdrop-blur-xl" />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden glass"
        style={{ border: `1px solid ${mission.statusColor}33` }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-64">
          <img src={mission.image} alt={mission.name} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#0a0a1a]" />
          <div className={`absolute inset-0 bg-gradient-to-br ${mission.color} opacity-30`} />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
          <div className="absolute bottom-6 left-6">
            <div className="text-5xl mb-2">{mission.icon}</div>
            <h2 className="text-3xl font-black text-white">{mission.name}</h2>
          </div>
        </div>

        <div className="p-8">
          <p className="text-white/70 mb-8 leading-relaxed">{mission.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {mission.details.map((detail, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                <Zap size={14} style={{ color: mission.statusColor }} />
                {detail}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-mono text-white/50">
              <span>Mission Progress</span>
              <span style={{ color: mission.statusColor }}>{mission.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${mission.progress}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className={`h-full rounded-full bg-gradient-to-r ${mission.color}`}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Missions() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue text-xs font-mono text-[#4fc3f7] mb-6">
            <Zap size={12} />
            ACTIVE & UPCOMING MISSIONS
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Humanity&apos;s{' '}
            <span className="text-gradient">Greatest Journey</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            From the lunar surface to the edge of the solar system — every mission pushes our understanding further.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map(mission => (
            <MissionCard key={mission.id} mission={mission} onClick={setSelected} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 rounded-full border border-[#4fc3f7]/30 text-[#4fc3f7] text-sm font-semibold hover:bg-[#4fc3f7]/10 transition-all hover:border-[#4fc3f7]/60">
            View All 62+ Missions →
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <MissionModal mission={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
