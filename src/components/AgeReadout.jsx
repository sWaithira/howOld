import { useEffect, useRef, useState } from 'react'

// TICKING NUMBER
function TickingNumber({ value, accent = 'var(--toxic)', countUp = false }) {
  const [display, setDisplay] = useState(0)
  const [corrupted, setCorrupted] = useState(false)
  const prev = useRef(null)
  const CHARS = '!@#$%^&*01></'

  useEffect(() => {
    if (prev.current === null) {
      if (countUp) {
        let current = 0
        const increment = Math.ceil(value / 60)
        const timer = setInterval(() => {
          current += increment
          if (current >= value) {
            setDisplay(value)
            clearInterval(timer)
          } else {
            setDisplay(current)
          }
        }, 16)
        return () => clearInterval(timer)
      } else {
        setDisplay(value)
      }
    } else if (value !== prev.current) {
      setCorrupted(true)
      setDisplay(value)
      setTimeout(() => setCorrupted(false), 350)
    }
    prev.current = value
  }, [value])

  const [corruptChar, setCorruptChar] = useState('')
  useEffect(() => {
    if (!corrupted) return
    const id = setInterval(() => {
      setCorruptChar(CHARS[Math.floor(Math.random() * CHARS.length)])
    }, 40)
    return () => clearInterval(id)
  }, [corrupted])

  return (
    <span style={{
      color: corrupted ? 'var(--blood)' : accent,
      textShadow: corrupted ? '0 0 20px var(--blood)' : `0 0 10px ${accent}`,
      transition: 'color 0.15s, text-shadow 0.15s',
      fontFamily: "'VT323', monospace",
      display: 'inline-block',
      minWidth: '2ch',
    }}>
      {corrupted ? corruptChar : display}
    </span>
  )
}

// STAT CARD 
function StatCard({ label, value, accent, big = false, emoji, style = {} }) {
  return (
    <div style={{
      background: 'var(--bg3)',
      border: `1px solid ${accent}22`,
      padding: big ? '18px' : '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      {/* corner tag */}
      <div style={{
        position: 'absolute',
        top: '4px', right: '6px',
        width: '6px', height: '6px',
        background: accent,
        boxShadow: `0 0 6px ${accent}`,
        opacity: 0.6,
      }} />

      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--dim2)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        {emoji && <span>{emoji}</span>}
        {label}
      </div>

      <div style={{
        fontFamily: "'VT323', monospace",
        fontSize: big ? '52px' : '32px',
        lineHeight: 1,
        color: accent,
        textShadow: `0 0 12px ${accent}`,
      }}>
        {value}
      </div>
    </div>
  )
}

//PLANET CARD 
const PLANET_META = {
  Mercury: { emoji: '☿', color: '#a0a0a0', size: 'small' },
  Venus:   { emoji: '♀', color: 'var(--amber)', size: 'small' },
  Mars:    { emoji: '♂', color: 'var(--blood)', size: 'large' },
  Jupiter: { emoji: '♃', color: '#c8a060', size: 'small' },
  Saturn:  { emoji: '♄', color: 'var(--corrupt)', size: 'small' },
}

function PlanetCard({ name, age }) {
  const meta = PLANET_META[name]
  return (
    <div style={{
      background: 'var(--bg3)',
      border: `1px solid ${meta.color}22`,
      padding: '16px 12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
      flex: meta.size === 'large' ? 2 : 1,
    }}>
      <div style={{ fontSize: '22px' }}>{meta.emoji}</div>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '9px',
        letterSpacing: '2px',
        color: 'var(--dim2)',
      }}>
        {name.toUpperCase()}
      </div>
      <div style={{
        fontFamily: "'VT323', monospace",
        fontSize: '36px',
        color: meta.color,
        textShadow: `0 0 10px ${meta.color}`,
        lineHeight: 1,
      }}>
        <TickingNumber value={parseFloat(age)} accent={meta.color} countUp={true} />
      </div>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '9px',
        color: 'var(--dim2)',
      }}>
        YRS
      </div>
    </div>
  )
}

// LIFE BAR
function LifeBar({ years, months }) {
  const [target, setTarget] = useState(80)
  const current = years + months / 12
  const percent = Math.min((current / target) * 100, 100).toFixed(1)
  const remaining = Math.max(target - current, 0).toFixed(1)

  const barColor = percent < 33
    ? 'var(--toxic)'
    : percent < 66
    ? 'var(--corrupt)'
    : percent < 85
    ? 'var(--amber)'
    : 'var(--blood)'

  return (
    <div>

      {/* target input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
      }}>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px',
          color: 'var(--dim2)',
          letterSpacing: '2px',
        }}>
          TARGET AGE
        </span>
        <input
          type='number'
          value={target}
          min={Math.ceil(current) + 1}
          max={150}
          onChange={e => setTarget(Number(e.target.value))}
          style={{
            background: 'var(--bg3)',
            border: `1px solid ${barColor}44`,
            color: barColor,
            fontFamily: "'VT323', monospace",
            fontSize: '28px',
            width: '72px',
            textAlign: 'center',
            outline: 'none',
            padding: '2px 4px',
            textShadow: `0 0 8px ${barColor}`,
          }}
        />
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px',
          color: 'var(--dim2)',
          letterSpacing: '2px',
        }}>
          YRS
        </span>
      </div>

      {/* percent display */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
      }}>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px',
          color: 'var(--dim2)',
        }}>
          BIRTH
        </span>
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: '24px',
          color: barColor,
          textShadow: `0 0 10px ${barColor}`,
        }}>
          {percent}% ELAPSED
        </span>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px',
          color: 'var(--dim2)',
        }}>
          {target} YRS
        </span>
      </div>

      {/* bar */}
      <div style={{
        height: '14px',
        background: 'var(--dim)',
        border: `1px solid ${barColor}33`,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          width: `${percent}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${barColor}88, ${barColor})`,
          boxShadow: `0 0 10px ${barColor}`,
          transition: 'width 0.8s ease, background 0.5s ease',
          position: 'relative',
        }}>
          {/* blinking cursor  */}
          <div className='blink' style={{
            position: 'absolute',
            right: 0, top: 0,
            width: '3px', height: '100%',
            background: '#fff',
            boxShadow: '0 0 6px #fff',
          }} />
        </div>
      </div>

      {/* remaining */}
      <div style={{
        marginTop: '10px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '11px',
        color: 'var(--dim2)',
        letterSpacing: '2px',
        textAlign: 'right',
      }}>
        ⚠ {remaining} YRS REMAINING ON CURRENT TRAJECTORY
      </div>

    </div>
  )
}

