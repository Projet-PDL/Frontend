<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import CVSidebar from './Sidebar.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useCvStore } from '@/stores/cv.store'
import { apiCreateCv, apiGenerateCvFromLinkedIn } from '@/services/cvmanagement.service'

const isSidebarOpen = ref(false)
const showMenu = ref(false)
const menuButtonRef = ref<HTMLElement | null>(null)

const linkedinUrl = ref('')
const isGenerating = ref(false)

const router = useRouter()
const auth = useAuthStore()
const cvStore = useCvStore()

// -- Sidebar --
const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value)
const closeSidebar = () => (isSidebarOpen.value = false)

// -- Menu --
const toggleMenu = (event: MouseEvent) => {
  event.stopPropagation()
  showMenu.value = !showMenu.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (menuButtonRef.value && !menuButtonRef.value.contains(event.target as Node)) {
    showMenu.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

const goToHome = () => {
  router.push('/')
  showMenu.value = false
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  alert('Lien copié dans le presse-papiers !')
  showMenu.value = false
}

const logout = () => {
  auth.logout()
  router.push('/')
}

/* =======================
   GENERATE FROM LINKEDIN
======================= */
const generateCv = async () => {
  if (!linkedinUrl.value) {
    alert('Please enter a LinkedIn profile URL')
    return
  }

  try {
    isGenerating.value = true

    // 1️⃣ Create empty CV
    const cv = await apiCreateCv()

    // 2️⃣ Generate CV from LinkedIn
    const generatedCv = await apiGenerateCvFromLinkedIn(cv.id, {
      linkedinUrl: linkedinUrl.value
    })

    // 3️⃣ Save CV globally
    cvStore.setCv(generatedCv)

    // (optionnel) redirection vers page édition CV
    router.push(`/cv/${cv.id}`)

  } catch (error) {
    console.error(error)
    alert('Error while generating CV')
  } finally {
    isGenerating.value = false
  }
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <i class="bi bi-grid-3x3-gap-fill icon-menu" @click="toggleSidebar"></i>
        <img src="@/assets/images/logo.png" alt="LinkedIn2CV logo" class="navbar-logo" />

        <div class="generate-section">
          <input
            v-model="linkedinUrl"
            type="text"
            class="form-control input-url"
            placeholder="Enter your LinkedIn profile URL"
          />
          <button
            class="btn-generate"
            :disabled="isGenerating"
            @click="generateCv"
          >
            {{ isGenerating ? 'Generating...' : 'Generate' }}
          </button>
        </div>
      </div>

      <div class="navbar-right">
        <div class="language-section">
          <i class="bi bi-globe"></i>
          <span>English</span>
        </div>

        <div class="menu-actions">
          <button class="btn-principale btn-icon">
            Download
            <i class="bi bi-download"></i>
          </button>

          <div class="menu-wrapper" ref="menuButtonRef">
            <i class="bi bi-three-dots-vertical icon-menu-dots" @click="toggleMenu"></i>

            <div v-if="showMenu" class="dropdown-menu-global">
              <div class="menu-item" @click="goToHome">
                <i class="bi bi-house-door"></i> Homepage
              </div>
              <div class="menu-item" @click="copyLink">
                <i class="bi bi-link-45deg"></i> Share
              </div>
              <div class="menu-item" style="color: red" @click="logout">
                <i class="bi bi-box-arrow-left"></i> Log out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <CVSidebar
    :is-open="isSidebarOpen"
    @close="closeSidebar"
  />
</template>


<style scoped>
.navbar {
  background-color: white;
  width: 90%;
  margin: 0 auto;
  overflow: visible;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  overflow: visible;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-menu {
  font-size: 25px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.icon-menu:hover {
  color: #0f62a4;
}

.navbar-logo {
  height: 40px;
  cursor: pointer;
}

.generate-section {
  position: relative;
  width: 550px;
  border: 2px solid #0f62a4;
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
  border-radius: 8px;
}

.btn-generate {
  background-color: #0f62a4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
  overflow: visible;
}

.language-section {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Roboto', sans-serif;
  color: black;
  cursor: pointer;
}

.menu-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.icon-menu-dots {
  font-size: 22px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;
}

.icon-menu-dots:hover {
  color: #0f62a4;
}

.btn-principale {
  background-color: #0f62a4;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-principale:hover {
  background-color: rgb(24, 87, 151);
}

.btn-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
}

.dropdown-menu-global {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 160px;
  z-index: 9999;
  animation: fadeIn 0.2s ease-in-out;
  overflow: hidden;
}

.dropdown-menu-global .menu-item {
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Roboto', sans-serif;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-menu-global .menu-item:hover {
  background-color: #f0f4f9;
  color: #0f62a4;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>