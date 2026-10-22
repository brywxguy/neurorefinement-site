'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { Field, FormError, HoneypotField, inputClass } from '@/components/forms/fields'
import { HONEYPOT_FIELD } from '@/lib/inquiries'
import { submitInquiry } from '@/lib/submit-inquiry'

const UNLOCK_KEY = 'nr:free-lesson-unlocked'

function readUnlocked() {
  try {
    return Boolean(window.localStorage.getItem(UNLOCK_KEY))
  } catch {
    return false
  }
}

function rememberUnlocked() {
  try {
    window.localStorage.setItem(UNLOCK_KEY, new Date().toISOString())
  } catch {
    // Private browsing can block storage; the player still shows for this visit.
  }
}

export function FreeLessonGate({ title, audioUrl }: { title: string; audioUrl: string }) {
  const [state, setState] = useState<'checking' | 'locked' | 'unlocked'>('checking')
  const [justSignedUp, setJustSignedUp] = useState(false)

  useEffect(() => {
    setState(readUnlocked() ? 'unlocked' : 'locked')
  }, [])

  if (state === 'checking') {
    return <div aria-busy="true" className="bg-white rounded-2xl border border-brand-100/50 min-h-[220px]" />
  }

  if (state === 'unlocked') {
    return (
      <Card hover={false} className="text-left">
        {audioUrl ? (
          <>
            <h2 className="font-display text-xl text-brand-800 mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-brand-500" /> Listen to {title}
            </h2>
            <audio controls controlsList="nodownload" preload="none" src={audioUrl} aria-label={title} className="w-full">
              Your browser can&apos;t play this recording.
            </audio>
            <p className="text-sm text-brand-500 mt-4">
              Find a quiet, comfortable place to lie down, and listen at your own pace — pause any time.
            </p>
          </>
        ) : (
          <>
            <h2 className="font-display text-xl text-brand-800 mb-2">
              {justSignedUp ? 'Thank you — you’re on the list' : 'The recording is on its way to the site'}
            </h2>
            <p className="text-brand-600 leading-relaxed">
              The recording isn&apos;t on the site quite yet. Bryan will send it to you directly.
            </p>
          </>
        )}
      </Card>
    )
  }

  return (
    <SignupForm
      title={title}
      onUnlocked={() => {
        rememberUnlocked()
        setJustSignedUp(true)
        setState('unlocked')
      }}
    />
  )
}

function SignupForm({ title, onUnlocked }: { title: string; onUnlocked: () => void }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) || '').trim()
    const consentFollowup = data.get('consent_followup') === 'on'
    const consentSms = data.get('consent_sms') === 'on'

    const errors: Record<string, string> = {}
    if (!get('name')) errors.name = 'Please enter your first name.'
    if (!get('email')) errors.email = 'Please enter your email.'
    if (!consentFollowup) errors.consent_followup = 'Please agree to a personal follow-up to get the lesson.'
    if (consentSms && !get('phone')) errors.phone = 'Add a cell number to get texts, or uncheck that box.'
    setFieldErrors(errors)
    setError(null)
    if (Object.keys(errors).length) return

    setSubmitting(true)
    const result = await submitInquiry({
      form_type: 'free_lesson',
      name: get('name'),
      email: get('email'),
      phone: get('phone'),
      consent_followup: consentFollowup,
      consent_sms: consentSms,
      details: { lesson: title },
      [HONEYPOT_FIELD]: get(HONEYPOT_FIELD),
    })
    setSubmitting(false)
    if (!result.ok) {
      setError(result.message)
      setFieldErrors(result.fieldErrors || {})
      return
    }
    onUnlocked()
  }

  const err = (k: string) => fieldErrors[k]

  return (
    <Card hover={false} className="text-left">
      <form onSubmit={onSubmit} noValidate className="relative space-y-5">
        <div>
          <h2 className="font-display text-xl text-brand-800">Get {title}, free</h2>
          <p className="text-sm text-brand-500 mt-1">Tell us where to reach you and the lesson opens right away.</p>
        </div>
        <HoneypotField />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="First name" htmlFor="fl-name" required error={err('name')}>
            <input id="fl-name" name="name" type="text" required maxLength={200} autoComplete="given-name" className={inputClass} aria-invalid={Boolean(err('name'))} />
          </Field>
          <Field label="Email" htmlFor="fl-email" required error={err('email')}>
            <input id="fl-email" name="email" type="email" required maxLength={320} autoComplete="email" className={inputClass} aria-invalid={Boolean(err('email'))} />
          </Field>
        </div>
        <Field label="Cell phone" htmlFor="fl-phone" hint="Optional" error={err('phone')}>
          <input id="fl-phone" name="phone" type="tel" maxLength={50} autoComplete="tel" className={inputClass} aria-invalid={Boolean(err('phone'))} />
        </Field>
        <div className="space-y-3">
          <label className="flex items-start gap-3 text-sm text-brand-700">
            <input type="checkbox" name="consent_followup" required className="mt-1 accent-brand-500" aria-invalid={Boolean(err('consent_followup'))} />
            <span>
              Yes, Bryan may follow up with me personally about this lesson. <span className="text-gold-500" aria-hidden>*</span>
            </span>
          </label>
          {err('consent_followup') && <p className="text-sm text-red-600 -mt-1 ml-7">{err('consent_followup')}</p>}
          <label className="flex items-start gap-3 text-sm text-brand-700">
            <input type="checkbox" name="consent_sms" className="mt-1 accent-brand-500" />
            <span>
              Optional: it&apos;s OK to text me at the cell number above. Message and data rates may apply; reply STOP
              to opt out.
            </span>
          </label>
        </div>
        {error && <FormError message={error} />}
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Opening…' : 'Get the Free Lesson'}
        </Button>
        <p className="text-xs text-brand-500 leading-relaxed">
          We use your details only to share this lesson and follow up personally. We never sell or share them.
          See our{' '}
          <Link href="/privacy" className="text-ocean-600 underline underline-offset-2 hover:text-ocean-700">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </Card>
  )
}
