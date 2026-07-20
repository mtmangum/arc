<template>
  <div>
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-inner">
        <span class="text-amber-600 text-sm font-semibold uppercase tracking-widest">Schedule</span>
        <h1 class="section-heading mt-2 mb-3">Event Calendar</h1>
        <p class="section-sub max-w-xl">
          Check before you come — matches and events reserve specific ranges. Click any event for details.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- Loading / error states -->
      <p v-if="calendarEventsLoading && calendarEvents.length === 0" class="text-slate-400 text-sm mb-6">
        Loading events…
      </p>
      <div v-if="calendarEventsError" class="rounded-lg bg-red-900/30 border border-red-800 px-4 py-3 text-red-300 text-sm mb-6">
        Couldn't load events: {{ calendarEventsError }}
      </div>

      <!-- Calendars and Legend -->
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-10">
        <!-- Mini Calendars -->
        <div class="w-full lg:w-3/4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div v-for="month in [0, 1]" :key="month" class="card p-4 sm:p-6" :class="month === mobileSlot ? '' : 'hidden sm:block'">
              <div class="flex items-center justify-between mb-4">
                <!-- Left slot: the first card always owns the prev arrow -->
                <button v-if="month === 0" type="button" @click="monthOffset--" aria-label="Previous month"
                  class="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-amber-800/60 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <template v-else>
                  <!-- If the second card is the one shown alone on mobile, it needs its own prev arrow too -->
                  <button v-if="month === mobileSlot" type="button" @click="monthOffset--" aria-label="Previous month"
                    class="sm:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-amber-800/60 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span class="w-8 h-8" :class="month === mobileSlot ? 'hidden sm:block' : ''" />
                </template>

                <h3 class="text-white font-semibold text-sm text-center flex-1">
                  {{ new Date(2026, monthIndex(month), 1).toLocaleString('default', { month: 'long', year: 'numeric' }) }}
                </h3>

                <!-- Right slot: the second card always owns the next arrow -->
                <button v-if="month === 1" type="button" @click="monthOffset++" aria-label="Next month"
                  class="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-amber-800/60 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <template v-else>
                  <!-- If the first card is the one shown alone on mobile, it needs its own next arrow too -->
                  <button v-if="month === mobileSlot" type="button" @click="monthOffset++" aria-label="Next month"
                    class="sm:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-amber-800/60 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <span class="w-8 h-8" :class="month === mobileSlot ? 'hidden sm:block' : ''" />
                </template>
              </div>
              <div class="grid grid-cols-7 gap-1 text-xs text-center">
                <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="text-slate-500 font-semibold py-1">
                  {{ day }}
                </div>
                <button v-for="(date, idx) in getCalendarDays(monthIndex(month))" :key="idx"
                  @click="date && hasEvents(date, monthIndex(month)) ? scrollToDate(date, monthIndex(month)) : null"
                  class="relative group h-8 sm:h-7 flex items-center justify-center rounded text-xs transition-colors font-semibold"
                  :class="date && hasEvents(date, monthIndex(month))
                    ? getCalendarDayColors(date, monthIndex(month))
                    : date
                      ? 'text-slate-500 cursor-default bg-transparent border-0'
                      : 'text-slate-600 cursor-default bg-transparent border-0'"
                >
                  {{ date }}

                  <!-- Hover tooltip listing the day's events -->
                  <div v-if="date && hasEvents(date, monthIndex(month))"
                    class="pointer-events-none absolute z-20 hidden group-hover:block top-full mt-2 w-56 sm:w-60 max-w-[85vw] rounded-lg border border-slate-700 bg-slate-900 p-3 text-left shadow-xl"
                    :class="idx % 7 <= 1 ? 'left-0' : idx % 7 >= 5 ? 'right-0' : 'left-1/2 -translate-x-1/2'"
                  >
                    <p class="text-white font-semibold text-xs mb-2">
                      {{ new Date(2026, monthIndex(month), date).toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' }) }}
                    </p>
                    <ul class="space-y-1.5">
                      <li v-for="ev in getEventsForDay(date, monthIndex(month))" :key="ev.title" class="flex items-start gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full mt-1 shrink-0" :class="getEventTypeStyle(ev.type).dot" />
                        <span class="text-slate-300 text-xs leading-snug font-normal">{{ ev.title }}</span>
                      </li>
                    </ul>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="flex flex-row flex-wrap lg:flex-col gap-2 lg:gap-3 w-full lg:w-1/4">
          <button v-for="cat in categories" :key="cat.label"
            type="button"
            @click="toggleType(cat.label)"
            @dblclick="isolateType(cat.label)"
            :aria-pressed="isTypeActive(cat.label)"
            title="Click to show/hide. Double-click to isolate."
            class="badge gap-1.5 py-1 px-3 w-fit transition-opacity cursor-pointer"
            :class="[cat.classes, isTypeActive(cat.label) ? '' : 'opacity-40 grayscale']"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="cat.dot" />
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- Month heading -->
      <div class="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="font-heading text-2xl font-bold text-white">{{ monthRangeLabel }}</h2>
          <button v-if="monthOffset !== 0" type="button" @click="monthOffset = 0"
            class="text-xs font-semibold text-amber-600 hover:text-amber-400 uppercase tracking-wide transition-colors">
            Back to Today
          </button>
        </div>
        <span class="text-slate-400 text-sm">{{ visibleMonthEvents.length }} events shown</span>
      </div>

      <!-- Events grid -->
      <p v-if="visibleMonthEvents.length === 0" class="text-slate-400 text-sm">
        No events match the selected filters.
      </p>
      <div v-else class="space-y-3">
        <div
          v-for="(dayEvents, date) in groupedEvents"
          :key="date"
          :id="'event-' + date"
          class="card-hover flex flex-col gap-4 scroll-mt-40 transition-colors p-4"
        >
          <!-- Date bubble -->
          <div class="flex items-start gap-4">
            <div class="shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center border border-slate-700 bg-slate-800">
              <span class="text-xs font-semibold text-slate-400 uppercase">{{ dayEvents[0].month }}</span>
              <span class="text-2xl font-heading font-bold text-white leading-none">{{ dayEvents[0].day }}</span>
            </div>

            <!-- Events for this day -->
            <div class="flex-1 min-w-0">
              <div v-for="(event, idx) in dayEvents" :key="event.title" class="flex flex-col items-start sm:flex-row sm:items-center gap-3 mb-3 pb-3" :class="idx < dayEvents.length - 1 ? 'border-b border-slate-700' : ''">
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-1">
                    <span class="badge py-0.5 px-2 text-xs" :class="getCategoryClasses(event.type)">
                      {{ event.type }}
                    </span>
                    <span v-if="event.restricted" class="badge py-0.5 px-2 text-xs bg-red-900/40 text-red-300 border border-red-800">
                      Members Only
                    </span>
                  </div>
                  <h3 class="text-white font-semibold text-sm leading-snug">{{ event.title }}</h3>
                  <p class="text-slate-400 text-xs mt-0.5">{{ event.venue }}</p>
                </div>

                <!-- Arrow -->
                <a v-if="event.url" :href="event.url" target="_blank" rel="noopener"
                  :class="['shrink-0 p-2 rounded-lg transition-colors', ...getLinkColorClasses(event.type)]">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info note -->
      <div class="mt-10 card bg-amber-950/20 border-brand-800/50">
        <div class="flex gap-3">
          <svg class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-slate-300 text-sm leading-relaxed">
            Always check the calendar before visiting. Ranges reserved for matches are not available for
            general use. Non-members are welcome to participate in matches — contact the match director
            via the event link above.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  calendarEvents,
  calendarEventsLoading,
  calendarEventsError,
  fetchCalendarEvents,
  EVENT_TYPE_STYLES,
  getEventTypeStyle,
  type CalendarEvent,
} from '@/data/calendarEvents'

onMounted(() => {
  fetchCalendarEvents()
})

const categories = Object.entries(EVENT_TYPE_STYLES).map(([label, style]) => ({
  label,
  classes: style.badge,
  dot: style.dot,
}))

const activeTypes = ref<Set<string>>(new Set(categories.map(cat => cat.label)))

function isTypeActive(type: string): boolean {
  return activeTypes.value.has(type)
}

function toggleType(type: string): void {
  const next = new Set(activeTypes.value)
  if (next.has(type)) {
    next.delete(type)
  } else {
    next.add(type)
  }
  activeTypes.value = next
}

function isolateType(type: string): void {
  const isAlreadyIsolated = activeTypes.value.size === 1 && activeTypes.value.has(type)
  activeTypes.value = isAlreadyIsolated
    ? new Set(categories.map(cat => cat.label))
    : new Set([type])
}

const filteredEvents = computed(() => calendarEvents.filter(event => activeTypes.value.has(event.type)))

const monthOffset = ref(0)

function monthIndex(month: number): number {
  return 5 + monthOffset.value + month
}

function monthKey(month: number): string {
  const d = new Date(2026, monthIndex(month), 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

// On mobile only one of the two displayed months is shown at a time;
// prefer whichever one is the real current month, defaulting to the first.
const mobileSlot = computed(() => {
  const today = new Date()
  const isRealCurrentMonth = (month: number): boolean => {
    const d = new Date(2026, monthIndex(month), 1)
    return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth()
  }
  return isRealCurrentMonth(1) ? 1 : 0
})

const monthRangeLabel = computed(() => {
  const start = new Date(2026, monthIndex(0), 1)
  const end = new Date(2026, monthIndex(1), 1)
  const startMonthName = start.toLocaleString('default', { month: 'long' })
  const endLabel = end.toLocaleString('default', { month: 'long', year: 'numeric' })
  if (start.getFullYear() === end.getFullYear()) {
    return `${startMonthName} – ${endLabel}`
  }
  const startLabel = start.toLocaleString('default', { month: 'long', year: 'numeric' })
  return `${startLabel} – ${endLabel}`
})

const visibleMonthEvents = computed(() => {
  const visibleKeys = new Set([monthKey(0), monthKey(1)])
  return filteredEvents.value.filter(event => visibleKeys.has(event.date.slice(0, 7)))
})

const groupedEvents = computed(() => {
  const grouped: Record<string, CalendarEvent[]> = {}
  visibleMonthEvents.value.forEach(event => {
    if (!grouped[event.date]) {
      grouped[event.date] = []
    }
    grouped[event.date].push(event)
  })
  return grouped
})

function getCategoryClasses(type: string): string {
  return getEventTypeStyle(type).badge
}

function getLinkColorClasses(type: string): string[] {
  return getEventTypeStyle(type).link
}

function getCalendarDays(month: number): (number | null)[] {
  const firstDay = new Date(2026, month, 1).getDay()
  const daysInMonth = new Date(2026, month + 1, 0).getDate()
  const days: (number | null)[] = []
  
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }
  return days
}

function scrollToDate(day: number, month: number): void {
  const dateStr = getDateStr(day, month)
  const element = document.getElementById(`event-${dateStr}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Highlight briefly
    element.classList.add('bg-amber-950/50')
    setTimeout(() => {
      element.classList.remove('bg-amber-950/50')
    }, 2000)
  }
}

function getDateStr(day: number, month: number): string {
  const d = new Date(2026, month, day)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getEventsForDay(day: number, month: number): CalendarEvent[] {
  const dateStr = getDateStr(day, month)
  return filteredEvents.value.filter(event => event.date === dateStr)
}

function hasEvents(day: number, month: number): boolean {
  return getEventsForDay(day, month).length > 0
}

function getCalendarDayColors(day: number, month: number): string {
  const dayEvents = getEventsForDay(day, month)
  if (dayEvents.length === 0) return 'text-slate-500 cursor-default bg-transparent border-0'

  const uniqueTypes = [...new Set(dayEvents.map(e => e.type))]
  let baseColor = getEventTypeStyle(uniqueTypes[0]).calendarDay

  // Add border for secondary event type if present
  if (uniqueTypes.length > 1) {
    const borderColor = getEventTypeStyle(uniqueTypes[1]).calendarBorder
    // Replace border-0 with the secondary border color
    baseColor = baseColor.replace('border-0', borderColor)
  }

  return baseColor
}
</script>
