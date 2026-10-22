'use client'

import { FormEvent, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui'
import { intensiveSummary, pricing, siteConfig } from '@/lib/config'
import { HOW_HEARD_OPTIONS, WHO_FOR_OPTIONS, type FormType } from '@/lib/inquiries'
import { submitInquiry } from '@/lib/submit-inquiry'
import { Field, FormError, HoneypotField, inputClass } from './fields'

type ContactFormType = Extract<FormType, 'contact' | 'intensive'>

const TOPICS = [
  'General question',
  'Functional Synthesis lessons',
  'TML lessons (individual or group)',
  'Voice-guided lessons',
  'Coaching',
  'Children with special needs',
  'Other',
]

/** Turns FormData into an inquiry payload; `details.*` fields are nested under `details`. */
function toPayload(data: FormData) {
  const payload: Record<string, unknown> = {}
  const details: Record<string, string> = {}
  data.forEach((value, key) => {
    if (typeof value !== 'string') return
    if (key.startsWith('details.')) {
      if (value) details[key.slice('details.'.length)] = value
    } else {
      payload[key] = value
    }
  })
  if (Object.keys(details).length) payload.details = details
  return payload
}

export function InquiryForm() {
  const searchParams = useSearchParams()
  const initialType: ContactFormType = searchParams.get('type') === 'intensive' ? 'intensive' : 'contact'
  const [formType, setFormType] = useState<ContactFormType>(initialType)
  const [state, setState] = useState<'idle' | 'submitting' | 'sent'>(
    searchParams.get('inquiry') === 'sent' ? 'sent' : 'idle'
  )
  const [error, setError] = useState<string | null>(
    searchParams.get('inquiry') === 'error'
      ? `Something went wrong sending your message. Please try again or email ${siteConfig.contact.email}.`
      : null
  )
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setError(null)
    setFieldErrors({})
    const result = await submitInquiry(toPayload(new FormData(e.currentTarget)))
    if (result.ok) {
      setState('sent')
      return
    }
    setState('idle')
    setError(result.message)
    setFieldErrors(result.fieldErrors || {})
  }

  if (state === 'sent') {
    return (
      <div className="text-center py-8" role="status">
        <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-500 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7" />
        </div>
        <h2 className="font-display text-2xl text-brand-900 mb-3">
          {formType === 'intensive' ? 'Intensive request received' : 'Message sent'}
        </h2>
        <p className="text-brand-600 mb-6">
          Thank you for reaching out. Bryan usually replies within 24 hours. If it&apos;s urgent, call{' '}
          <a href={`tel:${siteConfig.contact.phoneE164}`} className="text-ocean-600 hover:text-ocean-700">
            {siteConfig.contact.phone}
          </a>
          .
        </p>
        <Button variant="outline" onClick={() => setState('idle')}>
          Send another message
        </Button>
      </div>
    )
  }

  const err = (name: string) => fieldErrors[name]

  return (
    <form action="/api/inquiries" method="POST" onSubmit={onSubmit} className="space-y-5 relative">
      <input type="hidden" name="source_page" value={formType === 'intensive' ? '/contact?type=intensive' : '/contact'} />
      <HoneypotField />

      <fieldset>
        <legend className="block text-sm font-medium text-brand-700 mb-2">What would you like to do?</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(
            [
              ['contact', 'Ask a question'],
              ['intensive', 'Request an intensive'],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer text-sm transition ${
                formType === value ? 'border-brand-500 bg-brand-50 text-brand-800' : 'border-brand-200 text-brand-600 hover:border-brand-300'
              }`}
            >
              <input
                type="radio"
                name="form_type"
                value={value}
                checked={formType === value}
                onChange={() => setFormType(value)}
                className="accent-brand-500"
              />
              {label}
            </label>
          ))}
        </div>
        {formType === 'intensive' && (
          <p className="mt-2 text-sm text-brand-500">
            The {pricing.abm.intensive.label} is {intensiveSummary} Tell
            Bryan a bit about your situation and he&apos;ll follow up to plan dates.
          </p>
        )}
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" htmlFor="name" required error={err('name')}>
          <input id="name" name="name" type="text" required maxLength={200} autoComplete="name" className={inputClass} />
        </Field>
        <Field label="Email" htmlFor="email" required error={err('email')}>
          <input id="email" name="email" type="email" required maxLength={320} autoComplete="email" className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Phone" htmlFor="phone" hint="Optional" error={err('phone')}>
          <input id="phone" name="phone" type="tel" maxLength={50} autoComplete="tel" className={inputClass} />
        </Field>
        <Field label="Who is this for?" htmlFor="who_for" error={err('who_for')}>
          <select id="who_for" name="who_for" defaultValue="" className={inputClass}>
            <option value="">Select…</option>
            {WHO_FOR_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>

      {formType === 'contact' ? (
        <Field label="Topic" htmlFor="topic">
          <select id="topic" name="details.topic" defaultValue={TOPICS[0]} className={inputClass}>
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Where?" htmlFor="format">
            <select id="format" name="details.format" defaultValue="" className={inputClass}>
              <option value="">Not sure yet</option>
              <option value="In person (Carlsbad home studio)">In person (Carlsbad home studio)</option>
              <option value="Travel to me (additional fee)">Travel to me (at Bryan&apos;s discretion, additional fee)</option>
            </select>
          </Field>
          <Field label="Preferred timing" htmlFor="timing" hint="e.g. “mid-March” or “flexible”">
            <input id="timing" name="details.timing" type="text" maxLength={200} className={inputClass} />
          </Field>
        </div>
      )}

      <Field label="Main concern or goal" htmlFor="concern" error={err('concern')}>
        <input
          id="concern"
          name="concern"
          type="text"
          maxLength={2000}
          placeholder="e.g. chronic neck pain, my child’s development, career direction"
          className={inputClass}
        />
      </Field>

      <Field label="Message" htmlFor="message" required error={err('message')}>
        <textarea id="message" name="message" rows={5} required maxLength={10000} className={inputClass} />
      </Field>

      <Field label="How did you hear about NeuroRefinement?" htmlFor="how_heard">
        <select id="how_heard" name="how_heard" defaultValue="" className={inputClass}>
          <option value="">Select…</option>
          {HOW_HEARD_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </Field>

      {error && <FormError message={error} />}

      <Button type="submit" className="w-full" disabled={state === 'submitting'}>
        {state === 'submitting' ? 'Sending…' : formType === 'intensive' ? 'Request an Intensive' : 'Send Message'}
      </Button>
    </form>
  )
}
