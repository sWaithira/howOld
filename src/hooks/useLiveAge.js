import { useState, useEffect } from 'react'
import { calculateAge } from '../utils/calculateAge'

export function useLiveAge(dob) {
  const [ageData, setAgeData] = useState(null)

  useEffect(() => {
    if (!dob) {
      setAgeData(null)
      return
    }

    const tick = () => setAgeData(calculateAge(dob))

    tick()                             
    const interval = setInterval(tick, 1000) 

    return () => clearInterval(interval)    
  }, [dob])

  return ageData
}