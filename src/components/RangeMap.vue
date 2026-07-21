<template>
  <div>
    <svg viewBox="0 0 1500 972" class="w-full h-auto select-none rounded-lg overflow-hidden" role="img" aria-label="Aerial map of the Austin Rifle Club range complex">
      <image :href="mapImage" x="0" y="0" width="1500" height="972" preserveAspectRatio="xMidYMid slice" />

      <!-- Range hotspots -->
      <g
        v-for="spot in hotspots"
        :key="spot.label"
        class="cursor-pointer"
        @click="select(spot.rangeId)"
        @mouseenter="setHover(spot.rangeId)"
        @mouseleave="setHover(null)"
      >
        <rect
          :x="spot.x" :y="spot.y" :width="spot.w" :height="spot.h" rx="6"
          class="transition-colors duration-150"
          :class="isActive(spot.rangeId)
            ? 'fill-amber-500/40 stroke-amber-400'
            : 'fill-white/10 stroke-white/60 hover:fill-amber-500/30 hover:stroke-amber-400'"
          stroke-width="2"
        />
        <text
          :x="spot.x + spot.w / 2" :y="spot.y + spot.h / 2 + 6" text-anchor="middle"
          class="pointer-events-none font-heading font-bold"
          :class="isActive(spot.rangeId) ? 'fill-amber-300' : 'fill-white'"
          style="font-size: 20px; paint-order: stroke fill; stroke: #0f172a; stroke-width: 4px; stroke-linejoin: round;"
        >{{ spot.label }}</text>
      </g>
    </svg>

    <p class="text-slate-500 text-xs mt-3 text-center">Click a range on the map to jump to its details below.</p>
  </div>
</template>

<script setup lang="ts">
import mapImage from '@/assets/map.jpg'

interface Hotspot {
  rangeId: string
  label: string
  x: number
  y: number
  w: number
  h: number
}

const props = defineProps<{ activeId: string | null }>()
const emit = defineEmits<{ select: [id: string]; hover: [id: string | null] }>()

const buildingHotspots: Hotspot[] = [
  { rangeId: 'A', label: 'A', x: 388, y: 293, w: 138, h: 100 },
  { rangeId: 'B', label: 'B', x: 538, y: 348, w: 65, h: 78 },
  { rangeId: 'C', label: 'C', x: 636, y: 468, w: 160, h: 55 },
  { rangeId: 'D & E', label: 'D · E', x: 782, y: 458, w: 260, h: 65 },
]

const bayOrder = ['L', 'K', 'J', 'I', 'H', 'G']
const bayRangeId: Record<string, string> = {
  L: 'H–L',
  K: 'H–L',
  J: 'I & J',
  I: 'I & J',
  H: 'H–L',
  G: 'G',
}
const bayHotspots: Hotspot[] = bayOrder.map((label, i) => ({
  rangeId: bayRangeId[label],
  label,
  x: 415 + i * 57,
  y: 560 + i * 50,
  w: 105,
  h: 62,
}))
// G sits closer to the entrance pin than the linear step predicts — nudge it
// up and left so the hotspot hugs the actual bay instead of the pin label.
const gSpot = bayHotspots.find(s => s.label === 'G')!
gSpot.x = 682
gSpot.y = 787
gSpot.w = 96
gSpot.h = 52

const hotspots: Hotspot[] = [...buildingHotspots, ...bayHotspots]

function isActive(rangeId: string): boolean {
  return props.activeId === rangeId
}

function setHover(rangeId: string | null): void {
  emit('hover', rangeId)
}

function select(rangeId: string): void {
  emit('select', rangeId)
}
</script>
