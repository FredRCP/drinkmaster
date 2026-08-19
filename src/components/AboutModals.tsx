'use client'

interface AboutModalProps {
  onClose: () => void
  onOpenGuide: () => void
}

export function AboutModal({ onClose, onOpenGuide }: AboutModalProps) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 999,
      backgroundColor: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: '560px', margin: '0 auto',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '20px 20px 0 0',
        border: '1px solid var(--border-subtle)',
        padding: '28px 24px 48px',
      }}>
        <div style={{ width: '36px', height: '4px', backgroundColor: 'var(--border-default)', borderRadius: '9999px', margin: '0 auto 24px' }} />

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src="/icon-192.png" alt="DrinkMaster" style={{ width: '64px', height: '64px', borderRadius: '16px', marginBottom: '12px', boxShadow: '0 4px 20px rgba(245,158,11,0.2)' }} />
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 900, marginBottom: '4px' }}>
            Drink<span style={{ color: 'var(--gold)' }}>Master</span>
          </h2>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Cocktail Discovery App
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {[
            { label: 'Drinks', value: '185+' },
            { label: 'Ingredientes', value: '136' },
            { label: 'Categorias', value: '8' },
          ].map(stat => (
            <div key={stat.label} style={{
              backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
              borderRadius: '10px', padding: '12px 8px', textAlign: 'center',
            }}>
              <p style={{ color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '2px' }}>{stat.value}</p>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.68rem' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Guia do Bar */}
        <button onClick={onOpenGuide} style={{
          width: '100%', marginBottom: '12px', padding: '14px 16px',
          backgroundColor: 'var(--gold-muted)',
          border: '1px solid var(--gold-border)',
          borderRadius: '12px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>
              📚 Guia do Bar
            </p>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem', margin: '2px 0 0' }}>
              Glossário · Copos · Utensílios
            </p>
          </div>
          <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>→</span>
        </button>

        {/* RCP Creative */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px', marginBottom: '16px',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)', borderRadius: '12px',
        }}>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>
              Desenvolvido por
            </p>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 800 }}>RCP Creative</p>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem', marginTop: '2px' }}>
              Frederico Rodrigues · Uberaba, MG
            </p>
          </div>
          <span style={{ fontSize: '1.6rem' }}>🍸</span>
        </div>

        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.65rem', textAlign: 'center', opacity: 0.6, marginBottom: '16px' }}>
          DrinkMaster v1.0 · {new Date().getFullYear()} · Beba com responsabilidade 🔞
        </p>

        <button onClick={onClose} style={{
          width: '100%', padding: '13px',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: '12px',
          color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600,
          cursor: 'pointer',
        }}>
          Fechar
        </button>
      </div>
    </div>
  )
}
