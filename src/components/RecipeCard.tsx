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
    normal: 'w-[170px] md:w-[190px] lg:w-[210px]',
    large: 'w-[210px] md:w-[230px] lg:w-[250px]',
    featured: 'w-[300px] md:w-[340px] lg:w-[380px]',
  }

  const heightClasses = {
    normal: 'aspect-[4/5]',
    large: 'aspect-[4/5]',
    featured: 'aspect-[4/5]',
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
              className="absolute inset-0 w-full h-full object-cover object-center"
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

      {/* ═══ Detail Modal — horizontal on desktop ═══ */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-end lg:items-center justify-center p-0 lg:p-8"
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
              {/* Image panel — top on mobile, left on desktop */}
              <div className="relative lg:w-[380px] xl:w-[420px] shrink-0">
                <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[500px]">
                  {hasImage ? (
                    <img src={imgSrc?.replace('w=400&h=400', 'w=800&h=800')} alt={recipe.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientFallback}`}>
                      <div className="flex items-center justify-center h-full">
                        <Drumstick size={48} className="text-text-muted/20" />
                      </div>
                    </div>
                  )}
                  {/* Gradient — bottom on mobile, right on desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface-1 via-transparent to-transparent" />

                  {/* Close button */}
                  <button
                    onClick={() => setShowDetail(false)}
                    className="absolute top-3 right-3 lg:top-4 lg:left-4 lg:right-auto w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                    aria-label="Cerrar"
                  >
                    <X size={18} />
                  </button>

                  {/* Title on image — mobile only */}
                  <div className="absolute bottom-4 left-5 right-5 lg:hidden">
                    <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight leading-tight">
                      {recipe.name}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Content panel — right on desktop */}
              <div className="flex-1 overflow-y-auto px-5 lg:px-6 xl:px-8 pb-5 lg:py-6">
                {/* Title — desktop only */}
                <div className="hidden lg:block mb-4">
                  <h2 className="font-display text-2xl xl:text-3xl font-bold uppercase tracking-tight leading-tight">
                    {recipe.name}
                  </h2>
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-3 py-3 lg:py-0 lg:mb-4 text-sm text-text-dim border-b lg:border-b-0 border-border-custom/50">
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
                <div className="grid grid-cols-4 gap-2 py-4 lg:py-3 border-b border-border-custom/50 lg:bg-surface-2/30 lg:rounded-xl lg:px-3 lg:mb-4">
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
                <div className="py-4 lg:py-3 border-b border-border-custom/50">
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wide mb-3">Ingredientes</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
                    {recipe.ingredients.split('·').map((ing, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-text-dim">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-green/50 mt-2 shrink-0" />
                        <span>{ing.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Steps */}
                <div className="py-4 lg:py-3">
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
