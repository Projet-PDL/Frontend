<script setup lang="ts">
import NavbarLogin from '@/components/NavbarLogin.vue'
import Footer from '@/components/Footer.vue'
import ForgotPassword from "@/components/ForgotPassword.vue";

import { ref } from "vue";

const email = ref("")
const password = ref("")
const showPassword = ref(false)
const showForgotPassword = ref(false)
const rememberMe = ref(false)
const showSuccess = ref(false)
const errorMessage = ref("")

const handleLogin = () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Email and password are required!"
    return
  }

  //L'envoi de l'email et password au back on le fait lundi
}

const handleForgotSubmit = (forgotEmail: string) => {
  console.log("Email submitted for reset:", forgotEmail)
  showForgotPassword.value = false
  showSuccess.value = true

  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

</script>

<template>
  <div class="login-page">
    <NavbarLogin />

    <a href="/" class="back-link">← Homepage</a>

    <section class="login-section container">
      <div class="login-card">
        <img
          src="../assets/images/Logo.png"
            alt="Logo LinkedIn2CV"
          class="login-logo"
        />

        <h2 class="login-title">Sign in</h2>

        <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Email"
        />
        <div class="password-field">
          <input 
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            placeholder="Password"
          />
          <span class="toggle-password" @click="showPassword = !showPassword">
            {{ showPassword ? 'Hide' : 'Show' }}
          </span>
        </div>

        <div class="remember-password-group">
          <div class="form-check">
            <input type="checkbox" id="remember" class="form-check-input" v-model="rememberMe" />
            <label for="remember" class="form-check-label">Remember for 30 days</label>
          </div>
          <span class="forgot-link" @click="showForgotPassword = true">Forgot password?</span>
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button class="btn-principale" @click="handleLogin">Sign in</button>

        <div class="or-line">
          <div class="line"></div>
          <p class="or">or</p>
          <div class="line"></div>
        </div>

        <button type="button" class="btn-google">
          <img src="@/assets/images/Google.png" alt="Google icon" class="google-icon" />
          <span>Sign in with Google</span>  
        </button>

        <div class="register-link">
          <span class="signup-text">Don't have an account?</span>
          <RouterLink to="/register" class="Sign-up-link">Sign up</RouterLink>
        </div>
      </div>
      <img src="../assets/images/CV/CV_Login_EN.jpg" alt="CV_Login_EN" class="cv-image"/>
    </section>

    <transition name="fade-popup">
      <ForgotPassword
        v-if="showForgotPassword"
        @close="showForgotPassword = false"
        @forgotPassword="handleForgotSubmit"
      />
    </transition>
    <div v-if="showSuccess" class="success-toast">
      Email sent! Check your inbox.
    </div>

    <Footer />
  </div>
</template>

<style scoped>

section {
  margin: 100px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center; 
  gap: 50px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.54);
  height: 100%;
}

.login-logo {
  display: block;
  margin: 0 auto;
  width: 80px;
}

.login-title {
  font-weight: 700;
  margin: 20px 0 20px;
}

.form-control {
  padding: 10px 15px 10px;
  border-radius: 4px;
  border: 1px solid #9b9b9bff;
  margin-bottom: 1rem;
}

.form-control::placeholder {
  color: #8E8E8E;
}

.password-field {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #0F62A4;
  cursor: pointer;
}

.remember-password-group{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 30px;
  font-size: 13px;
}

.form-check-input{
  border: 1px solid #9b9b9bff;
}

.forgot-link {
  text-decoration: none;
  font-weight: 600;
  color: #0F62A4;
  cursor: pointer;
}

.forgot-link:hover{
  text-decoration:none;
  transform: scale(1.05);
}

.btn-principale{
  width: 100%;
  text-align: center;
}

.or-line{
  display: flex;
  align-items: center;
  margin: 20px 0 20px;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #7e7e7eff;
}

.or {
  text-align: center;
  margin: 0 10px 0;
  color: #7e7e7eff;
}

.google-icon{
  height: 20px;
}

.btn-google {
  width: 100%;
  background-color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  border: 1px solid #9b9b9bff;
  border-radius: 17px;
  padding: 10px 40px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  line-height: 0;
}

.btn-google:hover {
  transform: scale(1.05);
}

.register-link{
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
  margin:  25px 0 0;
  font-size: 13px;
}

.signup-text{
  color: #8E8E8E;
}

.Sign-up-link{
  text-decoration: none;
  color: #0F62A4;
  cursor: pointer;
}

.Sign-up-link:hover{
  text-decoration:none;
  transform: scale(1.05);
}

.cv-image{
  width: 100%;
  max-width: 400px;
  box-shadow: -8px 8px 18px rgba(175, 178, 180, 0.83);
}

.fade-popup-enter-active,
.fade-popup-leave-active {
  transition: all 0.25s ease;
}

.fade-popup-enter-from,
.fade-popup-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

</style>
