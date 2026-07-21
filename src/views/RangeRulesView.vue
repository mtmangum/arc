<template>
  <div>
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-inner">
        <span class="text-amber-600 text-sm font-semibold uppercase tracking-widest">Safety</span>
        <h1 class="section-heading mt-2 mb-3">Range Rules</h1>
        <p class="section-sub max-w-xl">
          All members must read and follow the range rules. These documents are updated periodically — always refer to the latest version.
        </p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <!-- Document cards -->
      <div class="space-y-4 mb-16">
        <a
          v-for="doc in documents"
          :key="doc.title"
          :href="doc.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group card-hover flex items-center gap-5 no-underline"
        >
          <!-- Icon -->
          <div class="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center border border-slate-700 bg-slate-800 group-hover:border-amber-800 group-hover:bg-amber-950/30 transition-all duration-200">
            <svg class="w-7 h-7 text-red-400 group-hover:text-red-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          <!-- Text -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-white font-semibold text-sm group-hover:text-brand-300 light:group-hover:text-brand-800 transition-colors">
                {{ doc.title }}
              </h2>
              <span v-if="doc.badge" class="badge bg-amber-900/40 text-amber-300 light:text-amber-800 border border-amber-800 text-xs">
                {{ doc.badge }}
              </span>
            </div>
            <p class="text-slate-400 text-xs mt-1 leading-relaxed">{{ doc.desc }}</p>
            <p class="text-slate-500 text-xs mt-1">Updated {{ doc.updated }}</p>
          </div>

          <!-- Download arrow -->
          <div class="shrink-0 flex items-center gap-2 text-slate-500 group-hover:text-amber-600 transition-colors">
            <span class="text-xs font-medium hidden sm:block">PDF</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
        </a>
      </div>

      <!-- Key highlights -->
      <h2 class="font-heading text-2xl font-bold text-white mb-6">Key Rules at a Glance</h2>
      <div class="grid sm:grid-cols-2 gap-4 mb-14">
        <div v-for="rule in keyRules" :key="rule.label" class="card flex items-start gap-3">
          <div class="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
            :class="rule.allowed ? 'bg-amber-950/40' : 'bg-red-900/30'">
            <svg class="w-4 h-4" :class="rule.allowed ? 'text-amber-600' : 'text-red-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="rule.allowed" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <p class="text-white text-sm font-semibold">{{ rule.label }}</p>
            <p class="text-slate-400 text-xs leading-relaxed mt-0.5">{{ rule.note }}</p>
          </div>
        </div>
      </div>

      <!-- Annual renewal reminder -->
      <div class="card bg-amber-950/20 border-brand-800/50">
        <div class="flex gap-3">
          <svg class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p class="text-white font-semibold text-sm mb-1">Rules are reviewed at every annual renewal</p>
            <p class="text-slate-300 text-sm leading-relaxed">
              All members must affirm their knowledge of the range rules each year when renewing membership.
              If you see a rule being violated, please report it to a Range Safety Officer or email the club.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const documents = [
  {
    title:   'Range Rules',
    desc:    'The authoritative document governing all range use at Austin Rifle Club. All members must read and follow these rules.',
    url:     'https://austinrifleclub.org/files/RangeRules.pdf',
    updated: 'March 2025',
    badge:   'Authoritative',
  },
  {
    title:   'Firearm Use by Range',
    desc:    'Quick reference guide specifying which types of firearms are permitted on each individual range.',
    url:     'https://austinrifleclub.org/files/FirearmUseByRange.pdf',
    updated: 'December 2025',
    badge:   null,
  },
  {
    title:   'Quick Reference',
    desc:    'A condensed flyer highlighting the most important safety rules. Great to review before each visit.',
    url:     'https://austinrifleclub.org/files/RangeRules-QuickReference.pdf',
    updated: 'March 2025',
    badge:   null,
  },
  {
    title:   'Steel Target Quick Reference',
    desc:    'Details on which ranges permit steel targets and what conditions and distances apply per range.',
    url:     'https://austinrifleclub.org/files/SteelQuickRef.pdf',
    updated: 'November 2024',
    badge:   null,
  },
]

const keyRules = [
  { label: 'Suppressors / SBR / SBS',  note: 'Legal NFA items (suppressors, short-barreled rifles, SBS) are permitted.',                         allowed: true  },
  { label: 'Holster Draw',              note: 'Allowed on select ranges only. All shots must be taken with an acquired sight picture.',             allowed: true  },
  { label: 'Steel Targets',            note: 'Permitted on certain ranges under specific conditions — see Steel Quick Reference.',                 allowed: true  },
  { label: 'Badge Gate Entry',         note: 'Scan your badge every entry and exit. Do not tailgate or allow others to follow you through.',       allowed: true  },
  { label: 'Machine Gun / Simulated Auto', note: 'Prohibited. Includes bump stocks, FRTs, switches, and any simulated-auto fire devices.',        allowed: false },
  { label: 'Movement While Shooting',  note: 'Not permitted except during a sanctioned match or ARC-authorized practice.',                        allowed: false },
  { label: 'No Range Reservations',    note: 'General use ranges cannot be reserved. Only calendar-listed events reserve ranges.',               allowed: false },
  { label: 'No Supplies On-Site',      note: 'No targets, ammo, or accessories are sold at the range. Bring everything you need.',               allowed: false },
]
</script>
