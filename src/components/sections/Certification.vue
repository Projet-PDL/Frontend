<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import { useCvStore } from '@/stores/cv.store.ts'
import {
  apiCreateCertification,
  apiUpdateCertification,
  apiDeleteCertification
} from '@/services/certification.service'

const cvStore = useCvStore()

const props = defineProps({
  isActive: Boolean
})

const emit = defineEmits(['open'])
const openSection = () => emit('open')

const isEditing = ref(false)
const editingIndex = ref<number | null>(null)
const saving = ref(false)

/** Source = store */
const certifications = computed(() => cvStore.certifications || [])

const tempCert = ref({
  id: null as number | null,
  name: '',
  issuer: '',
  issue_month: '',      // YYYY-MM
  expiration_month: '', // YYYY-MM
  credentialUrl: '',
  position: 1
})

function requireCvId(): number {
  const id = cvStore.currentCvId
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
  tempCert.value = {
    id: null,
    name: '',
    issuer: '',
    issue_month: '',
    expiration_month: '',
    credentialUrl: '',
    position: certifications.value.length + 1
  }
}

const startEdit = (index: number) => {
  isEditing.value = true
  editingIndex.value = index
  const c: any = certifications.value[index]
  tempCert.value = {
    id: c.id ?? null,
    name: c.name ?? '',
    issuer: c.issuer ?? '',
    issue_month: isoToMonth(c.issueDate ?? c.issue_date),
    expiration_month: isoToMonth(c.expirationDate ?? c.expiration_date),
    credentialUrl: c.credentialUrl ?? '',
    position: c.position ?? index + 1
  }
}

const saveCertification = async () => {
  saving.value = true
  try {
    const cvId = requireCvId()

    const dto = {
      name: tempCert.value.name,
      issuer: tempCert.value.issuer || undefined,
      issueDate: monthToISODate(tempCert.value.issue_month),
      expirationDate: monthToISODate(tempCert.value.expiration_month),
      credentialUrl: tempCert.value.credentialUrl || undefined,
      position:
        editingIndex.value !== null
          ? (certifications.value[editingIndex.value] as any).position
          : certifications.value.length + 1
    }

    if (editingIndex.value !== null) {
      const c: any = certifications.value[editingIndex.value]
      await apiUpdateCertification(cvId, Number(c.id), dto)
    } else {
      await apiCreateCertification(cvId, dto)
    }

    await cvStore.loadCv(cvId)
    isEditing.value = false
    editingIndex.value = null
  } catch (err) {
    console.error('Erreur sauvegarde certification', err)
  } finally {
    saving.value = false
  }
}

const deleteCertification = async (index: number) => {
  saving.value = true
  try {
    const cvId = requireCvId()
    const c: any = certifications.value[index]
    await apiDeleteCertification(cvId, Number(c.id))
    await cvStore.loadCv(cvId)

    isEditing.value = false
    editingIndex.value = null
  } catch (err) {
    console.error('Erreur suppression certification', err)
  } finally {
    saving.value = false
  }
}

const onDragEnd = async () => {
  // optionnel : si tu veux persister l'ordre, il faut une route dédiée "reorder"
  // ou refaire un bulk update (que tu n'as pas pour certifications).
  // Ici on ne persiste pas l'ordre côté backend sans endpoint.
}
</script>

<template>
  <div class="section-creation">
    <!-- HEADER -->
    <div v-if="!isEditing" class="section-creation-header" @click="openSection">
      <div class="section-creation-icon-title">
        <i class="bi bi-patch-check-fill"></i>
        <span>Certifications</span>
      </div>
      <i :class="['bi', isActive ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
    </div>

    <!-- LIST -->
    <div v-if="isActive && !isEditing" class="section-creation-content section-creation-content-open">
      <draggable v-model="cvStore.certifications" item-key="id" @end="onDragEnd">
        <template #item="{ element, index }">
          <div class="section-item">
            <div class="left">
              <i class="bi bi-patch-check"></i>
              <div class="text">
                <strong>{{ element.name || 'Certification' }}</strong>
                <span class="muted">{{ element.issuer || 'Issuer' }}</span>
              </div>
            </div>

            <div class="actions">
              <button class="icon-btn" type="button" title="Edit" @click.stop="startEdit(index)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="icon-btn danger" type="button" title="Delete" @click.stop="deleteCertification(index)">
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
        <h2>{{ editingIndex !== null ? 'Edit Certification' : 'Add Certification' }}</h2>
        <button
          class="delete-btn"
          type="button"
          @click="(isEditing = false)"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <form class="edit-form" @submit.prevent="saveCertification">
        <div class="form-row">
          <label>Name</label>
          <input v-model="tempCert.name" class="input-field input-creation" placeholder="e.g. AWS Solutions Architect" required />
        </div>

        <div class="form-row">
          <label>Issuer</label>
          <input v-model="tempCert.issuer" class="input-field input-creation" placeholder="e.g. Amazon Web Services" />
        </div>

        <div class="form-grid">
          <div>
            <label>Issue date</label>
            <input v-model="tempCert.issue_month" type="month" class="input-field input-creation" />
          </div>
          <div>
            <label>Expiration date</label>
            <input v-model="tempCert.expiration_month" type="month" class="input-field input-creation" />
          </div>
        </div>

        <div class="form-row">
          <label>Credential URL</label>
          <input v-model="tempCert.credentialUrl" class="input-field input-creation" placeholder="https://..." />
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