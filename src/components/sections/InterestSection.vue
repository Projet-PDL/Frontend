<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import {
  apiCreateInterests,
  apiUpdateInterests
} from '@/services/interests.service' 
import { useCvStore } from '@/stores/cv.store'

/* =====================
   Store & Props
===================== */

const cvStore = useCvStore()

const props = defineProps({
  isActive: Boolean,
  cvId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['open'])
const openSection = () => emit('open')

/* =====================
   State local
===================== */

const interests = ref<any[]>([])

const isEditing = ref(false)
const editingIndex = ref<number | null>(null)

const tempInterest = ref({
  name: '',
  category: '',
  position: null as number | null
})

/* =====================
   Sync depuis store
===================== */

watch(
  () => cvStore.cv,
  (cv) => {
    if (!cv?.interests) return

    interests.value = cv.interests.map((i: any) => ({
      id: i.id,
      name: i.name,
      category: i.category,
      position: i.position
    }))
  },
  { immediate: true }
)

/* =====================
   UI actions
===================== */

const startAdd = () => {
  isEditing.value = true
  editingIndex.value = null
  tempInterest.value = {
    name: '',
    category: '',
    position: interests.value.length + 1
  }
}

const startEdit = (index: number) => {
  editingIndex.value = index
  isEditing.value = true
  tempInterest.value = { ...interests.value[index] }
}

/* =====================
   Save (PUT bulk)
===================== */

const saveInterest = async () => {
  try {
    if (editingIndex.value !== null) {
      interests.value[editingIndex.value] = {
        ...interests.value[editingIndex.value],
        ...tempInterest.value
      }
    } else {
      interests.value.push({
        ...tempInterest.value,
        position: interests.value.length + 1
      })
    }

    await apiUpdateInterests(props.cvId, {
      items: interests.value.map((i, idx) => ({
        name: i.name,
        category: i.category,
        source: 'manual',
        position: idx + 1
      }))
    })

    cvStore.updateInterests(interests.value)

    isEditing.value = false
    editingIndex.value = null
  } catch (err) {
    console.error('Erreur sauvegarde interest', err)
  }
}

/* =====================
   Drag & drop
===================== */

const updatePositions = () => {
  interests.value.forEach((i, idx) => {
    i.position = idx + 1
  })
}
</script>

<template>
  <div class="section-creation">
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title">
        <i class="bi bi-stars"></i>
        <span>Interests</span>
      </div>
      <i :class="['bi', isActive ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="interests" item-key="position" @end="updatePositions">
        <template #item="{ element, index }">
          <div class="section-item" @click="startEdit(index)">
            <i class="bi bi-stars"></i>
            <strong>{{ element.name }}</strong>
          </div>
        </template>
      </draggable>

      <button class="btn-principale btn-creation" @click.stop="startAdd">
        <i class="bi bi-plus-lg"></i> Add entry
      </button>
    </div>

    <div v-if="isEditing" class="edit-mode section-creation-content">
      <div class="edit-header">
        <h2>{{ editingIndex !== null ? 'Edit Interest' : 'Add Interest' }}</h2>
        <button
          class="delete-btn"
          @click="editingIndex !== null ? (isEditing = false) : (isEditing = false)"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <form class="edit-form" @submit.prevent="saveInterest">
        <div class="form-row">
          <label>Name</label>
          <input
            v-model="tempInterest.name"
            class="input-field input-creation"
            placeholder="e.g. Photography"
            required
          />
        </div>

        <div class="form-row">
          <label>Category</label>
          <input
            v-model="tempInterest.category"
            class="input-field input-creation"
            placeholder="e.g. Art, Sports"
            required
          />
        </div>

        <button type="submit" class="btn-principale btn-creation">Done</button>
      </form>
    </div>
  </div>
</template>
