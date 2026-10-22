'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarCheck, CheckCircle, MessageCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui'
import { Field, FormError, HoneypotField, inputClass } from '@/components/forms/fields'
import { booking, calLink, isCalConfigured, pricing, siteConfig } from '@/lib/config'
import { HONEYPOT_FIELD, HOW_HEARD_OPTIONS, WHO_FOR_OPTIONS } from '@/lib/inquiries'
import { submitInquiry } from '@/lib/submit-inquiry'
import { cn } from '@/lib/utils'
import { CalEmbed, type CalPrefill } from './CalEmbed'

export type BookingOption = 'freeCall' | 'newClientLesson' | 'intensive'

const OPTION_META: Record<BookingOption, { title: string; subtitle: string; icon: JSX.Element }> = {
  freeCall: {
    title: booking.events.freeCall.label,
    subtitle: `New here? A no-pressure ${booking.events.freeCall.duration}-minute conversation on ${booking.events.freeCall.format}.`,
    icon: <MessageCircle className="w-5 h-5" />,
  },
  newClientLesson: {
    title: booking.events.newClientLesson.label,
    subtitle: `Your first in-person visit: ${pricing.abm.newClientLesson.duration} min, $${pricing.abm.newClientLesson.price}.`,
    icon: <CalendarCheck className="w-5 h-5" />,
  },
  intensive: {
    title: 'Request an Intensive',
    subtitle: `${pricing.abm.intensive.label}: ${pricing.abm.intensive.lessons} lessons + ${pricing.abm.intensive.homeworkMonths} month of audio homework.`,
    icon: <Sparkles className="w-5 h-5" />,
  },
}

interface BookingOptionsProps {
  options?: BookingOption[]
  className?: string
}

export function BookingOptions({ options = ['freeCall', 'newClientLesson', 'intensive'], className }: BookingOptionsProps) {
  const [selected, setSelected] = useState<BookingOption>(options[0])

  return (
    <div className={className}>
      <div className={cn('grid gap-4 mb-6', options.length > 1 ? 'sm:grid-cols-3' : 'grid-cols-1')}>
        {options.map((option) => {
          const meta = OPTION_META[option]
          const content = (
            <>
              <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-3">
                {meta.icon}
              </span>
              <span className="block font-display text-lg text-brand-900">{meta.title}</span>
              <span className="block text-sm text-brand-500 mt-1">{meta.subtitle}</span>
            </>
          )
          const classes = cn(
            'text-left rounded-2xl border bg-white p-5 transition-all',
            selected === option && option !== 'intensive'
              ? 'border-brand-500 ring-2 ring-brand-100'
              : 'border-brand-100/50 hover:border-brand-300'
          )
          return option === 'intensive' ? (
            <Link key={option} href={booking.intensiveHref} className={classes}>
              {content}
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-ocean-600">
                Tell Bryan what you need <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ) : (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              aria-pressed={selected === option}
              className={classes}
            >
              {content}
            </button>
          )
        })}
      </div>

      {selected === 'freeCall' && <FreeCallFlow />}
      {selected === 'newClientLesson' && <LessonBooking />}

      <p className="mt-6 text-center text-sm text-brand-500">
        Existing client? Book a {booking.events.clientLesson.label} with the private link Bryan sent you, or{' '}
        <a href={`mailto:${siteConfig.contact.email}`} className="text-ocean-600 hover:text-ocean-700">
          email Bryan
        </a>
        .
      </p>
    </div>
  )
}

function NotYetOnline({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-brand-100/50 bg-white p-8 text-center">
      <p className="text-brand-700 mb-4">{children}</p>
      <Button href="/contact" variant="outline" size="sm">
        Request a time
      </Button>
    </div>
  )
}

function LessonBooking() {
  if (!isCalConfigured) {
    return (
      <NotYetOnline>
        Online booking is being set up. Send a quick request and Bryan will reply with available times.
      </NotYetOnline>
    )
  }
  return (
    <div>
      <p className="text-sm text-brand-500 mb-3 text-center">
        Not sure yet? Start with the {booking.events.freeCall.label} ({booking.events.freeCall.duration} minutes on{' '}
        {booking.events.freeCall.format}) so Bryan can learn about your situation first.
      </p>
      <CalEmbed link={calLink(booking.events.newClientLesson.slug)} />
    </div>
  )
}

