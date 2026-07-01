import { useEffect, useRef } from 'react'

export default function StarField({ count = 200 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let width, height

    const stars = []

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const init = () => {
      resize()
      stars.length = 0
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.2,
          opacity: Math.random(),
          speed: Math.random() * 0.3 + 0.05,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      stars.forEach(star => {
        star.opacity += star.twinkleSpeed * star.twinkleDir
        if (star.opacity >= 1 || star.opacity <= 0.1) {
          star.twinkleDir *= -1
        }

        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 2
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 220, 255, ${star.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    init()
    draw()

    window.addEventListener('resize', init)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', init)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
