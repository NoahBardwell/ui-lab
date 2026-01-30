<script lang="ts">
  import { onMount } from 'svelte'
  import type { Engine, EngineFactory } from '../engines/types'

  export let create: EngineFactory<any>
  export let options: any = {}
  export let className = ''

  let host: HTMLDivElement
  let engine: Engine | null = null

  onMount(() => {
    engine = create(host, options)
    return () => engine?.destroy()
  })
</script>

<div bind:this={host} class={className}></div>
