import { ref } from 'vue'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

export const session = ref<Session | null>(null)
export const authReady = ref(false)

export const authReadyPromise = supabase.auth.getSession().then(({ data }) => {
  session.value = data.session
  authReady.value = true
})

supabase.auth.onAuthStateChange((_event, newSession) => {
  session.value = newSession
})

export async function signIn(email: string, password: string): Promise<string | null> {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  return error ? error.message : null
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut()
}
