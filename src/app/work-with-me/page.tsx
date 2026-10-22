import { Metadata } from 'next'
import { Button, Section, SectionHeader, Card, PriceTag } from '@/components/ui'
import { ArrowRight, Brain, Sparkles, Users, Play } from 'lucide-react'
import { booking, pricing } from '@/lib/config'
import { VisitDetails } from '@/components/booking/VisitDetails'

export const metadata: Metadata = {
  title: 'Work With Me',
  description: 'Overview of NeuroRefinement services — one-on-one ABM NeuroMovement lessons in Carlsbad, CA, strengths-based coaching, individual or group TML lessons, and voice-guided lessons. Find the right fit for you.',
}

export default function WorkWithMePage() {
  return (
    <>
      <Section className="pt-12 md:pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">
            Work With Me
          </h1>
          <p className="text-xl text-brand-600 leading-relaxed mb-4">
            From precision hands-on sessions to on-demand audio lessons — choose the
            format that fits your life, your goals, and your budget.
          </p>
          <p className="text-lg text-brand-500">
            Not sure where to start?{' '}
            <a href="/start-here" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">
              Take the 3-minute quiz
            </a>
            {' '}for a personalized recommendation.
          </p>
        </div>
      </Section>

      <Section variant="light">
        <div className="space-y-8">
          {/* ABM */}
          <Card hover={false} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-brand-500 uppercase tracking-wider">1:1 Sessions</span>
              </div>
              <h2 className="font-display text-2xl text-brand-900 mb-3">Functional Synthesis (ABM)</h2>
              <p className="text-brand-600 leading-relaxed mb-4">
                Gentle, hands-on one-on-one sessions that work with your brain&apos;s neuroplasticity,
                in person at Bryan&apos;s Carlsbad home studio. The most direct path to discovering new
                movement options and reducing pain.
              </p>
              <p className="text-sm text-brand-500">
                {pricing.abm.newClientLesson.label}: {pricing.abm.newClientLesson.duration} min, ${pricing.abm.newClientLesson.price} &middot;{' '}
                {pricing.abm.session.label}: about {pricing.abm.session.duration} min, ${pricing.abm.session.price} &middot; In person
              </p>
            </div>
            <div className="text-center md:text-right">
              <Button href="/functional-synthesis">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Coaching */}
          <Card hover={false} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-brand-500 uppercase tracking-wider">1:1 Coaching</span>
              </div>
              <h2 className="font-display text-2xl text-brand-900 mb-3">Strengths-Based Coaching</h2>
              <p className="text-brand-600 leading-relaxed mb-4">
                Life, career, and business coaching using CliftonStrengths and mindful reframing.
                Build on what&apos;s naturally strong in you.
              </p>
              <p className="text-sm text-brand-500">
                {pricing.coaching.session.duration} min &middot; ${pricing.coaching.session.price} &middot; Remote or in person
              </p>
            </div>
            <div className="text-center md:text-right">
              <Button href="/coaching">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Classes */}
          <Card hover={false} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-brand-500 uppercase tracking-wider">Individual or Group</span>
              </div>
              <h2 className="font-display text-2xl text-brand-900 mb-3">Transformational Movement Lessons</h2>
              <p className="text-brand-600 leading-relaxed mb-4">
                Guided movement explorations, one-on-one or in a small group. Increase awareness,
                reduce effort, and find new options — all in a supportive environment.
              </p>
              <p className="text-sm text-brand-500">
                Individual lessons by request &middot; Group drop-in ${pricing.classes.dropIn.price}
              </p>
            </div>
            <div className="text-center md:text-right">
              <Button href="/classes">
                See Schedule <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Lessons */}
          <Card hover={false} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Play className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-brand-500 uppercase tracking-wider">On Demand</span>
              </div>
              <h2 className="font-display text-2xl text-brand-900 mb-3">Audio Lesson Library</h2>
              <p className="text-brand-600 leading-relaxed mb-4">
                Voice-guided movement lessons organized by theme. Your anytime companion
                for backs, posture, surfing, stress, TOS, and 15+ more themes.
              </p>
              <p className="text-sm text-brand-500">
                From ${pricing.lessons.single.price}/lesson &middot; Bundles &amp; membership available
              </p>
            </div>
            <div className="text-center md:text-right">
              <Button href="/lessons">
                Browse Library <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Practical details"
          title="Location, Hours & Payment"
          description={`New here? Start with a ${booking.events.freeCall.label} (${booking.events.freeCall.duration} minutes on ${booking.events.freeCall.format}).`}
        />
        <VisitDetails className="max-w-5xl mx-auto" />
      </Section>
    </>
  )
}
