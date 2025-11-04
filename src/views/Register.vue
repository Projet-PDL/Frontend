<script setup lang="ts">
import { ref, computed } from "vue";
import NavbarLogin from "../components/NavbarLogin.vue";
import Footer from "../components/Footer.vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const errors = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
});

// ✅ Email RegEx simple
const validateEmail = (val: string) =>
  /\S+@\S+\.\S+/.test(val);

// ✅ Password Regex :
// min 8 char, 1 uppercase, 1 number, 1 special char
const passwordRules = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

// 🔐 Validation live
const validateForm = () => {
  errors.value.name = name.value.length < 3 
    ? "Minimum 3 characters" 
    : "";

  errors.value.email = !validateEmail(email.value) 
    ? "Invalid email" 
    : "";

  errors.value.password = !passwordRules.test(password.value)
    ? "Min 8 chars, 1 uppercase, 1 number, 1 special char"
    : "";

  errors.value.confirmPassword = password.value !== confirmPassword.value 
    ? "Passwords do not match"
    : "";
};

// ✅ Form complet validé ?
const isFormValid = computed(() =>
  !errors.value.name &&
  !errors.value.email &&
  !errors.value.password &&
  !errors.value.confirmPassword &&
  name.value &&
  email.value &&
  password.value &&
  confirmPassword.value
);

const handleSignup = () => {
  validateForm();
  if (!isFormValid.value) return;

  alert("✅ Account created successfully!");
};
</script>



<template>
  <div class="register-page">
    <NavbarLogin />
       <a href="/" class="back-link">←Return</a>
    <div class="register-container">

      <!-- CV Preview -->
      <div class="cv-preview">
        <!-- Remplace l'image si besoin -->
        <img src="../assets/images/CV/CV_Login_EN.jpg" alt="CV_Login_EN" />
      </div>

      <!-- Signup Form -->
      <div class="register-form-container">
        <h2>Create Account</h2>

        <button class="google-btn">
          <i class="bi bi-google"></i> Sign up with Google
        </button>

        <div class="divider"><span>or</span></div>

        <form class="register-form" @submit.prevent="handleSignup" @input="validateForm">

  <div class="form-group">
    <label>Full Name</label>
    <input v-model="name" type="text" placeholder="Enter your name" />
    <small v-if="errors.name" class="error">{{ errors.name }}</small>
  </div>

  <div class="form-group">
    <label>Email</label>
    <input v-model="email" type="email" placeholder="Enter your email" />
    <small v-if="errors.email" class="error">{{ errors.email }}</small>
  </div>

  <div class="form-group">
    <label>Password</label>
    <input v-model="password" type="password" placeholder="Enter your password" />
    <small v-if="errors.password" class="error">{{ errors.password }}</small>
  </div>

  <div class="form-group">
    <label>Confirm Password</label>
    <input v-model="confirmPassword" type="password" placeholder="Confirm your password" />
    <small v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</small>
  </div>

  <button class="btn-principale" :disabled="!isFormValid">Sign Up</button>
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

/* MAIN LAYOUT */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 3rem; /* Réduit */
  flex: 1;
  gap: 1rem; /* Réduit l'espace entre CV et form */
  max-width: 1100px;
  margin: 2 auto;

}


/* CV PREVIEW LEFT */
.cv-preview {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cv-preview img {
  width: 80%;
  max-width: 380px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* FORM RIGHT */
.register-form-container {
  width: 380px;
  background: white;
  padding: 1.9rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.register-form-container h2 {
  text-align: center;
  font-weight: 700;
  margin-bottom: 1rem;
}

/* GOOGLE BUTTON */
.google-btn {
  width: 100%;
  padding: .7rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-weight: 500;
  cursor: pointer;
  background: white;
}

.google-btn:hover {
  background: #f3f3f3;
}

/* DIVIDER */
.divider {
  text-align: center;
  margin: 1rem 0;
  position: relative;
}

.divider span {
  background: white;
  padding: 0 10px;
  color: #777;
}

.divider::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background: #ddd;
  top: 50%;
  left: 0;
}

/* FORM FIELDS */
.register-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: .9rem;
  margin-bottom: .25rem;
  color: #555;
}

.form-group input {
  padding: .55rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: .2s;
  font-size: .95rem;
}

.form-group input:focus {
  border-color: #007bff;
}

/* SIGN UP BUTTON */
.btn-principale {
  cursor: pointer;
}

.signup-btn:hover {
  background: #0056b3;
}

.error {
  color: #d9534f;
  font-size: 0.8rem;
  margin-top: 2px;
}

/* Disable button when invalid */
.signup-btn:disabled {
  background: #9bbce8;
  cursor: not-allowed;
}

/* Fade In Animation */
.register-form-container {
  animation: fadeIn .7s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}


/* RESPONSIVE */
@media (max-width: 900px) {
  .register-container {
    flex-direction: column;
    padding: 2rem;
  }

  .cv-preview img {
    width: 75%;
    max-width: 300px;
    margin-bottom: 1.5rem;
  }

  .register-form-container {
    width: 100%;
    max-width: 380px;
  }
}
</style>
