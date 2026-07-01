import { motion } from 'framer-motion'
import { useAPOD } from '../../hooks/useNASAData'
import { Camera, Calendar, ExternalLink, Loader2, Star } from 'lucide-react'

function APODSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="aspect-square rounded-3xl shimmer-bg bg-white/5" />
      <div className="space-y-4">
        <div className="h-4 w-32 rounded shimmer-bg bg-white/5" />
        <div className="h-10 w-4/5 rounded shimmer-bg bg-white/5" />
        <div className="h-4 w-full rounded shimmer-bg bg-white/5" />
        <div className="h-4 w-5/6 rounded shimmer-bg bg-white/5" />
        <div className="h-4 w-4/6 rounded shimmer-bg bg-white/5" />
      </div>
    </div>
  )
}

export default function APOD() {
  const { data, loading, error } = useAPOD()

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue text-xs font-mono text-[#4fc3f7] mb-6">
            <Camera size={12} />
            ASTRONOMY PICTURE OF THE DAY
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Today&apos;s{' '}
            <span className="text-gradient">Cosmic View</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Each day, NASA shares a photograph or image of our fascinating universe, accompanied by a brief explanation from a professional astronomer.
          </p>
        </motion.div>

        {loading && <APODSkeleton />}
        {error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌌</div>
            <p className="text-white/50">Unable to load today's image. The cosmos is temporarily unreachable.</p>
          </div>
        )}

        {data && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#4fc3f7] to-[#7c3aed] opacity-30 blur-xl group-hover:opacity-50 transition-opacity" />
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10">
                {data.media_type === 'video' ? (
                  <iframe
                    src={data.url}
                    title={data.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={data.hdurl || data.url}
                      alt={data.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={data.hdurl || data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur text-white text-xs hover:bg-black/80 transition-colors"
                      >
                        <ExternalLink size={12} />
                        HD View
                      </a>
                    </div>
                  </>
                )}
              </div>

              {/* Copyright */}
              {data.copyright && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs text-white/50">
                  © {data.copyright.trim()}
                </div>
              )}
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Date badge */}
              <div className="flex items-center gap-2 text-sm text-[#4fc3f7] font-mono">
                <Calendar size={14} />
                {new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>

              <h3 className="text-4xl font-black text-white leading-tight">
                {data.title}
              </h3>

              <p className="text-white/60 leading-relaxed text-base">
                {data.explanation?.slice(0, 400)}{data.explanation?.length > 400 ? '...' : ''}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['Astrophotography', 'Deep Sky', 'Space', 'Cosmos'].map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono glass-blue text-[#4fc3f7]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={data.hdurl || data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#7c3aed] text-white font-semibold text-sm"
                >
                  <Star size={14} />
                  View Full Resolution
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="px-6 py-3 rounded-full glass border border-white/20 text-white text-sm font-semibold hover:border-[#4fc3f7]/40 transition-colors"
                >
                  Archive
                </motion.button>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                {[
                  { label: 'Media Type', value: data.media_type === 'video' ? 'Video' : 'Image' },
                  { label: 'Published', value: 'NASA APOD' },
                  { label: 'Resolution', value: 'HD Available' },
                ].map(item => (
                  <div key={item.label} className="text-center p-3 rounded-xl glass">
                    <div className="text-xs text-white/40 font-mono">{item.label}</div>
                    <div className="text-sm font-semibold text-white mt-1">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
