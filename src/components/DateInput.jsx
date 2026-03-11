import { useRef, useState, useEffect } from 'react'

export default function DateInput({ onChange, nightMode }) {
  const [dd, setDd] = useState('')
  const [mm, setMm] = useState('')
  const [yyyy, setYyyy] = useState('')
  const [scanning, setScanning] = useState(false)

  const mmRef   = useRef()
  const yyyyRef = useRef()

  const accent = nightMode ? '#ff4444' : '#39ff14'
  const amber  = nightMode ? '#ff6666' : 'var(--amber)'

  useEffect(() => {
    if (dd.length === 2 && mm.length === 2 && yyyy.length === 4) {
      const iso = `${yyyy}-${mm}-${dd}`
      const date = new Date(iso)
      if (!isNaN(date.getTime()) && date <= new Date()) {
        setScanning(true)
        setTimeout(() => {
          setScanning(false)
          onChange(iso)
        }, 1800)
      }
    }
  }, [dd, mm, yyyy])

  const fieldStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${accent}`,
    color: accent,
    fontFamily: "'VT323', monospace",
    fontSize: '48px',
    width: '100%',
    textAlign: 'center',
    outline: 'none',
    padding: '4px 0',
    caretColor: accent,
    textShadow: `0 0 10px ${accent}`,
    transition: 'border-color 0.4s, color 0.4s',
  }

  const labelStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '10px',
    color: nightMode ? '#8a5a5a' : 'var(--dim2)',
    letterSpacing: '3px',
    textAlign: 'center',
    marginBottom: '6px',
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <div style={labelStyle}>DD</div>
          <input
            value={dd}
            maxLength={2}
            inputMode='numeric'
            placeholder='DD'
            style={fieldStyle}
            onChange={e => {
              const v = e.target.value.replace(/\D/g, '')
              setDd(v)
              if (v.length === 2) mmRef.current.focus()
            }}
          />
        </div>

        <div style={{ color: nightMode ? '#8a5a5a' : 'var(--dim2)', fontFamily: "'VT323', monospace", fontSize: '48px', paddingBottom: '4px' }}>
          /
        </div>

        <div style={{ flex: 1 }}>
          <div style={labelStyle}>MM</div>
          <input
            ref={mmRef}
            value={mm}
            maxLength={2}
            inputMode='numeric'
            placeholder='MM'
            style={fieldStyle}
            onChange={e => {
              const v = e.target.value.replace(/\D/g, '')
              setMm(v)
              if (v.length === 2) yyyyRef.current.focus()
            }}
          />
        </div>

        <div style={{ color: nightMode ? '#8a5a5a' : 'var(--dim2)', fontFamily: "'VT323', monospace", fontSize: '48px', paddingBottom: '4px' }}>
          /
        </div>

        <div style={{ flex: 2 }}>
          <div style={labelStyle}>YYYY</div>
          <input
            ref={yyyyRef}
            value={yyyy}
            maxLength={4}
            inputMode='numeric'
            placeholder='YYYY'
            style={fieldStyle}
            onChange={e => {
              const v = e.target.value.replace(/\D/g, '')
              setYyyy(v)
            }}
          />
        </div>
      </div>

      {scanning && (
        <div style={{
          marginTop: '24px',
          border: `1px solid ${amber}44`,
          padding: '16px',
          position: 'relative',
          overflow: 'hidden',
          background: nightMode ? 'rgba(14,3,3,0.8)' : 'var(--bg3)',
        }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, height: '2px',
            background: `linear-gradient(90deg, transparent, ${amber}, transparent)`,
            boxShadow: `0 0 12px ${amber}`,
            animation: 'scanner 0.6s linear infinite',
          }} />
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '11px', color: amber,
            letterSpacing: '3px', textAlign: 'center',
            animation: 'blink 0.8s step-end infinite',
          }}>
            ▸ ANALYZING DATA... STAND BY
          </div>
          <div style={{ marginTop: '12px', height: '4px', background: nightMode ? 'rgba(255,68,68,0.1)' : 'var(--dim)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              background: `linear-gradient(90deg, ${accent}, ${amber})`,
              boxShadow: `0 0 8px ${amber}`,
              animation: 'shimmer-in 1.8s ease forwards',
              width: '100%',
            }} />
          </div>
        </div>
      )}

      {!scanning && !dd && (
        <div style={{
          marginTop: '14px',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px', color: nightMode ? '#8a5a5a' : 'var(--dim2)',
          letterSpacing: '2px',
        }}>
          AWAITING INPUT<span className='blink'>_</span>
        </div>
      )}
    </div>
  )
}