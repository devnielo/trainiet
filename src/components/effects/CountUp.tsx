import { useEffect, useRef, useState } from 'react'

type Props = {
  end: number
  duration?: number
  suffix?: string
  className?: string
}

export function CountUp({ end, duration = 600, suffix = '', className = '' }: Props) {
  const [count, setCount] = useState(0)
  const prevEnd = useRef(0)

  useEffect(() => {
    const start = prevEnd.current
    prevEnd.current = end
    if (start === end) {
      setCount(end)
      return
    }

    const startTime = performance.now()
    const diff = end - start

    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setCount(Math.round(start + diff * eased))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [end, duration])

  return <span className={className}>{count}{suffix}</span>
}
