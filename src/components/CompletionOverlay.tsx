import { motion } from 'motion/react'
import { Trophy, Flame, ArrowRight } from 'lucide-react'
import { GradientText } from './effects/GradientText'

type Props = {
  dayLabel: string
  dayName: string
  totalSets: number
  estimatedMinutes: [number, number]
  onNext: () => void
  onDismiss: () => void
}

export function CompletionOverlay({ dayLabel, dayName, totalSets, estimatedMinutes, onNext, onDismiss }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-xl flex items-center justify-center p-6"
      onClick={onDismiss}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.1 }}
        className="max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Trophy icon with glow */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-24 h-24 mx-auto rounded-3xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center relative">
            <Trophy size={48} className="text-accent-green" />
            <div className="absolute inset-0 rounded-3xl bg-accent-green/5 animate-pulse" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-2">
            <GradientText colors={['#c4f54a', '#5cf0a8', '#5ca0f0', '#c4f54a']}>
              Completado
            </GradientText>
          </h2>
          <p className="text-text-dim text-lg mb-6">
            {dayName} — {dayLabel}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mb-8"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Flame size={18} className="text-push" />
              <span className="font-display text-3xl font-bold text-push">{totalSets}</span>
            </div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">series</span>
          </div>
          <div className="w-px bg-border-custom" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="font-display text-3xl font-bold text-accent-green">
                ~{Math.round((estimatedMinutes[0] + estimatedMinutes[1]) / 2)}
              </span>
            </div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">minutos</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={onNext}
            className="w-full min-h-[52px] bg-accent-green text-bg font-display text-lg font-semibold uppercase tracking-wide rounded-xl flex items-center justify-center gap-2 active:scale-95 hover:bg-accent-green-dark transition-all cursor-pointer"
          >
            Siguiente dia <ArrowRight size={20} />
          </button>
          <button
            onClick={onDismiss}
            className="w-full min-h-[44px] bg-transparent text-text-muted font-mono text-sm rounded-xl border border-border-custom hover:bg-surface-2 active:scale-95 transition-all cursor-pointer"
          >
            Cerrar
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
