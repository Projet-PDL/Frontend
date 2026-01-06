<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import { apiCreateSkills, apiDeleteSkill } from '@/services/skills.service'
import { useCvStore } from '@/stores/cv.store.ts'

const cvStore = useCvStore()

const props = defineProps({
  isActive: Boolean
})

const emit = defineEmits(['open'])
const openSection = () => emit('open')

const isEditing = ref(false)
const editingIndex = ref<number | null>(null)
const saving = ref(false)

const tempSkill = ref({
  skill_name: ''
})

function requireCvId(): number {
  const id = cvStore.currentCvId
  if (!id) throw new Error('Missing CV id (currentCvId is null)')
  return id
}

/**
 * Source = store (single source of truth)
 */
const skills = computed(() => cvStore.skills)

/**
 * Local working copy (because backend expects bulk POST)
 */
const working = ref<any[]>([])

function syncWorkingFromStore() {
  working.value = (skills.value || []).map((s: any) => ({
    id: s.id,
    skill_name: s.skill_name,
    position: s.position
  }))
}

const startAdd = () => {
  syncWorkingFromStore()
  isEditing.value = true
  editingIndex.value = null
  tempSkill.value = { skill_name: '' }
}

const startEdit = (index: number) => {
  syncWorkingFromStore()
  isEditing.value = true
  editingIndex.value = index
  tempSkill.value = { skill_name: working.value[index]?.skill_name ?? '' }
}

async function persistBulk(list: any[]) {
  const cvId = requireCvId()

  // recalc positions
  const items = list.map((s: any, i: number) => ({
    skillName: s.skill_name,
    position: i + 1
  }))

  await apiCreateSkills(cvId, { items })
  await cvStore.loadCv(cvId)
}

const saveSkill = async () => {
  saving.value = true
  try {
    // add or edit on working
    if (editingIndex.value !== null) {
      working.value[editingIndex.value] = {
        ...working.value[editingIndex.value],
        skill_name: tempSkill.value.skill_name
      }
    } else {
      working.value.push({
        skill_name: tempSkill.value.skill_name,
        position: working.value.length + 1
      })
    }

    await persistBulk(working.value)

    isEditing.value = false
    editingIndex.value = null
  } catch (err) {
    console.error('Erreur sauvegarde skill', err)
  } finally {
    saving.value = false
  }
}

const deleteSkill = async (index: number) => {
  saving.value = true
  try {
    const cvId = requireCvId()
    const s: any = skills.value[index]

    // if we have an id, delete server-side
    if (s?.id) {
      await apiDeleteSkill(cvId, Number(s.id))
      await cvStore.loadCv(cvId)
    } else {
      // fallback: bulk resave without this item
      syncWorkingFromStore()
      working.value.splice(index, 1)
      await persistBulk(working.value)
    }

    isEditing.value = false
    editingIndex.value = null
  } catch (err) {
    console.error('Erreur suppression skill', err)
  } finally {
    saving.value = false
  }
}

/**
 * Drag & drop: just update local store order visually,
 * then persist bulk (optional).
 */
const onDragEnd = async () => {
  try {
    // On veut persister l’ordre => bulk save
    // On repart de la liste courante (skills.value) qui est réordonnée par vuedraggable
    const list = (skills.value || []).map((s: any) => ({
      id: s.id,
      skill_name: s.skill_name,
      position: s.position
    }))
    await persistBulk(list)
  } catch (err) {
    console.error('Erreur réordonnancement skills', err)
  }
}
</script>

<template>
  <div class="section-creation">
    <!-- HEADER -->
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title">
        <i class="bi bi-cpu"></i>
        <span>Skills</span>
      </div>
      <i :class="['bi', isActive ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <!-- LIST -->
    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="cvStore.skills" item-key="id" @end="onDragEnd">
        <template #item="{ element, index }">
          <div class="section-item">
            <div class="left">
              <i class="bi bi-cpu"></i>
              <strong>{{ element.skill_name }}</strong>
            </div>

            <div class="actions">
              <button class="icon-btn danger" type="button" title="Delete" @click.stop="deleteSkill(index)">
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
        <h2>{{ editingIndex !== null ? 'Edit Skill' : 'Add Skill' }}</h2>
        <button
          class="delete-btn"
          type="button"
          @click="(isEditing = false)"
        >
          <i class="bi bi-x-lg"></i>
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