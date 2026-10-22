import { siteConfig } from '@/lib/config'
import { FORM_TYPE_LABELS, type InquiryInput } from '@/lib/inquiries'

const DEFAULT_NOTIFY_EMAIL = 'bryan@neurorefinement.com'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export type NotifyResult = { sent: true } | { sent: false; reason: string }

/**
 * Emails Bryan about a new inquiry via Resend. Never throws: a missing key or a Resend
 * failure is reported in the return value so the caller can still treat the submission
 * as saved.
 */
export async function sendInquiryNotification(
  inquiry: InquiryInput,
  opts: { inquiryId?: string; adminUrl?: string } = {}
): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { sent: false, reason: 'RESEND_API_KEY not set' }

  const to = (process.env.INQUIRY_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL)
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)
  const from = process.env.RESEND_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`
  const label = FORM_TYPE_LABELS[inquiry.form_type]

  // Intake answers can include health information, so they stay in the admin page
  // rather than being copied into email.
  const rows: Array<[string, string | undefined]> = [
    ['Type', label],
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone],
    ['Who it’s for', inquiry.who_for],
    ['Main concern', inquiry.form_type === 'intake' ? undefined : inquiry.concern],
    ['How they heard', inquiry.how_heard],
    ['Message', inquiry.message],
    ['Follow-up consent', inquiry.consent_followup === undefined ? undefined : inquiry.consent_followup ? 'Yes' : 'No'],
    ['Texts OK', inquiry.consent_sms === undefined ? undefined : inquiry.consent_sms ? 'Yes' : 'No'],
    ['Submitted from', inquiry.source_page],
  ]
  const filled = rows.filter((r): r is [string, string] => Boolean(r[1]))

  const textLines = [`New ${label} on ${siteConfig.name}`, '', ...filled.map(([k, v]) => `${k}: ${v}`), '']
  if (inquiry.form_type === 'intake') textLines.push('Full intake answers are on the admin page.')
  if (opts.adminUrl) textLines.push(`Review: ${opts.adminUrl}`)
  const text = textLines.join('\n')

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#1f2a24;max-width:600px">
      <h2 style="margin:0 0 16px">New ${escapeHtml(label)}</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${filled
          .map(
            ([k, v]) =>
              `<tr><td style="vertical-align:top;color:#5b6b61;white-space:nowrap"><strong>${escapeHtml(k)}</strong></td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
          )
          .join('')}
      </table>
      ${inquiry.form_type === 'intake' ? '<p>Full intake answers are on the admin page.</p>' : ''}
      ${opts.adminUrl ? `<p><a href="${escapeHtml(opts.adminUrl)}">Open in admin</a></p>` : ''}
      <p style="color:#8a958e;font-size:12px">Reply to this email to respond directly to ${escapeHtml(inquiry.name)}.</p>
    </div>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: inquiry.email,
        subject: `New ${label}: ${inquiry.name}`,
        text,
        html,
        ...(opts.inquiryId ? { headers: { 'X-Entity-Ref-ID': opts.inquiryId } } : {}),
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      return { sent: false, reason: `Resend responded ${res.status}: ${body.slice(0, 300)}` }
    }
    return { sent: true }
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : String(err) }
  }
}
