<template>
  <div>
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-inner">
        <RouterLink to="/membership" class="inline-flex items-center gap-1 text-amber-600 text-sm hover:text-brand-300 light:hover:text-brand-800 mb-4 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Membership
        </RouterLink>
        <h1 class="section-heading mt-1 mb-3">How to Join</h1>
        <p class="section-sub max-w-xl">
          Four steps stand between you and unlimited range access. Here's exactly what to expect.
        </p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <!-- Work Day notice banner -->
      <div class="rounded-xl border border-amber-700/60 bg-amber-900/20 p-5 flex gap-4 mb-14">
        <svg class="w-6 h-6 text-amber-400 light:text-amber-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <p class="text-amber-200 light:text-amber-900 font-semibold text-sm mb-1">Volunteer Requirement — Notice to New Members</p>
          <p class="text-amber-100/70 light:text-amber-900/80 text-sm leading-relaxed">
            ARC is run entirely by volunteers. All new and returning members must attend
            <strong class="text-amber-200 light:text-amber-900">3 Work Days</strong> (2nd Saturday of each month, 8am–12pm, all ranges closed)
            within their first year to move from Probationary to Full/Voting status.
            Failing to complete this adds a <strong class="text-amber-200 light:text-amber-900">$50 non-completion fee</strong> to each annual renewal.
          </p>
        </div>
      </div>

      <!-- Steps timeline -->
      <div class="relative">
        <!-- Vertical connector line -->
        <div class="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-slate-800" aria-hidden="true" />

        <div class="space-y-8">
          <div v-for="(step, i) in steps" :key="step.title" class="relative flex gap-6 md:gap-10">
            <!-- Step number -->
            <div class="relative z-10 shrink-0">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center font-heading font-bold text-xl border-2 transition-colors"
                :class="step.complete ? 'bg-brand-700 border-amber-700 text-amber-50' : 'bg-slate-900 border-slate-700 text-slate-300'">
                {{ i + 1 }}
              </div>
            </div>

            <!-- Content card -->
            <div class="flex-1 card mb-0 pt-4">
              <h2 class="font-heading text-lg font-bold text-white mb-3">{{ step.title }}</h2>
              <p class="text-slate-300 text-sm leading-relaxed mb-4">{{ step.body }}</p>

              <ul v-if="step.bullets" class="space-y-2 mb-4">
                <li v-for="b in step.bullets" :key="b" class="flex items-start gap-2 text-sm text-slate-400">
                  <svg class="w-4 h-4 text-brand-500 light:text-brand-800 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  {{ b }}
                </li>
              </ul>

              <div v-if="step.callout" class="rounded-lg bg-slate-800/60 border border-slate-700 px-4 py-3 text-sm text-slate-300">
                {{ step.callout }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Probationary restrictions -->
      <div class="mt-14">
        <h2 class="font-heading text-2xl font-bold text-white mb-6">Probationary Period Restrictions</h2>
        <div class="grid sm:grid-cols-3 gap-5">
          <div v-for="r in restrictions" :key="r.label" class="card border-red-900/40 bg-red-950/10 text-center">
            <div class="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-3">
              <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p class="text-white font-semibold text-sm mb-1">{{ r.label }}</p>
            <p class="text-slate-400 text-xs leading-relaxed">{{ r.note }}</p>
          </div>
        </div>
        <p class="text-slate-400 text-sm leading-relaxed mt-5 card bg-slate-900/60">
          During the probationary period, violations of range rules, property damage, or abusive/disrespectful
          behavior will result in <strong class="text-white">immediate termination without appeal</strong>.
          Previously paid fees and dues will not be refunded.
        </p>
      </div>

      <!-- CTA -->
      <div class="mt-12 flex flex-col sm:flex-row gap-4">
        <a href="mailto:membership@austinrifleclub.org" class="btn-primary flex-1 justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email Membership Team
        </a>
        <RouterLink to="/faq" class="btn-secondary flex-1 justify-center">Read the FAQ</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    title: 'Step 1 — Sign Up',
    body: 'Express your interest and complete the online membership application.',
    bullets: [
      'Email membership@austinrifleclub.org to request the sign-up link.',
      'Complete the membership application using the link provided.',
    ],
    callout: null,
  },
  {
    title: 'Step 2 — Personal Safety Evaluation',
    body: 'All applicants must be evaluated by an ARC Range Safety Officer to ensure they can safely and independently handle firearms in the presence of others.',
    bullets: [
      'One-on-one evaluation with an ARC RSO.',
      'Bring your own firearm — no loaner firearms available.',
      'Evaluations are held immediately before each Orientation Class.',
    ],
    callout: 'Alternative: successful participation in two matches hosted at ARC within the past 6 months qualifies in place of the safety evaluation. Contact membership for details.',
  },
  {
    title: 'Step 3 — Range Orientation Class',
    body: 'After passing your safety evaluation, attend the Range Orientation Class to learn the rules and procedures for every range on the property.',
    bullets: [
      'Generally held on a Sunday afternoon at the ARC Education Building.',
      'Class lasts approximately 2 hours.',
      'Bring a government-issued ID or valid Texas License to Carry.',
      'Pay your initiation fee ($200), prorated dues, and background check fee (if applicable) at class.',
    ],
    callout: null,
  },
  {
    title: 'Step 4 — Probationary Membership',
    body: 'All new members enter a 6-month probationary period. During this time you have full range access but some restrictions apply.',
    bullets: [
      'Must complete 3 Work Days (2nd Saturday of each month, 8am–12pm).',
      'Cannot bring or sign in guests.',
      'No voting rights.',
    ],
    callout: 'After your probationary period and 3 Work Days, you become a Full/Voting Member.',
  },
]

const restrictions = [
  { label: 'No Guests',       note: 'You may not bring or sign in guests until your probationary period is complete.' },
  { label: 'No Voting',       note: 'Full voting rights are granted only after completing probationary requirements.' },
  { label: '3 Work Days',     note: 'Must be completed within your first year or a $50 fee applies to each renewal.' },
]
</script>
