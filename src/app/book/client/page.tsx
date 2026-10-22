import { Metadata } from 'next'
import { Section } from '@/components/ui'
import { CalEmbed } from '@/components/booking/CalEmbed'
import { booking, siteConfig } from '@/lib/config'

// Unlisted page Bryan shares with existing clients. Not linked from the site or sitemap.
export const metadata: Metadata = {
  title: 'Client Booking',
  robots: { index: false, follow: false },
}

function parsePrivateLink(url: string) {
  try {
    const parsed = new URL(url)
    return { origin: parsed.origin, link: parsed.pathname.replace(/^\/+/, '') + parsed.search }
  } catch {
    return null
  }
}

export default function ClientBookingPage() {
  const privateLink = booking.existingClientUrl ? parsePrivateLink(booking.existingClientUrl) : null

  return (
    <Section className="pt-12 md:pt-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl text-brand-900 mb-3 text-center">
          Book a {booking.events.clientLesson.label}
        </h1>
        <p className="text-brand-600 text-center mb-2">
          For existing NeuroRefinement clients &middot; {booking.events.clientLesson.duration} minutes, in person.
        </p>
        <p className="text-sm text-brand-500 text-center mb-8">
          {siteConfig.location.studio} {siteConfig.location.addressNote} {siteConfig.payment.note}
        </p>
        {privateLink ? (
          <CalEmbed link={privateLink.link} origin={privateLink.origin} />
        ) : (
          <div className="rounded-2xl border border-brand-100/50 bg-white p-8 text-center text-brand-700">
            Client booking isn&apos;t available online yet. Please email{' '}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-ocean-600 hover:text-ocean-700">
              {siteConfig.contact.email}
            </a>{' '}
            or call {siteConfig.contact.phone} to schedule.
          </div>
        )}
      </div>
    </Section>
  )
}
