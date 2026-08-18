'use client'

import { useState, useMemo } from 'react'
import { Search, X, ChevronDown, Wine } from 'lucide-react'
import { Drink, Ingredient, CATEGORY_ICONS, CATEGORY_LABELS } from '@/types'
import { matchDrinks, filterDrinksByIngredients } from '@/lib/drinkScore'
import { DrinkCard } from '@/components/DrinkCard'
import { DrinkModal } from '@/components/DrinkModal'

interface DiscoverScreenProps {
  drinks: Drink[]
  ingredients: Ingredient[]
  selected: string[]
  onToggle: (id: string) => void
  onClear: () => void
  favorites: string[]
  onToggleFavorite: (id: string) => void
}

const RESULT_PILLS = [
  { label: 'Todos',          value: 'all' },
  { label: '✅ Pode fazer',   value: 'can_make' },
  { label: '⚡ Falta 1',      value: 'one_missing' },
  { label: '🇧🇷 Brasileiros', value: 'brasileiro' },
  { label: '🍹 Tropicais',    value: 'tropical' },
  { label: '🧃 Sem Álcool',   value: 'sem-álcool' },
  { label: '🍦 Cremosos',     value: 'cremoso' },
  { label: '🥃 Shots',        value: 'shot' },
]

export function DiscoverScreen({ drinks, ingredients, selected, onToggle, onClear, favorites, onToggleFavorite }: DiscoverScreenProps) {
  const [search, setSearch] = useState('')
  const [openCats, setOpenCats] = useState<Set<string>>(new Set(['spirit', 'fresh', 'mixer']))
  const [view, setView] = useState<'ingredients' | 'results'>('ingredients')
  const [selectedDrink, setSelectedDrink] = useState<any>(null)
  const [resultFilter, setResultFilter] = useState('all')
  const [strictMode, setStrictMode] = useState(false)

  const grouped = useMemo(() => {
    const filtered = ingredients.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    const map: Record<string, Ingredient[]> = {}
    for (const ing of filtered) {
      const cat = ing.category || 'other'
      if (!map[cat]) map[cat] = []
      map[cat].push(ing)
    }
    return map
  }, [ingredients, search])

  const allMatches = useMemo(() => 
    strictMode 
      ? filterDrinksByIngredients(drinks, selected)
      : matchDrinks(drinks, selected),
    [drinks, selected, strictMode]
  )

  const filteredMatches = useMemo(() => {
    if (resultFilter === 'all') return allMatches
    if (resultFilter === 'can_make') return allMatches.filter(m => m.canMake)
    if (resultFilter === 'one_missing') return allMatches.filter(m => !m.canMake && m.missing.length === 1)
    return allMatches.filter(m => (m.drink as any).tags?.includes(resultFilter))
  }, [allMatches, resultFilter])

  const canMake = filteredMatches.filter(m => m.canMake)
  const almostThere = filteredMatches.filter(m => !m.canMake && m.missing.length === 1)
  const others = filteredMatches.filter(m => !m.canMake && m.missing.length > 1)

  const catOrder = ['spirit', 'liqueur', 'fresh', 'juice', 'mixer', 'syrup', 'other']

  const toggleCat = (cat: string) => {
    setOpenCats(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  const handleToggle = (id: string) => {
    if (navigator.vibrate) navigator.vibrate(8)
    onToggle(id)
  }

  return (
    <div style={{ paddingBottom: '100px' }}>
      <div style={{ padding: '16px 16px 0' }}>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '4px',
          backgroundColor: 'var(--bg-elevated)',
          borderRadius: 'var(--radius-md)',
          padding: '4px', marginBottom: '16px',
        }}>
          {[
            { key: 'ingredients', label: 'Ingredientes' },
            { key: 'results',     label: `Drinks ${allMatches.length > 0 ? `(${allMatches.length})` : ''}` },
          ].map((t) => (
            <button key={t.key} onClick={() => setView(t.key as any)} style={{
              flex: 1, padding: '8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: view === t.key ? 'var(--bg-card)' : 'transparent',
              color: view === t.key ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: '0.85rem', fontWeight: view === t.key ? 600 : 400,
              border: view === t.key ? '1px solid var(--border-default)' : '1px solid transparent',
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}>{t.label}</button>
          ))}
        </div>

        {/* Pill ingredientes selecionados */}
        {selected.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              backgroundColor: 'var(--gold-muted)', border: '1px solid var(--gold-border)',
              borderRadius: '9999px', padding: '4px 12px',
            }}>
              <Wine size={12} color="#D4AF37" />
              <span style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>
                {selected.length} ingrediente{selected.length !== 1 ? 's' : ''} no bar
              </span>
            </div>
            <button onClick={onClear} style={{
              color: 'var(--text-tertiary)', fontSize: '0.78rem',
              textDecoration: 'underline', cursor: 'pointer', border: 'none', background: 'none',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <X size={12} /> Limpar
            </button>
          </div>
        )}
      {/* Toggle modo estrito */}
      {selected.length > 1 && (
        <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '12px' }}>
          <button
            onClick={() => setStrictMode(!strictMode)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              width: '100%', padding: '10px 14px',
              backgroundColor: strictMode ? 'rgba(56,139,253,0.1)' : 'var(--bg-elevated)',
              border: `1px solid ${strictMode ? '#388BFD' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-md)', cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {/* Toggle pill */}
            <div style={{
              width: '36px', height: '20px', borderRadius: '9999px',
              backgroundColor: strictMode ? '#388BFD' : 'var(--border-default)',
              position: 'relative', transition: 'background-color 0.2s ease',
              flexShrink: 0,
            }}>
              <div style={{
                position: 'absolute', top: '2px',
                left: strictMode ? '18px' : '2px',
                width: '16px', height: '16px', borderRadius: '50%',
                backgroundColor: '#fff',
                transition: 'left 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ color: strictMode ? '#388BFD' : 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                Modo Exato
              </p>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem', margin: 0 }}>
                {strictMode
                  ? 'Mostrando drinks que usam TODOS os ingredientes selecionados'
                  : 'Mostrando drinks com qualquer ingrediente selecionado'}
              </p>
            </div>
          </button>
        </div>
      )}
      </div>

      {/* INGREDIENTES */}
      {view === 'ingredients' && (
        <div style={{ padding: '0 16px' }}>
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <Search size={16} color="#8B949E" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text" placeholder="Buscar ingrediente..."
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {catOrder.filter(cat => grouped[cat]?.length > 0).map(cat => {
              const items = grouped[cat]
              const isOpen = openCats.has(cat)
              const selCount = items.filter(i => selected.includes(i.id)).length

              return (
                <div key={cat} style={{
                  backgroundColor: 'var(--bg-card)',
                  border: `1px solid ${selCount > 0 ? 'var(--border-default)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)', overflow: 'hidden',
                }}>
                  <button onClick={() => toggleCat(cat)} style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', padding: '12px 14px',
                    cursor: 'pointer', border: 'none', background: 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1rem' }}>{CATEGORY_ICONS[cat] || '📦'}</span>
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 600 }}>
                        {CATEGORY_LABELS[cat] || cat}
                      </span>
                      {selCount > 0 && (
                        <span style={{
                          backgroundColor: 'var(--gold)', color: 'var(--text-inverse)',
                          fontSize: '0.65rem', fontWeight: 800, padding: '1px 7px', borderRadius: '9999px',
                        }}>{selCount}</span>
                      )}
                    </div>
                    <ChevronDown
                      size={16} color="#484F58"
                      style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>

                  {isOpen && (
                    <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '8px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '5px' }}>
                        {items.map(ing => {
                          const isSel = selected.includes(ing.id)
                          return (
                            <button key={ing.id} onClick={() => handleToggle(ing.id)} style={{
                              display: 'flex', alignItems: 'center', gap: '8px',
                              padding: '8px 10px',
                              backgroundColor: isSel ? 'var(--gold-muted)' : 'transparent',
                              border: `1px solid ${isSel ? 'var(--gold-border)' : 'var(--border-subtle)'}`,
                              borderRadius: 'var(--radius-sm)',
                              transition: 'all 0.12s ease', textAlign: 'left',
                              width: '100%', cursor: 'pointer',
                            }}>
                              {/* Checkbox customizado */}
                              <span style={{
                                width: '15px', height: '15px', minWidth: '15px',
                                border: `2px solid ${isSel ? 'var(--gold)' : 'var(--border-emphasis)'}`,
                                borderRadius: '4px',
                                backgroundColor: isSel ? 'var(--gold)' : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.55rem', color: 'var(--text-inverse)', fontWeight: 900,
                              }}>
                                {isSel ? '✓' : ''}
                              </span>
                              <span style={{ color: isSel ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.3 }}>
                                {ing.name}
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
        </div>
      )}

      {/* RESULTADOS */}
      {view === 'results' && (
        <div style={{ padding: '0 16px' }}>
          {selected.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Wine size={40} color="#484F58" style={{ margin: '0 auto 12px', display: 'block' }} />
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>Selecione ingredientes primeiro</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Volte à aba de ingredientes</p>
            </div>
          ) : (
            <>
              {/* Pills de filtro */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '12px', scrollbarWidth: 'none' }}>
                {RESULT_PILLS.map(pill => {
                  const isActive = resultFilter === pill.value
                  return (
                    <button key={pill.value} onClick={() => setResultFilter(pill.value)} style={{
                      padding: '5px 12px', borderRadius: '9999px', whiteSpace: 'nowrap',
                      backgroundColor: isActive ? 'rgba(212,175,55,0.15)' : 'transparent',
                      border: `1px solid ${isActive ? 'var(--gold)' : 'var(--border-subtle)'}`,
                      color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                      fontSize: '0.75rem', fontWeight: isActive ? 700 : 400,
                      cursor: 'pointer', transition: 'all 0.15s ease',
                    }}>{pill.label}</button>
                  )
                })}
              </div>

              {filteredMatches.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <Search size={32} color="#484F58" style={{ margin: '0 auto 8px', display: 'block' }} />
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Nenhum resultado para esse filtro</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {canMake.length > 0 && (
                    <section>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3FB950', flexShrink: 0 }} />
                        <h3 style={{ color: '#3FB950', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                          Pode fazer agora
                        </h3>
                        <span style={{ backgroundColor: 'rgba(63,185,80,0.12)', color: '#3FB950', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
                          {canMake.length}
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {canMake.map(m => <DrinkCard key={m.drink.id} drink={m.drink} score={m.score} isFavorite={favorites.includes(m.drink.id)} onClick={() => setSelectedDrink(m)} />)}
                      </div>
                    </section>
                  )}

                  {almostThere.length > 0 && (
                    <section>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D4AF37', flexShrink: 0 }} />
                        <h3 style={{ color: 'var(--gold)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                          Falta apenas 1 ingrediente
                        </h3>
                        <span style={{ backgroundColor: 'var(--gold-muted)', color: 'var(--gold)', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
                          {almostThere.length}
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {almostThere.map(m => <DrinkCard key={m.drink.id} drink={m.drink} score={m.score} missing={m.missing.map(i => i.name)} isFavorite={favorites.includes(m.drink.id)} onClick={() => setSelectedDrink(m)} />)}
                      </div>
                    </section>
                  )}

                  {others.length > 0 && (
                    <section>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B949E', flexShrink: 0 }} />
                        <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                          Outros matches
                        </h3>
                        <span style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-secondary)', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
                          {others.length}
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {others.map(m => <DrinkCard key={m.drink.id} drink={m.drink} score={m.score} missing={m.missing.map(i => i.name)} isFavorite={favorites.includes(m.drink.id)} onClick={() => setSelectedDrink(m)} />)}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {selectedDrink && (
        <DrinkModal
          drink={selectedDrink.drink} score={selectedDrink.score}
          missing={selectedDrink.missing?.map((i: any) => i.name)}
          isFavorite={favorites.includes(selectedDrink.drink.id)}
          onToggleFavorite={() => onToggleFavorite(selectedDrink.drink.id)}
          onClose={() => setSelectedDrink(null)}
        />
      )}

      {/* Botão flutuante */}
      {view === 'ingredients' && selected.length > 0 && (
        <div style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 40 }}>
          <button onClick={() => setView('results')} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px',
            backgroundColor: 'var(--gold)', color: 'var(--text-inverse)',
            border: 'none', borderRadius: '9999px',
            fontSize: '0.9rem', fontWeight: 700,
            boxShadow: '0 4px 24px rgba(212,175,55,0.4)',
            whiteSpace: 'nowrap', cursor: 'pointer',
          }}>
            <Wine size={16} color="#0D1117" />
            Ver {allMatches.length} drink{allMatches.length !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  )
}