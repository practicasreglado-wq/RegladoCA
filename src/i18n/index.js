import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'
import ar from './locales/ar.json'

// Detect browser language, fallback to 'es'
const savedLocale = localStorage.getItem('locale')
const browserLocale = navigator.language.split('-')[0]
const supportedLocales = ['es', 'en', 'ar']
const defaultLocale = savedLocale
  || (supportedLocales.includes(browserLocale) ? browserLocale : 'es')

const i18n = createI18n({
  legacy: false,       // Use Composition API mode
  locale: defaultLocale,
  fallbackLocale: 'es',
  messages: { es, en, ar }
})

export default i18n
