<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import { useCvStore } from '@/stores/cv.store.ts'
import { apiCreateInterests, apiUpdateInterests, apiDeleteInterest } from '@/services/interests.service'

const cvStore = useCvStore()

const props = defineProps({
  isActive: Boolean
})

const emit = defineEmits(['open'])
const openSection = () => emit('open')

/* =====================
   Source = Store
===================== */
const interests = computed(() => cvStore.interests)

/* =====================
   UI state
===================== */
const isEditing = ref(false)
const editingIndex = ref<number | null>(null)
const saving = ref(false)

const tempInterest = ref({
  name: '',
  category: ''
})

function requireCvId(): number {
  const id = cvStore.currentCvId
  if (!id) throw new Error('Missing CV id (currentCvId is null)')
  return id
}

function startAdd() {
  isEditing.value = true
  editingIndex.value = null
  tempInterest.value = { name: '', category: '' }
}

function startEdit(index: number) {
  editingIndex.value = index
  isEditing.value = true
  const it = interests.value[index]
  tempInterest.value = { name: it.name ?? '', category: it.category ?? '' }
}

function normalizePositions(list: any[]) {
  list.forEach((it, idx) => (it.position = idx + 1))
}

/** Persist order / edit via PUT bulk */
async function persistBulk(list: any[]) {
  const cvId = requireCvId()
  normalizePositions(list)

  await apiUpdateInterests(cvId, {
    items: list.map((i, idx) => ({
      name: i.name,
      category: i.category,
      source: i.source ?? 'manual',
      position: idx + 1
    }))
  })

  await cvStore.loadCv(cvId)
}

/* =====================
   Save Add / Edit
===================== */
async function saveInterest() {
  saving.value = true
  try {
    const cvId = requireCvId()

    // ADD => POST (1 item)
    if (editingIndex.value === null) {
      const position = interests.value.length + 1
      await apiCreateInterests(cvId, {
        items: [
          {
            name: tempInterest.value.name,
            category: tempInterest.value.category,
            source: 'manual',
            position
          }
        ]
      })
      await cvStore.loadCv(cvId)
    }
    // EDIT => PUT bulk (replace content + keep order)
    else {
      const next = interests.value.map((x: any) => ({ ...x }))
      next[editingIndex.value] = {
        ...next[editingIndex.value],
        name: tempInterest.value.name,
        category: tempInterest.value.category
      }
      await persistBulk(next)
    }

    isEditing.value = false
    editingIndex.value = null
  } catch (err) {
    console.error('Erreur sauvegarde interest', err)
  } finally {
    saving.value = false
  }
}

/* =====================
   Delete (individual)
===================== */
async function deleteInterest(index: number) {
  saving.value = true
  try {
    const cvId = requireCvId()
    const it = interests.value[index]

    if (!it?.id) throw new Error('Missing interest id')

    await apiDeleteInterest(cvId, it.id)

    // après delete, on réordonne les positions via PUT bulk
    const next = interests.value
      .filter((_, idx) => idx !== index)
      .map((x: any) => ({ ...x }))

    await persistBulk(next)

    isEditing.value = false
    editingIndex.value = null
  } catch (err) {
    console.error('Erreur suppression interest', err)
  } finally {
    saving.value = false
  }
}

/* =====================
   Drag & drop => PUT bulk
===================== */
async function onDragEnd() {
  try {
    const next = interests.value.map((x: any) => ({ ...x }))
    await persistBulk(next)
  } catch (err) {
    console.error('Erreur reorder interests', err)
  }
}
</script>

<template>
  <div class="section-creation">
    <!-- HEADER -->
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title">
        <i class="bi bi-stars"></i>
        <span>Interests</span>
      </div>
      <i :class="['bi', isActive ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <!-- LIST -->
    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="cvStore.interests" item-key="id" @end="onDragEnd">
        <template #item="{ element, index }">
          <div class="section-item">
            <div class="left" @click="startEdit(index)">
              <i class="bi bi-stars"></i>
              <div class="text">
                <strong>{{ element.name || 'Interest' }}</strong>
                <span class="muted">{{ element.category || 'Category' }}</span>
              </div>
            </div>

            <div class="actions">
              <button class="icon-btn" type="button" title="Edit" @click.stop="startEdit(index)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="icon-btn danger" type="button" title="Delete" @click.stop="deleteInterest(index)">
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
        <h2>{{ editingIndex !== null ? 'Edit Interest' : 'Add Interest' }}</h2>
        <button class="delete-btn" type="button" @click="isEditing = false">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <form class="edit-form" @submit.prevent="saveInterest">
        <div class="form-row">
          <label>Name</label>
          <input v-model="tempInterest.name" class="input-field input-creation" required />
        </div>

        <div class="form-row">
          <label>Category</label>
          <input v-model="tempInterest.category" class="input-field input-creation" required />
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
  flex:1;
  cursor:pointer;
}

.text{
  display:flex;
  flex-direction:column;
  line-height:1.2;
}

.muted{
  color:#7e7e7e;
  font-size:0.9rem;
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