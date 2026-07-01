export const missions = [
  {
    id: 1,
    name: 'Artemis Program',
    status: 'ACTIVE',
    statusColor: '#4fc3f7',
    description: 'Returning humans to the Moon and establishing a sustainable lunar presence as a gateway to Mars.',
    launch: '2025',
    target: 'Moon',
    icon: '🌙',
    progress: 68,
    color: 'from-blue-600 to-cyan-400',
    details: ['Orion spacecraft', 'SLS rocket', 'Gateway lunar station', 'Artemis Base Camp'],
    image: 'https://images-assets.nasa.gov/image/art001e000160/art001e000160~orig.jpg'
  },
  {
    id: 2,
    name: 'Mars 2020 (Perseverance)',
    status: 'ONGOING',
    statusColor: '#ff6b35',
    description: 'Seeking signs of ancient microbial life, collecting samples for future return to Earth.',
    launch: '2020',
    target: 'Mars',
    icon: '🔴',
    progress: 85,
    color: 'from-red-600 to-orange-400',
    details: ['Jezero Crater exploration', 'MOXIE oxygen production', 'Ingenuity helicopter', 'Sample caching'],
    image: 'https://images-assets.nasa.gov/image/PIA24543/PIA24543~orig.jpg'
  },
  {
    id: 3,
    name: 'James Webb Space Telescope',
    status: 'ACTIVE',
    statusColor: '#4fc3f7',
    description: 'Observing the most distant events and objects in the universe with infrared astronomy.',
    launch: '2021',
    target: 'L2 Point',
    icon: '🔭',
    progress: 92,
    color: 'from-purple-600 to-pink-400',
    details: ['18 hexagonal mirrors', '1.5M km from Earth', 'First light images', 'Exoplanet atmospheres'],
    image: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000393/GSFC_20171208_Archive_e000393~orig.jpg'
  },
  {
    id: 4,
    name: 'Voyager Interstellar',
    status: 'ONGOING',
    statusColor: '#7c3aed',
    description: 'Humanity\'s farthest journey — now exploring interstellar space beyond our solar system.',
    launch: '1977',
    target: 'Interstellar',
    icon: '🚀',
    progress: 99,
    color: 'from-indigo-600 to-purple-400',
    details: ['23.5 billion km away', 'Interstellar medium', 'Golden Record aboard', '45+ years of data'],
    image: 'https://images-assets.nasa.gov/image/PIA17462/PIA17462~orig.jpg'
  },
  {
    id: 5,
    name: 'Dragonfly Mission',
    status: 'PLANNED',
    statusColor: '#ffb74d',
    description: 'A rotorcraft lander exploring Titan\'s prebiotic chemistry and habitability.',
    launch: '2028',
    target: 'Titan',
    icon: '🪐',
    progress: 30,
    color: 'from-yellow-600 to-amber-400',
    details: ['Rotorcraft lander', 'Titan atmosphere', 'Organic chemistry', 'Prebiotic conditions'],
    image: 'https://images-assets.nasa.gov/image/PIA14922/PIA14922~orig.jpg'
  },
  {
    id: 6,
    name: 'Europa Clipper',
    status: 'LAUNCHED',
    statusColor: '#4fc3f7',
    description: 'Investigating whether Jupiter\'s moon Europa could harbor conditions suitable for life.',
    launch: '2024',
    target: 'Europa',
    icon: '💧',
    progress: 45,
    color: 'from-cyan-600 to-teal-400',
    details: ['Ocean detection', '50 close flybys', 'Ice shell thickness', 'Subsurface ocean'],
    image: 'https://images-assets.nasa.gov/image/PIA19048/PIA19048~orig.jpg'
  }
]

export const stats = [
  { label: 'Active Missions', value: 62, suffix: '+' },
  { label: 'Countries Partnered', value: 130, suffix: '+' },
  { label: 'Years of Exploration', value: 65, suffix: '' },
  { label: 'Planets Visited', value: 8, suffix: '' },
]

export const technologies = [
  {
    title: 'Artificial Intelligence',
    desc: 'Deep learning models analyzing terabytes of space imagery and scientific data in real-time.',
    icon: '🤖',
    color: '#4fc3f7',
    tags: ['Machine Learning', 'Computer Vision', 'Data Analysis']
  },
  {
    title: 'Advanced Propulsion',
    desc: 'Next-gen ion drives and solar sails enabling faster, more efficient deep space travel.',
    icon: '⚡',
    color: '#ff6b35',
    tags: ['Ion Drive', 'Solar Sail', 'Nuclear Thermal']
  },
  {
    title: 'Space Medicine',
    desc: 'Pioneering medical breakthroughs for long-duration missions and human health in microgravity.',
    icon: '🧬',
    color: '#7c3aed',
    tags: ['Microgravity', 'Biomedical', 'Regenerative']
  },
  {
    title: 'Quantum Communications',
    desc: 'Ultra-secure quantum encrypted deep-space communication systems for future missions.',
    icon: '📡',
    color: '#ec4899',
    tags: ['Quantum Encryption', 'Deep Space Net', 'Laser Comm']
  },
  {
    title: '3D Bio-Printing',
    desc: 'Manufacturing human tissue and organs in microgravity for Earth\'s medical revolution.',
    icon: '🖨️',
    color: '#10b981',
    tags: ['Bio-printing', 'Tissue Engineering', 'ISS Research']
  },
  {
    title: 'Solar Observation',
    desc: 'Parker Solar Probe data reveals secrets of the Sun\'s corona and solar wind dynamics.',
    icon: '☀️',
    color: '#f59e0b',
    tags: ['Parker Probe', 'Heliophysics', 'Space Weather']
  },
]
