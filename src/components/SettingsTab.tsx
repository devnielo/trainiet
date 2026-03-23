import { useAppStore } from '@/store/useAppStore'
import { useProfileStore, getProfile } from '@/store/useProfileStore'
import { ProfileSelector } from '@/components/ProfileSwitcher'
import type { Allergen } from '@/data/types'
import { Shield, AlertTriangle, User, Trash2, RotateCcw, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const allergenOptions: { value: Allergen; label: string }[] = [
  { value: 'lactosa', label: 'Sin lactosa' },
  { value: 'gluten', label: 'Sin gluten' },
  { value: 'frutos_secos', label: 'Sin frutos secos' },
  { value: 'huevo', label: 'Sin huevo' },
  { value: 'marisco', label: 'Sin marisco' },
  { value: 'cerdo', label: 'Sin cerdo' },
  { value: 'fruta', label: 'Sin fruta' },
  { value: 'soja', label: 'Sin soja' },
  { value: 'sesamo', label: 'Sin sesamo' },
]

export function SettingsTab() {
  const excludedAllergens = useAppStore((s) => s.excludedAllergens)
  const toggleAllergen = useAppStore((s) => s.toggleAllergen)
  const activeProfile = useProfileStore((s) => s.activeProfile)
  const profile = getProfile(activeProfile)
  const [cacheCleared, setCacheCleared] = useState(false)

  const handleClearCache = () => {
    if (!confirm(`Borrar todos los datos de ${profile.name}? (progreso, recetas seleccionadas, ejercicios completados)`)) return

    // Clear all localStorage
    localStorage.removeItem(`trainiet-${activeProfile}`)

    // Unregister service worker and clear caches
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((reg) => reg.unregister())
      })
    }
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name))
      })
    }

    setCacheCleared(true)
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  const handleClearAll = () => {
    if (!confirm('Borrar TODOS los datos de TODOS los perfiles? Esto no se puede deshacer.')) return
    localStorage.clear()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((reg) => reg.unregister())
      })
    }
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name))
      })
    }
    setCacheCleared(true)
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 pb-10">
      <div className="py-6 md:py-8">
        <h2 className="font-display text-2xl md:text-3xl mb-1">Ajustes</h2>
        <p className="text-text-dim text-sm">
          Configuracion de <span className="text-accent-green font-semibold">{profile.name}</span>
        </p>
      </div>

      {/* Profile Selector */}
      <div className="bg-surface-1 border border-border-custom rounded-2xl px-4 md:px-6 py-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-accent-green/10 flex items-center justify-center shrink-0">
            <User size={18} className="text-accent-green" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Perfil activo</h3>
            <p className="text-xs text-text-muted">Cada perfil tiene su propio progreso</p>
          </div>
        </div>
        <ProfileSelector />
      </div>

      {/* Allergen Filters */}
      <div className="bg-surface-1 border border-border-custom rounded-2xl px-4 md:px-6 py-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-push/10 flex items-center justify-center shrink-0">
            <Shield size={18} className="text-push" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Intolerancias</h3>
            <p className="text-xs text-text-muted">Filtra recetas automaticamente</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {allergenOptions.map((opt) => {
            const active = excludedAllergens.includes(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => toggleAllergen(opt.value)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer active:scale-[0.98] ${
                  active
                    ? 'bg-push-bg border-push-border'
                    : 'bg-surface-2 border-border-custom hover:border-text-muted/30'
                }`}
              >
                <span className="text-sm font-medium">{opt.label}</span>
                <div
                  className={`w-10 h-5 rounded-full transition-colors relative ${
                    active ? 'bg-push' : 'bg-surface-3'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      active ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Cache / Data Management */}
      <div className="bg-surface-1 border border-border-custom rounded-2xl px-4 md:px-6 py-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-legs/10 flex items-center justify-center shrink-0">
            <Trash2 size={18} className="text-legs" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Datos y cache</h3>
            <p className="text-xs text-text-muted">Gestiona el almacenamiento local</p>
          </div>
        </div>

        <AnimatePresence>
          {cacheCleared ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 py-6 text-accent-green"
            >
              <CheckCircle size={20} />
              <span className="font-mono text-sm">Cache eliminado. Recargando...</span>
            </motion.div>
          ) : (
            <div className="space-y-2.5">
              <button
                onClick={handleClearCache}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-border-custom bg-surface-2 hover:border-push-border hover:bg-push-bg/30 transition-all cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <RotateCcw size={16} className="text-text-muted" />
                  <div className="text-left">
                    <span className="text-sm font-medium block">Limpiar datos de {profile.name}</span>
                    <span className="text-xs text-text-muted">Progreso, recetas, ejercicios</span>
                  </div>
                </div>
              </button>

              <button
                onClick={handleClearAll}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-push-border bg-push-bg/20 hover:bg-push-bg/40 transition-all cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <Trash2 size={16} className="text-push" />
                  <div className="text-left">
                    <span className="text-sm font-medium text-push block">Eliminar todo el cache</span>
                    <span className="text-xs text-text-muted">Todos los perfiles + Service Worker</span>
                  </div>
                </div>
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="bg-surface-1 border border-border-custom rounded-2xl px-4 md:px-6 py-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-push shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-semibold mb-1.5">Sobre los datos</h3>
            <p className="text-xs text-text-dim leading-relaxed">
              Macros aproximados. Ejercicios basados en estudios revisados (2021-2026).
              Consulta con un profesional antes de iniciar cualquier programa.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-[11px] text-text-muted/50 font-mono">
        Trainiet v2.0 · 226 recetas · 78 ejercicios · Evidencia 2023-2026
      </div>
    </div>
  )
}
