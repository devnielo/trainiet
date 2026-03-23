import { useAppStore } from '@/store/useAppStore'
import { recipes, mealLabels } from '@/data/recipes'
import { RecipeCard } from './RecipeCard'
import { MacroCounter } from './MacroCounter'
import { useMemo, useState, useRef } from 'react'
import { Sun, UtensilsCrossed, Moon, Coffee, Apple, Dumbbell, X, Search, SlidersHorizontal, ChefHat, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'motion/react'

const mealIcons: Record<string, React.ReactNode> = {
  desayuno: <Sun className="w-4 h-4 inline-block" />,
  comida: <UtensilsCrossed className="w-4 h-4 inline-block" />,
  cena: <Moon className="w-4 h-4 inline-block" />,
  media_manana: <Coffee className="w-4 h-4 inline-block" />,
  merienda: <Apple className="w-4 h-4 inline-block" />,
  'post-entreno': <Dumbbell className="w-4 h-4 inline-block" />,
}

const proteinOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'pollo', label: 'Pollo' },
  { value: 'pescado', label: 'Pescado' },
  { value: 'ternera', label: 'Ternera' },
  { value: 'huevo', label: 'Huevo' },
  { value: 'vegetal', label: 'Vegetal' },
  { value: 'lacteo', label: 'Lácteo' },
  { value: 'marisco', label: 'Marisco' },
  { value: 'cerdo', label: 'Cerdo' },
]

const dietOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'omnivora', label: 'Omnívora' },
  { value: 'vegetariana', label: 'Vegetariana' },
  { value: 'vegana', label: 'Vegana' },
]

const timeOptions = [
  { value: 'all', label: 'Todos' },
  { value: '5', label: '≤5m' },
  { value: '10', label: '≤10m' },
  { value: '15', label: '≤15m' },
  { value: '20', label: '≤20m' },
  { value: '30', label: '≤30m' },
]

