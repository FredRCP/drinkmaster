'use client'

import { useState } from 'react'
import { Compass, BookOpen, Heart } from 'lucide-react'
import { useIngredients, useDrinks, usePantry, useFavorites } from '@/hooks/useData'
import { DiscoverScreen } from '@/features/discover/DiscoverScreen'
import { CatalogScreen } from '@/features/catalog/CatalogScreen'
import { FavoritesScreen } from '@/features/favorites/FavoritesScreen'
import { SplashScreen } from '@/components/SplashScreen'

type Tab = 'discover' | 'catalog' | 'favorites'

const SPLASH_KEY = 'barilq_splash_shown'

export default function Home() {
  const [tab, setTab] = useState<Tab>('discover')
  const [splashDone, setSplashDone] = useState(() => {
    // Só mostra splash uma vez por sessão
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(SPLASH_KEY) === 'true'
  })

  const { ingredients, isLoading: loadingIng } = useIngredients()
  const { drinks, isLoading: loadingDrinks } = useDrinks()
  const { selected, toggle, clear, count } = usePantry()
  const { favorites, toggle: toggleFav, count: favCount } = useFavorites()

  const isLoading = loadingIng || loadingDrinks

  const handleSplashFinish = () => {
    sessionStorage.setItem(SPLASH_KEY, 'true')
    setSplashDone(true)
  }

  const tabs = [
    { key: 'discover'  as Tab, icon: Compass,  label: 'Descobrir' },
    { key: 'catalog'   as Tab, icon: BookOpen,  label: 'Catálogo'  },
    { key: 'favorites' as Tab, icon: Heart,     label: 'Favoritos', badge: favCount },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}>

      {/* Splash screen — só na primeira visita da sessão */}
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: 'var(--bg-overlay)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{
          maxWidth: '640px', margin: '0 auto',
          height: '52px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 22H16"/>
              <path d="M12 11V22"/>
              <path d="M20 7L4 7"/>
              <path d="M20 2L4 2L6 9C6 10.1 7.8 11 12 11C16.2 11 18 10.1 18 9L20 2Z"/>
            </svg>
            <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              Bar<span style={{ color: 'var(--gold)' }}>IQ</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isLoading ? (
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>Carregando...</span>
            ) : (
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem' }}>
                {drinks.length} drinks · {ingredients.length} ingredientes
              </span>
            )}
            {count > 0 && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                backgroundColor: 'var(--gold-muted)',
                border: '1px solid var(--gold-border)',
                borderRadius: '9999px', padding: '3px 10px',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20"/>
                </svg>
                <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700 }}>{count}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Loading */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.6 }}>
            <path d="M8 22H16"/><path d="M12 11V22"/>
            <path d="M20 7L4 7"/>
            <path d="M20 2L4 2L6 9C6 10.1 7.8 11 12 11C16.2 11 18 10.1 18 9L20 2Z"/>
          </svg>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Preparando o bar...</p>
        </div>
      )}

      {/* Conteúdo */}
      {!isLoading && (
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          {tab === 'discover' && (
            <DiscoverScreen
              drinks={drinks} ingredients={ingredients}
              selected={selected} onToggle={toggle} onClear={clear}
              favorites={favorites} onToggleFavorite={toggleFav}
            />
          )}
          {tab === 'catalog' && (
            <CatalogScreen drinks={drinks} favorites={favorites} onToggleFavorite={toggleFav} />
          )}
          {tab === 'favorites' && (
            <FavoritesScreen drinks={drinks} favorites={favorites} onToggleFavorite={toggleFav} />
          )}
        </div>
      )}

      {/* Bottom Bar */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: 'var(--bg-overlay)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-subtle)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex' }}>
          {tabs.map((t) => {
            const isActive = tab === t.key
            const Icon = t.icon
            return (
              <button key={t.key} onClick={() => setTab(t.key)} style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '10px 0', gap: '3px', position: 'relative',
                border: 'none', background: 'none', cursor: 'pointer',
                opacity: isActive ? 1 : 0.5,
                transition: 'opacity 0.15s ease',
              }}>
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  color={isActive ? '#D4AF37' : '#8B949E'}
                  fill={isActive && t.key === 'favorites' ? '#D4AF37' : 'none'}
                />
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                }}>{t.label}</span>

                {t.badge && t.badge > 0 && (
                  <span style={{
                    position: 'absolute', top: '6px', right: 'calc(50% - 20px)',
                    backgroundColor: '#F85149', color: '#fff',
                    fontSize: '0.5rem', fontWeight: 800,
                    width: '14px', height: '14px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{t.badge > 9 ? '9+' : t.badge}</span>
                )}

                {isActive && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px', height: '2px',
                    backgroundColor: 'var(--gold)', borderRadius: '9999px',
                  }} />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
