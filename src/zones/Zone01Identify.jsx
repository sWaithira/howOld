import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DateInput from '../components/DateInput'

export default function Zone01Identify({ onDateSet, dob, nightMode }) {
  const [locked, setLocked] = useState(false)
  const [scanning, setScanning] = useState(false)

  const accent  = nightMode ? '#ff4444' : '#39ff14'
  const accent2 = nightMode ? '#ff6666' : 'var(--amber)'
  const glow    = nightMode ? 'rgba(255,68,68,0.3)' : 'rgba(57,255,20,0.2)'

  const handleDate = (iso) => {
    setScanning(true)
    setTimeout(() => {
      setLocked(true)
      onDateSet(iso)
      setTimeout(() => {
        document.querySelector('[style*="scroll-snap-type"]')
          ?.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
      }, 800)
    }, 600)
  }

  return (
    <div style={{
      height: '100vh',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: nightMode ? '#0a0202' : '#050801',
      transition: 'background 0.6s ease',
    }}>

      {[280, 420, 560, 700].map((size, i) => (
        <motion.div
          key={size}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: locked ? 0 : [0, 0.08, 0.04],
            scale: locked ? 1.5 : 1,
            rotate: i % 2 === 0 ? 360 : -360,
          }}
          transition={{
            opacity: { duration: 1.5, delay: i * 0.2 },
            scale: { duration: 0.8 },
            rotate: { duration: 20 + i * 8, repeat: Infinity, ease: 'linear' },
          }}
          style={{
            position: 'absolute',
            width: size, height: size,
            borderRadius: '50%',
            border: `1px solid ${accent}`,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            transition: 'border-color 0.6s ease',
          }}
        />
      ))}

      {[
        { bottom: 32, left: 40,  text: 'AWAITING SUBJECT INPUT' },
        { bottom: 32, right: 40, text: locked ? 'LOCKED ON' : 'SCANNING...' },
      ].map(({ text, ...pos }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          style={{
            position: 'absolute',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '11px', letterSpacing: '3px',
            color: locked ? accent : '#8ab08a',
            transition: 'color 0.5s ease',
            ...pos,
          }}
        >
          {text}
        </motion.div>
      ))}

      {[0.35, 0.65].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.15 }}
          style={{
            position: 'absolute',
            top: `${pos * 100}%`, left: 0,
            width: '100%', height: '1px',
            background: `linear-gradient(to right, transparent, ${accent}26, transparent)`,
            transformOrigin: 'left center',
            pointerEvents: 'none',
            transition: 'background 0.6s ease',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '600px',
          padding: '0 32px', textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, letterSpacing: '8px' }}
          animate={{ opacity: 1, letterSpacing: '4px' }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '11px', color: accent,
            letterSpacing: '4px', marginBottom: '16px',
            transition: 'color 0.6s ease',
          }}
        >
        IDENTIFY SUBJECT
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(2.4rem, 9vw, 5.5rem)',
            fontWeight: '900', color: '#fff',
            letterSpacing: '6px', lineHeight: 1,
            marginBottom: '8px',
            textShadow: locked
              ? `0 0 40px ${accent}, 0 0 80px ${glow}`
              : `0 0 30px ${accent}, 0 0 80px ${glow}`,
            transition: 'text-shadow 0.6s ease',
          }}
        >
          HOW<span style={{ color: accent, transition: 'color 0.6s ease' }}>OLD</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '12px', color: accent2,
            letterSpacing: '3px', marginBottom: '48px',
            transition: 'color 0.6s ease',
          }}
        >
          ⚠ ENTER BIRTH DATE TO BEGIN
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{
            background: nightMode ? 'rgba(14,3,3,0.9)' : 'rgba(9,14,3,0.9)',
            border: `1px solid ${locked ? accent : accent + '44'}`,
            padding: '32px', position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.5s ease, background 0.6s ease',
            boxShadow: locked ? `0 0 40px ${glow}, inset 0 0 40px ${glow}` : 'none',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: '3px', height: '100%',
            background: accent, boxShadow: `0 0 12px ${accent}`,
            transition: 'background 0.6s ease',
          }} />

          {scanning && !locked && (
            <motion.div
              initial={{ top: 0 }}
              animate={{ top: '100%' }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${accent2}, transparent)`,
                boxShadow: `0 0 12px ${accent2}`,
                pointerEvents: 'none', zIndex: 10,
              }}
            />
          )}

          <AnimatePresence>
            {locked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: nightMode ? 'rgba(14,3,3,0.92)' : 'rgba(9,14,3,0.92)',
                  zIndex: 20, flexDirection: 'column', gap: '12px',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    border: `2px solid ${accent}`, boxShadow: `0 0 20px ${accent}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', color: accent,
                  }}
                >
                  ✓
                </motion.div>
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '13px', color: accent,
                  letterSpacing: '4px', textShadow: `0 0 10px ${accent}`,
                }}>
                  SUBJECT LOCKED
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <DateInput onChange={handleDate} nightMode={nightMode} />
        </motion.div>

        <AnimatePresence>
          {locked && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: '32px',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '11px', color: '#6a8a6a',
                letterSpacing: '3px',
              }}
            >
              ↓↓↓
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}