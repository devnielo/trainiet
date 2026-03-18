import { useAppStore } from '@/store/useAppStore'
import { useProfileStore } from '@/store/useProfileStore'
import { phases, evaPhases } from '@/data/phases'
import { useState } from 'react'
import { ChevronDown, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export function PhaseSelector() {
  const currentPhase = useAppStore((s) => s.currentPhase)
  const setCurrentPhase = useAppStore((s) => s.setCurrentPhase)
  const setCurrentDay = useAppStore((s) => s.setCurrentDay)
  const [open, setOpen] = useState(false)

  const activeProfile = useProfileStore((s) => s.activeProfile)
  const phaseList = activeProfile === 'eva' ? evaPhases : phases

  const phase = phaseList.find((p) => p.id === currentPhase) ?? phaseList[phaseList.length - 1]

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-surface-1 border border-border-custom rounded-xl px-5 py-4 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-accent-green-bg border border-accent-green/20 flex items-center justify-center">
            <Zap size={20} className="text-accent-green" />
          </div>
          <div className="text-left">
            <div className="text-base font-semibold">
              Fase {phase.level}: {phase.name}
            </div>
            <div className="text-sm text-text-muted font-mono">
              Semanas {phase.weeks[0]}-{phase.weeks[1]} · {phase.splitType} ·{' '}
              {phase.daysPerWeek} días
            </div>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2">
              {phaseList.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setCurrentPhase(p.id)
                    setCurrentDay(0)
                    setOpen(false)
                  }}
                  className={`w-full text-left px-5 py-3.5 rounded-xl border transition-all cursor-pointer ${
                    p.id === currentPhase
                      ? 'bg-accent-green-bg border-accent-green/20 text-accent-green'
                      : 'bg-surface-1 border-border-custom text-text-dim hover:border-text-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">
                        Fase {p.level}: {p.name}
                      </div>
                      <div className="text-xs text-text-muted font-mono">
                        {p.splitType} · {p.daysPerWeek}x · Sem {p.weeks[0]}-{p.weeks[1]} ·
                        RIR {p.rirRange[0]}-{p.rirRange[1]}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-text-muted">
                      Nivel {p.level}
                    </div>
                  </div>
                  <div className="text-xs text-text-muted mt-1">{p.description}</div>
                </button>
              ))}
            </div>

            {/* Timeline visual */}
            <div className="mt-4 px-1">
              <div className="flex gap-1">
                {phaseList.map((p) => {
                  const active = p.id === currentPhase
                  const weekSpan = p.weeks[1] - p.weeks[0] + 1
                  return (
                    <div
                      key={p.id}
                      style={{ flex: weekSpan }}
                      className={`h-2 rounded-full transition-colors ${
                        active ? 'bg-accent-green' : 'bg-surface-3'
                      }`}
                      title={`Fase ${p.level}: ${p.name} (${weekSpan} semanas)`}
                    />
                  )
                })}
              </div>
              <div className="flex justify-between mt-1.5 font-mono text-xs text-text-muted">
                <span>Sem 1</span>
                <span>Sem 52</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
