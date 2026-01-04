import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import ar from './locales/ar.json'

const STORAGE_KEY = 'app_locale'

const savedLocale = localStorage.getItem(STORAGE_KEY) || 'en'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, fr, es, ar }
})