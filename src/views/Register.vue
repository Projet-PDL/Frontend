<script setup lang="ts">
import NavbarLogin from '@/components/NavbarLogin.vue'
import Footer from '@/components/Footer.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store.ts'

const router = useRouter()
const auth = useAuthStore()
const loading = computed(() => auth.loading)
const error = computed(() => auth.error)

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')

const MIN_NAME_LENGTH = 2

function validateName(label: string, value: string): string | null {
  if (value.trim().length < MIN_NAME_LENGTH) {
    return `${label} must contain at least ${MIN_NAME_LENGTH} characters.`
  }
  return null
}

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string): string | null {
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address.'
  }
  return null
}

function validatePassword(pwd: string): string | null {
  if (pwd.length < 8) {
    return 'Password must contain at least 8 characters.'
  }
  if (!/[A-Z]/.test(pwd)) {
    return 'Password must contain at least one uppercase letter.'
  }
  if (!/\d/.test(pwd)) {
    return 'Password must contain at least one number.'
  }
  if (!/[^A-Za-z0-9]/.test(pwd)) {
    return 'Password must contain at least one special character.'
  }
  return null
}

async function handleRegister () {
  try {
    errorMessage.value = ''

    if (
      !first_name.value ||
      !last_name.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      errorMessage.value = 'All fields are required!'
      return
    }

    const firstNameError = validateName('First name', first_name.value)
    if (firstNameError) {
      errorMessage.value = firstNameError
      return
    }

    const lastNameError = validateName('Last name', last_name.value)
    if (lastNameError) {
      errorMessage.value = lastNameError
      return
    }

    const emailError = validateEmail(email.value)
    if (emailError) {
      errorMessage.value = emailError
      return
    }

    const pwdError = validatePassword(password.value)
    if (pwdError) {
      errorMessage.value = pwdError
      return
    }

    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match!'
      return
    }

    const name = first_name.value + ' ' + last_name.value

    await auth.register(name, email.value, password.value)

    errorMessage.value = ''
    showSuccess.value = true

    setTimeout(() => {
      showSuccess.value = false
      router.push('/creation')
    }, 1500)
  } catch {}

}
</script>

<template>
  <div class="register-page">
<!--    <NavbarLogin />-->

<!--    <a href="/login" class="back-link">← Return</a>-->

    <section class="register-section container">
      <img src="../assets/images/CV/CV_Login_EN.jpg" class="cv-image" />

      <div class="register-card">
        <h2 class="register-title">Create account</h2>

        <button type="button" class="google-circle-btn">
          <img src="@/assets/images/Google.png" alt="Google icon" class="google-icon" />
        </button>

        <p>or use email for registration</p>

        <input v-model="first_name" type="text" class="input-field" placeholder="First name" required />
        <input v-model="last_name" type="text" class="input-field" placeholder="Last name" required />
        <input v-model="email" type="email" class="input-field" placeholder="Email" required/>

        <div class="password-field">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            class="input-field"
            placeholder="Password"
            minlength="8"
            required
          />
          <span class="toggle-password" @click="showPassword = !showPassword">
            {{ showPassword ? 'Hide' : 'Show' }}
          </span>
        </div>

        <div class="password-field">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            class="input-field"
            placeholder="Confirm Password"
            minlength="8"
            required
          />
          <span class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
            {{ showConfirmPassword ? 'Hide' : 'Show' }}
          </span>
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="error" class="error">{{ error }}</p>

        <button
          class="btn-principale btn btn-primary"
          :disabled="loading"
          @click="handleRegister"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          Sign up
        </button>

        <div class="login-link">
          <span class="signin-text">Already have an account ?</span>
          <RouterLink to="/login" class="Sign-in-link">Sign in</RouterLink>
        </div>
      </div>
    </section>

    <div v-if="showSuccess" class="success-toast">Account created!</div>

<!--    <Footer />-->
  </div>
</template>

<style scoped>
.login-link {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  margin: 25px 0 0;
  font-size: 13px;
}

.signin-text {
  color: #8e8e8e;
}

.Sign-in-link {
  text-decoration: none;
  color: #0f62a4;
  cursor: pointer;
}
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
  color: #0f62a4;
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

p {
  text-align: center;
  color: #7e7e7eff;
}

.input-field {
  padding: 10px 15px 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.password-field {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 38%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #0f62a4;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}

.btn-principale {
  width: 100%;
  margin-bottom: 20px;
}

.sign-in-link {
  display: block;
  text-align: center;
  color: #0f62a4;
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

/* Evite les débordements horizontaux */
.register-page {
  overflow-x: hidden;
  padding: 0 16px;
}

/* =========================
   TABLETTE (<= 992px)
========================= */
@media (max-width: 992px) {
  .register-section {
    margin: 70px auto;
    gap: 30px;
  }

  .register-title {
    font-size: 34px;
  }

  .register-card {
    max-width: 440px;
    padding: 22px;
  }

  .cv-image {
    max-width: 360px;
  }
}

/* =========================
   MOBILE (<= 768px)
========================= */
@media (max-width: 768px) {
  .register-section {
    margin: 40px auto;
    grid-template-columns: 1fr; /*  une seule colonne */
    gap: 20px;
  }

  /*  On affiche l'image au-dessus (plus joli) */
  .cv-image {
    order: 1;
    max-width: 360px;
  }

  .register-card {
    max-width: 420px;
    padding: 18px;
  }

  .register-title {
    font-size: 28px;
  }

  .toggle-password {
    top: 50%;
  }
}

/* =========================
   PETITS MOBILES (<= 420px)
========================= */
@media (max-width: 420px) {
  .register-title {
    font-size: 24px;
  }

  .register-card {
    padding: 16px;
  }

  .google-circle-btn {
    width: 38px;
    height: 38px;
  }
}

</style>
