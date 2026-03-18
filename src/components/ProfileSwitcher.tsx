import { useProfileStore, profiles, getProfile } from '@/store/useProfileStore'
import { motion } from 'motion/react'
import { User } from 'lucide-react'

export function ProfileSwitcher() {
  const activeProfile = useProfileStore((s) => s.activeProfile)
  const setActiveProfile = useProfileStore((s) => s.setActiveProfile)
  const profile = getProfile(activeProfile)

  return (
    <div className="flex items-center gap-1.5">
      {profiles.map((p) => {
        const isActive = p.id === activeProfile
        const colorClasses = p.accentHue === 'green'
          ? isActive
            ? 'bg-accent-green text-bg border-accent-green'
            : 'bg-transparent text-text-muted border-border-custom hover:border-accent-green/30 hover:text-accent-green'
          : isActive
            ? 'bg-pink-500 text-white border-pink-500'
            : 'bg-transparent text-text-muted border-border-custom hover:border-pink-400/30 hover:text-pink-400'

        return (
          <motion.button
            key={p.id}
            onClick={() => setActiveProfile(p.id)}
            whileTap={{ scale: 0.93 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono font-medium transition-all cursor-pointer ${colorClasses}`}
            aria-label={`Cambiar a perfil de ${p.name}`}
          >
            <User size={12} />
            {p.name}
          </motion.button>
        )
      })}
    </div>
  )
}

/* Full-screen profile selector for initial pick / settings */
export function ProfileSelector() {
  const activeProfile = useProfileStore((s) => s.activeProfile)
  const setActiveProfile = useProfileStore((s) => s.setActiveProfile)

  return (
    <div className="flex gap-6 justify-center">
      {profiles.map((p) => {
        const isActive = p.id === activeProfile
        const borderColor = p.accentHue === 'green'
          ? isActive ? 'border-accent-green ring-2 ring-accent-green/20' : 'border-border-custom hover:border-accent-green/40'
          : isActive ? 'border-pink-500 ring-2 ring-pink-500/20' : 'border-border-custom hover:border-pink-400/40'
        const textColor = p.accentHue === 'green' ? 'text-accent-green' : 'text-pink-400'

        return (
          <motion.button
            key={p.id}
            onClick={() => setActiveProfile(p.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 bg-surface-1 transition-all cursor-pointer w-[140px] ${borderColor}`}
          >
            <div className={`text-4xl`}>{p.emoji}</div>
            <span className={`font-display text-lg font-bold uppercase tracking-tight ${isActive ? textColor : 'text-text-dim'}`}>
              {p.name}
            </span>
            {isActive && (
              <motion.div
                layoutId="profile-active"
                className={`w-2 h-2 rounded-full ${p.accentHue === 'green' ? 'bg-accent-green' : 'bg-pink-500'}`}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
