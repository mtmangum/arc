<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">

        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-3 group" @click="closeMenu">
          <img
            src="@/assets/logo.png"
            alt="Austin Rifle Club"
            class="h-14 w-auto object-contain"
          />
          <span class="hidden sm:block font-heading font-bold text-white text-lg">
            Austin <span class="text-brand-400">Rifle Club</span>
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link"
            :class="{ 'nav-link-active': isActive(link.to) }"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Desktop CTA -->
        <div class="hidden md:flex items-center gap-3">
          <RouterLink to="/member-area" class="btn-primary text-sm py-2 px-4">
            Member Login
          </RouterLink>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          @click="toggleMenu"
          :aria-expanded="menuOpen"
          aria-label="Toggle navigation"
        >
          <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="md:hidden border-t border-slate-800 bg-slate-950">
        <nav class="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="mobile-nav-link"
            :class="{ 'mobile-nav-link-active': isActive(link.to) }"
            @click="closeMenu"
          >
            {{ link.label }}
          </RouterLink>
          <div class="pt-3 border-t border-slate-800 mt-2">
            <RouterLink to="/member-area" class="btn-primary w-full justify-center" @click="closeMenu">
              Member Login
            </RouterLink>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

const navLinks = [
  { to: '/',            label: 'Home' },
  { to: '/calendar',   label: 'Calendar' },
  { to: '/membership', label: 'Membership' },
  { to: '/ranges',     label: 'Ranges' },
  { to: '/faq',        label: 'FAQ' },
  { to: '/range-rules',label: 'Range Rules' },
]

function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu()  { menuOpen.value = false }

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<style scoped>
.nav-link {
  @apply px-3 py-2 rounded-lg text-sm font-medium text-slate-300
         hover:text-white hover:bg-slate-800/60 transition-all duration-150;
}
.nav-link-active {
  @apply text-brand-400 bg-brand-900/30;
}
.mobile-nav-link {
  @apply px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300
         hover:text-white hover:bg-slate-800 transition-all duration-150;
}
.mobile-nav-link-active {
  @apply text-brand-400 bg-brand-900/30;
}
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