//  MAIN 
export default function AgeReadout({ age }) {
  if (!age) return null

  const GEN_META = {
    'Silent Generation': { emoji: '📻', color: 'var(--ghost)' },
    'Baby Boomer':       { emoji: '📺', color: 'var(--amber)' },
    'Generation X':      { emoji: '💾', color: 'var(--corrupt)' },
    'Millennial':        { emoji: '📱', color: 'var(--toxic)' },
    'Generation Z':      { emoji: '🤖', color: 'var(--blood)' },
    'Generation Alpha':  { emoji: '🧬', color: '#bf00ff' },
  }

  const gen = GEN_META[age.generation] || { emoji: '?', color: 'var(--toxic)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>

      {/* EXACT AGE + BIRTHDAY */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4px' }}>

        <div style={{ display: 'flex', gap: '4px' }}>
          <StatCard
            label='Years' emoji='⏳'
            value={<TickingNumber value={age.years} accent='var(--toxic)' countUp />}
            accent='var(--toxic)' big
            style={{ flex: 1 }}
          />
          <StatCard
            label='Months' emoji='🗓'
            value={<TickingNumber value={age.months} accent='var(--toxic)' countUp />}
            accent='var(--toxic)' big
            style={{ flex: 1 }}
          />
          <StatCard
            label='Days' emoji='📅'
            value={<TickingNumber value={age.days} accent='var(--toxic)' countUp />}
            accent='var(--toxic)' big
            style={{ flex: 1 }}
          />
        </div>

        {/* birthday intel */}
        <div style={{
          background: 'var(--bg3)',
          border: '1px solid var(--amber)22',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          {[
            { label: 'Born On',     value: `🗓 ${age.bornOnDay}`,                               color: 'var(--amber)' },
            { label: 'Birth Type',  value: age.isWeekend ? '🎉 Weekend' : '💼 Weekday',         color: age.isWeekend ? 'var(--toxic)' : 'var(--dirty)' },
            { label: 'Next Bday',   value: `🎂 ${age.daysUntilBirthday}d`,                      color: 'var(--corrupt)' },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '9px', letterSpacing: '2px',
                color: 'var(--dim2)', marginBottom: '3px',
              }}>
                {label}
              </div>
              <div style={{
                fontFamily: "'VT323', monospace",
                fontSize: '22px',
                color, textShadow: `0 0 8px ${color}`,
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>

      </div>

      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total Days',    value: age.totalDays,    accent: 'var(--amber)',  emoji: '☀️' },
          { label: 'Total Weeks',   value: age.totalWeeks,   accent: 'var(--amber)',  emoji: '📆' },
          { label: 'Total Hours',   value: age.totalHours,   accent: 'var(--corrupt)', emoji: '🕐' },
          { label: 'Total Minutes', value: age.totalMinutes, accent: 'var(--corrupt)', emoji: '⚡' },
          { label: 'Seconds',       value: age.totalSeconds, accent: 'var(--blood)',   emoji: '💀' },
        ].map(({ label, value, accent, emoji }) => (
          <StatCard
            key={label}
            label={label} emoji={emoji}
            value={
              label === 'Seconds'
                ? <TickingNumber value={value} accent={accent} />
                : <TickingNumber value={value} accent={accent} countUp />
            }
            accent={accent}
            style={{ flex: 1, minWidth: '120px' }}
          />
        ))}
      </div>

      {/* PLANETS ── */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {Object.entries(age.planetAges).map(([planet, yrs]) => (
          <PlanetCard key={planet} name={planet} age={yrs} />
        ))}
      </div>

      {/* GENERATION + LIFE BAR */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4px' }}>

        {/* generation */}
        <div style={{
          background: 'var(--bg3)',
          border: `1px solid ${gen.color}22`,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '36px' }}>{gen.emoji}</div>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '9px', letterSpacing: '2px',
            color: 'var(--dim2)',
          }}>
            GENERATION
          </div>
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: '24px',
            color: gen.color,
            textShadow: `0 0 10px ${gen.color}`,
            lineHeight: 1.2,
          }}>
            {age.generation.toUpperCase()}
          </div>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '10px',
            color: 'var(--dim2)',
          }}>
            BIRTH YEAR {age.birthYear}
          </div>
        </div>

        {/* life bar */}
        <div style={{
          background: 'var(--bg3)',
          border: '1px solid var(--dim)',
          padding: '20px',
        }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '10px', letterSpacing: '3px',
            color: 'var(--toxic)', opacity: 0.8,
            marginBottom: '16px',
          }}>
            ⚡
          </div>
          <LifeBar years={age.years} months={age.months} />
        </div>

      </div>

    </div>
  )
}