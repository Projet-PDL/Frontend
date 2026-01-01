<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { useCvStore } from '@/stores/cv'
import { storeToRefs } from 'pinia'

const cv = useCvStore()
const { socialNetworks } = storeToRefs(cv)
const isEditing = ref(false)
const editingIndex = ref(null)

const tempNetwork = ref({
  platform: '',
  username: '',
  position: 1
})

const availablePlatforms = [
  'LinkedIn',
  'Facebook',
  'Twitter',
  'Instagram',
  'GitHub',
  'GitLab',
  'Dribbble',
  'Behance',
  'YouTube',
  'TikTok'
]

const emit = defineEmits(['open'])
defineProps({ isActive: Boolean })
const openSection = () => emit('open')

const startAdd = () => {
  isEditing.value = true
  editingIndex.value = null
  tempNetwork.value = {
    platform: '',
    username: '',
    position: socialNetworks.value.length + 1
    }
}

const startEdit = (index) => {
  editingIndex.value = index
  isEditing.value = true
  tempNetwork.value = {...socialNetworks.value[index] }
}

const deleteNetwork = (index) => {
  socialNetworks.value.splice(index, 1)
  updatePositions()
  isEditing.value = false
}

const saveNetwork = () => {
  if (editingIndex.value !== null)
    socialNetworks.value[editingIndex.value] = { ...tempNetwork.value }
  else
    socialNetworks.value.push({
      ...tempNetwork.value,
      position: socialNetworks.value.length + 1
    })

  updatePositions()
  isEditing.value = false
  editingIndex.value = null
}

const updatePositions = () => {
  socialNetworks.value.forEach((n, i) => (n.position = i + 1))
}
</script>

<template>
  <div class="section-creation">
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title"><i class="bi bi-globe2"></i><span>Social Networks</span></div>
      <i :class="['bi', isActive ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="socialNetworks" @end="updatePositions" item-key="position">
        <template #item="{ element, index }">
          <div>
            <div class="section-item" @click="startEdit(index)">
              <i class="bi bi-globe2"></i><strong>{{ element.username }}</strong>{{ element.platform }}
            </div>
          </div>
        </template>
      </draggable>
      <button class="btn-principale btn-creation" @click.stop="startAdd"><i class="bi bi-plus-lg"></i> Add entry</button>
    </div>

    <div v-if="isEditing" class="edit-mode section-creation-content">
      <div class="edit-header">
        <h2>{{ editingIndex !== null ? 'Edit Entry' : 'Add Entry' }}</h2>
        <button class="delete-btn" @click="editingIndex !== null ? deleteNetwork(editingIndex) : isEditing = false">
          <i :class="editingIndex !== null ? 'bi bi-trash' : 'bi bi-x-lg'"></i>
        </button>
      </div>
      <form class="edit-form" @submit.prevent="saveNetwork">
        <div class="form-row">
          <label>Platform</label>
          <select v-model="tempNetwork.platform" class="input-field input-creation">
            <option disabled value="">Select a platform</option>
            <option v-for="(p, idx) in availablePlatforms" :key="idx" :value="p">{{ p }}</option>
          </select>
        </div>
        <div class="form-row">
          <label>Username / URL</label>
          <input v-model="tempNetwork.username" class="input-field input-creation" placeholder="e.g. @noelismane or linkedin.com/in/noelismane" />
        </div>
        <button type="submit" class="btn-principale btn-creation">Done</button>
      </form>
    </div>
  </div>
</template>
