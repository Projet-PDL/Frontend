<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <i class="bi bi-grid-3x3-gap-fill icon-menu"></i>

        <img src="@/assets/images/logo.png" alt="LinkedIn2CV logo" class="navbar-logo"/>

        <div class="generate-section">
          <input type="text" class="form-control input-url" placeholder="Enter your LinkedIn profile URL"/>
          <button type="button" class="btn-generate">Generate</button>
        </div>
      </div>

      <div class="navbar-right">
        <div class="language-section">
          <i class="bi bi-globe"></i>
          <span>English</span>
        </div>

        <button class="btn-principale btn-icon">
          Download
          <i class="bi bi-download"></i>
        </button>

        <!-- Trois points à ajouter plus tard -->
      </div>
    </div>
  </nav>
</template>


<style scoped>

.navbar {
  width: 90%;
  margin: 0 auto;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-menu {
  font-size: 25px;
  cursor: pointer;
}

.generate-section {
  position: relative;
  width: 600px;
  border: 2px solid #0F62A4;
  border-radius: 8px;
  display: flex;
  align-items: center;
  height: 40px;
}

.input-url {
  width: 100%;
  height: 100%; 
  padding: 0 110px 0 12px;  
  border: none;
  color: #6c757d;
}

.input-url::placeholder {
  color: #adb5bd;
  opacity: 1;
}

.input-url:focus {
  box-shadow: 0 0 0 4px rgba(10,102,194,.12);
}

.btn-generate {
  background-color: #0F62A4;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
}

.btn-generate:hover {
  background-color: rgb(24, 87, 151);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.language-section {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Roboto', sans-serif;
  color: black;
}

.btn-icon {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 20px;
}
</style>
