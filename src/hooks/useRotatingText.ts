import { useEffect, useState } from 'react'

export function useRotatingText(items: string[], intervalMs = 3500) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [items.length, intervalMs])

  return items[index]
}
