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
            <span class="badge bg-amber-500/20 text-amber-300 light:text-amber-800 border border-amber-700 text-xs px-2 py-1">Best Value</span>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-heading font-bold text-white">$200</span>
            <span class="text-slate-400 text-sm ml-1">/year</span>
          </div>
          <ul class="space-y-3 flex-1 mb-8">
            <li v-for="f in familyFeatures" :key="f.label" class="flex items-start gap-3">
              <svg class="w-5 h-5 text-amber-400 light:text-amber-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <span class="text-brand-300 light:text-brand-800 font-semibold text-sm">{{ row.value }}</span>
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
            <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" :class="NOTE_ICON_KINDS[note.icon].iconBg" v-html="NOTE_ICON_KINDS[note.icon].icon" />
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
import membershipContent from '@/content/membership.json'
import { NOTE_ICON_KINDS } from '@/lib/icons'

const individualFeatures = membershipContent.individualFeatures
const familyFeatures = membershipContent.familyFeatures
const feeRows = membershipContent.feeRows
const addons = membershipContent.addons
const notes = membershipContent.notes
</script>
