<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useCvStore } from '@/stores/cv.store.ts'
import LanguageSelector from '@/components/LanguageSelector.vue'

type CvCard = {
  id: number
  title: string | null
  createdAt: string
  updatedAt: string
}

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'download'): void
  (e: 'generate-linkedin', url: string): void
}>()

const cvStore = useCvStore()

/* =====================
   Data (from store)
===================== */
const cvs = computed<CvCard[]>(() => cvStore.myCvs)
const currentCvId = computed(() => cvStore.currentCvId)

const loading = computed(() => cvStore.loading)
const error = computed(() => cvStore.error)

/* =====================
   New CV modal (title)
===================== */
const showNewCvModal = ref(false)
const newCvTitle = ref('')
const titleError = ref<string | null>(null)

/* =====================
   Import
===================== */
const fileInput = ref<HTMLInputElement | null>(null)
const importing = ref(false)

function handleClose() {
  emit('close')
}

async function ensureListLoaded() {
  try {
    await cvStore.loadMyCvs()
    // si aucun cv sélectionné, prendre le premier (utile après refresh)
    if (!cvStore.currentCvId && cvStore.myCvs.length > 0) {
      await cvStore.selectCv(cvStore.myCvs[0].id)
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  if (props.isOpen) await ensureListLoaded()
})

watch(
  () => props.isOpen,
  async (open) => {
    if (open) await ensureListLoaded()
  }
)

/* =====================
   Select CV
===================== */
async function handleSelectCV(cvId: number) {
  try {
    await cvStore.selectCv(cvId)
    handleClose()
  } catch (e) {
    console.error(e)
  }
}

/* =====================
   Create new CV
===================== */
function openNewCvModal() {
  newCvTitle.value = ''
  titleError.value = null
  showNewCvModal.value = true
}

function closeNewCvModal() {
  showNewCvModal.value = false
}

async function confirmCreateNew() {
  titleError.value = null

  const title = newCvTitle.value.trim()
  if (title.length < 2) {
    titleError.value = 'Le titre doit contenir au moins 2 caractères.'
    return
  }

  try {
    await cvStore.createAndSelectCv(title)
    showNewCvModal.value = false
    handleClose()
  } catch (e) {
    console.error(e)
  }
}

/* =====================
   Import CV (placeholder)
===================== */
function handleImportClick() {
  fileInput.value?.click()
}

async function handleFileImport(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    importing.value = true

    // TODO: endpoint backend d’import:
    // await apiImportCv(file)  (FormData)
    // puis refresh list + select created cv

    console.log('Import CV file:', file.name)

    handleClose()
  } catch (e) {
    console.error(e)
  } finally {
    importing.value = false
    target.value = '' // reset input
  }
}

async function handleDeleteCv(cvId: number) {
  const ok = confirm('Delete CV ? Cette action est irréversible.')
  if (!ok) return

  try {
    await cvStore.deleteCv(cvId)

    // Si on a supprimé le CV sélectionné, on choisit un autre
    if (cvStore.currentCvId === cvId) {
      const next = cvStore.myCvs[0] // après refresh, myCvs ne contient plus celui supprimé
      if (next) {
        await cvStore.selectCv(next.id)
      } else {
        cvStore.resetCv?.() // si tu as la méthode (sinon setCvId(null))
      }
    }
  } catch (e) {
    console.error(e)
  }
}

const linkedInUrl = ref('')
const isGenerating = ref(false)

async function handleGenerate() {
  const url = linkedInUrl.value.trim()
  if (!url) return
  try {
    isGenerating.value = true
    emit('generate-linkedin', url)
    linkedInUrl.value = ''
  } finally {
    isGenerating.value = false
  }
}

</script>

