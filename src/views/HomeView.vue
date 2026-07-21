<template>
  <div>
    <!-- ── Hero ── -->
    <section class="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <!-- Background image -->
      <div class="absolute inset-0">
        <img
          src="https://austinrifleclub.org/wp-content/uploads/2022/12/NBS_Drone-1024x576.jpg"
          alt="Austin Rifle Club aerial view"
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/70 to-slate-950" />
      </div>

      <!-- Hero content -->
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <img
          src="@/assets/logo.png"
          alt="Austin Rifle Club"
          class="h-44 sm:h-52 w-auto object-contain mx-auto mb-6"
        />

        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 light:bg-amber-100 border border-amber-800/50 text-brand-300 light:text-brand-800 text-xs font-semibold uppercase tracking-widest mb-6">
          Est. 1894 · Manor, Texas
        </span>

        <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Welcome to<br />
          <span class="text-amber-600">Austin Rifle Club</span>
        </h1>

        <p class="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          A non-profit, volunteer-run club with a shared passion for the shooting sports.
          Our range is located between Manor and Elgin on a club-owned tract developed
          for several different shooting disciplines.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/membership" class="btn-amber text-base px-8 py-3.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Become a Member
          </RouterLink>
          <RouterLink to="/calendar" class="btn-secondary text-base px-8 py-3.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            View Calendar
          </RouterLink>
          <RouterLink to="/faq" class="btn-secondary text-base px-8 py-3.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            FAQ
          </RouterLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <button 
        @click="scrollToNext"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer transition-transform hover:scale-125 focus:outline-none"
        aria-label="Scroll to next section"
      >
        <svg class="w-6 h-6 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>

    <!-- ── Stats strip ── -->
    <section class="bg-amber-900 border-y border-amber-800/50" data-scroll-target="stats">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div v-for="stat in stats" :key="stat.label">
            <p class="text-2xl md:text-3xl font-heading font-bold text-amber-50">{{ stat.value }}</p>
            <p class="text-brand-200 text-xs sm:text-sm mt-0.5">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── About ── -->
    <section class="py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-amber-600 text-sm font-semibold uppercase tracking-widest">About the Club</span>
            <h2 class="section-heading mt-3 mb-5">Private. Member-Run.<br />Open to the Dedicated.</h2>
            <p class="section-sub mb-4">
              Austin Rifle Club, Inc. is a private, non-profit organization dedicated to the shooting
              sports and youth firearm safety education. Established in 1894 and incorporated in 1928,
              our range sits just outside Manor, TX on Littig Road.
            </p>
            <p class="section-sub mb-8">
              Only members, their signed-in guests, and match participants may use the range. Our
              membership maintains and operates the facilities — it's your range as much as ours.
            </p>
            <RouterLink to="/membership/join" class="btn-primary">
              Learn How to Join
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="feature in features" :key="feature.title" class="card-hover">
              <div class="w-10 h-10 rounded-lg bg-amber-950/50 light:bg-amber-100 light:border light:border-amber-300 flex items-center justify-center mb-3" v-html="FEATURE_ICONS[feature.icon]" />
              <h3 class="text-white font-semibold text-sm mb-1">{{ feature.title }}</h3>
              <p class="text-slate-400 text-xs leading-relaxed">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Disciplines ── -->
    <section class="py-20 md:py-24 bg-slate-900/50 border-y border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-amber-600 text-sm font-semibold uppercase tracking-widest">What We Offer</span>
          <h2 class="section-heading mt-3 mb-4">Shooting Disciplines</h2>
          <p class="section-sub max-w-2xl mx-auto">
            From benchrest precision to action shooting — our range complex supports a wide
            variety of shooting sports year-round.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="d in disciplines" :key="d.name" class="card-hover">
            <h3 class="text-white font-semibold mb-2">{{ d.name }}</h3>
            <p class="text-slate-400 text-sm leading-relaxed">{{ d.desc }}</p>
          </div>
        </div>
        <div class="text-center mt-10">
          <RouterLink to="/ranges" class="btn-secondary">
            View All Ranges
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Join steps teaser ── -->
    <section class="py-20 md:py-28">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-amber-600 text-sm font-semibold uppercase tracking-widest">Membership</span>
        <h2 class="section-heading mt-3 mb-4">Join in 4 Steps</h2>
        <p class="section-sub max-w-2xl mx-auto mb-12">
          Starting at $150/year with a one-time $200 initiation fee. Unlimited range access for dues-paid members.
        </p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div v-for="(step, i) in joinSteps" :key="step.label" class="relative card text-center">
            <div class="w-10 h-10 rounded-full bg-brand-700 flex items-center justify-center text-amber-50 font-heading font-bold text-lg mx-auto mb-4">
              {{ i + 1 }}
            </div>
            <h3 class="text-white font-semibold text-sm mb-2">{{ step.label }}</h3>
            <p class="text-slate-400 text-xs leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/membership" class="btn-primary">Membership Info</RouterLink>
          <RouterLink to="/membership/join" class="btn-secondary">How to Join</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── CTA Banner ── -->
    <section class="relative overflow-hidden bg-amber-950 border-y border-brand-800 py-16">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle, #22c55e 1px, transparent 1px); background-size: 30px 30px;" />
      </div>
      <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="font-heading text-3xl md:text-4xl font-bold text-amber-50 mb-4">
          Ready to get on the range?
        </h2>
        <p class="text-brand-200 text-base md:text-lg mb-8">
          Check the calendar for upcoming matches and events, or start the membership process today.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/calendar" class="btn-amber">View This Month's Calendar</RouterLink>
          <RouterLink to="/faq" class="btn-secondary border-amber-700 hover:border-brand-400 light:!text-amber-50">Read the FAQ</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import homeContent from '@/content/home.json'
import { FEATURE_ICONS } from '@/lib/icons'

const scrollToNext = () => {
  const statsSection = document.querySelector('[data-scroll-target="stats"]')
  if (statsSection) {
    statsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const stats = homeContent.stats
const features = homeContent.features
const disciplines = homeContent.disciplines
const joinSteps = homeContent.joinSteps
</script>
