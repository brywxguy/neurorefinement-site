'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { isAdminEmail } from '@/lib/admin-auth'
import { createAuthSupabase, isSupabaseAuthConfigured } from '@/lib/supabase-server'

function requestOrigin() {
  const h = headers()
  const origin = h.get('origin')
  if (origin) return origin
  const host = h.get('x-forwarded-host') || h.get('host')
  const proto = h.get('x-forwarded-proto') || 'https'
  return `${proto}://${host}`
}

export async function sendMagicLink(formData: FormData) {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  if (!email) redirect('/admin/login?error=missing')
  if (!isSupabaseAuthConfigured()) redirect('/admin/login?error=config')

  // Same response either way so the page doesn't reveal which emails are allowed.
  if (isAdminEmail(email)) {
    const supabase = createAuthSupabase()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${requestOrigin()}/admin/auth/callback?next=/admin/inquiries`,
        shouldCreateUser: true,
      },
    })
    if (error) {
      console.error('Admin magic link failed:', error.message)
      redirect('/admin/login?error=send')
    }
  }
  redirect('/admin/login?sent=1')
}

export async function signOut() {
  if (isSupabaseAuthConfigured()) {
    await createAuthSupabase().auth.signOut()
  }
  redirect('/admin/login')
}
