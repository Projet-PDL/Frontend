<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import {
  apiCreateSkills,
  apiDeleteSkill
} from '@/services/skills.service'
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

const skills = ref<any[]>([])

const isEditing = ref(false)
const editingIndex = ref<number | null>(null)

const tempSkill = ref({
  skill_name: '',
  position: null as number | null
})

/* =====================
   Sync depuis store
===================== */

watch(
  () => cvStore.cv,
  (cv) => {
    if (!cv?.skills) return

    skills.value = cv.skills.map((s: any) => ({
      id: s.id,
      skill_name: s.skillName,
      position: s.position
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
  tempSkill.value = {
    skill_name: '',
    position: skills.value.length + 1
  }
}

const startEdit = (index: number) => {
  editingIndex.value = index
  isEditing.value = true
  tempSkill.value = { ...skills.value[index] }
}

/* =====================
   Save (POST bulk)
===================== */

const saveSkill = async () => {
  try {
    if (editingIndex.value !== null) {
      skills.value[editingIndex.value] = {
        ...skills.value[editingIndex.value],
        skill_name: tempSkill.value.skill_name
      }
    } else {
      skills.value.push({
        skill_name: tempSkill.value.skill_name,
        position: skills.value.length + 1
      })
    }

    await apiCreateSkills(props.cvId, {
      items: skills.value.map((s, i) => ({
        skillName: s.skill_name,
        position: i + 1
      }))
    })

    cvStore.updateSkills(skills.value)

    isEditing.value = false
    editingIndex.value = null
  } catch (err) {
    console.error('Erreur sauvegarde skill', err)
  }
}

/* =====================
   Delete
===================== */

const deleteSkill = async (index: number) => {
  const skill = skills.value[index]

  try {
    if (skill.id) {
      await apiDeleteSkill(props.cvId, skill.id)
    }

    skills.value.splice(index, 1)
    updatePositions()
    cvStore.updateSkills(skills.value)
    isEditing.value = false
  } catch (err) {
    console.error('Erreur suppression skill', err)
  }
}

/* =====================
   Drag & drop
===================== */

const updatePositions = () => {
  skills.value.forEach((s, i) => {
    s.position = i + 1
  })
}
</script>

<template>
  <div class="section-creation">
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title">
        <i class="bi bi-cpu"></i>
        <span>Skills</span>
      </div>
      <i :class="['bi', isActive ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="skills" item-key="position" @end="updatePositions">
        <template #item="{ element, index }">
          <div class="section-item" @click="startEdit(index)">
            <i class="bi bi-cpu"></i>
            <strong>{{ element.skill_name }}</strong>
          </div>
        </template>
      </draggable>

      <button class="btn-principale btn-creation" @click.stop="startAdd">
        <i class="bi bi-plus-lg"></i> Add entry
      </button>
    </div>

    <div v-if="isEditing" class="edit-mode section-creation-content">
      <div class="edit-header">
        <h2>{{ editingIndex !== null ? 'Edit Skill' : 'Add Skill' }}</h2>
        <button
          class="delete-btn"
          @click="editingIndex !== null ? deleteSkill(editingIndex) : (isEditing = false)"
        >
          <i :class="editingIndex !== null ? 'bi bi-trash' : 'bi bi-x-lg'"></i>
        </button>
      </div>

      <form class="edit-form" @submit.prevent="saveSkill">
        <div class="form-row">
          <label>Skill</label>
          <input
            v-model="tempSkill.skill_name"
            class="input-field input-creation"
            placeholder="e.g. Vue.js"
            required
          />
        </div>

        <button type="submit" class="btn-principale btn-creation">Done</button>
      </form>
    </div>
  </div>
</template>
