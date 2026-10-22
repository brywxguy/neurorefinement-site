import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { redirect } from 'next/navigation'
import { Button, Section } from '@/components/ui'
import { FormError, inputClass } from '@/components/forms/fields'
import { getAdminUser } from '@/lib/admin-auth'
import { createAuthSupabase, isSupabaseAuthConfigured } from '@/lib/supabase-server'
import { sendMagicLink, signOut } from '../actions'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = pageMetadata('/admin/login', { title: 'Admin sign-in' })

const ERRORS: Record<string, string> = {
  missing: 'Please enter your email address.',
  config: 'Supabase Auth is not configured for this deployment (missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).',
  send: 'We couldn’t send the sign-in link. Please wait a minute and try again.',
  link: 'That sign-in link is invalid or expired. Links work once, in the same browser you requested them from. Please request a new one.',
}

export default async function AdminLoginPage({ searchParams }: { searchParams: { sent?: string; error?: string } }) {
  if (await getAdminUser()) redirect('/admin/inquiries')

  let signedInAs: string | null = null
  if (isSupabaseAuthConfigured()) {
    const { data } = await createAuthSupabase().auth.getUser()
    signedInAs = data.user?.email ?? null
  }

  return (
    <Section className="pt-12 md:pt-16">
      <div className="max-w-md mx-auto bg-white rounded-2xl border border-brand-100/50 p-8">
        <h1 className="font-display text-3xl text-brand-900 mb-2">Admin sign in</h1>
        <p className="text-brand-500 text-sm mb-6">We&apos;ll email you a one-time sign-in link.</p>

        {signedInAs ? (
          <div className="space-y-4">
            <FormError message={`${signedInAs} is not authorized to view this page.`} />
            <form action={signOut}>
              <Button type="submit" variant="outline" className="w-full">
                Sign out
              </Button>
            </form>
          </div>
        ) : searchParams.sent ? (
          <p role="status" className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-brand-700 text-sm">
            If that email is authorized, a sign-in link is on its way. Open it in this same browser.
          </p>
        ) : (
          <form action={sendMagicLink} className="space-y-4">
            {searchParams.error && ERRORS[searchParams.error] && <FormError message={ERRORS[searchParams.error]} />}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-1.5">
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
            </div>
            <Button type="submit" className="w-full">
              Email me a sign-in link
            </Button>
          </form>
        )}
      </div>
    </Section>
  )
}
