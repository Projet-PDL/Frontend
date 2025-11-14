<script setup>
import { ref } from 'vue'

// ✅ Utilise `new URL(..., import.meta.url).href` pour bien résoudre le chemin des images
const templates = [
  {
    name: 'CV with photo',
    src: new URL('@/assets/images/CV/CV_Login_EN.jpg', import.meta.url).href,
  },
  {
    name: 'CV without photo',
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
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

/* Zone d'affichage */
.preview-area {
  width: 90%;
  background: #fff;
  border-radius: 8px;
  border: 2px solid #33333333;
  overflow: hidden;
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
