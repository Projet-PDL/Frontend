<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const isEditing = ref(false)
const editingIndex = ref(null)

const skills = ref([])

const tempSkill = ref({
  skill_name: '',
  skill_description: '',
  position: null
})

const emit = defineEmits(['open'])
defineProps({ isActive: Boolean })
const openSection = () => emit('open')

const startAdd = () => {
  isEditing.value = true
  editingIndex.value = null
  tempSkill.value = { skill_name: '', skill_description: '', position: skills.value.length + 1 }
}

const startEdit = (index) => {
  editingIndex.value = index
  isEditing.value = true
  tempSkill.value = { ...skills.value[index] }
}

const deleteSkill = (index) => {
  skills.value.splice(index, 1)
  skills.value.forEach((s, i) => (s.position = i + 1))
  isEditing.value = false
}

const saveSkill = () => {
  if (editingIndex.value !== null)
    skills.value[editingIndex.value] = { ...tempSkill.value }
  else
    skills.value.push({ ...tempSkill.value, position: skills.value.length + 1 })

  isEditing.value = false
  editingIndex.value = null
}

const updatePositions = () => {
  skills.value.forEach((s, i) => (s.position = i + 1))
}
</script>

<template>
  <div class="section-creation">
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title"><i class="bi bi-cpu"></i><span>Skills</span></div>
      <i :class="['bi', isActive ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="skills" @end="updatePositions" item-key="position">
        <template #item="{ element, index }">
          <div>
            <div class="section-item" @click="startEdit(index)">
              <i class="bi bi-cpu"></i><strong>{{ element.skill_name }}</strong>
            </div>
          </div>
        </template>
      </draggable>
      <button class="btn-principale btn-creation" @click.stop="startAdd"><i class="bi bi-plus-lg"></i> Add entry</button>
    </div>

    <div v-if="isEditing" class="edit-mode section-creation-content">
      <div class="edit-header">
        <h2>{{ editingIndex !== null ? 'Edit Entry' : 'Add Entry' }}</h2>
        <button class="delete-btn" @click="editingIndex !== null ? deleteSkill(editingIndex) : isEditing = false">
          <i :class="editingIndex !== null ? 'bi bi-trash' : 'bi bi-x-lg'"></i>
        </button>
      </div>

      <form class="edit-form" @submit.prevent="saveSkill">
        <div class="form-row">
          <label>Skill</label>
          <input v-model="tempSkill.skill_name" class="input-field input-creation" placeholder="e.g. Web Front-End" />
        </div>
        <div class="form-row">
          <label>Description</label>
          <textarea v-model="tempSkill.skill_description" class="input-field input-creation" placeholder="e.g. HTML5, JavaScript, Figma" rows="4"></textarea>
        </div>
        <button type="submit" class="btn-principale btn-creation">Done</button>
      </form>
    </div>
  </div>
</template>
