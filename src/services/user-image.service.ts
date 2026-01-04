import http from './http'

export type MeImageResponse = {
  success: true
  data: {
    id: number
    email: string
    name: string
    profilePicture: string | null
  }
}

export type UploadImageResponse = {
  success: true
  data: {
    imageUrl: string
  }
}

export async function apiGetMyImage() {
  const { data } = await http.get<MeImageResponse>('/users/me/image')
  return data
}

export async function apiUploadMyImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await http.put<UploadImageResponse>('/users/me/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data
}