'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { Drink } from '@/types'
import { DrinkCard } from '@/components/DrinkCard'
import { DrinkModal } from '@/components/DrinkModal'

interface CatalogScreenProps {
  drinks: Drink[]
  favorites: string[]
  onToggleFavorite: (id: string) => void
}

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard'

const TAG_PILLS = [
  { label: 'Todos',          value: 'all',         color: '#8B949E' },
  { label: '🇧🇷 Brasileiros', value: 'brasileiro',  color: '#3FB950' },
  { label: '🍹 Tropicais',   value: 'tropical',    color: '#F97316' },
  { label: '🥃 Shots',       value: 'shot',        color: '#EF4444' },
  { label: '🧃 Sem Álcool',  value: 'sem-álcool',  color: '#388BFD' },
  { label: '🍦 Cremosos',    value: 'cremoso',     color: '#ECE0D1' },
  { label: '🏆 Clássicos',   value: 'clássico',    color: '#D4AF37' },
  { label: '🍋 Agridoces',   value: 'agridoce',    color: '#84CC16' },
  { label: '🔥 Fortes',      value: 'potente',     color: '#DC2626' },
]

export function getBaseAlcoholBadge(base: string | null): { label: string; color: string; bg: string } {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    'cachaça':  { label: '🌿 Cachaça',  color: '#3FB950', bg: 'rgba(63,185,80,0.12)'   },
    'vodka':    { label: '❄️ Vodka',    color: '#8B949E', bg: 'rgba(139,148,158,0.12)' },
    'gin':      { label: '🌱 Gin',      color: '#84CC16', bg: 'rgba(132,204,22,0.12)'  },
    'rum':      { label: '🏝️ Rum',      color: '#F97316', bg: 'rgba(249,115,22,0.12)'  },
    'tequila':  { label: '🌵 Tequila',  color: '#D4AF37', bg: 'rgba(212,175,55,0.12)'  },
    'bourbon':  { label: '🥃 Bourbon',  color: '#D97706', bg: 'rgba(217,119,6,0.12)'   },
    'whisky':   { label: '🥃 Whisky',   color: '#D97706', bg: 'rgba(217,119,6,0.12)'   },
    'conhaque': { label: '✨ Conhaque', color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
    'campari':  { label: '🔴 Campari',  color: '#EF4444', bg: 'rgba(239,68,68,0.12)'   },
    'aperol':   { label: '🟠 Aperol',   color: '#F97316', bg: 'rgba(249,115,22,0.12)'  },
    'amaretto': { label: '🍑 Amaretto', color: '#FB923C', bg: 'rgba(251,146,60,0.12)'  },
    'midori':   { label: '🍈 Midori',   color: '#22C55E', bg: 'rgba(34,197,94,0.12)'   },
  }
  if (!base) return { label: '🧃 Sem Álcool', color: '#388BFD', bg: 'rgba(56,139,253,0.12)' }
  return map[base] || { label: base, color: '#8B949E', bg: 'rgba(139,148,158,0.12)' }
}

export function CatalogScreen({ drinks, favorites, onToggleFavorite }: CatalogScreenProps) {
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')
  const [activeTag, setActiveTag] = useState('all')
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null)

  const filtered = useMemo(() => {
    return drinks.filter(d => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description?.toLowerCase().includes(search.toLowerCase())
      const matchDiff = difficulty === 'all' || d.difficulty === difficulty
      const matchTag  = activeTag === 'all' || (d as any).tags?.includes(activeTag)
      return matchSearch && matchDiff && matchTag
    })
  }, [drinks, search, difficulty, activeTag])

  return (
    <div style={{ padding: '16px 16px 100px' }}>

      {/* Busca */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <Search size={16} color="#8B949E" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          type="text" placeholder="Buscar drink..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '11px 36px 11px 38px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none',
          }}
          onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)' }}
        />
        {search && (
          <button onClick={() => setSearch('')} style={{
            position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer', display: 'flex',
          }}>
            <X size={14} color="#8B949E" />
          </button>
        )}
      </div>

      {/* Pills de categoria */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px', scrollbarWidth: 'none' }}>
        {TAG_PILLS.map(pill => {
          const isActive = activeTag === pill.value
          return (
            <button key={pill.value} onClick={() => setActiveTag(pill.value)} style={{
              padding: '5px 14px', borderRadius: '9999px', whiteSpace: 'nowrap',
              backgroundColor: isActive ? `${pill.color}22` : 'transparent',
              border: `1px solid ${isActive ? pill.color : 'var(--border-subtle)'}`,
              color: isActive ? pill.color : 'var(--text-secondary)',
              fontSize: '0.78rem', fontWeight: isActive ? 700 : 400,
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}>{pill.label}</button>
          )
        })}
      </div>

      {/* Pills de dificuldade */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
        {(['all', 'easy', 'medium', 'hard'] as const).map(d => {
          const labels = { all: 'Qualquer nível', easy: 'Fácil', medium: 'Médio', hard: 'Difícil' }
          const colors = { all: 'var(--text-secondary)', easy: '#3FB950', medium: '#D29922', hard: '#F85149' }
          const isActive = difficulty === d
          return (
            <button key={d} onClick={() => setDifficulty(d)} style={{
              padding: '5px 12px', borderRadius: '9999px', whiteSpace: 'nowrap',
              backgroundColor: isActive ? `${colors[d]}22` : 'transparent',
              border: `1px solid ${isActive ? colors[d] : 'var(--border-subtle)'}`,
              color: isActive ? colors[d] : 'var(--text-secondary)',
              fontSize: '0.75rem', fontWeight: isActive ? 700 : 400,
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}>{labels[d]}</button>
          )
        })}
      </div>

      {/* Count */}
      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginBottom: '12px' }}>
        {filtered.length} drink{filtered.length !== 1 ? 's' : ''}
        {search && ` para "${search}"`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Search size={36} color="#484F58" style={{ margin: '0 auto 12px', display: 'block' }} />
          <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>Nenhum drink encontrado</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Tente outro filtro ou busca</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {filtered.map(drink => (
            <DrinkCard key={drink.id} drink={drink}
              isFavorite={favorites.includes(drink.id)}
              onClick={() => setSelectedDrink(drink)} />
          ))}
        </div>
      )}

      {selectedDrink && (
        <DrinkModal drink={selectedDrink}
          isFavorite={favorites.includes(selectedDrink.id)}
          onToggleFavorite={() => onToggleFavorite(selectedDrink.id)}
          onClose={() => setSelectedDrink(null)} />
      )}
    </div>
  )
}
