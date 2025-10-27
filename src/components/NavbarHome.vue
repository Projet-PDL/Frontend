<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <img src="@/assets/images/logo.png" alt="LinkedIn2CV logo" class="navbar-logo"/>

      <ul class="navbar-links">
        <li>
          <i class="bi bi-globe"></i>
          <span>English</span>
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

        <li>
          <RouterLink to="/Login" class="btn-principale">Sign Up</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>
