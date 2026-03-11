import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// GENERATION DATA
const GEN_DATA = {
  'Silent Generation': {
    years: '1928–1945', trait: 'RESILIENCE',
    color: '#4a7c59', icon: '📻',
    why: 'Named "Silent" because this generation was expected to be seen and not heard — to work within the system, not challenge it.',
    characteristics: [
      'Extreme discipline and work ethic',
      'Deep respect for institutions and authority',
      'Financial conservatism — lived through the Great Depression',
      'Strong sense of civic duty and sacrifice',
      'Built the post-war economic foundations of the modern world',
    ],
  },
  'Baby Boomer': {
    years: '1946–1964', trait: 'OPTIMISM',
    color: '#ff6b00', icon: '📺',
    why: 'Named for the dramatic surge in birth rates after WW2 soldiers returned home — a "boom" of babies born into post-war prosperity.',
    characteristics: [
      'Idealistic and optimistic about the future',
      'Defined by civil rights movements and social change',
      'First generation shaped by television',
      'Competitive and career-driven',
      'In Africa — the independence generation, nation builders',
    ],
  },
  'Generation X': {
    years: '1965–1980', trait: 'SKEPTICISM',
    color: '#b8ff00', icon: '💾',
    why: 'The "X" represents the unknown — a generation that rejected labels. Douglas Coupland coined it in 1991 to describe a generation with no clear identity or defining cause.',
    characteristics: [
      'Self-reliant — raised as latchkey kids',
      'Deeply skeptical of institutions and advertising',
      'Witnessed the Cold War end and the digital revolution begin',
      'Entrepreneurial — built the first internet companies',
      'Bridge generation between analog and digital worlds',
    ],
  },
  'Millennial': {
    years: '1981–1996', trait: 'HUSTLE',
    color: '#39ff14', icon: '📱',
    why: 'Named for coming of age around the millennium — the year 2000. Also called Generation Y, they inherited a world shaped by 9/11, the 2008 financial crash, and the smartphone revolution.',
    characteristics: [
      'First true digital natives — grew up with the internet',
      'Defined by economic instability and student debt',
      'Values experiences over possessions',
      'In Kenya — the M-Pesa generation, mobile-first everything',
      'Most educated generation in history, yet most financially pressured',
    ],
  },
  'Generation Z': {
    years: '1997–2012', trait: 'AWARENESS',
    color: '#ff1a1a', icon: '🤖',
    why: 'Following Generation Y (Millennials), Generation Z is simply the next letter. Also called Zoomers — they grew up with smartphones from childhood, making them the first truly post-internet generation.',
    characteristics: [
      'Born into mobile internet — never knew a world without it',
      'Deeply aware of mental health, climate change, and inequality',
      'In Kenya — the Gen Z protests of 2024 showed their political power',
      'Pragmatic about money, unlike idealistic Millennials',
      'Fluent in multiple digital languages simultaneously',
    ],
  },
  'Generation Alpha': {
    years: '2013–present', trait: 'ADAPTABILITY',
    color: '#bf00ff', icon: '🧬',
    why: 'After Z comes Alpha — the first letter of the Greek alphabet, signaling a complete restart. The first generation born entirely in the 21st century, named by researcher Mark McCrindle.',
    characteristics: [
      'AI natives — grew up with ChatGPT and voice assistants',
      'Most technologically immersed generation ever',
      'Post-pandemic children — shaped by lockdowns and remote learning',
      'Highly visual — screens before books',
      'The future is entirely unwritten for them',
    ],
  },
}

// PLANET CONFIG
const PLANETS = [
  { key: 'Mercury', emoji: '☿', name: 'Mercury', color: '#b8b8b8', orbitRadius: 300, duration: 12, startAngle: 20  },
  { key: 'Venus',   emoji: '♀', name: 'Venus',   color: '#ff9f43', orbitRadius: 360, duration: 20, startAngle: 110 },
  { key: 'Mars',    emoji: '♂', name: 'Mars',     color: '#ff4444', orbitRadius: 420, duration: 32, startAngle: 200 },
  { key: 'Jupiter', emoji: '♃', name: 'Jupiter',  color: '#c8a96e', orbitRadius: 490, duration: 50, startAngle: 300 },
]

