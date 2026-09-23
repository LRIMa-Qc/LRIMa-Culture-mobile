import { registerSW } from 'virtual:pwa-register'

// The virtual registration module reloads the app when an updated worker takes
// control. A plain injected registration script does not reload open clients.
registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return

    let checking = false
    const checkForUpdate = async () => {
      if (checking || !navigator.onLine || document.visibilityState !== 'visible') return

      checking = true
      try {
        await registration.update()
      } catch (error) {
        // A failed update must not prevent the cached app from working offline.
        console.warn('Unable to check for an app update:', error)
      } finally {
        checking = false
      }
    }

    void checkForUpdate()
    window.setInterval(() => void checkForUpdate(), 60 * 60 * 1000)
    document.addEventListener('visibilitychange', () => void checkForUpdate())
    window.addEventListener('online', () => void checkForUpdate())
  },
  onRegisterError(error) {
    console.warn('Unable to register the app service worker:', error)
  },
})
