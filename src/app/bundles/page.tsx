import { Metadata } from 'next'
import { Package, Play } from 'lucide-react'
import { Button, PricingCard, Section, SectionHeader } from '@/components/ui'
import { booking, pricing, siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Bundles & Packs',
  description: pricing.lessons.bundle5.onSite
    ? 'Save with Functional Synthesis lesson packs (1:1) and audio lesson bundles from NeuroRefinement.'
    : 'Save with a Functional Synthesis lesson pack (1:1) from NeuroRefinement.',
}

export default function BundlesPage() {
  const { pack4, pack10, session } = pricing.abm
  const { bundle5 } = pricing.lessons

  return (
    <>
      <Section className="pt-12 md:pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
            Bundles &amp; Packs
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">Save as You Go Deeper</h1>
          <p className="text-xl text-brand-600 leading-relaxed">
            Lesson packs for ongoing one-on-one Functional Synthesis work
            {bundle5.onSite ? ', and audio bundles for learning at home.' : '.'}
          </p>
        </div>
      </Section>

      <Section variant="light" id="lesson-packs" className="scroll-mt-20">
        <SectionHeader
          eyebrow="In-person lesson packs"
          title="Functional Synthesis Lesson Packs"
          description={`Packs of ${session.label} sessions (about ${session.duration} minutes each). Your first visit is a ${pricing.abm.newClientLesson.label}, booked on its own.`}
        />
        <div className={pack10.onSite ? 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto' : 'grid max-w-sm mx-auto'}>
          <PricingCard
            featured
            badge="Best Value"
            title={`${pack4.sessions}-Session Pack`}
            price={pack4.price}
            note={<>${pack4.perSession}/session &middot; {pack4.savings}</>}
            footer={<><Package className="w-4 h-4 shrink-0 mt-0.5" /> {pack4.sessions} × {session.shortLabel}</>}
          />
          {pack10.onSite && (
            <PricingCard
              title={`${pack10.sessions}-Session Pack`}
              price={pack10.price}
              note={<>${pack10.perSession}/session &middot; {pack10.savings}</>}
              footer={<><Package className="w-4 h-4 shrink-0 mt-0.5" /> {pack10.sessions} × {session.shortLabel}</>}
            />
          )}
        </div>
        <p className="text-center text-brand-600 leading-relaxed mt-8 max-w-2xl mx-auto">
          {siteConfig.payment.note} To start a pack, ask Bryan at your next lesson or get in touch. New here?
          Start with a {booking.events.freeCall.label}.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button href="/functional-synthesis#booking">Book a Lesson</Button>
          <Button href="/contact" variant="outline">
            Ask About Packs
          </Button>
        </div>
      </Section>

      {bundle5.onSite && (
        <Section id="audio-bundles" className="scroll-mt-20">
          <SectionHeader
            eyebrow="Audio lesson bundles"
            title="Voice-Guided Lesson Bundles"
            description="Choose lessons from the audio library and save when you buy several at once."
          />
          <div className="grid grid-cols-1 max-w-sm mx-auto">
            <PricingCard
              meta={<><Play className="w-4 h-4" /> {bundle5.count} audio lessons</>}
              title={bundle5.label}
              price={bundle5.price}
              note={<>${bundle5.perLesson.toFixed(2)}/lesson &middot; single lessons ${pricing.lessons.single.price}</>}
            />
          </div>
          <div className="text-center mt-8">
            <Button href="/lessons" variant="outline">
              Browse the Audio Library
            </Button>
          </div>
        </Section>
      )}
    </>
  )
}
