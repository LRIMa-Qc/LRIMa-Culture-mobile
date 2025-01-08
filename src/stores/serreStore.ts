import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SerreStoreState {
    serreId: string
    updateSerreId: (serreId: string) => void
  }

export const useSerreStore = create<SerreStoreState>()(
  persist(
    (set) => ({
      serreId: "",
      updateSerreId: (serreId) => set(() => ({serreId}))
  }),
  {
    name: 'serre-storage', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  },
  )
)