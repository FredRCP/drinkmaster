'use client'

interface ScoreBarProps {
  score: number
}

export function ScoreBar({ score }: ScoreBarProps) {
  const color =
    score === 100 ? '#10B981' :
    score >= 66   ? '#D4AF37' :
    score >= 33   ? '#F59E0B' : '#EF4444'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          flex: 1,
          height: '4px',
          backgroundColor: '#2D2D2F',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${score}%`,
            backgroundColor: color,
            borderRadius: '9999px',
            transition: 'width 0.5s ease',
          }}
        />
      </div>
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color,
          minWidth: '36px',
          textAlign: 'right',
        }}
      >
        {score}%
      </span>
    </div>
  )
}
