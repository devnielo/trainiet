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
  { label: 'Entreno', icon: Dumbbell },
  { label: 'Nutrición', icon: UtensilsCrossed },
  { label: 'Ajustes', icon: Settings },
]

export default function App() {
  const activeTab = useAppStore((s) => s.activeTab)
  const setActiveTab = useAppStore((s) => s.setActiveTab)
  const activeProfile = useProfileStore((s) => s.activeProfile)
  const profile = getProfile(activeProfile)

  // Apply profile theme to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-profile', activeProfile)
  }, [activeProfile])

  return (
    <div className="min-h-dvh bg-bg">
      {/* Top Tab Bar with profile switcher */}
      <nav className="sticky top-0 z-50 border-b border-border-custom bg-bg/95 backdrop-blur-xl">
        <div className="flex items-center">
          {/* Profile switcher — compact, left side */}
          <div className="hidden lg:flex items-center px-4 border-r border-border-custom shrink-0">
            <ProfileSwitcher />
          </div>

          {/* Tabs */}
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

          {/* Profile indicator — mobile, right side */}
          <div className="lg:hidden flex items-center px-3 border-l border-border-custom shrink-0">
            <ProfileSwitcher />
          </div>
        </div>
      </nav>

      {/* Tab Content — key includes profile to force re-render on switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeProfile}-${activeTab}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
        >
          {activeTab === 0 && <TrainingTab />}
          {activeTab === 1 && <NutritionTab />}
          {activeTab === 2 && <SettingsTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
