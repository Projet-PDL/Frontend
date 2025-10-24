<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <img src="@/assets/images/logo.png" alt="LinkedIn2CV logo" class="navbar-logo"/>

      <ul class="navbar-links">
        <li class="no-hover">
          <i class="bi bi-globe"></i>
          <span>English</span>
        </li>

        <li>
          <i class="bi bi-envelope"></i>
          <RouterLink to="/Contact" class="link">Contact</RouterLink>
        </li>

        <li>
          <i class="bi bi-info-circle"></i>
          <RouterLink to="/About" class="link">About</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>
