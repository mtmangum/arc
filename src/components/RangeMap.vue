<template>
  <div class="relative">
    <svg viewBox="0 0 1500 972" class="w-full h-auto select-none rounded-lg overflow-hidden" role="img" aria-label="Aerial map of the Austin Rifle Club range complex">
      <image :href="mapImage" x="0" y="0" width="1500" height="972" preserveAspectRatio="xMidYMid slice" />

      <!-- Range hotspots -->
      <g
        v-for="spot in hotspots"
        :key="spot.label"
        class="cursor-pointer"
        @click="select(spot.rangeId)"
        @mouseenter="setHover(spot)"
        @mouseleave="setHover(null)"
      >
        <rect
          :x="spot.x" :y="spot.y" :width="spot.w" :height="spot.h" rx="6"
          class="transition-colors duration-150"
          :class="isActive(spot.rangeId)
            ? 'fill-amber-500/40 stroke-amber-400'
            : 'fill-[rgba(255,255,255,0.15)] stroke-[rgba(255,255,255,0.7)] hover:fill-amber-500/30 hover:stroke-amber-400'"
          stroke-width="2"
        />
        <text
          :x="spot.x + spot.w / 2" :y="spot.y + spot.h / 2 + 6" text-anchor="middle"
          class="pointer-events-none font-heading font-bold"
          :class="isActive(spot.rangeId) ? 'fill-amber-300' : 'fill-[#ffffff]'"
          style="font-size: 20px; paint-order: stroke fill; stroke: #0f172a; stroke-width: 4px; stroke-linejoin: round;"
        >{{ spot.label }}</text>
      </g>
    </svg>

    <!-- Hover tooltip with quick info about the hovered range -->
    <div
      v-if="hoveredRange"
      class="pointer-events-none absolute z-20 w-56 max-w-[85%] rounded-lg border border-slate-700 bg-slate-900 p-3 text-left shadow-xl"
      :style="tooltipStyle"
    >
      <p class="text-white font-semibold text-xs mb-1">{{ hoveredRange.name }}</p>
      <p class="text-slate-300 text-xs leading-snug">{{ hoveredRange.desc }}</p>
    </div>

    <p class="text-slate-500 text-xs mt-3 text-center">Click a range on the map to jump to its details below.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import mapImage from '@/assets/map.jpg'

interface Hotspot {
  rangeId: string
  label: string
  x: number
  y: number
  w: number
  h: number
}

interface RangeInfo {
  id: string
  name: string
  desc: string
  tags: string[]
}

const props = defineProps<{ activeId: string | null; ranges: RangeInfo[] }>()
const emit = defineEmits<{ select: [id: string]; hover: [id: string | null] }>()

const buildingHotspots: Hotspot[] = [
  { rangeId: 'A', label: 'A', x: 388, y: 293, w: 138, h: 100 },
  { rangeId: 'B', label: 'B', x: 538, y: 348, w: 65, h: 78 },
  { rangeId: 'C', label: 'C', x: 636, y: 468, w: 160, h: 55 },
  { rangeId: 'D', label: 'D', x: 782, y: 458, w: 128, h: 65 },
  { rangeId: 'E', label: 'E', x: 914, y: 458, w: 128, h: 65 },
  { rangeId: 'F', label: 'F', x: 278, y: 790, w: 82, h: 75 },
]

const bayOrder = ['L', 'K', 'J', 'I', 'H', 'G']
const bayRangeId: Record<string, string> = {
  L: 'L',
  K: 'H-K',
  J: 'H-K',
  I: 'H-K',
  H: 'H-K',
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
// G and H sit closer together than the linear step predicts — nudge them so
// each hotspot hugs its actual bay without overlapping its neighbor's center.
const gSpot = bayHotspots.find(s => s.label === 'G')!
gSpot.x = 682
gSpot.y = 787
gSpot.w = 96
gSpot.h = 52

const hSpot = bayHotspots.find(s => s.label === 'H')!
hSpot.x = 630
hSpot.y = 750
hSpot.w = 85
hSpot.h = 45

const hotspots: Hotspot[] = [...buildingHotspots, ...bayHotspots]

function isActive(rangeId: string): boolean {
  return props.activeId === rangeId
}

const hoveredSpot = ref<Hotspot | null>(null)
const rangeById = computed(() => Object.fromEntries(props.ranges.map(r => [r.id, r])))
const hoveredRange = computed(() => (hoveredSpot.value ? rangeById.value[hoveredSpot.value.rangeId] : null))

const MAP_W = 1500
const MAP_H = 972

const tooltipStyle = computed(() => {
  const spot = hoveredSpot.value
  if (!spot) return {}

  const leftPct = ((spot.x + spot.w / 2) / MAP_W) * 100
  const topPct = (spot.y / MAP_H) * 100
  const bottomPct = ((spot.y + spot.h) / MAP_H) * 100
  const style: Record<string, string> = {}

  if (leftPct < 22) {
    style.left = `${(spot.x / MAP_W) * 100}%`
  } else if (leftPct > 78) {
    style.right = `${100 - ((spot.x + spot.w) / MAP_W) * 100}%`
  } else {
    style.left = `${leftPct}%`
    style.transform = 'translateX(-50%)'
  }

  if (topPct > 55) {
    style.bottom = `${100 - topPct + 1.5}%`
  } else {
    style.top = `${bottomPct + 1.5}%`
  }

  return style
})

function setHover(spot: Hotspot | null): void {
  hoveredSpot.value = spot
  emit('hover', spot ? spot.rangeId : null)
}

function select(rangeId: string): void {
  emit('select', rangeId)
}
</script>
