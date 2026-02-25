import { Metadata } from 'next'
import Image from 'next/image'
import { Button, Section, SectionHeader, FAQ } from '@/components/ui'
import { ArrowRight, Heart, Brain, Sparkles, Users, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Children & Special Needs — ABM NeuroMovement for Kids',
  description: 'Gentle, brain-based movement sessions for children with special needs. Supporting development in cerebral palsy, autism, developmental delays, and more. Carlsbad, CA.',
}

export default function ChildrenPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
              Children &amp; Special Needs
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">
              Helping Every Child&apos;s Brain Learn
            </h1>
            <p className="text-xl text-brand-600 leading-relaxed mb-4">
              Every child&apos;s brain is wired to learn. Sometimes the path to that
              learning just needs a gentler, more creative approach. The Anat Baniel
              Method&reg; NeuroMovement&reg; works with your child&apos;s brain — not
              against their limitations — to unlock new possibilities for movement,
              connection, and development.
            </p>
            <p className="text-lg text-brand-500 leading-relaxed mb-8">
              These sessions are playful, gentle, and led entirely by what your child&apos;s
              nervous system is ready to learn next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contact" size="lg">
                Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button href="/about" variant="outline" size="lg">
                About Bryan
              </Button>
            </div>
          </div>
          <div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/functional-integration-session.jpg"
                alt="Gentle hands-on NeuroMovement session with a child"
                width={600}
                height={750}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Who We Help */}
      <Section variant="light">
        <SectionHeader
          eyebrow="Who We Help"
          title="Children Facing a Wide Range of Challenges"
          subtitle="The Anat Baniel Method has helped children with many different conditions discover new developmental breakthroughs. Every child's journey is unique."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Brain className="w-6 h-6" />,
              title: 'Cerebral Palsy',
              description: 'Helping the brain find new pathways around damaged areas, improving motor control, coordination, and functional independence.',
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: 'Autism Spectrum',
              description: 'Supporting sensory integration, body awareness, social connection, and self-regulation through gentle, non-demanding movement exploration.',
            },
            {
              icon: <Heart className="w-6 h-6" />,
              title: 'Developmental Delays',
              description: 'Whether your child is late to roll, sit, crawl, or walk — these sessions help the brain organize the building blocks of movement in the right sequence.',
            },
            {
              icon: <Brain className="w-6 h-6" />,
              title: 'Genetic Conditions',
              description: 'Children with Down syndrome, Rett syndrome, and other genetic conditions can benefit from brain-based movement learning that meets them where they are.',
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: 'Brain Injury & Stroke',
              description: 'After a brain injury, the brain needs new information — not repetitive drilling. Gentle variation helps the nervous system reorganize and recover.',
            },
            {
              icon: <Heart className="w-6 h-6" />,
              title: 'Undiagnosed Challenges',
              description: 'Sometimes parents know something is off but don\'t have a diagnosis yet. These sessions can help regardless — we work with what we observe, not just labels.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 border border-brand-100/50">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-display text-lg text-brand-800 mb-2">{item.title}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What a Session Looks Like */}
      <Section>
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl text-brand-900 mb-8 text-center">
            What a Children&apos;s Session Looks Like
          </h2>
          <div className="prose-nr">
            <p>
              Children&apos;s Functional Synthesis sessions look nothing like traditional
              therapy. There are no drills, no repetitions, and no pushing through
              resistance. Instead, your child lies on a comfortable, padded table while
              I use gentle, slow movements to communicate directly with their brain.
            </p>
            <p>
              Each session follows what your child&apos;s nervous system is ready for.
              Some sessions are quiet and subtle. Others are more playful and
              exploratory. The child sets the pace — I provide the conditions for
              their brain to make new connections.
            </p>
            <p>
              Sessions typically last <strong>30 to 45 minutes</strong> for children,
              depending on their age, attention, and energy. Young children and infants
              may have shorter sessions. We always honor what your child needs in the
              moment.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
