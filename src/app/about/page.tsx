import { Metadata } from 'next'
import { Button, Section, SectionHeader, FAQ } from '@/components/ui'
import { ArrowRight, Award, Heart, Brain, Lightbulb } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'About Bryan Thunstrom',
  description: 'Certified ABM NeuroMovement practitioner and strengths-based coach. Learn about Bryan\'s journey from chronic illness to helping others refine movement and renew life.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
              About
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">
              From Pain to Practitioner
            </h1>
            <div className="space-y-4 text-brand-700 leading-relaxed text-lg">
              <p>
                I&apos;m Bryan Thunstrom — a certified Anat Baniel Method&reg;
                NeuroMovement&reg; practitioner, strengths-based coach, and someone who
                understands chronic pain from the inside out.
              </p>
              <p>
                For nearly twenty years, persistent Lyme disease and bilateral Thoracic
                Outlet Syndrome have been my daily companions. The nerve pain, fatigue, and
                physical limitations didn&apos;t just change what I could do — they
                fundamentally changed how I think about movement, learning, and possibility.
              </p>
            </div>
          </div>
          <div>
            {/* TODO: Bryan's headshot */}
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-brand-100 to-ocean-100 flex items-center justify-center">
              <div className="text-center text-brand-400">
                <p className="font-display text-xl">Bryan Thunstrom</p>
                <p className="text-sm mt-2">Headshot coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* My Journey */}
      <Section variant="light">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl text-brand-900 mb-8 text-center">
            The Journey That Shaped Everything
          </h2>
          <div className="prose-nr">
            <p>
              When your body won&apos;t cooperate — when the things everyone takes for granted
              become daily negotiations — you learn something important: <strong>forcing
              doesn&apos;t work</strong>. Pushing harder through nerve pain doesn&apos;t make
              it go away. Gritting your teeth through fatigue doesn&apos;t build resilience.
              There had to be another way.
            </p>
            <p>
              That search led me to the Anat Baniel Method — a gentle, brain-based approach
              rooted in the science of neuroplasticity. Instead of forcing muscles to comply,
              ABM works with the brain&apos;s natural ability to learn and reorganize. Gentle
              movement, careful attention, and variation — that&apos;s how the nervous system
              discovers new options.
            </p>
            <p>
              The difference was profound. Not a cure — I want to be honest about that — but
              a fundamentally different relationship with my body. More options where I thought
              I had none. More ease where I expected only struggle. More possibility in the
              places I&apos;d written off.
            </p>
            <p>
              I became a certified practitioner because I wanted others to experience what I
              discovered: <strong>your brain already knows how to learn. Sometimes it just
              needs the right conditions to remember.</strong>
            </p>
          </div>
        </div>
      </Section>

      {/* Credentials and Philosophy */}
      <Section variant="warm">
        <SectionHeader
          eyebrow="Credentials & Philosophy"
          title="What I Bring to This Work"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Award className="w-6 h-6" />,
              title: 'ABM® Certified',
              description: 'Certified Anat Baniel Method® NeuroMovement® Practitioner. Trained in Functional Synthesis (hands-on) and Transformational Movement Lessons (group).',
            },
            {
              icon: <Heart className="w-6 h-6" />,
              title: 'Lived Experience',
              description: 'Nearly two decades navigating persistent Lyme disease and bilateral Thoracic Outlet Syndrome. I know chronic pain from the inside.',
            },
            {
              icon: <Brain className="w-6 h-6" />,
              title: 'Strengths-Based Coaching',
              description: 'Using CliftonStrengths and Ellen Langer-inspired mindful reframing to help people align their natural strengths with their goals and movement.',
            },
            {
              icon: <Lightbulb className="w-6 h-6" />,
              title: 'Business Advisory',
              description: 'Background in business consulting and advisory, bringing practical strategy and real-world experience to coaching conversations.',
            },
          ].map((cred) => (
            <div key={cred.title} className="bg-white rounded-2xl p-6 border border-brand-100/50">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
                {cred.icon}
              </div>
              <h3 className="font-display text-lg text-brand-800 mb-2">{cred.title}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{cred.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* My Approach */}
      <Section>
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl text-brand-900 mb-8 text-center">
            The NeuroRefinement Approach
          </h2>
          <div className="prose-nr">
            <p>
              NeuroRefinement isn&apos;t about doing exercises. It&apos;s about teaching your
              brain to <em>learn</em> — through awareness, attention, and gentle variation.
              When you combine that with an understanding of your natural strengths and a
              willingness to reframe old assumptions, real change becomes possible.
            </p>
            <p>
              Here&apos;s how the pieces fit together:
            </p>
            <p>
              <strong>Anat Baniel Method® NeuroMovement®</strong> provides the foundation —
              gentle, precise movement learning that taps into your brain&apos;s neuroplasticity.
              Instead of stretching tighter or strengthening weaker, we help your nervous system
              discover new options it didn&apos;t know it had.
            </p>
            <p>
              <strong>Feldenkrais-inspired Awareness Through Movement</strong> principles guide
              our group lessons — helping you reduce unnecessary effort, expand your movement
              vocabulary, and find more ease in everything you do.
            </p>
            <p>
              <strong>Strengths-based coaching</strong> ensures that what you learn in movement
              extends into your life. When you know what&apos;s naturally strong in you —
              and how to build on it — change isn&apos;t just possible, it&apos;s sustainable.
            </p>
            <p>
              <strong>Mindful reframing</strong> (inspired by Dr. Ellen Langer&apos;s research)
              ties it all together: the ability to shift from fixed assumptions to flexible
              noticing, so both your body and your thinking regain options.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="warm">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl text-brand-900 mb-4">
            Ready to Start?
          </h2>
          <p className="text-lg text-brand-600 mb-8">
            Take the 3-minute questionnaire for a personalized starting point, or book a
            session directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/start-here" size="lg">
              Start Here <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Get in Touch
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
