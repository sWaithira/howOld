import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FlipCard from '../components/FlipCard'
import { getCards } from '../data/cards'
import { CARD_DECKS } from '../data/cardDecks'

const THEMES = [
  { id: 'navy',    label: 'Navy · Gold',         color: '#d4af37' },
  { id: 'journal', label: 'Journal · Amber',      color: '#c8a050' },
  { id: 'terra',   label: 'Terra · Terracotta',   color: '#d2784a' },
  { id: 'crimson', label: 'Crimson · Red',         color: '#c83232' },
]

const ROADMAP = [
  { version: 'v3.0', status: 'live',     label: 'Card Discovery Experience', items: ['8 free insight cards', 'Three themes', 'PWA installable', 'Shareable cards'] },
  { version: 'v3.5', status: 'soon',     label: 'Memory Layer',              items: ['User accounts', 'Today in your timeline — diary', 'Saved cards', 'Mood tracking'] },
  { version: 'v4.0', status: 'planned',  label: 'Depth & Monetization',      items: ['Premium card unlocks', 'Paystack subscriptions', 'Weekly life grid', 'Identity archetypes'] },
  { version: 'v4.5', status: 'planned',  label: 'Community & Intelligence',  items: ['Anonymous age comparisons', 'Weekly email insights', 'Custom avatars', 'Theme unlocks'] },
]

