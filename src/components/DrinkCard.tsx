'use client'

import { Heart, Clock, ChevronRight } from 'lucide-react'
import { Drink, getDrinkImage, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/types'
import { getBaseAlcoholBadge } from '@/features/catalog/CatalogScreen'

interface DrinkCardProps {
  drink: Drink
  score?: number
  missing?: string[]
  isFavorite?: boolean
  onClick: () => void
}

export function DrinkCard({ drink, score, missing, isFavorite, onClick }: DrinkCardProps) {
  const image = getDrinkImage(drink)
  const diffColor = DIFFICULTY_COLORS[drink.difficulty]
  const diffLabel = DIFFICULTY_LABELS[drink.difficulty]
  const canMake = score === 100
  const baseBadge = getBaseAlcoholBadge((drink as any).base_alcohol)

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: `1px solid ${canMake ? 'rgba(212,175,55,0.35)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.15s ease',
        boxShadow: canMake ? '0 0 16px rgba(212,175,55,0.08)' : 'none',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
    >
      {/* Imagem */}
      <div style={{ position: 'relative', height: '130px', overflow: 'hidden' }}>
        <img
          src={image} alt={drink.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80'
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(22,27,34,0.95) 0%, transparent 55%)',
        }} />

        {/* Score */}
        {score !== undefined && (
          <div style={{
            position: 'absolute', top: '7px', right: '7px',
            backgroundColor: canMake ? 'rgba(63,185,80,0.92)' : score >= 66 ? 'rgba(212,175,55,0.92)' : 'rgba(22,27,34,0.85)',
            color: canMake || score >= 66 ? '#0D1117' : 'var(--text-secondary)',
            fontSize: '0.62rem', fontWeight: 800,
            padding: '2px 7px', borderRadius: '9999px',
          }}>
            {canMake ? '✓ Pronto' : `${score}%`}
          </div>
        )}

        {/* Favorito */}
        {isFavorite && (
          <div style={{ position: 'absolute', top: '7px', left: '7px' }}>
            <Heart size={14} fill="#F85149" color="#F85149" />
          </div>
        )}

        {/* Badge base_alcohol */}
        <div style={{
          position: 'absolute', bottom: '7px', left: '7px',
          backgroundColor: baseBadge.bg,
          border: `1px solid ${baseBadge.color}44`,
          borderRadius: '9999px', padding: '2px 8px',
          backdropFilter: 'blur(4px)',
        }}>
          <span style={{ color: baseBadge.color, fontSize: '0.6rem', fontWeight: 700 }}>
            {baseBadge.label}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px 12px' }}>
        <h3 style={{
          color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700,
          marginBottom: '6px', lineHeight: 1.3,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {drink.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: '0.68rem', color: diffColor,
            backgroundColor: `${diffColor}18`,
            padding: '2px 7px', borderRadius: '9999px', fontWeight: 600,
          }}>{diffLabel}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--text-tertiary)' }}>
            <Clock size={10} />
            <span style={{ fontSize: '0.68rem' }}>{drink.preparation_time_minutes}min</span>
          </span>
        </div>

        {missing && missing.length > 0 && (
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.68rem', marginTop: '5px', lineHeight: 1.4 }}>
            Falta: {missing.slice(0, 2).join(', ')}{missing.length > 2 ? ` +${missing.length - 2}` : ''}
          </p>
        )}
      </div>
    </div>
  )
}
