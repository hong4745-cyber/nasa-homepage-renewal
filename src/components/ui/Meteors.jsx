import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'

export default function Meteors({ number = 12 }) {
  const [meteors, setMeteors] = useState([])

  useEffect(() => {
    const generated = Array.from({ length: number }, (_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 100),
      left: Math.floor(Math.random() * 100),
      animationDelay: `${Math.random() * 6}s`,
      animationDuration: `${Math.floor(Math.random() * 6 + 3)}s`,
    }))
    setMeteors(generated)
  }, [number])

  return (
    <>
      {meteors.map(m => (
        <span
          key={m.id}
          className={cn(
            'pointer-events-none absolute left-1/2 top-1/2 h-px w-[200px]',
            'rotate-[215deg] animate-[meteor_linear_infinite]',
            'bg-gradient-to-r from-white via-[#4fc3f7] to-transparent',
            'shadow-[0_0_0_1px_#ffffff10]',
          )}
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            animationDelay: m.animationDelay,
            animationDuration: m.animationDuration,
          }}
        >
          <span className="absolute top-1/2 right-0 h-[2px] w-[80px] -translate-y-1/2 bg-gradient-to-r from-white/60 to-transparent" />
        </span>
      ))}
    </>
  )
}
