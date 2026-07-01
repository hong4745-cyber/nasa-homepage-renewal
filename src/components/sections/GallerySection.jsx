import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMarsPhotos } from '../../hooks/useNASAData'
import { X, ZoomIn, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react'

const EXTRA_IMAGES = [
  { id: 'e1', img_src: 'https://images-assets.nasa.gov/image/art001e000160/art001e000160~orig.jpg', camera: { name: 'ARTEMIS' }, earth_date: '2024-01-01', rover: { name: 'Artemis IV' }, sol: '-' },
  { id: 'e2', img_src: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000393/GSFC_20171208_Archive_e000393~orig.jpg', camera: { name: 'JWST' }, earth_date: '2024-01-01', rover: { name: 'Webb' }, sol: '-' },
  { id: 'e3', img_src: 'https://images-assets.nasa.gov/image/PIA19048/PIA19048~orig.jpg', camera: { name: 'Europa' }, earth_date: '2024-01-01', rover: { name: 'Clipper' }, sol: '-' },
]

const BENTO_SPANS = [
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
]

function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index]
  if (!photo) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 28 }}
        className="relative z-10 max-w-5xl w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="text-xs font-mono text-white/40">
            {index + 1} / {photos.length} — {photo.rover?.name || 'NASA'}
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full glass text-white/60 hover:text-white transition-colors">
              <Share2 size={16} />
            </button>
            <a href={photo.img_src} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-full glass text-white/60 hover:text-white transition-colors">
              <Download size={16} />
            </a>
            <button onClick={onClose} className="p-2 rounded-full glass text-white/60 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Main image */}
        <div className="relative rounded-2xl overflow-hidden"
          style={{ aspectRatio: '16/9' }}>
          <img
            src={photo.img_src}
            alt={`${photo.rover?.name} - ${photo.camera?.name}`}
            className="w-full h-full object-cover"
          />
          {/* Nav arrows */}
          <button
            onClick={e => { e.stopPropagation(); onPrev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onNext() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Caption */}
        <div className="mt-4 px-2 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">{photo.camera?.full_name || photo.camera?.name}</div>
            <div className="text-xs text-white/40 font-mono">{photo.earth_date} · Sol {photo.sol}</div>
          </div>
          <div className="flex gap-2">
            {['RAW', 'NASA', 'SPACE'].map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] font-mono glass text-white/40">{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function GallerySection() {
  const { data: marsPhotos, loading } = useMarsPhotos()
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const allPhotos = [...(marsPhotos || []), ...EXTRA_IMAGES]

  const skeletonItems = BENTO_SPANS.slice(0, 9)

  return (
    <section className="relative py-24 px-6" style={{ background: '#050510' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff6b35] mb-3">
              📷 LIVE SPACE IMAGERY
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white">
              Cosmic{' '}
              <span className="text-gradient-orange">Gallery</span>
            </h2>
            <p className="text-white/40 mt-2 max-w-md">Real photographs from Mars, deep space, and Earth orbit.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] animate-pulse" />
            {allPhotos.length} IMAGES LOADED
          </div>
        </motion.div>

        {/* Bento grid */}
        {loading ? (
          <div className="grid grid-cols-4 grid-rows-3 gap-3 h-[600px]">
            {skeletonItems.map((span, i) => (
              <div key={i} className="shimmer-bg rounded-2xl bg-white/5"
                style={{ gridColumn: `span ${span.colSpan}`, gridRow: `span ${span.rowSpan}` }}
              />
            ))}
          </div>
        ) : (
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridAutoRows: '180px',
            }}
          >
            {allPhotos.slice(0, 9).map((photo, i) => {
              const span = BENTO_SPANS[i] || { colSpan: 1, rowSpan: 1 }
              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    gridColumn: `span ${span.colSpan}`,
                    gridRow: `span ${span.rowSpan}`,
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onClick={() => setLightboxIdx(i)}
                  whileHover={{ scale: 1.02, zIndex: 5 }}
                >
                  <img
                    src={photo.img_src}
                    alt={`${photo.rover?.name} - ${photo.camera?.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={e => {
                      e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%230a0a1a" width="400" height="300"/><text fill="%23333" x="50%" y="50%" text-anchor="middle" font-size="40">🌌</text></svg>`
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-3 rounded-full bg-white/10 backdrop-blur">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                  </div>
                  {/* Info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-xs font-mono text-[#ff6b35] mb-0.5">{photo.camera?.name}</div>
                    <div className="text-xs text-white/60">{photo.earth_date}</div>
                  </div>
                  {/* Index badge */}
                  {i === 0 && (
                    <div className="absolute top-4 left-4 px-2 py-1 rounded-full text-[9px] font-mono font-bold bg-[#ff6b35] text-white">
                      FEATURED
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button className="px-8 py-3 rounded-full border border-[#ff6b35]/30 text-[#ff6b35] text-sm font-semibold hover:bg-[#ff6b35]/10 transition-all">
            Explore Full Gallery →
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            photos={allPhotos.slice(0, 9)}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx(i => (i - 1 + allPhotos.slice(0, 9).length) % allPhotos.slice(0, 9).length)}
            onNext={() => setLightboxIdx(i => (i + 1) % allPhotos.slice(0, 9).length)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
