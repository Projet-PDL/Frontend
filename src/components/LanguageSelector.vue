<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const showDropdown = ref(false)

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'ar', label: 'العربية' },
]

// Fonction pour changer de langue
const changeLanguage = (code) => {
  locale.value = code
  showDropdown.value = false
}
</script>

<template>
  <div class="modal-overlay">
      <i class="bi bi-globe"></i>
    <div class="modal-content" @click="showDropdown = !showDropdown">
       {{ languages.find(l => l.code === locale)?.label || 'Language' }}
    </div>

    <ul v-if="showDropdown" class="dropdown">
      <li v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code)">
        {{ lang.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: relative;
   display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Roboto', sans-serif;
  color: black;
}



.dropdown {
  position: absolute;
  top: 40px;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  list-style: none;
  padding: 5px 0;
  width: 140px;
  z-index: 1000;
}

.dropdown li {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown li:hover {
  background: #f2f2f2;
}
</style>
