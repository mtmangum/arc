<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-20">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="font-heading text-2xl font-bold text-white">Admin Sign In</h1>
        <p class="text-slate-400 text-sm mt-1">Sign in to manage calendar events.</p>
      </div>

      <div class="card border-slate-700">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="email" class="block text-slate-300 text-sm font-medium mb-1.5">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="username"
              required
              class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
            />
          </div>
          <div>
            <label for="password" class="block text-slate-300 text-sm font-medium mb-1.5">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
            />
          </div>

          <div v-if="error" class="rounded-lg bg-red-900/30 border border-red-800 px-4 py-3 text-red-300 text-sm">
            {{ error }}
          </div>

          <button type="submit" :disabled="loading" class="btn-primary w-full justify-center py-3">
            {{ loading ? 'Signing in…' : 'Sign In' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { signIn } from '@/lib/auth'

const route = useRoute()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleSubmit(): Promise<void> {
  loading.value = true
  error.value = ''
  const result = await signIn(email.value, password.value)
  loading.value = false
  if (result) {
    error.value = result
    return
  }
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/admin/calendar'
  router.push(redirect)
}
</script>
