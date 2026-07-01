import { motion } from 'framer-motion'
import { useISS, useAsteroids } from '../../hooks/useNASAData'
import { Satellite, AlertTriangle, Radio, Users, MapPin, Gauge, ArrowUp } from 'lucide-react'

function ISSCard({ data, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative rounded-3xl overflow-hidden glass border border-[#4fc3f7]/20 p-6 hover:border-[#4fc3f7]/40 transition-all"
      style={{ boxShadow: '0 0 40px rgba(79,195,247,0.05)' }}
    >
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4fc3f7] to-transparent"
          style={{ animation: 'scan-line 4s linear infinite' }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#4fc3f7]/10 border border-[#4fc3f7]/20">
              <Satellite size={24} className="text-[#4fc3f7]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">ISS Location</h3>
              <p className="text-xs text-white/40 font-mono">International Space Station</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#4fc3f7]">
            <span className="w-2 h-2 rounded-full bg-[#4fc3f7] animate-pulse" />
            LIVE
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 rounded-xl shimmer-bg bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: MapPin, label: 'Latitude', value: `${data?.latitude}°`, color: '#4fc3f7' },
              { icon: MapPin, label: 'Longitude', value: `${data?.longitude}°`, color: '#4fc3f7' },
              { icon: ArrowUp, label: 'Altitude', value: `${data?.altitude} km`, color: '#ff6b35' },
              { icon: Gauge, label: 'Velocity', value: `${Number(data?.velocity || 0).toLocaleString()} km/h`, color: '#7c3aed' },
            ].map(item => (
              <div
                key={item.label}
                className="rounded-2xl p-4"
                style={{ background: `${item.color}0d`, border: `1px solid ${item.color}22` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <item.icon size={14} style={{ color: item.color }} />
                  <span className="text-xs text-white/40 font-mono">{item.label}</span>
                </div>
                <div className="text-xl font-black" style={{ color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
          <Users size={16} className="text-white/40" />
          <span className="text-sm text-white/50">7 crew members currently aboard</span>
          <div className="flex gap-1 ml-auto">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#7c3aed] flex items-center justify-center text-[10px] font-bold text-white">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/30 mt-3 font-mono">Updates every 5 seconds</p>
      </div>
    </motion.div>
  )
}

function AsteroidCard({ data, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative rounded-3xl overflow-hidden glass border border-[#ff6b35]/20 p-6 hover:border-[#ff6b35]/40 transition-all"
      style={{ boxShadow: '0 0 40px rgba(255,107,53,0.05)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#ff6b35]/10 border border-[#ff6b35]/20">
            <AlertTriangle size={24} className="text-[#ff6b35]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Near-Earth Objects</h3>
            <p className="text-xs text-white/40 font-mono">Today&apos;s asteroid approach</p>
          </div>
        </div>
        <div className="text-2xl font-black text-[#ff6b35]">
          {loading ? '--' : data?.count}
          <span className="text-sm text-white/40 font-normal ml-1">today</span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl shimmer-bg bg-white/5" />
          ))}
        </div>
      ) : data?.objects?.length > 0 ? (
        <div className="space-y-3">
          {data.objects.map((obj, i) => {
            const isHazardous = obj.is_potentially_hazardous_asteroid
            const dist = parseFloat(obj.close_approach_data?.[0]?.miss_distance?.kilometers || 0)
            const distM = (dist / 1000000).toFixed(2)
            const diameter = (
              (parseFloat(obj.estimated_diameter?.kilometers?.estimated_diameter_min) +
               parseFloat(obj.estimated_diameter?.kilometers?.estimated_diameter_max)) / 2 * 1000
            ).toFixed(0)

            return (
              <motion.div
                key={obj.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl p-4 flex items-center justify-between transition-colors"
                style={{
                  background: isHazardous ? 'rgba(252,61,33,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHazardous ? 'rgba(252,61,33,0.2)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white truncate max-w-[140px]">
                      {obj.name.replace(/[()]/g, '')}
                    </span>
                    {isHazardous && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#fc3d21]/20 text-[#fc3d21] border border-[#fc3d21]/30">
                        PHO
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/40 font-mono mt-1">
                    ~{diameter}m diameter
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#ff6b35]">{distM}M km</div>
                  <div className="text-xs text-white/30 font-mono">miss dist.</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-white/40 text-sm">
          No significant objects detected today
        </div>
      )}
    </motion.div>
  )
}

function RadioCard() {
  const signals = [
    { name: 'Voyager 1', strength: 92, freq: '8.4 GHz', dist: '23.5B km' },
    { name: 'New Horizons', strength: 78, freq: '8.4 GHz', dist: '8.1B km' },
    { name: 'Curiosity Rover', strength: 65, freq: '401 MHz', dist: '225M km' },
    { name: 'Perseverance', strength: 71, freq: '401 MHz', dist: '225M km' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl glass border border-[#7c3aed]/20 p-6 hover:border-[#7c3aed]/40 transition-all col-span-1 md:col-span-2"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-[#7c3aed]/10 border border-[#7c3aed]/20">
          <Radio size={24} className="text-[#7c3aed]" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">Deep Space Network</h3>
          <p className="text-xs text-white/40 font-mono">Active spacecraft communications</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs font-mono text-[#7c3aed]">
          <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
          TRACKING
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {signals.map((sig, i) => (
          <motion.div
            key={sig.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-2xl bg-white/3 border border-white/8 hover:bg-[#7c3aed]/5 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-bold text-white">{sig.name}</span>
              <span className="text-xs font-mono text-white/40">{sig.freq}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-white/40 font-mono">
                <span>Signal Strength</span>
                <span className="text-[#7c3aed]">{sig.strength}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${sig.strength}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2 + i * 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#4fc3f7]"
                />
              </div>
              <div className="text-xs text-white/30 font-mono">Distance: {sig.dist}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function LiveData() {
  const { data: issData, loading: issLoading } = useISS()
  const { data: asteroidData, loading: asteroidLoading } = useAsteroids()

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue text-xs font-mono text-[#4fc3f7] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4fc3f7] animate-pulse" />
            LIVE SPACE DATA
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Real-Time{' '}
            <span className="text-gradient">Mission Control</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Live data from NASA&apos;s active missions and monitoring systems, updated in real-time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <ISSCard data={issData} loading={issLoading} />
          <AsteroidCard data={asteroidData} loading={asteroidLoading} />
        </div>
        <RadioCard />
      </div>
    </section>
  )
}
