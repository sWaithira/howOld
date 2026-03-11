export function calculateAge(dob) {
  const now = new Date()
  const birth = new Date(dob)

  if (isNaN(birth.getTime()) || birth > now) return null

  // EXACT AGE
  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  let days = now.getDate() - birth.getDate()

  if (days < 0) {
    months--
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  // TOTAL UNITS
  const diffMs = now - birth
  const totalSeconds = Math.floor(diffMs / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours   = Math.floor(totalMinutes / 60)
  const totalDays    = Math.floor(totalHours / 24)
  const totalWeeks   = Math.floor(totalDays / 7)

  // BIRTHDAY INTEL
  const DOW = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const bornOnDay = DOW[birth.getDay()]
  const isWeekend = birth.getDay() === 0 || birth.getDay() === 6

  const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
  if (nextBday <= now) nextBday.setFullYear(now.getFullYear() + 1)
  const daysUntilBirthday = Math.ceil((nextBday - now) / 86400000)

  // PLANET AGES
  const planetAges = {
    Mercury: (totalDays / 87.97).toFixed(1),
    Venus:   (totalDays / 224.7).toFixed(1),
    Mars:    (totalDays / 686.97).toFixed(1),
    Jupiter: (totalDays / 4332.59).toFixed(1),
    Saturn:  (totalDays / 10759.22).toFixed(1),
  }

  // GENERATION 
  const birthYear = birth.getFullYear()
  let generation = ''
  if      (birthYear <= 1945) generation = 'Silent Generation'
  else if (birthYear <= 1964) generation = 'Baby Boomer'
  else if (birthYear <= 1980) generation = 'Generation X'
  else if (birthYear <= 1996) generation = 'Millennial'
  else if (birthYear <= 2012) generation = 'Generation Z'
  else                        generation = 'Generation Alpha'

  // LIFE PROGRESS (Kenya avg 67 yrs) 
  const lifePercent = Math.min(
    ((years + months / 12) / 67) * 100,
    100
  ).toFixed(1)

  return {
    years, months, days,
    totalDays, totalWeeks, totalHours, totalMinutes, totalSeconds,
    daysUntilBirthday, bornOnDay, isWeekend,
    planetAges,
    generation, birthYear,
    lifePercent,
  }
}