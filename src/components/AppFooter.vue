<template>
  <footer class="bg-slate-900 border-t-2 border-amber-900/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

        <!-- Brand -->
        <div class="flex flex-col gap-4">
          <RouterLink to="/" class="flex items-center gap-3">
            <img
              src="@/assets/logo.png"
              alt="Austin Rifle Club"
              class="h-10 w-auto"
            />
            <span class="font-heading font-bold text-white text-base">
              Austin<br /><span class="text-amber-600">Rifle Club</span>
            </span>
          </RouterLink>
          <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
            A non-profit, volunteer-run club dedicated to the shooting sports and
            youth firearm safety education. Established 1894.
          </p>
          <div class="flex items-start gap-2 text-slate-400 text-sm">
            <svg class="w-4 h-4 mt-0.5 shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>16312 Littig Rd<br />Manor, TX 78653</span>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="text-slate-400 hover:text-amber-600 text-sm transition-colors"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Hours -->
        <div>
          <h3 class="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Contact & Hours</h3>
          <ul class="space-y-3 text-sm text-slate-400">
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:membership@austinrifleclub.org" class="hover:text-amber-600 transition-colors break-all">
                membership@austinrifleclub.org
              </a>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:business@austinrifleclub.org" class="hover:text-amber-600 transition-colors break-all">
                business@austinrifleclub.org
              </a>
            </li>
            <li class="pt-2">
              <p class="text-slate-300 font-medium mb-1">Range Hours</p>
              <p class="text-slate-400">7 days/week</p>
              <p class="text-slate-400">30 min before sunrise to 30 min after sunset</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-slate-500 text-xs">
          &copy; {{ currentYear }} Austin Rifle Club, Inc. All rights reserved.
        </p>
        <div class="flex gap-4">
          <RouterLink to="/range-rules" class="text-slate-500 hover:text-slate-300 text-xs transition-colors">
            Range Rules
          </RouterLink>
          <RouterLink to="/faq" class="text-slate-500 hover:text-slate-300 text-xs transition-colors">
            FAQ
          </RouterLink>
          <RouterLink to="/member-area" class="text-slate-500 hover:text-slate-300 text-xs transition-colors">
            Member Login
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const navLinks = [
  { to: '/',             label: 'Home' },
  { to: '/calendar',    label: 'Calendar' },
  { to: '/membership',  label: 'Membership' },
  { to: '/membership/join', label: 'How to Join' },
  { to: '/ranges',      label: 'Ranges' },
  { to: '/faq',         label: 'FAQ' },
  { to: '/range-rules', label: 'Range Rules' },
]
</script>
