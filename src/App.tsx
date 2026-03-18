import { useAppStore } from '@/store/useAppStore'
import { TrainingTab } from '@/components/TrainingTab'
import { NutritionTab } from '@/components/NutritionTab'
import { SettingsTab } from '@/components/SettingsTab'
import { Dumbbell, UtensilsCrossed, Settings } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

const tabs = [
  { label: 'Entreno', icon: Dumbbell },
  { label: 'Nutrición', icon: UtensilsCrossed },
  { label: 'Ajustes', icon: Settings },
]

export default function App() {
  const activeTab = useAppStore((s) => s.activeTab)
  const setActiveTab = useAppStore((s) => s.setActiveTab)

  return (
    <div className="min-h-dvh bg-bg">
      {/* Top Tab Bar */}
      <nav className="sticky top-0 z-50 flex border-b border-border-custom bg-bg/95 backdrop-blur-xl">
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
      </nav>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
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
