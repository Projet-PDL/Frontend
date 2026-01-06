import http from '@/services/http'

export async function urlToDataURL(src: string): Promise<string> {
  if (!src) return ''
  if (src.startsWith('data:')) return src

  console.log("URL: " + src)
  // IMPORTANT: axios blob + FileReader (gère Authorization via interceptor)
  const res = await http.get(src, { responseType: 'blob' })
  console.log("Response: " + res)
  const blob: Blob = res.data

  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
