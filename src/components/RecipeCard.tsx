import type { Recipe } from '@/data/types'
import { foodImages } from '@/data/images'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, Check, Clock, Users, X, Flame, Drumstick } from 'lucide-react'

type Props = {
  recipe: Recipe
  isSelected: boolean
  onToggle: () => void
  size?: 'normal' | 'large' | 'featured'
}

const placeholderGradients = [
  'from-emerald-900/60 to-emerald-800/30',
  'from-amber-900/60 to-amber-800/30',
  'from-rose-900/60 to-rose-800/30',
  'from-violet-900/60 to-violet-800/30',
  'from-sky-900/60 to-sky-800/30',
  'from-orange-900/60 to-orange-800/30',
]

export function RecipeCard({ recipe, isSelected, onToggle, size = 'normal' }: Props) {
  const [showDetail, setShowDetail] = useState(false)
  const [imgError, setImgError] = useState(false)
  const imgSrc = foodImages[recipe.imageKey]
  const hasImage = imgSrc && !imgError
  const gradientFallback = placeholderGradients[recipe.id % placeholderGradients.length]

  const sizeClasses = {
    normal: 'w-[160px] md:w-[180px] lg:w-[200px]',
    large: 'w-[200px] md:w-[220px] lg:w-[240px]',
    featured: 'w-[280px] md:w-[320px] lg:w-[360px]',
  }

  const heightClasses = {
    normal: 'aspect-[3/4]',
    large: 'aspect-[3/4]',
    featured: 'aspect-[16/10]',
  }

  return (
    <>
      <motion.div
        className={`${sizeClasses[size]} shrink-0 group cursor-pointer select-none`}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={() => setShowDetail(true)}
        role="button"
        tabIndex={0}
        aria-label={`Ver ${recipe.name}`}
        onKeyDown={(e) => e.key === 'Enter' && setShowDetail(true)}
      >
        <div className={`relative ${heightClasses[size]} rounded-xl overflow-hidden border border-border-custom/50 group-hover:border-accent-green/30 transition-colors`}>
          {/* Image or gradient fallback */}
          {hasImage ? (
            <img
              src={imgSrc}
              alt={recipe.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientFallback}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Drumstick size={32} className="text-text-muted/30" />
              </div>
            </div>
          )}

          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Selected indicator */}
          {isSelected && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <div className="w-7 h-7 rounded-full bg-accent-green flex items-center justify-center shadow-lg">
                <Check size={14} className="text-bg" strokeWidth={3} />
              </div>
            </div>
          )}

          {/* Add button — visible on hover */}
          {!isSelected && (
            <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle()
                }}
                className="w-8 h-8 rounded-full bg-bg/80 backdrop-blur-sm border border-border-custom flex items-center justify-center hover:bg-accent-green hover:text-bg hover:border-accent-green transition-all cursor-pointer"
                aria-label={`Añadir ${recipe.name}`}
              >
                <Plus size={16} />
              </button>
            </div>
          )}

          {/* Content overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            {/* Title */}
            <h3 className={`font-semibold text-white leading-tight mb-1.5 ${
              size === 'featured' ? 'text-lg' : 'text-sm'
            }`}>
              {recipe.name}
            </h3>

            {/* Macro pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm text-push font-medium">
                {recipe.kcal}kcal
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm text-accent-green">
                {recipe.protein}g P
              </span>
              {size === 'featured' && (
                <>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm text-pull">
                    {recipe.carbs}g C
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm text-legs">
                    {recipe.fat}g G
                  </span>
                </>
              )}
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm text-text-dim flex items-center gap-0.5">
                <Clock size={9} />{recipe.prepTime}m
              </span>
            </div>
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
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-surface-1 rounded-t-2xl md:rounded-2xl border border-border-custom overflow-hidden max-h-[90dvh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero image */}
              <div className="relative aspect-[16/9] shrink-0">
                {hasImage ? (
                  <img src={imgSrc} alt={recipe.name} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${gradientFallback}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-transparent" />

                {/* Close button */}
                <button
                  onClick={() => setShowDetail(false)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>

                {/* Title on image */}
                <div className="absolute bottom-4 left-5 right-5">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-tight">
                    {recipe.name}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 pb-5">
                {/* Meta row */}
                <div className="flex items-center gap-3 py-4 text-sm text-text-dim border-b border-border-custom/50">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-text-muted" /> {recipe.prepTime} min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-text-muted" /> {recipe.servings} racion{recipe.servings > 1 ? 'es' : ''}
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-2 text-accent-green/80">
                    {recipe.diet}
                  </span>
                </div>

                {/* Macros bar */}
                <div className="grid grid-cols-4 gap-2 py-4 border-b border-border-custom/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-push">{recipe.kcal}</div>
                    <div className="text-[10px] font-mono text-text-muted uppercase">kcal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent-green">{recipe.protein}g</div>
                    <div className="text-[10px] font-mono text-text-muted uppercase">proteina</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-pull">{recipe.carbs}g</div>
                    <div className="text-[10px] font-mono text-text-muted uppercase">carbos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-legs">{recipe.fat}g</div>
                    <div className="text-[10px] font-mono text-text-muted uppercase">grasas</div>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="py-4 border-b border-border-custom/50">
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wide mb-3">Ingredientes</h4>
                  <div className="grid grid-cols-1 gap-1.5">
                    {recipe.ingredients.split('·').map((ing, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-text-dim">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-green/50 mt-2 shrink-0" />
                        <span>{ing.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Steps */}
                <div className="py-4">
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wide mb-3">Preparacion</h4>
                  <p className="text-sm text-text-dim leading-relaxed">{recipe.steps}</p>
                </div>

                {/* Allergens */}
                {recipe.allergens.length > 0 && (
                  <div className="flex gap-2 flex-wrap pt-2 pb-4">
                    <span className="text-xs text-push font-mono">Alergenos:</span>
                    {recipe.allergens.map((a) => (
                      <span
                        key={a}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-push-bg text-push border border-push-border"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}

                {/* Add/Remove button */}
                <button
                  onClick={onToggle}
                  className={`w-full min-h-[48px] rounded-xl font-display text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-push-bg text-push border border-push-border hover:bg-push/10'
                      : 'bg-accent-green text-bg border border-accent-green hover:bg-accent-green-dark'
                  }`}
                >
                  {isSelected ? (
                    <><X size={16} /> Quitar del dia</>
                  ) : (
                    <><Plus size={16} /> Añadir al dia</>
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
