import { useEffect, useState } from 'react'

const timeFormatter = new Intl.DateTimeFormat('sv-SE', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Europe/Stockholm',
})

function getCurrentTime() {
  return timeFormatter.format(new Date())
}

export function useLocalTime() {
  const [localTime, setLocalTime] = useState(getCurrentTime)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLocalTime(getCurrentTime())
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return localTime
}