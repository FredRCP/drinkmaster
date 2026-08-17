'use client'

import { useEffect, useState } from 'react'
import { fetchDrinks, fetchIngredients } from '@/lib/api'
import { Drink, Ingredient } from '@/types'

const PANTRY_KEY = 'barilq_pantry_v2'
const FAVORITES_KEY = 'barilq_favorites_v2'

export function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchIngredients()
      .then(setIngredients)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  return { ingredients, isLoading }
}

export function useDrinks() {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDrinks()
      .then(setDrinks)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  return { drinks, isLoading }
}

export function usePantry() {
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PANTRY_KEY)
      if (saved) setSelected(JSON.parse(saved))
    } catch {}
  }, [])

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      localStorage.setItem(PANTRY_KEY, JSON.stringify(next))
      return next
    })
  }

  const clear = () => {
    setSelected([])
    localStorage.setItem(PANTRY_KEY, '[]')
  }

  return { selected, toggle, clear, count: selected.length, has: (id: string) => selected.includes(id) }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY)
      if (saved) setFavorites(JSON.parse(saved))
    } catch {}
  }, [])

  const toggle = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
      return next
    })
  }

  const isFavorite = (id: string) => favorites.includes(id)

  return { favorites, toggle, isFavorite, count: favorites.length }
}
