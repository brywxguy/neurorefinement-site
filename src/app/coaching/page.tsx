import { Metadata } from 'next'
import { Button, Section, SectionHeader, Card, PriceTag, FAQ } from '@/components/ui'
import { ArrowRight, Star, Zap, Users, MessageSquare, Target } from 'lucide-react'
import { booking, calUrl, pricing } from '@/lib/config'
import { BookingOptions } from '@/components/booking/BookingOptions'

export const metadata: Metadata = {
  title: 'NeuroStrengths Coaching — Coming Soon, By Request',
  description: 'NeuroStrengths coaching: CliftonStrengths combined with mindful reframing to help you align your natural strengths with your goals. Coming soon and available by request; remote sessions welcome.',
}

export default function CoachingPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 md:pt-16">
        <div className="max-w-3xl">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
            1:1 Coaching &middot; Coming soon
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">
            NeuroStrengths Coaching
          </h1>
          <p className="inline-block text-sm text-brand-700 bg-brand-50 border border-brand-100 rounded-xl px-4 py-2 mb-6">
            Coaching is coming soon as a full offering. For now it&apos;s available by request, and sessions can be remote.
          </p>
          <p className="text-xl text-brand-600 leading-relaxed mb-4">
            Life, career, and business coaching that starts with what&apos;s already strong in you — then builds on it.
          </p>
          <p className="text-lg text-brand-500 leading-relaxed mb-8">
            Using CliftonStrengths and mindful reframing, we create strategies that fit your
            natural pattern — so change isn&apos;t just possible, it&apos;s sustainable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="#pricing" size="lg">
              Details <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button href="/start-here" variant="outline" size="lg">
              Start Here
            </Button>
          </div>
        </div>
      </Section>

      {/* What Makes This Different */}
      <Section variant="light">
        <SectionHeader
          eyebrow="The approach"
          title="Coaching That Fits Who You Actually Are"
          description="Most coaching tries to fix what's wrong. We build on what's right."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Star className="w-6 h-6" />,
              title: 'CliftonStrengths Foundation',
              description: 'We start by identifying your top strengths — the natural talents that energize you and drive your best work. Then we build everything on that foundation.',
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'Mindful Reframing',
              description: 'Inspired by Dr. Ellen Langer\'s research, we practice shifting from fixed assumptions to flexible noticing. When "I can\'t" becomes "I haven\'t yet," everything changes.',
            },
            {
              icon: <Target className="w-6 h-6" />,
              title: 'Movement + Mindset',
              description: 'Your body and your thinking are connected. When appropriate, we integrate gentle movement principles to help insights land deeper and stick longer.',
            },
          ].map((item) => (
            <Card key={item.title}>
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-display text-xl text-brand-800 mb-3">{item.title}</h3>
              <p className="text-brand-600 leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Who It's For */}
      <Section variant="warm">
        <div className="container-narrow text-center">
          <SectionHeader
            eyebrow="Who it's for"
            title="Coaching Is For You If..."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {[
              'You feel stuck but can\'t pinpoint why',
              'You\'re navigating a career transition or business decision',
              'You want to lead with more confidence and clarity',
              'You\'re managing chronic health challenges while building a meaningful life',
              'You know you have strengths but aren\'t sure how to leverage them',
              'You want accountability and a thought partner who listens deeply',
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <MessageSquare className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-brand-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing">
        <SectionHeader
          eyebrow="By request"
          title="Coaching Session"
        />
        <div className="max-w-sm mx-auto">
          <Card className="text-center">
            <h3 className="font-display text-lg text-brand-800 mb-2">{pricing.coaching.session.label}</h3>
            <p className="text-sm text-brand-500 mb-4">{pricing.coaching.session.duration} minutes &middot; Remote or in person</p>
            <PriceTag price={pricing.coaching.session.price} />
            <p className="text-xs text-brand-400 mt-3">Available by request while coaching is in its early phase</p>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Button href="#booking" size="lg">
            Start With a {booking.events.freeCall.label} <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </Section>

      {/* Booking */}
      <Section variant="light" id="booking">
        <SectionHeader
          eyebrow="Get in touch"
          title="Ask About Coaching"
          description={`Book a ${booking.events.freeCall.label} (${booking.events.freeCall.duration} minutes on ${booking.events.freeCall.format}) and mention coaching.`}
        />
        <div className="max-w-3xl mx-auto">
          <BookingOptions options={['freeCall']} />
          <p className="mt-4 text-center text-sm text-brand-500">
            Already arranged coaching with Bryan?{' '}
            <a href={calUrl(booking.events.coachingSession.slug)} className="text-ocean-600 hover:text-ocean-700">
              Book a {booking.events.coachingSession.label}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  )
}
