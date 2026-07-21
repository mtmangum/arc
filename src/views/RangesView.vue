<template>
  <div>
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-inner">
        <span class="text-amber-600 text-sm font-semibold uppercase tracking-widest">Facilities</span>
        <h1 class="section-heading mt-2 mb-3">Our Ranges</h1>
        <p class="section-sub max-w-xl">
          Multiple bays serving a wide variety of shooting disciplines — from 10m air pistol to 200yd centerfire rifle.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <!-- Building map -->
      <div class="card mb-14 overflow-hidden p-0">
        <div class="bg-slate-800/50 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <h2 class="font-heading text-lg font-semibold text-white">Range Complex Map</h2>
          <a
            href="https://www.google.com/maps/search/?api=1&query=16312+Littig+Rd,+Manor,+TX+78653"
            target="_blank" rel="noopener"
            class="text-slate-400 hover:text-amber-600 text-xs transition-colors"
          >16312 Littig Rd, Manor, TX 78653</a>
        </div>
        <div class="p-4 md:p-8 bg-slate-900">
          <RangeMap :active-id="highlightId" :ranges="ranges" @select="handleMapSelect" @hover="id => (hoveredId = id)" />
        </div>
      </div>

      <!-- Ranges at a glance -->
      <h2 class="font-heading text-2xl font-bold text-white mb-6">Ranges at a Glance</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        <div
          v-for="range in ranges" :key="range.id"
          :id="'range-' + slug(range.id)"
          class="card-hover scroll-mt-40 transition-colors"
          :class="highlightId === range.id ? 'border-amber-600 ring-1 ring-amber-600/50' : ''"
          @mouseenter="hoveredId = range.id"
          @mouseleave="hoveredId = null"
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="w-9 h-9 rounded-lg bg-amber-950/50 light:bg-amber-100 border border-brand-800/50 flex items-center justify-center font-heading font-bold text-brand-300 light:text-brand-800 text-sm">
              {{ range.id }}
            </span>
            <h3 class="text-white font-semibold text-sm">{{ range.name }}</h3>
          </div>
          <p class="text-slate-400 text-xs leading-relaxed mb-3">{{ range.desc }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in range.tags" :key="tag"
              class="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Quick stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
        <div v-for="s in quickStats" :key="s.label" class="card text-center">
          <p class="text-2xl font-heading font-bold text-amber-600 mb-1">{{ s.value }}</p>
          <p class="text-slate-400 text-xs">{{ s.label }}</p>
        </div>
      </div>

      <!-- Parking info -->
      <div class="grid md:grid-cols-2 gap-6 mb-14">
        <div class="card">
          <h3 class="font-heading text-base font-bold text-white mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7"/>
            </svg>
            North Side Parking (Ranges A–E)
          </h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            Park directly in front of shooting positions at each range. Parking on the grass
            across the road is also acceptable — stay on the road until you reach your parking spot.
            Do not drive on the grass.
          </p>
        </div>
        <div class="card">
          <h3 class="font-heading text-base font-bold text-white mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7"/>
            </svg>
            South Side Parking (Ranges G–L)
          </h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            Use the designated parking area or park off the service road — keep the road clear.
            If parking is full during a match, use the grassy area on the north side of the creek.
            If you're the only one on a bay, parking beside or behind the covered firing line is fine.
          </p>
        </div>
      </div>

      <!-- Gate access -->
      <div class="card bg-amber-950/20 border-brand-800/50">
        <h3 class="font-heading text-base font-bold text-white mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
          </svg>
          Badge Gate Access
        </h3>
        <ul class="space-y-2 text-sm text-slate-300">
          <li class="flex items-start gap-2">
            <span class="text-amber-600 font-bold mt-0.5">→</span>
            Place your ARC badge on the black keypad (accessible through the driver's side window).
          </li>
          <li class="flex items-start gap-2">
            <span class="text-amber-600 font-bold mt-0.5">→</span>
            <strong class="text-white">Triple beep</strong> = access granted. <strong class="text-white">Long solid beep</strong> = lapsed or suspended membership.
          </li>
          <li class="flex items-start gap-2">
            <span class="text-amber-600 font-bold mt-0.5">→</span>
            Always scan your badge <strong class="text-white">when entering AND exiting</strong>. Never tailgate or allow another vehicle to follow you through.
          </li>
        </ul>
      </div>

      <!-- Range hours -->
      <div class="mt-6 card">
        <h3 class="font-heading text-base font-bold text-white mb-2">Range Hours</h3>
        <p class="text-slate-300 text-sm">
          7 days a week, <strong class="text-white">30 minutes before sunrise</strong> to <strong class="text-white">30 minutes after sunset</strong>,
          including holidays. Please be considerate of neighbors.
          After hours, members may be on the property but shooting is not permitted.
        </p>
        <p class="text-slate-400 text-xs mt-2">
          Partial and full closures (Work Days, matches, events) are shown on the <RouterLink to="/calendar" class="text-amber-600 hover:underline">calendar</RouterLink>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import RangeMap from '@/components/RangeMap.vue'

// Hover is transient (live preview while the pointer is over a hotspot/card);
// selected persists after a click so the highlight doesn't vanish the instant
// the mouse leaves the hotspot. Hover takes priority when present.
const hoveredId = ref<string | null>(null)
const selectedId = ref<string | null>(null)
const highlightId = computed(() => hoveredId.value ?? selectedId.value)

function slug(id: string): string {
  return id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function handleMapSelect(id: string): void {
  selectedId.value = id
  const element = document.getElementById(`range-${slug(id)}`)
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

// Range ids are fixed in code because RangeMap.vue's hotspots link to them
// by id — only name/desc/tags are CMS-editable, in src/content/ranges/*.json.
import rangeA from '@/content/ranges/a.json'
import rangeB from '@/content/ranges/b.json'
import rangeC from '@/content/ranges/c.json'
import rangeD from '@/content/ranges/d.json'
import rangeE from '@/content/ranges/e.json'
import rangeG from '@/content/ranges/g.json'
import rangeHK from '@/content/ranges/h-k.json'
import rangeL from '@/content/ranges/l.json'
import rangeF from '@/content/ranges/f.json'
import quickStatsContent from '@/content/rangesQuickStats.json'

const ranges = [
  { id: 'A', ...rangeA },
  { id: 'B', ...rangeB },
  { id: 'C', ...rangeC },
  { id: 'D', ...rangeD },
  { id: 'E', ...rangeE },
  { id: 'G', ...rangeG },
  { id: 'H-K', ...rangeHK },
  { id: 'L', ...rangeL },
  { id: 'F', ...rangeF },
]

const quickStats = quickStatsContent.quickStats
</script>
