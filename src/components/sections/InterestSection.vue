<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const isOpen = ref(false)
const isEditing = ref(false)
const editingIndex = ref(null)

const interests = ref([])

const tempInterest = ref({
  name: '',
  category: '',
  position: null
})

const emit = defineEmits(['open'])
const openSection = () => emit('open')
defineProps({ isActive: Boolean })

const startAdd = () => {
  isEditing.value = true
  editingIndex.value = null
  tempInterest.value = { name: '', category: '', position: interests.value.length + 1 }
}

const startEdit = (index) => {
  editingIndex.value = index
  isEditing.value = true
  tempInterest.value = { ...interests.value[index] }
}

const deleteInterest = (index) => {
  interests.value.splice(index, 1)
  interests.value.forEach((interest, i) => (interest.position = i + 1))
  isEditing.value = false
}

const saveInterest = () => {
  if (editingIndex.value !== null)
    interests.value[editingIndex.value] = { ...tempInterest.value }
  else
    interests.value.push({ ...tempInterest.value, position: interests.value.length + 1 })

  isEditing.value = false
  editingIndex.value = null
}

const updatePositions = () => {
  interests.value.forEach((interest, i) => (interest.position = i + 1))
}
</script>

<template>
  <div class="section-creation">
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title"><i class="bi bi-stars"></i><span>Interests</span></div>
      <i :class="['bi', isOpen ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="interests" @end="updatePositions" item-key="position">
        <template #item="{ element, index }">
          <div>
            <div class="section-item" @click="startEdit(index)">
              <i class="bi bi-stars"></i><strong>{{ element.name }}</strong>
            </div>
          </div>
        </template>
      </draggable>
      <button class="btn-principale btn-creation" @click.stop="startAdd"><i class="bi bi-plus-lg"></i> Add entry</button>
    </div>

    <div v-if="isEditing" class="edit-mode section-creation-content">
      <div class="edit-header">
        <h2>{{ editingIndex !== null ? 'Edit Entry' : 'Add Entry' }}</h2>
        <button class="delete-btn" @click="editingIndex !== null ? deleteInterest(editingIndex) : isEditing = false">
          <i :class="editingIndex !== null ? 'bi bi-trash' : 'bi bi-x-lg'"></i>
        </button>
      </div>

      <form class="edit-form" @submit.prevent="saveInterest">
        <div class="form-row">
          <label>Name</label>
          <input v-model="tempInterest.name" class="input-field input-creation" placeholder="e.g. Photography, Traveling, Reading" />
        </div>
        <div class="form-row">
          <label>Category</label>
          <input v-model="tempInterest.category" class="input-field input-creation" placeholder="e.g. Art, Sports, Culture" />
        </div>
        <button type="submit" class="btn-principale btn-creation">Done</button>
      </form>
    </div>
  </div>
</template>
