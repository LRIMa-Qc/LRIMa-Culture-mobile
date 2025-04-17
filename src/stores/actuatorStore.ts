import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { FullActuatorComponent } from '../pages/Actuators/Actuators'

interface ActuatorStoreState {
  actuators: FullActuatorComponent[]
  updateActuators: (actuators: FullActuatorComponent[]) => void
}

export const useActuatorStore = create<ActuatorStoreState>()(
  persist(
    (set) => ({
      actuators: [],
      updateActuators: (actuators) => set(() => ({ actuators }))
    }),
    {
      name: 'serre-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  )
)

