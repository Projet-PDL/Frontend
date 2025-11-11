<script setup lang="ts">
import { ref } from 'vue'

interface CV {
  id: number
  title: string
  preview: string
  lastModified: string
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create-new'): void
  (e: 'import-cv'): void
  (e: 'select-cv', cv: CV): void
}>()

// Exemple de CVs existants
const existingCVs = ref<CV[]>([
  {
    id: 1,
    title: 'CV Professionnel',
    preview: '/src/assets/images/CV/CV_Login_FR.jpg',
    lastModified: '2 jours'
  },
  {
    id: 2,
    title: 'Notice Marié',
    preview: '/src/assets/images/CV/CV_Login_FR.jpg',
    lastModified: '5 jours'
  },
  {
    id: 3,
    title: 'CV Moderne',
    preview: '/src/assets/images/CV/CV_Login_FR.jpg',
    lastModified: '1 semaine'
  },
  {
    id: 4,
    title: 'CV Créatif',
    preview: '/src/assets/images/CV/CV_Login_FR.jpg',
    lastModified: '2 semaines'
  }
])

const fileInput = ref<HTMLInputElement | null>(null)

const handleCreateNew = () => {
  emit('create-new')
  emit('close')
}

const handleImportClick = () => {
  fileInput.value?.click()
}

const handleFileImport = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    console.log('Fichier importé:', file.name)
    emit('import-cv')
    emit('close')
  }
}

const handleSelectCV = (cv: CV) => {
  emit('select-cv', cv)
  emit('close')
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <!-- Overlay -->
  <transition name="overlay">
    <div 
      v-if="isOpen" 
      class="sidebar-overlay"
      @click="handleClose"
    ></div>
  </transition>

  <!-- Sidebar -->
  <transition name="slide">
    <div v-if="isOpen" class="cv-sidebar">
      <div class="sidebar-header">
        <h3 class="sidebar-title">Mes CV</h3>
        <button class="btn-close-sidebar" @click="handleClose">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div class="sidebar-content">
        <!-- Section des actions principales -->
        <div class="action-cards">
          <div class="action-card" @click="handleCreateNew">
            <div class="action-card-icon">
              <i class="bi bi-plus-lg"></i>
            </div>
            <span class="action-card-text">Nouveau CV</span>
          </div>

          <div class="action-card" @click="handleImportClick">
            <div class="action-card-icon">
              <i class="bi bi-upload"></i>
            </div>
            <span class="action-card-text">Import CV</span>
          </div>
          
          <input 
            ref="fileInput"
            type="file" 
            accept=".pdf,.doc,.docx"
            style="display: none;"
            @change="handleFileImport"
          />
        </div>

        <!-- Liste des CVs existants -->
        <div class="cv-list-section">
          <h4 class="section-title">CVs récents</h4>
          <div class="cv-grid">
            <div 
              v-for="cv in existingCVs" 
              :key="cv.id"
              class="cv-card"
              @click="handleSelectCV(cv)"
            >
              <div class="cv-preview">
                <img :src="cv.preview" :alt="cv.title" />
              </div>
              <div class="cv-info">
                <h5 class="cv-title">{{ cv.title }}</h5>
                <p class="cv-meta">Modifié il y a {{ cv.lastModified }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.cv-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 450px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-bottom: 1px solid #e9ecef;
}

.sidebar-title {
  font-size: 24px;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

.btn-close-sidebar {
  background: none;
  border: none;
  font-size: 20px;
  color: #6c757d;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.btn-close-sidebar:hover {
  color: #212529;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
}

.action-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
}

.action-card {
  border: 2px dashed #dee2e6;
  border-radius: 12px;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

.action-card:hover {
  border-color: #0F62A4;
  background-color: #e7f3ff;
  transform: translateY(-2px);
}

.action-card-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #0F62A4;
  border: 2px solid #0F62A4;
}

.action-card-text {
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  text-align: center;
}

.cv-list-section {
  margin-top: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 16px;
}

.cv-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.cv-card {
  border: 1px solid #dee2e6;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #ffffff;
}

.cv-card:hover {
  border-color: #0F62A4;
  box-shadow: 0 4px 12px rgba(15, 98, 164, 0.15);
  transform: translateY(-4px);
}

.cv-preview {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cv-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cv-info {
  padding: 12px;
}

.cv-title {
  font-size: 14px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cv-meta {
  font-size: 12px;
  color: #6c757d;
  margin: 0;
}

/* Animations */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Scrollbar personnalisée */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive */
@media (max-width: 768px) {
  .cv-sidebar {
    width: 100%;
  }

  .cv-grid {
    grid-template-columns: 1fr;
  }
}
</style>