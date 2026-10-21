import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Free-tier Supabase projects pause after ~7 days without database activity.
// This route performs a real one-row SELECT so the project registers activity.
// Called daily by the Vercel cron in vercel.json.

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: 'Supabase env vars not configured' }, { status: 500 })
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } })
  const { data, error } = await supabase.from('lessons').select('id').limit(1)

  if (error) {
    console.error('Supabase keep-alive failed:', error.message)
    return NextResponse.json({ ok: false, error: error.message }, { status: 503 })
  }

  return NextResponse.json({
    ok: true,
    rows: data?.length ?? 0,
    checkedAt: new Date().toISOString(),
  })
}
