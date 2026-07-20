import { createClient } from '@supabase/supabase-js'

const envUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(envUrl && envAnonKey)

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env — see .env.example. ' +
    'Falling back to a placeholder client; all calls will fail until this is set.'
  )
}

// createClient throws synchronously on an invalid URL, so fall back to a
// syntactically-valid placeholder when unconfigured — this lets the app boot
// and surface errors at each call site instead of crashing on load.
export const supabase = createClient(
  envUrl ?? 'https://placeholder.supabase.co',
  envAnonKey ?? 'placeholder-anon-key'
)
