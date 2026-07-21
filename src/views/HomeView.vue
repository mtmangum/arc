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
              <div class="w-10 h-10 rounded-lg bg-amber-950/50 light:bg-amber-100 light:border light:border-amber-300 flex items-center justify-center mb-3" v-html="feature.icon" />
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
const scrollToNext = () => {
  const statsSection = document.querySelector('[data-scroll-target="stats"]')
  if (statsSection) {
    statsSection.scrollIntoView({ behavior: 'smooth' })
  }
}
const stats = [
  { value: '1894',    label: 'Year Founded' },
  { value: '200 yd', label: 'Longest Rifle Range' },
  { value: '7 Days', label: 'Per Week Access' },
  { value: '12+',    label: 'Range Bays' },
]

const features = [
  {
    title: 'Member-Operated',
    desc: 'Entirely volunteer-run. Members maintain the property and have a real say in how it is managed.',
    icon: `<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  },
  {
    title: 'Private & Secure',
    desc: 'Badge-access gate. Range reserved exclusively for members, guests, and match participants.',
    icon: `<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
  },
  {
    title: 'Multiple Disciplines',
    desc: 'Pistol, rifle, benchrest, silhouette, steel challenge, muzzleloading, air guns & more.',
    icon: `<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
  },
  {
    title: 'Youth Programs',
    desc: 'Committed to educating America\'s youth in shooting sports and safe gun handling.',
    icon: `<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
  },
]

const disciplines = [
  { emoji: '🎯', name: 'Precision Benchrest', desc: 'Range C — centerfire & rimfire benchrest up to 200 yards.' },
  { emoji: '🔫', name: 'USPSA / Steel Challenge', desc: 'Ranges G–L host regular APSC club matches and steel challenge events.' },
  { emoji: '🏹', name: 'Silhouette Shooting', desc: 'Ranges D & E — hunter pistol, lever action, and smallbore rifle silhouette.' },
  { emoji: '💨', name: 'Air Guns', desc: 'Indoor 10m air rifle and air pistol (limited access).' },
  { emoji: '📯', name: 'Muzzle Loading', desc: 'Range A supports black powder and junior muzzle loading practice.' },
  { emoji: '🏆', name: 'High Power Rifle', desc: 'Range C — monthly high power rifle matches.' },
]

const joinSteps = [
  { label: 'Sign Up',            desc: 'Email membership to request the application link and fill out your form.' },
  { label: 'Safety Evaluation', desc: 'One-on-one RSO evaluation. Bring your own firearm.' },
  { label: 'Orientation Class', desc: 'Sunday afternoon class at the ARC Education Building (~2 hrs).' },
  { label: 'Probationary Period', desc: '6 months + 3 volunteer Work Days to become a full voting member.' },
]
</script>
