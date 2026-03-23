import { useAppStore } from '@/store/useAppStore'
import { useProfileStore } from '@/store/useProfileStore'
import { phases, evaPhases } from '@/data/phases'
import { programDays, evaProgramDays } from '@/data/exercises'
import { ExerciseCard } from './ExerciseCard'
import { PhaseSelector } from './PhaseSelector'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight, RotateCcw, Clock, Layers, Zap, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { GradientText } from './effects/GradientText'
import { ShinyText } from './effects/ShinyText'
import { CompletionOverlay } from './CompletionOverlay'
import { useState, useEffect } from 'react'

export function TrainingTab() {
  const currentPhase = useAppStore((s) => s.currentPhase)
  const currentDay = useAppStore((s) => s.currentDay)
  const setCurrentDay = useAppStore((s) => s.setCurrentDay)
  const checkedExercises = useAppStore((s) => s.checkedExercises)
  const clearChecks = useAppStore((s) => s.clearChecks)

  const activeProfile = useProfileStore((s) => s.activeProfile)
  const isEva = activeProfile === 'eva'
  const phaseList = isEva ? evaPhases : phases
  const daysList = isEva ? evaProgramDays : programDays

  const phase = phaseList.find((p) => p.id === currentPhase) ?? phaseList[phaseList.length - 1]
  const days = daysList[currentPhase] ?? []
  const day = days[currentDay]

  const totalDays = days.length
  const prevDay = () => setCurrentDay((currentDay - 1 + totalDays) % totalDays)
  const nextDay = () => setCurrentDay((currentDay + 1) % totalDays)

  const dayExercises = day?.exercises ?? []
  const checked = dayExercises.filter((e) => checkedExercises[e.id]).length
  const progressPercent = dayExercises.length
    ? Math.round((checked / dayExercises.length) * 100)
    : 0

  const allCompleted = dayExercises.length > 0 && checked === dayExercises.length
  const [showCompletion, setShowCompletion] = useState(false)
  const [prevChecked, setPrevChecked] = useState(checked)
  const [trackedDay, setTrackedDay] = useState(currentDay)

  useEffect(() => {
    // Reset tracking when day changes — never show popup on day switch
    if (currentDay !== trackedDay) {
      setTrackedDay(currentDay)
      setPrevChecked(checked)
      setShowCompletion(false)
      return
    }
    // Only show popup when user just checked the LAST exercise (checked went from N-1 to N)
    if (allCompleted && checked > prevChecked && prevChecked < dayExercises.length) {
      setShowCompletion(true)
    }
    setPrevChecked(checked)
  }, [checked, currentDay, trackedDay, allCompleted, prevChecked, dayExercises.length])

  const categoryColors: Record<string, string> = {
    push: 'text-push bg-push-bg border-push-border',
    pull: 'text-pull bg-pull-bg border-pull-border',
    legs: 'text-legs bg-legs-bg border-legs-border',
    upper: 'text-pull bg-pull-bg border-pull-border',
    lower: 'text-legs bg-legs-bg border-legs-border',
    fullbody: 'text-accent-green bg-accent-green-bg border-accent-green/20',
  }

  const categoryDot: Record<string, string> = {
    push: 'bg-push',
    pull: 'bg-pull',
    legs: 'bg-legs',
    upper: 'bg-pull',
    lower: 'bg-legs',
    fullbody: 'bg-accent-green',
  }

  // Count completed exercises per day for sidebar
  const getDayProgress = (dayIndex: number) => {
    const d = days[dayIndex]
    if (!d) return { checked: 0, total: 0 }
    const c = d.exercises.filter((e) => checkedExercises[e.id]).length
    return { checked: c, total: d.exercises.length }
  }

  return (
    <div className="lg:flex lg:h-[calc(100dvh-49px)]" style={{ touchAction: 'manipulation' }}>

      {/* ═══════════════════════════════════════════ */}
      {/* SIDEBAR — only visible on lg+ (≥1024px)    */}
      {/* ═══════════════════════════════════════════ */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[280px] xl:w-[300px] lg:shrink-0 bg-surface-1 border-r border-border-custom">
        {/* Sidebar Header */}
        <div className="px-5 pt-6 pb-4 border-b border-border-custom">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
              <Zap size={16} className="text-accent-green" />
            </div>
            <span className="font-display text-lg font-bold uppercase tracking-tight">Trainiet</span>
          </div>
          <p className="text-text-muted text-xs font-mono mt-2 tracking-wide uppercase">
            {phase.splitType} · {phase.daysPerWeek} dias
          </p>
        </div>

        {/* Phase Selector in sidebar */}
        <div className="px-4 py-4 border-b border-border-custom">
          <PhaseSelector />
        </div>

        {/* Day list */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {days.map((d, i) => {
            const prog = getDayProgress(i)
            const isActive = i === currentDay
            const isDone = prog.total > 0 && prog.checked === prog.total
            return (
              <button
                key={d.id}
                onClick={() => setCurrentDay(i)}
                className={`w-full text-left px-3 py-3 rounded-xl transition-all cursor-pointer group flex items-center gap-3 ${
                  isActive
                    ? 'bg-surface-3 border border-border-custom'
                    : 'border border-transparent hover:bg-surface-2'
                }`}
              >
                {/* Day dot */}
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  isDone ? 'bg-accent-green' : isActive ? categoryDot[d.category] : 'bg-surface-3'
                }`} />

                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${isActive ? 'text-text' : 'text-text-dim'}`}>
                    {d.dayLetter}
                  </div>
                  <div className={`text-xs truncate ${isActive ? 'text-text-muted' : 'text-text-muted/60'}`}>
                    {d.label} — {d.subtitle}
                  </div>
                </div>

                {/* Progress indicator */}
                {isDone ? (
                  <CheckCircle2 size={16} className="text-accent-green shrink-0" />
                ) : prog.checked > 0 ? (
                  <span className="text-xs font-mono text-text-muted shrink-0">
                    {prog.checked}/{prog.total}
                  </span>
                ) : null}
              </button>
            )
          })}
        </nav>

        {/* Sidebar footer — progress + actions */}
        <div className="px-4 py-4 border-t border-border-custom space-y-3">
          <div>
            <div className="flex justify-between font-mono text-xs text-text-muted mb-1.5">
              <span>Progreso del dia</span>
              <span className="text-accent-green font-medium">{checked}/{dayExercises.length}</span>
            </div>
            <Progress value={progressPercent} className="h-1.5 bg-surface-3" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (confirm('Limpiar checks para nueva semana?')) clearChecks()
              }}
              className="flex-1 font-mono text-xs min-h-[40px] px-3 rounded-lg border border-push-border bg-transparent text-push active:scale-95 hover:bg-push-bg transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={14} /> Limpiar
            </button>
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════ */}
      {/* MAIN CONTENT                                */}
      {/* ═══════════════════════════════════════════ */}
      <main className="flex-1 lg:overflow-y-auto">
        <div className="px-4 md:px-6 lg:px-8 xl:px-10 pb-28 lg:pb-10">

          {/* Header — shown on mobile, condensed on desktop */}
          <div className="text-center py-8 md:py-10 lg:py-6">
            {/* Full header on mobile */}
            <div className="lg:hidden">
              <ShinyText className="inline-block font-mono text-xs tracking-[2px] uppercase text-accent-green px-4 py-1.5 border border-accent-green/20 rounded-full mb-3">
                Evidencia 2023-2026
              </ShinyText>
              <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-2">
                Plan de Recomposicion{' '}
                <GradientText className="font-display italic font-bold" colors={['#c4f54a', '#5cf0a8', '#5ca0f0', '#c4f54a']}>
                  Corporal
                </GradientText>
              </h1>
              <p className="text-text-dim text-sm">
                {phase.splitType} · {phase.daysPerWeek} dias · {phase.name}
              </p>
            </div>

            {/* Condensed header on desktop */}
            <div className="hidden lg:block text-left">
              <h1 className="font-display text-2xl xl:text-3xl font-bold leading-tight">
                {day?.dayLetter} —{' '}
                <GradientText className="font-display font-bold" colors={['#c4f54a', '#5cf0a8', '#5ca0f0', '#c4f54a']}>
                  {day?.label}
                </GradientText>
              </h1>
              <p className="text-text-dim text-sm mt-1">
                {day?.subtitle} · {day?.muscles}
              </p>
            </div>
          </div>

          {/* Phase Selector — only on mobile */}
          <div className="lg:hidden">
            <PhaseSelector />
          </div>

          {/* Day Navigation — only on mobile */}
          <div className="lg:hidden sticky top-[49px] z-40 bg-bg/95 backdrop-blur-xl border-b border-border-custom py-3 -mx-4 md:-mx-6 px-4 md:px-6">
            <div className="flex items-center gap-2">
              <button
                onClick={prevDay}
                className="shrink-0 min-w-[44px] min-h-[44px] rounded-xl bg-surface-2 border border-border-custom text-text-dim flex items-center justify-center active:scale-90 hover:bg-surface-3 transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide py-0.5">
                {days.map((d, i) => (
                  <button
                    key={d.id}
                    onClick={() => setCurrentDay(i)}
                    className={`shrink-0 font-mono text-sm min-h-[44px] px-4 rounded-xl border transition-all cursor-pointer hover:bg-surface-2 ${
                      i === currentDay
                        ? `${categoryColors[d.category]} font-medium`
                        : 'border-border-custom text-text-muted bg-transparent'
                    }`}
                  >
                    {d.dayLetter.slice(0, 3)}·{d.label}
                  </button>
                ))}
              </div>

              <button
                onClick={nextDay}
                className="shrink-0 min-w-[44px] min-h-[44px] rounded-xl bg-surface-2 border border-border-custom text-text-dim flex items-center justify-center active:scale-90 hover:bg-surface-3 transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Progress Bar — only on mobile */}
          <div className="lg:hidden py-4 mb-2">
            <div className="flex justify-between font-mono text-sm text-text-muted mb-2">
              <span>Progreso</span>
              <span className="text-accent-green font-medium">
                {checked}/{dayExercises.length}
              </span>
            </div>
            <Progress value={progressPercent} className="h-2 bg-surface-3" />
          </div>

          {/* Desktop progress bar — inline */}
          <div className="hidden lg:block mb-4">
            <div className="flex items-center gap-4">
              <Progress value={progressPercent} className="h-1.5 bg-surface-3 flex-1" />
              <span className="font-mono text-sm text-accent-green font-medium shrink-0">
                {checked}/{dayExercises.length}
              </span>
            </div>
          </div>

          {/* Day Header */}
          {day && (
            <AnimatePresence mode="wait">
              <motion.div
                key={day.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Day info — mobile only (desktop shows in header) */}
                <div className="lg:hidden flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border-custom py-5 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`font-mono text-xs font-medium px-3 min-h-[44px] rounded-xl flex items-center justify-center border ${categoryColors[day.category]}`}
                    >
                      {day.dayLetter.slice(0, 3)}
                    </div>
                    <div>
                      <div className="font-semibold text-lg md:text-xl">
                        {day.dayLetter} — {day.label} — {day.subtitle}
                      </div>
                      <div className="text-sm text-text-dim">{day.muscles}</div>
                    </div>
                  </div>
                  <div className="flex gap-4 font-mono text-sm text-text-muted ml-14 md:ml-0">
                    <span className="flex items-center gap-1.5">
                      <Layers size={14} className="text-accent-green" />
                      <b className="text-accent-green">{day.totalSets}</b> series
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-accent-green" />
                      <b className="text-accent-green">
                        {day.estimatedMinutes[0]}-{day.estimatedMinutes[1]}
                      </b>{' '}
                      min
                    </span>
                  </div>
                </div>

                {/* Desktop day stats */}
                <div className="hidden lg:flex items-center gap-6 font-mono text-sm text-text-muted mb-5 pb-4 border-b border-border-custom">
                  <span className="flex items-center gap-1.5">
                    <Layers size={14} className="text-accent-green" />
                    <b className="text-accent-green">{day.totalSets}</b> series
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-accent-green" />
                    <b className="text-accent-green">
                      {day.estimatedMinutes[0]}-{day.estimatedMinutes[1]}
                    </b>{' '}
                    min
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${categoryColors[day.category]}`}>
                    {day.category.toUpperCase()}
                  </span>
                </div>

                {/* Exercises — grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
                  {day.exercises.map((exercise, i) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      index={i}
                      category={day.category}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Action buttons — inline at end of exercises */}
        {day && (
          <div className="flex gap-3 justify-center mt-6 mb-4 lg:mb-8 px-2">
            <button
              onClick={prevDay}
              className="flex-1 max-w-[160px] lg:max-w-[200px] font-mono text-sm min-h-[48px] px-4 rounded-xl border border-border-custom bg-surface-2 text-text-dim active:scale-95 hover:bg-surface-3 transition-all cursor-pointer"
            >
              ◂ Anterior
            </button>
            <button
              onClick={nextDay}
              className="flex-1 max-w-[160px] lg:max-w-[200px] font-mono text-sm min-h-[48px] px-4 rounded-xl bg-accent-green text-bg font-semibold border border-accent-green active:scale-95 hover:bg-accent-green-dark transition-all cursor-pointer"
            >
              Siguiente ▸
            </button>
            <button
              onClick={() => {
                if (confirm('Limpiar checks para nueva semana?')) clearChecks()
              }}
              className="flex-1 max-w-[160px] lg:max-w-[200px] font-mono text-sm min-h-[48px] px-4 rounded-xl border border-push-border bg-transparent text-push active:scale-95 hover:bg-push-bg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Limpiar
            </button>
          </div>
        )}
      </main>

      {/* Completion Overlay */}
      <AnimatePresence>
        {showCompletion && day && (
          <CompletionOverlay
            dayLabel={day.label}
            dayName={day.dayLetter}
            totalSets={day.totalSets}
            estimatedMinutes={day.estimatedMinutes}
            onNext={() => {
              setShowCompletion(false)
              nextDay()
            }}
            onDismiss={() => setShowCompletion(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
