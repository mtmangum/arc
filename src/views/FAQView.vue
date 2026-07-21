<template>
  <div>
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-inner">
        <span class="text-amber-600 text-sm font-semibold uppercase tracking-widest">Help</span>
        <h1 class="section-heading mt-2 mb-3">Frequently Asked Questions</h1>
        <p class="section-sub max-w-xl">
          Common questions from prospective and current members. Still have questions? Email the membership team.
        </p>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <!-- Search / filter -->
      <div class="relative mb-8">
        <input
          v-model="search"
          type="text"
          placeholder="Search questions…"
          class="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
        />
        <svg class="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <button v-if="search" @click="search = ''" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Category pills -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = activeCategory === cat ? null : cat"
          class="text-xs px-3 py-1.5 rounded-full border transition-all duration-150 font-medium"
          :class="activeCategory === cat
            ? 'bg-brand-600 border-brand-500 text-amber-50'
            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-amber-700 hover:text-slate-200'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Results count -->
      <p v-if="search || activeCategory" class="text-slate-500 text-xs mb-4">
        Showing {{ filteredFaqs.length }} of {{ faqs.length }} questions
      </p>

      <!-- FAQ accordion -->
      <div class="space-y-2">
        <div
          v-for="(faq, i) in filteredFaqs"
          :key="faq.q"
          class="border border-slate-800 rounded-xl overflow-hidden transition-all duration-200"
          :class="openIndex === i ? 'border-brand-800/60 bg-slate-900/80' : 'bg-slate-900/40 hover:border-slate-700'"
        >
          <button
            class="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
            @click="openIndex = openIndex === i ? null : i"
            :aria-expanded="openIndex === i"
          >
            <span class="text-sm font-semibold text-white leading-snug">{{ faq.q }}</span>
            <svg
              class="w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 mt-0.5"
              :class="openIndex === i ? 'rotate-180 text-amber-600' : ''"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <Transition name="faq-body">
            <div v-if="openIndex === i" class="px-5 pb-5">
              <div class="h-px bg-slate-800 mb-4" />
              <div class="text-slate-300 text-sm leading-relaxed prose-a prose-links" v-html="faq.a" />
              <span v-if="faq.category" class="inline-block mt-3 text-xs px-2 py-0.5 rounded-full bg-amber-950/40 text-amber-600 border border-brand-800">
                {{ faq.category }}
              </span>
            </div>
          </Transition>
        </div>

        <!-- Empty state -->
        <div v-if="filteredFaqs.length === 0" class="text-center py-16">
          <svg class="w-12 h-12 text-slate-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-slate-500 text-sm">No questions match your search.</p>
          <button @click="search = ''; activeCategory = null" class="text-amber-600 text-sm mt-2 hover:underline">Clear filters</button>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="mt-12 card bg-amber-950/20 border-brand-800/50 text-center">
        <p class="text-slate-200 font-semibold mb-2">Still have questions?</p>
        <p class="text-slate-400 text-sm mb-5">Read through the range rules or email the membership team directly.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="mailto:membership@austinrifleclub.org" class="btn-primary">
            Email Membership Team
          </a>
          <RouterLink to="/range-rules" class="btn-secondary">View Range Rules</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import faqContent from '@/content/faq.json'

const search = ref('')
const openIndex = ref<number | null>(null)
const activeCategory = ref<string | null>(null)

const categories: string[] = faqContent.categories

interface FAQ {
  q: string
  a: string
  category: string
}

const faqs: FAQ[] = faqContent.faqs

const filteredFaqs = computed(() => {
  let list = faqs
  if (activeCategory.value) {
    list = list.filter(f => f.category === activeCategory.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(f =>
      f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    )
  }
  return list
})
</script>

<style scoped>
.faq-body-enter-active,
.faq-body-leave-active {
  transition: opacity 0.15s ease, max-height 0.2s ease;
  max-height: 600px;
  overflow: hidden;
}
.faq-body-enter-from,
.faq-body-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
