<script setup lang="ts">
import { computed } from "vue";
import { useCvStore } from "@/stores/cv.store.ts";
import { storeToRefs } from "pinia";
import { useDateFormatter } from '@/helpers/useDateFormatter.ts'

const cv = useCvStore();
const {
  profile,
  userProfilePicture,
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

const platformIcons: Record<string, string> = {
  LinkedIn: 'bi-linkedin',
  Facebook: 'bi-facebook',
  Twitter: 'bi-twitter-x',
  Instagram: 'bi-instagram',
  GitHub: 'bi-github',
  GitLab: 'bi-gitlab',
  Dribbble: 'bi-dribbble',
  Behance: 'bi-behance',
  YouTube: 'bi-youtube',
  TikTok: 'bi-tiktok'
}

const full_name = computed(() =>
  `${profile.value.first_name} ${profile.value.last_name}`.trim()
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
    <div class="cv-layout">
      <div class="left-side">
        <div class="header">
          <div class="general-informations">
            <div class="left-bar"></div>
            <div class="header-grid">
              <div class="col">
                <p v-if="profile.phone"><i class="bi bi-telephone"></i> {{ profile.phone }}</p>
                <p v-if="location"><i class="bi bi-geo-alt"></i> {{ location }}</p>
                <p v-if="profile.birth_date">
                  <i class="bi bi-calendar"></i> Date of birth {{ formatDate(profile.birth_date) }}
                </p>
              </div>

              <div class="col">
                <p v-if="profile.email"><i class="bi bi-envelope"></i> {{ profile.email }}</p>
                <p v-if="profile.website_url"><i class="bi bi-link-45deg"></i> {{ profile.website_url }}</p>
                <p v-if="profile.availability"><i class="bi bi-laptop"></i> Open to remote work</p>
              </div>
            </div>
          </div>

          <section class="identity">
            <h1>{{ full_name }}</h1>
            <h2>{{ profile.headline }}</h2>
          </section>
        </div>

        <div class="informations">
          <section v-if="summary.professional_summary" class="section-block">
            <h3>Profil</h3>
            <p class="summary-text">{{ summary.professional_summary }}</p>
          </section>

          <section v-if="educations.length" class="section-block">
            <h3>Education</h3>
            <div v-for="edu in educations" :key="edu.position" class="edu-item">
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

          <section v-if="certifications.length">
            <h3>Certifications</h3>
            <div v-for="cert in certifications" :key="cert.position" class="edu-item">
              <div class="edu-date">
                <span class="date">
                  {{ formatMonthYear(cert.issueDate) }}
                </span>
              </div>
              <div class="edu-text">
                <strong class="edu-title">{{ cert.name }}</strong>
                <p class="edu-school">{{ cert.issuer }}</p>
                <!--                <p class="edu-desc" v-if="cert.credentialUrl">{{ cert.credentialUrl }}</p>-->
              </div>
            </div>
          </section>

          <section v-if="experiences.length" class="section-block">
            <h3>Work experience</h3>
            <div v-for="exp in experiences" :key="exp.position" class="edu-item">
              <div class="edu-date">
                <span class="date">
                  <template v-if="!exp.end_date">
                    Since {{ formatMonthYear(exp.start_date) }}
                  </template>
                  <template v-else>
                    {{ formatMonthYear(exp.start_date) }} - {{ formatMonthYear(exp.end_date) }}
                  </template>
                </span>
                <span>{{ exp.location }}</span>
              </div>
              <div class="edu-text">
                <strong class="edu-title">{{ exp.title }}</strong>
                <p class="edu-school">{{ exp.company }}</p>
                <ul class="exp-list">
                  <li v-for="(line, i) in exp.description.split('\n')" :key="i">
                    {{ line }}
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div class="right-side">
        <div class="photo-block">
          <img v-if="userProfilePicture"
               :src="userProfilePicture"
               alt="Profile picture"/>
        </div>

        <div class="right">
          <section v-if="languages.length" class="section-block">
            <h3>Languages</h3>
            <div v-for="l in languages" :key="l.position" class="right-item">
              <div class="edu-text">
                <strong class="right-title">{{ l.language_name }}</strong>
                <p>{{ l.proficiency_level }}</p>
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

          <section v-if="socialNetworks.length" class="section-block">
            <h3>Social networks</h3>
            <div v-for="sn in socialNetworks" :key="sn.position" class="right-item">
              <div class="edu-text">
                <i v-if="platformIcons[sn.platform]" :class="platformIcons[sn.platform]"></i>
                {{ sn.username }}
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
  padding-left: 30px;
  padding-bottom: 30px;
  font-family: "Inter", sans-serif;
  overflow: visible;
  position: relative;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.page-margin {
  height: 50px;
  width: 100%;
}

.cv-layout {
  display: grid;
  grid-template-columns: 65% 35%;
  min-height: 1093px;
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

.header{
  border-right: 2px solid #dcdcdc;
  page-break-after: avoid;
  break-after: avoid;
}

.general-informations {
  display: flex;
  align-items: flex-start;
  padding-bottom: 10px;
}

.left-bar {
  width: 50px;
  height: 130px;
  background: #C4CBE6;
}

.header-grid {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 30px;
  margin: 30px -20px;
  font-size: 14px;
}

.header-grid p {
  margin: 4px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: black;
}

.identity {
  page-break-after: avoid;
  break-after: avoid;
}

.identity h1 {
  font-size: 18px;
  font-weight: 500;
  color: #444444bb;
  margin-bottom: 5px;
}

.identity h2 {
  font-size: 20px;
  color: black;
  margin-top: 0;
  display: inline-block;
  border-bottom: 2px solid #dcdcdc;
  padding-bottom: 5px;
}

.informations {
  padding: 20px 20px 0 0;
}

.informations h3, .right h3 {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 8px;
}

.right h3 {
  color: #3D6794;
}

.informations p{
  font-size: 15px;
}

.summary-text {
  white-space: pre-line;
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
}

.edu-date span.date{
  font-weight: 700;
}

.edu-text {
  flex: 1;
}

.edu-title {
  font-size: 15px;
  font-weight: 700;
  color: #3D6794;
}

.edu-school {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 0;
}

.edu-desc {
  font-size: 13px;
  margin-bottom: 0;
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
}

.right-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  min-height: 100%;
}

.photo-block{
  height: 200px;
  margin:auto;
}

.photo-block img {
  width: 150px;
  height: 190px;
  object-fit: cover;
  margin-top: 25px;
}

.right {
  width: 100%;
  background: #C4CBE6;
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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

.right section{
  margin-bottom: 18px;
}

.right-title {
  font-size: 14px;
  font-weight: 600;
  color: #3D6794;
}
</style>