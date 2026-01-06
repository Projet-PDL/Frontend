// src/services/cvmanagement.service.ts
import http from './http'

export type GenerateFromLinkedInDTO = { linkedInUrl: string }

export type CvListItem = {
  id: number
  title: string | null
  createdAt: string
  updatedAt: string
}

export type CvListResponse = {
  success: true
  data: {
    items: CvListItem[]
    page: number
    size: number
    total: number
  }
}

export type CvGetResponse = {
  success: true
  data: {
    id: number
    title: string | null
    createdAt: string
    updatedAt: string

    profileInfo: {
      firstName?: string
      lastName?: string
      headline?: string
      professionalSummary?: string
      email?: string
      phone?: string
      city?: string
      country?: string
      // l’API ne renvoie pas street/postalCode/region/websiteUrl dans ton exemple
    } | null

    experiences: Array<{
      id: number
      title?: string
      company?: string
      startDate?: string
      endDate?: string
      isCurrent?: boolean
      description?: string
      position?: number
    }>

    educations: Array<{
      id: number
      school?: string
      degree?: string
      fieldOfStudy?: string
      startDate?: string
      endDate?: string
      description?: string
      position?: number
    }>

    skills: Array<{
      id: number
      skillName: string
      position?: number
    }>

    languages: Array<{
      id: number
      languageName: string
      proficiencyLevel?: string
      position?: number
    }>

    certifications: Array<{
      id: number
      name: string
      issuer?: string
      issueDate?: string
      expirationDate?: string
      credentialUrl?: string
      position?: number
    }>

    interests: Array<{
      id: number
      name: string
      category?: string
      source?: string
      position?: number
    }>
  }
}

/** Create empty CV */
export async function apiCreateCv(title?: string) {
  const { data } = await http.post('/cvs', title ? { title } : {})
  return data as { success: true; data: { id: number } } | any
}

/** List CVs */
export async function apiListCvs(params?: { q?: string; updatedAfter?: string; page?: number; size?: number }) {
  const { data } = await http.get<CvListResponse>('/cvs', { params })
  return data
}

/** Get CV by id */
export async function apiGetCv(cvId: number) {
  const { data } = await http.get<CvGetResponse>(`/cvs/${cvId}`)
  return data
}

/** Delete CV */
export async function apiDeleteCv(cvId: number) {
  const { data } = await http.delete(`/cvs/${cvId}`)
  return data
}

/** Generate CV from LinkedIn URL */
export async function apiGenerateCvFromLinkedIn(cvId: number, dto: GenerateFromLinkedInDTO) {
  const { data } = await http.post(`/cvs/${cvId}/generate-from-linkedin`, dto)
  return data
}