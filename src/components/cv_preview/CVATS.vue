<script setup lang="ts">
import { computed } from "vue";
import { useCvStore } from "@/stores/cv.store.ts";
import { storeToRefs } from "pinia";
import { useDateFormatter } from '@/helpers/useDateFormatter.ts'

const cv = useCvStore();
const {
  profile,
  summary,
  educations,
  experiences,
  languages,
  skills,
  interests,
  certifications
} = storeToRefs(cv);

const { formatDate, formatMonthYear } = useDateFormatter();

const fullName = computed(() =>
  `${profile.value.first_name} ${profile.value.last_name}`.trim()
);

const location = computed(() => {
  const p = profile.value;
  if (p.city && p.country) return `${p.city}, ${p.country}`;
  if (p.city) return p.city;
  return "";
});

const contactItems = computed(() => {
  const items = []

  if (profile.value.email)
    items.push({ icon: "bi bi-envelope", value: profile.value.email })

  if (profile.value.phone)
    items.push({ icon: "bi bi-telephone", value: profile.value.phone })

  if (location.value)
    items.push({ icon: "bi bi-geo-alt", value: location.value })

  if (profile.value.birth_date)
    items.push({ icon: "bi bi-calendar", value: "Date of birth " + formatDate(profile.value.birth_date) })

  if (profile.value.website_url)
    items.push({ icon: "bi bi-link-45deg", value: profile.value.website_url })

  if (profile.value.availability)
    items.push({ icon: "bi bi-laptop", value: "Open to remote work" })

  return items
})

</script>

<template>
  <div class="cv-ats">
    <header class="header">
      <h1>{{ fullName }}</h1>
      <h2>{{ profile.headline }}</h2>

      <div class="contact-grid">
        <div class="contact-item" v-for="item in contactItems" :key="item.value">
          <i :class="item.icon"></i> {{ item.value }}
        </div>
      </div>
    </header>

    <section class="section section-block" v-if="summary.professional_summary">
      <div class="section-title">ABOUT</div>
      <p class="about-text">{{ summary.professional_summary }}</p>
    </section>

    <section class="section section-block" v-if="languages.length">
      <div class="section-title">LANGUAGES</div>
      <div class="languages-grid">
        <div v-for="l in languages" :key="l.position" class="lang-item">
          <strong>{{ l.language_name }}</strong>
          <span>{{ l.proficiency_level }}</span>
        </div>
      </div>
    </section>

    <section class="section section-block" v-if="educations.length">
      <div class="section-title">EDUCATION</div>
      <div v-for="edu in educations" :key="edu.position" class="edu-block">
        <div class="edu-header">
          <strong>{{ edu.degree }}, {{ edu.school }}</strong>
          <span>
            <template v-if="!edu.end_date">Since {{ formatMonthYear(edu.start_date) }}</template>
            <template v-else>{{ formatMonthYear(edu.start_date) }} to {{ formatMonthYear(edu.end_date) }}</template>
          </span>
        </div>
        <p class="edu-desc">{{ edu.description }}</p>
      </div>
    </section>

    <section class="section section-block" v-if="certifications.length">
      <div class="section-title">CERTIFICATIONS</div>
      <div v-for="cert in certifications" :key="cert.position" class="edu-block">
        <div class="edu-header">
          <strong>{{ cert.name }}, {{ cert.issuer }}</strong>
          <span>{{ formatMonthYear(cert.issueDate) }}</span>
        </div>
      </div>
    </section>

    <section class="section section-block" v-if="experiences.length">
      <div class="section-title">WORK EXPERIENCE</div>
      <div v-for="exp in experiences" :key="exp.position" class="edu-block">
        <div class="edu-item">
          <div class="edu-text">
            <strong>{{ exp.title }}, {{ exp.company }}</strong>
            <ul class="exp-list">
              <li v-for="(line, i) in exp.description.split('\n')" :key="i">
                {{ line }}
              </li>
            </ul>
          </div>
          <div class="edu-date">
            <span class="date">
              <template v-if="!exp.end_date">Since {{ formatMonthYear(exp.start_date) }}</template>
              <template v-else>{{ formatMonthYear(exp.start_date) }} to {{ formatMonthYear(exp.end_date) }}</template>
            </span>
            <span>{{ exp.location }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-block" v-if="skills.length">
      <div class="section-title">SKILLS</div>
      <div class="skills-grid">
        <div v-for="s in skills" :key="s.position" class="edu-block">
          <div class="edu-item">
            <span class="skill-name">
              <strong>{{ s.skill_name }}</strong>
            </span>
            <span class="skill-description">{{ s.skill_description }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-block" v-if="interests.length">
      <div class="section-title">INTERESTS</div>
      <p v-for="i in interests" :key="i.position" class="interest-item">
        {{ i.name }}
      </p>
    </section>

    <!-- Marge de page pour le scroll -->
    <div class="page-margin"></div>
  </div>
</template>

<style scoped>
.cv-ats {
  width: 794px;
  min-height: 1123px;
  background: white;
  font-family: "Inter", sans-serif;
  padding: 30px 40px;
  overflow: visible;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.page-margin {
  height: 30px;
  width: 100%;
}

/* Empêcher les sections d'être coupées */
.section-block {
  page-break-inside: avoid;
  break-inside: avoid;
  margin-bottom: 20px;
}

.section-block .section-title {
  page-break-after: avoid;
  break-after: avoid;
}

.header {
  text-align: center;
  padding-bottom: 25px;
  border-bottom: 1px solid black;
  page-break-after: avoid;
  break-after: avoid;
}

.header h1 {
  font-size: 22px;
  font-weight: 700;
}

.header h2 {
  font-size: 12px;
  font-weight: 600;
  padding-bottom: 15px;
}

.contact-grid{
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 8px 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
}

.section {
  margin-top: 20px;
}

.section-title {
  background: #e7e7e7cb;
  text-align: center;
  padding: 6px 0;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: 1px;
  font-size: 12px;
}

.about-text {
  white-space: pre-line;
  font-style: italic;
  font-size: 10px;
  line-height: 1.5;
}

.languages-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 8px 20px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 8px 20px;
}

.lang-item{
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 10px;
  page-break-inside: avoid;
  break-inside: avoid;
}

.edu-block {
  margin-bottom: 10px;
  page-break-inside: avoid;
  break-inside: avoid;
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 10px;
}

.edu-desc{
  font-size: 9px;
  margin-top: 2px;
}

.edu-item {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  page-break-inside: avoid;
  break-inside: avoid;
}

.edu-text{
  font-size: 10px;
}

.edu-date {
  font-size: 10px;
  display: flex;
  flex-direction: column;
  text-align: right;
}

.exp-list {
  padding-left: 25px;
  margin-top: 4px;
  page-break-inside: avoid;
  break-inside: avoid;
}

.exp-list li {
  font-size: 9px;
  list-style-type: square;
}

.skills-grid{
  font-size: 10px;
}

.skill-name{
  width: 160px;
}
.skill-description{
  text-align: right;
}

.interest-item {
  font-size: 10px;
  margin-bottom: 4px;
  font-weight: 600;
  page-break-inside: avoid;
  break-inside: avoid;
}
</style>