'use client'

import * as React from 'react'
import { Terminal, Download } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { TerminalDialog } from '@/components/terminal-dialog'
import { TerminalInstruction } from '@/components/terminal-instruction'
import { WelcomeToast } from '@/components/welcome-toast'
import { useTerminal } from '@/lib/contexts/terminal-context'
import { personalInfo } from '@/lib/data/portfolio'

export function Header() {
  const [terminalOpen, setTerminalOpen] = React.useState(false)
  const [instructionDismissed, setInstructionDismissed] = React.useState(false)
  const { setOpenTerminal, openTerminal } = useTerminal()

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
          <div className="ml-auto flex items-center gap-5 relative">
            {personalInfo.resume && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 gap-2"
                asChild
              >
                <a
                  href={personalInfo.resume}
                  download
                  aria-label="Download Resume"
                  title="Download Resume"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Resume</span>
                </a>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="pt-5 h-9 w-9 flex flex-col items-center justify-center gap-2 bg-gray-900 rounded-sm p-4 text-white border-green-300 border"
              onClick={handleOpenTerminal}
              aria-label="Open terminal (Ctrl+S)"
              title="Open terminal (Ctrl+S)"
            >
              <Terminal className="h-4 w-4 " />
              
            </Button>
            {!instructionDismissed && <TerminalInstruction onDismiss={() => setInstructionDismissed(true)} />}
            <ThemeToggle />
          </div>
        </div>
      </header>
      <WelcomeToast onOpenTerminal={openTerminal} />
      <TerminalDialog open={terminalOpen} onOpenChange={setTerminalOpen} />
    </>
  )
}
