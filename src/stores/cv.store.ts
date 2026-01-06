import { defineStore } from "pinia";
import { ref } from "vue";
import {
  apiCreateCv,
  apiDeleteCv,
  apiGetCv,
  apiListCvs,
  type CvListItem,
} from '@/services/cvmanagement.service.ts'

export interface Profile {
  first_name: string;
  last_name: string;
  headline: string;
  email: string;
  birth_date: string;
  phone: string;
  street: string;
  city: string;
  postal_code: string;
  region: string;
  country: string;
  website_url: string;
  availability: string;
}

export interface User {
  profile_picture: string;
}

export interface Summary {
    professional_summary: string;
}

export interface EducationItem{
  id: number;
  degree: string;
  school: string;
  start_date: string;
  end_date: string;
  description: string;
  position: number;
}

export interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  position: number;
}

export interface LanguageItem {
  id: number;
  language_name: string;
  proficiency_level: string;
  position: number;
}

export interface SkillItem {
  id: number;
  skill_name: string;
  skill_description: string;
  position: number;
}

export interface SocialNetworkItem {
  id: number;
  platform: string;
  username: string;
  position: number;
}

export interface CertificationItem {
   id: number;
   name: string;
   issuer: string;
   issueDate: string;
   expirationDate: string;
   credentialUrl: string;
   position: number

}

export interface InterestItem {
  id: number;
  name: string;
  category: string;
  position: number;
}

