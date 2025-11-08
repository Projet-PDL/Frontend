<script setup>
import { ref, computed } from 'vue'

const isEditing = ref(false)

const user = ref({
  profile_picture: '',
})

const profile = ref({ 
    first_name: '',
    last_name: '',
    headline: '',
    email: '',
    birth_date: '',
    phone: '',
    street: '',
    city: '',
    postal_code: '',
    region: '',
    country: '',
    website_url: '',
    availability: ''
})

const full_name = computed({
  get: () => {
    return `${profile.value.first_name} ${profile.value.last_name}`.trim()
  },
  set: (value) => {
    const parts = value.trim().split(' ')
    profile.value.first_name = parts[0] || ''
    profile.value.last_name = parts.slice(1).join(' ') || ''
  }
})

const location = computed({
  get: () => {
    const p = profile.value
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
    profile.value.city = value
  }
})


function handlePhotoUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      user.value.profile_picture = reader.result // base64 preview
    }
    reader.readAsDataURL(file)
  }
}

function removePhoto() {
  user.value.profile_picture = ''
}
</script>

<template>
  <div class="general-information">
    <div v-if="!isEditing">
      <h2 :class="{ 'placeholder': !full_name }">
        {{ full_name || 'Your name' }}
      </h2>     
      <button class="btn-edit" @click="isEditing = true">
        <i class="bi bi-pencil-square"></i>
      </button>
      <ul class="contact-info">
        <li :class="{ 'placeholder': !profile.email }">
          <i class="bi bi-envelope"></i> {{ profile.email || 'Email' }}
        </li>
        <li :class="{ 'placeholder': !profile.phone }">
          <i class="bi bi-telephone"></i> {{ profile.phone || 'Phone number' }}
        </li>
        <li :class="{ 'placeholder': !location }">
          <i class="bi bi-geo-alt"></i> {{ location || 'Location' }}
        </li>
      </ul>
    </div>

    <div v-else class="edit-mode">
      <h2>Edit Personal Details</h2>
      <form class="edit-form" @submit.prevent="isEditing = false">
        <div class="form-row">
          <label>Full name</label>
          <div class="name-photo-row">
            <input v-model="full_name" class="input-field input-creation" placeholder="Noelis Mané" />
            <label class="photo-upload">
                <input type="file" accept="image/*" @change="handlePhotoUpload" hidden />
                <div class="photo">
                <img v-if="user.profile_picture" :src="user.profile_picture" alt="Profile photo" />
                <div v-else class="photo-placeholder">
                  <i class="bi bi-camera"></i>
                </div>
                </div>
            </label>

            <button v-if="user.profile_picture" type="button" class="btn-remove-photo" @click="removePhoto" title="Remove photo">
                <i class="bi bi-x"></i>
            </button>
          </div>
        </div>

        <div class="form-row">
          <label>Professional title</label>
          <input v-model="profile.headline" class="input-field input-creation" placeholder="e.g. Full Stack Developer" />
        </div>

        <div class="form-row">
          <label>Email</label>
          <input v-model="profile.email" class="input-field input-creation" placeholder="e.g. noelis.mane@linkedin2cv.com" />
        </div>

        <div class="form-grid">
          <div>
            <label>Date of Birth</label>
            <input v-model="profile.birth_date" type="date" class="input-field input-creation" placeholder="Enter your birth date" />
          </div>
          <div>
            <label>Phone</label>
            <input v-model="profile.phone" class="input-field input-creation" placeholder="e.g. +33 6 02 19 02 49" />
          </div>
        </div>

        <div class="form-grid">
          <div>
            <label>Location</label>
            <input v-model="location" class="input-field input-creation" placeholder="e.g. Rennes, France" />
          </div>
          <div>
            <label>Website</label>
            <input v-model="profile.website_url" class="input-field input-creation" placeholder="e.g. www.linkedin2cv.com" />
          </div>
        </div>

        <div class="form-row">
          <label>Availability</label>
          <input v-model="profile.availability" class="input-field input-creation" placeholder="e.g. Remote work | Immediate start" />
        </div>

        <button type="submit" class="btn-principale btn-creation">Done</button>
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
  color: #0F62A4;
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

.form-row,
.form-grid > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.name-photo-row{
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

</style>
