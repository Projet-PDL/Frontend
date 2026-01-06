<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import { useCvStore } from '@/stores/cv.store.ts'
import { storeToRefs } from 'pinia'
import {
  apiCreateEducation,
  apiUpdateEducation,
  apiDeleteEducation
} from '@/services/education.service'

const cv = useCvStore()
const { educations } = storeToRefs(cv)

const props = defineProps({ isActive: Boolean })
const emit = defineEmits(['open'])
const openSection = () => emit('open')

const isEditing = ref(false)
const editingIndex = ref<number | null>(null)
const saving = ref(false)

const tempEducation = ref({
  id: null as number | null,
  degree: '',
  school: '',
  start_date: '', // YYYY-MM
  end_date: '',   // YYYY-MM
  description: '',
  position: 1
})

function requireCvId(): number {
  const id = cv.currentCvId
  if (!id) throw new Error('Missing CV id (currentCvId is null)')
  return id
}

function monthToISODate(month: string): string | undefined {
  // "2026-01" -> "2026-01-01T00:00:00.000Z"
  if (!month) return undefined
  const [y, m] = month.split('-')
  if (!y || !m) return undefined
  const iso = new Date(Number(y), Number(m) - 1, 1).toISOString()
  return iso
}

function isoToMonth(iso?: string): string {
  // "2026-01-01T..." -> "2026-01"
  if (!iso) return ''
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

const startAdd = () => {
  isEditing.value = true
  editingIndex.value = null
  tempEducation.value = {
    id: null,
    degree: '',
    school: '',
    start_date: '',
    end_date: '',
    description: '',
    position: educations.value.length + 1
  }
}

const startEdit = (index: number) => {
  editingIndex.value = index
  isEditing.value = true
  const edu: any = educations.value[index]
  tempEducation.value = {
    id: edu.id ?? null,
    degree: edu.degree ?? '',
    school: edu.school ?? '',
    start_date: isoToMonth(edu.start_date ?? edu.startDate),
    end_date: isoToMonth(edu.end_date ?? edu.endDate),
    description: edu.description ?? '',
    position: edu.position ?? index + 1
  }
}

const saveEducation = async () => {
  saving.value = true
  try {
    const cvId = requireCvId()

    const dto = {
      degree: tempEducation.value.degree || undefined,
      school: tempEducation.value.school || undefined,
      startDate: monthToISODate(tempEducation.value.start_date),
      endDate: monthToISODate(tempEducation.value.end_date),
      description: tempEducation.value.description || undefined,
      position:
        editingIndex.value !== null
          ? (educations.value[editingIndex.value] as any).position
          : educations.value.length + 1
    }

    if (editingIndex.value !== null) {
      const edu: any = educations.value[editingIndex.value]
      const eduId = Number(edu.id)
      await apiUpdateEducation(cvId, eduId, dto)
    } else {
      await apiCreateEducation(cvId, dto)
    }

    await cv.loadCv(cvId)

    isEditing.value = false
    editingIndex.value = null
  } catch (err) {
    console.error('Erreur sauvegarde education', err)
  } finally {
    saving.value = false
  }
}

const deleteEducation = async (index: number) => {
  try {
    const cvId = requireCvId()
    const edu: any = educations.value[index]
    await apiDeleteEducation(cvId, Number(edu.id))
    await cv.loadCv(cvId)

    if (editingIndex.value === index) {
      isEditing.value = false
      editingIndex.value = null
    }
  } catch (err) {
    console.error('Erreur suppression education', err)
  }
}

const updatePositions = () => {
  educations.value.forEach((edu: any, i: number) => (edu.position = i + 1))
}
</script>

<template>
  <div class="section-creation">
    <!-- HEADER -->
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title">
        <i class="bi bi-mortarboard-fill"></i><span>Education</span>
      </div>
      <i :class="['bi', isActive ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <!-- LIST -->
    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="educations" @end="updatePositions" item-key="id">
        <template #item="{ element, index }">
          <div class="section-item">
            <div class="left">
              <i class="bi bi-mortarboard"></i>
              <div class="text">
                <strong>{{ element.degree || 'Degree' }}</strong>
                <span class="muted">{{ element.school || 'School' }}</span>
              </div>
            </div>

            <div class="actions">
              <button class="icon-btn" type="button" title="Edit" @click.stop="startEdit(index)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="icon-btn danger" type="button" title="Delete" @click.stop="deleteEducation(index)">
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

      <form class="edit-form" @submit.prevent="saveEducation">
        <div class="form-row">
          <label>Degree</label>
          <input v-model="tempEducation.degree" class="input-field input-creation" placeholder="e.g. Master MIAGE" />
        </div>

        <div class="form-row">
          <label>School</label>
          <input v-model="tempEducation.school" class="input-field input-creation" placeholder="e.g. Université de Rennes" />
        </div>

        <div class="form-grid">
          <div>
            <label>Start date</label>
            <input v-model="tempEducation.start_date" type="month" class="input-field input-creation" />
          </div>
          <div>
            <label>End date</label>
            <input v-model="tempEducation.end_date" type="month" class="input-field input-creation" />
          </div>
        </div>

        <div class="form-row">
          <label>Description</label>
          <textarea
            v-model="tempEducation.description"
            class="input-field input-creation"
            placeholder="e.g. Focused on IT project management..."
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