export const useCvStore = defineStore("cv", () => {
  const currentCvId = ref<number | null>(null);
  const myCvs = ref<CvListItem[]>([])
  const loading = ref(false);
  const error = ref<string | null>(null);

  const profile = ref<Profile>({
    first_name: "",
    last_name: "",
    headline: "",
    email: "",
    birth_date: "",
    phone: "",
    street: "",
    city: "",
    postal_code: "",
    region: "",
    country: "",
    website_url: "",
    availability: "",
  });
  const user = ref<User>({
    profile_picture: "",
  });
  const summary = ref<Summary>({
    professional_summary: "",
  });
  const educations = ref<EducationItem[]>([]);
  const experiences = ref<ExperienceItem[]>([]);
  const languages = ref<LanguageItem[]>([]);
  const skills = ref<SkillItem[]>([]);
  const socialNetworks = ref<SocialNetworkItem[]>([]);
  const certifications = ref<CertificationItem[]>([]);
  const interests = ref<InterestItem[]>([]);

  async function createEmptyCv(title?: string) {
    loading.value = true;
    error.value = null;
    try {
      const res = await apiCreateCv(title);
      const cvId = res?.data?.id ?? res?.data?.cv?.id ?? res?.id;
      currentCvId.value = Number(cvId);
      return currentCvId.value;
    } catch (e: any) {
      error.value = e?.response?.data?.message || 'Failed to create empty CV';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  function setCvId(id: number) {
    currentCvId.value = id
  }

  async function loadMyCvs() {
    const res = await apiListCvs({ page: 0, size: 50 })
    myCvs.value = res.data.items || []
    return myCvs.value
  }

  function hydrateFromBackend(cv: any) {
    if (cv.profileInfo) {
      profile.value.first_name = cv.profileInfo.firstName ?? ''
      profile.value.last_name = cv.profileInfo.lastName ?? ''
      profile.value.headline = cv.profileInfo.headline ?? ''
      profile.value.email = cv.profileInfo.email ?? ''
      profile.value.phone = cv.profileInfo.phone ?? ''
      profile.value.street = cv.profileInfo.street ?? ''
      profile.value.city = cv.profileInfo.city ?? ''
      profile.value.postal_code = cv.profileInfo.postalCode ?? ''
      profile.value.region = cv.profileInfo.region ?? ''
      profile.value.country = cv.profileInfo.country ?? ''
      profile.value.website_url = cv.profileInfo.websiteUrl ?? ''

      summary.value.professional_summary = cv.profileInfo.professionalSummary ?? ''
    }

    educations.value = (cv.educations ?? []).map((e: any) => ({
      id: e.id ?? null,
      degree: e.degree ?? '',
      school: e.school ?? '',
      start_date: e.startDate ?? '',
      end_date: e.endDate ?? '',
      description: e.description ?? '',
      position: e.position ?? 0,
    }))

    experiences.value = (cv.experiences ?? []).map((x: any) => ({
      id: x.id ?? null,
      title: x.title ?? '',
      company: x.company ?? '',
      location: x.location ?? '',
      start_date: x.startDate ?? '',
      end_date: x.endDate ?? '',
      description: x.description ?? '',
      position: x.position ?? 0,
    }))

    languages.value = (cv.languages ?? []).map((l: any) => ({
      id: l.id ?? null,
      language_name: l.languageName ?? '',
      proficiency_level: l.proficiencyLevel ?? '',
      position: l.position ?? 0,
    }))

    skills.value = (cv.skills ?? []).map((s: any) => ({
      id: s.id ?? null,
      skill_name: s.skillName ?? '',
      skill_description: '', // ton modèle front a skill_description mais pas en DB
      position: s.position ?? 0,
    }))

    interests.value = (cv.interests ?? []).map((i: any) => ({
      id: i.id ?? null,
      name: i.name ?? '',
      category: i.category ?? '',
      position: i.position ?? 0,
    }))

    certifications.value = (cv.certifications ?? []).map((c:any) => ({
      id: c.id,
      name: c.name,
      issuer: c.issuer,
      issueDate: c.issueDate,
      expirationDate: c.expirationDate,
      credentialUrl: c.credentialUrl,
      position: c.position
    }))

  }

  async function loadCv(cvId: number) {
    loading.value = true
    error.value = null
    try {
      const res = await apiGetCv(cvId)
      const cv = res.data ?? res
      setCvId(cvId)
      hydrateFromBackend(cv)
    } catch (e: any) {
      error.value = e?.response?.data?.message || 'Failed to load CV'
      throw e
    } finally {
      loading.value = false
    }
  }

  function resetCv() {
    currentCvId.value = null
    educations.value = []
    experiences.value = []
    languages.value = []
    skills.value = []
    certifications.value = []
    interests.value = []
  }

  async function selectCv(cvId: number) {
    setCvId(cvId)
    await loadCv(cvId)
  }

  async function createAndSelectCv(title: string) {
    const id = await createEmptyCv(title)
    await loadMyCvs()
    if (id) await loadCv(id)
    return id
  }

  async function deleteCv(cvId: number) {
    loading.value = true
    error.value = null
    try {
      await apiDeleteCv(cvId)
      await loadMyCvs()
    } catch (e: any) {
      error.value = e?.response?.data?.message || 'Failed to delete CV'
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Assure qu'on a un cvId :
   * - 1) si query cvId existe -> loadCv(cvId)
   * - 2) sinon si currentCvId existe -> loadCv(currentCvId)
   * - 3) sinon -> loadMyCvs() puis prendre le premier
   */
  async function ensureCurrentCv(optionalCvId?: number | null) {
    // 1) cvId en param (ex: query)
    console.log('Optional', optionalCvId)
    if (optionalCvId) {
      await loadCv(optionalCvId)
      return optionalCvId
    }

    // 2) déjà en mémoire
    console.log('déjà en mémoire', currentCvId.value)
    if (currentCvId.value) {
      await loadCv(currentCvId.value)
      return currentCvId.value
    }

    // 3) fallback: liste des cvs -> premier
    const list = await loadMyCvs()
    const first = list[0]

    if (!first) {
      // aucun CV => créer un CV vide (si tu veux)
      const err: any = new Error('No CV found for this user')
      err.statusCode = 404
      throw err
    }

    await loadCv(first.id)
    return first.id
  }

  const userProfilePicture = ref<string>('')

  function setUserProfilePicture(url: string) {
    userProfilePicture.value = url || ''
  }
  return {
    currentCvId,
    myCvs,
    loading,
    error,
    loadMyCvs,
    ensureCurrentCv,
    createEmptyCv,
    resetCv,
    setCvId,
    loadCv,
    hydrateFromBackend,
    selectCv,
    createAndSelectCv,
    deleteCv,
    userProfilePicture,
    setUserProfilePicture,
    profile,
    user,
    summary,
    educations,
    experiences,
    languages,
    skills,
    socialNetworks,
    certifications,
    interests,
  };
});
