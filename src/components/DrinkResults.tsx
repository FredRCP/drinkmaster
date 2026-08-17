'use client'

import { useMemo } from 'react'
import { Drink } from '@/types'
import { matchDrinks } from '@/lib/drinkScore'
import { DrinkCard } from './DrinkCard'

interface DrinkResultsProps {
  drinks: Drink[]
  selectedIds: string[]
  onBack: () => void
}

export function DrinkResults({ drinks, selectedIds, onBack }: DrinkResultsProps) {
  const matches = useMemo(
    () => matchDrinks(drinks, selectedIds),
    [drinks, selectedIds]
  )

  const canMake = matches.filter((m) => m.canMake)
  const almostThere = matches.filter((m) => !m.canMake && m.missing.length === 1)
  const others = matches.filter((m) => !m.canMake && m.missing.length > 1)

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: '1px solid #2D2D2F', borderRadius: '8px',
            color: '#B8B8BA', cursor: 'pointer', padding: '6px 12px', fontSize: '0.85rem',
          }}
        >
          ← Voltar
        </button>
        <div>
          <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            Resultados
          </h2>
          <p style={{ color: '#808080', fontSize: '0.8rem', margin: 0 }}>
            {selectedIds.length} ingrediente{selectedIds.length !== 1 ? 's' : ''} selecionado{selectedIds.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {matches.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '3rem', marginBottom: '12px' }}>😕</p>
          <p style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>
            Nenhum drink encontrado
          </p>
          <p style={{ color: '#808080', fontSize: '0.85rem' }}>
            Tente adicionar mais ingredientes ao seu bar
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Pode fazer agora */}
          {canMake.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.2rem' }}>🍸</span>
                <h3 style={{ color: '#10B981', fontSize: '0.9rem', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Você consegue fazer agora
                </h3>
                <span style={{ backgroundColor: 'rgba(16,185,129,0.15)', color: '#10B981', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
                  {canMake.length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {canMake.map((m) => <DrinkCard key={m.drink.id} match={m} />)}
              </div>
            </section>
          )}

          {/* Falta 1 ingrediente */}
          {almostThere.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.2rem' }}>⚡</span>
                <h3 style={{ color: '#F59E0B', fontSize: '0.9rem', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Falta apenas 1 ingrediente
                </h3>
                <span style={{ backgroundColor: 'rgba(245,158,11,0.15)', color: '#F59E0B', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
                  {almostThere.length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {almostThere.map((m) => <DrinkCard key={m.drink.id} match={m} />)}
              </div>
            </section>
          )}

          {/* Outros com score > 0 */}
          {others.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.2rem' }}>📋</span>
                <h3 style={{ color: '#808080', fontSize: '0.9rem', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Outros drinks
                </h3>
                <span style={{ backgroundColor: '#2D2D2F', color: '#808080', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
                  {others.length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {others.map((m) => <DrinkCard key={m.drink.id} match={m} />)}
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  )
}
