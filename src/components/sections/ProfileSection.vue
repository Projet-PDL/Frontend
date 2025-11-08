<script setup>
import { ref } from 'vue'

const isEditing = ref(false)

const profile = ref({
  professional_summary: ''
})
</script>

<template>
  <div class="section-creation">
    <div v-if="!isEditing" class="section-creation-header">
      <div class="section-creation-icon-title">
        <i class="bi bi-person-fill"></i>
        <span>Profile</span>
      </div>
      <button class="chevron-btn" @click="isEditing = true">
        <i class="bi bi-chevron-down"></i>
      </button>
    </div>

    <div v-else class="edit-mode section-creation-content">
      <h2>Edit Entry</h2>

      <form class="edit-form" @submit.prevent="isEditing = false">
        <label>Professional profile</label>
        <textarea v-model="profile.professional_summary" class="input-field input-creation"
          placeholder="Write a professional summary or objective statement that highlights your key qualifications and career goals..." rows="4"
        ></textarea>

        <button type="submit" class="btn-principale btn-creation">Done</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.chevron-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}
</style>
