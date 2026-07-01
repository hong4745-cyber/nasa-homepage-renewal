import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAPOD } from '../../hooks/useNASAData'
import { Clock, ArrowRight, TrendingUp, Bookmark } from 'lucide-react'

const sideNews = [
  { id: 1, category: 'MARS', time: '2 HRS', title: 'Perseverance Discovers Organic Compounds in Jezero Crater Sample', color: '#ef5350' },
  { id: 2, category: 'ARTEMIS', time: '5 HRS', title: 'Artemis IV Crew Training Reaches Final Phase at Johnson Space Center', color: '#4fc3f7' },
  { id: 3, category: 'WEBB', time: '8 HRS', title: 'James Webb Captures Clearest Image of Exoplanet Atmosphere', color: '#a78bfa' },
  { id: 4, category: 'ISS', time: '12 HRS', title: 'Astronauts Complete Record-Breaking 8-Hour Spacewalk for Module Repair', color: '#4caf50' },
  { id: 5, category: 'SOLAR', time: '1 DAY', title: 'Parker Solar Probe Transmits Data from Closest Sun Approach in History', color: '#ffb74d' },
  { id: 6, category: 'EUROPA', time: '2 DAYS', title: 'Europa Clipper Detects Water Vapor Plumes Erupting from Subsurface Ocean', color: '#4fc3f7' },
]

export default function NewsSection() {
  const { data: apod, loading } = useAPOD()
  const [bookmarked, setBookmarked] = useState(new Set())

  const toggleBookmark = (id) => {
    setBookmarked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ background: '#07070f' }}>
      {/* BG accent */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4fc3f7, transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#4fc3f7] mb-3">
              <TrendingUp size={12} />
              LATEST UPDATES
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white">
              Mission{' '}
              <span className="text-gradient">Dispatch</span>
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-sm text-white/40 hover:text-[#4fc3f7] transition-colors font-mono">
            All News <ArrowRight size={14} />
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured — APOD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 group"
          >
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[520px] cursor-pointer">
              {/* Image */}
              {!loading && apod?.url && apod.media_type === 'image' && (
                <img
                  src={apod.hdurl || apod.url}
                  alt={apod.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#4fc3f7] text-[#0a0a1a]">
                    ASTRONOMY PICTURE
                  </span>
                  <span className="text-xs font-mono text-white/50 flex items-center gap-1">
                    <Clock size={10} />
                    TODAY
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight group-hover:text-[#4fc3f7] transition-colors">
                  {loading ? 'Loading today\'s cosmic view...' : apod?.title}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xl line-clamp-3">
                  {apod?.explanation?.slice(0, 200)}{apod?.explanation?.length > 200 ? '...' : ''}
                </p>

                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-[#4fc3f7] font-semibold text-sm"
                  >
                    Read full story <ArrowRight size={14} />
                  </motion.button>
                  {apod?.copyright && (
                    <span className="text-xs text-white/30 font-mono">© {apod.copyright.trim()}</span>
                  )}
                </div>
              </div>

              {/* Loading skeleton */}
              {loading && (
                <div className="absolute inset-0 shimmer-bg" />
              )}
            </div>
          </motion.div>

          {/* Side news list */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {sideNews.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:bg-white/4"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                whileHover={{ borderColor: `${item.color}33`, x: 4 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold"
                        style={{ background: `${item.color}22`, color: item.color }}
                      >
                        {item.category}
                      </span>
                      <span className="text-[10px] text-white/30 font-mono flex items-center gap-1">
                        <Clock size={8} /> {item.time} AGO
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(item.id) }}
                    className="mt-1 flex-shrink-0 transition-colors"
                    style={{ color: bookmarked.has(item.id) ? item.color : 'rgba(255,255,255,0.2)' }}
                  >
                    <Bookmark size={14} fill={bookmarked.has(item.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                {/* Accent bar */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: item.color }}
                />
              </motion.article>
            ))}

            {/* View all */}
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/10 text-white/40 text-sm font-mono hover:text-white hover:border-white/20 transition-all mt-2"
            >
              View all news <ArrowRight size={12} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
