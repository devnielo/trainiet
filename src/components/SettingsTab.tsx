import { useAppStore } from '@/store/useAppStore'
import { useProfileStore, getProfile } from '@/store/useProfileStore'
import { ProfileSelector } from '@/components/ProfileSwitcher'
import type { Allergen } from '@/data/types'
import { Shield, AlertTriangle, User } from 'lucide-react'

const allergenOptions: { value: Allergen; label: string; emoji: string }[] = [
  { value: 'lactosa', label: 'Sin lactosa', emoji: '🥛' },
  { value: 'gluten', label: 'Sin gluten', emoji: '🌾' },
  { value: 'frutos_secos', label: 'Sin frutos secos', emoji: '🥜' },
  { value: 'huevo', label: 'Sin huevo', emoji: '🥚' },
  { value: 'marisco', label: 'Sin marisco', emoji: '🦐' },
  { value: 'cerdo', label: 'Sin cerdo', emoji: '🐷' },
  { value: 'fruta', label: 'Sin fruta', emoji: '🍎' },
  { value: 'soja', label: 'Sin soja', emoji: '🫘' },
  { value: 'sesamo', label: 'Sin sésamo', emoji: '⚪' },
]

export function SettingsTab() {
  const excludedAllergens = useAppStore((s) => s.excludedAllergens)
  const toggleAllergen = useAppStore((s) => s.toggleAllergen)
  const activeProfile = useProfileStore((s) => s.activeProfile)
  const profile = getProfile(activeProfile)

  return (
    <div className="max-w-4xl mx-auto px-6 pb-10">
      <div className="py-8">
        <h2 className="font-display text-3xl md:text-4xl mb-1">Ajustes</h2>
        <p className="text-text-dim text-sm md:text-base">
          Configuración de <span className="text-accent-green font-semibold">{profile.name}</span>
        </p>
      </div>

      {/* Profile Selector */}
      <div className="bg-surface-1 border border-border-custom rounded-2xl px-6 py-6 mb-5">
        <div className="flex items-center gap-3 mb-5">
          <User size={22} className="text-accent-green" />
          <div>
            <h3 className="text-lg font-semibold">Perfil activo</h3>
            <p className="text-sm text-text-muted">
              Cada perfil tiene su propio progreso, recetas y ajustes
            </p>
          </div>
        </div>
        <ProfileSelector />
      </div>

      {/* Allergen Filters */}
      <div className="bg-surface-1 border border-border-custom rounded-2xl px-6 py-6 mb-5">
        <div className="flex items-center gap-3 mb-5">
          <Shield size={22} className="text-accent-green" />
          <div>
            <h3 className="text-lg font-semibold">Intolerancias y preferencias</h3>
            <p className="text-sm text-text-muted">
              Las recetas con estos alérgenos se filtrarán automáticamente
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {allergenOptions.map((opt) => {
            const active = excludedAllergens.includes(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => toggleAllergen(opt.value)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border transition-all cursor-pointer ${
                  active
                    ? 'bg-push-bg border-push-border'
                    : 'bg-surface-2 border-border-custom hover:border-text-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{opt.emoji}</span>
                  <span className="text-base font-medium">{opt.label}</span>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    active ? 'bg-push' : 'bg-surface-3'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      active ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Info */}
      <div className="bg-surface-1 border border-border-custom rounded-2xl px-6 py-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-push shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Sobre los datos</h3>
            <p className="text-sm text-text-dim leading-relaxed">
              Los macronutrientes son aproximados y pueden variar según marcas e ingredientes.
              Los ejercicios están basados en estudios revisados por pares (2021-2026).
              Consulta con un profesional antes de iniciar cualquier programa de entrenamiento.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-xs text-text-muted border-t border-border-custom pt-5">
        Trainiet v2.0 · +100 estudios (2023–2026) · React + Tailwind + shadcn/ui
      </div>
    </div>
  )
}
