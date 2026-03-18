import type { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  shimmerWidth?: number
  speed?: number
}

export function ShinyText({
  children,
  className = '',
  shimmerWidth = 100,
  speed = 3,
}: Props) {
  const style: CSSProperties = {
    backgroundImage: `linear-gradient(
      120deg,
      rgba(255,255,255,0) 40%,
      rgba(255,255,255,0.12) 50%,
      rgba(255,255,255,0) 60%
    )`,
    backgroundSize: `${shimmerWidth}px 100%`,
    backgroundRepeat: 'no-repeat',
    animation: `shimmer ${speed}s infinite linear`,
  }

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -${shimmerWidth}px 0; }
          100% { background-position: calc(100% + ${shimmerWidth}px) 0; }
        }
      `}</style>
      <span className={className} style={style}>
        {children}
      </span>
    </>
  )
}
