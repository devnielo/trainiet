import { useAppStore } from '@/store/useAppStore'
import { useProfileStore, getProfile } from '@/store/useProfileStore'
import { TrainingTab } from '@/components/TrainingTab'
import { NutritionTab } from '@/components/NutritionTab'
import { SettingsTab } from '@/components/SettingsTab'
import { ProfileSwitcher } from '@/components/ProfileSwitcher'
import { Dumbbell, UtensilsCrossed, Settings } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'

const tabs = [
  { label: 'Entreno', shortLabel: 'Entreno', icon: Dumbbell },
  { label: 'Nutrición', shortLabel: 'Nutri', icon: UtensilsCrossed },
  { label: 'Ajustes', shortLabel: 'Ajustes', icon: Settings },
]

export default function App() {
  const activeTab = useAppStore((s) => s.activeTab)
  const setActiveTab = useAppStore((s) => s.setActiveTab)
  const activeProfile = useProfileStore((s) => s.activeProfile)
  const profile = getProfile(activeProfile)

  useEffect(() => {
    document.documentElement.setAttribute('data-profile', activeProfile)
  }, [activeProfile])

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      {/* ═══ DESKTOP: Top Bar ═══ */}
      <nav className="hidden lg:flex sticky top-0 z-50 border-b border-border-custom bg-bg/95 backdrop-blur-xl items-center">
        <div className="flex items-center px-4 border-r border-border-custom shrink-0">
          <ProfileSwitcher />
        </div>
        <div className="flex flex-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-mono text-sm uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === i
                  ? 'text-accent-green border-accent-green'
                  : 'text-text-muted border-transparent hover:text-text-dim'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ═══ MOBILE: Top profile bar ═══ */}
      <div className="lg:hidden sticky top-0 z-50 bg-bg/95 backdrop-blur-xl border-b border-border-custom px-4 py-2.5 flex items-center justify-between">
        <span className="font-display text-base font-bold uppercase tracking-tight text-accent-green">
          Trainiet
        </span>
        <ProfileSwitcher />
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="flex-1 pb-[72px] lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeProfile}-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {activeTab === 0 && <TrainingTab />}
            {activeTab === 1 && <NutritionTab />}
            {activeTab === 2 && <SettingsTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══ MOBILE: Bottom Tab Bar ═══ */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-xl border-t border-border-custom safe-bottom">
        <div className="flex items-stretch">
          {tabs.map((tab, i) => {
            const isActive = activeTab === i
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] transition-all cursor-pointer active:scale-95 ${
                  isActive ? 'text-accent-green' : 'text-text-muted'
                }`}
              >
                <tab.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isActive ? 'font-semibold' : ''}`}>
                  {tab.shortLabel}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent-green rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
