'use client'

import { useEffect, useState } from 'react'
import { Drink } from '@/types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function useDrinks() {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const select = [
          '*',
          'drink_ingredients(ingredient_id,quantity,unit,is_optional,sort_order,notes,ingredient:ingredients(id,name,category,alcohol_content,is_common,image_url))',
          'glass_type:glass_types(id,name,emoji)',
          'technique:techniques(id,name,description)',
          'category:categories(id,name,icon,color)',
        ].join(',')

        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/drinks?select=${encodeURIComponent(select)}&order=name.asc`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
              'Accept-Profile': 'barilq',
            },
          }
        )

        if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`)
        const data: Drink[] = await res.json()
        console.log('✓ drinks carregados:', data.length)
        setDrinks(data)
      } catch (err) {
        console.error('useDrinks error:', err)
        setError('Erro ao carregar drinks')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  return { drinks, isLoading, error }
}