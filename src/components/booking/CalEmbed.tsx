'use client'

import { useEffect, useId, useRef } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { ExternalLink } from 'lucide-react'
import { booking } from '@/lib/config'
import { cn } from '@/lib/utils'

export type CalPrefill = {
  name?: string
  email?: string
  notes?: string
  /** Responses to custom Cal.com booking questions, keyed by question identifier. */
  [questionId: string]: string | undefined
}

interface CalEmbedProps {
  /** Path after the Cal.com origin, e.g. "bryan/free-20-min-call" or "d/abc123/new-client-lesson". */
  link: string
  origin?: string
  prefill?: CalPrefill
  onBooked?: () => void
  className?: string
}

export function CalEmbed({ link, origin = booking.calOrigin, prefill, onBooked, className }: CalEmbedProps) {
  const namespace = `nr${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const onBookedRef = useRef(onBooked)
  onBookedRef.current = onBooked

  useEffect(() => {
    let cancelled = false
    getCalApi({ namespace, embedJsUrl: booking.calEmbedScript }).then((cal) => {
      if (cancelled) return
      cal('ui', { layout: 'month_view', hideEventTypeDetails: false })
      cal('on', { action: 'bookingSuccessful', callback: () => onBookedRef.current?.() })
    })
    return () => {
      cancelled = true
    }
  }, [namespace])

  const config = Object.fromEntries(
    Object.entries({ layout: 'month_view', ...prefill }).filter((entry): entry is [string, string] => Boolean(entry[1]))
  )

  return (
    <div className={cn('rounded-2xl border border-brand-100/50 bg-white overflow-hidden', className)}>
      <Cal
        namespace={namespace}
        calLink={link}
        calOrigin={origin}
        embedJsUrl={booking.calEmbedScript}
        config={config}
        style={{ width: '100%', minHeight: 560, overflow: 'auto' }}
      />
      <div className="border-t border-brand-100/50 px-4 py-3 text-center text-sm">
        <a
          href={`${origin}/${link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-ocean-600 hover:text-ocean-700"
        >
          Calendar not loading? Open the booking page <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}
