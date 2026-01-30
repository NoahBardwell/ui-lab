import type { Engine } from '../types'

const SVG_NS = 'http://www.w3.org/2000/svg'

type SvgPlaceholderOptions = {
  label?: string
}

export const createSvgPlaceholder = (
  host: HTMLElement,
  options: SvgPlaceholderOptions = {}
): Engine => {
  const svg = document.createElementNS(SVG_NS, 'svg')
  const gradientId = `ui-lab-gradient-${Math.random().toString(36).slice(2)}`

  const baseWidth = 800
  const baseHeight = 400

  // viewBox defines a virtual drawing space; we update it on resize for easy layout math.
  svg.setAttribute('viewBox', `0 0 ${baseWidth} ${baseHeight}`)
  // Preserve the design proportions while letting the SVG cover the host surface.
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice')
  svg.setAttribute('aria-hidden', 'true')
  svg.style.width = '100%'
  svg.style.height = '100%'
  svg.style.display = 'block'

  const defs = document.createElementNS(SVG_NS, 'defs')
  const gradient = document.createElementNS(SVG_NS, 'linearGradient')
  // Gradients are referenced by id in later elements: fill="url(#id)".
  gradient.setAttribute('id', gradientId)
  // Explicitly set the gradient vector from top-left (0,0) to bottom-right (1,1).
  gradient.setAttribute('x1', '0')
  gradient.setAttribute('y1', '0')
  gradient.setAttribute('x2', '1')
  gradient.setAttribute('y2', '1')

  const stopA = document.createElementNS(SVG_NS, 'stop')
  // The first color stop starts the gradient in the top-left corner.
  stopA.setAttribute('offset', '0%')
  stopA.setAttribute('stop-color', '#f4ede4')

  const stopB = document.createElementNS(SVG_NS, 'stop')
  // The second stop ends the gradient at the bottom-right.
  stopB.setAttribute('offset', '100%')
  stopB.setAttribute('stop-color', '#d9c7b6')

  gradient.append(stopA, stopB)
  defs.append(gradient)

  const background = document.createElementNS(SVG_NS, 'rect')
  // This rect becomes the main background surface for the lab.
  background.setAttribute('x', '0')
  background.setAttribute('y', '0')
  background.setAttribute('width', `${baseWidth}`)
  background.setAttribute('height', `${baseHeight}`)
  // Apply the gradient defined in <defs> via a URL reference.
  background.setAttribute('fill', `url(#${gradientId})`)

  const ring = document.createElementNS(SVG_NS, 'circle')
  // Decorative ring adds a subtle focal point without dominating the scene.
  ring.setAttribute('cx', '620')
  ring.setAttribute('cy', '120')
  ring.setAttribute('r', '90')
  ring.setAttribute('fill', 'none')
  ring.setAttribute('stroke', '#5a4d41')
  ring.setAttribute('stroke-width', '1.5')
  ring.setAttribute('opacity', '0.35')

  const label = document.createElementNS(SVG_NS, 'text')
  label.setAttribute('x', '60')
  label.setAttribute('y', '310')
  label.setAttribute('fill', '#3a3128')
  label.setAttribute('font-size', '20')
  label.setAttribute('font-family', '"Space Grotesk", "Avenir Next", sans-serif')
  label.setAttribute('letter-spacing', '2')
  label.setAttribute('text-transform', 'uppercase')
  label.textContent = options.label ?? 'SVG engine placeholder'

  const applyLayout = (width: number, height: number) => {
    const safeWidth = Math.max(1, width)
    const safeHeight = Math.max(1, height)
    const shortSide = Math.min(safeWidth, safeHeight)

    svg.setAttribute('viewBox', `0 0 ${safeWidth} ${safeHeight}`)
    background.setAttribute('width', `${safeWidth}`)
    background.setAttribute('height', `${safeHeight}`)

    ring.setAttribute('cx', `${safeWidth * 0.78}`)
    ring.setAttribute('cy', `${safeHeight * 0.3}`)
    ring.setAttribute('r', `${shortSide * 0.22}`)
    ring.setAttribute('stroke-width', `${Math.max(1, shortSide * 0.004)}`)

    label.setAttribute('x', `${safeWidth * 0.08}`)
    label.setAttribute('y', `${safeHeight * 0.78}`)
    label.setAttribute(
      'font-size',
      `${Math.max(16, Math.min(26, safeHeight * 0.06))}`
    )
  }

  svg.append(defs, background, ring, label)
  host.appendChild(svg)

  const rect = host.getBoundingClientRect()
  if (rect.width && rect.height) {
    applyLayout(rect.width, rect.height)
  }

  return {
    resize(width, height) {
      applyLayout(width, height)
    },
    destroy() {
      svg.remove()
    },
  }
}
