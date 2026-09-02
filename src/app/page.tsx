'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Heart, Info, BookMarked, Home as HomeIcon } from 'lucide-react'
import { useIngredients, useDrinks, usePantry, useFavorites } from '@/hooks/useData'
import { DiscoverScreen } from '@/features/discover/DiscoverScreen'
import { CatalogScreen } from '@/features/catalog/CatalogScreen'
import { FavoritesScreen } from '@/features/favorites/FavoritesScreen'
import { SplashScreen } from '@/components/SplashScreen'
import { AboutModal } from '@/components/AboutModals'
import { AgeGate } from '@/components/AgeGate'
import { GuideModal } from '@/components/GuideModal'
import { DrinkModal } from '@/components/DrinkModal'

type Tab = 'home' | 'discover' | 'catalog' | 'favorites'
const SPLASH_KEY = 'drinkmaster_splash_shown'
const AGE_KEY    = 'drinkmaster_age_confirmed'

export default function Home() {
  const [tab, setTab] = useState<Tab>('home')
  const [splashDone, setSplashDone]       = useState(false)
  const [splashChecked, setSplashChecked] = useState(false)
  const [ageConfirmed, setAgeConfirmed]   = useState(false)
  const [ageChecked, setAgeChecked]       = useState(false)
  const [showAbout, setShowAbout]         = useState(false)
  const [showGuide, setShowGuide]         = useState(false)
  const [deepLinkDrink, setDeepLinkDrink]   = useState<any>(null)

  useEffect(() => {
    if (sessionStorage.getItem(SPLASH_KEY) === 'true') setSplashDone(true)
    if (localStorage.getItem(AGE_KEY) === 'true') setAgeConfirmed(true)
    setSplashChecked(true)
    setAgeChecked(true)
  }, [])

  const { ingredients, isLoading: loadingIng }   = useIngredients()
  const { drinks, isLoading: loadingDrinks }      = useDrinks()
  const { selected, toggle, clear, count }        = usePantry()
  const { favorites, toggle: toggleFav, count: favCount } = useFavorites()

  const isLoading = loadingIng || loadingDrinks

  // Deep link — abre modal do drink se ?drink= na URL
  useEffect(() => {
    if (!drinks.length) return
    const params = new URLSearchParams(window.location.search)
    const drinkName = params.get('drink')
    if (drinkName) {
      const found = drinks.find(d => d.name.toLowerCase() === decodeURIComponent(drinkName).toLowerCase())
      if (found) {
        setDeepLinkDrink(found)
        setTab('catalog')
      }
    }
  }, [drinks])

  const handleSplashFinish = () => {
    sessionStorage.setItem(SPLASH_KEY, 'true')
    setSplashDone(true)
  }

  const handleAgeConfirm = () => {
    localStorage.setItem(AGE_KEY, 'true')
    setAgeConfirmed(true)
  }

  const tabs = [
    { key: 'home'      as Tab, icon: HomeIcon,     label: 'Início'    },
    { key: 'catalog'   as Tab, icon: BookOpen,  label: 'Catálogo'  },
    { key: 'favorites' as Tab, icon: Heart,     label: 'Favoritos', badge: favCount },
  ]

  if (!splashChecked || !ageChecked) return null
  if (!ageConfirmed) return <AgeGate onConfirm={handleAgeConfirm} />

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}>

      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}
      {deepLinkDrink && (
        <DrinkModal
          drink={deepLinkDrink}
          isFavorite={favorites.includes(deepLinkDrink.id)}
          onToggleFavorite={() => toggleFav(deepLinkDrink.id)}
          onClose={() => {
            setDeepLinkDrink(null)
            window.history.replaceState({}, '', '/')
          }}
        />
      )}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} onOpenGuide={() => { setShowAbout(false); setShowGuide(true) }} />}
      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: 'var(--bg-overlay)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
          <button onClick={() => setShowAbout(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
            <img src="/icon-192.png" alt="DrinkMaster" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
            <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              Drink<span style={{ color: 'var(--gold)' }}>Master</span>
            </span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!isLoading && <span style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem' }}>{drinks.length} drinks</span>}
            {count > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'var(--gold-muted)', border: '1px solid var(--gold-border)', borderRadius: '9999px', padding: '3px 10px' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/></svg>
                <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700 }}>{count}</span>
              </div>
            )}
            <button onClick={() => setShowGuide(true)} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: '4px', opacity: 0.6 }}>
              <BookMarked size={16} color="var(--text-secondary)" />
            </button>
            <button onClick={() => setShowAbout(true)} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: '4px', opacity: 0.6 }}>
              <Info size={16} color="var(--text-secondary)" />
            </button>
          </div>
        </div>
      </header>

      {/* Loading */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <img src="/icon-192.png" alt="" style={{ width: '56px', height: '56px', borderRadius: '14px', margin: '0 auto 16px', display: 'block', opacity: 0.7 }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Preparando o bar...</p>
        </div>
      )}

      {/* Conteúdo */}
      {!isLoading && (
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>

          {/* HOME — Tela intermediária */}
          {tab === 'home' && (
            <div style={{ padding: '40px 24px 120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Ícone */}
              <img src="/icon-192.png" alt="DrinkMaster" style={{ width: '80px', height: '80px', borderRadius: '20px', marginBottom: '16px', boxShadow: '0 8px 32px rgba(245,158,11,0.2)' }} />

              {/* Título */}
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 900, marginBottom: '6px', letterSpacing: '-0.03em' }}>
                Bem-vindo!
              </h1>

              {/* Linha dourada */}
              <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--gold)', borderRadius: '9999px', marginBottom: '12px', opacity: 0.6 }} />

              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--gold-muted)', border: '1px solid var(--gold-border)', borderRadius: '9999px', padding: '5px 14px', marginBottom: '32px' }}>
                <span style={{ fontSize: '0.75rem' }}>✨</span>
                <span style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>O que você quer fazer hoje?</span>
              </div>

              {/* Botão Ver Drinks → Catálogo */}
              <button
                onClick={() => setTab('catalog')}
                style={{
                  width: '100%', padding: '18px 20px',
                  background: 'linear-gradient(135deg, var(--gold), #D97706)',
                  border: 'none', borderRadius: '16px',
                  cursor: 'pointer', marginBottom: '12px',
                  display: 'flex', alignItems: 'center', gap: '14px',
                  boxShadow: '0 4px 24px rgba(245,158,11,0.3)',
                  transition: 'transform 0.1s ease',
                }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                  📖
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ color: '#121214', fontSize: '1rem', fontWeight: 800, margin: 0 }}>Ver Drinks</p>
                  <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.78rem', margin: '2px 0 0' }}>Explore o catálogo com {drinks.length} receitas</p>
                </div>
                <div style={{ marginLeft: 'auto', color: 'rgba(0,0,0,0.4)', fontSize: '1.2rem' }}>→</div>
              </button>

              {/* Botão Meu Bar → Descobrir */}
              <button
                onClick={() => setTab('discover')}
                style={{
                  width: '100%', padding: '18px 20px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '16px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '14px',
                  transition: 'transform 0.1s ease',
                }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'var(--gold-muted)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                  🧂
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800, margin: 0 }}>Meu Bar</p>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.78rem', margin: '2px 0 0' }}>Descubra drinks com o que você tem</p>
                </div>
                <div style={{ marginLeft: 'auto', color: 'var(--text-tertiary)', fontSize: '1.2rem' }}>→</div>
              </button>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '32px', width: '100%' }}>
                {[
                  { label: 'Drinks', value: drinks.length + '+' },
                  { label: 'Ingredientes', value: '136' },
                  { label: 'Favoritos', value: favCount },
                ].map(s => (
                  <div key={s.label} style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{s.value}</p>
                    <p style={{ color: 'var(--text-tertiary)', fontSize: '0.68rem', margin: '3px 0 0' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'discover' && (
            <DiscoverScreen drinks={drinks} ingredients={ingredients} selected={selected} onToggle={toggle} onClear={clear} favorites={favorites} onToggleFavorite={toggleFav} />
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
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'var(--bg-overlay)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid var(--border-subtle)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex' }}>
          {tabs.map(t => {
            const isActive = tab === t.key
            const Icon = t.icon
            return (
              <button key={t.key} onClick={() => setTab(t.key)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 0', gap: '3px', position: 'relative', border: 'none', background: 'none', cursor: 'pointer', opacity: isActive ? 1 : 0.45, transition: 'opacity 0.15s ease' }}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} color={isActive ? 'var(--gold)' : 'var(--text-secondary)'} fill={isActive && t.key === 'favorites' ? 'var(--gold)' : 'none'} />
                <span style={{ fontSize: '0.65rem', fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--gold)' : 'var(--text-secondary)' }}>{t.label}</span>
                {t.badge && t.badge > 0 && (
                  <span style={{ position: 'absolute', top: '6px', right: 'calc(50% - 20px)', backgroundColor: 'var(--wine)', color: '#F4F4F5', fontSize: '0.5rem', fontWeight: 800, width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.badge > 9 ? '9+' : t.badge}</span>
                )}
                {isActive && <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '20px', height: '2px', backgroundColor: 'var(--gold)', borderRadius: '9999px' }} />}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}