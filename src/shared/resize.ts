export type ResizeInfo = {
  width: number
  height: number
  dpr: number
}

export const observeResize = (
  element: HTMLElement,
  onResize: (info: ResizeInfo) => void
) => {
  let frame = 0
  let lastWidth = 0
  let lastHeight = 0

  const emit = (width: number, height: number) => {
    if (frame) cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      onResize({
        width,
        height,
        dpr: window.devicePixelRatio || 1,
      })
    })
  }

  const observer = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (!entry) return
    lastWidth = entry.contentRect.width
    lastHeight = entry.contentRect.height
    emit(lastWidth, lastHeight)
  })

  const handleWindowResize = () => {
    if (lastWidth && lastHeight) {
      emit(lastWidth, lastHeight)
      return
    }

    const rect = element.getBoundingClientRect()
    lastWidth = rect.width
    lastHeight = rect.height
    emit(lastWidth, lastHeight)
  }

  observer.observe(element)
  window.addEventListener('resize', handleWindowResize)
  handleWindowResize()

  return () => {
    if (frame) cancelAnimationFrame(frame)
    observer.disconnect()
    window.removeEventListener('resize', handleWindowResize)
  }
}
