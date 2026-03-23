import { useAppStore } from '@/store/useAppStore'
import type { Exercise, MuscleCategory } from '@/data/types'
import { exerciseImages } from '@/data/images'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { Check, X, Maximize2, Clock, Dumbbell, BookOpen, AlertTriangle } from 'lucide-react'

type Props = {
  exercise: Exercise
  index: number
  category: MuscleCategory
}

export function ExerciseCard({ exercise, index, category }: Props) {
  const checkedExercises = useAppStore((s) => s.checkedExercises)
  const toggleExercise = useAppStore((s) => s.toggleExercise)
  const [showDetail, setShowDetail] = useState(false)
  const [imgError, setImgError] = useState(false)

  const isChecked = !!checkedExercises[exercise.id]
  const imgSrc = exerciseImages[exercise.imageKey]
  const hasImage = imgSrc && !imgError

  const categoryAccent: Record<string, string> = {
    push: 'text-push',
    pull: 'text-pull',
    legs: 'text-legs',
    upper: 'text-pull',
    lower: 'text-legs',
    fullbody: 'text-accent-green',
  }
  const accent = categoryAccent[category] || 'text-accent-green'

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
        className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer ${
          isChecked
            ? 'opacity-50 border-accent-green/20'
            : 'border-border-custom hover:border-text-muted/30'
        }`}
        onClick={() => setShowDetail(true)}
      >
        {/* Image — top, uniform aspect ratio */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
          {hasImage ? (
            <img
              src={imgSrc}
              alt={exercise.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Dumbbell size={32} className="text-text-muted/20" />
            </div>
          )}

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Number badge */}
          <div className={`absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-xs font-mono font-bold ${accent}`}>
            {index + 1}
          </div>

          {/* Stretch badge */}
          {exercise.isStretch && (
            <div className="absolute top-2.5 right-2.5">
              <span className="font-mono text-[9px] px-2 py-1 rounded-md bg-accent-green/20 backdrop-blur-sm text-accent-green border border-accent-green/20 uppercase tracking-wide">
                Stretch
              </span>
            </div>
          )}

          {/* Zoom hint — desktop only */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 lg:group-hover:opacity-100 transition-opacity pointer-events-none">
            <Maximize2 size={20} className="text-white/70" />
          </div>

          {/* Checkbox — always visible on mobile, hover on desktop */}
          <div className={`absolute bottom-2.5 right-2.5 ${isChecked ? 'opacity-100' : 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100'} transition-opacity`}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleExercise(exercise.id)
              }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90 ${
                isChecked
                  ? 'bg-accent-green text-bg'
                  : 'bg-black/60 backdrop-blur-sm text-white active:bg-accent-green active:text-bg lg:hover:bg-accent-green lg:hover:text-bg'
              }`}
              aria-label={isChecked ? `Desmarcar ${exercise.name}` : `Completar ${exercise.name}`}
            >
              <Check size={16} strokeWidth={3} />
            </button>
          </div>

          {/* Title on image */}
          <div className="absolute bottom-2.5 left-3 right-12">
            <h4 className="font-semibold text-sm text-white leading-tight truncate">
              {exercise.name}
            </h4>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="px-3 py-2.5 bg-surface-1 flex items-center justify-between gap-2">
          <p className="text-xs text-text-muted truncate flex-1">{exercise.rationale}</p>
          <div className="flex gap-1.5 shrink-0">
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded bg-surface-2 ${accent} font-medium`}>
              {exercise.sets}
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface-2 text-text-dim">
              RIR {exercise.rir}
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface-2 text-text-dim flex items-center gap-0.5">
              <Clock size={8} />{exercise.rest}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ═══ Detail Modal ═══ */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-end lg:items-center justify-center p-0 lg:p-8"
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-[900px] bg-surface-1 rounded-t-2xl lg:rounded-2xl border border-border-custom overflow-hidden max-h-[90dvh] flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image panel — left on desktop */}
              <div className="relative lg:w-[380px] xl:w-[420px] shrink-0">
                <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[480px]">
                  {hasImage ? (
                    <img
                      src={imgSrc.replace('w=400&h=400', 'w=800&h=800')}
                      alt={exercise.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-surface-2 flex items-center justify-center">
                      <Dumbbell size={48} className="text-text-muted/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface-1 via-transparent to-transparent" />

                  <button
                    onClick={() => setShowDetail(false)}
                    className="absolute top-3 right-3 lg:top-4 lg:left-4 lg:right-auto w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                    aria-label="Cerrar"
                  >
                    <X size={18} />
                  </button>

                  <div className="absolute bottom-4 left-5 right-5 lg:hidden">
                    <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight leading-tight">
                      {exercise.name}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Content panel */}
              <div className="flex-1 overflow-y-auto px-5 lg:px-6 xl:px-8 pb-5 lg:py-6">
                <div className="hidden lg:block mb-4">
                  <h2 className="font-display text-2xl xl:text-3xl font-bold uppercase tracking-tight leading-tight">
                    {exercise.name}
                  </h2>
                  {exercise.isStretch && (
                    <span className="inline-block font-mono text-xs px-2.5 py-1 mt-2 rounded-full bg-accent-green/10 text-accent-green border border-accent-green/20">
                      Ejercicio de estiramiento — Maeo 2021/2023
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 py-3 lg:py-0 lg:mb-4 text-sm border-b lg:border-b-0 border-border-custom/50">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-lg font-bold ${accent}`}>{exercise.sets}</span>
                    <span className="text-text-muted text-xs">series×reps</span>
                  </div>
                  <div className="w-px h-5 bg-border-custom" />
                  <span className="font-mono text-sm font-medium">RIR {exercise.rir}</span>
                  <div className="w-px h-5 bg-border-custom" />
                  <div className="flex items-center gap-1.5 text-text-dim">
                    <Clock size={14} />
                    <span className="font-mono text-sm">{exercise.rest}</span>
                  </div>
                </div>

                {/* Rationale */}
                <div className="py-4 lg:py-3 border-b border-border-custom/50">
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                    <BookOpen size={14} className={accent} />
                    Por que este ejercicio
                  </h4>
                  <p className="text-sm text-text-dim leading-relaxed">{exercise.rationale}</p>
                </div>

                {/* Instructions */}
                {exercise.instructions && (
                  <div className="py-4 lg:py-3 border-b border-border-custom/50">
                    <h4 className="font-display text-sm font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                      <Dumbbell size={14} className={accent} />
                      Como ejecutarlo
                    </h4>
                    <p className="text-sm text-text-dim leading-relaxed">{exercise.instructions}</p>
                  </div>
                )}

                {/* Tips */}
                <div className="py-4 lg:py-3">
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-amber-400" />
                    Claves
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-start gap-2 text-sm text-text-dim">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-accent-green/50" />
                      <span>RIR {exercise.rir}: {Number(exercise.rir) <= 1 ? 'Muy cerca del fallo — maxima intensidad' : Number(exercise.rir) <= 2 ? 'Alta intensidad pero controlada' : 'Margen de seguridad — foco en tecnica'}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-text-dim">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-accent-green/50" />
                      <span>Descanso {exercise.rest} entre series</span>
                    </div>
                    {exercise.isStretch && (
                      <div className="flex items-start gap-2 text-sm text-text-dim">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-accent-green/50" />
                        <span>Enfatiza la fase excentrica y mantén la posicion estirada 1-2s (Maeo 2021)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => {
                    toggleExercise(exercise.id)
                    setShowDetail(false)
                  }}
                  className={`w-full min-h-[48px] rounded-xl font-display text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                    isChecked
                      ? 'bg-push-bg text-push border border-push-border hover:bg-push/10'
                      : 'bg-accent-green text-bg border border-accent-green hover:bg-accent-green-dark'
                  }`}
                >
                  {isChecked ? (
                    <><X size={16} /> Desmarcar</>
                  ) : (
                    <><Check size={16} /> Completar ejercicio</>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
