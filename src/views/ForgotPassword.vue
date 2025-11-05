<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="forgot-page">

    <div class="forgot-box">
      <button class="close-btn" @click="$router.push('/login')">
        ✕
      </button>

      <h2>Mot de passe oublié ?</h2>
      <p class="subtitle">
        Merci de saisir l'adresse e-mail que vous avez utilisée lors de l'inscription
      </p>

      <form class="forgot-form">

        <label>Adresse e-mail</label>
        <input type="email" placeholder="moneemail@adresse.fr" />

        <button class="reset-btn">
          Obtenir un nouveau mot de passe
        </button>

      </form>
    </div>

  </div>
</template>

<style scoped>
.forgot-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(4px);
  height: 100vh;
  padding: 1rem;
}

.forgot-box {
  position: relative;
  width: 450px;
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 35px rgba(0,0,0,0.12);
}

.close-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  cursor: pointer;
  color: #333;
}

h2 {
  text-align: center;
  font-weight: 700;
  font-size: 1.7rem;
  margin-bottom: .3rem;
  color: #002a5e;
}

.subtitle {
  text-align: center;
  font-size: .95rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.forgot-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-size: .9rem;
  font-weight: 600;
  color: #444;
}

input {
  padding: .8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: .95rem;
}

input:focus {
  border-color: #007bff;
}

.reset-btn {
  margin-top: .6rem;
  background: #0056b3;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: .85rem;
  font-weight: 600;
  cursor: pointer;
  font-size: .95rem;
}

.reset-btn:hover {
  background: #003f8a;
}
</style>
