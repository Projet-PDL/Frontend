import http from './http'

export type ProfileDTO = {
  firstName?: string
  lastName?: string
  headline?: string
  professionalSummary?: string
  email?: string
  phone?: string
  street?: string
  city?: string
  postalCode?: string
  region?: string
  country?: string
  websiteUrl?: string
}

export async function createProfileInfo(cvId: number, dto?: ProfileDTO) {
  const { data } = await http.post(`/cvs/${cvId}/profile-info`, dto)
  return data
}

export async function updateProfileInfo(cvId: number, dto: ProfileDTO) {
  const { data } = await http.put(`/cvs/${cvId}/profile-info`, dto)
  return data
}