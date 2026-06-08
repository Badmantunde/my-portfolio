import { useEffect, useState } from 'react'

export function useLondonTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      setTime(formatter.format(new Date()))
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}
