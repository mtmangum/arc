import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Austin Rifle Club' },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('@/views/CalendarView.vue'),
      meta: { title: 'Calendar — Austin Rifle Club' },
    },
    {
      path: '/membership',
      name: 'membership',
      component: () => import('@/views/MembershipView.vue'),
      meta: { title: 'Membership — Austin Rifle Club' },
    },
    {
      path: '/membership/join',
      name: 'join',
      component: () => import('@/views/JoinView.vue'),
      meta: { title: 'How to Join — Austin Rifle Club' },
    },
    {
      path: '/ranges',
      name: 'ranges',
      component: () => import('@/views/RangesView.vue'),
      meta: { title: 'Ranges — Austin Rifle Club' },
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/FAQView.vue'),
      meta: { title: 'FAQ — Austin Rifle Club' },
    },
    {
      path: '/range-rules',
      name: 'range-rules',
      component: () => import('@/views/RangeRulesView.vue'),
      meta: { title: 'Range Rules — Austin Rifle Club' },
    },
    {
      path: '/member-area',
      name: 'member-area',
      component: () => import('@/views/MemberAreaView.vue'),
      meta: { title: 'Member Area — Austin Rifle Club' },
    },
  ],
})

router.afterEach((to) => {
  document.title = (to.meta.title as string) ?? 'Austin Rifle Club'
})

export default router
