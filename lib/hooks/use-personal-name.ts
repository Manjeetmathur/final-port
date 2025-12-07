'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'portfolio-personal-name'

export function usePersonalName() {
  const [name, setName] = useState<string>('')

  useEffect(() => {
    // Load from localStorage on mount
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setName(stored)
      }
    }
  }, [])

  const updateName = (newName: string) => {
    setName(newName)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newName)
    }
  }

  return { name, updateName }
}

