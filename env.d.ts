/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/i18n' {
  import type { I18n } from 'vue-i18n'
  const i18n: I18n
  export { i18n }
  export default i18n
}

declare module './i18n' {
  import type { I18n } from 'vue-i18n'
  const i18n: I18n
  export { i18n }
  export default i18n
}

declare module '*/i18n' {
  import type { I18n } from 'vue-i18n'
  const i18n: I18n
  export { i18n }
  export default i18n
}
