import { motion } from 'framer-motion'
import NumberTicker from '../ui/NumberTicker'
import { stats } from '../../data/missions'

export default function StatsSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, transparent, rgba(79,195,247,0.03) 50%, transparent)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="section-divider mb-16" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl group hover:bg-[#4fc3f7]/5 transition-all border border-transparent hover:border-[#4fc3f7]/10"
            >
              <div className="text-5xl md:text-6xl font-black text-gradient mb-2">
                <NumberTicker value={stat.value} suffix={stat.suffix} duration={2000} />
              </div>
              <div className="text-sm text-white/40 uppercase tracking-[0.2em] font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="section-divider mt-16" />
      </div>
    </section>
  )
}
