<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useCvStore } from '@/stores/cv.store.ts'
import { createProfileInfo, updateProfileInfo, type ProfileDTO } from '@/services/profile.service'
import { useAuthStore } from '@/stores/auth.store.ts'
import { apiGetMyImage, apiUploadMyImage } from '@/services/user-image.service.ts'

const cvStore = useCvStore()
const isEditing = ref(false)
const saving = ref(false)
const errorMessage = ref<string | null>(null)

const auth = useAuthStore()

const photoPreview = ref<string>('') // preview locale
const photoUrl = computed(
  () => photoPreview.value || cvStore.userProfilePicture || auth.user?.profilePicture || '',
)

function requireCvId(): number {
  const id = cvStore.currentCvId
  if (!id) throw new Error('Missing CV id (currentCvId is null)')
  return id
}

/**
 * Draft = copie des données du store pour édition
 * (on évite de modifier le store tant qu'on n'a pas sauvegardé)
 */
const draft = ref({
  first_name: '',
  last_name: '',
  headline: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  postal_code: '',
  region: '',
  country: '',
  website_url: '',
  birth_date: '',
  availability: '',
})

watch(
  () => cvStore.profile,
  (p) => {
    if (!p) return
    draft.value = {
      ...draft.value,
      ...p,
    }
  },
  { immediate: true, deep: true },
)

watch(
  () => cvStore.userProfilePicture,
  (v) => {
    // si on a déjà un preview local on ne remplace pas
    if (!photoPreview.value && v) photoPreview.value = ''
  },
)

async function loadMyPhoto() {
  try {
    const res = await apiGetMyImage()
    const url = res?.data?.profilePicture || ''
    cvStore.setUserProfilePicture(url)
    auth.user = { ...(auth.user || {}), profilePicture: url }
  } catch (e) {
    console.error('Failed to load profile image', e)
  }
}

const full_name = computed({
  get: () => `${draft.value.first_name} ${draft.value.last_name}`.trim(),
  set: (value) => {
    const parts = value.trim().split(' ')
    draft.value.first_name = parts[0] || ''
    draft.value.last_name = parts.slice(1).join(' ') || ''
  },
})

const location = computed({
  get: () => {
    const p = draft.value
    if (p.street && p.city) return `${p.street}, ${p.city}`
    if (p.street && p.postal_code) return `${p.street}, ${p.postal_code}`
    if (p.city && p.country) return `${p.city}, ${p.country}`
    if (p.postal_code && p.country) return `${p.postal_code}, ${p.country}`
    if (p.city && p.region) return `${p.city}, ${p.region}`
    if (p.postal_code && p.region) return `${p.postal_code}, ${p.region}`
    if (p.city) return p.city
    if (p.region) return p.region
    if (p.country) return p.country
    return ''
  },
  set: (value) => {
    draft.value.city = value
  },
})

async function handlePhotoUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  // preview immédiat
  photoPreview.value = URL.createObjectURL(file)

  try {
    const res = await apiUploadMyImage(file)
    const url = res?.data?.imageUrl || ''

    cvStore.setUserProfilePicture(url)
    auth.user = { ...(auth.user || {}), profilePicture: url }

    // remplacer preview par l'url finale backend
    photoPreview.value = ''
  } catch (e: any) {
    console.error(e)
    errorMessage.value = e?.response?.data?.message || 'Failed to upload image'
  } finally {
    input.value = ''
  }
}

function removePhoto() {
  // sans endpoint delete, on ne peut pas supprimer côté serveur
  // donc on enlève juste localement (et l'utilisateur peut re-uploader)
  cvStore.setUserProfilePicture('')
  if (auth.user) auth.user.profilePicture = ''
  photoPreview.value = ''
}


/**
 * Détermine si profile-info existe déjà côté backend.
 * Comme ton modèle ProfileInfo a cvId en PK, on peut se baser sur au moins un champ.
 */
function hasExistingProfileInfo() {
  const p = cvStore.profile
  return Boolean(p.first_name || p.last_name || p.email || p.headline)
}

async function saveProfileInfo() {
  saving.value = true
  errorMessage.value = null

  try {
    const cvId = requireCvId()

    const dto: ProfileDTO = {
      firstName: draft.value.first_name || undefined,
      lastName: draft.value.last_name || undefined,
      headline: draft.value.headline || undefined,
      professionalSummary: cvStore.summary.professional_summary || undefined, // reste géré aussi par ProfileSection
      email: draft.value.email || undefined,
      phone: draft.value.phone || undefined,
      street: draft.value.street || undefined,
      city: draft.value.city || undefined,
      postalCode: draft.value.postal_code || undefined,
      region: draft.value.region || undefined,
      country: draft.value.country || undefined,
      websiteUrl: draft.value.website_url || undefined,
    }

    if (hasExistingProfileInfo()) {
      await updateProfileInfo(cvId, dto)
    } else {
      await createProfileInfo(cvId, dto)
    }

    // Recharge l'agrégat CV pour resync le store
    await cvStore.loadCv(cvId)

    isEditing.value = false
  } catch (e: any) {
    console.error(e)
    errorMessage.value = e?.response?.data?.message || 'Failed to save profile info'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  if (!cvStore.userProfilePicture) loadMyPhoto()
})
</script>

