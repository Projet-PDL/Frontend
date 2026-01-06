<script setup lang="ts">
import { ref } from 'vue'
import { useCvStore } from '@/stores/cv.store.ts'
import { storeToRefs } from 'pinia'
import { createProfileInfo, updateProfileInfo } from '@/services/profile.service'

const cv = useCvStore()
const { summary, profile } = storeToRefs(cv)

const isEditing = ref(false)
const saving = ref(false)
const errorMessage = ref<string | null>(null)

function requireCvId(): number {
  const id = cv.currentCvId
  if (!id) throw new Error('Missing CV id (currentCvId is null)')
  return id
}

function hasExistingProfileInfo() {
  return Boolean(profile.value.first_name || profile.value.last_name || profile.value.email || profile.value.headline)
}

async function saveSummary() {
  saving.value = true
  errorMessage.value = null
  try {
    const cvId = requireCvId()

    const dto = {
      // on envoie juste summary, les autres champs peuvent rester undefined
      professionalSummary: summary.value.professional_summary || undefined
    }

    if (hasExistingProfileInfo()) {
      await updateProfileInfo(cvId, dto)
    } else {
      await createProfileInfo(cvId, dto)
    }

    await cv.loadCv(cvId)
    isEditing.value = false
  } catch (e: any) {
    console.error(e)
    errorMessage.value = e?.response?.data?.message || 'Failed to save summary'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="section-creation">
    <div v-if="!isEditing" class="section-creation-header" @click="isEditing = true">
      <div class="section-creation-icon-title">
        <i class="bi bi-person-fill"></i>
        <span>Profile</span>
      </div>
      <i class="bi bi-chevron-down"></i>
    </div>

    <div v-else class="edit-mode section-creation-content">
      <div class="d-flex justify-content-between">
        <h2>Edit Entry</h2>
        <button
          class="delete-btn"
          type="button"
          @click="(isEditing = false)"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <form class="edit-form" @submit.prevent="saveSummary">
        <label>Professional profile</label>
        <textarea
          v-model="summary.professional_summary"
          class="input-field input-creation"
          placeholder="Write a professional summary or objective statement..."
          rows="4"
        ></textarea>

        <button type="submit" class="btn-principale btn-creation" :disabled="saving">
          <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
          Done
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: #dc3545;
  margin-bottom: 10px;
}
</style>