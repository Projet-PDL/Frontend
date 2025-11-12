<script setup>
import { ref } from 'vue'

// ✅ Utilise `new URL(..., import.meta.url).href` pour bien résoudre le chemin des images
const templates = [
  {
    name: 'CV avec photo',
    src: new URL('@/assets/images/CV/CV_Login_EN.jpg', import.meta.url).href,
  },
  {
    name: 'CV sans photo',
    src: new URL('@/assets/images/CV/CV_SansPhoto_EN.jpg', import.meta.url).href,
  },
  {
    name: 'CV ATS',
    src: new URL('@/assets/images/CV/CV_ATS_EN.jpg', import.meta.url).href,
  },
]

// Le modèle actuellement sélectionné
const selectedTemplate = ref(templates[0])

// Fonction pour changer de modèle
const selectTemplate = (template) => {
  selectedTemplate.value = template
}
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
    <div class="preview-area">
      <img :src="selectedTemplate.src" alt="Aperçu du CV" class="preview-image" />
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
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Bandeau de modèles */
.template-list {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.template-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: #f8f8f8;
  padding: 8px;
}

.template-item:hover {
  border-color: #2a2a8f;
  background: #eef0ff;
}

.template-item.active {
  border-color: #2a2a8f;
  background: #e1e4ff;
}

.template-item img {
  width: 90px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 5px;
}

.template-item p {
  font-size: 0.8rem;
  color: #333;
  margin: 0;
}

/* Zone d'affichage */
.preview-area {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 700px;
}

.preview-image {
  width: 95%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}
</style>
