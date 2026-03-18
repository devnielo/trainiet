import { useAppStore } from '@/store/useAppStore'
import type { Exercise, MuscleCategory } from '@/data/types'
import { exerciseImages } from '@/data/images'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { ChevronDown, Check, X, Maximize2 } from 'lucide-react'

type Props = {
  exercise: Exercise
  index: number
  category: MuscleCategory
}

export function ExerciseCard({ exercise, index }: Props) {
  const checkedExercises = useAppStore((s) => s.checkedExercises)
  const toggleExercise = useAppStore((s) => s.toggleExercise)
  const [expanded, setExpanded] = useState(false)
  const [showImage, setShowImage] = useState(false)

  const isChecked = !!checkedExercises[exercise.id]
  const imgSrc = exerciseImages[exercise.imageKey]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
        className={`bg-surface-1 border rounded-xl overflow-hidden transition-all hover:border-text-muted/40 ${
          isChecked ? 'opacity-40 border-accent-green/10' : 'border-border-custom'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4">
          {/* Checkbox - 44px touch target */}
          <button
            onClick={() => toggleExercise(exercise.id)}
            className="shrink-0 w-10 h-10 sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label={isChecked ? `Desmarcar ${exercise.name}` : `Marcar ${exercise.name} como completado`}
          >
            <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center text-sm transition-all ${
              isChecked
                ? 'bg-accent-green border-accent-green text-bg'
                : 'border-border-custom bg-surface-2 hover:border-text-muted'
            }`}>
              {isChecked && <Check size={16} strokeWidth={3} />}
            </div>
          </button>

          {/* Number */}
          <span className="font-mono text-xs sm:text-sm text-text-muted w-4 sm:w-5 text-center shrink-0">
            {index + 1}
          </span>

          {/* Image — bigger, clickable to enlarge */}
          {imgSrc && (
            <button
              onClick={() => setShowImage(true)}
              className="relative group shrink-0 cursor-pointer rounded-xl overflow-hidden border border-border-custom hover:border-accent-green/30 transition-colors"
              aria-label={`Ver imagen de ${exercise.name}`}
            >
              <img
                src={imgSrc}
                alt={exercise.name}
                loading="lazy"
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover"
              />
              {/* Zoom icon overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Maximize2 size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm sm:text-base leading-tight mb-1">
              {exercise.name}
              {exercise.isStretch && (
                <span className="inline-block font-mono text-[10px] px-2 py-0.5 rounded-md bg-accent-green-bg text-accent-green-dark border border-accent-green/10 ml-2 align-middle uppercase tracking-wide">
                  Estiramiento
                </span>
              )}
            </div>
            <div className="text-sm text-text-muted mb-1.5">{exercise.rationale}</div>
            <div className="flex gap-2 flex-wrap">
              <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-surface-2 text-accent-green font-medium">
                {exercise.sets}
              </span>
              <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-surface-2 text-text-dim">
                RIR {exercise.rir}
              </span>
              <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-surface-2 text-text-dim">
                {exercise.rest}
              </span>
            </div>
          </div>

          {/* Expand button - 44px touch target */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`shrink-0 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-text-muted hover:text-text hover:bg-surface-2 transition-all cursor-pointer ${
              expanded ? 'rotate-180 bg-surface-2' : ''
            }`}
            aria-label={expanded ? 'Ocultar instrucciones' : 'Ver instrucciones'}
          >
            <ChevronDown size={18} />
          </button>
        </div>

        {/* Instructions */}
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-sm text-text-dim leading-relaxed px-4 md:px-5 py-4 border-t border-border-custom bg-surface-2/30"
          >
            {exercise.instructions}
          </motion.div>
        )}
      </motion.div>

      {/* ═══ Image Lightbox Modal ═══ */}
      <AnimatePresence>
        {showImage && imgSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setShowImage(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowImage(false)}
                className="absolute -top-12 right-0 md:top-3 md:right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors cursor-pointer z-10"
                aria-label="Cerrar imagen"
              >
                <X size={20} />
              </button>

              {/* Large image */}
              <img
                src={imgSrc.replace('w=400&h=400', 'w=1200&h=800&fit=crop')}
                alt={exercise.name}
                className="w-full rounded-2xl border border-border-custom/30 shadow-2xl"
              />

              {/* Exercise info below image */}
              <div className="mt-4 text-center">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
                  {exercise.name}
                </h3>
                <div className="flex gap-3 justify-center mt-2">
                  <span className="font-mono text-sm px-3 py-1 rounded-lg bg-white/10 text-accent-green">
                    {exercise.sets}
                  </span>
                  <span className="font-mono text-sm px-3 py-1 rounded-lg bg-white/10 text-text-dim">
                    RIR {exercise.rir}
                  </span>
                  <span className="font-mono text-sm px-3 py-1 rounded-lg bg-white/10 text-text-dim">
                    {exercise.rest}
                  </span>
                </div>
                {exercise.isStretch && (
                  <span className="inline-block font-mono text-xs px-3 py-1 mt-2 rounded-full bg-accent-green/10 text-accent-green border border-accent-green/20">
                    Ejercicio de estiramiento
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
