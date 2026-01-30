<script lang="ts">
  import { onMount } from 'svelte'
  import type { Engine, EngineFactory } from '../engines/types'
  import { observeResize } from '../shared/resize'

  export let create: EngineFactory<any>
  export let options: any = {}
  export let className = ''

  let host: HTMLDivElement
  let engine: Engine | null = null
  let stopResize: (() => void) | null = null

  onMount(() => {
    engine = create(host, options)
    if (engine?.resize) {
      stopResize = observeResize(host, ({ width, height, dpr }) => {
        engine?.resize?.(width, height, dpr)
      })
    }

    return () => {
      stopResize?.()
      engine?.destroy()
    }
  })
</script>

<div bind:this={host} class={className}></div>
