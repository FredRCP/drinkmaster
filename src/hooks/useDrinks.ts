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
        const select = '*,drink_ingredients(ingredient_id,quantity,unit,is_optional,sort_order,notes,ingredient:ingredients(id,name,category,alcohol_content,is_common,image_url))'

        // Sem filtro is_published por enquanto
        const url = `${SUPABASE_URL}/rest/v1/drinks?select=${encodeURIComponent(select)}&order=name.asc`

        const res = await fetch(url, {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Accept-Profile': 'barilq',
          },
        })

        const text = await res.text()
        console.log('drinks status:', res.status)
        console.log('drinks response:', text.substring(0, 500))

        if (!res.ok) throw new Error(`${res.status}: ${text}`)

        const data: Drink[] = JSON.parse(text)
        console.log('✓ drinks carregados:', data.length)

        // Debug do primeiro drink
        if (data.length > 0) {
          console.log('Primeiro drink:', data[0].name)
          console.log('drink_ingredients:', JSON.stringify(data[0].drink_ingredients?.slice(0,2)))
        }

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