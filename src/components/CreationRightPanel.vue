<script setup>
import { ref, computed } from 'vue'
import CVPhoto from '@/components/cv_preview/CVPhoto.vue'
import CVWithoutPhoto from '@/components/cv_preview/CVWithoutPhoto.vue'
import CVATS from '@/components/cv_preview/CVATS.vue'
import { usePdfExport } from '@/helpers/usePdfExport.ts'

const templates = [
  {
    name: 'CV with photo',
    src: new URL('@/assets/images/CV/CV_Login_EN.jpg', import.meta.url).href,
    component: CVPhoto,
  },
  {
    name: 'CV without photo',
    src: new URL('@/assets/images/CV/CV_SansPhoto_EN.jpg', import.meta.url).href,
    component: CVWithoutPhoto,
  },
  {
    name: 'CV ATS',
    src: new URL('@/assets/images/CV/CV_ATS_EN.jpg', import.meta.url).href,
    component: CVATS,
  },
]

const selectedTemplate = ref(templates[0])
const cvPreviewRef = ref(null)
const previewAreaRef = ref(null)

const activeComponent = computed(() => selectedTemplate.value.component)

const selectTemplate = (template) => {
  selectedTemplate.value = template
}

// Export PDF
const { exportToPdf, isExporting, exportError } = usePdfExport()

const handleDownload = async () => {
  if (!cvPreviewRef.value || !previewAreaRef.value) {
    console.error('Élément CV non trouvé')
    return
  }

  try {
    // Sauvegarder l'état actuel du scroll et du transform
    const scrollTop = previewAreaRef.value.scrollTop
    const previewScale = cvPreviewRef.value.parentElement
    const originalTransform = previewScale.style.transform

    // Réinitialiser le scroll et retirer le scale
    previewAreaRef.value.scrollTop = 0
    previewScale.style.transform = 'scale(1)'
    previewScale.style.transformOrigin = 'top left'

    // Attendre que le DOM se mette à jour
    await new Promise(resolve => setTimeout(resolve, 200))

    // Générer le nom de fichier
    const filename = `${selectedTemplate.value.name.replace(/\s+/g, '_')}.pdf`

    // Capturer le CV
    await exportToPdf(cvPreviewRef.value, filename)

    // Restaurer l'état original
    previewScale.style.transform = originalTransform
    previewScale.style.transformOrigin = 'top center'
    previewAreaRef.value.scrollTop = scrollTop
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)

    // Restaurer en cas d'erreur
    if (previewAreaRef.value && cvPreviewRef.value) {
      const previewScale = cvPreviewRef.value.parentElement
      if (previewScale) {
        previewScale.style.transform = 'scale(0.61)'
        previewScale.style.transformOrigin = 'top center'
      }
    }
  }
}

// Exposer la méthode pour la Navbar
defineExpose({
  handleDownload,
  isExporting
})
</script>

<template>
  <div class="right-panel-container">
    <!-- Bandeau de modèles -->
    <div class="template-list">
      <div
        v-for="(template, index) in templates"
        :key="index"
        class="template-item"
        :class="{ active: selectedTemplate.name === template.name }"
        @click="selectTemplate(template)"
      >
        <img :src="template.src" :alt="template.name" />
        <p>{{ template.name }}</p>
      </div>
    </div>

    <!-- Zone d'affichage du modèle sélectionné -->
    <div ref="previewAreaRef" class="preview-area">
      <div class="preview-scale">
        <div ref="cvPreviewRef">
          <component :is="activeComponent" />
        </div>
      </div>
    </div>

    <!-- Message d'erreur si export échoue -->
    <div v-if="exportError" class="alert alert-danger mt-3">
      {{ exportError }}
    </div>

    <!-- Indicateur de chargement pendant l'export -->
    <div v-if="isExporting" class="export-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Export en cours...</span>
      </div>
      <p class="mt-2">Génération du PDF en cours...</p>
    </div>
  </div>
</template>

<style scoped>
.right-panel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Bandeau de modèles */
.template-list {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.template-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  padding: 8px;
}

.template-item:hover, .template-item.active {
  transform: scale(1.20);
}

.template-item img:hover, .template-item.active img{
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.39);
  border: 1px solid black;
}

.template-item p:hover, .template-item.active p{
  color: black;
}

.template-item img {
  width: 100px;
  height: 140px;
  object-fit: cover;
  border: 1px solid #333333aa;
  margin-bottom: 5px;
}

.template-item p {
  font-size: 0.8rem;
  color: #333333aa;
  margin: 0;
}

.preview-area {
  width: 83%;
  height: 690px;
  border: 2px solid #33333333;
  border-radius: 8px;
  overflow-y: auto; /* Permettre le scroll vertical */
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: start;
  position: relative;
}

/* Style de la scrollbar */
.preview-area::-webkit-scrollbar {
  width: 0px;
}

.preview-area::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.preview-area::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.preview-area::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.preview-scale {
  transform: scale(0.61);
  transform-origin: top center;
  margin-bottom: 20px; /* Espace en bas pour le scroll */
}

.export-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 1000;
}

.export-overlay p {
  color: #333;
  font-weight: 500;
}

/* =========================
   TABLETTE (<= 992px)
========================= */
@media (max-width: 992px) {
  .right-panel-container {
    padding: 12px;
  }

  /* templates: plutôt slider horizontal que wrap */
  .template-list {
    justify-content: flex-start;
    flex-wrap: nowrap;
    gap: 14px;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 6px 6px 10px;
    margin-bottom: 12px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .template-list::-webkit-scrollbar {
    height: 0px;
  }

  .template-item {
    flex: 0 0 auto;
    scroll-snap-align: start;
    padding: 6px;
  }

  /* évite le zoom énorme au hover sur tablette */
  .template-item:hover,
  .template-item.active {
    transform: scale(1.05);
  }

  .template-item img {
    width: 86px;
    height: 120px;
  }

  .template-item p {
    font-size: 0.78rem;
    text-align: center;
    max-width: 90px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .preview-area {
    width: 100%;
    height: 72vh; /* prend une hauteur confortable */
  }

  /* un peu plus grand que 0.61 pour tablette */
  .preview-scale {
    transform: scale(0.70);
    transform-origin: top center;
  }
}

/* =========================
   MOBILE (<= 768px)
========================= */
@media (max-width: 768px) {
  .right-panel-container {
    padding: 10px;
    border-radius: 12px;
  }

  .template-list {
    gap: 12px;
    padding: 6px 4px 10px;
  }

  .template-item img {
    width: 78px;
    height: 110px;
  }

  /* pas de gros zoom sur mobile */
  .template-item:hover,
  .template-item.active {
    transform: scale(1.02);
  }

  .preview-area {
    width: 100%;
    height: 68vh;
    border-width: 1px;
  }

  .preview-scale {
    transform: scale(0.62);
    transform-origin: top center;
  }
}

/* =========================
   PETITS MOBILES (<= 420px)
========================= */
@media (max-width: 420px) {
  .template-item img {
    width: 70px;
    height: 100px;
  }

  .preview-area {
    height: 64vh;
  }

  .preview-scale {
    transform: scale(0.58);
  }
}

</style>