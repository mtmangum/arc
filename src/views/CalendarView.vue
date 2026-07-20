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

      <!-- Calendars and Legend -->
      <div class="flex gap-8 mb-10">
        <!-- Mini Calendars -->
        <div class="grid grid-cols-2 gap-6 w-3/4">
          <div v-for="month in [0, 1]" :key="month" class="card">
            <h3 class="text-white font-semibold text-sm mb-4 text-center">
              {{ new Date(2026, 5 + month, 1).toLocaleString('default', { month: 'long', year: 'numeric' }) }}
            </h3>
            <div class="grid grid-cols-7 gap-1 text-xs text-center">
              <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="text-slate-500 font-semibold py-1">
                {{ day }}
              </div>
              <button v-for="(date, idx) in getCalendarDays(5 + month)" :key="idx"
                @click="date && hasEvents(date, 5 + month) ? scrollToDate(date, 5 + month) : null"
                class="h-7 flex items-center justify-center rounded text-xs transition-colors font-semibold"
                :class="date && hasEvents(date, 5 + month) 
                  ? getCalendarDayColors(date, 5 + month)
                  : date 
                    ? 'text-slate-500 cursor-default bg-transparent border-0' 
                    : 'text-slate-600 cursor-default bg-transparent border-0'"
              >
                {{ date }}
              </button>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="flex flex-col gap-3 w-1/4">
          <span v-for="cat in categories" :key="cat.label"
            class="badge gap-1.5 py-1 px-3 w-fit"
            :class="cat.classes"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="cat.dot" />
            {{ cat.label }}
          </span>
        </div>
      </div>

      <!-- Month heading -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-heading text-2xl font-bold text-white">July 2026</h2>
        <span class="text-slate-400 text-sm">{{ events.length }} events this month</span>
      </div>

      <!-- Events grid -->
      <div class="space-y-3">
        <div
          v-for="event in events"
          :key="event.title + event.date"
          :id="'event-' + event.date"
          class="card-hover flex flex-col sm:flex-row sm:items-center gap-4 scroll-mt-40 transition-colors"
        >
          <!-- Date bubble -->
          <div class="shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center border border-slate-700 bg-slate-800">
            <span class="text-xs font-semibold text-slate-400 uppercase">{{ event.month }}</span>
            <span class="text-2xl font-heading font-bold text-white leading-none">{{ event.day }}</span>
          </div>

          <!-- Content -->
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
interface CalendarEvent {
  date: string
  month: string
  day: string
  title: string
  venue: string
  type: string
  restricted?: boolean
  url?: string
}

const categories = [
  { label: 'Match',              classes: 'bg-violet-900/40 text-violet-300 border border-violet-800', dot: 'bg-violet-400' },
  { label: 'Organized Practice', classes: 'bg-blue-900/40 text-blue-300 border border-blue-800',     dot: 'bg-blue-400' },
  { label: 'ARC Event',          classes: 'bg-amber-950/40 text-brand-300 border border-brand-800',  dot: 'bg-brand-400' },
  { label: 'Work Day',           classes: 'bg-amber-900/40 text-amber-300 border border-amber-800',  dot: 'bg-amber-400' },
  { label: 'Class',              classes: 'bg-cyan-900/40 text-cyan-300 border border-cyan-800',     dot: 'bg-cyan-400' },
  { label: 'ARC Meeting',        classes: 'bg-slate-700/60 text-slate-300 border border-slate-600',  dot: 'bg-slate-400' },
  { label: 'Youth Event',        classes: 'bg-pink-900/40 text-pink-300 border border-pink-800',     dot: 'bg-pink-400' },
]

function getCategoryClasses(type: string): string {
  const map: Record<string, string> = {
    'Match':               'bg-violet-900/40 text-violet-300 border border-violet-800',
    'Organized Practice':  'bg-blue-900/40 text-blue-300 border border-blue-800',
    'ARC Event':           'bg-amber-950/40 text-brand-300 border border-brand-800',
    'Work Day':            'bg-amber-900/40 text-amber-300 border border-amber-800',
    'Class':               'bg-cyan-900/40 text-cyan-300 border border-cyan-800',
    'ARC Meeting':         'bg-slate-700/60 text-slate-300 border border-slate-600',
    'Youth Event':         'bg-pink-900/40 text-pink-300 border border-pink-800',
  }
  return map[type] ?? 'bg-slate-700/40 text-slate-300 border border-slate-600'
}

