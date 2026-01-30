# ui-lab — Artful UI Playground (Svelte + TypeScript Engines)

A pure playground for learning + building **artsy minimalist UI effects** that can later be reused in client websites.

## Core idea
Svelte is only the **UI wrapper** (controls, layout).  
All rendering/effects live in **framework-agnostic TypeScript “engines”** so they can be ported to React/Next/Astro later with minimal effort.

## What you’ll build

### Level 2 — SVG + CSS
- gradients, masks, clip paths
- SVG filters (subtle turbulence, displacement)
- reusable motifs: section dividers, masked cards, ornamental overlays

### Level 3 — Canvas 2D
- particles (ambient drift background)
- noise/grain texture overlays (tasteful polish)
- procedural patterns (topography lines, trails)

### Level 4 — Shaders (WebGL first; optional WebGPU later)
- hero “liquid/metaballs” backgrounds
- displacement/refraction hover effect on images/cards
- film grain + vignette overlay
- fallback ladder: shader → canvas → static SVG/CSS

## Non-negotiables (production minded)
- `prefers-reduced-motion` support + manual “Pause effects”
- Low-power mode (reduce particle count / resolution / complexity)
- Visibility pause (stop loops when tab hidden)
- Resize + DPR correctness (no blur)
- Clean disposal (no memory leaks switching labs)

## Project structure (engine-first)
Svelte is the UI shell. Rendering code lives in framework-agnostic engines.

```
src/
  engines/        # pure TS engines (SVG / Canvas / WebGL)
    types.ts      # shared engine types
  labs/           # Svelte pages that host engines
  components/     # Svelte UI helpers (controls, layout)
  shared/         # utilities: raf, resize, visibility, reduced-motion
```

## Docs (open while building)
- Svelte onMount: https://svelte.dev/docs/svelte/svelte
- Svelte runes: https://svelte.dev/docs/svelte/what-are-runes
- prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- Page Visibility API: https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState
- ResizeObserver: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver
- devicePixelRatio: https://developer.mozilla.org/docs/Web/API/Window/devicePixelRatio
- requestAnimationFrame: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame.
- Canvas 2D: https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D
- SVG mask: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/mask
- SVG clipPath: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/clipPath
- SVG filters: https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_filters
- feTurbulence: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence
- feDisplacementMap: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap
- linearGradient: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/linearGradient
- radialGradient: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/radialGradient
- CSS mask-image: https://developer.mozilla.org/docs/Web/CSS/mask-image
- WebGL tutorial: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial

## Run
```bash
pnpm install
pnpm dev
