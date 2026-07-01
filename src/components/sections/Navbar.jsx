import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, ChevronDown } from 'lucide-react'

const navLinks = [
  {
    label: 'Missions',
    sub: ['Artemis', 'Mars Exploration', 'James Webb', 'Voyager', 'Europa Clipper']
  },
  {
    label: 'Science',
    sub: ['Astrophysics', 'Heliophysics', 'Planetary Science', 'Earth Science']
  },
  {
    label: 'Technology',
    sub: ['Propulsion', 'AI & Robotics', 'Space Medicine', 'Communications']
  },
  {
    label: 'News & Media',
    sub: ['Latest News', 'Image Gallery', 'Videos', 'APOD', 'Press Kit']
  },
  { label: 'About', sub: ['History', 'Leadership', 'Centers', 'Budget', 'Careers'] },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a1a]/90 backdrop-blur-xl border-b border-[#4fc3f7]/20 shadow-[0_4px_30px_rgba(79,195,247,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.03 }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#7c3aed] flex items-center justify-center text-lg font-black shadow-[0_0_20px_rgba(79,195,247,0.5)]">
              N
            </div>
            <div className="absolute inset-0 rounded-full border border-[#4fc3f7]/50 animate-ping" />
          </div>
          <div>
            <div className="text-xl font-black tracking-widest text-white">NASA</div>
            <div className="text-[9px] tracking-[0.4em] text-[#4fc3f7] font-mono uppercase">
              Space Agency
            </div>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(link.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 group">
                {link.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${activeMenu === link.label ? 'rotate-180 text-[#4fc3f7]' : 'text-white/40'}`}
                />
              </button>

              <AnimatePresence>
                {activeMenu === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-48 glass rounded-xl overflow-hidden shadow-2xl"
                    style={{ border: '1px solid rgba(79,195,247,0.2)' }}
                  >
                    {link.sub.map((item, i) => (
                      <motion.a
                        key={item}
                        href="#"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-[#4fc3f7]/10 transition-all duration-150 hover:pl-6 border-b border-white/5 last:border-0"
                      >
                        {item}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all"
          >
            <Search size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#7c3aed] text-white text-sm font-semibold shadow-[0_0_20px_rgba(79,195,247,0.3)] hover:shadow-[0_0_30px_rgba(79,195,247,0.5)] transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Live Mission
          </motion.button>

          <button
            className="lg:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[#4fc3f7]/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-3">
              <input
                autoFocus
                placeholder="Search missions, news, images..."
                className="w-full bg-transparent text-white placeholder-white/30 outline-none text-sm font-mono"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10 overflow-hidden"
          >
            {navLinks.map(link => (
              <div key={link.label} className="border-b border-white/5 last:border-0">
                <button className="w-full text-left px-6 py-4 text-white/90 font-medium text-sm hover:text-[#4fc3f7] transition-colors">
                  {link.label}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