function getLinkColorClasses(type: string): string[] {
  const map: Record<string, string[]> = {
    'Match':               ['text-violet-300', 'hover:bg-violet-900/30'],
    'Organized Practice':  ['text-blue-300', 'hover:bg-blue-900/30'],
    'ARC Event':           ['text-amber-300', 'hover:bg-amber-950/30'],
    'Work Day':            ['text-amber-300', 'hover:bg-amber-900/30'],
    'Class':               ['text-cyan-300', 'hover:bg-cyan-900/30'],
    'ARC Meeting':         ['text-slate-300', 'hover:bg-slate-700/30'],
    'Youth Event':         ['text-pink-300', 'hover:bg-pink-900/30'],
  }
  return map[type] ?? ['text-slate-300', 'hover:bg-slate-700/30']
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
  const dateStr = `2026-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
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

function hasEvents(day: number, month: number): boolean {
  const dateStr = `2026-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return events.some(event => event.date === dateStr)
}

function getCalendarDayColors(day: number, month: number): string {
  const dateStr = `2026-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  const dayEvents = events.filter(event => event.date === dateStr)
  if (dayEvents.length === 0) return 'text-slate-500 cursor-default bg-transparent border-0'
  
  const uniqueTypes = [...new Set(dayEvents.map(e => e.type))]
  const eventType = uniqueTypes[0]
  
  const colorMap: Record<string, string> = {
    'Match':               'text-white hover:bg-violet-600 cursor-pointer bg-violet-600/30 border-0',
    'Organized Practice':  'text-white hover:bg-blue-600 cursor-pointer bg-blue-600/30 border-0',
    'ARC Event':           'text-white hover:bg-amber-600 cursor-pointer bg-amber-600/30 border-0',
    'Work Day':            'text-white hover:bg-amber-600 cursor-pointer bg-amber-600/30 border-0',
    'Class':               'text-white hover:bg-cyan-600 cursor-pointer bg-cyan-600/30 border-0',
    'ARC Meeting':         'text-white hover:bg-slate-600 cursor-pointer bg-slate-600/30 border-0',
    'Youth Event':         'text-white hover:bg-pink-600 cursor-pointer bg-pink-600/30 border-0',
  }
  
  let baseColor = colorMap[eventType] ?? 'text-white hover:bg-slate-600 cursor-pointer bg-slate-600/30 border-0'
  
  // Add border for secondary event type if present
  if (uniqueTypes.length > 1) {
    const secondaryType = uniqueTypes[1]
    const borderColorMap: Record<string, string> = {
      'Match':               'border-2 border-violet-600',
      'Organized Practice':  'border-2 border-blue-600',
      'ARC Event':           'border-2 border-amber-600',
      'Work Day':            'border-2 border-amber-600',
      'Class':               'border-2 border-cyan-600',
      'ARC Meeting':         'border-2 border-slate-600',
      'Youth Event':         'border-2 border-pink-600',
    }
    const borderColor = borderColorMap[secondaryType] ?? 'border-2 border-slate-600'
    // Replace border-0 with the secondary border color
    baseColor = baseColor.replace('border-0', borderColor)
  }
  
  return baseColor
}

const events: CalendarEvent[] = [
  { date:'2026-06-28', month:'Jun', day:'28', title:'APSC Steel Challenge Pistol Match', venue:'Ranges H – L', type:'Match', url:'https://austinrifleclub.org/events/ranges-h-through-l-apsc-steel-challenge-pistol-match-780-470/' },
  { date:'2026-06-28', month:'Jun', day:'28', title:'Benchrest Match', venue:'Range C', type:'Match', url:'https://austinrifleclub.org/events/range-c-benchrest-match/' },
  { date:'2026-07-03', month:'Jul', day:'03', title:'ARC Advanced Tactical Shooting Practice', venue:'Ranges I & J', type:'Organized Practice', url:'https://austinrifleclub.org/events/ranges-i-and-j-arc-advanced-tactical-shooting-practice/' },
  { date:'2026-07-04', month:'Jul', day:'04', title:'APSC Club USPSA Pistol Match', venue:'Ranges G – L', type:'Match', url:'https://austinrifleclub.org/events/ranges-h-through-l-apsc-club-uspsa-pistol-match/' },
  { date:'2026-07-04', month:'Jul', day:'04', title:'High Power Rifle Match', venue:'Range C', type:'Match', url:'https://austinrifleclub.org/events/range-c-high-power-rifle-match/' },
  { date:'2026-07-05', month:'Jul', day:'05', title:'Benchrest Match — Varmint (Mark S)', venue:'Range C', type:'Match', url:'https://austinrifleclub.org/events/range-c-benchrest-match-varmint-mark-s-500/' },
  { date:'2026-07-05', month:'Jul', day:'05', title:'Junior Muzzle Loading Practice', venue:'Range A', type:'Youth Event', url:'https://austinrifleclub.org/events/range-a-junior-muzzle-loading-practice/' },
  { date:'2026-07-09', month:'Jul', day:'09', title:'ARC Advanced Tactical Shooting Practice', venue:'Ranges I & J', type:'Organized Practice' },
  { date:'2026-07-09', month:'Jul', day:'09', title:'LTC Qualification — Rick M', venue:'Range G', type:'Class' },
  { date:'2026-07-11', month:'Jul', day:'11', title:'Range Work Day', venue:'All Ranges', type:'Work Day', url:'https://austinrifleclub.org/events/range-work-day-legacy-ranges/' },
  { date:'2026-07-11', month:'Jul', day:'11', title:'ARC Members ONLY Swap Meet', venue:'Education Building', type:'ARC Event', restricted:true, url:'https://austinrifleclub.org/events/education-building-arc-members-only-swap-meet/' },
  { date:'2026-07-12', month:'Jul', day:'12', title:'Hunter Pistol / Lever Action Rifle Silhouette Match', venue:'Ranges D & E', type:'Match' },
  { date:'2026-07-12', month:'Jul', day:'12', title:'Monthly Board of Directors Meeting (Open to Members)', venue:'Education Building', type:'ARC Meeting', url:'https://austinrifleclub.org/events/arc-open-bod-meeting/' },
  { date:'2026-07-12', month:'Jul', day:'12', title:'New Member Safety Evaluations (NMSE)', venue:'Ranges G & H', type:'ARC Event', restricted:true },
  { date:'2026-07-12', month:'Jul', day:'12', title:'New Member Orientation (NMO) Class', venue:'Education Building', type:'Class', restricted:true },
  { date:'2026-07-14', month:'Jul', day:'14', title:'LTC Qualification — Rick M', venue:'Range G', type:'Class' },
  { date:'2026-07-16', month:'Jul', day:'16', title:'ARC Advanced Tactical Shooting Practice', venue:'Ranges I & J', type:'Organized Practice' },
  { date:'2026-07-18', month:'Jul', day:'18', title:'APSC Club USPSA Pistol Match', venue:'Ranges G – L', type:'Match' },
  { date:'2026-07-19', month:'Jul', day:'19', title:'2700 Conventional Pistol Match', venue:'Range A', type:'Match', url:'https://austinrifleclub.org/events/range-a-2700-conventional-pistol-match/' },
  { date:'2026-07-19', month:'Jul', day:'19', title:'Smallbore Rifle Silhouette Match', venue:'Ranges D & E', type:'Match' },
  { date:'2026-07-21', month:'Jul', day:'21', title:'Ben Hur Provost Guard Pistol Practice', venue:'Range A', type:'Organized Practice', url:'https://austinrifleclub.org/events/range-a-ben-hur-provost-guard-pistol-practice/' },
  { date:'2026-07-23', month:'Jul', day:'23', title:'ARC Advanced Tactical Shooting Practice', venue:'Ranges I & J', type:'Organized Practice' },
  { date:'2026-07-25', month:'Jul', day:'25', title:'LTC Class — John Davis', venue:'Range G', type:'Class', url:'https://austinrifleclub.org/events/ltc-class-john-davis-range-g-811-694-750-374-462/' },
  { date:'2026-07-26', month:'Jul', day:'26', title:'APSC Steel Challenge Pistol Match', venue:'Ranges H – L', type:'Match' },
  { date:'2026-07-26', month:'Jul', day:'26', title:'Benchrest Match', venue:'Range C', type:'Match' },
  { date:'2026-07-30', month:'Jul', day:'30', title:'ARC Advanced Tactical Shooting Practice', venue:'Ranges I & J', type:'Organized Practice' },
]
</script>
