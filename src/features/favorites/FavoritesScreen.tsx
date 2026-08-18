'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Drink } from '@/types'
import { DrinkCard } from '@/components/DrinkCard'
import { DrinkModal } from '@/components/DrinkModal'

interface FavoritesScreenProps {
  drinks: Drink[]
  favorites: string[]
  onToggleFavorite: (id: string) => void
}

export function FavoritesScreen({ drinks, favorites, onToggleFavorite }: FavoritesScreenProps) {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null)
  const favoriteDrinks = drinks.filter(d => favorites.includes(d.id))

  return (
    <div style={{ padding: '20px 16px 120px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px' }}>
          Meus Favoritos
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          {favoriteDrinks.length} drink{favoriteDrinks.length !== 1 ? 's' : ''} salvos
        </p>
      </div>

      {favoriteDrinks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <Heart size={48} color="#484F58" style={{ margin: '0 auto 16px', display: 'block' }} />
          <p style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>
            Nenhum favorito ainda
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            Abra qualquer drink e toque no coração para salvar
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {favoriteDrinks.map(drink => (
            <DrinkCard key={drink.id} drink={drink} isFavorite={true}
              onClick={() => setSelectedDrink(drink)} />
          ))}
        </div>
      )}

      {/* Rodapé RCP Creative */}
      <div style={{
        marginTop: '48px', paddingTop: '24px',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center',
      }}>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem', marginBottom: '6px' }}>
          Feito com 🍸 por
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <img src="/icon-192.png" alt="RCP Creative" style={{ width: '20px', height: '20px', borderRadius: '5px', opacity: 0.7 }} />
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            RCP Creative
          </span>
        </div>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.65rem', marginTop: '6px', opacity: 0.6 }}>
          DrinkMaster v1.0 · {new Date().getFullYear()}
        </p>
      </div>

      {selectedDrink && (
        <DrinkModal drink={selectedDrink}
          isFavorite={favorites.includes(selectedDrink.id)}
          onToggleFavorite={() => onToggleFavorite(selectedDrink.id)}
          onClose={() => setSelectedDrink(null)} />
      )}
    </div>
  )
}