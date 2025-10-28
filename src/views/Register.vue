<script setup lang="ts">
import NavbarLogin from '@/components/NavbarLogin.vue'
</script>

<template>
  <div class="register-page">
    <NavbarLogin />

    <div class="register-container">
      <!-- Côté gauche : image du CV -->
      <div class="cv-preview">
        <img src="../assets/images/CV/CV_Login_EN.jpg" alt="CV_Login_EN" />
      </div>

      <!-- Côté droit : formulaire d'inscription -->
      <div class="register-form-container">
        <h2>Create Account</h2>

        <!-- Bouton Google -->
        <button class="google-btn">
          <i class="bi bi-google"></i> Sign up with Google
        </button>

        <div class="divider">
          <span>or</span>
        </div>

        <form class="register-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>

          <div class="form-group">
            <label for="confirm">Confirm Password</label>
            <input type="password" id="confirm" placeholder="Confirm your password" />
          </div>

          <button type="submit" class="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2rem 5rem;
  gap: 3rem;
}

.cv-preview {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cv-preview img {
  width: 90%;
  max-width: 450px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.register-form-container {
  flex: 1;
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.register-form-container h2 {
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
}

.google-btn {
  width: 100%;
  background: #fff;
  border: 1px solid #ddd;
  color: #444;
  font-weight: 500;
  border-radius: 8px;
  padding: 0.7rem;
  cursor: pointer;
  transition: 0.2s;
}

.google-btn:hover {
  background-color: #f3f3f3;
}

.divider {
  text-align: center;
  margin: 1rem 0;
  position: relative;
}

.divider span {
  background: white;
  padding: 0 10px;
  position: relative;
  z-index: 2;
  color: #666;
}

.divider::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background: #ddd;
  top: 50%;
  left: 0;
  z-index: 1;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.3rem;
}

.form-group input {
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  font-size: 0.95rem;
  transition: 0.2s;
}

.form-group input:focus {
  border-color: #007bff;
}

.signup-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.8rem;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

.signup-btn:hover {
  background-color: #0056b3;
}
</style>
