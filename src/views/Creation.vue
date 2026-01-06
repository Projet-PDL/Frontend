<script setup lang="ts">
import Navbar from '@/components/NavbarApp.vue'
import Footer from '@/components/Footer.vue'
import LeftPanel from '@/components/CreationLeftPanel.vue'
import Rightpanel from '@/components/CreationRightPanel.vue'

import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCvStore } from '@/stores/cv.store.ts'

const route = useRoute()
const router = useRouter()
const cvStore = useCvStore()

const loading = computed(() => cvStore.loading)
const error = computed(() => cvStore.error)

onMounted(async () => {
  try {
    const q = route.query.cvId
    const fromQuery = q ? Number(q) : null

    const cvId = await cvStore.ensureCurrentCv()
    router.replace({ query: { ...route.query, cvId: String(cvId) } })
  } catch (e) {
    // si pas de CV, tu peux rediriger vers une page "Créer un CV"
    console.error(e)
  }
})

// Ref pour accéder aux méthodes du RightPanel
const rightPanelRef = ref<{ handleDownload: () => Promise<void> } | null>(null)

// Fonction pour déclencher le téléchargement
const handleDownloadClick = () => {
  if (rightPanelRef.value && rightPanelRef.value.handleDownload) {
    rightPanelRef.value.handleDownload()
  }
}
</script>

<template>
  <div class="app-container">
    <Navbar @download="handleDownloadClick" />

    <div class="content">
      <LeftPanel class="left-panel" />
      <Rightpanel ref="rightPanelRef" class="right-panel" />
    </div>

    <!-- overlay loading -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-if="error" class="alert alert-danger position-fixed bottom-0 end-0 m-3">
      {{ error }}
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f6f6;
  padding-bottom: 5rem;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 90%;
  margin-top: 40px;
  gap: 40px;
}

.left-panel {
  width: 55%;
}

.right-panel {
  width: 45%;
  min-height: 815px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Evite le scroll horizontal sur petits écrans */
.app-container {
  overflow-x: hidden;
}

/* =========================
   TABLETTE (<= 992px)
   -> on empile, mais on garde de l’air
========================= */
@media (max-width: 992px) {
  .content {
    flex-direction: column;
    width: 95%;
    gap: 24px;
    margin-top: 24px;
  }

  .left-panel,
  .right-panel {
    width: 100%;
  }

  .right-panel {
    min-height: auto;
  }
}

/* =========================
   MOBILE (<= 768px)
   -> encore plus compact
========================= */
@media (max-width: 768px) {
  .content {
    width: 100%;
    padding: 0 12px;
    gap: 18px;
    margin-top: 18px;
  }

  .right-panel {
    border-radius: 12px; /* optionnel */
  }
}

/* =========================
   PETITS MOBILES (<= 420px)
========================= */
@media (max-width: 420px) {
  .content {
    padding: 0 10px;
    gap: 14px;
  }
}

</style>