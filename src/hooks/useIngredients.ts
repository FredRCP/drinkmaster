'use client'

import { useEffect, useState } from 'react'
import { Ingredient } from '@/types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/ingredients?select=*&order=category.asc,name.asc`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
              'Accept-Profile': 'barilq',
            },
          }
        )

        if (!res.ok) {
          const err = await res.text()
          throw new Error(`${res.status}: ${err}`)
        }

        const data: Ingredient[] = await res.json()
        console.log('✓ ingredients carregados:', data.length)
        setIngredients(data)
      } catch (err) {
        console.error('useIngredients error:', err)
        setError('Erro ao carregar ingredientes')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  return { ingredients, isLoading, error }
}
