import type { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
}

export function GradientText({
  children,
  className = '',
  colors = ['#c4f54a', '#5ca0f0', '#d4a0f0', '#c4f54a'],
  animationSpeed = 8,
}: Props) {
  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    backgroundSize: '300% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `gradient-shift ${animationSpeed}s ease infinite`,
  }

  return (
    <>
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <span className={className} style={gradientStyle}>
        {children}
      </span>
    </>
  )
}
