'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TypingCursorProps {
  className?: string
  speed?: number
}

export function TypingCursor({ className, speed = 530 }: TypingCursorProps) {
  return (
    <span
      className={cn('inline-block w-0.5 h-5 bg-foreground ml-1', className)}
      style={{
        animation: `blink ${speed}ms infinite`,
      }}
    />
  )
}

