'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  glowEffect?: boolean
  tiltEffect?: boolean
}

export function InteractiveCard({ 
  children, 
  className,
  glowEffect = true,
  tiltEffect = true 
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 })
  const cardRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tiltEffect) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'transition-all duration-300',
        glowEffect && isHovered && 'shadow-lg shadow-primary/20',
        className
      )}
      style={{
        transform: tiltEffect
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`
          : undefined,
      }}
    >
      {children}
    </div>
  )
}

