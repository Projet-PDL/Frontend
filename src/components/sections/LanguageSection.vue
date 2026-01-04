<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import {
  apiCreateLanguage,
  apiUpdateLanguage,
  apiDeleteLanguage
} from '@/services/language.service'
import { useCvStore } from '@/stores/cv.store.ts'

const cvStore = useCvStore()

const props = defineProps({
  isActive: Boolean
})

const emit = defineEmits(['open'])
const openSection = () => emit('open')

/* =====================
   Source = Store
===================== */
const languages = computed({
  get: () => cvStore.languages
})

/* =====================
   Levels
===================== */
const LEVEL_OPTIONS = [
  'Beginner',
  'Elementary',
  'Intermediate',
  'Upper-Intermediate',
  'Advanced',
  'Fluent',
  'Native'
] as const

const LEVEL_PERCENT: Record<string, number> = {
  Beginner: 15,
  Elementary: 30,
  Intermediate: 50,
  'Upper-Intermediate': 65,
  Advanced: 80,
  Fluent: 90,
  Native: 100
}

function getLevelPercent(level?: string) {
  if (!level) return 0
  return LEVEL_PERCENT[level] ?? 0
}

/* =====================
   UI state
===================== */
const isEditing = ref(false)
const editingIndex = ref<number | null>(null)

const tempLanguage = ref({
  language_name: '',
  proficiency_level: LEVEL_OPTIONS[0],
  position: null as number | null
})

/* =====================
   Helpers
===================== */
function requireCvId(): number {
  const id = cvStore.currentCvId
  if (!id) throw new Error('Missing CV id (currentCvId is null)')
  return id
}

const startAdd = () => {
  isEditing.value = true
  editingIndex.value = null
  tempLanguage.value = {
    language_name: '',
    proficiency_level: LEVEL_OPTIONS[0],
    position: languages.value.length + 1
  }
}

const startEdit = (index: number) => {
  editingIndex.value = index
  isEditing.value = true
  tempLanguage.value = { ...languages.value[index] }
  // fallback si ancien item n'a pas un level présent dans options
  if (!LEVEL_OPTIONS.includes(tempLanguage.value.proficiency_level as any)) {
    tempLanguage.value.proficiency_level = LEVEL_OPTIONS[0]
  }
}

/* =====================
   Save (POST/PUT)
===================== */
const saveLanguage = async () => {
  try {
    const cvId = requireCvId()

    const dto = {
      languageName: tempLanguage.value.language_name,
      proficiencyLevel: tempLanguage.value.proficiency_level,
      position:
        editingIndex.value !== null
          ? languages.value[editingIndex.value].position
          : languages.value.length + 1
    }

    if (editingIndex.value !== null) {
      const lang = languages.value[editingIndex.value]
      console.log( "Edit" , editingIndex.value )
      await apiUpdateLanguage(cvId, lang.id, dto)
      await cvStore.loadCv(cvId)
    } else {
      await apiCreateLanguage(cvId, dto)
      await cvStore.loadCv(cvId)
    }

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
  try {
    const cvId = requireCvId()
    const lang = languages.value[index]

    await apiDeleteLanguage(cvId, lang.id)

    // Option: juste reload (plus safe)
    await cvStore.loadCv(cvId)

    // fermer si on était en train d’éditer cette entrée
    if (editingIndex.value === index) {
      isEditing.value = false
      editingIndex.value = null
    }
  } catch (err) {
    console.error('Erreur suppression language', err)
  }
}

/* =====================
   Drag & drop
===================== */
const updatePositions = async () => {
  // tu peux garder ça local si tu ne persistes pas l’ordre côté backend
  languages.value.forEach((lang: any, i: number) => {
    lang.position = i + 1
  })
  // Si tu veux persister l’ordre, il faudra un endpoint bulk update positions
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
    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="languages" item-key="id" @end="updatePositions">
        <template #item="{ element, index }">
          <div class="section-item">
            <div class="left">
              <i class="bi bi-translate"></i>
              <div class="text">
                <div class="title-row">
                  <strong>{{ element.language_name }}</strong>
                  <span class="muted">({{ element.proficiency_level }})</span>
                </div>

                <!-- Progress bar -->
                <div class="level-bar">
                  <div
                    class="level-bar-fill"
                    :style="{ width: getLevelPercent(element.proficiency_level) + '%' }"
                  />
                </div>
              </div>
            </div>

            <!-- Actions right -->
            <div class="actions">
              <button class="icon-btn" type="button" title="Edit" @click.stop="startEdit(index)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="icon-btn danger" type="button" title="Delete" @click.stop="deleteLanguage(index)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
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
        <button class="icon-btn" type="button" @click="isEditing = false" >
          <i class="bi bi-x-lg"></i>
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

          <!-- SELECT -->
          <select v-model="tempLanguage.proficiency_level" class="input-field input-creation" required>
            <option v-for="opt in LEVEL_OPTIONS" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>

          <!-- Preview bar -->
          <div class="level-bar mt-2">
            <div
              class="level-bar-fill"
              :style="{ width: getLevelPercent(tempLanguage.proficiency_level) + '%' }"
            />
          </div>
        </div>

        <button type="submit" class="btn-principale btn-creation">Done</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.section-item{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:12px 12px;
  border-radius:10px;
  background:#fff;
  border:1px solid rgba(0,0,0,0.06);
  cursor: default;
  margin-bottom: 10px;
}

.left{
  display:flex;
  align-items:flex-start;
  gap:12px;
}

.text{
  display:flex;
  flex-direction:column;
  gap:8px;
}

.title-row{
  display:flex;
  gap:8px;
  align-items:baseline;
}

.muted{
  color:#7e7e7e;
  font-size: 0.9rem;
}

.actions{
  display:flex;
  gap:10px;
  align-items:center;
}

.icon-btn{
  border:none;
  background:transparent;
  padding:6px 8px;
  border-radius:8px;
  cursor:pointer;
}

.icon-btn:hover{
  background: rgba(15,98,164,0.08);
}

.icon-btn.danger:hover{
  background: rgba(220,53,69,0.10);
}

.level-bar{
  width: 220px;
  height: 8px;
  background: #e9ecef;
  border-radius: 20px;
  overflow: hidden;
}

.level-bar-fill{
  height: 100%;
  background: #0f62a4;
  border-radius: 20px;
}
</style>