/* ─── Mobile filter row (wrap) ─── */
function FilterRowMobile({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="mb-5">
      <div className="font-mono text-sm tracking-[1.5px] uppercase text-text-muted mb-2.5">
        {label}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`font-mono text-sm px-4 py-2 min-h-[44px] rounded-full border transition-all cursor-pointer active:scale-95 ${
              value === opt.value
                ? 'bg-accent-green-bg text-accent-green border-accent-green/20'
                : 'border-border-custom text-text-muted bg-transparent hover:bg-surface-2'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Desktop collapsible filter with horizontal scroll ─── */
function FilterCollapsible({
  label,
  options,
  value,
  onChange,
  defaultOpen = false,
}: {
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const activeLabel = options.find((o) => o.value === value)?.label
  const isFiltered = value !== 'all'

  return (
    <div className="border-b border-border-custom/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-surface-2/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-[1px] uppercase text-text-muted">{label}</span>
          {isFiltered && (
            <span className="text-[10px] font-mono bg-accent-green/10 text-accent-green px-2 py-0.5 rounded-full">
              {activeLabel}
            </span>
          )}
        </div>
        {open ? <ChevronUp size={14} className="text-text-muted" /> : <ChevronDown size={14} className="text-text-muted" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-3">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={`shrink-0 font-mono text-xs px-3 py-1.5 min-h-[32px] rounded-full border transition-all cursor-pointer active:scale-95 ${
                      value === opt.value
                        ? 'bg-accent-green-bg text-accent-green border-accent-green/20'
                        : 'border-border-custom text-text-muted bg-transparent hover:bg-surface-2'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function NutritionTab() {
  const {
    mealFilter,
    proteinFilter,
    dietFilter,
    timeFilter,
    searchQuery,
    setMealFilter,
    setProteinFilter,
    setDietFilter,
    setTimeFilter,
    setSearchQuery,
    excludedAllergens,
    selectedRecipes,
    addRecipe,
    removeRecipe,
    clearRecipes,
  } = useAppStore()

  const mealOptions = [
    { value: 'all', label: 'Todas' },
    ...Object.entries(mealLabels).map(([value, label]) => ({
      value,
      label,
    })),
  ]

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (mealFilter !== 'all' && r.meal !== mealFilter) return false
      if (proteinFilter !== 'all' && r.proteinSource !== proteinFilter) return false
      if (dietFilter !== 'all' && r.diet !== dietFilter) return false
      if (timeFilter !== 'all' && r.prepTime > Number(timeFilter)) return false
      if (
        searchQuery &&
        !r.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false
      if (excludedAllergens.length > 0) {
        if (r.allergens.some((a) => excludedAllergens.includes(a))) return false
      }
      return true
    })
  }, [mealFilter, proteinFilter, dietFilter, timeFilter, searchQuery, excludedAllergens])

  const isSelected = (id: number) => selectedRecipes.some((r) => r.id === id)
  const toggleRecipe = (recipe: (typeof recipes)[0]) => {
    if (isSelected(recipe.id)) removeRecipe(recipe.id)
    else addRecipe(recipe)
  }

  const macroTotals = useMemo(() => {
    return selectedRecipes.reduce(
      (acc, r) => ({
        kcal: acc.kcal + r.kcal,
        protein: acc.protein + r.protein,
        carbs: acc.carbs + r.carbs,
        fat: acc.fat + r.fat,
      }),
      { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    )
  }, [selectedRecipes])

  const activeFilters = [mealFilter, proteinFilter, dietFilter, timeFilter].filter((f) => f !== 'all').length + (searchQuery ? 1 : 0) + (excludedAllergens.length > 0 ? 1 : 0)

  return (
    <div className="lg:flex lg:h-[calc(100dvh-49px)]" style={{ touchAction: 'manipulation' }}>

      {/* ═══════════════════════════════════════════ */}
      {/* SIDEBAR — wider, collapsible filters (lg+) */}
      {/* ═══════════════════════════════════════════ */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[320px] xl:w-[360px] 2xl:w-[400px] lg:shrink-0 bg-surface-1 border-r border-border-custom">
        {/* Sidebar Header */}
        <div className="px-5 pt-6 pb-4 border-b border-border-custom">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-lg bg-pull/10 border border-pull/20 flex items-center justify-center">
              <ChefHat size={18} className="text-pull" />
            </div>
            <div>
              <span className="font-display text-lg font-bold uppercase tracking-tight block leading-tight">Nutricion</span>
              <span className="text-text-muted text-[11px] font-mono">
                {filtered.length} de {recipes.length} recetas
              </span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-5 py-3 border-b border-border-custom">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Buscar receta o ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm min-h-[40px] pl-10 pr-3 py-2.5 rounded-lg border border-border-custom bg-surface-2 text-text outline-none focus:border-accent-green placeholder:text-text-muted/60 transition-colors"
            />
          </div>
        </div>

        {/* Collapsible Filters */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 px-5 py-3">
            <SlidersHorizontal size={14} className="text-text-muted" />
            <span className="font-mono text-xs tracking-[1.5px] uppercase text-text-muted">Filtros</span>
            {activeFilters > 0 && (
              <span className="text-[10px] font-mono bg-accent-green/10 text-accent-green px-2 py-0.5 rounded-full">
                {activeFilters} activo{activeFilters > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <FilterCollapsible label="Comida" options={mealOptions} value={mealFilter} onChange={setMealFilter} defaultOpen />
          <FilterCollapsible label="Proteina" options={proteinOptions} value={proteinFilter} onChange={setProteinFilter} />
          <FilterCollapsible label="Dieta" options={dietOptions} value={dietFilter} onChange={setDietFilter} />
          <FilterCollapsible label="Tiempo" options={timeOptions} value={timeFilter} onChange={setTimeFilter} />

          {/* Allergen exclusions */}
          {excludedAllergens.length > 0 && (
            <div className="px-5 py-3 border-t border-border-custom/50">
              <div className="font-mono text-xs tracking-[1px] uppercase text-text-muted mb-2">Excluyendo</div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {excludedAllergens.map((a) => (
                  <span
                    key={a}
                    className="shrink-0 font-mono text-[11px] px-2.5 py-1 rounded-md bg-push-bg text-push border border-push-border"
                  >
                    Sin {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar footer — selected meals + macros */}
        <div className="border-t border-border-custom">
          {selectedRecipes.length > 0 ? (
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs tracking-[1.5px] uppercase text-text-muted flex items-center gap-1.5">
                  <UtensilsCrossed size={13} />
                  Hoy ({selectedRecipes.length})
                </span>
                <button
                  onClick={() => { if (confirm('Limpiar comidas del dia?')) clearRecipes() }}
                  className="text-push text-[11px] font-mono cursor-pointer hover:underline"
                >
                  Limpiar
                </button>
              </div>

              {/* Macro summary */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                <div className="text-center bg-surface-2 rounded-lg py-2">
                  <div className="text-sm font-bold text-push">{macroTotals.kcal}</div>
                  <div className="text-[10px] font-mono text-text-muted uppercase">kcal</div>
                </div>
                <div className="text-center bg-surface-2 rounded-lg py-2">
                  <div className="text-sm font-bold text-accent-green">{macroTotals.protein}g</div>
                  <div className="text-[10px] font-mono text-text-muted uppercase">prot</div>
                </div>
                <div className="text-center bg-surface-2 rounded-lg py-2">
                  <div className="text-sm font-bold text-pull">{macroTotals.carbs}g</div>
                  <div className="text-[10px] font-mono text-text-muted uppercase">carbs</div>
                </div>
                <div className="text-center bg-surface-2 rounded-lg py-2">
                  <div className="text-sm font-bold text-legs">{macroTotals.fat}g</div>
                  <div className="text-[10px] font-mono text-text-muted uppercase">grasas</div>
                </div>
              </div>

              {/* Selected meal list */}
              <div className="max-h-[180px] overflow-y-auto space-y-1">
                {selectedRecipes.map((r) => (
                  <div
                    key={r.id}
                    className="flex justify-between items-center py-2 px-2 -mx-2 rounded-lg text-sm group hover:bg-surface-2/50 transition-colors"
                  >
                    <span className="truncate flex-1 text-text-dim flex items-center gap-2">
                      <span className="text-text-muted shrink-0">{mealIcons[r.meal]}</span>
                      <span className="truncate">{r.name}</span>
                      <span className="text-text-muted text-xs shrink-0">{r.kcal}kcal</span>
                    </span>
                    <button
                      onClick={() => removeRecipe(r.id)}
                      className="text-push p-1.5 cursor-pointer opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:hover:bg-push-bg rounded-md transition-all shrink-0 active:scale-90"
                      aria-label={`Quitar ${r.name}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-5 py-5 text-center">
              <p className="text-text-muted text-xs font-mono">
                Selecciona recetas para ver los macros del dia
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* ═══════════════════════════════════════════ */}
      {/* MAIN CONTENT                                */}
      {/* ═══════════════════════════════════════════ */}
      <main className="flex-1 lg:overflow-y-auto">
        <div className="px-4 md:px-6 lg:px-8 xl:px-10 pb-8">

          {/* Header */}
          <div className="py-8 lg:py-6">
            <div className="lg:hidden">
              <h2 className="font-display text-3xl md:text-4xl mb-1">Recetas para Recomposición</h2>
              <p className="text-text-dim text-sm md:text-base">
                {recipes.length} recetas con macros · Filtros · Contador diario
              </p>
            </div>
            <div className="hidden lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="font-display text-2xl xl:text-3xl font-bold">Recetas para Recomposición</h2>
                <p className="text-text-dim text-sm mt-1">
                  {filtered.length} de {recipes.length} recetas
                  {activeFilters > 0 && ` · ${activeFilters} filtro${activeFilters > 1 ? 's' : ''} activo${activeFilters > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          </div>

          {/* Macro Counter — mobile only */}
          <div className="lg:hidden">
            <MacroCounter />
          </div>

          {/* Selected recipes summary — mobile only */}
          <div className="lg:hidden">
            {selectedRecipes.length > 0 && (
              <div className="bg-surface-1 border border-border-custom rounded-xl px-5 py-4 mb-6 shadow-sm">
                <div className="font-mono text-sm tracking-[1.5px] uppercase text-text-muted mb-2.5 flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4" />
                  Comidas de hoy
                </div>
                {selectedRecipes.map((r) => (
                  <div
                    key={r.id}
                    className="flex justify-between items-center py-2.5 border-b border-border-custom/40 last:border-0 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-text-muted">{mealIcons[r.meal] || null}</span>
                      {r.name} —{' '}
                      <b className="text-accent-green">{r.kcal}</b> kcal
                    </span>
                    <button
                      onClick={() => removeRecipe(r.id)}
                      className="text-push p-1.5 cursor-pointer hover:bg-push-bg rounded-md transition-colors"
                      aria-label={`Quitar ${r.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search — mobile only */}
          <div className="lg:hidden mb-5">
            <input
              type="text"
              placeholder="Buscar receta o ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-base min-h-[48px] px-5 py-3.5 rounded-xl border border-border-custom bg-surface-1 text-text outline-none focus:border-accent-green placeholder:text-text-muted transition-colors"
            />
          </div>

          {/* Filters — mobile only */}
          <div className="lg:hidden">
            <FilterRowMobile label="Comida" options={mealOptions} value={mealFilter} onChange={setMealFilter} />
            <FilterRowMobile label="Proteína" options={proteinOptions} value={proteinFilter} onChange={setProteinFilter} />
            <FilterRowMobile label="Dieta" options={dietOptions} value={dietFilter} onChange={setDietFilter} />
            <FilterRowMobile label="Tiempo" options={timeOptions} value={timeFilter} onChange={setTimeFilter} />

            {excludedAllergens.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4 mt-2">
                <span className="font-mono text-xs text-push">Excluyendo:</span>
                {excludedAllergens.map((a) => (
                  <span
                    key={a}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-push-bg text-push border border-push-border"
                  >
                    Sin {a}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Desktop inline macro bar */}
          {selectedRecipes.length > 0 && (
            <div className="hidden lg:flex items-center gap-6 bg-surface-1 border border-border-custom rounded-xl px-5 py-3 mb-5">
              <span className="font-mono text-xs text-text-muted uppercase tracking-wide">Hoy:</span>
              <span className="text-sm"><b className="text-push">{macroTotals.kcal}</b> <span className="text-text-muted text-xs">kcal</span></span>
              <span className="text-sm"><b className="text-accent-green">{macroTotals.protein}g</b> <span className="text-text-muted text-xs">proteina</span></span>
              <span className="text-sm"><b className="text-pull">{macroTotals.carbs}g</b> <span className="text-text-muted text-xs">carbos</span></span>
              <span className="text-sm"><b className="text-legs">{macroTotals.fat}g</b> <span className="text-text-muted text-xs">grasas</span></span>
              <span className="text-text-muted text-xs ml-auto">{selectedRecipes.length} receta{selectedRecipes.length > 1 ? 's' : ''}</span>
            </div>
          )}

          {/* Netflix-style Recipe Rows */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-text-muted text-base">
              No se encontraron recetas con estos filtros
            </div>
          ) : (
            <RecipeRows
              recipes={filtered}
              isSelected={isSelected}
              toggleRecipe={toggleRecipe}
              mealFilter={mealFilter}
            />
          )}
        </div>
      </main>
    </div>
  )
}

/* ─── Netflix-style horizontal rows grouped by meal type ─── */

const mealOrder = ['desayuno', 'media_manana', 'comida', 'merienda', 'cena', 'post-entreno'] as const

const mealRowTitles: Record<string, string> = {
  desayuno: 'Desayunos',
  media_manana: 'Media Mañana',
  comida: 'Comidas',
  merienda: 'Meriendas',
  cena: 'Cenas',
  'post-entreno': 'Post-Entreno',
}

const mealRowIcons: Record<string, React.ReactNode> = {
  desayuno: <Sun size={18} className="text-amber-400" />,
  media_manana: <Coffee size={18} className="text-orange-400" />,
  comida: <UtensilsCrossed size={18} className="text-accent-green" />,
  merienda: <Apple size={18} className="text-violet-400" />,
  cena: <Moon size={18} className="text-blue-400" />,
  'post-entreno': <Dumbbell size={18} className="text-push" />,
}

function RecipeRows({
  recipes: allRecipes,
  isSelected,
  toggleRecipe,
  mealFilter,
}: {
  recipes: typeof recipes
  isSelected: (id: number) => boolean
  toggleRecipe: (recipe: (typeof recipes)[0]) => void
  mealFilter: string
}) {
  if (mealFilter !== 'all') {
    return (
      <div className="mt-2">
        <div className="flex items-center gap-2.5 mb-4">
          {mealRowIcons[mealFilter]}
          <h3 className="font-display text-xl font-bold uppercase tracking-tight">
            {mealRowTitles[mealFilter] || mealFilter}
          </h3>
          <span className="font-mono text-xs text-text-muted">{allRecipes.length}</span>
        </div>
        <div className="flex flex-wrap gap-3 lg:gap-4">
          {allRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isSelected={isSelected(recipe.id)}
              onToggle={() => toggleRecipe(recipe)}
            />
          ))}
        </div>
      </div>
    )
  }

  const grouped = mealOrder.reduce<Record<string, typeof recipes>>((acc, meal) => {
    const items = allRecipes.filter((r) => r.meal === meal)
    if (items.length > 0) acc[meal] = items
    return acc
  }, {})

  return (
    <div className="space-y-8 mt-2">
      {Object.entries(grouped).map(([meal, items]) => (
        <RecipeRow
          key={meal}
          meal={meal}
          title={mealRowTitles[meal] || meal}
          icon={mealRowIcons[meal]}
          rowRecipes={items}
          isSelected={isSelected}
          toggleRecipe={toggleRecipe}
        />
      ))}
    </div>
  )
}

function RecipeRow({
  meal,
  title,
  icon,
  rowRecipes,
  isSelected,
  toggleRecipe,
}: {
  meal: string
  title: string
  icon: React.ReactNode
  rowRecipes: typeof recipes
  isSelected: (id: number) => boolean
  toggleRecipe: (recipe: (typeof recipes)[0]) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const featured = rowRecipes[0]
  const rest = rowRecipes.slice(1)

  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2.5">
          {icon}
          <h3 className="font-display text-lg lg:text-xl font-bold uppercase tracking-tight">
            {title}
          </h3>
          <span className="font-mono text-xs text-text-muted">{rowRecipes.length}</span>
        </div>

        <div className="hidden lg:flex gap-1.5">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              canScrollLeft
                ? 'border-border-custom text-text-dim hover:bg-surface-2'
                : 'border-transparent text-text-muted/30 cursor-default'
            }`}
            aria-label="Scroll izquierda"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              canScrollRight
                ? 'border-border-custom text-text-dim hover:bg-surface-2'
                : 'border-transparent text-text-muted/30 cursor-default'
            }`}
            aria-label="Scroll derecha"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3 lg:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:-mx-6 md:px-6 lg:mx-0 lg:px-0"
      >
        {featured && (
          <RecipeCard
            recipe={featured}
            isSelected={isSelected(featured.id)}
            onToggle={() => toggleRecipe(featured)}
            size="featured"
          />
        )}
        {rest.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isSelected={isSelected(recipe.id)}
            onToggle={() => toggleRecipe(recipe)}
          />
        ))}
      </div>
    </div>
  )
}
