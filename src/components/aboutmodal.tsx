'use client'

interface AboutModalProps {
  onClose: () => void
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-end',
        padding: '0',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '560px', margin: '0 auto',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '20px 20px 0 0',
          border: '1px solid var(--border-subtle)',
          padding: '28px 24px 48px',
        }}
      >
        {/* Handle */}
        <div style={{ width: '36px', height: '4px', backgroundColor: 'var(--border-default)', borderRadius: '9999px', margin: '0 auto 24px' }} />

        {/* Ícone + Nome */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img src="/icon-192.png" alt="DrinkMaster" style={{ width: '72px', height: '72px', borderRadius: '18px', marginBottom: '14px', boxShadow: '0 4px 20px rgba(245,158,11,0.2)' }} />
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 900, marginBottom: '4px' }}>
            Drink<span style={{ color: 'var(--gold)' }}>Master</span>
          </h2>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Cocktail Discovery App
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px', marginBottom: '28px',
        }}>
          {[
            { label: 'Drinks', value: '185+' },
            { label: 'Ingredientes', value: '136' },
            { label: 'Categorias', value: '8' },
          ].map(stat => (
            <div key={stat.label} style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px', padding: '12px 8px',
              textAlign: 'center',
            }}>
              <p style={{ color: 'var(--gold)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '2px' }}>
                {stat.value}
              </p>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Descrição */}
        <div style={{
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px', padding: '16px',
          marginBottom: '24px',
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
            Descubra drinks incríveis com os ingredientes que você já tem em casa. Selecione o que tem no bar, veja seu Drink Score™ e prepare coquetéis com o Modo Barman.
          </p>
        </div>

        {/* RCP Creative */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px', marginBottom: '16px',
        }}>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>
              Desenvolvido por
            </p>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 800 }}>
              RCP Creative
            </p>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem', marginTop: '2px' }}>
              Frederico Rodrigues · Uberaba, MG
            </p>
          </div>
          <div style={{
            width: '44px', height: '44px',
            backgroundColor: 'var(--gold-muted)',
            border: '1px solid var(--gold-border)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem',
          }}>
            🍸
          </div>
        </div>

        {/* Versão */}
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.68rem', textAlign: 'center', opacity: 0.6 }}>
          DrinkMaster v1.0 · {new Date().getFullYear()} · Todos os direitos reservados
        </p>

        {/* Fechar */}
        <button
          onClick={onClose}
          style={{
            width: '100%', marginTop: '20px', padding: '13px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: '12px',
            color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  )
}