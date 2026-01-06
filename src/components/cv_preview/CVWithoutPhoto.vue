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
  socialNetworks,
  interests,
  certifications
} = storeToRefs(cv);

const { formatDate, formatMonthYear } = useDateFormatter();

const platformIcons = {
  LinkedIn: "bi-linkedin",
  Facebook: "bi-facebook",
  Twitter: "bi-twitter-x",
  Instagram: "bi-instagram",
  GitHub: "bi-github",
  GitLab: "bi-gitlab",
  Dribbble: "bi-dribbble",
  Behance: "bi-behance",
  YouTube: "bi-youtube",
  TikTok: "bi-tiktok",
};

const full_name = computed(
  () => `${profile.value.first_name} ${profile.value.last_name}`.trim()
);

const location = computed(() => {
  const p = profile.value;
  if (p.street && p.city) return `${p.street}, ${p.city}`;
  if (p.city && p.country) return `${p.city}, ${p.country}`;
  if (p.city) return p.city;
  if (p.country) return p.country;
  return "";
});
</script>

<template>
  <div class="cv-page">
    <div class="header-with-bg">
      <div class="header-content">
        <h1>{{ full_name }}</h1>
        <h2>{{ profile.headline }}</h2>
        <p class="summary-text">
          {{ summary.professional_summary }}
        </p>
      </div>
    </div>

    <div class="cv-layout">
      <div class="left-side">
        <section v-if="educations.length" class="section-block">
          <h3>Education</h3>
          <div v-for="edu in educations" :key="edu.position" class="edu-item timeline-item">
            <div class="edu-date">
              <span class="date">
                <template v-if="!edu.end_date">
                  Since {{ formatMonthYear(edu.start_date) }}
                </template>
                <template v-else>
                  {{ formatMonthYear(edu.start_date) }} - {{ formatMonthYear(edu.end_date) }}
                </template>
              </span>
            </div>
            <div class="edu-text">
              <strong class="edu-title">{{ edu.degree }}</strong>
              <p class="edu-school">{{ edu.school }}</p>
              <p class="edu-desc">{{ edu.description }}</p>
            </div>
          </div>
        </section>

        <section v-if="certifications.length" class="section-block">
          <h3>Certifications</h3>
          <div v-for="cert in certifications" :key="cert.position" class="edu-item timeline-item">
            <div class="edu-date">
              <span class="date">
                {{ formatMonthYear(cert.issueDate) }}
              </span>
            </div>
            <div class="edu-text">
              <strong class="edu-title">{{ cert.name }}</strong>
              <p class="edu-school">{{ cert.issuer }}</p>
            </div>
          </div>
        </section>

        <section v-if="experiences.length" class="section-block">
          <h3>Work experience</h3>
          <div v-for="exp in experiences" :key="exp.position" class="edu-item timeline-item">
            <div class="edu-date">
              <span class="date">
                <template v-if="!exp.end_date">
                  Since {{ formatMonthYear(exp.start_date) }}
                </template>
                <template v-else>
                  {{ formatMonthYear(exp.start_date) }} - {{ formatMonthYear(exp.end_date) }}
                 </template>
              </span>
            </div>
            <div class="edu-text">
              <strong class="edu-title">{{ exp.title }}</strong>
              <div class="company-row">
                <p class="edu-school">{{ exp.company }}</p>
                <p class="edu-location">{{ exp.location }}</p>
              </div>
              <ul class="exp-list">
                <li v-for="(line, i) in exp.description.split('\n')" :key="i">
                  {{ line }}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div class="right-side">

        <div class="right">
          <section v-if="profile.email || location || profile.birth_date || profile.phone || profile.website_url || profile.availability" class="section-block">
            <h3>About</h3>
            <div class="right-item">
              <p v-if="profile.email"><i class="bi bi-envelope"></i> {{ profile.email }}</p>
              <p v-if="profile.phone"><i class="bi bi-telephone"></i> {{ profile.phone }}</p>
              <p v-if="location"><i class="bi bi-geo-alt"></i> {{ location }}</p>
              <p v-if="profile.birth_date">
                <i class="bi bi-calendar"></i> Born {{ formatDate(profile.birth_date) }}
              </p>
              <p v-if="profile.website_url"><i class="bi bi-link-45deg"></i> {{ profile.website_url }}</p>
              <p v-if="profile.availability"><i class="bi bi-laptop"></i> Remote or on-site</p>
            </div>
          </section>

          <section v-if="languages.length" class="section-block">
            <h3>Languages</h3>
            <div v-for="l in languages" :key="l.position" class="lang-item">
              <strong class="right-title">{{ l.language_name }}</strong>
              <p>{{ l.proficiency_level }}</p>
            </div>
          </section>

          <section v-if="socialNetworks.length" class="section-block">
            <h3>Social networks</h3>
            <div v-for="sn in socialNetworks" :key="sn.position" class="right-item">
              <div class="edu-text">
                <i v-if="platformIcons[sn.platform]" :class="platformIcons[sn.platform]"></i>
                {{ sn.username }}
              </div>
            </div>
          </section>

          <section v-if="skills.length" class="section-block">
            <h3>Skills</h3>
            <div v-for="s in skills" :key="s.position" class="right-item">
              <div class="edu-text">
                <strong class="right-title">{{ s.skill_name }}</strong>
                <p>{{ s.skill_description }}</p>
              </div>
            </div>
          </section>

          <section v-if="interests.length" class="section-block">
            <h3>Interests</h3>
            <div v-for="i in interests" :key="i.position" class="right-item">
              <div class="edu-text">
                <p>{{ i.name }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Marge de page pour le scroll -->
    <div class="page-margin"></div>
  </div>
</template>

<style scoped>
.cv-page {
  width: 794px;
  min-height: 1123px;
  background: white;
  font-family: "Inter", sans-serif;
  position: relative;
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

.section-block h3 {
  page-break-after: avoid;
  break-after: avoid;
}

.header-with-bg {
  width: 100%;
  height: fit-content;
  background-image: url("@/assets/images/CV/cv_background.png");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  page-break-after: avoid;
  break-after: avoid;
}

.header-content {
  padding: 30px 60px;
  position: relative;
  z-index: 2;
}

.header-content h1 {
  font-size: 28px;
  font-weight: 500;
  margin: 0 0 5px;
}

.header-content h2 {
  font-size: 18px;
  font-weight: 600;
  color: #d94ba3;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0 0 20px;
}

.header-content .summary-text {
  font-size: 15px;
  line-height: 1.45;
  max-width: 650px;
  white-space: pre-line;
  text-align: center;
  margin: 0 auto;
}

.cv-layout {
  display: grid;
  grid-template-columns: 65% 35%;
  padding: 40px 40px;
  gap: 40px;
}

.cv-layout h3 {
  font-size: 18px;
  margin: 0 0 10px;
  font-weight: 700;
}

.edu-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 15px;
  page-break-inside: avoid;
  break-inside: avoid;
}

.edu-date {
  width: 55px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: rgba(109, 109, 109, 0.92);
}

.edu-date span.date{
  font-weight: 500;
}

.edu-text {
  flex: 1;
}

.edu-title {
  font-size: 15px;
  font-weight: 700;
}

.edu-school {
  font-size: 13px;
  margin-bottom: 0;
  font-weight: 700;
  color: #d94ba3;
}

.edu-desc {
  font-size: 13px;
  color: rgba(109, 109, 109, 1);
  margin-bottom: 0;
}

.company-row {
  display: flex;
  gap: 5px;
  align-items: center;
}

.edu-location {
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  padding: 0;
}

.exp-list {
  padding-left: 15px;
  list-style-position: outside;
  page-break-inside: avoid;
  break-inside: avoid;
}

.exp-list li {
  margin: 0 0 2px 0;
  padding: 0;
  font-size: 14px;
  color: rgba(109, 109, 109, 1);
}

.timeline-item {
  position: relative;
  padding-left: 18px;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: 3px;
  top: 6px;
  width: 8px;
  height: 8px;
  background-color: #d94ba3;
  border-radius: 50%;
}

.timeline-item::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 18px;
  width: 2px;
  height: calc(100% - 20px);
  background-color: #888888ff;
  opacity: 0.7;
}

.right section, .left-side section{
  margin-bottom: 18px;
}

.right h3{
  color: #d94ba3;
}

.right-item {
  margin-bottom: 8px;
  font-size: 14px;
  page-break-inside: avoid;
  break-inside: avoid;
}

.right-item p{
  margin-bottom: 2px;
}

.right-title {
  font-size: 14px;
  font-weight: 600;
}

.lang-item {
  display: flex;
  gap: 5px;
  align-items: center;
  margin-bottom: 4px;
  font-size: 14px;
  page-break-inside: avoid;
  break-inside: avoid;
}

.lang-item p{
  margin: 0;
  padding: 0;
}

</style>