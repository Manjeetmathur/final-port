'use client'

import * as React from 'react'

interface ConfettiEffectProps {
  trigger: boolean
  count?: number
}

export function ConfettiEffect({ trigger, count = 50 }: ConfettiEffectProps) {
  const [confetti, setConfetti] = React.useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    color: string
    rotation: number
    rotationSpeed: number
  }>>([])

  React.useEffect(() => {
    if (trigger) {
      const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']
      const newConfetti = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      }))
      setConfetti(newConfetti)

      const interval = setInterval(() => {
        setConfetti((prev) =>
          prev
            .map((c) => ({
              ...c,
              x: c.x + c.vx,
              y: c.y + c.vy,
              rotation: c.rotation + c.rotationSpeed,
            }))
            .filter((c) => c.y < window.innerHeight + 50)
        )
      }, 16)

      return () => clearInterval(interval)
    }
  }, [trigger, count])

  if (confetti.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute w-2 h-2"
          style={{
            left: `${c.x}px`,
            top: `${c.y}px`,
            backgroundColor: c.color,
            transform: `rotate(${c.rotation}deg)`,
            transition: 'none',
          }}
        />
      ))}
    </div>
  )
}

