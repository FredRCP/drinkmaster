'use client'

import { useState, useMemo, useEffect } from 'react'
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

const CAT_ORDER = ['spirit', 'liqueur', 'fresh', 'juice', 'mixer', 'syrup', 'other']

export function DiscoverScreen({ drinks, ingredients, selected, onToggle, onClear, favorites, onToggleFavorite }: DiscoverScreenProps) {
  const [search, setSearch] = useState('')
  const [openCats, setOpenCats] = useState<Set<string>>(new Set(['spirit', 'fresh', 'mixer']))
  const [view, setView] = useState<'ingredients' | 'results'>('ingredients')
  const [selectedDrink, setSelectedDrink] = useState<any>(null)
  const [resultFilter, setResultFilter] = useState('all')
  const [strictMode, setStrictMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detecta mobile — atualiza quando redimensiona
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const grouped = useMemo(() => {
    const filtered = ingredients.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
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

  const handleToggle = (id: string) => {
    if (navigator.vibrate) navigator.vibrate(8)
    onToggle(id)
  }

  const toggleCat = (cat: string) => {
    setOpenCats(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  // Renderiza ingrediente — desktop: checkbox, mobile: card grid 2 col
  const renderIngredient = (ing: Ingredient) => {
    const isSel = selected.includes(ing.id)

    if (isMobile) {
      // Mobile: card retangular com ✓ à direita
      return (
        <button
          key={ing.id}
          onClick={() => handleToggle(ing.id)}
          style={{
            padding: '9px 12px',
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: isSel ? 600 : 400,
            border: `1px solid ${isSel ? 'var(--gold)' : 'var(--border-default)'}`,
            backgroundColor: isSel ? 'var(--gold-muted)' : 'var(--bg-elevated)',
            color: isSel ? 'var(--gold)' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.12s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'left',
            width: '100%',
          }}
        >
          <span style={{ lineHeight: 1.3 }}>{ing.name}</span>
          {isSel && <span style={{ fontSize: '0.7rem', flexShrink: 0, color: 'var(--gold)' }}>✓</span>}
        </button>
      )
    }

    // Desktop: checkbox clássico
    return (
      <button
        key={ing.id}
        onClick={() => handleToggle(ing.id)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 10px',
          backgroundColor: isSel ? 'var(--gold-muted)' : 'transparent',
          border: `1px solid ${isSel ? 'var(--gold-border)' : 'var(--border-subtle)'}`,
          borderRadius: 'var(--radius-sm)',
          transition: 'all 0.12s ease', textAlign: 'left',
          width: '100%', cursor: 'pointer',
        }}
      >
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
            { key: 'ingredients', label: '🧂 Ingredientes' },
            { key: 'results', label: `🍸 Drinks${allMatches.length > 0 ? ` (${allMatches.length})` : ''}` },
          ].map(t => (
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

        {/* Selecionados */}
        {selected.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              backgroundColor: 'var(--gold-muted)', border: '1px solid var(--gold-border)',
              borderRadius: '9999px', padding: '4px 12px',
            }}>
              <Wine size={12} color="var(--gold)" />
              <span style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>
                {selected.length} ingrediente{selected.length !== 1 ? 's' : ''} selecionado{selected.length !== 1 ? 's' : ''}
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

        {/* Toggle Modo Exato */}
        {selected.length > 1 && (
          <div style={{ marginBottom: '12px' }}>
            <button
              onClick={() => setStrictMode(!strictMode)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                width: '100%', padding: '10px 14px',
                backgroundColor: strictMode ? 'var(--gold-muted)' : 'var(--bg-elevated)',
                border: `1px solid ${strictMode ? 'var(--gold-border)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)', cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{
                width: '36px', height: '20px', borderRadius: '9999px',
                backgroundColor: strictMode ? 'var(--gold)' : 'var(--border-default)',
                position: 'relative', transition: 'background-color 0.2s ease', flexShrink: 0,
              }}>
                <div style={{
                  position: 'absolute', top: '2px',
                  left: strictMode ? '18px' : '2px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  backgroundColor: '#fff', transition: 'left 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ color: strictMode ? 'var(--gold)' : 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                  Modo Exato {strictMode ? '— ativo' : ''}
                </p>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem', margin: 0 }}>
                  {strictMode
                    ? 'Drinks que usam TODOS os ingredientes selecionados'
                    : 'Ative para ver só drinks com todos os ingredientes'}
                </p>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* === INGREDIENTES === */}
      {view === 'ingredients' && (
        <div style={{ padding: '0 16px' }}>
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <Search size={16} color="#71717A" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text" placeholder="Buscar ingrediente..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '11px 36px 11px 38px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--gold)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border-default)' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <X size={14} color="#71717A" />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {CAT_ORDER.filter(cat => grouped[cat]?.length > 0).map(cat => {
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
                          backgroundColor: 'var(--gold)', color: '#121214',
                          fontSize: '0.65rem', fontWeight: 800, padding: '1px 7px', borderRadius: '9999px',
                        }}>{selCount}</span>
                      )}
                    </div>
                    <ChevronDown size={16} color="#71717A" style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
                  </button>

                  {isOpen && (
                    <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '8px' }}>
                      {/* Mobile: grid 2 col | Desktop: auto-fill com checkbox */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(140px, 1fr))',
                        gap: '5px',
                      }}>
                        {items.map(ing => renderIngredient(ing))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* === RESULTADOS === */}
      {view === 'results' && (
        <div style={{ padding: '0 16px' }}>
          {selected.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Wine size={40} color="#71717A" style={{ margin: '0 auto 12px', display: 'block' }} />
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>Selecione ingredientes primeiro</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Volte à aba de ingredientes</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '12px', scrollbarWidth: 'none' }}>
                {RESULT_PILLS.map(pill => {
                  const isActive = resultFilter === pill.value
                  return (
                    <button key={pill.value} onClick={() => setResultFilter(pill.value)} style={{
                      padding: '5px 12px', borderRadius: '9999px', whiteSpace: 'nowrap',
                      backgroundColor: isActive ? 'var(--gold-muted)' : 'transparent',
                      border: `1px solid ${isActive ? 'var(--gold-border)' : 'var(--border-subtle)'}`,
                      color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                      fontSize: '0.75rem', fontWeight: isActive ? 700 : 400,
                      cursor: 'pointer', transition: 'all 0.15s ease',
                    }}>{pill.label}</button>
                  )
                })}
              </div>

              {filteredMatches.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <Search size={32} color="#71717A" style={{ margin: '0 auto 8px', display: 'block' }} />
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Nenhum resultado para esse filtro</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {canMake.length > 0 && (
                    <section>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E', flexShrink: 0 }} />
                        <h3 style={{ color: '#22C55E', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Pode fazer agora</h3>
                        <span style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#22C55E', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>{canMake.length}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {canMake.map(m => <DrinkCard key={m.drink.id} drink={m.drink} score={m.score} isFavorite={favorites.includes(m.drink.id)} onClick={() => setSelectedDrink(m)} />)}
                      </div>
                    </section>
                  )}
                  {almostThere.length > 0 && (
                    <section>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gold)', flexShrink: 0 }} />
                        <h3 style={{ color: 'var(--gold)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Falta apenas 1</h3>
                        <span style={{ backgroundColor: 'var(--gold-muted)', color: 'var(--gold)', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>{almostThere.length}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {almostThere.map(m => <DrinkCard key={m.drink.id} drink={m.drink} score={m.score} missing={m.missing.map(i => i.name)} isFavorite={favorites.includes(m.drink.id)} onClick={() => setSelectedDrink(m)} />)}
                      </div>
                    </section>
                  )}
                  {others.length > 0 && (
                    <section>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', flexShrink: 0 }} />
                        <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Outros matches</h3>
                        <span style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-secondary)', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>{others.length}</span>
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

      {view === 'ingredients' && selected.length > 0 && (
        <div style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 40 }}>
          <button onClick={() => setView('results')} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 28px',
            backgroundColor: 'var(--gold)', color: '#121214',
            border: 'none', borderRadius: '9999px',
            fontSize: '0.9rem', fontWeight: 800,
            boxShadow: '0 4px 24px rgba(245,158,11,0.35)',
            whiteSpace: 'nowrap', cursor: 'pointer',
          }}>
            <Wine size={16} color="#121214" />
            Ver {allMatches.length} drink{allMatches.length !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  )
}