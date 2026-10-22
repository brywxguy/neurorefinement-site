import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Brain, CalendarCheck, Play, Sparkles } from 'lucide-react'
import { Button, ButtonLabel, Card, Section, SectionHeader } from '@/components/ui'
import { booking, freeLesson, pricing, siteConfig } from '@/lib/config'
import { parseConcerns, parseGoals, recommend, type QuizRecommendation } from '@/lib/quiz'

export const metadata: Metadata = {
  title: 'Your Recommended Starting Point',
  robots: { index: false, follow: false },
}

const BOOKING_HREF = '/functional-synthesis#booking'

type SearchParams = { [key: string]: string | string[] | undefined }

function lowerList(items: string[]) {
  const words = items.map((i) => (i === "My child's development" ? "your child's development" : i.toLowerCase()))
  if (words.length <= 1) return words.join('')
  return `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`
}

interface OptionCard {
  key: 'fs' | 'coaching' | 'audio' | 'free'
  icon: JSX.Element
  title: string
  text: string
  href: string
  cta: string
}

const OPTIONS: Record<OptionCard['key'], OptionCard> = {
  fs: {
    key: 'fs',
    icon: <Brain className="w-5 h-5" />,
    title: 'Functional Synthesis lessons (1:1)',
    text: `Gentle, hands-on lessons. New clients start with a ${pricing.abm.newClientLesson.label} (${pricing.abm.newClientLesson.duration} min, $${pricing.abm.newClientLesson.price}); after that, about ${pricing.abm.session.duration} min, $${pricing.abm.session.price}.`,
    href: '/functional-synthesis',
    cta: 'Learn More',
  },
  coaching: {
    key: 'coaching',
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Strengths-Based Coaching',
    text: `Life, career, and business coaching using CliftonStrengths. ${pricing.coaching.session.duration} min, $${pricing.coaching.session.price}, remote or in person.`,
    href: '/coaching',
    cta: 'Learn More',
  },
  audio: {
    key: 'audio',
    icon: <Play className="w-5 h-5" />,
    title: 'Audio Lesson Library',
    text: `Voice-guided movement lessons by theme, from $${pricing.lessons.single.price}. Learn at your own pace, at home.`,
    href: '/lessons',
    cta: 'Browse Lessons',
  },
  free: {
    key: 'free',
    icon: <Play className="w-5 h-5" />,
    title: `${freeLesson.label}: ${freeLesson.title}`,
    text: 'A gentle guided movement lesson you can do at home. No equipment needed — just a comfortable place to lie down.',
    href: freeLesson.href,
    cta: 'Start Free Lesson',
  },
}

function alsoAvailable(rec: QuizRecommendation): OptionCard[] {
  const order: OptionCard['key'][] =
    rec.path === 'functional-synthesis' ? (rec.wantsCoaching ? ['coaching', 'free', 'audio'] : ['free', 'audio', 'coaching'])
    : rec.path === 'coaching' ? ['fs', 'free', 'audio']
    : ['fs', 'coaching']
  return order.map((k) => OPTIONS[k])
}

function Step({ n, title, meta, children, action }: { n: number; title: string; meta?: string; children: React.ReactNode; action: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
      <span className="font-display text-3xl text-brand-300 leading-none">{n}</span>
      <div>
        <h3 className="font-display text-xl text-brand-800">{title}</h3>
        {meta && <p className="text-sm text-brand-500 mt-0.5">{meta}</p>}
        <p className="text-brand-600 leading-relaxed mt-1">{children}</p>
      </div>
      <div className="col-start-2 sm:col-start-3">{action}</div>
    </li>
  )
}