function FreeCallFlow() {
  const [prefill, setPrefill] = useState<CalPrefill | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [booked, setBooked] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) || '')
    setSubmitting(true)
    setError(null)
    setFieldErrors({})
    const result = await submitInquiry({
      form_type: 'free_call',
      name: get('name'),
      email: get('email'),
      phone: get('phone'),
      who_for: get('who_for'),
      concern: get('concern'),
      how_heard: get('how_heard'),
      message: get('message'),
      [HONEYPOT_FIELD]: get(HONEYPOT_FIELD),
    })
    setSubmitting(false)
    if (!result.ok) {
      setError(result.message)
      setFieldErrors(result.fieldErrors || {})
      return
    }
    setPrefill({
      name: get('name'),
      email: get('email'),
      notes: [`Who for: ${get('who_for')}`, `Main concern: ${get('concern')}`, get('message')].filter(Boolean).join('\n'),
    })
  }

  if (prefill) {
    if (booked) {
      return (
        <Confirmation title="You're booked!">
          Check your email for the calendar invite. Bryan is looking forward to talking with you.
        </Confirmation>
      )
    }
    if (!isCalConfigured) {
      return (
        <Confirmation title="Thanks — Bryan has your details">
          Online scheduling is being set up, so Bryan will reach out personally (usually within 24 hours) to find a time
          for your free call.
        </Confirmation>
      )
    }
    return (
      <div>
        <p className="text-center text-brand-600 mb-3">
          Thanks, {prefill.name?.split(' ')[0]}! Now pick a time that works for you.
        </p>
        <CalEmbed link={calLink(booking.events.freeCall.slug)} prefill={prefill} onBooked={() => setBooked(true)} />
      </div>
    )
  }

  const err = (k: string) => fieldErrors[k]

  return (
    <form onSubmit={onSubmit} className="relative rounded-2xl border border-brand-100/50 bg-white p-6 md:p-8 space-y-5">
      <div>
        <h3 className="font-display text-xl text-brand-900">A few quick questions first</h3>
        <p className="text-sm text-brand-500 mt-1">
          This helps Bryan make the most of your 20 minutes. Then you&apos;ll choose a time.
        </p>
      </div>
      <HoneypotField />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" htmlFor="fc-name" required error={err('name')}>
          <input id="fc-name" name="name" type="text" required maxLength={200} autoComplete="name" className={inputClass} />
        </Field>
        <Field label="Email" htmlFor="fc-email" required error={err('email')}>
          <input id="fc-email" name="email" type="email" required maxLength={320} autoComplete="email" className={inputClass} />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Phone" htmlFor="fc-phone" hint="Optional" error={err('phone')}>
          <input id="fc-phone" name="phone" type="tel" maxLength={50} autoComplete="tel" className={inputClass} />
        </Field>
        <Field label="Who is this for?" htmlFor="fc-who_for" required error={err('who_for')}>
          <select id="fc-who_for" name="who_for" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select…
            </option>
            {WHO_FOR_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="What would you most like help with?" htmlFor="fc-concern" required error={err('concern')}>
        <textarea
          id="fc-concern"
          name="concern"
          rows={3}
          required
          maxLength={2000}
          placeholder="e.g. ongoing back pain, my child's coordination, recovering from surgery"
          className={inputClass}
        />
      </Field>
      <Field label="Anything else Bryan should know?" htmlFor="fc-message" hint="Optional">
        <textarea id="fc-message" name="message" rows={2} maxLength={10000} className={inputClass} />
      </Field>
      <Field label="How did you hear about NeuroRefinement?" htmlFor="fc-how_heard">
        <select id="fc-how_heard" name="how_heard" defaultValue="" className={inputClass}>
          <option value="">Select…</option>
          {HOW_HEARD_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </Field>
      {error && <FormError message={error} />}
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Saving…' : isCalConfigured ? 'Continue to pick a time' : 'Request my free call'}
      </Button>
    </form>
  )
}

function Confirmation({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="status" className="rounded-2xl border border-brand-100/50 bg-white p-8 text-center">
      <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-500 flex items-center justify-center mx-auto mb-5">
        <CheckCircle className="w-7 h-7" />
      </div>
      <h3 className="font-display text-2xl text-brand-900 mb-3">{title}</h3>
      <p className="text-brand-600 max-w-md mx-auto">{children}</p>
    </div>
  )
}
