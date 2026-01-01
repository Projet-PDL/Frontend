<script setup>
import { ref } from 'vue'
import { useCvStore } from '@/stores/cv'
import { storeToRefs } from 'pinia'

const cv = useCvStore()
const { summary } = storeToRefs(cv)
const isEditing = ref(false)

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
      <h2>Edit Entry</h2>

      <form class="edit-form" @submit.prevent="isEditing = false">
        <label>Professional profile</label>
        <textarea v-model="summary.professional_summary" class="input-field input-creation"
          placeholder="Write a professional summary or objective statement that highlights your key qualifications and career goals..." rows="4"
        ></textarea>

        <button type="submit" class="btn-principale btn-creation">Done</button>
      </form>
    </div>
  </div>
</template>
