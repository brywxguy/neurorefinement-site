import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Section, SectionHeader, PricingCard, ImageCaption, FAQ } from '@/components/ui'
import { ArrowRight, CalendarRange, Clock, MapPin, CheckCircle } from 'lucide-react'
import { booking, intensiveSummary, otherLessonsNote, pricing, siteConfig } from '@/lib/config'
import { BookingOptions } from '@/components/booking/BookingOptions'
import { VisitDetails } from '@/components/booking/VisitDetails'
import { pageMetadata } from '@/lib/metadata'
import { faqItems } from '@/lib/faq'

export const metadata: Metadata = pageMetadata('/functional-synthesis', {
  title: 'Functional Synthesis Lessons (1:1) | Anat Baniel Method NeuroMovement',
  description:
    'Gentle, hands-on Functional Synthesis lessons (1:1) that help your brain learn new options. Improve function, reduce pain, and discover new movement possibilities.',
})

const studioLocation = (
  <>
    <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> In person, Carlsbad home studio
  </>
)

export default function FunctionalSynthesisPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 md:pt-16">
        <div className="max-w-3xl">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
            1:1 Sessions
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">
            Functional Synthesis
          </h1>
          <p className="text-xl text-brand-600 leading-relaxed mb-4">
            Gentle, hands-on sessions that work with your brain&apos;s natural ability to learn
            and reorganize. Based on the Anat Baniel Method&reg; NeuroMovement&reg; approach.
          </p>
          <p className="text-lg text-brand-500 leading-relaxed mb-8">
            This isn&apos;t about stretching or strengthening. It&apos;s about giving your
            nervous system the information it needs to find new, better options for how you
            move and function.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="#booking" size="lg">
              Book a Session <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button href="/start-here" variant="outline" size="lg">
              Not Sure? Start Here
            </Button>
          </div>
        </div>
      </Section>

      {/* What to Expect */}
      <Section variant="light">
        <SectionHeader
          eyebrow="What to expect"
          title="Your Session Experience"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h3 className="font-display text-xl text-brand-800">During your session</h3>
            <div className="space-y-4">
              {[
                'You lie comfortably on a low, padded table (fully clothed)',
                'Through gentle touch and guided movement, I communicate with your nervous system',
                'Your brain begins noticing new connections and possibilities',
                'Movements are small, slow, and always within your comfort range',
                'Many people experience profound shifts in just one session',
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <span className="text-brand-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="font-display text-xl text-brand-800">Benefits people report</h3>
            <div className="space-y-4">
              {[
                'Reduced pain and tension (especially chronic or unexplained)',
                'Better posture and easier breathing',
                'Improved balance and coordination',
                'Greater range of motion without forcing',
                'Feeling "taller," lighter, or more connected',
                'Better sleep and reduced stress',
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-ocean-500 shrink-0 mt-0.5" />
                  <span className="text-brand-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <figure className="max-w-2xl mx-auto mt-12">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/hands-on-session-adult.jpg"
              alt="A practitioner guiding a gentle hands-on session with an adult lying fully clothed on a padded table"
              width={800}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <ImageCaption as="figcaption">
            A gentle hands-on session with an adult — lying comfortably, fully clothed, on a low padded table
          </ImageCaption>
        </figure>
      </Section>

      {/* Children & Special Needs */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-medium text-ocean-500 uppercase tracking-wider mb-3">
              Children &amp; Special Needs
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-brand-900 mb-6">
              Helping Children Discover What&apos;s Possible
            </h2>
            <div className="space-y-4 text-brand-700 leading-relaxed">
              <p>
                The Anat Baniel Method&reg; is renowned for its work with children facing
                developmental challenges. Rather than trying to &quot;fix&quot; what&apos;s missing,
                we work with your child&apos;s brain — meeting them exactly where they are and
                helping their nervous system discover new pathways for learning and movement.
              </p>
              <p>
                Through gentle, playful touch and movement, children often achieve milestones
                that traditional therapies alone haven&apos;t unlocked. The approach is
                non-invasive, pain-free, and works <em>with</em> your child&apos;s natural
                curiosity and brain plasticity.
              </p>
              <p className="font-medium text-brand-800">
                Sessions can support children with:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Cerebral palsy',
                  'Autism spectrum',
                  'Developmental delays',
                  'Genetic conditions',
                  'Traumatic brain injury',
                  'Seizure disorders',
                  'Sensory processing challenges',
                  'Undiagnosed movement difficulties',
                ].map((condition) => (
                  <div key={condition} className="flex gap-2 items-center">
                    <CheckCircle className="w-4 h-4 text-ocean-500 shrink-0" />
                    <span className="text-sm text-brand-600">{condition}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-brand-500 italic mt-4">
                A parent or guardian must be present during all children&apos;s sessions.
                NeuroRefinement is educational wellness, not medical treatment. Please
                consult your child&apos;s healthcare provider regarding medical questions.
              </p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button href="#booking" size="lg">
                Book a Children&apos;s Session <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Talk to Me First
              </Button>
            </div>
          </div>
          <div>
            <div className="aspect-[6/5] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/fs-session-child-toys.jpg"
                alt="Bryan Thunstrom working with a child in a Functional Synthesis session while mother participates"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            <ImageCaption>A real Functional Synthesis session with a child — gentle, playful, and with family present.</ImageCaption>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section variant="warm">
        <SectionHeader
          eyebrow="Pricing"
          title="Session Options"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <PricingCard
            meta={<><Clock className="w-4 h-4" /> {pricing.abm.newClientLesson.duration} min</>}
            title={pricing.abm.newClientLesson.label}
            price={pricing.abm.newClientLesson.price}
            note={pricing.abm.newClientLesson.description}
            footer={studioLocation}
          />
          <PricingCard
            meta={<><Clock className="w-4 h-4" /> About {pricing.abm.session.duration} min</>}
            title={pricing.abm.session.label}
            price={pricing.abm.session.price}
            note={pricing.abm.session.lengthNote}
            footer={studioLocation}
          />
          <PricingCard
            featured
            badge="Best Value"
            title="4-Session Pack"
            price={pricing.abm.pack4.price}
            note={<>${pricing.abm.pack4.perSession}/session &middot; {pricing.abm.pack4.savings}</>}
          />
          <PricingCard
            meta={<><CalendarRange className="w-4 h-4" /> {pricing.abm.intensive.lessons} lessons + audio homework</>}
            title={pricing.abm.intensive.label}
            price={pricing.abm.intensive.price}
            note={intensiveSummary}
            footer={studioLocation}
            action={<Button href={booking.intensiveHref} size="sm">Request an Intensive</Button>}
          />
        </div>
        <p className="text-center text-brand-600 leading-relaxed mt-8 max-w-2xl mx-auto">
          {siteConfig.payment.note} {otherLessonsNote}{' '}
          <Link href="/bundles" className="text-ocean-600 underline underline-offset-2 hover:text-ocean-700">
            See packs &amp; intensives
          </Link>
          .
        </p>
      </Section>

      {/* Booking */}
      <Section id="booking">
        <SectionHeader
          eyebrow="Book now"
          title="Schedule Your Session"
          description={`New here? Start with a ${booking.events.freeCall.label} (${booking.events.freeCall.duration} minutes on ${booking.events.freeCall.format}) so Bryan can learn about your situation, then book your ${booking.events.newClientLesson.label}.`}
        />
        <div className="max-w-3xl mx-auto">
          <BookingOptions />
        </div>
        <VisitDetails className="max-w-5xl mx-auto mt-12" />
      </Section>

      {/* FAQ */}
      <Section variant="light">
        <SectionHeader eyebrow="FAQ" title="Common Questions" />
        <div className="max-w-3xl mx-auto">
          <FAQ items={faqItems} />
          <p className="text-center text-brand-600 mt-8">
            <Link href="/faq" className="text-ocean-600 underline underline-offset-2 hover:text-ocean-700">
              See all FAQs
            </Link>
          </p>
        </div>
      </Section>
    </>
  )
}