// COUNT UP
function useCountUp(target, duration = 1500, started = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!started) return
    if (!target || target === 0) { setValue(0); return }
    let current = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [started, target])
  return value
}

// THREE.JS GLOBE
function DotSphere({ color = '#39ff14' }) {
  const meshRef = useRef()
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.x += 0.0008
    }
  })
  const positions = []
  const count = 1000
  for (let i = 0; i < count; i++) {
    const phi   = Math.acos(-1 + (2 * i) / count)
    const theta = Math.sqrt(count * Math.PI) * phi
    positions.push(
      Math.sin(phi) * Math.cos(theta) * 2.2,
      Math.sin(phi) * Math.sin(theta) * 2.2,
      Math.cos(phi) * 2.2
    )
  }
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' array={new Float32Array(positions)} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color={color} transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

function OrbitRing({ radius, color, opacity, speed }) {
  const ref = useRef()
  useFrame(() => { if (ref.current) ref.current.rotation.z += speed })
  const points = []
  for (let i = 0; i <= 128; i++) {
    const a = (i / 128) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
  }
  return (
    <line ref={ref} geometry={new THREE.BufferGeometry().setFromPoints(points)}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  )
}

function GlobeScene({ nightMode }) {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
      <Stars radius={80} depth={40} count={3000} factor={3} fade speed={0.4} />
      <DotSphere color={nightMode ? '#ff4444' : '#39ff14'} />
      <OrbitRing radius={3.2} color={nightMode ? '#ff4444' : '#39ff14'} opacity={0.12} speed={0.002} />
      <OrbitRing radius={4.0} color={nightMode ? '#ff6b00' : '#ff6b00'} opacity={0.08} speed={-0.0015} />
      <OrbitRing radius={4.8} color={nightMode ? '#cc2222' : '#b8ff00'} opacity={0.05} speed={0.001} />
      <OrbitRing radius={5.6} color={nightMode ? '#ff4444' : '#c8a96e'} opacity={0.04} speed={0.0008} />
    </Canvas>
  )
}

