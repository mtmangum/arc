import { ref } from 'vue'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'arc-theme'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export const theme = ref<Theme>(getInitialTheme())

function apply(value: Theme): void {
  document.documentElement.setAttribute('data-theme', value)
  localStorage.setItem(STORAGE_KEY, value)
}

apply(theme.value)

export function toggleTheme(): void {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  apply(theme.value)
}