<template>
  <div class="general-information">
    <div v-if="!isEditing">
      <h2 :class="{ placeholder: !full_name }">
        {{ full_name || 'Your name' }}
      </h2>

      <button class="btn-edit" @click="isEditing = true">
        <i class="bi bi-pencil-square"></i>
      </button>

      <div class="d-flex justify-content-between align-items-end">
        <ul class="contact-info">
          <li :class="{ placeholder: !draft.email }">
            <i class="bi bi-envelope"></i> {{ draft.email || 'Email' }}
          </li>
          <li :class="{ placeholder: !draft.phone }">
            <i class="bi bi-telephone"></i> {{ draft.phone || 'Phone number' }}
          </li>
          <li :class="{ placeholder: !location }">
            <i class="bi bi-geo-alt"></i> {{ location || 'Location' }}
          </li>
        </ul>
        <div class="photo">
          <img v-if="photoUrl" :src="photoUrl" alt="Profile photo" />
          <div v-else class="photo-placeholder">
            <i class="bi bi-camera"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="edit-mode">
      <h2>Edit Personal Details</h2>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <form class="edit-form" @submit.prevent="saveProfileInfo">
        <div class="form-row">
          <label>Full name</label>

          <div class="name-photo-row">
            <input
              v-model="full_name"
              class="input-field input-creation"
              placeholder="Noelis Mané"
            />

            <label class="photo-upload">
              <input type="file" accept="image/*" @change="handlePhotoUpload" hidden />
              <div class="photo">
                <img v-if="photoUrl" :src="photoUrl" alt="Profile photo" />
                <div v-else class="photo-placeholder">
                  <i class="bi bi-camera"></i>
                </div>
              </div>
            </label>

            <button
              v-if="photoUrl"
              type="button"
              class="btn-remove-photo"
              @click="removePhoto"
              title="Remove photo"
            >
              <i class="bi bi-x"></i>
            </button>
          </div>
        </div>

        <div class="form-row">
          <label>Professional title</label>
          <input
            v-model="draft.headline"
            class="input-field input-creation"
            placeholder="e.g. Full Stack Developer"
          />
        </div>

        <div class="form-row">
          <label>Email</label>
          <input
            v-model="draft.email"
            type="email"
            class="input-field input-creation"
            placeholder="e.g. noelis.mane@linkedin2cv.com"
          />
        </div>

        <div class="form-grid">
          <div>
            <label>Date of Birth</label>
            <input v-model="draft.birth_date" type="date" class="input-field input-creation" />
          </div>
          <div>
            <label>Phone</label>
            <input
              v-model="draft.phone"
              class="input-field input-creation"
              placeholder="e.g. +33 6 02 19 02 49"
            />
          </div>
        </div>

        <div class="form-grid">
          <div>
            <label>Location</label>
            <input
              v-model="location"
              class="input-field input-creation"
              placeholder="e.g. Rennes, France"
            />
          </div>
          <div>
            <label>Website</label>
            <input
              v-model="draft.website_url"
              class="input-field input-creation"
              placeholder="e.g. www.linkedin2cv.com"
            />
          </div>
        </div>

        <div class="form-row">
          <label>Availability</label>
          <input
            v-model="draft.availability"
            class="input-field input-creation"
            placeholder="e.g. Remote work | Immediate start"
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
.general-information {
  background: white;
  border-radius: 10px;
  padding: 20px 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.btn-edit {
  position: absolute;
  top: 20px;
  right: 25px;
  font-size: 28px;
  border: none;
  background: transparent;
  color: #0f62a4;
  cursor: pointer;
}

.placeholder {
  color: #8e8e8e;
  background: transparent !important;
  opacity: 1 !important;
}

.contact-info {
  list-style: none;
  margin: 15px 0 0;
  padding: 0;
}

.contact-info li {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 10px 0 0;
  font-size: 18px;
}

.name-photo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
}

.name-photo-row input {
  width: 70%;
}

.photo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ccc;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -40px 0 0;
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  color: #999;
  font-size: 30px;
  border-radius: 50%;
}

.photo-upload {
  cursor: pointer;
  position: relative;
}

.btn-remove-photo {
  position: absolute;
  bottom: 5px;
  right: 33px;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error {
  color: #dc3545;
  margin-bottom: 10px;
}
</style>