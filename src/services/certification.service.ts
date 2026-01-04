import http from './http'

export type CertificationDTO = {
  name: string
  issuer?: string
  issueDate?: string // ISO
  expirationDate?: string // ISO
  credentialUrl?: string
  position?: number
}

export async function apiCreateCertification(cvId: number, dto: CertificationDTO) {
  const { data } = await http.post(`/cvs/${cvId}/certification`, dto)
  return data
}

export async function apiUpdateCertification(cvId: number, certId: number, dto: CertificationDTO) {
  const { data } = await http.put(`/cvs/${cvId}/certification/${certId}`, dto)
  return data
}

export async function apiDeleteCertification(cvId: number, certId: number) {
  const { data } = await http.delete(`/cvs/${cvId}/certification/${certId}`)
  return data
}