'use client'

import { useEffect, useState, useRef } from 'react'
import { Drink, getDrinkImage, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/types'

interface BartenderModeProps {
  drink: Drink
  onClose: () => void
}

export function BartenderMode({ drink, onClose }: BartenderModeProps) {
  const image = getDrinkImage(drink)
  const diffColor = DIFFICULTY_COLORS[drink.difficulty]
  const diffLabel = DIFFICULTY_LABELS[drink.difficulty]

  // Parseia os passos do instructions (separados por \n)
  const steps = drink.instructions
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0)

  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [currentStep, setCurrentStep] = useState(0)
  const [wakeLockActive, setWakeLockActive] = useState(false)
  const wakeLockRef = useRef<any>(null)

  const totalSteps = steps.length
  const progress = totalSteps > 0 ? Math.round((completedSteps.size / totalSteps) * 100) : 0
  const isFinished = completedSteps.size === totalSteps

  // Wake Lock API — mantém tela ligada
  useEffect(() => {
    async function requestWakeLock() {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen')
          setWakeLockActive(true)
          wakeLockRef.current.addEventListener('release', () => {
            setWakeLockActive(false)
          })
        }
      } catch (err) {
        console.log('Wake Lock não disponível:', err)
      }
    }

    requestWakeLock()

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release()
      }
    }
  }, [])

  // Re-ativa Wake Lock quando volta pro tab
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && !wakeLockActive) {
        try {
          if ('wakeLock' in navigator) {
            wakeLockRef.current = await (navigator as any).wakeLock.request('screen')
            setWakeLockActive(true)
          }
        } catch {}
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [wakeLockActive])

  const toggleStep = (index: number) => {
    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(10)

    setCompletedSteps(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
        // Avança pro próximo passo automaticamente
        if (index < totalSteps - 1) {
          setTimeout(() => setCurrentStep(index + 1), 300)
        }
      }
      return next
    })
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 9999,
      backgroundColor: '#0A0A0B',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Hero com imagem */}
      <div style={{ position: 'relative', height: '200px', flexShrink: 0 }}>
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
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(10,10,11,0.95) 100%)',
        }} />

        {/* Botão fechar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', left: '16px',
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#fff', fontSize: '0.85rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
          }}
        >✕</button>

        {/* Wake Lock indicator */}
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          display: 'flex', alignItems: 'center', gap: '5px',
          backgroundColor: 'rgba(0,0,0,0.6)',
          border: `1px solid ${wakeLockActive ? 'rgba(63,185,80,0.4)' : 'rgba(139,148,158,0.3)'}`,
          borderRadius: '9999px', padding: '4px 10px',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            backgroundColor: wakeLockActive ? '#3FB950' : '#8B949E',
            flexShrink: 0,
          }} />
          <span style={{ color: wakeLockActive ? '#3FB950' : '#8B949E', fontSize: '0.65rem', fontWeight: 600 }}>
            {wakeLockActive ? 'Tela ativa' : 'Wake Lock off'}
          </span>
        </div>

        {/* Nome do drink */}
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.65rem', color: '#D4AF37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              🍸 Modo Barman
            </span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
            {drink.name}
          </h1>
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '0.7rem', color: diffColor, backgroundColor: `${diffColor}22`, padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>
              {diffLabel}
            </span>
            <span style={{ fontSize: '0.7rem', color: '#8B949E', backgroundColor: 'rgba(139,148,158,0.12)', padding: '2px 8px', borderRadius: '9999px' }}>
              ⏱ {drink.preparation_time_minutes} min
            </span>
            {drink.alcohol_content && (
              <span style={{ fontSize: '0.7rem', color: '#8B949E', backgroundColor: 'rgba(139,148,158,0.12)', padding: '2px 8px', borderRadius: '9999px' }}>
                🍷 {drink.alcohol_content}% ABV
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ flex: 1, padding: '20px 16px 40px' }}>

        {/* Barra de progresso */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: '#8B949E', fontSize: '0.78rem' }}>
              {completedSteps.size} de {totalSteps} passos
            </span>
            <span style={{ color: progress === 100 ? '#3FB950' : '#D4AF37', fontSize: '0.78rem', fontWeight: 700 }}>
              {progress}%
            </span>
          </div>
          <div style={{ height: '4px', backgroundColor: '#21262D', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: progress === 100 ? '#3FB950' : '#D4AF37',
              borderRadius: '9999px',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>

        {/* Ingredientes (colapsável) */}
        <details style={{ marginBottom: '20px' }}>
          <summary style={{
            color: '#8B949E', fontSize: '0.72rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            cursor: 'pointer', marginBottom: '8px', listStyle: 'none',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <span>📋 Ingredientes</span>
            <span style={{ fontSize: '0.65rem' }}>▾</span>
          </summary>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px' }}>
            {drink.drink_ingredients
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((di) => (
                <div key={di.ingredient_id} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: '#161B22',
                  borderRadius: '8px',
                  border: '1px solid #21262D',
                }}>
                  <span style={{ color: '#E6EDF3', fontSize: '0.85rem' }}>
                    {di.ingredient.name}
                    {di.is_optional && <span style={{ color: '#484F58', fontSize: '0.72rem' }}> (opcional)</span>}
                  </span>
                  <span style={{ color: '#484F58', fontSize: '0.8rem' }}>
                    {di.quantity} {di.unit}
                  </span>
                </div>
              ))}
          </div>
        </details>

        {/* Passos */}
        <div>
          <p style={{ color: '#8B949E', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
            Modo de Preparo
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {steps.map((step, index) => {
              const isDone = completedSteps.has(index)
              const isCurrent = index === currentStep && !isDone
              const isLocked = index > currentStep && !completedSteps.has(index - 1) && index !== 0

              return (
                <button
                  key={index}
                  onClick={() => toggleStep(index)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '14px',
                    padding: '16px',
                    backgroundColor: isDone
                      ? 'rgba(63,185,80,0.06)'
                      : isCurrent
                      ? 'rgba(212,175,55,0.06)'
                      : '#161B22',
                    border: `1px solid ${
                      isDone ? 'rgba(63,185,80,0.25)'
                      : isCurrent ? 'rgba(212,175,55,0.3)'
                      : '#21262D'
                    }`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.2s ease',
                    opacity: isLocked ? 0.4 : 1,
                  }}
                >
                  {/* Número / Check */}
                  <div style={{
                    width: '32px', height: '32px', minWidth: '32px',
                    borderRadius: '50%',
                    backgroundColor: isDone
                      ? '#3FB950'
                      : isCurrent
                      ? 'rgba(212,175,55,0.2)'
                      : '#21262D',
                    border: `2px solid ${
                      isDone ? '#3FB950'
                      : isCurrent ? '#D4AF37'
                      : '#30363D'
                    }`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}>
                    {isDone ? (
                      <span style={{ color: '#0D1117', fontSize: '0.85rem', fontWeight: 900 }}>✓</span>
                    ) : (
                      <span style={{ color: isCurrent ? '#D4AF37' : '#8B949E', fontSize: '0.8rem', fontWeight: 700 }}>
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Texto do passo */}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      color: isDone ? '#484F58' : '#E6EDF3',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      textDecoration: isDone ? 'line-through' : 'none',
                      transition: 'all 0.2s ease',
                      margin: 0,
                    }}>
                      {/* Remove o número inicial se existir (ex: "1. Faça isso") */}
                      {step.replace(/^\d+\.\s*/, '')}
                    </p>
                    {isCurrent && !isDone && (
                      <p style={{ color: '#D4AF37', fontSize: '0.7rem', fontWeight: 600, marginTop: '6px', margin: '6px 0 0' }}>
                        👆 Toque quando concluir
                      </p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tela de conclusão */}
        {isFinished && (
          <div style={{
            marginTop: '32px',
            padding: '24px',
            backgroundColor: 'rgba(63,185,80,0.08)',
            border: '1px solid rgba(63,185,80,0.3)',
            borderRadius: '16px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '3rem', marginBottom: '12px' }}>🍸</p>
            <h2 style={{ color: '#3FB950', fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>
              Drink pronto!
            </h2>
            <p style={{ color: '#8B949E', fontSize: '0.88rem', marginBottom: '20px' }}>
              Seu {drink.name} está pronto para ser apreciado!
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '12px 32px',
                backgroundColor: '#3FB950',
                color: '#0D1117',
                border: 'none', borderRadius: '9999px',
                fontSize: '0.9rem', fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Saúde! 🥂
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
