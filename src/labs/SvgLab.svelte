<script lang="ts">
  import EngineHost from '../components/EngineHost.svelte'
  import { createSvgPlaceholder } from '../engines/svg/placeholder'
</script>

<section class="lab">
  <header class="lab-header">
    <div>
      <p class="lab-kicker">Level 2 · SVG + CSS</p>
      <h2>SVG Lab</h2>
      <p class="lab-desc">
        First engine mount. This placeholder will be replaced with gradients, masks,
        and filters once we build the real SVG engine.
      </p>
    </div>
  </header>

  <EngineHost
    className="lab-host"
    create={createSvgPlaceholder}
    options={{ label: 'UI Lab — SVG engine' }}
  />
</section>
