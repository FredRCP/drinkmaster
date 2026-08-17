'use client'

import { useState, useMemo } from 'react'
import { Ingredient, CATEGORY_LABELS, CATEGORY_ICONS } from '@/types'

interface IngredientSelectorProps {
  ingredients: Ingredient[]
  selected: string[]
  onToggle: (id: string) => void
  onClear: () => void
}

export function IngredientSelector({
  ingredients,
  selected,
  onToggle,
  onClear,
}: IngredientSelectorProps) {
  const [search, setSearch] = useState('')
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(['spirit', 'fresh', 'mixer']) // abre as mais comuns por padrão
  )

  // Agrupa por categoria
  const grouped = useMemo(() => {
    const filtered = ingredients.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    )
    const map: Record<string, Ingredient[]> = {}
    for (const ing of filtered) {
      const cat = ing.category || 'other'
      if (!map[cat]) map[cat] = []
      map[cat].push(ing)
    }
    return map
  }, [ingredients, search])

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  const categoryOrder = ['spirit', 'liqueur', 'fresh', 'juice', 'mixer', 'syrup', 'other']

  return (
    <div>
      {/* Busca */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <span style={{
          position: 'absolute', left: '14px', top: '50%',
          transform: 'translateY(-50%)', color: '#808080', fontSize: '1rem', pointerEvents: 'none'
        }}>
          🔍
        </span>
        <input
          type="text"
          placeholder="Buscar ingrediente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px 12px 42px',
            backgroundColor: '#1B1B1D',
            border: '1px solid #2D2D2F',
            borderRadius: '10px',
            color: '#FFFFFF',
            fontSize: '0.95rem',
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#D4AF37' }}
          onBlur={(e) => { e.target.style.borderColor = '#2D2D2F' }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#808080', cursor: 'pointer', fontSize: '1rem' }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Contador + limpar */}
      {selected.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ color: '#D4AF37', fontSize: '0.85rem', fontWeight: 500 }}>
            {selected.length} ingrediente{selected.length !== 1 ? 's' : ''} selecionado{selected.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={onClear}
            style={{ background: 'none', border: 'none', color: '#808080', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Limpar tudo
          </button>
        </div>
      )}

      {/* Grupos por categoria */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {categoryOrder
          .filter((cat) => grouped[cat]?.length > 0)
          .map((cat) => {
            const items = grouped[cat] || []
            const isOpen = openCategories.has(cat)
            const selectedInCat = items.filter((i) => selected.includes(i.id)).length

            return (
              <div key={cat} style={{ backgroundColor: '#1B1B1D', border: '1px solid #2D2D2F', borderRadius: '10px', overflow: 'hidden' }}>

                {/* Header da categoria */}
                <button
                  onClick={() => toggleCategory(cat)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', padding: '12px 16px',
                    background: 'none', border: 'none', cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1rem' }}>{CATEGORY_ICONS[cat] || '📦'}</span>
                    <span style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 600 }}>
                      {CATEGORY_LABELS[cat] || cat}
                    </span>
                    {selectedInCat > 0 && (
                      <span style={{
                        backgroundColor: '#D4AF37', color: '#0F0F10',
                        fontSize: '0.65rem', fontWeight: 800,
                        padding: '1px 7px', borderRadius: '9999px',
                      }}>
                        {selectedInCat}
                      </span>
                    )}
                  </div>
                  <span style={{ color: '#808080', fontSize: '0.8rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>
                    ▾
                  </span>
                </button>

                {/* Lista de ingredientes */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid #2D2D2F', padding: '8px 8px 12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '6px' }}>
                      {items.map((ingredient) => {
                        const isSelected = selected.includes(ingredient.id)
                        return (
                          <button
                            key={ingredient.id}
                            onClick={() => onToggle(ingredient.id)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '8px',
                              padding: '8px 12px',
                              backgroundColor: isSelected ? 'rgba(212,175,55,0.12)' : 'transparent',
                              border: `1px solid ${isSelected ? 'rgba(212,175,55,0.5)' : '#2D2D2F'}`,
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              textAlign: 'left',
                              width: '100%',
                            }}
                          >
                            <span style={{
                              width: '16px', height: '16px', minWidth: '16px',
                              border: `2px solid ${isSelected ? '#D4AF37' : '#404040'}`,
                              borderRadius: '4px',
                              backgroundColor: isSelected ? '#D4AF37' : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '0.6rem', color: '#0F0F10', fontWeight: 900,
                            }}>
                              {isSelected ? '✓' : ''}
                            </span>
                            <span style={{ color: isSelected ? '#FFFFFF' : '#B8B8BA', fontSize: '0.82rem', lineHeight: 1.3 }}>
                              {ingredient.name}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
      </div>

      {/* Sem resultados */}
      {Object.keys(grouped).length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#808080' }}>
          <p style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</p>
          <p>Nenhum ingrediente encontrado para "{search}"</p>
        </div>
      )}
    </div>
  )
}
