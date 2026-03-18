import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ProfileId = 'danielo' | 'eva'

export type Profile = {
  id: ProfileId
  name: string
  emoji: string
  accentHue: 'green' | 'pink'
}

export const profiles: Profile[] = [
  { id: 'danielo', name: 'Danielo', emoji: '💪', accentHue: 'green' },
  { id: 'eva', name: 'Eva', emoji: '✨', accentHue: 'pink' },
]

type ProfileState = {
  activeProfile: ProfileId
  setActiveProfile: (id: ProfileId) => void
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      activeProfile: 'danielo',
      setActiveProfile: (id) => set({ activeProfile: id }),
    }),
    { name: 'trainiet-profile' }
  )
)

export function getProfile(id: ProfileId): Profile {
  return profiles.find((p) => p.id === id) ?? profiles[0]
}

export function getStorageKey(profileId: ProfileId): string {
  return `trainiet-${profileId}`
}
