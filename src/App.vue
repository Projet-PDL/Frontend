<script setup lang="ts">
import { useRoute } from 'vue-router'

import NavbarLogin from './components/NavbarLogin.vue'

const route = useRoute()
</script>

<template>
  <!-- Si la route actuelle est /login, on affiche NavbarLogin -->
  <component :is="route.path === '/login' ? NavbarLogin : NavbarHome" />

  <!-- Le reste du contenu des pages -->
  <RouterView />
</template>

<style>
/* Tu peux ajouter ton style global ici */
</style>
