import { motion } from 'framer-motion'
import { GitBranch, MessageSquare, PlayCircle, Aperture, ArrowUp, Mail, Globe } from 'lucide-react'

const footerLinks = {
  Missions: ['Artemis', 'Mars Exploration', 'James Webb', 'Europa Clipper', 'Voyager'],
  Science: ['Earth', 'Solar System', 'Stars & Galaxies', 'Universe', 'Solar Science'],
  Media: ['Image Gallery', 'Video', 'Podcasts', 'APOD', 'Press Kit'],
  About: ['History', 'Centers', 'Leadership', 'Budget', 'Careers'],
}

const socials = [
  { icon: MessageSquare, label: 'Twitter/X', color: '#1DA1F2' },
  { icon: Aperture, label: 'Instagram', color: '#E1306C' },
  { icon: PlayCircle, label: 'YouTube', color: '#FF0000' },
  { icon: GitBranch, label: 'GitHub', color: '#aaaaaa' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative pt-24 pb-8 px-6 overflow-hidden">
      {/* Top divider */}
      <div className="section-divider mb-16" />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white star-twinkle"
            style={{
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top section */}
        <div className="grid lg:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#7c3aed] flex items-center justify-center text-xl font-black text-white shadow-[0_0_30px_rgba(79,195,247,0.4)]">
                N
              </div>
              <div>
                <div className="text-2xl font-black tracking-widest text-white">NASA</div>
                <div className="text-xs tracking-[0.4em] text-[#4fc3f7] font-mono">
                  National Aeronautics & Space Administration
                </div>
              </div>
            </motion.div>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              For more than six decades, NASA has been reaching for new heights and revealing the unknown for the benefit of humankind.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(social => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center transition-all hover:border-opacity-60"
                  style={{ border: `1px solid ${social.color}30` }}
                  aria-label={social.label}
                >
                  <social.icon size={15} style={{ color: social.color }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h4 className="text-white font-bold text-sm uppercase tracking-[0.15em] mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 text-sm hover:text-[#4fc3f7] transition-colors hover:pl-2 block transition-all duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(79,195,247,0.06), rgba(124,58,237,0.06))',
            border: '1px solid rgba(79,195,247,0.15)',
          }}
        >
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-[#4fc3f7]" />
            <div>
              <div className="font-bold text-white text-sm">Stay Connected to the Cosmos</div>
              <div className="text-xs text-white/40">Get mission updates and the latest discoveries</div>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto sm:ml-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 sm:w-64 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-[#4fc3f7]/40 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#7c3aed] text-white text-sm font-bold whitespace-nowrap"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <div className="text-white/30 text-xs font-mono">
            © 2026 NASA. This is a concept redesign — not an official NASA website.
          </div>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors flex items-center gap-1">
              <Globe size={12} />
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white/60 transition-colors">FOIA</a>
          </div>
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full glass-blue border border-[#4fc3f7]/20 text-[#4fc3f7] hover:border-[#4fc3f7]/50 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
