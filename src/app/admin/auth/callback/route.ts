import { NextRequest, NextResponse } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createAuthSupabase, isSupabaseAuthConfigured } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const nextParam = searchParams.get('next') || '/admin/inquiries'
  const next = nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/admin/inquiries'

  if (!isSupabaseAuthConfigured()) {
    return NextResponse.redirect(new URL('/admin/login?error=config', req.url))
  }

  const supabase = createAuthSupabase()
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : tokenHash && type
      ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
      : { error: new Error('Missing code') }

  if (error) {
    console.error('Admin auth callback failed:', error.message)
    return NextResponse.redirect(new URL('/admin/login?error=link', req.url))
  }
  return NextResponse.redirect(new URL(next, req.url))
}
