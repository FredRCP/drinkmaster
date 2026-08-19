'use client'

import { useState } from 'react'

interface AgeGateProps {
  onConfirm: () => void
}

export function AgeGate({ onConfirm }: AgeGateProps) {
  const [denied, setDenied] = useState(false)

  if (denied) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: '#121214',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '32px',
      }}>
        <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🚫</p>
        <h2 style={{ color: '#F4F4F5', fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
          Acesso não permitido
        </h2>
        <p style={{ color: '#71717A', fontSize: '0.88rem', textAlign: 'center', lineHeight: 1.6 }}>
          O DrinkMaster é um app de coquetéis com álcool e é destinado exclusivamente a maiores de 18 anos.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      backgroundColor: '#121214',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '32px',
    }}>
      {/* Gradiente sutil */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Ícone */}
      <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🍸</div>

      {/* Logo */}
      <h1 style={{
        fontSize: '2rem', fontWeight: 900,
        letterSpacing: '-0.04em', color: '#F4F4F5',
        margin: '0 0 6px',
      }}>
        Drink<span style={{ color: '#F59E0B' }}>Master</span>
      </h1>

      {/* Linha dourada */}
      <div style={{ width: '40px', height: '2px', backgroundColor: '#F59E0B', borderRadius: '9999px', marginBottom: '28px', opacity: 0.7 }} />

      {/* Card aviso */}
      <div style={{
        width: '100%', maxWidth: '380px',
        backgroundColor: '#1C1C21',
        border: '1px solid rgba(245,158,11,0.2)',
        borderRadius: '16px',
        padding: '28px 24px',
        textAlign: 'center',
        marginBottom: '24px',
      }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          backgroundColor: 'rgba(245,158,11,0.1)',
          border: '2px solid rgba(245,158,11,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '1.6rem',
        }}>
          🔞
        </div>

        <h2 style={{ color: '#F4F4F5', fontSize: '1.15rem', fontWeight: 800, marginBottom: '10px' }}>
          Você tem 18 anos ou mais?
        </h2>

        <p style={{ color: '#A1A1AA', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0' }}>
          Este aplicativo contém conteúdo sobre bebidas alcoólicas. O consumo de álcool é permitido apenas para maiores de 18 anos.
        </p>
      </div>

      {/* Botões */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '380px' }}>
        <button
          onClick={onConfirm}
          style={{
            padding: '14px',
            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
            color: '#121214', border: 'none', borderRadius: '12px',
            fontSize: '1rem', fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(245,158,11,0.25)',
          }}
        >
          ✓ Sim, tenho 18 anos ou mais
        </button>

        <button
          onClick={() => setDenied(true)}
          style={{
            padding: '14px',
            backgroundColor: 'transparent',
            color: '#71717A', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px', fontSize: '0.9rem', cursor: 'pointer',
          }}
        >
          Não, sou menor de idade
        </button>
      </div>

      {/* Aviso legal */}
      <p style={{ color: '#52525B', fontSize: '0.65rem', textAlign: 'center', marginTop: '20px', lineHeight: 1.5, maxWidth: '320px' }}>
        Ao continuar, você declara ter 18 anos ou mais e concorda que o consumo de álcool deve ser feito com responsabilidade.
      </p>

      {/* RCP Creative */}
      <p style={{ color: '#3F3F46', fontSize: '0.65rem', marginTop: '12px' }}>
        by RCP Creative
      </p>
    </div>
  )
}
