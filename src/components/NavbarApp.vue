<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import CVSidebar from './Sidebar.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useCvStore } from '@/stores/cv.store.ts'
import { apiCreateCv, apiGenerateCvFromLinkedIn } from '@/services/cvmanagement.service'
import LanguageSelector from '@/components/LanguageSelector.vue'

const isSidebarOpen = ref(false)
const showMenu = ref(false)
const menuButtonRef = ref<HTMLElement | null>(null)

const linkedInUrl = ref('')
const isGenerating = ref(false)

const router = useRouter()
const auth = useAuthStore()
const cvStore = useCvStore()

// auth state
const isAuthenticated = computed(() => !!auth.token)

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

const logout = () => {
  auth.logout()
  router.push('/')
}

/* =======================
   GENERATE FROM LINKEDIN
======================= */
const generateCv = async () => {
  const url = linkedInUrl.value.trim()
  if (!url) {
    alert('Please enter a LinkedIn profile URL')
    return
  }

  try {
    isGenerating.value = true

    // 1) Create empty CV
    const created = await apiCreateCv()
    // created = { success: true, data: { id, ... } }
    const cvId = created?.data?.id

    if (!cvId) {
      throw new Error('CV id missing in createCv response')
    }

    // 2) Generate from LinkedIn
    const generated = await apiGenerateCvFromLinkedIn(cvId, { linkedInUrl: url })
    // generated = { success: true, data: { ...cv complet... } }
    const cv = generated?.data

    if (!cv) {
      throw new Error('CV data missing in generateCvFromLinkedIn response')
    }

    // 3) Hydrate store + set currentCvId
    cvStore.setCvId(cvId)
    cvStore.hydrateFromBackend(cv)

    // 4) (Optionnel) refresh la liste dans la sidebar
    await cvStore.loadMyCvs()

    // 5) Nettoyage UI
    linkedInUrl.value = ''
  } catch (error) {
    console.error(error)
    alert('Error while generating CV')
  } finally {
    isGenerating.value = false
  }
}

// Émettre l'événement download vers le parent
const emit = defineEmits(['download'])

const handleDownload = () => {
  emit('download')
}

async function generateCvFromUrl(url: string) {
  linkedInUrl.value = url
  await generateCv()
}

</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <!-- (desktop only) bouton sidebar -->
        <i
          v-if="isAuthenticated"
          class="bi bi-grid-3x3-gap-fill icon-menu"
          @click="toggleSidebar"
        ></i>

        <RouterLink to="/" class="link">
          <img src="@/assets/images/logo.png" alt="LinkedIn2CV logo" class="navbar-logo" />
        </RouterLink>
      </div>

      <div class="navbar-right">
        <!-- ✅ Tout ce bloc disparaît sur mobile -->
        <div class="navbar-desktop-only">
          <LanguageSelector />

          <ul v-if="!isAuthenticated" class="navbar-links">
            <li>
              <RouterLink to="/contact" class="link">
                <i class="bi bi-envelope"></i><span>Contact</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/about" class="link">
                <i class="bi bi-info-circle"></i><span>About</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/login" class="btn-principale">Sign In</RouterLink>
            </li>
          </ul>

          <div v-else class="generate-section">
            <input
              v-model="linkedInUrl"
              type="text"
              class="form-control input-url"
              placeholder="Enter your LinkedIn profile URL"
            />
            <button
              class="btn-generate"
              :disabled="isGenerating || !linkedInUrl.trim()"
              @click="generateCv"
            >
              {{ isGenerating ? 'Generating...' : 'Generate' }}
            </button>
          </div>

          <div v-if="isAuthenticated" class="menu-actions desktop-actions">
            <button class="btn-principale btn-icon" @click="handleDownload">
              Download <i class="bi bi-download"></i>
            </button>
          </div>
        </div>

        <!-- ✅ Dropdown à droite : reste visible partout -->
        <div :class="{ 'mobile-only': !isAuthenticated }"
             class="menu-wrapper " ref="menuButtonRef">
          <i class="bi bi-three-dots-vertical icon-menu-dots" @click="toggleMenu"></i>

          <div v-if="showMenu" class="dropdown-menu-global">
            <RouterLink to="/creation" class="link menu-item">
              <i class="bi bi-house-door"></i> Dashboard
            </RouterLink>

            <RouterLink to="/contact" class="link menu-item">
              <i class="bi bi-envelope"></i><span>Contact</span>
            </RouterLink>

            <RouterLink to="/about" class="link menu-item">
              <i class="bi bi-info-circle"></i><span>About</span>
            </RouterLink>

            <div v-if="isAuthenticated" class="menu-item" style="color: red" @click="logout">
              <i class="bi bi-box-arrow-left"></i> Log out
            </div>

            <RouterLink v-else to="/login" class="link menu-item">
              <i class="bi bi-box-arrow-in-right"></i> Sign In
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <CVSidebar
    :is-open="isSidebarOpen"
    @close="closeSidebar"
    @download="handleDownload"
    @generate-linkedin="generateCvFromUrl"
  />
</template>

<style scoped>

.mobile-only{
  display: none !important;
}

.navbar-desktop-only{
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Mobile */
@media (max-width: 1024px) {
  .navbar-container{
    padding: 10px 12px;
  }

  /* On cache tout sauf logo + dropdown */
  .navbar-desktop-only{
    display: none;
  }

  .navbar-right{
    gap: 12px;
  }

  .navbar-logo{
    height: 36px;
  }

  .mobile-only{
    display: block !important;
  }
}

.navbar {
  background-color: white;
  width: 100%;
  margin: 0 auto;
  overflow: visible;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
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