import { Metadata } from 'next'
import Image from 'next/image'
import { Button, Section, SectionHeader, Card, PriceTag, FAQ } from '@/components/ui'
import { ArrowRight, Clock, MapPin, Video, CheckCircle } from 'lucide-react'
import { pricing } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Functional Synthesis — ABM NeuroMovement Sessions',
  description: 'Gentle, hands-on neuroplasticity-based sessions in Carlsbad, CA and virtually. Reduce pain, improve function, and discover new movement possibilities.',
}

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
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/functional-integration-session.jpg"
                alt="Gentle hands-on NeuroMovement session with a child"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-xs text-brand-400 mt-3 text-center">
              A Functional Integration session — gentle, hands-on work supporting a child&apos;s development
            </p>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section variant="warm">
        <SectionHeader
          eyebrow="Pricing"
          title="Session Options"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-brand-500 mb-4">
              <Clock className="w-4 h-4" /> {pricing.abm.session60.duration} min
            </div>
            <h3 className="font-display text-lg text-brand-800 mb-2">{pricing.abm.session60.label}</h3>
            <PriceTag price={pricing.abm.session60.price} />
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-brand-400">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> In-person</span>
              <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Virtual</span>
            </div>
          </Card>

          <Card className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-brand-500 mb-4">
              <Clock className="w-4 h-4" /> {pricing.abm.session90.duration} min
            </div>
            <h3 className="font-display text-lg text-brand-800 mb-2">{pricing.abm.session90.label}</h3>
            <PriceTag price={pricing.abm.session90.price} />
            <p className="text-xs text-brand-400 mt-3">Recommended for first visits</p>
          </Card>

          <Card className="text-center border-brand-300">
            <span className="inline-block text-xs font-medium bg-brand-500 text-white px-3 py-1 rounded-full mb-4">
              Best Value
            </span>
            <h3 className="font-display text-lg text-brand-800 mb-2">4-Session Pack</h3>
            <PriceTag price={pricing.abm.pack4.price} />
            <p className="text-xs text-brand-500 mt-2">${pricing.abm.pack4.perSession}/session &middot; {pricing.abm.pack4.savings}</p>
          </Card>

          <Card className="text-center">
            <h3 className="font-display text-lg text-brand-800 mb-2">10-Session Pack</h3>
            <PriceTag price={pricing.abm.pack10.price} />
            <p className="text-xs text-brand-500 mt-2">${pricing.abm.pack10.perSession}/session &middot; {pricing.abm.pack10.savings}</p>
          </Card>
        </div>
      </Section>

      {/* Booking */}
      <Section id="booking">
        <SectionHeader
          eyebrow="Book now"
          title="Schedule Your Session"
          description="Choose a time that works for you. First-time visitors are encouraged to book the 90-minute Deep Dive."
        />
        <div className="max-w-3xl mx-auto">
          {/* Calendly embed placeholder */}
          <div className="rounded-2xl border border-brand-100/50 bg-white p-12 text-center">
            <p className="text-brand-500 mb-4">Calendly scheduling widget loads here</p>
            <p className="text-sm text-brand-400">
              Configure your NEXT_PUBLIC_CALENDLY_URL environment variable to activate
            </p>
            <Button href="https://calendly.com" variant="outline" size="sm" className="mt-6">
              Book on Calendly (placeholder)
            </Button>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section variant="light">
        <SectionHeader eyebrow="FAQ" title="Common Questions" />
        <div className="max-w-3xl mx-auto">
          <FAQ items={[
            {
              question: 'What should I wear?',
              answer: 'Comfortable, loose-fitting clothes — like what you\'d wear to a yoga class. You remain fully clothed during the entire session. Avoid thick belts, heavy jewelry, or restrictive clothing.',
            },
            {
              question: 'Is this like massage or physical therapy?',
              answer: 'No — Functional Synthesis is a learning process, not a treatment. Instead of manipulating muscles or joints, I use gentle touch to communicate with your nervous system, helping your brain discover new movement options. Many people find it more effective than conventional approaches for chronic issues.',
            },
            {
              question: 'How many sessions will I need?',
              answer: 'Many people notice meaningful changes in their very first session. For lasting transformation, a series of sessions allows your brain to build on each experience. I typically recommend starting with 4 sessions to see what\'s possible, then we decide together on next steps.',
            },
            {
              question: 'Do you accept insurance?',
              answer: 'ABM sessions are not typically covered by insurance. However, some HSA/FSA accounts may cover wellness services. I provide detailed receipts you can submit to your provider.',
            },
            {
              question: 'Can this help with my specific condition?',
              answer: 'NeuroRefinement is educational wellness, not medical treatment. The approach works with your brain\'s ability to learn, which can benefit a wide range of situations. If you\'re unsure, I\'m happy to have a brief conversation to see if this might be a good fit. Please always consult with your healthcare provider about your specific medical needs.',
            },
            {
              question: 'Do you offer virtual sessions?',
              answer: 'Yes! While in-person Functional Synthesis sessions involve hands-on guidance, I also offer virtual consultations where I can guide you through movement explorations, assess your needs, and create a personalized plan. Virtual coaching sessions are fully available.',
            },
            {
              question: 'Do you work with children?',
              answer: 'Absolutely. The Anat Baniel Method is widely recognized for its remarkable work with children with special needs — including cerebral palsy, autism spectrum, developmental delays, genetic conditions, and brain injuries. Children often respond beautifully because their brains have extraordinary plasticity. Sessions are gentle, playful, and a parent or guardian is always present. I offer both individual sessions and intensive packages for families traveling to Carlsbad.',
            },
          ]} />
        </div>
      </Section>
    </>
  )
}
