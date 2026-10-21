import { siteConfig } from '@/lib/config'
import type { InquiryInput, InquiryResponse } from '@/lib/inquiries'

export type InquiryPayload = Partial<Omit<InquiryInput, 'source_page'>> & Record<string, unknown>

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, source_page: window.location.pathname + window.location.search }),
    })
    const data = (await res.json().catch(() => null)) as InquiryResponse | null
    if (data && typeof data.ok === 'boolean') return data
    return { ok: false, message: fallbackMessage() }
  } catch {
    return { ok: false, message: fallbackMessage() }
  }
}

function fallbackMessage() {
  return `We couldn’t send your message. Please check your connection and try again, or email ${siteConfig.contact.email}.`
}
