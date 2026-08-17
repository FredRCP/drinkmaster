'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'barilq_pantry'

export function usePantry() {
  const [selected, setSelected] = useState<string[]>([])

  // Carrega do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setSelected(JSON.parse(saved))
    } catch {}
  }, [])

  // Salva no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected))
  }, [selected])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const clear = () => setSelected([])

  const has = (id: string) => selected.includes(id)

  return { selected, toggle, clear, has, count: selected.length }
}
