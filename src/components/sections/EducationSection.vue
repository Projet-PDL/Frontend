<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { useCvStore } from '@/stores/cv'
import { storeToRefs } from 'pinia'

const cv = useCvStore()
const { educations } = storeToRefs(cv)
const isOpen = ref(false)
const isEditing = ref(false)
const editingIndex = ref(null)

const tempEducation = ref({
  degree: '',
  school: '',
  start_date: '',
  end_date: '',
  description: '',
  position: 1
})

const emit = defineEmits(['open'])
const openSection = () => emit('open')
defineProps({ isActive: Boolean })

const startAdd = () => {
  isEditing.value = true
  editingIndex.value = null
  tempEducation.value = {
    degree: '',
    school: '',
    start_date: '',
    end_date: '',
    description: '',
    position: educations.value.length + 1
  }
}

const startEdit = (index) => {
  editingIndex.value = index
  isEditing.value = true
  tempEducation.value = { ...educations.value[index] }
}

const deleteEducation = (index) => {
  educations.value.splice(index, 1)
  updatePositions()
  isEditing.value = false
}

const saveEducation = () => {
  if (editingIndex.value !== null) {
    educations.value[editingIndex.value] = { ...tempEducation.value }
  } else {
    educations.value.push({
      ...tempEducation.value,
      position: educations.value.length + 1
    })
  }

  updatePositions()
  isEditing.value = false
  editingIndex.value = null
}

const updatePositions = () => {
  educations.value.forEach((edu, i) => edu.position = i + 1)
}
</script>

<template>
  <div class="section-creation">
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title"><i class="bi bi-mortarboard-fill"></i><span>Education</span></div>
      <i :class="['bi', isOpen ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>
    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="educations" @end="updatePositions" item-key="position">
        <template #item="{ element, index }">
          <div>
            <div class="section-item" @click="startEdit(index)">
              <i class="bi bi-mortarboard"></i>
              <strong>{{ element.degree }}</strong>{{ element.school }}
            </div>
          </div>
        </template>
      </draggable>
      <button class="btn-principale btn-creation" @click.stop="startAdd"><i class="bi bi-plus-lg"></i> Add entry</button>
    </div>

    <div v-if="isEditing" class="edit-mode section-creation-content">
      <div class="edit-header">
        <h2>{{ editingIndex !== null ? 'Edit Entry' : 'Add Entry' }}</h2>
        <button class="delete-btn" @click="editingIndex !== null ? deleteEducation(editingIndex) : isEditing = false">
          <i :class="editingIndex !== null ? 'bi bi-trash' : 'bi bi-x-lg'"></i>
        </button>
      </div>

      <form class="edit-form" @submit.prevent="saveEducation">
        <div class="form-row">
          <label>Degree</label>
          <input v-model="tempEducation.degree" class="input-field input-creation" placeholder="e.g. Master MIAGE" />
        </div>
        <div class="form-row">
          <label>School</label>
          <input v-model="tempEducation.school" class="input-field input-creation" placeholder="e.g. Université de Rennes"/>
        </div>
        <div class="form-grid">
          <div>
            <label>Start date</label>
            <input v-model="tempEducation.start_date" type="month" class="input-field input-creation"/>
          </div>
          <div>
            <label>End date</label>
            <input v-model="tempEducation.end_date" type="month" class="input-field input-creation"/>
          </div>
        </div>
        <div class="form-row">
          <label>Description</label>
          <textarea v-model="tempEducation.description" class="input-field input-creation" placeholder="e.g. Focused on IT project management, data analysis and software development" rows="4"></textarea>
        </div>
        <button type="submit" class="btn-principale btn-creation ">Done</button>
      </form>
    </div>
  </div>
</template>