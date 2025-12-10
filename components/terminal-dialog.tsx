'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { CommandTerminal } from '@/components/ui/command-terminal'
import { usePersonalName } from '@/lib/contexts/personal-name-context'
import { cn } from '@/lib/utils'

interface TerminalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TerminalDialog({ open, onOpenChange }: TerminalDialogProps) {
  const router = useRouter()
  const { updateName } = usePersonalName()
  const dialogRef = React.useRef<HTMLDivElement>(null)

  // Handle Ctrl+C to close terminal or cancel prompt
  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        // Don't close if user is typing in the terminal input
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' && target.hasAttribute('data-terminal-input')) {
          // Allow normal Ctrl+C in terminal input for copy
          return
        }
        e.preventDefault()
        onOpenChange(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onOpenChange])
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [isMaximized, setIsMaximized] = React.useState(false)


  const handleCommandExecute = (command: string, args: string[]) => {
    if (command === 'npm' && (args[0] === 'i' || args[0] === 'install') && args[1]) {
      updateName(args[1])
      // Close terminal after a short delay to show the name change
      setTimeout(() => {
        onOpenChange(false)
      }, 800)
    }
  }

  const handleNavigate = (path: string) => {
    router.push(path)
    setTimeout(() => {
      onOpenChange(false)
    }, 500)
  }

  // Handle window controls
  const handleClose = () => {
    onOpenChange(false)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    // Restore after a delay (simulating minimize to taskbar)
    setTimeout(() => {
      setIsMinimized(false)
    }, 1000)
  }

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore
      setIsMaximized(false)
    } else {
      // Maximize
      setIsMaximized(true)
      setIsMinimized(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={dialogRef}
        showCloseButton={false}
        className={cn(
          'p-0 bg-transparent border-0 shadow-none z-[100] max-w-7xl w-full h-[80vh]',
          'fixed  m-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'transition-all duration-200',
          isMinimized ? 'pointer-events-none opacity-0' : (open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')
        )}
        onPointerDownOutside={(e) => {
          // Allow interaction with terminal content
          const target = e.target as HTMLElement
          if (target.closest('[data-terminal-input]') || target.closest('[data-scroll-container]')) {
            e.preventDefault()
          }
        }}
      >
        {/* Visually hidden title for accessibility */}
        <DialogTitle className="sr-only">Terminal</DialogTitle>
        
        <div
          className="h-full w-full flex flex-col relative z-[101] min-h-0"
          // style={{ height: '100%', width: '100%' }}
        >
          <CommandTerminal
            onCommandExecute={handleCommandExecute}
            onNavigate={handleNavigate}
            onClose={handleClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            isMaximized={isMaximized}
            className="flex-1 min-h-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

