import { redirect } from 'next/navigation'
import { createAuthSupabase, isSupabaseAuthConfigured } from '@/lib/supabase-server'

const DEFAULT_ADMIN_EMAILS = ['bryan@neurorefinement.com', 'bpthunstrom@gmail.com']

export function getAdminEmails(): string[] {
  const fromEnv = process.env.ADMIN_EMAILS?.split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_ADMIN_EMAILS
}

export function isAdminEmail(email: string | null | undefined): boolean {
  return Boolean(email) && getAdminEmails().includes(email!.trim().toLowerCase())
}

/** Returns the signed-in admin's email, or null if not signed in / not allowlisted. */
export async function getAdminUser(): Promise<{ email: string } | null> {
  if (!isSupabaseAuthConfigured()) return null
  const supabase = createAuthSupabase()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user || !isAdminEmail(data.user.email)) return null
  return { email: data.user.email! }
}

export async function requireAdmin(): Promise<{ email: string }> {
  const admin = await getAdminUser()
  if (!admin) redirect('/admin/login')
  return admin
}
