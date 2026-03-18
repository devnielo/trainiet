import { useAppStore } from '@/store/useAppStore'
import { BarChart3, RotateCcw } from 'lucide-react'
import { CountUp } from './effects/CountUp'

export function MacroCounter() {
  const selectedRecipes = useAppStore((s) => s.selectedRecipes)
  const clearRecipes = useAppStore((s) => s.clearRecipes)

  const totals = selectedRecipes.reduce(
    (acc, r) => ({
      kcal: acc.kcal + r.kcal,
      protein: acc.protein + r.protein,
      carbs: acc.carbs + r.carbs,
      fat: acc.fat + r.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  )

  return (
    <div className="bg-gradient-to-br from-surface-1 to-surface-2 border border-border-custom rounded-2xl px-5 py-5 mb-4">
      <div className="flex justify-between items-center font-mono text-xs tracking-[1.5px] uppercase text-text-muted mb-3">
        <span className="flex items-center gap-2">
          <BarChart3 size={16} className="text-accent-green" />
          Macros del dia
        </span>
        <button
          onClick={clearRecipes}
          className="font-mono text-xs min-h-[36px] px-3 rounded-lg border border-push-border text-push bg-transparent cursor-pointer hover:bg-push-bg transition-colors flex items-center gap-1.5"
        >
          <RotateCcw size={12} /> Limpiar
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <div className="text-center py-3 bg-surface-1 rounded-xl">
          <div className="font-display text-2xl md:text-3xl font-bold leading-none text-push">
            <CountUp end={totals.kcal} />
          </div>
          <div className="font-mono text-[10px] md:text-xs tracking-wider uppercase text-text-muted mt-1">
            kcal
          </div>
        </div>
        <div className="text-center py-3 bg-surface-1 rounded-xl">
          <div className="font-display text-2xl md:text-3xl font-bold leading-none text-accent-green">
            <CountUp end={totals.protein} suffix="g" />
          </div>
          <div className="font-mono text-[10px] md:text-xs tracking-wider uppercase text-text-muted mt-1">
            proteina
          </div>
        </div>
        <div className="text-center py-3 bg-surface-1 rounded-xl">
          <div className="font-display text-2xl md:text-3xl font-bold leading-none text-pull">
            <CountUp end={totals.carbs} suffix="g" />
          </div>
          <div className="font-mono text-[10px] md:text-xs tracking-wider uppercase text-text-muted mt-1">
            carbos
          </div>
        </div>
        <div className="text-center py-3 bg-surface-1 rounded-xl">
          <div className="font-display text-2xl md:text-3xl font-bold leading-none text-legs">
            <CountUp end={totals.fat} suffix="g" />
          </div>
          <div className="font-mono text-[10px] md:text-xs tracking-wider uppercase text-text-muted mt-1">
            grasas
          </div>
        </div>
      </div>
    </div>
  )
}
