export default function HUDPanel({ children, accent = 'var(--toxic)', label, emoji, style = {} }) {
  return (
    <div
      className='flicker'
      style={{
        border: `1px solid ${accent}44`,
        background: 'var(--bg2)',
        position: 'relative',
        padding: '24px 24px 24px 32px',
        marginBottom: '4px',
        animation: 'heartbeat 4s ease-in-out infinite, flicker 6s infinite',
        ...style,
      }}
    >

      {/* left accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '3px',
        height: '100%',
        background: accent,
        boxShadow: `0 0 12px ${accent}, 0 0 24px ${accent}66`,
        animation: 'heartbeat 4s ease-in-out infinite',
      }} />

      {/* top corner brackets */}
      <div style={{
        position: 'absolute',
        top: '6px', right: '10px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        color: accent,
        opacity: 0.4,
        letterSpacing: '2px',
      }}>
        ██
      </div>

      {/* label */}
      {label && (
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: accent,
          opacity: 0.8,
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          {emoji && <span style={{ fontSize: '14px' }}>{emoji}</span>}
          // {label}
        </div>
      )}

      {/* scanner line */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        opacity: 0.6,
        animation: 'scanner 3s linear infinite',
        pointerEvents: 'none',
      }} />

      {children}
    </div>
  )
}