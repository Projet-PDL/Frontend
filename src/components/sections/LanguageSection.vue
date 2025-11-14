<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { useCvStore } from '@/stores/cv'
import { storeToRefs } from 'pinia'

const cv = useCvStore()
const { languages } = storeToRefs(cv)
const isOpen = ref(false)
const isEditing = ref(false)
const editingIndex = ref(null)

const tempLanguage = ref({
  language_name: '',
  proficiency_level: '',
  position: 1
})

const emit = defineEmits(['open'])
const openSection = () => emit('open')
defineProps({ isActive: Boolean })

const startAdd = () => {
  isEditing.value = true
  editingIndex.value = null
  tempLanguage.value = {
    language_name: '',
    proficiency_level: '',
    position: languages.value.length + 1
  }
}

const startEdit = (index) => {
  editingIndex.value = index
  isEditing.value = true
  tempLanguage.value = { ...languages.value[index] }
}

const deleteLanguage = (index) => {
  languages.value.splice(index, 1)
  updatePositions()
  isEditing.value = false
}

const saveLanguage = () => {
  if (editingIndex.value !== null)
    languages.value[editingIndex.value] = { ...tempLanguage.value }
  else
    languages.value.push({
      ...tempLanguage.value,
      position: languages.value.length + 1
    })

  updatePositions()
  isEditing.value = false
  editingIndex.value = null
}

const updatePositions = () => {
  languages.value.forEach((lang, i) => (lang.position = i + 1))
}
</script>

<template>
  <div class="section-creation">
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title"><i class="bi bi-translate"></i><span>Languages</span></div>
      <i :class="['bi', isOpen ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="languages" @end="updatePositions" :move="() => true" item-key="position">
        <template #item="{ element, index }">
          <div>
            <div class="section-item" @click="startEdit(index)">
              <i class="bi bi-translate"></i>
              <strong>{{ element.language_name }}</strong>
            </div>
          </div>
        </template>
      </draggable>

      <button class="btn-principale btn-creation" @click.stop="startAdd"><i class="bi bi-plus-lg"></i> Add entry</button>
    </div>

    <div v-if="isEditing" class="edit-mode section-creation-content">
      <div class="edit-header">
        <h2>{{ editingIndex !== null ? 'Edit Entry' : 'Add Entry' }}</h2>
        <button class="delete-btn" @click="editingIndex !== null ? deleteLanguage(editingIndex) : isEditing = false">
          <i :class="editingIndex !== null ? 'bi bi-trash' : 'bi bi-x-lg'"></i>
        </button>
      </div>

      <form class="edit-form" @submit.prevent="saveLanguage">
        <div class="form-row">
          <label>Language</label>
          <input v-model="tempLanguage.language_name" class="input-field input-creation" placeholder="e.g. English" />
        </div>
        <div class="form-row">
          <label>Proficiency level</label>
          <input v-model="tempLanguage.proficiency_level" class="input-field input-creation" placeholder="e.g. Fluent, Native, Beginner" />
        </div>
        <button type="submit" class="btn-principale btn-creation">Done</button>
      </form>
    </div>
  </div>
</template>
