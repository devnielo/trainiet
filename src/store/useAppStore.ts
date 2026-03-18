import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Allergen, Recipe } from '@/data/types'
import { useProfileStore, getStorageKey, type ProfileId } from './useProfileStore'

type CheckedExercises = Record<string, boolean>

type AppState = {
  // Navigation
  activeTab: number
  setActiveTab: (tab: number) => void

  // Training
  currentPhase: string
  setCurrentPhase: (phase: string) => void
  currentDay: number
  setCurrentDay: (day: number) => void
  checkedExercises: CheckedExercises
  toggleExercise: (id: string) => void
  clearChecks: () => void
  startDate: string | null
  setStartDate: (date: string) => void

  // Nutrition
  selectedRecipes: Recipe[]
  addRecipe: (recipe: Recipe) => void
  removeRecipe: (id: number) => void
  clearRecipes: () => void
  excludedAllergens: Allergen[]
  toggleAllergen: (allergen: Allergen) => void

  // Filters
  mealFilter: string
  proteinFilter: string
  dietFilter: string
  timeFilter: string
  searchQuery: string
  setMealFilter: (v: string) => void
  setProteinFilter: (v: string) => void
  setDietFilter: (v: string) => void
  setTimeFilter: (v: string) => void
  setSearchQuery: (v: string) => void
}

function createAppStore(profileId: ProfileId) {
  return create<AppState>()(
    persist(
      (set) => ({
        // Navigation
        activeTab: 0,
        setActiveTab: (tab) => set({ activeTab: tab }),

        // Training
        currentPhase: 'phase_6',
        setCurrentPhase: (phase) => set({ currentPhase: phase }),
        currentDay: 0,
        setCurrentDay: (day) => set({ currentDay: day }),
        checkedExercises: {},
        toggleExercise: (id) =>
          set((s) => {
            const next = { ...s.checkedExercises }
            if (next[id]) delete next[id]
            else next[id] = true
            return { checkedExercises: next }
          }),
        clearChecks: () => set({ checkedExercises: {} }),
        startDate: null,
        setStartDate: (date) => set({ startDate: date }),

        // Nutrition
        selectedRecipes: [],
        addRecipe: (recipe) =>
          set((s) => ({ selectedRecipes: [...s.selectedRecipes, recipe] })),
        removeRecipe: (id) =>
          set((s) => ({
            selectedRecipes: s.selectedRecipes.filter((r) => r.id !== id),
          })),
        clearRecipes: () => set({ selectedRecipes: [] }),
        excludedAllergens: [],
        toggleAllergen: (allergen) =>
          set((s) => ({
            excludedAllergens: s.excludedAllergens.includes(allergen)
              ? s.excludedAllergens.filter((a) => a !== allergen)
              : [...s.excludedAllergens, allergen],
          })),

        // Filters
        mealFilter: 'all',
        proteinFilter: 'all',
        dietFilter: 'all',
        timeFilter: 'all',
        searchQuery: '',
        setMealFilter: (v) => set({ mealFilter: v }),
        setProteinFilter: (v) => set({ proteinFilter: v }),
        setDietFilter: (v) => set({ dietFilter: v }),
        setTimeFilter: (v) => set({ timeFilter: v }),
        setSearchQuery: (v) => set({ searchQuery: v }),
      }),
      {
        name: getStorageKey(profileId),
        partialize: (state) => ({
          activeTab: state.activeTab,
          currentPhase: state.currentPhase,
          currentDay: state.currentDay,
          checkedExercises: state.checkedExercises,
          selectedRecipes: state.selectedRecipes,
          excludedAllergens: state.excludedAllergens,
          startDate: state.startDate,
        }),
      }
    )
  )
}

// Cache stores per profile to avoid re-creating on every render
const storeCache = new Map<ProfileId, ReturnType<typeof createAppStore>>()

function getOrCreateStore(profileId: ProfileId) {
  if (!storeCache.has(profileId)) {
    storeCache.set(profileId, createAppStore(profileId))
  }
  return storeCache.get(profileId)!
}

// Hook: always returns the store for the active profile
export function useAppStore(): AppState
export function useAppStore<T>(selector: (state: AppState) => T): T
export function useAppStore<T>(selector?: (state: AppState) => T) {
  const profileId = useProfileStore((s) => s.activeProfile)
  const store = getOrCreateStore(profileId)
  if (selector) return store(selector)
  return store()
}

// For imperative access outside React (if needed)
export function getAppStore(profileId?: ProfileId) {
  const id = profileId ?? useProfileStore.getState().activeProfile
  return getOrCreateStore(id)
}
