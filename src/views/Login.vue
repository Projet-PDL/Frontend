<template>
  <div class="login-page d-flex flex-column min-vh-100" >
  
    <Navbar />

    <!-- Contenu principal -->
    <div class="container my-auto">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-lg border-0 rounded-4 p-4">
            <h3 class="text-center mb-4 fw-semibold">Connexion</h3>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label fw-semibold">Email</label>
                <div class="input-group">
                  <span class="input-group-text bg-primary text-white">
                    <i class="bi bi-envelope-fill"></i>
                  </span>
                  <input
                    type="email"
                    class="form-control"
                    v-model="email"
                    placeholder="Entrez votre email"
                    required
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Mot de passe</label>
                <div class="input-group">
                  <span class="input-group-text bg-primary text-white">
                    <i class="bi bi-lock-fill"></i>
                  </span>
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div class="d-grid mt-4">
                <button type="submit" class="btn btn-primary btn-lg">
                  <i class="bi bi-box-arrow-in-right me-2"></i> Se connecter
                </button>
              </div>

              <p class="text-center mt-3 mb-0">
                <small>
                  Pas encore de compte ?
                  <a href="#" class="text-decoration-none fw-semibold">S'inscrire</a>
                </small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>

<script setup>
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  if (!email.value || !password.value) {
    alert("Veuillez remplir tous les champs !");
    return;
  }
  // Logique temporaire
  alert(`Connexion réussie pour ${email.value}`);
};
</script>

<style scoped>
.login-page {
  background: linear-gradient(120deg, #f0f4ff, #eaf1ff);
}

.card {
  background-color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
</style>
