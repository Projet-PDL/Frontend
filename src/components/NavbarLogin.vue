<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LanguageSelector from './LanguageSelector.vue'
</script>

const showDropdown = ref(false)

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'ar', label: 'العربية' },
]
<template>
  <nav class="navbar">
    <div class="navbar-container">
      <img src="@/assets/images/logo.png" alt="LinkedIn2CV logo" class="navbar-logo"/>

      <ul class="navbar-links">
        <li>
          <span><LanguageSelector /></span>
        </li>

        <li>
          <RouterLink to="/contact" class="link">
            <i class="bi bi-envelope"></i>
            <span>Contact</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/about" class="link">
            <i class="bi bi-info-circle"></i>
            <span>About</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>
