import { Metadata } from 'next'
import { ButtonLabel, Section, Card } from '@/components/ui'
import { ArrowRight, Brain, Sparkles, Users, Play } from 'lucide-react'
import Link from 'next/link'
import { pricing } from '@/lib/config'
import { VisitStrip } from '@/components/booking/VisitStrip'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata('/work-with-me', {
  title: 'Work With Me',
  description: 'Overview of NeuroRefinement services — one-on-one Functional Synthesis lessons based on the Anat Baniel Method NeuroMovement, strengths-based coaching, individual or group TML lessons, and voice-guided lessons. Find the right fit for you.',
})

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
          <Card href="/functional-synthesis" labelledBy="fs-title fs-cta" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-brand-500 uppercase tracking-wider">1:1 Lessons</span>
              </div>
              <h2 id="fs-title" className="font-display text-2xl text-brand-900 mb-3 group-hover:text-brand-600 transition-colors">Functional Synthesis</h2>
              <p className="text-brand-600 leading-relaxed mb-4">
                Gentle, hands-on sessions that work with your brain&apos;s neuroplasticity. The most
                direct path to discovering new movement options for easier movement, better balance
                and coordination, and less pain and discomfort.
              </p>
              <p className="text-sm text-brand-500">
                {pricing.abm.newClientLesson.shortLabel}: {pricing.abm.newClientLesson.duration} min, ${pricing.abm.newClientLesson.price} &middot;{' '}
                {pricing.abm.session.shortLabel}: about {pricing.abm.session.duration} min, ${pricing.abm.session.price} &middot; In person
              </p>
            </div>
            <div className="text-center md:text-right">
              <ButtonLabel id="fs-cta">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </ButtonLabel>
            </div>
          </Card>

          {/* Coaching */}
          <Card href="/coaching" labelledBy="coaching-title coaching-cta" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-brand-500 uppercase tracking-wider">1:1 Coaching</span>
              </div>
              <h2 id="coaching-title" className="font-display text-2xl text-brand-900 mb-3 group-hover:text-brand-600 transition-colors">Strengths-Based Coaching</h2>
              <p className="text-brand-600 leading-relaxed mb-4">
                Life, career, and business coaching using CliftonStrengths and mindful reframing.
                Build on what&apos;s naturally strong in you.
              </p>
              <p className="text-sm text-brand-500">
                {pricing.coaching.session.duration} min &middot; ${pricing.coaching.session.price} &middot; Remote or in person
              </p>
            </div>
            <div className="text-center md:text-right">
              <ButtonLabel id="coaching-cta">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </ButtonLabel>
            </div>
          </Card>

          {/* Classes */}
          <Card href="/classes" labelledBy="tml-title tml-cta" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-brand-500 uppercase tracking-wider">Individual or Group</span>
              </div>
              <h2 id="tml-title" className="font-display text-2xl text-brand-900 mb-3 group-hover:text-brand-600 transition-colors">Transformational Movement Lessons</h2>
              <p className="text-brand-600 leading-relaxed mb-4">
                Guided movement explorations, one-on-one or in a small group. Increase awareness,
                reduce effort, and find new options — all in a supportive environment.
              </p>
              <p className="text-sm text-brand-500">
                Individual lessons by request &middot; Group drop-in ${pricing.classes.dropIn.price}
              </p>
            </div>
            <div className="text-center md:text-right">
              <ButtonLabel id="tml-cta">
                See Schedule <ArrowRight className="ml-2 w-4 h-4" />
              </ButtonLabel>
            </div>
          </Card>

          {/* Lessons */}
          <Card href="/lessons" labelledBy="lessons-title lessons-cta" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Play className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-brand-500 uppercase tracking-wider">On Demand</span>
              </div>
              <h2 id="lessons-title" className="font-display text-2xl text-brand-900 mb-3 group-hover:text-brand-600 transition-colors">Audio Lesson Library</h2>
              <p className="text-brand-600 leading-relaxed mb-4">
                Voice-guided movement lessons organized by theme. Your anytime companion
                for backs, posture, surfing, stress, TOS, and 15+ more themes.
              </p>
              <p className="text-sm text-brand-500">
                From ${pricing.lessons.single.price}/lesson &middot; Bundles &amp; membership available
              </p>
            </div>
            <div className="text-center md:text-right">
              <ButtonLabel id="lessons-cta">
                Browse Library <ArrowRight className="ml-2 w-4 h-4" />
              </ButtonLabel>
            </div>
          </Card>
        </div>
        <p className="text-center text-brand-600 leading-relaxed mt-8">
          Looking for a lesson pack or an intensive?{' '}
          <Link href="/bundles" className="text-ocean-600 underline underline-offset-2 hover:text-ocean-700">
            See Bundles &amp; Packs
          </Link>
          .
        </p>
        <VisitStrip className="max-w-3xl mx-auto mt-8 rounded-2xl bg-sand-50 border border-brand-100/50 px-6 py-5" />
      </Section>
    </>
  )
}
