<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import {
  apiGetLanguages,
  apiCreateLanguage,
  apiUpdateLanguage,
  apiDeleteLanguage
} from '@/services/language.service'
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
   State local (EDITABLE)
===================== */

const languages = ref<any[]>([])

const isEditing = ref(false)
const editingIndex = ref<number | null>(null)

const tempLanguage = ref({
  language_name: '',
  proficiency_level: '',
  position: null as number | null
})

/* =====================
   Sync depuis le store
===================== */

watch(
  () => cvStore.cv,
  async (cv) => {
    if (!cv) return

    try {
      const res = await apiGetLanguages(props.cvId)

      languages.value = res.data.map((lang: any) => ({
        id: lang.id,
        language_name: lang.languageName,
        proficiency_level: lang.proficiencyLevel,
        position: lang.position
      }))
    } catch (err) {
      console.error('Erreur chargement languages', err)
    }
  },
  { immediate: true }
)

/* =====================
   Actions UI
===================== */

const startAdd = () => {
  isEditing.value = true
  editingIndex.value = null
  tempLanguage.value = {
    language_name: '',
    proficiency_level: '',
    position: languages.value.length + 1
  }
}

const startEdit = (index: number) => {
  editingIndex.value = index
  isEditing.value = true
  tempLanguage.value = { ...languages.value[index] }
}

/* =====================
   Save (POST / PUT)
===================== */

const saveLanguage = async () => {
  const dto = {
    languageName: tempLanguage.value.language_name,
    proficiencyLevel: tempLanguage.value.proficiency_level,
    position:
      editingIndex.value !== null
        ? languages.value[editingIndex.value].position
        : languages.value.length + 1
  }

  try {
    let saved

    if (editingIndex.value !== null) {
      const lang = languages.value[editingIndex.value]
      const res = await apiUpdateLanguage(props.cvId, lang.id, dto)
      saved = res.data
    } else {
      const res = await apiCreateLanguage(props.cvId, dto)
      saved = res.data
    }

    const mapped = {
      id: saved.id,
      language_name: saved.languageName,
      proficiency_level: saved.proficiencyLevel,
      position: saved.position
    }

    if (editingIndex.value !== null) {
      languages.value[editingIndex.value] = mapped
    } else {
      languages.value.push(mapped)
    }

    // sync store
    cvStore.updateLanguages(languages.value)

    isEditing.value = false
    editingIndex.value = null
  } catch (err) {
    console.error('Erreur sauvegarde language', err)
  }
}

/* =====================
   Delete
===================== */

const deleteLanguage = async (index: number) => {
  const lang = languages.value[index]

  try {
    await apiDeleteLanguage(props.cvId, lang.id)
    languages.value.splice(index, 1)
    updatePositions()
    cvStore.updateLanguages(languages.value)
    isEditing.value = false
  } catch (err) {
    console.error('Erreur suppression language', err)
  }
}

/* =====================
   Drag & drop
===================== */

const updatePositions = () => {
  languages.value.forEach((lang, i) => {
    lang.position = i + 1
  })
}
</script>

<template>
  <div class="section-creation">
    <!-- HEADER -->
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title">
        <i class="bi bi-translate"></i>
        <span>Languages</span>
      </div>
      <i :class="['bi', isActive ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <!-- LIST -->
    <div
      v-if="isActive && !isEditing"
      class="section-creation-content section-creation-content-open"
    >
      <draggable v-model="languages" item-key="id" @end="updatePositions">
        <template #item="{ element, index }">
          <div class="section-item" @click="startEdit(index)">
            <i class="bi bi-translate"></i>
            <strong>{{ element.language_name }}</strong>
            <span class="muted">({{ element.proficiency_level }})</span>
          </div>
        </template>
      </draggable>

      <button class="btn-principale btn-creation" @click.stop="startAdd">
        <i class="bi bi-plus-lg"></i> Add entry
      </button>
    </div>

    <!-- EDIT MODE -->
    <div v-if="isEditing" class="edit-mode section-creation-content">
      <div class="edit-header">
        <h2>{{ editingIndex !== null ? 'Edit Language' : 'Add Language' }}</h2>
        <button
          class="delete-btn"
          @click="editingIndex !== null ? deleteLanguage(editingIndex) : (isEditing = false)"
        >
          <i :class="editingIndex !== null ? 'bi bi-trash' : 'bi bi-x-lg'"></i>
        </button>
      </div>

      <form class="edit-form" @submit.prevent="saveLanguage">
        <div class="form-row">
          <label>Language</label>
          <input
            v-model="tempLanguage.language_name"
            class="input-field input-creation"
            placeholder="e.g. English"
            required
          />
        </div>

        <div class="form-row">
          <label>Proficiency level</label>
          <input
            v-model="tempLanguage.proficiency_level"
            class="input-field input-creation"
            placeholder="e.g. Fluent, Native, Beginner"
            required
          />
        </div>

        <button type="submit" class="btn-principale btn-creation">
          Done
        </button>
      </form>
    </div>
  </div>
</template>
