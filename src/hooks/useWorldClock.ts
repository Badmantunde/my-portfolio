import { useEffect, useState } from 'react'

export interface WorldCity {
  label: string
  timeZone: string
}

export const worldCities: WorldCity[] = [
  { label: 'London', timeZone: 'Europe/London' },
  { label: 'California', timeZone: 'America/Los_Angeles' },
  { label: 'New York', timeZone: 'America/New_York' },
  { label: 'Lagos', timeZone: 'Africa/Lagos' },
  { label: 'Paris', timeZone: 'Europe/Paris' },
  { label: 'Dubai', timeZone: 'Asia/Dubai' },
  { label: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { label: 'Sydney', timeZone: 'Australia/Sydney' },
]

function formatCityTime(timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date())
}

export function useWorldClock(rotateIntervalMs = 4000) {
  const [cityIndex, setCityIndex] = useState(0)
  const [time, setTime] = useState(() => formatCityTime(worldCities[0].timeZone))

  const city = worldCities[cityIndex]

  useEffect(() => {
    const rotate = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % worldCities.length)
    }, rotateIntervalMs)
    return () => clearInterval(rotate)
  }, [rotateIntervalMs])

  useEffect(() => {
    const update = () => setTime(formatCityTime(city.timeZone))
    update()
    const tick = setInterval(update, 1000)
    return () => clearInterval(tick)
  }, [city.timeZone])

  return { time, city: city.label }
}
