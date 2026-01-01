<script setup>
import { ref } from 'vue'
import GeneralInformationSection from '@/components/sections/GeneralInformationSection.vue'
import ProfileSection from '@/components/sections/ProfileSection.vue'
import EducationSection from '@/components/sections/EducationSection.vue'
import ProfessionalExperienceSection from '@/components/sections/ProfessionalExperienceSection.vue'
import LanguageSection from '@/components/sections/LanguageSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import SocialNetworkSection from '@/components/sections/SocialNetworkSection.vue'
import InterestSection from '@/components/sections/InterestSection.vue'

const activeSection = ref(null)

const setActiveSection = (sectionName) => {
  activeSection.value = activeSection.value === sectionName ? null : sectionName
}
</script>

<template>
  <div class="left-panel-container">
    <GeneralInformationSection :isActive="activeSection === 'general'" @open="setActiveSection('general')" />
    <ProfileSection :isActive="activeSection === 'profile'" @open="setActiveSection('profile')" />
    <EducationSection :isActive="activeSection === 'education'" @open="setActiveSection('education')" />
    <ProfessionalExperienceSection :isActive="activeSection === 'experience'" @open="setActiveSection('experience')" />
    <LanguageSection :isActive="activeSection === 'language'" @open="setActiveSection('language')" />
    <SkillsSection :isActive="activeSection === 'skills'" @open="setActiveSection('skills')" />
    <SocialNetworkSection :isActive="activeSection === 'social'" @open="setActiveSection('social')" />
    <InterestSection :isActive="activeSection === 'interest'" @open="setActiveSection('interest')" />
  </div>
</template>

<style scoped>
.left-panel-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
