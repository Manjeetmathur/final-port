'use client'

import * as React from 'react'

interface TerminalContextType {
  openTerminal: () => void
  setOpenTerminal: (fn: () => void) => void
}

const TerminalContext = React.createContext<TerminalContextType | undefined>(undefined)

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [openTerminalFn, setOpenTerminalFn] = React.useState<(() => void) | null>(null)

  const openTerminal = React.useCallback(() => {
    if (openTerminalFn) {
      openTerminalFn()
    }
  }, [openTerminalFn])

  const setOpenTerminal = React.useCallback((fn: () => void) => {
    setOpenTerminalFn(() => fn)
  }, [])

  const value = React.useMemo(
    () => ({
      openTerminal,
      setOpenTerminal,
    }),
    [openTerminal, setOpenTerminal]
  )

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  )
}

export function useTerminal() {
  const context = React.useContext(TerminalContext)
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider')
  }
  return context
}

