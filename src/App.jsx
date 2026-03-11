import { useState, useEffect } from 'react'
import { useLiveAge } from './hooks/useLiveAge'
import Zone01Identify from './zones/Zone01Identify'
import Zone02Temporal from './zones/Zone02Temporal'
import './styles/globals.css'

export default function App() {
  const [dob, setDob] = useState('')
  const [nightMode, setNightMode] = useState(false)
  const age = useLiveAge(dob)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', nightMode ? 'night' : 'default')
  }, [nightMode])

  return (
    <div style={{
      height: '100vh',
      overflowY: 'scroll',
      scrollSnapType: 'y mandatory',
      scrollBehavior: 'smooth',
    }}>
      <Zone01Identify onDateSet={(iso) => setDob(iso)} dob={dob} nightMode={nightMode} />
      <Zone02Temporal age={age} nightMode={nightMode} />

      <button
        onClick={() => setNightMode(n => !n)}
        title={nightMode ? 'Switch to green mode' : 'Switch to night mode'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: nightMode ? '1px solid #ff1a1a66' : '1px solid #39ff1466',
          background: nightMode ? 'rgba(20,3,3,0.9)' : 'rgba(3,6,1,0.9)',
          color: nightMode ? '#ff4444' : '#39ff14',
          fontSize: '18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: nightMode ? '0 0 20px rgba(255,26,26,0.3)' : '0 0 20px rgba(57,255,20,0.2)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.4s ease',
        }}
      >
        {nightMode ? '🟢' : '🔴'}
      </button>
    </div>
  )
}