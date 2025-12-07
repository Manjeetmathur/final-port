'use client'

import * as React from 'react'
import { Terminal, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WelcomeToastProps {
  onOpenTerminal?: () => void
}

export function WelcomeToast({ onOpenTerminal }: WelcomeToastProps) {
  const [show, setShow] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)

  React.useEffect(() => {
    // Show after a short delay on every page load
    const timer = setTimeout(() => setShow(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    setDismissed(true)
    setShow(false)
  }

  const handleClick = () => {
    onOpenTerminal?.()
    handleDismiss()
  }

  if (dismissed || !show) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-500">
      <div 
        onClick={handleClick}
        className="relative bg-gradient-to-r from-background via-muted/50 to-background border border-border rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all hover:scale-105 min-w-[320px] max-w-md"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6"
          onClick={handleDismiss}
        >
          <X className="h-3 w-3" />
        </Button>
        
        <div className="flex items-center gap-3 pr-6">
          <div className="relative">
            <Terminal className="h-5 w-5 text-green-500" />
            <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Welcome! 👋</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click here to explore the interactive terminal
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

