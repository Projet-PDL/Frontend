<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'

type Lang = { code: string; label: string; dir?: 'ltr' | 'rtl' }

const STORAGE_KEY = 'app_locale'

const { locale } = useI18n()
const showDropdown = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const languages: Lang[] = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'es', label: 'Español', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
]

const currentLang = computed(() => languages.find(l => l.code === locale.value))

function close() {
  showDropdown.value = false
}

function toggle() {
  showDropdown.value = !showDropdown.value
}

function changeLanguage(code: string) {
  locale.value = code
  close()
}

function onClickOutside(e: MouseEvent) {
  if (!showDropdown.value) return
  const el = rootRef.value
  if (el && !el.contains(e.target as Node)) close()
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  // Restore saved locale
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && languages.some(l => l.code === saved)) {
    locale.value = saved
  }

  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeyDown)
})

// Persist locale + set direction for RTL languages
watch(
  () => locale.value,
  (val) => {
    localStorage.setItem(STORAGE_KEY, val)

    const dir = languages.find(l => l.code === val)?.dir || 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', val)
  },
  { immediate: true }
)
</script>

<template>
  <div ref="rootRef" class="lang-root">
    <button type="button" class="lang-button" @click="toggle">
      <i class="bi bi-globe"></i>
      <span class="lang-label">{{ currentLang?.label || 'Language' }}</span>
      <i class="bi bi-chevron-down chevron" :class="{ open: showDropdown }"></i>
    </button>

    <ul v-if="showDropdown" class="dropdown" role="menu">
      <li
        v-for="lang in languages"
        :key="lang.code"
        class="dropdown-item"
        :class="{ active: lang.code === locale }"
        role="menuitem"
        @click="changeLanguage(lang.code)"
      >
        <span>{{ lang.label }}</span>
        <i v-if="lang.code === locale" class="bi bi-check2"></i>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.lang-root {
  position: relative;
  display: inline-flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
}

.lang-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
  color: #1f1f1f;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.lang-button:hover {
  background: #f7f7f7;
  border-color: #d6d6d6;
}

.lang-label {
  font-size: 14px;
  font-weight: 500;
}

.chevron {
  font-size: 12px;
  transition: transform 0.2s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  list-style: none;
  padding: 6px;
  margin: 0;
  width: 170px;
  z-index: 2000;
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
}

.dropdown-item:hover {
  background: #f2f6ff;
}

.dropdown-item.active {
  background: rgba(15, 98, 164, 0.10);
}
</style>