export default function Zone02Cards({ age, user, userDoc, onReset }) {
  const [cardIndex, setCardIndex]   = useState(0)
  const [theme, setTheme]           = useState('navy')
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showRoadmap, setShowRoadmap]   = useState(false)
  const [deckTheme, setDeckTheme]       = useState('nautical')
  const [shuffleStyle, setShuffleStyle] = useState('fan')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const cards = age ? getCards(age) : []

  if (!age || cards.length === 0) {
    return (
      <div data-zone='02' style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '4px', color: 'var(--text3)' }}>
          enter your birthdate above
        </div>
      </div>
    )
  }

  const currentCard = cards[cardIndex]
  const freeCards    = cards.filter(c => c.tier === 'free')
  const premiumCards = cards.filter(c => c.tier === 'premium')

  const LIFE_WEEKS  = 80 * 52
  const weeksLived  = age.totalWeeks
  const weeksLeft   = Math.max(0, LIFE_WEEKS - weeksLived)
  const lifePercent = Math.min(100, (weeksLived / LIFE_WEEKS) * 100)

  return (
    <>
      {/* ══════════════════════════════════════════
          SECTION 1 — CARD DECK
      ══════════════════════════════════════════ */}
      <div
        data-zone='02'
        style={{
          minHeight: '100vh',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 24px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* background gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 20%, var(--bg3) 0%, var(--bg) 60%)',
          pointerEvents: 'none',
        }} />

        {/* ── TOP BAR ── */}
        <div style={{
          position: 'absolute', top: '24px', left: '24px', right: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          zIndex: 20,
        }}>
          {/* wordmark */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '4px', color: 'var(--text3)' }}>
            howOld
          </div>

          {/* theme switcher */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={t.label}
                style={{
                  width: theme === t.id ? '22px' : '14px',
                  height: theme === t.id ? '22px' : '14px',
                  borderRadius: '50%',
                  background: t.color,
                  border: theme === t.id ? `2px solid rgba(255,255,255,0.6)` : '2px solid transparent',
                  boxShadow: theme === t.id ? `0 0 14px ${t.color}cc, 0 0 4px ${t.color}` : 'none',
                  transition: 'all 0.25s ease',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* card count */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'var(--text3)' }}>
            {freeCards.length} free · {premiumCards.length} premium
          </div>
        </div>

        {/* ── DECK + SHUFFLE PICKERS ── */}
        <div style={{ position: 'absolute', top: '56px', left: '24px', right: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 20 }}>
          {/* deck theme */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {CARD_DECKS.map(d => (
              <button key={d.id} onClick={() => setDeckTheme(d.id)} title={d.label}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', background: deckTheme === d.id ? `${d.accent}22` : 'transparent', border: `1px solid ${deckTheme === d.id ? d.accent : 'transparent'}`, borderRadius: '6px', padding: '4px 6px', transition: 'all 0.2s', opacity: d.tier === 'premium' ? 0.5 : 1 }}>
                {d.icon}
              </button>
            ))}
          </div>
          {/* shuffle style */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {[{id:'fan',label:'Fan'},{id:'riffle',label:'Riffle'},{id:'arc',label:'Arc'}].map(s => (
              <button key={s.id} onClick={() => setShuffleStyle(s.id)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '1px', padding: '4px 8px', borderRadius: '4px', background: shuffleStyle === s.id ? 'var(--glass-bg)' : 'transparent', border: `1px solid ${shuffleStyle === s.id ? 'var(--accent)' : 'transparent'}`, color: shuffleStyle === s.id ? 'var(--accent)' : 'var(--text3)', transition: 'all 0.2s' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CARD ── */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={cardIndex}
              initial={{ opacity: 0, x: 60, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <FlipCard
                card={currentCard}
                index={cardIndex}
                total={cards.length}
                onNext={() => setCardIndex(i => Math.min(i + 1, cards.length - 1))}
                onPrev={() => setCardIndex(i => Math.max(i - 1, 0))}
                shuffleStyle={shuffleStyle}
                deckThemeId={deckTheme}
                user={user}
                age={age}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── BOTTOM ACTIONS ── */}
        <div style={{
          position: 'absolute', bottom: '24px', left: '24px', right: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          zIndex: 20,
        }}>
          <button
            onClick={() => setShowAnalysis(true)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px',
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--text3)', padding: '8px 16px', borderRadius: '4px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)' }}
          >
            FULL ANALYSIS ↗
          </button>

          <button
            onClick={() => setShowRoadmap(r => !r)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px',
              background: 'transparent', border: 'none',
              color: 'var(--text3)', padding: '8px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
          >
            ROADMAP
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 2 — FULL ANALYSIS (deep view)
      ══════════════════════════════════════════ */}
      <div
        data-zone='03'
        style={{
          minHeight: '100vh',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
          padding: '60px 24px',
          position: 'relative',
          overflowY: 'auto',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>

          {/* section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '48px' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '4px', color: 'var(--text3)', marginBottom: '12px' }}>
              // FULL ANALYSIS
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 300, color: 'var(--text)', letterSpacing: '-1px' }}>
              Your complete<br /><span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>life metrics.</span>
            </div>
          </motion.div>

          {/* ── LIVE STATS GRID ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}
          >
            {[
              { label: 'Years',        value: age.years,                     accent: 'var(--accent)' },
              { label: 'Total Days',   value: age.totalDays.toLocaleString(), accent: 'var(--accent)' },
              { label: 'Months',       value: age.months,                    accent: 'var(--text2)' },
              { label: 'Total Hours',  value: age.totalHours.toLocaleString(), accent: 'var(--text2)' },
              { label: 'Days',         value: age.days,                      accent: 'var(--text2)' },
              { label: 'Total Weeks',  value: age.totalWeeks.toLocaleString(), accent: 'var(--text2)' },
              { label: 'Total Minutes', value: age.totalMinutes.toLocaleString(), accent: 'var(--text3)' },
              { label: 'Seconds ',   value: age.totalSeconds.toLocaleString(), accent: '#e06060', live: true },
            ].map(({ label, value, accent, live }) => (
              <div key={label} style={{
                padding: '20px', borderRadius: '12px', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 var(--glass-shine)',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '3px', color: 'var(--text3)', marginBottom: '8px' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 300, color: accent, lineHeight: 1 }}>
                  {live ? age.totalSeconds.toLocaleString() : value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── BIRTHDAY INTEL ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}
          >
            {[
              { label: 'Born On',       value: age.bornOnDay },
              { label: 'Birth Year',    value: age.birthYear },
              { label: 'Birth Type',    value: age.isWeekend ? 'Weekend' : 'Weekday' },
              { label: 'Next Birthday', value: `${age.daysUntilBirthday} days` },
            ].map(({ label, value }) => (
              <div key={label} style={{
                padding: '20px', borderRadius: '12px', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 var(--glass-shine)',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '3px', color: 'var(--text3)', marginBottom: '8px' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400, color: 'var(--accent)' }}>{value}</div>
              </div>
            ))}
          </motion.div>

          {/* ── PLANET AGES ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ padding: '24px', borderRadius: '12px', marginBottom: '24px', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 var(--glass-shine)' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '3px', color: 'var(--text3)', marginBottom: '20px' }}>PLANETARY AGES</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[
                { emoji: '☿', name: 'Mercury', key: 'Mercury', color: '#b8b8b8' },
                { emoji: '♀', name: 'Venus',   key: 'Venus',   color: '#ff9f43' },
                { emoji: '♂', name: 'Mars',     key: 'Mars',    color: '#ff6b6b' },
                { emoji: '♃', name: 'Jupiter',  key: 'Jupiter', color: '#c8a96e' },
              ].map(p => (
                <div key={p.key} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{p.emoji}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 300, color: p.color, lineHeight: 1 }}>
                    {age.planetAges?.[p.key] ?? '—'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px', marginTop: '4px' }}>{p.name}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── WEEKS PROGRESS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ padding: '24px', borderRadius: '12px', marginBottom: '24px', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 var(--glass-shine)' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '3px', color: 'var(--text3)', marginBottom: '20px' }}>FOUR THOUSAND WEEKS</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '6px' }}>LIVED</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 300, color: 'var(--accent)', lineHeight: 1 }}>{weeksLived.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '6px' }}>REMAINING</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 300, color: 'var(--text2)', lineHeight: 1 }}>{weeksLeft.toLocaleString()}</div>
              </div>
            </div>
            <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lifePercent}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{ height: '100%', background: 'var(--accent)', borderRadius: '2px' }}
              />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', marginTop: '8px', letterSpacing: '1px' }}>
              {lifePercent.toFixed(1)}% of estimated 80-year life elapsed
            </div>
          </motion.div>

          {/* ── GENERATION ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ padding: '24px', borderRadius: '12px', marginBottom: '48px', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 var(--glass-shine)' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '3px', color: 'var(--text3)', marginBottom: '12px' }}>GENERATION</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 300, color: 'var(--accent)', marginBottom: '4px' }}>{age.generation}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text2)' }}>Born {age.birthYear}</div>
          </motion.div>

          {/* ── ROADMAP ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '4px', color: 'var(--text3)', marginBottom: '28px' }}>// ROADMAP</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
              {ROADMAP.map((step, i) => (
                <div key={step.version} style={{
                  padding: '20px 24px',
                  background: step.status === 'live' ? `var(--surface)` : 'transparent',
                  border: step.status === 'live' ? `1px solid var(--accent)44` : '1px solid var(--border)',
                  borderRadius: '12px',
                  borderLeft: `3px solid ${step.status === 'live' ? 'var(--accent)' : step.status === 'soon' ? 'var(--text2)' : 'var(--border)'}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px' }}>{step.version}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2px',
                      color: step.status === 'live' ? 'var(--accent)' : step.status === 'soon' ? 'var(--text2)' : 'var(--text3)',
                      border: `1px solid currentColor`, padding: '2px 8px', borderRadius: '20px',
                    }}>
                      {step.status === 'live' ? '● LIVE' : step.status === 'soon' ? '○ SOON' : '○ PLANNED'}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{step.label}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {step.items.map(item => (
                      <span key={item} style={{
                        fontFamily: 'var(--font-body)', fontSize: '12px',
                        color: 'var(--text2)', background: 'var(--bg3)',
                        padding: '4px 10px', borderRadius: '20px',
                        border: '1px solid var(--border)',
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* credits */}
            <div style={{ textAlign: 'center', padding: '32px 0', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 300, color: 'var(--text)', marginBottom: '8px' }}>
                how<span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Old</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '16px' }}>
                TEMPORAL INTELLIGENCE PLATFORM · v3.0
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '12px' }}>
                {[
                  { label: 'GitHub', href: 'https://github.com/sWaithira/howOld' },
                  { label: 'Portfolio', href: 'https://portfolio-website-sepia-rho.vercel.app/' },
                  { label: 'Email', href: 'mailto:sw.nyawira@gmail.com' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target='_blank' rel='noopener noreferrer'
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'var(--text3)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
                  >
                    {label}
                  </a>
                ))}
              </div>
              {onReset && (
                <button onClick={onReset} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '4px', color: 'var(--text3)', padding: '8px 16px', marginBottom: '16px', display: 'block', margin: '0 auto 16px' }}>
                  change birthdate
                </button>
              )}
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text3)' }}>
                built by <a href='https://portfolio-website-sepia-rho.vercel.app/' target='_blank' rel='noopener noreferrer'
                  style={{ color: 'var(--accent)', textDecoration: 'none' }}>Susan Waithira</a> · Nairobi, Kenya 🇰🇪
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}