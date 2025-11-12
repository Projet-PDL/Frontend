import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    welcome: 'Welcome',
    generate: 'Generate',
    download: 'Download',
    language: 'Language',
  },
  fr: {
    welcome: 'Bienvenue',
    generate: 'Générer',
    download: 'Télécharger',
    language: 'Langue',
  },
  es: {
    welcome: 'Bienvenido',
    generate: 'Generar',
    download: 'Descargar',
    language: 'Idioma',
  },
  de: {
    welcome: 'Willkommen',
    generate: 'Generieren',
    download: 'Herunterladen',
    language: 'Sprache',
  },
  ar: {
    welcome: 'أهلاً وسهلاً',
    generate: 'إنشاء',
    download: 'تحميل',
    language: 'اللغة',
  },
}

const i18n = createI18n({
  locale: 'en', // langue par défaut
  fallbackLocale: 'en',
  messages,
})

export default i18n
