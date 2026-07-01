import { motion } from 'framer-motion'
import { useMarsPhotos } from '../../hooks/useNASAData'
import { Camera, MapPin } from 'lucide-react'

export default function MarsGallery() {
  const { data, loading } = useMarsPhotos()

  if (loading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl shimmer-bg bg-white/5" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!data || data.length === 0) return null

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-6"
            style={{ background: 'rgba(193,68,14,0.15)', border: '1px solid rgba(193,68,14,0.3)', color: '#ff6b35' }}
          >
            <Camera size={12} />
            LIVE FROM MARS
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Through{' '}
            <span className="text-gradient-orange">Perseverance&apos;s Eyes</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Latest photographs from the Martian surface, captured by NASA&apos;s Perseverance rover in Jezero Crater.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[#ff6b35] font-mono">
            <MapPin size={14} />
            Jezero Crater, Mars
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
              style={{ border: '1px solid rgba(193,68,14,0.2)' }}
            >
              <img
                src={photo.img_src}
                alt={`Mars - ${photo.camera?.full_name}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-xs font-mono text-[#ff6b35] mb-1">{photo.camera?.name}</div>
                <div className="text-sm font-semibold text-white">{photo.earth_date}</div>
                <div className="text-xs text-white/60">Sol {photo.sol}</div>
              </div>
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(193,68,14,0.8)', color: '#ffb74d' }}
              >
                {photo.rover?.name}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button
            className="px-8 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{
              border: '1px solid rgba(193,68,14,0.4)',
              color: '#ff6b35',
            }}
          >
            View Full Mars Photo Gallery →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
