<template>
  <div ref="containerRef" class="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-4">
    <!-- Map -->
    <div class="relative lg:flex-1 lg:min-w-0">
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
            :ref="el => setHotspotRef(spot.label, el)"
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

      <!-- Hover tooltip: only on screens too narrow for the side panel -->
      <div
        v-if="hoveredRange"
        class="lg:hidden pointer-events-none absolute z-20 w-56 max-w-[85%] rounded-lg border border-slate-700 bg-slate-900 p-3 text-left shadow-xl"
        :style="tooltipStyle"
      >
        <p class="text-white font-semibold text-xs mb-1">{{ hoveredRange.name }}</p>
        <p class="text-slate-300 text-xs leading-snug">{{ hoveredRange.desc }}</p>
      </div>

      <p class="lg:hidden text-slate-500 text-xs mt-3 text-center">Click a range on the map to jump to its details below.</p>
    </div>

    <!-- Side panel: one entry per range, connected to the map by a leader line -->
    <div v-if="isDesktop" class="relative z-10 flex flex-col gap-2 lg:w-64 xl:w-72 shrink-0">
      <button
        v-for="range in ranges" :key="range.id"
        :ref="el => setCalloutRef(range.id, el)"
        type="button"
        class="text-left rounded-lg border px-3 py-2 transition-colors duration-150 bg-slate-900"
        :class="isActive(range.id) ? 'border-amber-500 ring-1 ring-amber-500/40' : 'border-slate-700 hover:border-amber-700'"
        @click="select(range.id)"
        @mouseenter="hoverCallout(range.id)"
        @mouseleave="hoverCallout(null)"
      >
        <div class="flex items-center gap-2 mb-1">
          <span
            class="w-6 h-6 shrink-0 rounded bg-amber-950/50 light:bg-amber-100 border border-brand-800/50 flex items-center justify-center font-heading font-bold text-brand-300 light:text-brand-800 text-xs"
          >{{ range.id }}</span>
          <p class="text-white font-semibold text-xs leading-tight">{{ range.name }}</p>
        </div>
        <div class="flex flex-wrap gap-1">
          <span v-for="tag in range.tags" :key="tag"
            class="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
            {{ tag }}
          </span>
        </div>
      </button>
    </div>

    <!-- Leader lines connecting each hotspot to its side panel entry -->
    <svg
      v-if="isDesktop"
      class="pointer-events-none absolute inset-0 z-0 hidden lg:block"
      :width="overlaySize.w" :height="overlaySize.h"
      :viewBox="`0 0 ${overlaySize.w} ${overlaySize.h}`"
    >
      <line
        v-for="l in lines" :key="l.key"
        :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
        class="transition-colors duration-150"
        :class="isActive(l.rangeId) ? 'stroke-amber-400' : 'stroke-slate-600/40'"
        :stroke-width="isActive(l.rangeId) ? 2 : 1"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
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

interface Line {
  key: string
  rangeId: string
  x1: number
  y1: number
  x2: number
  y2: number
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

function hoverCallout(rangeId: string | null): void {
  emit('hover', rangeId)
}

function select(rangeId: string): void {
  emit('select', rangeId)
}

// --- Leader lines from each map hotspot to its side-panel entry ---
// Positions are measured from real DOM geometry (getBoundingClientRect)
// rather than computed from the SVG's viewBox, since the side panel lives
// outside the map's coordinate system entirely.

const containerRef = ref<HTMLElement | null>(null)
const hotspotEls = new Map<string, Element>()
const calloutEls = new Map<string, Element>()

function setHotspotRef(label: string, el: Element | null): void {
  if (el) hotspotEls.set(label, el)
  else hotspotEls.delete(label)
}

function setCalloutRef(rangeId: string, el: Element | null): void {
  if (el) calloutEls.set(rangeId, el)
  else calloutEls.delete(rangeId)
}

const isDesktop = ref(false)
const overlaySize = ref({ w: 0, h: 0 })
const lines = ref<Line[]>([])
let mql: MediaQueryList | null = null
let resizeObserver: ResizeObserver | null = null

function updateLines(): void {
  const container = containerRef.value
  if (!isDesktop.value || !container) {
    lines.value = []
    return
  }
  const containerRect = container.getBoundingClientRect()
  overlaySize.value = { w: containerRect.width, h: containerRect.height }

  const next: Line[] = []
  for (const spot of hotspots) {
    const hotspotEl = hotspotEls.get(spot.label)
    const calloutEl = calloutEls.get(spot.rangeId)
    if (!hotspotEl || !calloutEl) continue
    const h = hotspotEl.getBoundingClientRect()
    const c = calloutEl.getBoundingClientRect()
    next.push({
      key: spot.label,
      rangeId: spot.rangeId,
      x1: h.right - containerRect.left,
      y1: h.top + h.height / 2 - containerRect.top,
      x2: c.left - containerRect.left,
      y2: c.top + c.height / 2 - containerRect.top,
    })
  }
  lines.value = next
}

onMounted(() => {
  mql = window.matchMedia('(min-width: 1024px)')
  isDesktop.value = mql.matches
  mql.addEventListener('change', handleMqlChange)

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => updateLines())
    resizeObserver.observe(containerRef.value)
  }

  nextTick(updateLines)
})

function handleMqlChange(e: MediaQueryListEvent): void {
  isDesktop.value = e.matches
  nextTick(updateLines)
}

onUnmounted(() => {
  mql?.removeEventListener('change', handleMqlChange)
  resizeObserver?.disconnect()
})
</script>
