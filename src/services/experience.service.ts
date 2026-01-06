import http from './http'

export type ExperienceDTO = {
  title?: string
  company?: string
  location?: string
  startDate?: string // ISO
  endDate?: string   // ISO
  isCurrent?: boolean
  description?: string
  position?: number
}

export async function apiCreateExperience(cvId: number, dto: ExperienceDTO) {
  const { data } = await http.post(`/cvs/${cvId}/experience`, dto)
  return data
}

export async function apiUpdateExperience(cvId: number, expId: number, dto: ExperienceDTO) {
  const { data } = await http.put(`/cvs/${cvId}/experience/${expId}`, dto)
  return data
}

export async function apiDeleteExperience(cvId: number, expId: number) {
  const { data } = await http.delete(`/cvs/${cvId}/experience/${expId}`)
  return data
}