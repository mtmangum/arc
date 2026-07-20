<template>
  <div>
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-inner">
        <span class="text-amber-600 text-sm font-semibold uppercase tracking-widest">Admin</span>
        <h1 class="section-heading mt-2 mb-3">Manage Calendar Events</h1>
        <p class="section-sub max-w-xl">
          Add, edit, and remove events shown on the public event calendar.
        </p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- Signed-in bar -->
      <div class="flex items-center justify-between mb-8 text-sm">
        <span class="text-slate-400">Signed in as <span class="text-slate-200">{{ session?.user.email }}</span></span>
        <button type="button" @click="handleSignOut" class="text-amber-600 hover:text-amber-400 transition-colors">
          Sign Out
        </button>
      </div>

      <div v-if="calendarEventsError" class="rounded-lg bg-red-900/30 border border-red-800 px-4 py-3 text-red-300 text-sm mb-8">
        Couldn't load events: {{ calendarEventsError }}
      </div>

      <!-- Form -->
      <div class="card mb-10">
        <h2 class="font-heading text-lg font-bold text-white mb-4">
          {{ editingId ? 'Edit Event' : 'Add New Event' }}
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label for="date" class="block text-slate-300 text-sm font-medium mb-1.5">Date</label>
              <input
                id="date"
                v-model="form.date"
                type="date"
                required
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
              />
            </div>
            <div>
              <label for="type" class="block text-slate-300 text-sm font-medium mb-1.5">Type</label>
              <select
                id="type"
                v-model="form.type"
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
              >
                <option v-for="t in EVENT_TYPES" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
          </div>

          <div>
            <label for="title" class="block text-slate-300 text-sm font-medium mb-1.5">Title</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              placeholder="e.g. Benchrest Match"
              class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
            />
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label for="venue" class="block text-slate-300 text-sm font-medium mb-1.5">Venue</label>
              <input
                id="venue"
                v-model="form.venue"
                type="text"
                required
                placeholder="e.g. Range C"
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
              />
            </div>
            <div>
              <label for="url" class="block text-slate-300 text-sm font-medium mb-1.5">Event Link (optional)</label>
              <input
                id="url"
                v-model="form.url"
                type="url"
                placeholder="https://…"
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          <div class="flex items-center gap-2">
            <input
              id="restricted"
              v-model="form.restricted"
              type="checkbox"
              class="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-brand-500"
            />
            <label for="restricted" class="text-slate-400 text-sm cursor-pointer select-none">Members Only</label>
          </div>

          <div v-if="formError" class="rounded-lg bg-red-900/30 border border-red-800 px-4 py-3 text-red-300 text-sm">
            {{ formError }}
          </div>

          <div class="flex gap-3 pt-2">
            <button type="submit" :disabled="submitting" class="btn-primary">
              {{ submitting ? 'Saving…' : editingId ? 'Save Changes' : 'Add Event' }}
            </button>
            <button v-if="editingId" type="button" @click="cancelEdit" class="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Events list -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-heading text-lg font-bold text-white">All Events ({{ sortedEvents.length }})</h2>
      </div>

      <div class="space-y-2">
        <p v-if="calendarEventsLoading && sortedEvents.length === 0" class="text-slate-400 text-sm">Loading…</p>
        <p v-else-if="sortedEvents.length === 0" class="text-slate-400 text-sm">No events yet.</p>

        <div
          v-for="event in sortedEvents"
          :key="event.id"
          class="card flex flex-col sm:flex-row sm:items-center gap-3 p-4"
          :class="editingId === event.id ? 'border-amber-600' : ''"
        >
          <div class="w-28 shrink-0 text-slate-400 text-sm">{{ formatDate(event.date) }}</div>

          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="badge py-0.5 px-2 text-xs" :class="getEventTypeStyle(event.type).badge">
                {{ event.type }}
              </span>
              <span v-if="event.restricted" class="badge py-0.5 px-2 text-xs bg-red-900/40 text-red-300 border border-red-800">
                Members Only
              </span>
            </div>
            <p class="text-white font-semibold text-sm">{{ event.title }}</p>
            <p class="text-slate-400 text-xs">{{ event.venue }}</p>
          </div>

          <div class="flex gap-2 shrink-0">
            <button type="button" @click="startEdit(event)" class="btn-secondary text-xs py-1.5 px-3">
              Edit
            </button>
            <button
              type="button"
              @click="handleDelete(event)"
              class="text-xs py-1.5 px-3 rounded-lg border border-red-800 text-red-400 hover:bg-red-950/30 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { session, signOut } from '@/lib/auth'
import {
  calendarEvents,
  calendarEventsLoading,
  calendarEventsError,
  fetchCalendarEvents,
  EVENT_TYPES,
  getEventTypeStyle,
  addCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from '@/data/calendarEvents'
import type { CalendarEvent } from '@/data/calendarEvents'

const router = useRouter()

onMounted(() => {
  fetchCalendarEvents()
})

async function handleSignOut(): Promise<void> {
  await signOut()
  router.push('/admin/login')
}

interface EventForm {
  date: string
  title: string
  venue: string
  type: string
  restricted: boolean
  url: string
}

function emptyForm(): EventForm {
  return {
    date: '',
    title: '',
    venue: '',
    type: EVENT_TYPES[0],
    restricted: false,
    url: '',
  }
}

const editingId = ref<string | null>(null)
const form = ref<EventForm>(emptyForm())
const formError = ref('')
const submitting = ref(false)

const sortedEvents = computed(() =>
  [...calendarEvents].sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title))
)

function startEdit(event: CalendarEvent): void {
  editingId.value = event.id
  formError.value = ''
  form.value = {
    date: event.date,
    title: event.title,
    venue: event.venue,
    type: event.type,
    restricted: event.restricted ?? false,
    url: event.url ?? '',
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function cancelEdit(): void {
  editingId.value = null
  formError.value = ''
  form.value = emptyForm()
}

async function handleSubmit(): Promise<void> {
  if (!form.value.date || !form.value.title.trim() || !form.value.venue.trim()) {
    formError.value = 'Date, title, and venue are required.'
    return
  }
  formError.value = ''
  submitting.value = true

  const payload = {
    date: form.value.date,
    title: form.value.title.trim(),
    venue: form.value.venue.trim(),
    type: form.value.type,
    restricted: form.value.restricted || undefined,
    url: form.value.url.trim() || undefined,
  }

  const result = editingId.value
    ? await updateCalendarEvent(editingId.value, payload)
    : await addCalendarEvent(payload)

  submitting.value = false

  if (result) {
    formError.value = result
    return
  }
  cancelEdit()
}

async function handleDelete(event: CalendarEvent): Promise<void> {
  if (!confirm(`Delete "${event.title}"?`)) return
  const result = await deleteCalendarEvent(event.id)
  if (result) {
    formError.value = result
    return
  }
  if (editingId.value === event.id) cancelEdit()
}

function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('default', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>
