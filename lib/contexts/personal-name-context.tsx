'use client'

import * as React from 'react'

interface PersonalNameContextType {
  name: string
  updateName: (newName: string) => void
}

const PersonalNameContext = React.createContext<PersonalNameContextType | undefined>(undefined)

export function PersonalNameProvider({ children, defaultName }: { children: React.ReactNode; defaultName?: string }) {
  // Always start with defaultName, don't persist terminal changes
  const [name, setName] = React.useState<string>(defaultName || '')

  // Reset to default name on mount (after reload)
  React.useEffect(() => {
    if (defaultName) {
      setName(defaultName)
    }
  }, [defaultName])

  const updateName = React.useCallback((newName: string) => {
    // Only update for current session, don't persist
    setName(newName)
  }, [])

  const value = React.useMemo(
    () => ({
      name,
      updateName,
    }),
    [name, updateName]
  )

  return (
    <PersonalNameContext.Provider value={value}>
      {children}
    </PersonalNameContext.Provider>
  )
}

export function usePersonalName() {
  const context = React.useContext(PersonalNameContext)
  if (context === undefined) {
    throw new Error('usePersonalName must be used within a PersonalNameProvider')
  }
  return context
}

