import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/css/main.css'
import './assets/css/canvas-overrides.css'

// Desactivar la restauración automática del scroll lo antes posible
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app')
