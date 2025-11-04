<script setup lang="ts">

import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="login-page">
    <!-- Navbar -->
    <NavbarLogin />
    <a href="/" class="back-link"> ←Return </a>

    <!-- Section principale -->
    <section class="login-section container">
      <div class="login-content">
        <!-- Formulaire -->
        <div class="login-card">
          <img
            src="../assets/images/Logo.png"
            alt="Logo LinkedIn2CV"
            class="login-logo"
          />

          <h2 class="login-title">Sign in</h2>

          <form>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                class="form-control"
                placeholder="Enter your email"
              />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                placeholder="Enter your password"
              />
             <RouterLink to="/forgotpassword" class="forgot-link">Forgot password?</RouterLink>
            </div>

            <div class="form-check">
              <input type="checkbox" id="remember" class="form-check-input" />
              <label for="remember" class="form-check-label"
                >Remember for 30 days</label
              >
            </div>

            <button type="submit" class="btn-principale w-100 mt-3">
              Sign in
            </button>

            <p class="separator">or</p>

            <button type="button" class="btn btn-outline-dark w-100">
              <i class="bi bi-google me-2"></i> Sign in with Google
            </button>

            <p class="signup-text">
              Don't have an account?
              <RouterLink to="/register" class="text-primary">Sign up</RouterLink>
            </p>
          </form>
        </div>

        <!-- Image à droite -->
        <div class="login-image">
          <img
            src="../assets/images/CV/CV_Login_EN.jpg"
            alt="CV_Login_EN"
            class="img-fluid rounded shadow"
          />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 60vh;
}

.login-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.login-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}

.login-card {
  width: 380px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.login-logo {
  display: block;
  margin: 0 auto 1rem;
  width: 80px;
}

.login-title {
  text-align: center;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 400;
}

.form-control {
  width: 70%;
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.form-control:focus {
  outline: none;
  border-color: #0d6efd;
  box-shadow: 0 0 4px rgba(13, 110, 253, 0.2);
}

.forgot-link {
  display: block;
  text-align: right;
  font-size: 0.9rem;
  margin-top: 0.3rem;
  color: #0d6efd;
  text-decoration: none;
}

.form-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-principale {
  cursor: pointer;
}

.separator {
  text-align: center;
  margin: 1rem 0;
  color: #999;
}

.signup-text {
  text-align: center;
  margin-top: 1rem;
}

.login-image img {
  max-width: 400px;
  width: 100%;
}

.forgot-link {
  font-size: .9rem;
  color: #0056b3;
  cursor: pointer;
}

.text-primary {
  font-size: .9rem;
  color: #0056b3;
  cursor: pointer;
}
.forgot-link:hover {
  text-decoration: underline;
}

.text-primary:hover {
  text-decoration: underline;
}

</style>
