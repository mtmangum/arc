<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-20">
    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="text-center mb-8">
        <img
          src="https://austinrifleclub.org/wp-content/uploads/2024/05/Transparent.png"
          alt="Austin Rifle Club"
          class="h-14 mx-auto mb-4 brightness-0 invert light:filter-none"
        />
        <h1 class="font-heading text-2xl font-bold text-white">Member Area</h1>
        <p class="text-slate-400 text-sm mt-1">Sign in to access renewal, forms, and member resources.</p>
      </div>

      <!-- Card -->
      <div class="card border-slate-700">

        <!-- Tab switcher -->
        <div class="flex rounded-lg bg-slate-800/60 p-1 mb-6">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            class="flex-1 py-2 text-sm font-medium rounded-md transition-all duration-150"
            :class="activeTab === tab
              ? 'bg-brand-600 text-amber-50 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Sign In form -->
        <form v-if="activeTab === 'Sign In'" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-slate-300 text-sm font-medium mb-1.5">
              Username or Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="text"
              autocomplete="username"
              placeholder="you@example.com"
              class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
            />
          </div>
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label for="password" class="block text-slate-300 text-sm font-medium">Password</label>
              <a
                href="https://austinrifleclub.org/wp-login.php?action=lostpassword"
                target="_blank"
                rel="noopener"
                class="text-amber-600 text-xs hover:text-brand-300 light:hover:text-brand-800 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPass ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="••••••••"
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
              />
              <button
                type="button"
                @click="showPass = !showPass"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                :aria-label="showPass ? 'Hide password' : 'Show password'"
              >
                <svg v-if="!showPass" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-brand-500"
            />
            <label for="remember" class="text-slate-400 text-sm cursor-pointer select-none">Remember me</label>
          </div>

          <!-- Error message -->
          <div v-if="error" class="rounded-lg bg-red-900/30 border border-red-800 px-4 py-3 text-red-300 text-sm flex items-center gap-2">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="btn-primary w-full justify-center py-3"
          >
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'Signing in…' : 'Sign In' }}
          </button>

          <p class="text-center text-slate-500 text-xs">
            Member login is managed through the ARC WordPress portal.<br />
            <a href="https://austinrifleclub.org/wp-login.php" target="_blank" rel="noopener" class="text-amber-600 hover:underline">
              Open the legacy login page →
            </a>
          </p>
        </form>

        <!-- Renew tab -->
        <div v-else class="space-y-5">
          <div class="card bg-slate-800/50 border-slate-700">
            <p class="text-slate-300 text-sm leading-relaxed">
              Annual renewal notices are sent in <strong class="text-white">early October</strong>.
              To renew, log in to the Member Area and click the <strong class="text-white">Renewal</strong> icon.
            </p>
          </div>

          <ul class="space-y-3">
            <li v-for="step in renewalSteps" :key="step" class="flex items-start gap-3 text-sm text-slate-300">
              <svg class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              {{ step }}
            </li>
          </ul>

          <div class="rounded-lg bg-amber-900/20 border border-amber-800/60 px-4 py-3 text-amber-200 light:text-amber-900 text-xs leading-relaxed">
            Members who have not renewed by January 1 will lose gate access and may not enter the property.
            Lapsed 2+ years? You must rejoin as a new member.
          </div>

          <button @click="activeTab = 'Sign In'" class="btn-primary w-full justify-center">
            Sign In to Renew
          </button>
          <p class="text-center text-xs text-slate-500">
            Renewal issues? Email
            <a href="mailto:membership@austinrifleclub.org" class="text-amber-600 hover:underline">
              membership@austinrifleclub.org
            </a>
          </p>
        </div>
      </div>

      <!-- Not a member yet -->
      <p class="text-center text-slate-500 text-sm mt-6">
        Not a member yet?
        <RouterLink to="/membership/join" class="text-amber-600 hover:text-brand-300 light:hover:text-brand-800 transition-colors">
          Learn how to join →
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const tabs = ['Sign In', 'Renewal'] as const
const activeTab = ref<'Sign In' | 'Renewal'>('Sign In')
const showPass = ref(false)
const loading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

async function handleLogin() {
  error.value = ''
  if (!form.email || !form.password) {
    error.value = 'Please enter your username/email and password.'
    return
  }
  loading.value = true
  // Redirect to the actual ARC WordPress login
  await new Promise(r => setTimeout(r, 600))
  window.location.href = `https://austinrifleclub.org/wp-login.php?redirect_to=%2Fmember-area%2F`
}

const renewalSteps = [
  'Log in to the Member Area using your credentials.',
  'Click the Renewal icon on your member dashboard.',
  'Confirm your contact details are current.',
  'Pay your annual dues online.',
  'Gate access reinstates within one full business day.',
]
</script>
