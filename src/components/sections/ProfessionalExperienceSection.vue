<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { useCvStore } from '@/stores/cv.store.ts'
import { storeToRefs } from 'pinia'
import {
  apiCreateExperience,
  apiUpdateExperience,
  apiDeleteExperience
} from '@/services/experience.service'

const cv = useCvStore()
const { experiences } = storeToRefs(cv)

const props = defineProps({ isActive: Boolean })
const emit = defineEmits(['open'])
const openSection = () => emit('open')

const isEditing = ref(false)
const editingIndex = ref<number | null>(null)
const saving = ref(false)

const tempExperience = ref({
  id: null as number | null,
  title: '',
  company: '',
  location: '',
  start_date: '', // YYYY-MM
  end_date: '',   // YYYY-MM
  is_current: false,
  description: '',
  position: 1
})

function requireCvId(): number {
  const id = cv.currentCvId
  if (!id) throw new Error('Missing CV id (currentCvId is null)')
  return id
}

function monthToISODate(month: string): string | undefined {
  if (!month) return undefined
  const [y, m] = month.split('-')
  if (!y || !m) return undefined
  return new Date(Number(y), Number(m) - 1, 1).toISOString()
}

function isoToMonth(iso?: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

const startAdd = () => {
  isEditing.value = true
  editingIndex.value = null
  tempExperience.value = {
    id: null,
    title: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    position: experiences.value.length + 1
  }
}

const startEdit = (index: number) => {
  editingIndex.value = index
  isEditing.value = true
  const exp: any = experiences.value[index]
  tempExperience.value = {
    id: exp.id ?? null,
    title: exp.title ?? '',
    company: exp.company ?? '',
    location: exp.location ?? '',
    start_date: isoToMonth(exp.start_date ?? exp.startDate),
    end_date: isoToMonth(exp.end_date ?? exp.endDate),
    is_current: Boolean(exp.is_current ?? exp.isCurrent ?? false),
    description: exp.description ?? '',
    position: exp.position ?? index + 1
  }
}

const saveExperience = async () => {
  saving.value = true
  try {
    const cvId = requireCvId()

    const dto = {
      title: tempExperience.value.title || undefined,
      company: tempExperience.value.company || undefined,
      location: tempExperience.value.location || undefined,
      startDate: monthToISODate(tempExperience.value.start_date),
      endDate: tempExperience.value.is_current ? undefined : monthToISODate(tempExperience.value.end_date),
      isCurrent: tempExperience.value.is_current,
      description: tempExperience.value.description || undefined,
      position:
        editingIndex.value !== null
          ? (experiences.value[editingIndex.value] as any).position
          : experiences.value.length + 1
    }

    if (editingIndex.value !== null) {
      const exp: any = experiences.value[editingIndex.value]
      await apiUpdateExperience(cvId, Number(exp.id), dto)
    } else {
      await apiCreateExperience(cvId, dto)
    }

    await cv.loadCv(cvId)

    isEditing.value = false
    editingIndex.value = null
  } catch (err) {
    console.error('Erreur sauvegarde experience', err)
  } finally {
    saving.value = false
  }
}

const deleteExperience = async (index: number) => {
  try {
    const cvId = requireCvId()
    const exp: any = experiences.value[index]
    await apiDeleteExperience(cvId, Number(exp.id))
    await cv.loadCv(cvId)

    if (editingIndex.value === index) {
      isEditing.value = false
      editingIndex.value = null
    }
  } catch (err) {
    console.error('Erreur suppression experience', err)
  }
}

const updatePositions = () => {
  // local only (si tu ne persistes pas l'ordre)
  experiences.value.forEach((exp: any, i: number) => (exp.position = i + 1))
}
</script>

<template>
  <div class="section-creation">
    <!-- HEADER -->
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title">
        <i class="bi bi-briefcase-fill"></i><span>Professional Experience</span>
      </div>
      <i :class="['bi', isActive ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <!-- LIST -->
    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="experiences" @end="updatePositions" item-key="id">
        <template #item="{ element, index }">
          <div class="section-item">
            <div class="left">
              <i class="bi bi-briefcase"></i>
              <div class="text">
                <strong>{{ element.title || 'Title' }}</strong>
                <span class="muted">{{ element.company || 'Company' }}</span>
              </div>
            </div>

            <div class="actions">
              <button class="icon-btn" type="button" title="Edit" @click.stop="startEdit(index)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="icon-btn danger" type="button" title="Delete" @click.stop="deleteExperience(index)">
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
        <h2>{{ editingIndex !== null ? 'Edit Entry' : 'Add Entry' }}</h2>
        <button
          class="delete-btn"
          type="button"
          @click="(isEditing = false)"
        >
          <i class="bi bi-x-lg"></i>
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
            <input v-model="tempExperience.company" class="input-field input-creation" placeholder="e.g. LinkedIn2CV" />
          </div>
          <div>
            <label>Location</label>
            <input v-model="tempExperience.location" class="input-field input-creation" placeholder="e.g. Rennes, France" />
          </div>
        </div>

        <div class="form-grid">
          <div>
            <label>Start date</label>
            <input v-model="tempExperience.start_date" type="month" class="input-field input-creation" />
          </div>
          <div>
            <label>End date</label>
            <input
              v-model="tempExperience.end_date"
              type="month"
              class="input-field input-creation"
              :disabled="tempExperience.is_current"
            />
          </div>
        </div>

<!--        <div class="form-row" style="display:flex; align-items:center; gap:10px;">-->
<!--          <input id="isCurrent" type="checkbox" v-model="tempExperience.is_current" />-->
<!--          <label for="isCurrent" style="margin:0;">I currently work here</label>-->
<!--        </div>-->

        <div class="form-row">
          <label>Description</label>
          <textarea
            v-model="tempExperience.description"
            class="input-field input-creation"
            placeholder="e.g. Worked on web application development..."
            rows="4"
          ></textarea>
        </div>

        <button type="submit" class="btn-principale btn-creation" :disabled="saving">
          <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
          Done
        </button>
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
  margin-bottom:10px;
}

.left{
  display:flex;
  align-items:center;
  gap:12px;
}

.text{
  display:flex;
  flex-direction:column;
  line-height: 1.2;
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
</style>