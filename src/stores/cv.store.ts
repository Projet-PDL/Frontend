import { defineStore } from 'pinia'

export type Cv = {
  id: string
  languages?: any[]
  skills?: any[]
  interests?: any[]
  // autres sections plus tard (experience, education, etc.)
}

export const useCvStore = defineStore('cv', {
  state: () => ({
    cv: null as Cv | null
  }),

  getters: {
    languages: (state) => state.cv?.languages ?? [],
    skills: (state) => state.cv?.skills ?? [],
    interests: (state) => state.cv?.interests ?? []
  },

  actions: {
    setCv(cvData: Cv) {
      this.cv = cvData
    },

    clearCv() {
      this.cv = null
    },

    /* ===== LANGUAGES ===== */
    updateLanguages(languages: any[]) {
      if (!this.cv) return
      this.cv.languages = languages
    },

    /* ===== SKILLS ===== */
    updateSkills(skills: any[]) {
      if (!this.cv) return
      this.cv.skills = skills
    },

    /* ===== INTERESTS ===== */
    updateInterests(interests: any[]) {
      if (!this.cv) return
      this.cv.interests = interests
    }
  }
})
