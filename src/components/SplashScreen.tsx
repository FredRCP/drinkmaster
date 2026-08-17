'use client'

import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [phase, setPhase] = useState<'intro' | 'tagline' | 'exit'>('intro')

  useEffect(() => {
    // Fase 1: logo aparece
    const t1 = setTimeout(() => setPhase('tagline'), 1200)
    // Fase 2: tagline aparece
    const t2 = setTimeout(() => setPhase('exit'), 2800)
    // Fase 3: sai
    const t3 = setTimeout(() => onFinish(), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onFinish])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: '#0A0A0B',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
      opacity: phase === 'exit' ? 0 : 1,
      transition: phase === 'exit' ? 'opacity 0.5s ease' : 'none',
    }}>

      {/* Fundo com gradiente sutil */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Ícone da taça */}
      <div style={{
        opacity: phase === 'intro' ? 0 : 1,
        transform: phase === 'intro' ? 'translateY(20px) scale(0.8)' : 'translateY(0) scale(1)',
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        marginBottom: '20px',
      }}>
        <svg
          width="64" height="64"
          viewBox="0 0 24 24" fill="none"
          stroke="#D4AF37" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M8 22H16"/>
          <path d="M12 11V22"/>
          <path d="M20 7L4 7"/>
          <path d="M20 2L4 2L6 9C6 10.1 7.8 11 12 11C16.2 11 18 10.1 18 9L20 2Z"/>
        </svg>
      </div>

      {/* Nome */}
      <div style={{
        opacity: phase === 'intro' ? 0 : 1,
        transform: phase === 'intro' ? 'translateY(16px)' : 'translateY(0)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
        marginBottom: '10px',
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: '#E6EDF3',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          Drink<span style={{ color: '#D4AF37' }}>Master</span>
        </h1>
      </div>

      {/* Linha dourada */}
      <div style={{
        width: phase === 'intro' ? '0px' : '40px',
        height: '2px',
        backgroundColor: '#D4AF37',
        borderRadius: '9999px',
        transition: 'width 0.5s ease 0.4s',
        marginBottom: '16px',
        opacity: 0.7,
      }} />

      {/* Tagline */}
      <p style={{
        color: '#8B949E',
        fontSize: '0.85rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        margin: 0,
        opacity: phase === 'tagline' || phase === 'exit' ? 1 : 0,
        transform: phase === 'tagline' || phase === 'exit' ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.5s ease',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}>
        Cocktail Discovery
      </p>

      {/* Ponto animado no fundo */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        display: 'flex',
        gap: '6px',
        opacity: phase === 'tagline' ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: '4px', height: '4px',
            borderRadius: '50%',
            backgroundColor: '#D4AF37',
            opacity: 0.4,
            animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
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
