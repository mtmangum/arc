import { reactive, ref } from 'vue'
import { supabase } from '@/lib/supabase'

export interface CalendarEvent {
  id: string
  date: string
  month: string
  day: string
  title: string
  venue: string
  type: string
  restricted?: boolean
  url?: string
}

export interface EventTypeStyle {
  badge: string
  dot: string
  link: string[]
  calendarDay: string
  calendarBorder: string
}

export const EVENT_TYPE_STYLES: Record<string, EventTypeStyle> = {
  'Match': {
    badge: 'bg-violet-900/40 text-violet-300 light:text-violet-800 border border-violet-800',
    dot: 'bg-violet-400',
    link: ['text-violet-300', 'light:text-violet-800', 'hover:bg-violet-900/30'],
    calendarDay: 'text-white hover:bg-violet-600 cursor-pointer bg-violet-600/30 border-0',
    calendarBorder: 'border-2 border-violet-600',
  },
  'Organized Practice': {
    badge: 'bg-blue-900/40 text-blue-300 light:text-blue-800 border border-blue-800',
    dot: 'bg-blue-400',
    link: ['text-blue-300', 'light:text-blue-800', 'hover:bg-blue-900/30'],
    calendarDay: 'text-white hover:bg-blue-600 cursor-pointer bg-blue-600/30 border-0',
    calendarBorder: 'border-2 border-blue-600',
  },
  'ARC Event': {
    badge: 'bg-amber-950/40 text-brand-300 light:text-brand-800 border border-brand-800',
    dot: 'bg-brand-400',
    link: ['text-amber-300', 'light:text-amber-800', 'hover:bg-amber-950/30'],
    calendarDay: 'text-white hover:bg-amber-600 cursor-pointer bg-amber-600/30 border-0',
    calendarBorder: 'border-2 border-amber-600',
  },
  'Work Day': {
    badge: 'bg-amber-900/40 text-amber-300 light:text-amber-800 border border-amber-800',
    dot: 'bg-amber-400',
    link: ['text-amber-300', 'light:text-amber-800', 'hover:bg-amber-900/30'],
    calendarDay: 'text-white hover:bg-amber-600 cursor-pointer bg-amber-600/30 border-0',
    calendarBorder: 'border-2 border-amber-600',
  },
  'Class': {
    badge: 'bg-cyan-900/40 text-cyan-300 light:text-cyan-800 border border-cyan-800',
    dot: 'bg-cyan-400',
    link: ['text-cyan-300', 'light:text-cyan-800', 'hover:bg-cyan-900/30'],
    calendarDay: 'text-white hover:bg-cyan-600 cursor-pointer bg-cyan-600/30 border-0',
    calendarBorder: 'border-2 border-cyan-600',
  },
  'ARC Meeting': {
    badge: 'bg-slate-700/60 text-slate-300 border border-slate-600',
    dot: 'bg-slate-400',
    link: ['text-slate-300', 'hover:bg-slate-700/30'],
    calendarDay: 'text-white hover:bg-slate-600 cursor-pointer bg-slate-600/30 border-0',
    calendarBorder: 'border-2 border-slate-600',
  },
  'Youth Event': {
    badge: 'bg-pink-900/40 text-pink-300 light:text-pink-800 border border-pink-800',
    dot: 'bg-pink-400',
    link: ['text-pink-300', 'light:text-pink-800', 'hover:bg-pink-900/30'],
    calendarDay: 'text-white hover:bg-pink-600 cursor-pointer bg-pink-600/30 border-0',
    calendarBorder: 'border-2 border-pink-600',
  },
}

const DEFAULT_EVENT_TYPE_STYLE: EventTypeStyle = {
  badge: 'bg-slate-700/40 text-slate-300 border border-slate-600',
  dot: 'bg-slate-400',
  link: ['text-slate-300', 'hover:bg-slate-700/30'],
  calendarDay: 'text-white hover:bg-slate-600 cursor-pointer bg-slate-600/30 border-0',
  calendarBorder: 'border-2 border-slate-600',
}

export function getEventTypeStyle(type: string): EventTypeStyle {
  return EVENT_TYPE_STYLES[type] ?? DEFAULT_EVENT_TYPE_STYLE
}

export const EVENT_TYPES = Object.keys(EVENT_TYPE_STYLES)

export function deriveMonthDay(date: string): { month: string; day: string } {
  const [year, month, day] = date.split('-').map(Number)
  const parsed = new Date(year, month - 1, day)
  return {
    month: parsed.toLocaleString('default', { month: 'short' }),
    day: String(day).padStart(2, '0'),
  }
}

export type EventInput = Omit<CalendarEvent, 'id' | 'month' | 'day'>

interface EventRow {
  id: string
  date: string
  title: string
  venue: string
  type: string
  restricted: boolean
  url: string | null
}

function rowToEvent(row: EventRow): CalendarEvent {
  return {
    id: row.id,
    date: row.date,
    ...deriveMonthDay(row.date),
    title: row.title,
    venue: row.venue,
    type: row.type,
    restricted: row.restricted || undefined,
    url: row.url ?? undefined,
  }
}

function eventToRow(input: EventInput) {
  return {
    date: input.date,
    title: input.title,
    venue: input.venue,
    type: input.type,
    restricted: input.restricted ?? false,
    url: input.url ?? null,
  }
}

export const calendarEvents = reactive<CalendarEvent[]>([])
export const calendarEventsLoading = ref(false)
export const calendarEventsError = ref<string | null>(null)

export async function fetchCalendarEvents(): Promise<void> {
  calendarEventsLoading.value = true
  calendarEventsError.value = null
  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .order('date', { ascending: true })

  if (error) {
    calendarEventsError.value = error.message
  } else {
    calendarEvents.splice(0, calendarEvents.length, ...(data as EventRow[]).map(rowToEvent))
  }
  calendarEventsLoading.value = false
}

export async function addCalendarEvent(input: EventInput): Promise<string | null> {
  const { error } = await supabase.from('calendar_events').insert(eventToRow(input))
  if (error) return error.message
  await fetchCalendarEvents()
  return null
}

export async function updateCalendarEvent(id: string, input: EventInput): Promise<string | null> {
  const { error } = await supabase.from('calendar_events').update(eventToRow(input)).eq('id', id)
  if (error) return error.message
  await fetchCalendarEvents()
  return null
}

export async function deleteCalendarEvent(id: string): Promise<string | null> {
  const { error } = await supabase.from('calendar_events').delete().eq('id', id)
  if (error) return error.message
  await fetchCalendarEvents()
  return null
}
