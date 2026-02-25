import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Section, SectionHeader, Card, PriceTag } from '@/components/ui'
import { Play, Clock, ArrowRight, Filter } from 'lucide-react'
import { lessonThemes, pricing } from '@/lib/config'
import { ThemeIcon } from '@/components/ui/ThemeIcon'

export const metadata: Metadata = {
  title: 'Audio Lesson Library — Voice-Guided Movement Lessons',
  description: 'On-demand voice-guided movement lessons organized by theme. Gentle neuroplasticity-based explorations for backs, posture, surfing, stress, TOS, and more.',
}

// Sample lesson data — will be replaced by Supabase queries
const sampleLessons = [
  {
    slug: 'gentle-back-awareness',
    title: 'Gentle Back Awareness',
    theme: 'healthy-backs',
    duration: 25,
    difficulty: 'gentle' as const,
    description: 'A soothing exploration of your spine that helps your brain discover new options for ease and comfort.',
    price: 25,
    isFree: false,
  },
  {
    slug: 'free-intro-reset',
    title: 'The 15-Minute Reset',
    theme: 'morning-routines',
    duration: 15,
    difficulty: 'gentle' as const,
    description: 'Your free introduction to NeuroRefinement. A gentle full-body scan and reset you can do anywhere.',
    price: 0,
    isFree: true,
  },
  {
    slug: 'surfer-shoulder-freedom',
    title: "Surfer's Shoulder Freedom",
    theme: 'surfing',
    duration: 30,
    difficulty: 'moderate' as const,
    description: 'Improve paddle strength and shoulder mobility through brain-based movement exploration.',
    price: 25,
    isFree: false,
  },
  {
    slug: 'desk-body-neck-release',
    title: 'Desk Body: Neck & Shoulder Release',
    theme: 'neck-shoulders',
    duration: 20,
    difficulty: 'gentle' as const,
    description: 'Perfect for midday or after work. Undo the patterns of sitting and screen time.',
    price: 25,
    isFree: false,
  },
  {
    slug: 'tos-gentle-nerve-comfort',
    title: 'TOS: Gentle Nerve Comfort',
    theme: 'tos-upper-extremity',
    duration: 35,
    difficulty: 'gentle' as const,
    description: 'Specifically designed for those experiencing thoracic outlet or upper extremity discomfort. Very gentle, awareness-focused.',
    price: 25,
    isFree: false,
  },
  {
    slug: 'balance-confidence-builder',
    title: 'Balance Confidence Builder',
    theme: 'balance-fall-prevention',
    duration: 25,
    difficulty: 'gentle' as const,
    description: 'Improve your sense of stability and confidence in standing and walking. Great for older adults.',
    price: 25,
    isFree: false,
  },
]

const difficultyColors = {
  gentle: 'bg-green-100 text-green-700',
  moderate: 'bg-yellow-100 text-yellow-700',
  active: 'bg-orange-100 text-orange-700',
}

export default function LessonsPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 md:pt-16">
        <div className="max-w-3xl">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
            Audio Lesson Library
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">
            Voice-Guided Movement Lessons
          </h1>
          <p className="text-xl text-brand-600 leading-relaxed mb-8">
            Gentle, neuroplasticity-based movement explorations you can do at home —
            15 to 45 minutes of guided learning for your brain and body.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#free" variant="primary">
              <Play className="mr-2 w-4 h-4" /> Try Free Lesson
            </Button>
            <Button href="/bundles" variant="outline">
              Browse Bundles
            </Button>
          </div>
        </div>
      </Section>

      {/* Theme Filter */}
      <Section variant="light">
        <SectionHeader
          eyebrow="Browse by theme"
          title="What Would You Like to Explore?"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {lessonThemes.map((theme) => (
            <Link
              key={theme.slug}
              href={`/lessons?theme=${theme.slug}`}
              className="group flex flex-col items-center text-center p-4 rounded-xl bg-white border border-brand-100/50 hover:shadow-card hover:-translate-y-0.5 transition-all"
            >
              <ThemeIcon slug={theme.slug} size={24} className="mb-2" />
              <span className="text-xs font-medium text-brand-700 group-hover:text-brand-900 transition-colors">
                {theme.label}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Lesson Grid */}
      <Section>
        <SectionHeader
          eyebrow="All lessons"
          title="Lesson Library"
          description="Each lesson includes audio, transcript, 'what to notice' guidance, and recommended follow-up."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleLessons.map((lesson) => (
            <Card key={lesson.slug} href={`/lessons/${lesson.slug}`} className="group">
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[lesson.difficulty]}`}>
                  {lesson.difficulty}
                </span>
                <span className="text-xs text-brand-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {lesson.duration} min
                </span>
                {lesson.isFree && (
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-600">
                    Free
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg text-brand-800 mb-2 group-hover:text-brand-600 transition-colors">
                {lesson.title}
              </h3>
              <p className="text-sm text-brand-600 leading-relaxed mb-4">
                {lesson.description}
              </p>
              <div className="flex items-center justify-between">
                {lesson.isFree ? (
                  <span className="text-sm font-medium text-brand-500">Free</span>
                ) : (
                  <span className="text-sm font-medium text-brand-800">${lesson.price}</span>
                )}
                <span className="text-sm text-brand-400 flex items-center gap-1 group-hover:text-brand-600 transition-colors">
                  {lesson.isFree ? 'Listen Now' : 'Learn More'} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-center text-sm text-brand-400 mt-8">
          More lessons coming soon — audio files and additional themes are being developed.
        </p>
      </Section>

      {/* Pricing Info */}
      <Section variant="warm" id="free">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl text-brand-900 mb-4">
            Start Free, Then Go Deeper
          </h2>
          <p className="text-lg text-brand-600 mb-8">
            Try the free 15-Minute Reset, then choose individual lessons for ${pricing.lessons.single.price},
            save with a {pricing.lessons.bundle5.label} for ${pricing.lessons.bundle5.price},
            or get unlimited access with membership at ${pricing.membership.standard.price}/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/lessons/free-intro-reset" size="lg">
              <Play className="mr-2 w-5 h-5" /> Free 15-Min Lesson
            </Button>
            <Button href="/membership" variant="outline" size="lg">
              Explore Membership
            </Button>
          </div>
        </div>
      </Section>

      {/* Disclaimer */}
      <Section variant="light">
        <div className="container-narrow text-center">
          <p className="text-sm text-brand-400 leading-relaxed">
            <strong>Important:</strong> These lessons are educational wellness content, not medical treatment.
            They are not intended to diagnose, treat, cure, or prevent any medical condition.
            If you have a medical condition, recent injury, or are pregnant, please consult your
            healthcare provider before beginning. If any movement causes discomfort, please stop
            and modify as needed.
          </p>
        </div>
      </Section>
    </>
  )
}
