import Link from 'next/link'
import { Clock, MapPin } from 'lucide-react'
import { booking, siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'

/** One-line visit summary. Full location, hours, and payment details live on the booking pages. */
export function VisitStrip({ showIntroCall = true, className }: { showIntroCall?: boolean; className?: string }) {
  const { freeCall } = booking.events
  return (
    <div className={cn('text-center text-brand-600 leading-relaxed', className)}>
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span className="inline-flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-500 shrink-0" aria-hidden />
          In-person lessons at a {siteConfig.location.city} home studio
        </span>
        <span className="hidden sm:inline" aria-hidden>
          &middot;
        </span>
        <span className="inline-flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-500 shrink-0" aria-hidden />
          {siteConfig.hours.daysShort}, {siteConfig.hours.timeShort}.
        </span>
      </p>
      {showIntroCall && (
        <p className="mt-1">
          Not sure where to start?{' '}
          <Link
            href="/functional-synthesis#booking"
            className="text-ocean-600 underline underline-offset-2 hover:text-ocean-700 transition-colors"
          >
            Book a free {freeCall.duration}-minute intro call
          </Link>{' '}
          ({freeCall.format}).
        </p>
      )}
    </div>
  )
}
