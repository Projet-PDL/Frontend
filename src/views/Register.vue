<script setup lang="ts">
import NavbarLogin from '@/components/NavbarLogin.vue'
import Footer from '@/components/Footer.vue'
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const fullName = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const errorMessage = ref("")
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showSuccess = ref(false)

const handleRegister = () => {
  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = "All fields are required!"
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match!"
    return
  }

  errorMessage.value = ""
  showSuccess.value = true

  setTimeout(() => {
    showSuccess.value = false
    router.push("/app")
  }, 1500)
}
</script>

<template>
  <div class="register-page">
    <NavbarLogin />

    <a href="/login" class="back-link">← Return</a>

    <section class="register-section container">
      <img src="../assets/images/CV/CV_Login_EN.jpg" class="cv-image" />

      <div class="register-card">

        <h2 class="register-title">Create account</h2>

        <button type="button" class="google-circle-btn">
          <img src="@/assets/images/Google.png" alt="Google icon" class="google-icon" />
        </button>

        <p>or use email for registration</p>

        <input v-model="fullName" type="text" class="form-control" placeholder="Full Name" />
        <input v-model="email" type="email" class="form-control" placeholder="Email" />

        <div class="password-field">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" class="form-control" placeholder="Password" />
          <span class="toggle-password" @click="showPassword = !showPassword">
            {{ showPassword ? 'Hide' : 'Show' }}
          </span>
        </div>

        <div class="password-field">
          <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" class="form-control" placeholder="Confirm Password" />
          <span class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
            {{ showConfirmPassword ? 'Hide' : 'Show' }}
          </span>
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button class="btn-principale" @click="handleRegister">Sign up</button>

        <RouterLink to="/login" class="sign-in-link">Already have an account?</RouterLink>
      </div>

      
    </section>

    <div v-if="showSuccess" class="success-toast">
      Account created!
    </div>

    <Footer />
  </div>
</template>

<style scoped>

.register-section {
  margin: 100px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center; 
  gap: 50px;
}

.register-card {
  width: 100%;
  max-width: 400px;
  padding: 25px;
  height: 100%;
}

.register-title {
  color: #0F62A4;
  font-weight: 700;
  margin: 15px 0;
  font-size: 40px;
  text-align: center;
}

.google-circle-btn {
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #9b9b9b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.25s ease;
  padding: 0;
  margin: 0 auto 15px;
}

.google-circle-btn:hover {
  transform: scale(1.08);
}

.google-icon {
  height: 24px;
}

p{
  text-align: center;
  color: #7e7e7eff;
}

.form-control {
  padding: 10px 15px 10px;
  border-radius: 4px;
  border: 1px solid #9b9b9bff;
  margin-bottom: 20px;
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

.error {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}

.btn-principale{
  width: 100%;
  margin-bottom: 20px;
}

.sign-in-link {
  display: block;
  text-align: center;
  color: #0F62A4;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
}

.sign-in-link:hover {
  transform: scale(1.05);
}

.cv-image {
  width: 100%;
  max-width: 400px;
  box-shadow: -8px 8px 18px rgba(175, 178, 180, 0.83);
}

.success-toast {
  position: fixed;
  top: 20px;
  left: 20px;
  background: #0F62A4;
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  font-weight: 500;
  animation: fadeInOut 2.2s ease forwards;
  z-index: 99999;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(-10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-10px); }
}
</style>
