'use client'

import * as React from 'react'
import { PersonalInfo } from '@/lib/data/portfolio'
import { personalInfo as defaultPersonalInfo } from '@/lib/data/portfolio'

interface PortfolioContextType {
  personalInfo: PersonalInfo
  updatePersonalInfo: (updates: Partial<PersonalInfo>) => void
}

const PortfolioContext = React.createContext<PortfolioContextType | undefined>(undefined)

const STORAGE_KEY = 'portfolio-personal-info'

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [personalInfo, setPersonalInfo] = React.useState<PersonalInfo>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          return { ...defaultPersonalInfo, ...JSON.parse(stored) }
        } catch {
          return defaultPersonalInfo
        }
      }
    }
    return defaultPersonalInfo
  })

  const updatePersonalInfo = React.useCallback((updates: Partial<PersonalInfo>) => {
    setPersonalInfo((prev) => {
      const updated = { ...prev, ...updates }
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      }
      return updated
    })
  }, [])

  const value = React.useMemo(
    () => ({
      personalInfo,
      updatePersonalInfo,
    }),
    [personalInfo, updatePersonalInfo]
  )

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = React.useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}

