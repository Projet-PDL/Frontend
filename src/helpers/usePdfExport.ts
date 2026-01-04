import { ref } from 'vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { urlToDataURL } from './image'

const A4_W_PX = 794
const A4_H_PX = 1123

export function usePdfExport() {
  const isExporting = ref(false)
  const exportError = ref<string | null>(null)

  // mm
  const PDF_W_MM = 210
  const PDF_H_MM = 297

  // marge TOP/BOTTOM uniquement (mm)
  const MARGIN_Y_MM = 10
  const CONTENT_H_MM = PDF_H_MM - (MARGIN_Y_MM * 2)

  // px/mm basé sur largeur A4 (sans marge left/right)
  const PX_PER_MM = A4_W_PX / PDF_W_MM
  const PAGE_CONTENT_H_PX = Math.floor(CONTENT_H_MM * PX_PER_MM)

  async function waitForFonts() {
    // @ts-ignore
    if (document.fonts?.ready) {
      // @ts-ignore
      await document.fonts.ready
    }
  }

  async function prepareImages(element: HTMLElement) {
    const imgs = Array.from(element.querySelectorAll('img'))

    for (const img of imgs) {
      // Forcer crossOrigin (utile si jamais tu as des images publiques)
      img.crossOrigin = 'anonymous'

      // attendre qu'elle soit "complete"
      if (!img.complete) {
        await new Promise<void>((resolve) => {
          img.onload = () => resolve()
          img.onerror = () => resolve()
        })
      }

      const src = img.getAttribute('src') || ''
      if (!src) continue

      try {
        img.dataset.originalSrc = src

        // convertir en dataURL (auth ok)
        const dataUrl = await urlToDataURL(src)
        img.setAttribute('src', dataUrl)

        // attendre que le navigateur décode l'image (important !)
        // (sinon html2canvas peut snap avant que l'image soit réellement prête)
        // @ts-ignore
        if (img.decode) {
          await img.decode().catch(() => {})
        } else {
          await new Promise((r) => setTimeout(r, 30))
        }
      } catch (e) {
        console.warn('Image non convertible, on garde src:', src, e)
      }
    }

    await new Promise((r) => setTimeout(r, 60))
  }

  function restoreImages(element: HTMLElement) {
    const imgs = Array.from(element.querySelectorAll('img'))
    for (const img of imgs) {
      const original = img.dataset.originalSrc
      if (original) {
        img.setAttribute('src', original)
        delete img.dataset.originalSrc
      }
    }
  }

  function computeBreakpoints(root: HTMLElement) {
    const candidates = [
      ...Array.from(root.querySelectorAll('.section-block')),
      ...Array.from(root.querySelectorAll('.edu-item')),
      ...Array.from(root.querySelectorAll('section'))
    ] as HTMLElement[]

    const rootTop = root.getBoundingClientRect().top + window.scrollY

    const ys = candidates
      .map((el) => {
        const r = el.getBoundingClientRect()
        return Math.floor(r.top + window.scrollY - rootTop)
      })
      .filter((y) => y > 0)
      .sort((a, b) => a - b)

    ys.push(root.scrollHeight)
    return Array.from(new Set(ys))
  }

  function pickNextBreak(startY: number, breakpoints: number[], totalH: number) {
    const limit = startY + PAGE_CONTENT_H_PX

    let best = -1
    for (const y of breakpoints) {
      if (y <= limit && y > startY + 50) best = y
      if (y > limit) break
    }

    return best > 0 ? best : Math.min(limit, totalH)
  }

  function createOffscreenClone(element: HTMLElement) {
    const wrapper = document.createElement('div')
    wrapper.style.position = 'fixed'
    wrapper.style.left = '-99999px'
    wrapper.style.top = '0'
    wrapper.style.width = `${A4_W_PX}px`
    wrapper.style.background = '#fff'
    wrapper.style.zIndex = '99999'

    const clone = element.cloneNode(true) as HTMLElement
    clone.style.width = `${A4_W_PX}px`
    clone.style.margin = '0'
    clone.style.boxShadow = 'none'

    wrapper.appendChild(clone)
    document.body.appendChild(wrapper)
    return { wrapper, clone }
  }

  async function exportToPdf(element: HTMLElement, filename = 'cv.pdf') {
    isExporting.value = true
    exportError.value = null

    let offscreen: { wrapper: HTMLElement; clone: HTMLElement } | null = null

    try {
      await waitForFonts()

      offscreen = createOffscreenClone(element)
      const target = offscreen.clone

      await prepareImages(target)

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      const breakpoints = computeBreakpoints(target)
      const totalH = target.scrollHeight

      let startY = 0
      let page = 0

      while (startY < totalH - 2) {
        const endY = pickNextBreak(startY, breakpoints, totalH)
        const sliceH = Math.max(1, endY - startY)

        const canvas = await html2canvas(target, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: A4_W_PX,
          height: sliceH,
          windowWidth: A4_W_PX,
          windowHeight: sliceH,
          x: 0,
          y: startY
        })

        const imgData = canvas.toDataURL('image/png', 1.0)

        if (page > 0) pdf.addPage()

        // marge top/bottom : y=MARGIN_Y_MM
        const drawW = PDF_W_MM
        const drawH = (drawW * canvas.height) / canvas.width // hauteur proportionnelle

        pdf.addImage(
          imgData,
          'PNG',
          0,
          MARGIN_Y_MM,
          drawW,
          drawH,
          undefined,
          'FAST'
        )

        page++
        startY = endY
      }

      restoreImages(target)
      pdf.save(filename)
    } catch (e) {
      console.error('Export PDF error:', e)
      exportError.value = "Une erreur est survenue lors de l'export PDF"
      throw e
    } finally {
      isExporting.value = false
      if (offscreen) offscreen.wrapper.remove()
    }
  }

  return { exportToPdf, isExporting, exportError }
}
