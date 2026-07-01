import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import './index.css'

import LoadingScreen from './components/LoadingScreen'
import StarField from './components/effects/StarField'
import Navbar from './components/sections/Navbar'
import HeroEarth from './components/sections/HeroEarth'
import OrbitalTimeline from './components/sections/OrbitalTimeline'
import SolarExplorer from './components/sections/SolarExplorer'
import NewsSection from './components/sections/NewsSection'
import ExploreSection from './components/sections/ExploreSection'
import GallerySection from './components/sections/GallerySection'
import Footer from './components/sections/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#030310] overflow-x-hidden">
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <>
          <StarField count={220} />
          <Navbar />
          <main>
            <HeroEarth />
            <OrbitalTimeline />
            <SolarExplorer />
            <NewsSection />
            <ExploreSection />
            <GallerySection />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
