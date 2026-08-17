'use client'

import { useEffect, useState } from 'react'
import { Drink, getDrinkImage, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/types'
import { BartenderMode } from './BartenderMode'

interface DrinkModalProps {
  drink: Drink
  score?: number
  missing?: string[]
  isFavorite: boolean
  onToggleFavorite: () => void
  onClose: () => void
}

export function DrinkModal({ drink, score, missing, isFavorite, onToggleFavorite, onClose }: DrinkModalProps) {
  const image = getDrinkImage(drink)
  const diffColor = DIFFICULTY_COLORS[drink.difficulty]
  const diffLabel = DIFFICULTY_LABELS[drink.difficulty]
  const canMake = score === 100
  const [bartenderMode, setBartenderMode] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (bartenderMode) {
    return <BartenderMode drink={drink} onClose={() => setBartenderMode(false)} />
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(6px)',
        overflowY: 'auto',
        padding: '20px 16px 40px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          margin: '0 auto',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '16px',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
        }}
      >
        {/* Imagem */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img
            src={image}
            alt={drink.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80'
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 55%)',
          }} />
          <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={onClose} style={{
              width: '32px', height: '32px', borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '0.8rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer',
            }}>✕</button>
            <button onClick={onToggleFavorite} style={{
              width: '32px', height: '32px', borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.65)', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer',
            }}>{isFavorite ? '❤️' : '🤍'}</button>
          </div>
          {score !== undefined && (
            <div style={{
              position: 'absolute', bottom: '10px', right: '10px',
              backgroundColor: canMake ? 'rgba(63,185,80,0.92)' : 'rgba(212,175,55,0.92)',
              color: '#0D1117', fontSize: '0.7rem', fontWeight: 800,
              padding: '3px 10px', borderRadius: '9999px',
            }}>
              {canMake ? '✓ Pode fazer' : `${score}% match`}
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div style={{ padding: '18px 20px 28px' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '10px' }}>
            {drink.name}
          </h2>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: diffColor, backgroundColor: `${diffColor}22`, padding: '3px 10px', borderRadius: '9999px' }}>
              {diffLabel}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-elevated)', padding: '3px 10px', borderRadius: '9999px' }}>
              ⏱ {drink.preparation_time_minutes} min
            </span>
            {drink.alcohol_content != null && (
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-elevated)', padding: '3px 10px', borderRadius: '9999px' }}>
                🍷 {drink.alcohol_content}% ABV
              </span>
            )}
          </div>

          {drink.description && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>
              {drink.description}
            </p>
          )}

          {missing && missing.length > 0 && (
            <div style={{
              backgroundColor: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.25)',
              borderRadius: '10px', padding: '10px 14px', marginBottom: '16px',
            }}>
              <p style={{ color: '#F85149', fontSize: '0.78rem', fontWeight: 600, marginBottom: '3px' }}>Ingredientes que faltam</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.83rem' }}>{missing.join(', ')}</p>
            </div>
          )}

          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            Ingredientes
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '20px' }}>
            {drink.drink_ingredients
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((di) => {
                const isM = missing?.includes(di.ingredient.name)
                return (
                  <div key={di.ingredient_id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: isM ? 'rgba(248,81,73,0.06)' : 'var(--bg-elevated)',
                    borderRadius: '6px',
                    border: `1px solid ${isM ? 'rgba(248,81,73,0.2)' : 'var(--border-subtle)'}`,
                  }}>
                    <span style={{ color: isM ? '#F85149' : 'var(--text-primary)', fontSize: '0.86rem' }}>
                      {isM ? '✗' : '✓'} {di.ingredient.name}
                      {di.is_optional && <span style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem' }}> (opcional)</span>}
                    </span>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.78rem', marginLeft: '8px', whiteSpace: 'nowrap' }}>
                      {di.quantity} {di.unit}
                    </span>
                  </div>
                )
              })}
          </div>

          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            Modo de Preparo
          </p>
          <div style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: '10px', padding: '14px 16px', border: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.88rem', lineHeight: 1.9, whiteSpace: 'pre-line' }}>
              {drink.instructions}
            </p>
          </div>

          {/* Botão Iniciar Preparo */}
          <button
            onClick={() => setBartenderMode(true)}
            style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #E6C84A 100%)',
              color: '#0D1117', border: 'none', borderRadius: '12px',
              fontSize: '1rem', fontWeight: 800, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
            }}
          >
            🍸 Iniciar Preparo
          </button>
        </div>
      </div>
    </div>
  )
}
