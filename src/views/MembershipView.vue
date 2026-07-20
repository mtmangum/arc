<template>
  <div>
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-inner">
        <span class="text-amber-600 text-sm font-semibold uppercase tracking-widest">Join Us</span>
        <h1 class="section-heading mt-2 mb-3">Membership</h1>
        <p class="section-sub max-w-xl">
          Annual memberships with unlimited range access. All members must renew yearly.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">

        <!-- Individual -->
        <div class="card border-slate-700 flex flex-col relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-brand-600" />
          <div class="mb-6">
            <h2 class="font-heading text-xl font-bold text-white mb-1">Individual</h2>
            <p class="text-slate-400 text-sm">Single primary member with optional add-ons.</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-heading font-bold text-white">$150</span>
            <span class="text-slate-400 text-sm ml-1">/year</span>
          </div>
          <ul class="space-y-3 flex-1 mb-8">
            <li v-for="f in individualFeatures" :key="f.label" class="flex items-start gap-3">
              <svg class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-slate-300">
                <span class="font-medium text-white">{{ f.label }}</span>
                <span v-if="f.detail" class="text-slate-400"> — {{ f.detail }}</span>
              </span>
            </li>
          </ul>
          <RouterLink to="/membership/join" class="btn-primary w-full justify-center">
            Start Application
          </RouterLink>
        </div>

        <!-- Family -->
        <div class="card border-amber-700/50 flex flex-col relative overflow-hidden bg-slate-900">
          <div class="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
          <div class="flex items-start justify-between mb-6">
            <div>
              <h2 class="font-heading text-xl font-bold text-white mb-1">Family</h2>
              <p class="text-slate-400 text-sm">Couple + all children/grandchildren (≤21).</p>
            </div>
            <span class="badge bg-amber-500/20 text-amber-300 border border-amber-700 text-xs px-2 py-1">Best Value</span>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-heading font-bold text-white">$200</span>
            <span class="text-slate-400 text-sm ml-1">/year</span>
          </div>
          <ul class="space-y-3 flex-1 mb-8">
            <li v-for="f in familyFeatures" :key="f.label" class="flex items-start gap-3">
              <svg class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-slate-300">
                <span class="font-medium text-white">{{ f.label }}</span>
                <span v-if="f.detail" class="text-slate-400"> — {{ f.detail }}</span>
              </span>
            </li>
          </ul>
          <RouterLink to="/membership/join" class="btn-amber w-full justify-center">
            Start Application
          </RouterLink>
        </div>
      </div>

      <!-- Fees breakdown -->
      <div class="max-w-4xl mx-auto mb-16">
        <h2 class="font-heading text-2xl font-bold text-white mb-6">Fee Breakdown</h2>
        <div class="card divide-y divide-slate-800">
          <div v-for="row in feeRows" :key="row.label" class="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div>
              <p class="text-white text-sm font-medium">{{ row.label }}</p>
              <p v-if="row.note" class="text-slate-400 text-xs mt-0.5">{{ row.note }}</p>
            </div>
            <span class="text-brand-300 font-semibold text-sm">{{ row.value }}</span>
          </div>
        </div>
      </div>

      <!-- Add-ons -->
      <div class="max-w-4xl mx-auto mb-16">
        <h2 class="font-heading text-2xl font-bold text-white mb-6">Add-Ons</h2>
        <div class="grid sm:grid-cols-3 gap-5">
          <div v-for="addon in addons" :key="addon.label" class="card text-center">
            <p class="text-2xl font-heading font-bold text-white mb-1">{{ addon.price }}</p>
            <p class="text-white font-semibold text-sm mb-2">{{ addon.label }}</p>
            <p class="text-slate-400 text-xs leading-relaxed">{{ addon.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Important notes -->
      <div class="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5 mb-16">
        <div v-for="note in notes" :key="note.title" class="card bg-slate-900/60">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" :class="note.iconBg" v-html="note.icon" />
            <div>
              <h3 class="text-white font-semibold text-sm mb-1">{{ note.title }}</h3>
              <p class="text-slate-400 text-xs leading-relaxed">{{ note.body }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA row -->
      <div class="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
        <RouterLink to="/faq" class="btn-secondary flex-1 justify-center">Read FAQ</RouterLink>
        <RouterLink to="/membership/join" class="btn-primary flex-1 justify-center">How to Join</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const individualFeatures = [
  { label: 'Annual Dues',         detail: '$150/year (prorated first year)' },
  { label: 'Unlimited Range Use', detail: 'during published hours' },
  { label: 'Spouse Add-On',       detail: '$25/year' },
  { label: 'Junior Add-On',       detail: '$10/year per child/grandchild (≤21)' },
  { label: 'Background Check',    detail: 'waived with valid Texas LTC' },
]

const familyFeatures = [
  { label: 'Annual Dues',          detail: '$200/year (prorated first year)' },
  { label: 'Unlimited Range Use',  detail: 'for all covered members' },
  { label: 'Spouse Included',      detail: 'full independent membership' },
  { label: 'Juniors Included',     detail: 'all children/grandchildren ≤21' },
  { label: 'Background Check',     detail: 'waived with valid Texas LTC' },
]

const feeRows = [
  { label: 'Initiation Fee',        value: '$200 (one-time)', note: 'Paid at time of joining. Non-refundable.' },
  { label: 'Individual Dues',       value: '$150/year',       note: 'Prorated in your first calendar year.' },
  { label: 'Family Dues',           value: '$200/year',       note: 'Covers spouse + all juniors.' },
  { label: 'Background Check',      value: '$15',             note: 'Waived if you present an unexpired Texas License to Carry.' },
  { label: 'Spouse Add-On',         value: '$25/year',        note: 'Individual plan only. Spouse must meet all primary member requirements.' },
  { label: 'Junior Add-On',         value: '$10/year/each',   note: 'Individual plan; included in Family plan.' },
  { label: 'Work Day Non-Completion Fee', value: '+$50/renewal', note: 'Added if 3 volunteer Work Days not completed within first year.' },
]

const addons = [
  { price: '$25/yr', label: 'Spouse (Individual Plan)', desc: 'Must independently meet all primary member requirements.' },
  { price: '$10/yr', label: 'Junior',                   desc: 'Children or grandchildren aged 21 or under. Included in Family plan.' },
  { price: 'Free',   label: 'Match Participation',      desc: 'Range use during club-hosted matches is open to non-members.' },
]

const notes = [
  {
    title: 'Annual Renewal Required',
    body:  'All members — including Life Members — must renew every year. Renewal notices go out in early October. Lapsed 2+ years? You must rejoin as a new member.',
    iconBg: 'bg-amber-900/40',
    icon: `<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`,
  },
  {
    title: 'Prorated First Year',
    body:  'New member dues are prorated depending on the month you join. Do not bring exact payment to orientation unless you know the prorated amount.',
    iconBg: 'bg-amber-950/40',
    icon: `<svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
  {
    title: 'Volunteer Requirement',
    body:  'New and returning members must complete 3 Work Days (2nd Saturday of each month, 8am–12pm) within the first year to achieve full voting membership.',
    iconBg: 'bg-violet-900/40',
    icon: `<svg class="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  },
  {
    title: 'Family ≠ Extended Family',
    body:  'The Family plan covers a married couple and their children/grandchildren (≤21). Siblings, parents, and extended family are not included.',
    iconBg: 'bg-red-900/40',
    icon: `<svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  },
]
</script>
