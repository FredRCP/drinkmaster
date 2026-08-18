'use client'

import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [phase, setPhase] = useState<'intro' | 'tagline' | 'exit'>('intro')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('tagline'), 1200)
    const t2 = setTimeout(() => setPhase('exit'), 2800)
    const t3 = setTimeout(() => onFinish(), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onFinish])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      backgroundColor: '#121214',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'exit' ? 0 : 1,
      transition: phase === 'exit' ? 'opacity 0.5s ease' : 'none',
    }}>

      {/* Gradiente sutil */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Ícone */}
      <div style={{
        opacity: phase === 'intro' ? 0 : 1,
        transform: phase === 'intro' ? 'translateY(20px) scale(0.8)' : 'translateY(0) scale(1)',
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        marginBottom: '20px',
      }}>
        <img src="/icon-192.png" alt="DrinkMaster" style={{ width: '72px', height: '72px', borderRadius: '18px', boxShadow: '0 8px 32px rgba(245,158,11,0.25)' }} />
      </div>

      {/* Nome */}
      <div style={{
        opacity: phase === 'intro' ? 0 : 1,
        transform: phase === 'intro' ? 'translateY(16px)' : 'translateY(0)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
        marginBottom: '10px',
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#F4F4F5', margin: 0 }}>
          Drink<span style={{ color: '#F59E0B' }}>Master</span>
        </h1>
      </div>

      {/* Linha dourada */}
      <div style={{
        width: phase === 'intro' ? '0px' : '40px',
        height: '2px', backgroundColor: '#F59E0B',
        borderRadius: '9999px',
        transition: 'width 0.5s ease 0.4s',
        marginBottom: '16px', opacity: 0.7,
      }} />

      {/* Tagline */}
      <p style={{
        color: '#71717A', fontSize: '0.85rem',
        letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0,
        opacity: phase === 'tagline' || phase === 'exit' ? 1 : 0,
        transform: phase === 'tagline' || phase === 'exit' ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.5s ease',
      }}>
        Cocktail Discovery
      </p>

      {/* Pontinhos */}
      <div style={{
        position: 'absolute', bottom: '60px',
        display: 'flex', gap: '6px',
        opacity: phase === 'tagline' ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: '4px', height: '4px', borderRadius: '50%',
            backgroundColor: '#F59E0B', opacity: 0.4,
            animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>

      {/* RCP Creative badge */}
      <div style={{
        position: 'absolute', bottom: '20px',
        opacity: phase === 'tagline' || phase === 'exit' ? 0.5 : 0,
        transition: 'opacity 0.5s ease 0.3s',
        display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        <span style={{ color: '#71717A', fontSize: '0.65rem', letterSpacing: '0.08em' }}>
          by
        </span>
        <span style={{ color: '#A1A1AA', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          RCP Creative
        </span>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}