export default function StartHereResultsPage({ searchParams }: { searchParams: SearchParams }) {
  const concerns = parseConcerns(searchParams.c)
  const goals = parseGoals(searchParams.g)
  const saved = searchParams.saved
  const rec = recommend(concerns, goals)
  const { freeCall } = booking.events

  return (
    <>
      <Section className="pt-12 md:pt-16 pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">Your results</span>
          <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-4">Your Recommended Starting Point</h1>
          {concerns.length === 0 ? (
            <p className="text-lg text-brand-600">
              Answer a few quick questions and we&apos;ll suggest where to begin.{' '}
              <Link href="/start-here" className="text-ocean-600 underline underline-offset-2 hover:text-ocean-700">
                Take the questionnaire
              </Link>
              .
            </p>
          ) : (
            <p className="text-lg text-brand-600">Based on what you shared, here&apos;s where we suggest you begin.</p>
          )}
          {saved === '1' && (
            <p className="mt-4 text-brand-600">Thank you — Bryan has your answers and may follow up personally.</p>
          )}
          {saved === '0' && (
            <p className="mt-4 text-brand-600">
              We couldn&apos;t save your answers just now. To reach Bryan, email{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-ocean-600 hover:text-ocean-700">
                {siteConfig.contact.email}
              </a>{' '}
              or call {siteConfig.contact.phone}.
            </p>
          )}
        </div>
      </Section>

      <Section variant="light">
        <div className="max-w-3xl mx-auto">
          <Card hover={false}>
            {rec.path === 'functional-synthesis' && (
              <>
                <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">Recommended</span>
                <h2 className="font-display text-3xl text-brand-900 mb-3">Functional Synthesis Lessons (1:1)</h2>
                <p className="text-brand-600 leading-relaxed mb-2">
                  You mentioned {lowerList(rec.fsMatches)}. Functional Synthesis lessons are gentle, hands-on
                  sessions that work with your brain&apos;s neuroplasticity — the most direct path to discovering
                  new movement options for easier movement, better balance and coordination, and less pain and
                  discomfort.
                </p>
                {rec.forChild && (
                  <p className="text-brand-600 leading-relaxed mb-2">
                    Lessons for children are playful and led by what your child&apos;s nervous system is ready to
                    learn, with a parent or guardian always present.{' '}
                    <Link href="/children" className="text-ocean-600 underline underline-offset-2 hover:text-ocean-700">
                      More about lessons for children
                    </Link>
                    .
                  </p>
                )}
                <ol className="mt-8 space-y-8">
                  <Step
                    n={1}
                    title={freeCall.label}
                    meta={`${freeCall.duration} minutes on ${freeCall.format} · Free`}
                    action={<Button href={BOOKING_HREF}>Book a {freeCall.label}</Button>}
                  >
                    A no-pressure conversation so Bryan can learn about your situation.
                  </Step>
                  <Step
                    n={2}
                    title={pricing.abm.newClientLesson.label}
                    meta={`${pricing.abm.newClientLesson.duration} min · $${pricing.abm.newClientLesson.price}`}
                    action={<Button href={BOOKING_HREF} variant="outline">Book Your First Lesson</Button>}
                  >
                    {pricing.abm.newClientLesson.description}
                  </Step>
                  <Step
                    n={3}
                    title={pricing.abm.session.label}
                    meta={`About ${pricing.abm.session.duration} min · $${pricing.abm.session.price}`}
                    action={<Button href="/functional-synthesis" variant="ghost">Learn More <ArrowRight className="ml-2 w-4 h-4" /></Button>}
                  >
                    Ongoing lessons after your first visit. Packs are available.
                  </Step>
                </ol>
              </>
            )}

            {rec.path === 'coaching' && (
              <>
                <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">Recommended</span>
                <h2 className="font-display text-3xl text-brand-900 mb-3">Strengths-Based Coaching</h2>
                <p className="text-brand-600 leading-relaxed">
                  Life, career, and business coaching that starts with what&apos;s already strong in you. Using
                  CliftonStrengths and mindful reframing, we build strategies that fit your natural pattern.
                </p>
                <ol className="mt-8 space-y-8">
                  <Step
                    n={1}
                    title={freeCall.label}
                    meta={`${freeCall.duration} minutes on ${freeCall.format} · Free`}
                    action={<Button href="/coaching#booking">Book a {freeCall.label}</Button>}
                  >
                    Talk through what you&apos;re hoping for before you book.
                  </Step>
                  <Step
                    n={2}
                    title={booking.events.coachingSession.label}
                    meta={`${pricing.coaching.session.duration} min · $${pricing.coaching.session.price} · Remote or in person`}
                    action={<Button href="/coaching#booking" variant="outline">Book a {booking.events.coachingSession.label}</Button>}
                  >
                    Build on what&apos;s naturally strong in you, with a plan you can act on.
                  </Step>
                </ol>
              </>
            )}

            {rec.path === 'explore' && (
              <>
                <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">Recommended</span>
                <h2 className="font-display text-3xl text-brand-900 mb-3">Start Gently, at Home</h2>
                <p className="text-brand-600 leading-relaxed">
                  Get a feel for the approach with a free guided lesson, then explore the library — or talk with
                  Bryan about what would help most.
                </p>
                <ol className="mt-8 space-y-8">
                  <Step
                    n={1}
                    title={OPTIONS.free.title}
                    action={<Button href={freeLesson.href}>Start {freeLesson.label}</Button>}
                  >
                    {OPTIONS.free.text}
                  </Step>
                  <Step
                    n={2}
                    title={OPTIONS.audio.title}
                    action={<Button href="/lessons" variant="outline">Browse Lessons</Button>}
                  >
                    {OPTIONS.audio.text}
                  </Step>
                  <Step
                    n={3}
                    title={freeCall.label}
                    meta={`${freeCall.duration} minutes on ${freeCall.format} · Free`}
                    action={<Button href={BOOKING_HREF} variant="ghost">Book a Call <ArrowRight className="ml-2 w-4 h-4" /></Button>}
                  >
                    Not sure what fits? A short conversation with Bryan.
                  </Step>
                </ol>
              </>
            )}
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Also available" title="Other Ways to Work Together" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {alsoAvailable(rec).map((o) => (
            <Card key={o.key} href={o.href} labelledBy={`${o.key}-title ${o.key}-cta`} className="flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
                {o.icon}
              </div>
              <h3 id={`${o.key}-title`} className="font-display text-xl text-brand-800 mb-2 group-hover:text-brand-600 transition-colors">
                {o.title}
              </h3>
              <p className="text-sm text-brand-600 leading-relaxed mb-6 flex-1">{o.text}</p>
              <ButtonLabel id={`${o.key}-cta`} variant="outline" size="sm" className="self-start">
                {o.cta} <ArrowRight className="ml-2 w-4 h-4" />
              </ButtonLabel>
            </Card>
          ))}
        </div>
        <p className="text-center text-brand-600 leading-relaxed mt-8">
          <CalendarCheck className="inline w-4 h-4 mr-1 -mt-0.5 text-brand-500" aria-hidden />
          Want to change your answers?{' '}
          <Link href="/start-here" className="text-ocean-600 underline underline-offset-2 hover:text-ocean-700">
            Retake the questionnaire
          </Link>
          .
        </p>
      </Section>
    </>
  )
}