// ORBITING PLANET
function OrbitingPlanet({ planet, planetAge, containerSize }) {
  const [paused, setPaused] = useState(false)
  const [angle, setAngle] = useState(planet.startAngle)
  const animRef = useRef()
  const lastTime = useRef(null)
  const angleRef = useRef(planet.startAngle)

  useEffect(() => {
    const speed = 360 / (planet.duration * 1000)
    const animate = (time) => {
      if (!paused) {
        if (lastTime.current !== null) {
          const delta = time - lastTime.current
          angleRef.current = (angleRef.current + speed * delta) % 360
          setAngle(angleRef.current)
        }
        lastTime.current = time
      } else {
        lastTime.current = null
      }
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [paused, planet.duration])

  const cx = containerSize / 2
  const cy = containerSize / 2
  const scale = containerSize / 980
  const r = planet.orbitRadius * scale
  const rad = (angle * Math.PI) / 180
  const x = cx + r * Math.cos(rad)
  const y = cy + r * Math.sin(rad)
  const cardLeft = x > cx
  const cardTop  = y > cy

  return (
    <div
      style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', zIndex: 20 }}
      onClick={() => setPaused(p => !p)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* planet emoji */}
      <div style={{
        fontSize: '20px',
        filter: `drop-shadow(0 0 ${paused ? 12 : 6}px ${planet.color})`,
        transform: paused ? 'scale(1.6)' : 'scale(1)',
        transition: 'transform 0.25s ease, filter 0.25s ease',
        cursor: 'pointer', userSelect: 'none',
      }}>
        {planet.emoji}
      </div>

      {/* info card */}
      <AnimatePresence>
        {paused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 4 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              [cardLeft ? 'right' : 'left']: '30px',
              [cardTop ? 'bottom' : 'top']: '0px',
              background: 'rgba(3,6,1,0.97)',
              border: `1px solid ${planet.color}88`,
              boxShadow: `0 0 30px ${planet.color}33, inset 0 0 20px rgba(0,0,0,0.5)`,
              padding: '16px 20px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 100,
              minWidth: '180px',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: `linear-gradient(to right, ${planet.color}, transparent)` }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40%', height: '1px', background: `linear-gradient(to left, ${planet.color}44, transparent)` }} />

            {/* planet name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>{planet.emoji}</span>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '3px', color: '#7aab7a', marginBottom: '2px' }}>PLANET</div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '14px', fontWeight: '700', color: planet.color, textShadow: `0 0 10px ${planet.color}`, letterSpacing: '3px' }}>
                  {planet.name.toUpperCase()}
                </div>
              </div>
            </div>

            <div style={{ height: '1px', background: `${planet.color}22`, marginBottom: '12px' }} />

            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '3px', color: '#7aab7a', marginBottom: '6px' }}>YOUR AGE HERE</div>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '44px', lineHeight: 1, color: planet.color, textShadow: `0 0 16px ${planet.color}` }}>
              {planetAge != null ? Number(planetAge).toFixed(2) : '—'}
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#7aab7a', letterSpacing: '2px', marginTop: '2px' }}>
              {planet.name} years
            </div>

            <div style={{ marginTop: '10px', fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#7aab7a', opacity: 0.8, letterSpacing: '2px' }}>
              {paused ? '● PAUSED — MOVE AWAY TO RESUME' : ''}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// EDGE STAT
function EdgeStat({ label, value, accent, delay, started, duration, live = false, align = 'left' }) {
  const counted = useCountUp(value, duration, started)
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6 }}
      style={{
        display: 'flex', flexDirection: 'column', gap: '3px',
        background: 'rgba(3,6,1,0.75)',
        border: `1px solid ${accent}22`,
        padding: '10px 14px',
        backdropFilter: 'blur(4px)',
        borderLeft: align === 'left' ? `3px solid ${accent}` : `1px solid ${accent}22`,
        borderRight: align === 'right' ? `3px solid ${accent}` : `1px solid ${accent}22`,
      }}
    >
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '3px', color: '#7aab7a', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontFamily: "'VT323', monospace", fontSize: '34px', lineHeight: 1, color: accent, textShadow: `0 0 12px ${accent}` }}>
        {live ? value.toLocaleString() : counted.toLocaleString()}
      </div>
    </motion.div>
  )
}

// SCROLL HINT
function ScrollHint({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute', bottom: '24px', left: '50%',
            transform: 'translateX(-50%)', zIndex: 30,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '11px', color: '#7aab7a',
            letterSpacing: '3px', textAlign: 'center',
            animation: 'amber-pulse 2s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        >
          ↓↓↓
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// SECTION
const Section = ({ children, refProp, style = {} }) => (
  <div ref={refProp} style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always', position: 'relative', overflow: 'hidden', ...style }}>
    {children}
  </div>
)

// SHARE CARD GENERATOR
function ShareCard({ age, gen, weeksLived, weeksRemaining, lifePercent, onClose }) {
  const cardRef = useRef()
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#050801',
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `howold-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error('Download failed', e)
    }
    setDownloading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
      >
        {/* CARD */}
        <div
          ref={cardRef}
          style={{
            width: '480px',
            background: '#050801',
            border: '1px solid #39ff1444',
            position: 'relative',
            overflow: 'hidden',
            padding: '40px',
            fontFamily: "'Share Tech Mono', monospace",
          }}
        >
          {/* top glow */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, #39ff14, #ff6b00, transparent)' }} />
          
          {/* corner dots */}
          {[{t:8,l:8},{t:8,r:8},{b:8,l:8},{b:8,r:8}].map((pos, i) => (
            <div key={i} style={{ position: 'absolute', width: '4px', height: '4px', borderRadius: '50%', background: '#39ff14', boxShadow: '0 0 6px #39ff14', ...Object.fromEntries(Object.entries(pos).map(([k,v]) => [k === 't' ? 'top' : k === 'b' ? 'bottom' : k === 'l' ? 'left' : 'right', v])) }} />
          ))}

          {/* HOWOLD title */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '48px', fontWeight: '900', color: '#fff', letterSpacing: '8px', textShadow: '0 0 30px #39ff14, 0 0 60px rgba(57,255,20,0.3)', lineHeight: 1 }}>
              HOW<span style={{ color: '#39ff14' }}>OLD</span>
            </div>
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #39ff1444, transparent)', marginBottom: '24px' }} />

          {/* age block */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#4a7c59', marginBottom: '8px' }}>AGE</div>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '42px', color: '#39ff14', textShadow: '0 0 16px #39ff14', lineHeight: 1 }}>
              {age.years} <span style={{ fontSize: '24px', opacity: 0.7 }}>YRS</span> {age.months} <span style={{ fontSize: '24px', opacity: 0.7 }}>MO</span> {age.days} <span style={{ fontSize: '24px', opacity: 0.7 }}>DAYS</span>
            </div>
          </div>

          {/* stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'BORN ON',    value: `${age.bornOnDay}, ${age.birthYear}`, color: '#ff6b00' },
              { label: 'BIRTH TYPE', value: age.isWeekend ? 'Weekend' : 'Weekday', color: '#b8ff00' },
              { label: 'GENERATION', value: `${gen.icon} ${age.generation}`,       color: gen.color },
              { label: 'TRAIT',      value: gen.trait,                              color: gen.color },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ borderLeft: `2px solid ${color}55`, paddingLeft: '10px' }}>
                <div style={{ fontSize: '8px', letterSpacing: '3px', color: '#2a4a2a', marginBottom: '3px' }}>{label}</div>
                <div style={{ fontFamily: "'VT323', monospace", fontSize: '20px', color, textShadow: `0 0 8px ${color}` }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #39ff1422, transparent)', marginBottom: '20px' }} />

          {/* weeks */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#4a7c59', marginBottom: '10px' }}>FOUR THOUSAND WEEKS</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#2a4a2a', marginBottom: '3px' }}>LIVED</div>
                <div style={{ fontFamily: "'VT323', monospace", fontSize: '28px', color: '#39ff14', textShadow: '0 0 10px #39ff14' }}>{weeksLived.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#2a4a2a', marginBottom: '3px' }}>REMAINING</div>
                <div style={{ fontFamily: "'VT323', monospace", fontSize: '28px', color: '#ff6b00', textShadow: '0 0 10px #ff6b00' }}>{weeksRemaining.toLocaleString()}</div>
              </div>
            </div>
            {/* progress bar */}
            <div style={{ height: '4px', background: 'rgba(57,255,20,0.08)', position: 'relative' }}>
              <div style={{ width: `${lifePercent}%`, height: '100%', background: lifePercent > 75 ? '#ff1a1a' : lifePercent > 50 ? '#ff6b00' : '#39ff14', boxShadow: '0 0 6px currentColor' }} />
            </div>
            <div style={{ fontSize: '8px', color: '#2a4a2a', letterSpacing: '2px', marginTop: '4px' }}>
              {lifePercent.toFixed(1)}% OF ESTIMATED LIFE ELAPSED
            </div>
          </div>

          {/* planet ages */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#4a7c59', marginBottom: '8px' }}>PLANET AGES</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                { emoji: '☿', name: 'Mercury', key: 'Mercury', color: '#b8b8b8' },
                { emoji: '♀', name: 'Venus',   key: 'Venus',   color: '#ff9f43' },
                { emoji: '♂', name: 'Mars',     key: 'Mars',    color: '#ff4444' },
                { emoji: '♃', name: 'Jupiter',  key: 'Jupiter', color: '#c8a96e' },
              ].map(p => (
                <div key={p.key} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', marginBottom: '2px' }}>{p.emoji}</div>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: '18px', color: p.color, textShadow: `0 0 6px ${p.color}` }}>
                    {age.planetAges?.[p.key] != null ? Number(age.planetAges[p.key]).toFixed(1) : '—'}
                  </div>
                  <div style={{ fontSize: '7px', color: '#2a4a2a', letterSpacing: '1px' }}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #39ff1422, transparent)', marginBottom: '16px' }} />

          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '16px', color: '#ff6b00', opacity: 0.8, lineHeight: 1.5 }}>
              "Four thousand weeks. That's all you get, if you're lucky."
            </div>
            <div style={{ fontSize: '8px', color: '#2a4a2a', letterSpacing: '2px', marginTop: '4px' }}>— Oliver Burkeman</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '8px', color: '#2a4a2a', letterSpacing: '2px' }}>
              built by <span style={{ color: '#39ff1466' }}>Susan Waithira</span>
            </div>
            <div style={{ fontSize: '8px', color: '#2a4a2a', letterSpacing: '2px' }}>
              howold.app
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, #39ff1422, transparent)' }} />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleDownload}
            disabled={downloading}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '12px', letterSpacing: '3px',
              background: 'rgba(57,255,20,0.1)', color: '#39ff14',
              border: '1px solid #39ff1444', padding: '12px 28px',
              cursor: downloading ? 'wait' : 'pointer',
              textShadow: '0 0 8px #39ff14',
              boxShadow: '0 0 20px rgba(57,255,20,0.1)',
            }}
          >
            {downloading ? 'GENERATING...' : '⬇ DOWNLOAD PNG'}
          </button>
          <button
            onClick={onClose}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '12px', letterSpacing: '3px',
              background: 'transparent', color: '#7aab7a',
              border: '1px solid rgba(57,255,20,0.15)', padding: '12px 28px',
              cursor: 'pointer',
            }}
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// MAIN
export default function Zone02Temporal({ age, nightMode }) {

  const globeRef  = useRef()
  const genRef    = useRef()
  const globeView = useInView(globeRef, { amount: 0.01 })
  const genView   = useInView(genRef,   { amount: 0.01 })

  const [showHint1, setShowHint1] = useState(false)
  const [showHint2, setShowHint2] = useState(false)
  const [containerSize, setContainerSize] = useState(900)
  const [showCard, setShowCard] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const update = () => { setContainerSize(Math.min(window.innerWidth, window.innerHeight)); setIsMobile(window.innerWidth < 768) }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (!globeView) { setShowHint1(false); return }
    const t = setTimeout(() => setShowHint1(true), 5000)
    return () => clearTimeout(t)
  }, [globeView])

  useEffect(() => {
    if (!genView) { setShowHint2(false); return }
    const t = setTimeout(() => setShowHint2(true), 7000)
    return () => clearTimeout(t)
  }, [genView])

  if (!age) return (
    <Section>
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '32px', opacity: 0.3 }}>⬆</div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '13px', color: '#7aab7a', letterSpacing: '4px' }}>RETURN TO ZONE 01</div>
      </div>
    </Section>
  )

  const gen = GEN_DATA[age.generation] ?? GEN_DATA['Millennial']
  const LIFE_EXPECTANCY = 80
  const weeksLived = age.totalWeeks
  const totalWeeksInLife = LIFE_EXPECTANCY * 52
  const weeksRemaining = Math.max(0, totalWeeksInLife - weeksLived)
  const lifePercent = Math.min(100, (weeksLived / totalWeeksInLife) * 100)

  return (
    <>
      <AnimatePresence>
        {showCard && (
          <ShareCard
            age={age} gen={gen}
            weeksLived={weeksLived}
            weeksRemaining={weeksRemaining}
            lifePercent={lifePercent}
            onClose={() => setShowCard(false)}
          />
        )}
      </AnimatePresence>

      {/* SECTION 1 — GLOBE + PLANETS + STATS*/}
      <Section refProp={globeRef}>

        <div style={{ position: 'absolute', top: '28px', left: '40px', zIndex: 20, fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: nightMode ? '#ff4444' : 'var(--toxic)', opacity: 0.6 }}>
       EARTH PERSPECTIVE
        </div>
        <div style={{ position: 'absolute', top: '28px', right: '40px', zIndex: 20, fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: '#7aab7a', opacity: 0.7 }}>
          LIVE — TICKING
        </div>

        {/* globe — hidden on mobile */}
        {!isMobile && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <GlobeScene nightMode={nightMode} />
          </div>
        )}

        {/* planets — hidden on mobile */}
        {!isMobile && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: containerSize, height: containerSize, transform: 'translate(-50%, -50%)', zIndex: 10, pointerEvents: 'none' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'all' }}>
              {PLANETS.map(planet => (
                <OrbitingPlanet
                  key={planet.key}
                  planet={planet}
                  planetAge={age.planetAges?.[planet.key]}
                  containerSize={containerSize}
                />
              ))}
            </div>
          </div>
        )}

        {/* STATS — desktop: left/right edges  mobile: centered grid */}
        {isMobile ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '8px', zIndex: 15, width: '90vw',
            }}
          >
            <EdgeStat label='Years'         value={age.years}        accent={nightMode ? '#ff4444' : 'var(--toxic)'} delay={0.2} started={true} duration={1200} align='left' />
            <EdgeStat label='Total Days'    value={age.totalDays}    accent={nightMode ? '#ff6b00' : 'var(--amber)'} delay={0.3} started={true} duration={1400} align='left' />
            <EdgeStat label='Months'        value={age.months}       accent={nightMode ? '#ff4444' : 'var(--toxic)'} delay={0.4} started={true} duration={1400} align='left' />
            <EdgeStat label='Total Hours'   value={age.totalHours}   accent={nightMode ? '#cc9900' : 'var(--corrupt)'} delay={0.5} started={true} duration={1600} align='left' />
            <EdgeStat label='Days'          value={age.days}         accent={nightMode ? '#ff4444' : 'var(--toxic)'} delay={0.6} started={true} duration={1600} align='left' />
            <EdgeStat label='Total Minutes' value={age.totalMinutes} accent={nightMode ? '#cc9900' : 'var(--corrupt)'} delay={0.7} started={true} duration={1800} align='left' />
            <EdgeStat label='Total Weeks'   value={age.totalWeeks}   accent={nightMode ? '#ff6b00' : 'var(--amber)'} delay={0.8} started={true} duration={1800} align='left' />
            <EdgeStat label='Seconds ⚡'    value={age.totalSeconds} accent={nightMode ? '#ff1a1a' : 'var(--blood)'} delay={0.9} started={true} duration={0}    align='left' live />
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{ position: 'absolute', left: '40px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 15 }}
            >
              <EdgeStat label='Years'       value={age.years}      accent={nightMode ? '#ff4444' : 'var(--toxic)'} delay={0.5} started={true} duration={1200} align='left' />
              <EdgeStat label='Months'      value={age.months}     accent={nightMode ? '#ff4444' : 'var(--toxic)'} delay={0.7} started={true} duration={1400} align='left' />
              <EdgeStat label='Days'        value={age.days}       accent={nightMode ? '#ff4444' : 'var(--toxic)'} delay={0.9} started={true} duration={1600} align='left' />
              <EdgeStat label='Total Weeks' value={age.totalWeeks} accent={nightMode ? '#ff6b00' : 'var(--amber)'} delay={1.1} started={true} duration={1800} align='left' />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 15, alignItems: 'flex-end' }}
            >
              <EdgeStat label='Total Days'    value={age.totalDays}    accent={nightMode ? '#ff6b00' : 'var(--amber)'}   delay={0.6} started={true} duration={1400} align='right' />
              <EdgeStat label='Total Hours'   value={age.totalHours}   accent={nightMode ? '#cc9900' : 'var(--corrupt)'} delay={0.8} started={true} duration={1600} align='right' />
              <EdgeStat label='Total Minutes' value={age.totalMinutes} accent={nightMode ? '#cc9900' : 'var(--corrupt)'} delay={1.0} started={true} duration={1800} align='right' />
              <EdgeStat label='Seconds ⚡'    value={age.totalSeconds} accent={nightMode ? '#ff1a1a' : 'var(--blood)'}   delay={1.2} started={true} duration={0}    align='right' live />
            </motion.div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{
            position: 'absolute',
            bottom: '56px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0',
            zIndex: 15,
          }}
        >
          {[
            { label: 'Born On',       value: `🗓 ${age.bornOnDay}`,                       color: 'var(--amber)' },
            { label: 'Birth Type',    value: age.isWeekend ? '🎉 Weekend' : '💼 Weekday', color: 'var(--corrupt)' },
            { label: 'Next Birthday', value: `🎂 ${age.daysUntilBirthday} days`,          color: 'var(--toxic)' },
            { label: 'Birth Year',    value: `📅 ${age.birthYear}`,                        color: 'var(--toxic)' },
          ].map(({ label, value, color }, i, arr) => (
            <div key={label} style={{
              textAlign: 'center',
              background: nightMode ? 'rgba(14,3,3,0.85)' : 'rgba(3,6,1,0.8)',
              border: nightMode ? '1px solid rgba(255,68,68,0.1)' : '1px solid rgba(57,255,20,0.1)',
              borderRight: i < arr.length - 1 ? 'none' : '1px solid rgba(57,255,20,0.1)',
              padding: '12px 24px',
              backdropFilter: 'blur(4px)',
            }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '3px', color: '#7aab7a', marginBottom: '6px' }}>{label}</div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '22px', color, textShadow: `0 0 8px ${color}` }}>{value}</div>
            </div>
          ))}
        </motion.div>

        {/* planet hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 2.5 }}
          style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#7aab7a', letterSpacing: '3px', zIndex: 20, whiteSpace: 'nowrap' }}
        >
          ☿ ♀ ♂ ♃ — HOVER PLANETS TO PAUSE &amp; SEE YOUR AGE THERE
        </motion.div>

        <ScrollHint show={showHint1} />
      </Section>

      {/* SECTION 2 — GENERATION , 4000 WEEKS + SHARE*/}
      <Section refProp={genRef}>

        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, zIndex: 0 }}>
          <GlobeScene nightMode={nightMode} />
        </div>


        <motion.div
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 2.5, delay: 0.2 }}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(60px, 14vw, 140px)', fontWeight: '900', color: gen.color, letterSpacing: '12px', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 1 }}
        >
          {gen.trait}
        </motion.div>

        <div style={{ position: 'absolute', inset: 0, zIndex: 10, overflowY: 'auto', padding: '56px 48px 48px' }}>

          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: gen.color, opacity: 0.6, marginBottom: '32px' }}>
          GENERATIONAL IDENTITY
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              marginBottom: '32px',
              padding: '28px 32px',
              background: nightMode ? 'rgba(14,3,3,0.85)' : 'rgba(3,6,1,0.75)',
              border: `1px solid ${gen.color}22`,
              borderLeft: `4px solid ${gen.color}`,
              backdropFilter: 'blur(4px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
                style={{ fontSize: '56px', lineHeight: 1, flexShrink: 0 }}
              >
                {gen.icon}
              </motion.span>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', letterSpacing: '4px', color: '#7aab7a', marginBottom: '6px' }}>GENERATION</div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', fontWeight: '900', color: gen.color, textShadow: `0 0 24px ${gen.color}`, letterSpacing: '4px' }}>
                  {age.generation.toUpperCase()}
                </div>
                <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                  <span style={{ fontFamily: "'VT323', monospace", fontSize: '20px', color: gen.color, opacity: 0.6 }}>{gen.years}</span>
                  <span style={{ fontFamily: "'VT323', monospace", fontSize: '20px', color: gen.color, textShadow: `0 0 8px ${gen.color}` }}>{gen.trait}</span>
                </div>
              </div>
            </div>

            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '12px', color: '#e8f0e0', lineHeight: 1.9, marginBottom: '24px', letterSpacing: '0.5px' }}>
              {gen.why}
            </div>

            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', letterSpacing: '4px', color: '#a0b090', marginBottom: '14px' }}>
              DEFINING CHARACTERISTICS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {gen.characteristics.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
                  style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: gen.color, boxShadow: `0 0 6px ${gen.color}`, marginTop: '6px', flexShrink: 0 }} />
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '12px', color: '#e8f0e0', lineHeight: 1.7, letterSpacing: '0.5px' }}>
                    {item}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}
          >
            {/* four thousand weeks */}
            <div style={{ padding: '24px', background: nightMode ? 'rgba(14,3,3,0.85)' : 'rgba(3,6,1,0.75)', border: nightMode ? '1px solid rgba(255,68,0,0.2)' : '1px solid rgba(255,107,0,0.2)', borderLeft: '4px solid var(--amber)', backdropFilter: 'blur(4px)' }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', letterSpacing: '4px', color: '#7aab7a', marginBottom: '12px' }}>FOUR THOUSAND WEEKS</div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '22px', color: 'var(--amber)', lineHeight: 1.5, marginBottom: '8px' }}>
                "Four thousand weeks. That's all you get, if you're lucky."
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#7aab7a', letterSpacing: '2px', marginBottom: '12px' }}>
                — Oliver Burkeman, 2021
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: '#ddeedd', lineHeight: 1.8 }}>
                The average human life spans roughly 4,000 weeks. Not thousands of years,
                just four thousand Sundays. That brutal simplicity forces a reckoning most
                people spend their whole lives avoiding.
              </div>
            </div>

            <div style={{ padding: '24px', background: nightMode ? 'rgba(14,3,3,0.85)' : 'rgba(3,6,1,0.75)', border: nightMode ? '1px solid rgba(255,68,68,0.15)' : '1px solid rgba(57,255,20,0.15)', borderLeft: nightMode ? '4px solid #ff4444' : '4px solid var(--toxic)', backdropFilter: 'blur(4px)' }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', letterSpacing: '4px', color: '#7aab7a', marginBottom: '16px' }}>YOUR WEEKS</div>
              <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#7aab7a', letterSpacing: '3px', marginBottom: '4px' }}>LIVED</div>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1, color: 'var(--toxic)', textShadow: '0 0 16px var(--toxic)' }}>
                    {weeksLived.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#7aab7a', letterSpacing: '3px', marginBottom: '4px' }}>REMAINING*</div>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1, color: 'var(--amber)', textShadow: '0 0 16px var(--amber)' }}>
                    {weeksRemaining.toLocaleString()}
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#7aab7a', letterSpacing: '2px' }}>LIFE USED — {lifePercent.toFixed(1)}%</span>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#7aab7a', letterSpacing: '2px' }}>*{LIFE_EXPECTANCY}yr avg</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(57,255,20,0.08)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lifePercent}%` }}
                    transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                    style={{ height: '100%', background: lifePercent > 75 ? 'var(--blood)' : lifePercent > 50 ? 'var(--amber)' : 'var(--toxic)', boxShadow: '0 0 8px currentColor' }}
                  />
                </div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#b0c8b0', marginTop: '8px', lineHeight: 1.6 }}>
                  {lifePercent.toFixed(1)}% of your estimated weeks are gone.<br />Each one that passes is gone. Spend them well.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <button
              onClick={() => setShowCard(true)}
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '14px', fontWeight: '700',
                letterSpacing: '4px',
                background: 'rgba(57,255,20,0.08)',
                color: '#39ff14',
                border: '1px solid rgba(57,255,20,0.3)',
                padding: '18px 32px',
                cursor: 'pointer',
                textShadow: '0 0 10px #39ff14',
                boxShadow: '0 0 30px rgba(57,255,20,0.08)',
                transition: 'all 0.3s ease',
                width: '100%',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(57,255,20,0.15)'; e.target.style.boxShadow = '0 0 40px rgba(57,255,20,0.15)' }}
              onMouseLeave={e => { e.target.style.background = 'rgba(57,255,20,0.08)'; e.target.style.boxShadow = '0 0 30px rgba(57,255,20,0.08)' }}
            >
              ⬇ GENERATE &amp; DOWNLOAD YOUR CARD
            </button>

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '20px 24px',
              background: 'rgba(3,6,1,0.75)',
              border: '1px solid rgba(57,255,20,0.08)',
              backdropFilter: 'blur(4px)',
            }}>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', letterSpacing: '3px', color: '#7aab7a', marginBottom: '4px' }}>BUILT BY</div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '13px', fontWeight: '700', color: 'var(--toxic)', letterSpacing: '2px' }}>Susan Waithira</div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { label: 'GitHub',    href: 'https://github.com/sWaithira',                         icon: '{ }' },
                  { label: 'Portfolio', href: 'https://portfolio-website-sepia-rho.vercel.app/',       icon: '↗' },
                  { label: 'Email',     href: 'mailto:sw.nyawira@gmail.com',                           icon: '✉' },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '11px', letterSpacing: '2px',
                      color: '#7aab7a',
                      border: '1px solid rgba(57,255,20,0.15)',
                      padding: '8px 14px',
                      textDecoration: 'none',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#39ff14'; e.currentTarget.style.borderColor = 'rgba(57,255,20,0.4)'; e.currentTarget.style.textShadow = '0 0 8px #39ff14' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#7aab7a'; e.currentTarget.style.borderColor = 'rgba(57,255,20,0.15)'; e.currentTarget.style.textShadow = 'none' }}
                  >
                    <span style={{ fontSize: '14px' }}>{icon}</span>
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', fontFamily: "'VT323', monospace", fontSize: '18px', color: '#7aab7a', letterSpacing: '3px', opacity: 0.7, paddingBottom: '8px' }}>
              howOld v2.0
              <span style={{ animation: 'blink 1.2s step-end infinite' }}> _</span>
            </div>
          </motion.div>

        </div>
      </Section>
    </>
  )
}