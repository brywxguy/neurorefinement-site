import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { siteConfig } from '@/lib/config'
import { sendInquiryNotification } from '@/lib/email'
import { HONEYPOT_FIELD, inquirySchema, type InquiryResponse } from '@/lib/inquiries'
import { getServiceSupabase } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5

// Per-instance limiter. Serverless instances don't share memory, so the database check
// below is the real limit; this just short-circuits bursts hitting a warm instance.
const recentByIp = new Map<string, number[]>()

function hitMemoryLimit(ipHash: string, now: number) {
  const recent = (recentByIp.get(ipHash) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  recentByIp.set(ipHash, recent)
  if (recentByIp.size > 5000) recentByIp.clear()
  return recent.length > RATE_LIMIT_MAX
}

function clientIp(req: NextRequest) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

function hashIp(ip: string) {
  const salt = process.env.INQUIRY_IP_SALT || 'neurorefinement-inquiries'
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

function siteOrigin(req: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin || siteConfig.url
}

async function readBody(req: NextRequest): Promise<{ body: Record<string, unknown>; isForm: boolean }> {
  const contentType = req.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return { body: await req.json(), isForm: false }
  }
  const form = await req.formData()
  const body: Record<string, unknown> = {}
  const details: Record<string, unknown> = {}
  form.forEach((value, key) => {
    if (typeof value !== 'string') return
    if (key.startsWith('details.')) details[key.slice('details.'.length)] = value
    else body[key] = value
  })
  if (Object.keys(details).length) body.details = details
  return { body, isForm: true }
}

/** Redirect target for non-JS form posts: back to the page the form was on. */
function formRedirect(req: NextRequest, sourcePage: unknown, result: 'sent' | 'error') {
  const path = typeof sourcePage === 'string' && sourcePage.startsWith('/') && !sourcePage.startsWith('//')
    ? sourcePage
    : '/contact'
  const url = new URL(path, req.url)
  url.searchParams.set('inquiry', result)
  return NextResponse.redirect(url, 303)
}

export async function POST(req: NextRequest) {
  let raw: Record<string, unknown>
  let isForm = false
  try {
    ;({ body: raw, isForm } = await readBody(req))
  } catch {
    return NextResponse.json<InquiryResponse>({ ok: false, message: 'Invalid request.' }, { status: 400 })
  }

  const respond = (status: number, payload: InquiryResponse) =>
    isForm ? formRedirect(req, raw.source_page, payload.ok ? 'sent' : 'error') : NextResponse.json(payload, { status })

  const success: InquiryResponse = {
    ok: true,
    message: 'Thank you! Your message has been received. Bryan usually replies within 24 hours.',
  }

  // Honeypot: pretend it worked so bots don't adapt, but store nothing.
  const honeypot = raw[HONEYPOT_FIELD]
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return respond(200, success)
  }

  const parsed = inquirySchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.') || 'form'
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return respond(400, {
      ok: false,
      message: Object.values(fieldErrors)[0] || 'Please check the form and try again.',
      fieldErrors,
    })
  }
  const inquiry = parsed.data

  const ipHash = hashIp(clientIp(req))
  const rateLimited: InquiryResponse = {
    ok: false,
    message: 'You’ve sent several messages in a short time. Please wait a few minutes, or email Bryan directly.',
  }
  if (hitMemoryLimit(ipHash, Date.now())) return respond(429, rateLimited)

  const supabase = getServiceSupabase()
  let inquiryId: string | undefined
  let saved = false

  if (supabase) {
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
    const { count, error: countError } = await supabase
      .from('inquiries')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', since)
    if (!countError && (count ?? 0) >= RATE_LIMIT_MAX) return respond(429, rateLimited)

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        form_type: inquiry.form_type,
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone ?? null,
        who_for: inquiry.who_for ?? null,
        concern: inquiry.concern ?? null,
        how_heard: inquiry.how_heard ?? null,
        message: inquiry.message ?? null,
        source_page: inquiry.source_page ?? null,
        details: inquiry.details ?? {},
        // Consent columns only exist for free lesson signups (see the free_lesson migration).
        ...(inquiry.form_type === 'free_lesson'
          ? {
              consent_followup: inquiry.consent_followup === true,
              consent_sms: inquiry.consent_sms === true,
              consented_at: new Date().toISOString(),
            }
          : {}),
        ip_hash: ipHash,
        user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
      })
      .select('id')
      .single()

    if (error) {
      console.error('Inquiry insert failed:', error.message)
    } else {
      saved = true
      inquiryId = data.id
    }
  } else {
    console.error('Inquiry not saved: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set')
  }

  const notify = await sendInquiryNotification(inquiry, {
    inquiryId,
    adminUrl: `${siteOrigin(req)}/admin/inquiries`,
  })
  if (!notify.sent) console.warn('Inquiry notification email not sent:', notify.reason)

  // As long as the inquiry reached Bryan one way or the other, the visitor is done.
  if (saved || notify.sent) return respond(200, success)

  return respond(500, {
    ok: false,
    message: `Sorry — something went wrong sending your message. Please email ${siteConfig.contact.email} or call ${siteConfig.contact.phone}.`,
  })
}
