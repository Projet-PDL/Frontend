import http from './http'

export type EducationDTO = {
  school?: string
  degree?: string
  fieldOfStudy?: string
  startDate?: string
  endDate?: string
  description?: string
  position?: number
}

export async function apiCreateEducation(cvId: number, dto: EducationDTO) {
  const { data } = await http.post(`/cvs/${cvId}/education`, dto)
  return data
}

export async function apiUpdateEducation(cvId: number, eduId: number, dto: EducationDTO) {
  const { data } = await http.put(`/cvs/${cvId}/education/${eduId}`, dto)
  return data
}

export async function apiDeleteEducation(cvId: number, eduId: number) {
  const { data } = await http.delete(`/cvs/${cvId}/education/${eduId}`)
  return data
}
