'use client'

import * as React from 'react'
import { Terminal, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TerminalHintProps {
  onDismiss?: () => void
}

export function TerminalHint({ onDismiss }: TerminalHintProps) {
  const [show, setShow] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)

  React.useEffect(() => {
    const hasSeenHint = typeof window !== 'undefined' 
      ? localStorage.getItem('terminal-hint-seen')
      : null
    
    if (!hasSeenHint) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setShow(true), 1500)
      return () => clearTimeout(timer)
    } else {
      setDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    setShow(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('terminal-hint-seen', 'true')
    }
    onDismiss?.()
  }

  if (dismissed || !show) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="relative bg-gradient-to-br from-background to-muted border border-border rounded-lg shadow-lg p-4 max-w-sm">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6"
          onClick={handleDismiss}
        >
          <X className="h-3 w-3" />
        </Button>
        
        <div className="flex items-start gap-3 pr-6">
          <div className="relative">
            <Terminal className="h-5 w-5 text-green-500" />
            <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-semibold">Try the Terminal!</p>
            <p className="text-xs text-muted-foreground">
              Click the <Terminal className="inline h-3 w-3 mx-0.5" /> icon in the header to open an interactive terminal. 
              Try commands like <code className="text-xs bg-muted px-1 py-0.5 rounded">npm i your-name</code> or <code className="text-xs bg-muted px-1 py-0.5 rounded">help</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