<template>
  <!-- Overlay -->
  <transition name="overlay">
    <div v-if="isOpen" class="sidebar-overlay" @click="handleClose"></div>
  </transition>

  <!-- Sidebar -->
  <transition name="slide">
    <div v-if="isOpen" class="cv-sidebar">
      <div class="sidebar-header">
        <h3 class="sidebar-title">My CVs</h3>
        <button class="btn-close-sidebar" @click="handleClose">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div class="sidebar-content">
        <!-- Mobile tools (visible only on small screens) -->
        <div class="mobile-tools">
          <LanguageSelector />

          <div class="mobile-generate" v-if="true">
            <label class="small-label">Generate from LinkedIn</label>
            <input
              v-model="linkedInUrl"
              type="text"
              class="form-control"
              placeholder="LinkedIn profile URL"
            />
            <button class="btn-principale w-100 mt-2" :disabled="isGenerating || !linkedInUrl.trim()" @click="handleGenerate">
              {{ isGenerating ? 'Generating...' : 'Generate' }}
            </button>
          </div>

          <button class="btn-principale w-100 mt-3" @click="$emit('download')">
            Download <i class="bi bi-download"></i>
          </button>

          <hr class="my-sep" />
        </div>

        <!-- Actions -->
        <div class="action-cards">
          <div class="action-card" @click="openNewCvModal">
            <div class="action-card-icon">
              <i class="bi bi-plus-lg"></i>
            </div>
            <span class="action-card-text">New CV</span>
          </div>

          <div class="action-card" @click="handleImportClick">
            <div class="action-card-icon">
              <i class="bi bi-upload"></i>
            </div>
            <span class="action-card-text">
              <span v-if="importing">Import...</span>
              <span v-else>Import CV</span>
            </span>
          </div>

          <input
            ref="fileInput"
            type="file"
            accept=".pdf,.doc,.docx,.json"
            style="display: none"
            @change="handleFileImport"
          />
        </div>

        <!-- Error / Loading -->
        <p v-if="error" class="text-danger small">{{ error }}</p>
        <div v-if="loading" class="d-flex align-items-center gap-2">
          <span class="spinner-border spinner-border-sm"></span>
          <span class="small">Loading...</span>
        </div>

        <!-- CV list -->
        <div v-else class="cv-list-section">
          <h4 class="section-title">Recent CVs</h4>

          <div v-if="cvs.length === 0" class="small text-muted">
            Aucun CV pour le moment. Crée ton premier CV 👇
          </div>

          <div v-else class="cv-grid">
            <div
              v-for="cv in cvs"
              :key="cv.id"
              class="cv-card"
              :class="{ active: cv.id === currentCvId }"
              @click="handleSelectCV(cv.id)"
            >
              <!-- Bouton delete -->
              <button
                class="cv-delete-btn"
                title="Delete CV"
                @click.stop="handleDeleteCv(cv.id)"
              >
                <i class="bi bi-trash3"></i>
              </button>

              <div class="cv-preview">
                <div class="preview-placeholder">
                  <i class="bi bi-file-earmark-text"></i>
                </div>
              </div>

              <div class="cv-info">
                <h5 class="cv-title">{{ cv.title || 'Sans titre' }}</h5>
                <p class="cv-meta">Modified : {{ new Date(cv.updatedAt).toLocaleDateString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- New CV Modal (simple) -->
      <div v-if="showNewCvModal" class="modal-backdrop" @click.self="closeNewCvModal">
        <div class="modal-card">
          <div class="modal-header">
            <h5 class="m-0">Create new CV</h5>
            <button class="btn-close-sidebar" @click="closeNewCvModal">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <div class="modal-body">
            <label class="form-label">Title</label>
            <input
              v-model="newCvTitle"
              type="text"
              class="form-control"
              placeholder="Ex: CV Alternance, CV Dev Fullstack..."
              maxlength="60"
            />
            <p v-if="titleError" class="text-danger small mt-2">{{ titleError }}</p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-light" @click="closeNewCvModal">Cancel</button>
            <button class="btn btn-primary" @click="confirmCreateNew">Create</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>

.mobile-tools{
  display: none;
  margin-bottom: 16px;
}

.my-sep{
  border: none;
  height: 1px;
  background: #e9ecef;
  margin: 16px 0;
}

.small-label{
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 6px;
  display: inline-block;
}

@media (max-width: 1024px){
  .mobile-tools{
    display: block;
  }
}

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
  position: relative;
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

.cv-delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.09);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #dc3545;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, background 0.2s ease;
  z-index: 2;
}

.cv-delete-btn:hover {
  transform: scale(1.06);
  background: #fff;
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
/* Active card */
.cv-card.active {
  border-color: #0F62A4;
  box-shadow: 0 4px 12px rgba(15, 98, 164, 0.15);
}

/* Placeholder preview */
.preview-placeholder{
  width: 100%;
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#0F62A4;
  font-size:40px;
  background:#f8f9fa;
}

/* Modal minimal */
.modal-backdrop{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  z-index: 2000;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 20px;
}
.modal-card{
  width: 100%;
  max-width: 420px;
  background:#fff;
  border-radius: 12px;
  overflow:hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
.modal-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 16px 18px;
  border-bottom: 1px solid #e9ecef;
}
.modal-body{
  padding: 16px 18px;
}
.modal-footer{
  padding: 16px 18px;
  display:flex;
  justify-content:flex-end;
  gap: 10px;
  border-top: 1px solid #e9ecef;
}
</style>
