import { Metadata } from 'next'
import { CalendarRange, MapPin, Package } from 'lucide-react'
import { Button, PricingCard, Section, SectionHeader } from '@/components/ui'
import { booking, intensiveSummary, pricing, siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Bundles & Packs',
  description: `Functional Synthesis lesson packs (1:1) and the ${pricing.abm.intensive.label}: ${intensiveSummary}`,
}

export default function BundlesPage() {
  const { pack4, intensive, session } = pricing.abm

  return (
    <>
      <Section className="pt-12 md:pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
            Bundles &amp; Packs
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">Save as You Go Deeper</h1>
          <p className="text-xl text-brand-600 leading-relaxed">
            A lesson pack for ongoing one-on-one Functional Synthesis work, or an intensive that pairs
            concentrated lessons with audio homework.
          </p>
        </div>
      </Section>

      <Section variant="light" id="lesson-packs" className="scroll-mt-20">
        <SectionHeader
          eyebrow="Lesson packs & intensives"
          title="Functional Synthesis Packs"
          description={`Your first visit is a ${pricing.abm.newClientLesson.label}, booked on its own. Lessons are about ${session.duration} minutes each.`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <PricingCard
            featured
            badge="Best Value"
            title={`${pack4.sessions}-Session Pack`}
            price={pack4.price}
            note={<>${pack4.perSession}/session &middot; {pack4.savings}</>}
            footer={<><Package className="w-4 h-4 shrink-0 mt-0.5" /> {pack4.sessions} × {session.shortLabel}</>}
            action={<Button href="/functional-synthesis#booking" size="sm" variant="outline">Book a Lesson</Button>}
          />
          <PricingCard
            meta={<><CalendarRange className="w-4 h-4" /> {intensive.lessons} lessons + audio homework</>}
            title={intensive.label}
            price={intensive.price}
            note={intensiveSummary}
            footer={<><MapPin className="w-4 h-4 shrink-0 mt-0.5" /> Lessons in person</>}
            action={<Button href={booking.intensiveHref} size="sm">Request an Intensive</Button>}
          />
        </div>
        <p className="text-center text-brand-600 leading-relaxed mt-8 max-w-2xl mx-auto">
          {siteConfig.payment.note} To start a pack, ask Bryan at your next lesson or get in touch. For an
          intensive, send a request and Bryan will follow up to plan dates. New here? Start with a{' '}
          {booking.events.freeCall.label}.
        </p>
        <div className="flex justify-center mt-8">
          <Button href="/contact" variant="outline">
            Ask About Packs
          </Button>
        </div>
      </Section>
    </>
  )
}
