import { z } from 'zod'

// Shared by client forms, the /api/inquiries route and the admin page.
// Keep FORM_TYPES / INQUIRY_STATUSES in sync with the CHECK constraints in
// supabase/migrations/20261021210000_inquiries.sql.

export const FORM_TYPES = ['contact', 'intensive', 'free_call', 'start_here', 'intake'] as const
export type FormType = (typeof FORM_TYPES)[number]

export const FORM_TYPE_LABELS: Record<FormType, string> = {
  contact: 'Contact form',
  intensive: 'Intensive request',
  free_call: 'Free 20-min call',
  start_here: 'Start Here questionnaire',
  intake: 'New client intake',
}

export const INQUIRY_STATUSES = ['new', 'contacted', 'booked', 'not_a_fit'] as const
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number]

export const INQUIRY_STATUS_LABELS: Record<InquiryStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  booked: 'Booked',
  not_a_fit: 'Not a fit',
}

export const WHO_FOR_OPTIONS = ['Myself', 'My child', 'A parent or family member', 'Someone else'] as const

export const HOW_HEARD_OPTIONS = [
  'Google / search',
  'Google Maps',
  'Friend or referral',
  'Healthcare provider',
  'Social media',
  'Church community',
  'Other',
] as const

/** Hidden field bots tend to fill in. Real visitors never see it. */
export const HONEYPOT_FIELD = 'website'

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined))

export const inquirySchema = z
  .object({
    form_type: z.enum(FORM_TYPES),
    name: z.string().trim().min(1, 'Please enter your name.').max(200),
    email: z.string().trim().toLowerCase().email('Please enter a valid email address.').max(320),
    phone: optionalText(50),
    who_for: optionalText(100),
    concern: optionalText(2000),
    how_heard: optionalText(200),
    message: optionalText(10000),
    source_page: optionalText(500),
    details: z
      .record(z.unknown())
      .optional()
      .refine((d) => !d || JSON.stringify(d).length <= 20000, 'Submission is too large.'),
  })
  .superRefine((data, ctx) => {
    if ((data.form_type === 'contact' || data.form_type === 'intensive') && !data.message) {
      ctx.addIssue({ code: 'custom', path: ['message'], message: 'Please include a short message.' })
    }
    if (data.form_type === 'free_call') {
      if (!data.who_for) {
        ctx.addIssue({ code: 'custom', path: ['who_for'], message: 'Please tell us who this is for.' })
      }
      if (!data.concern) {
        ctx.addIssue({ code: 'custom', path: ['concern'], message: 'Please share what you would like help with.' })
      }
    }
  })

export type InquiryInput = z.infer<typeof inquirySchema>

export type Inquiry = {
  id: string
  created_at: string
  updated_at: string
  form_type: FormType
  name: string
  email: string
  phone: string | null
  who_for: string | null
  concern: string | null
  how_heard: string | null
  message: string | null
  source_page: string | null
  status: InquiryStatus
  notes: string | null
  details: Record<string, unknown>
}

export type InquiryResponse =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string> }
