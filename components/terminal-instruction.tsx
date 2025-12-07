'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TerminalInstructionProps {
  onDismiss?: () => void
}

export function TerminalInstruction({ onDismiss }: TerminalInstructionProps) {
  const [show, setShow] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)

  React.useEffect(() => {
    // Show instruction after a short delay
    const timer = setTimeout(() => {
      const hasSeenInstruction = typeof window !== 'undefined' 
        ? localStorage.getItem('terminal-instruction-seen')
        : null
      if (!hasSeenInstruction) {
        setShow(true)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    setShow(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('terminal-instruction-seen', 'true')
    }
    onDismiss?.()
  }

  if (dismissed || !show) return null

  return (
    <div className="absolute top-full right-0 mt-2 z-50 animate-in fade-in slide-in-from-top-2">
      <div className="relative bg-popover border border-border rounded-md px-3 py-1.5 shadow-lg text-xs">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-1 -right-1 h-5 w-5"
          onClick={handleDismiss}
        >
          <X className="h-3 w-3" />
        </Button>
        <span className="text-muted-foreground">Try it out</span>
      </div>
    </div>
  )
}

