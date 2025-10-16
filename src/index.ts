import type { App } from 'vue'
import RollerSwiper from './components/RollerSwiper.vue'

// Export component
export { RollerSwiper }

// Export types
// export type { RollerSwiperProps } from './components/RollerSwiper.vue'

// Plugin install function
export const install = (app: App): void => {
  app.component('RollerSwiper', RollerSwiper)
}

// Default export for plugin
export default {
  install
}