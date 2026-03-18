export type MuscleCategory = 'push' | 'pull' | 'legs' | 'upper' | 'lower' | 'fullbody'

export type Phase = {
  id: string
  name: string
  level: number
  weeks: [number, number]
  daysPerWeek: number
  splitType: string
  focus: string
  rirRange: [number, number]
  deloadWeeks: number[]
  nextPhase: string | null
  evidenceSummary: string
  description: string
}

export type Day = {
  id: string
  label: string
  subtitle: string
  muscles: string
  totalSets: number
  estimatedMinutes: [number, number]
  category: MuscleCategory
  dayLetter: string
  exercises: Exercise[]
}

export type Exercise = {
  id: string
  name: string
  imageKey: string
  isStretch: boolean
  rationale: string
  sets: string
  rir: string
  rest: string
  instructions: string
}

export type MealTime = 'desayuno' | 'comida' | 'cena' | 'media_manana' | 'merienda' | 'post-entreno'

export type Allergen = 'lactosa' | 'gluten' | 'frutos_secos' | 'huevo' | 'marisco' | 'cerdo' | 'fruta' | 'soja' | 'sesamo'

export type Recipe = {
  id: number
  name: string
  meal: MealTime
  proteinSource: string
  diet: 'omnivora' | 'vegetariana' | 'vegana'
  prepTime: number
  kcal: number
  protein: number
  carbs: number
  fat: number
  servings: number
  imageKey: string
  ingredients: string
  steps: string
  allergens: Allergen[]
  tags: string[]
  source?: string
}

export type UserSettings = {
  currentPhase: string
  excludedAllergens: Allergen[]
  startDate: string | null
}
