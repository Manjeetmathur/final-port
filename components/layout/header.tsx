'use client'

import * as React from 'react'
import { Terminal } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { TerminalDialog } from '@/components/terminal-dialog'
import { TerminalInstruction } from '@/components/terminal-instruction'
import { useTerminal } from '@/lib/contexts/terminal-context'

export function Header() {
  const [terminalOpen, setTerminalOpen] = React.useState(false)
  const [instructionDismissed, setInstructionDismissed] = React.useState(false)
  const { setOpenTerminal } = useTerminal()

  const handleOpenTerminal = React.useCallback(() => {
    setTerminalOpen(true)
    setInstructionDismissed(true)
  }, [])

  React.useEffect(() => {
    setOpenTerminal(handleOpenTerminal)
  }, [setOpenTerminal, handleOpenTerminal])

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S to open terminal
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        handleOpenTerminal()
      }
      
      // Ctrl+C to close terminal (only when terminal is open and not typing in input)
      if (e.ctrlKey && e.key === 'c' && terminalOpen) {
        const target = e.target as HTMLElement
        // Allow normal Ctrl+C behavior in input/textarea fields (except terminal input)
        if ((target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && !target.hasAttribute('data-terminal-input')) {
          return
        }
        e.preventDefault()
        setTerminalOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [terminalOpen, handleOpenTerminal])

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex flex-1 items-center gap-4 px-4 md:px-6">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-2 relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={handleOpenTerminal}
              aria-label="Open terminal (Ctrl+S)"
              title="Open terminal (Ctrl+S)"
            >
              <Terminal className="h-4 w-4" />
            </Button>
            {!instructionDismissed && <TerminalInstruction onDismiss={() => setInstructionDismissed(true)} />}
            <ThemeToggle />
          </div>
        </div>
      </header>
      <TerminalDialog open={terminalOpen} onOpenChange={setTerminalOpen} />
    </>
  )
}

