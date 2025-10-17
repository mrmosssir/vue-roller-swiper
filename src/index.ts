import type { App } from "vue";
import RollerSwiper from "./components/RollerSwiper.vue";

// Export component
export { RollerSwiper };

// Export component instance type
export type RollerSwiperInstance = InstanceType<typeof RollerSwiper>;

// Export props interface
export interface RollerSwiperProps {
  autoPlay?: boolean;
  delay?: number;
}

// Plugin install function
export const install = (app: App): void => {
  app.component("RollerSwiper", RollerSwiper);
};

// Default export for plugin
const VueRollerSwiper = {
  install,
};

export default VueRollerSwiper;

// Auto-install when used via CDN
declare global {
  interface Window {
    Vue?: any;
  }
}

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueRollerSwiper);
}
