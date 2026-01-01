<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { useCvStore } from '@/stores/cv'
import { storeToRefs } from 'pinia'

const cv = useCvStore()
const { experiences } = storeToRefs(cv)
const isEditing = ref(false)
const editingIndex = ref(null)

const tempExperience = ref({
  title: '',
  company: '',
  location: '',
  start_date: '',
  end_date: '',
  description: '',
  position: 1
})

const emit = defineEmits(['open'])
defineProps({ isActive: Boolean })

const openSection = () => emit('open')

const startAdd = () => {
  isEditing.value = true
  editingIndex.value = null
  tempExperience.value = {
    title: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    description: '',
    position: experiences.value.length + 1
  }
}

const startEdit = (index) => {
  editingIndex.value = index
  isEditing.value = true
  tempExperience.value = { ...experiences.value[index] }
}

const deleteExperience = (index) => {
  experiences.value.splice(index, 1)
  updatePositions()
  isEditing.value = false
}

const saveExperience = () => {
  if (editingIndex.value !== null)
    experiences.value[editingIndex.value] = { ...tempExperience.value }
  else
    experiences.value.push({ 
      ...tempExperience.value,
      position: experiences.value.length + 1 
    })

  updatePositions()
  isEditing.value = false
  editingIndex.value = null
}

const updatePositions = () => {
  experiences.value.forEach((exp, i) => (exp.position = i + 1))
}
</script>

<template>
  <div class="section-creation">
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title"><i class="bi bi-briefcase-fill"></i><span>Professional Experience</span></div>
      <i :class="['bi', isActive ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="experiences" @end="updatePositions" item-key="position">
        <template #item="{ element, index }">
          <div>
            <div class="section-item" @click="startEdit(index)">
              <i class="bi bi-briefcase"></i>
              <strong>{{ element.title }}</strong>{{ element.company }}
            </div>
          </div>
        </template>
      </draggable>

      <button class="btn-principale btn-creation" @click.stop="startAdd"><i class="bi bi-plus-lg"></i> Add entry</button>
    </div>

    <div v-if="isEditing" class="edit-mode section-creation-content">
      <div class="edit-header">
        <h2>{{ editingIndex !== null ? 'Edit Entry' : 'Add Entry' }}</h2>
        <button class="delete-btn" @click="editingIndex !== null ? deleteExperience(editingIndex) : isEditing = false">
          <i :class="editingIndex !== null ? 'bi bi-trash' : 'bi bi-x-lg'"></i>
        </button>
      </div>

      <form class="edit-form" @submit.prevent="saveExperience">
        <div class="form-row">
          <label>Title</label>
          <input v-model="tempExperience.title" class="input-field input-creation" placeholder="e.g. Software Engineer" />
        </div>
        <div class="form-grid">
          <div>
            <label>Company</label>
            <input v-model="tempExperience.company" class="input-field input-creation" placeholder="e.g. Linkedin2CV"/>
          </div>
          <div>
            <label>Location</label>
            <input v-model="tempExperience.location" class="input-field input-creation" placeholder="e.g. Rennes, France"/>
          </div>
        </div>
        <div class="form-grid">
          <div>
            <label>Start date</label>
            <input v-model="tempExperience.start_date" type="month" class="input-field input-creation"/>
          </div>
          <div>
            <label>End date</label>
            <input v-model="tempExperience.end_date" type="month" class="input-field input-creation"/>
          </div>
        </div>
        <div class="form-row">
          <label>Description</label>
          <textarea v-model="tempExperience.description" class="input-field input-creation" placeholder="e.g. Worked on web application development and system integration using Vue.js and Node.js" rows="4"></textarea>
        </div>
        <button type="submit" class="btn-principale btn-creation">Done</button>
      </form>
    </div>
  </div>
</template>